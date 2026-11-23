'use strict';
// A10A Crystron 677: native route / step / CID / endboard parity.
// The audit does not simulate duels, claim exact M1..M5/EMZ placement, or write production.
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
function extract(s,a,b){let i=s.indexOf(a),j=s.indexOf(b,i+a.length);A(i>=0&&j>i,'SECTION_NOT_FOUND:'+a);return s.slice(i+a.length,j)}
function rows(doc,a,b){return extract(doc,a,b).split('\n').filter(x=>x.startsWith('{')).map(JSON.parse)}
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function audit(id,pkgPath,mdPath,guidePath){
 A.equal(id,677);const pp=path.resolve(pkgPath),dp=path.resolve(mdPath),hp=path.resolve(guidePath);
 for(const p of [pp,dp,hp])A(p.startsWith(base),'CROSS_DECK_ACCESS');
 A.equal(path.dirname(path.dirname(pp)),path.dirname(dp));
 A.equal(path.dirname(path.dirname(pp)),path.dirname(path.dirname(hp)));
 const pkg=JSON.parse(fs.readFileSync(pp,'utf8')),doc=fs.readFileSync(dp,'utf8'),html=fs.readFileSync(hp,'utf8');
 A.equal(pkg.schema,'station-x-deck-package/1');A.equal(pkg.deck_id,677);A.equal(pkg.record.deck_id,677);
 A.equal(pkg.record.format,'tcg_advanced');A.equal(pkg.record.calculator.rules.length,13);
 const cards=new Map(pkg.record.cards.map(c=>[c.cid,c]));A.equal(cards.size,39);
 const starts=rows(doc,'<!-- A09_ROUTES_BEGIN -->','<!-- A09_ROUTES_END -->');
 const steps=rows(doc,'<!-- A09_STEPS_BEGIN -->','<!-- A09_STEPS_END -->');
 const boards=rows(doc,'<!-- A09_BOARDS_BEGIN -->','<!-- A09_BOARDS_END -->');
 const cases=rows(doc,'<!-- A09_CASES_BEGIN -->','<!-- A09_CASES_END -->');
 A.deepEqual([starts.length,steps.length,boards.length,cases.length],[14,60,15,14]);
 A.equal((html.match(/<article id="a10-[cv]\d\d" class="a10-lesson"/g)||[]).length,14);
 A.equal((html.match(/class="a10-step" data-step-id="677:A09:[CV]\d\d:S\d\d"/g)||[]).length,60);
 A.equal((html.match(/class="a10-end" data-variant-index="\d" data-spatial-verified="false"/g)||[]).length,15);
 A.equal((html.match(/class="a10-picker" data-target="[CV]\d\d"/g)||[]).length,14);
 A(html.includes('<meta name="viewport"')&&html.includes('@media(max-width:600px)'),'NOT_RESPONSIVE');
 A(!html.includes('Requiere cuerpos de efecto para Luna'),'FOREIGN_DECK_WARNING');
 A(!html.includes('const outcomes ='),'INFERRED_IMAGES_SCRIPT_STILL_PRESENT');
 A(html.includes('0 replays'),'REPLAY_DISCLAIMER_MISSING');
 let stepCount=0,pictures=0,initial=0,endCount=0;
 for(const [i,r] of pkg.record.routes.entries()){
  const tag=r.id.split(':').at(-1),start=starts[i],sourceCase=cases[i];
  A.equal(start.route_id,r.id);A.equal(sourceCase.route_id,r.id);
  const id='a10-'+tag.toLowerCase(),open='<article id="'+id+'" class="a10-lesson" data-route-id="'+r.id+'">';
  const begin=html.indexOf(open),next=html.indexOf('<article id="a10-',begin+open.length);
  A(begin>=0,'ROUTE_PANEL_NOT_FOUND_'+r.id);
  const panel=html.slice(begin,next<0?html.indexOf('</article>',begin):next);
  A(panel.includes('class="a10-initial"'),'OPENING_MISSING_'+r.id);
  A(panel.includes('class="a10-final"'),'ENDBOARD_MISSING_'+r.id);
  A(panel.includes('class="a10-interrupt"'),'FAIL_BRANCH_MISSING_'+r.id);
  for(const cid of [...new Set(Object.values(start.initial.known_zones).flat())]){
   const c=cards.get(cid);A(c,'FOREIGN_CID_OPEN_'+cid);
   A(panel.includes('data-cid="'+cid+'"'),'OPENING_PHOTO_MISSING_'+cid);
   initial++;
  }
  for(const [j,original] of r.steps.entries()){
   const sid=r.id+':S'+String(j+1).padStart(2,'0');
   const record=steps.find(x=>x.step_id===sid);
   A(record&&record.source_step_number===original.number,'MISSING_A09_STEP_'+sid);
   const marker='class="a10-step" data-step-id="'+sid+'"';
   const a=panel.indexOf(marker),b=panel.indexOf('class="a10-step" data-step-id="',a+marker.length);
   A(a>=0,'GUIDE_STEP_MISSING_'+sid);
   const text=panel.slice(a,b<0?panel.indexOf('class="a10-interrupt"',a):b);
   A(text.includes(esc(record.step_action_prefix)),'GUIDE_STEP_SOURCE_CHANGED_'+sid);
   A(text.includes('class="a10-rule"'),'RULE_DETAIL_MISSING_'+sid);
   A(text.includes(esc(record.activation_cost.replaceAll('_',' '))),'COST_NOT_VISIBLE_'+sid);
   A(text.includes(esc(record.interruption_and_fallthrough)),'FAIL_NOT_VISIBLE_'+sid);
   for(const effect of record.effect_ids)A(text.includes('data-effect-id="'+effect+'"'),'A05_EFFECT_LINK_MISSING_'+sid);
   for(const photo of original.photos){
    const c=cards.get(photo.cid);A(c,'FOREIGN_STEP_PHOTO_CID_'+sid);
    const f=(c.full_image||c.image).split('/').at(-1);
    A(text.includes('../imagenes/'+f),'STEP_PHOTO_NOT_GROUNDED_'+sid+'_'+f);
   }
   A(/data-cid="\d+"/.test(text),'STEP_WITHOUT_CARD_IMAGE_'+sid);
   pictures+=(text.match(/<img loading="lazy" data-cid="/g)||[]).length;
   stepCount++;
  }
  const bs=boards.filter(x=>x.route_id===r.id);A.equal(bs.length,r.endboard.variants.length);
  for(let k=0;k<bs.length;k++){
   const board=bs[k],source=r.endboard.variants[k];
   A.equal(source.spatial_verified,false);
   const beginPanel=panel.indexOf('<div class="a10-end" data-variant-index="'+k+'"');
   A(beginPanel>=0,'BOARD_VARIANT_MISSING_'+r.id+'/'+k);
   const end=panel.indexOf('</div><a href="#a10-picker"',beginPanel);
   const fragment=panel.slice(beginPanel,end<0?panel.length:end);
   for(const [zone,cids] of Object.entries(board.expected_known_zones)){
    if(!cids.length)continue;
    A(fragment.includes('data-zone="'+zone+'"'),'BOARD_ZONE_MISSING_'+r.id+'/'+zone);
    for(const cid of cids){
     const c=cards.get(cid);A(c,'BOARD_FOREIGN_CID');
     const f=(c.full_image||c.image).split('/').at(-1);
     A(fragment.includes('../imagenes/'+f),'BOARD_PHOTO_MISSING_'+r.id+'/'+cid);
    }
   }
   endCount++;
  }
 }
 A.equal(stepCount,60);A.equal(endCount,15);A(pictures>=151);
 const images=[...html.matchAll(/<img loading="lazy" data-cid="(\d+)" src="\.\.\/imagenes\/(\d+)\.(png|jpg)"/g)];
 A(images.length>200);
 const folder=path.dirname(dp);
 for(const m of images){
  const cid=Number(m[1]);A.equal(cid,Number(m[2]));A(cards.has(cid),'FOREIGN_IMAGE_CID');
  const f=path.join(folder,'imagenes',m[2]+'.'+m[3]);
  A(fs.existsSync(f),'PHOTO_404_'+f);
  const buf=fs.readFileSync(f);
  A(buf.length>30000,'PHOTO_TOO_SMALL_'+f);
 }
 const ledger=extract(doc,'## CONTROL_DE_TAREAS_A01_A10 —','\n---\n');
 const checked=[...ledger.matchAll(/^- \[x\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)].map(x=>x[1]);
 A.equal(checked.length,34);A(!checked.includes('A05-T4'));
 for(const id of ['A10A-T1','A10A-T2','A10A-T3'])A(checked.includes(id));
 A(ledger.includes('34/35')&&ledger.includes('1/35'));
 return {ok:true,deck_id:677,routes:14,steps:60,originalStepPhotoReferences:151,renderedStepPhotos:pictures,
  endboards:15,allImageReferences:images.length,spatiallyVerified:0,physicalCards:39,
  importerOrGameEngineNotInvoked:true,closed:34,pending:1};
}
if(require.main===module){
 const argv=process.argv.slice(2),files=argv.filter(x=>!x.startsWith('--'));
 A(argv.includes('--user-assigned')&&files.length===3,'EXPLICIT_CRYSTRON_ASSIGNMENT_REQUIRED');
 console.log(JSON.stringify(audit(Number(argv.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),...files)));
}
module.exports={audit};
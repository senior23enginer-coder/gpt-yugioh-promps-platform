'use strict';
// Read-only A10A visual parity verification for one explicitly assigned deck.
// Static proof only: no browser/engine replay, no spatial endboard certification.
const a=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const safeRoot=path.join(root,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const routeSizes=[7,4,7,8,9,5,4,4,5,5,6,5];
function cut(s,begin,end){
 const i=s.indexOf(begin),j=s.indexOf(end,i+begin.length);
 a(i>=0&&j>i,'MISSING_SECTION_'+begin);return s.slice(i,j);
}
function cells(line){return line.split('|').slice(1,-1).map(x=>x.trim());}
function pictureIds(markup){
 return [...markup.matchAll(/<img loading="lazy" src="\.\.\/imagenes\/(\d+)\.(png|jpg)"/g)]
  .map(m=>({cid:Number(m[1]),ext:m[2]}));
}
function opening(html){
 const start=html.indexOf('<div class="a10-initial">');
 const end=html.indexOf('<div class="route-v39">',start);
 a(start>=0&&end>start,'MISSING_INITIAL_HAND');
 const match=html.slice(start,end).match(/<div class="a10-pics">([\s\S]*?)<\/div>/);
 a(match,'INITIAL_HAND_IMAGES_MISSING');return pictureIds(match[1]);
}
function audit({deckId,assigned,packagePath,documentPath,htmlPath}){
 a(assigned===true&&deckId===671,'EXPLICIT_DECK_671_REQUIRED');
 const paths=[packagePath,documentPath,htmlPath].map(x=>path.resolve(x));
 for(const x of paths)a(x.startsWith(safeRoot),'CROSS_DECK_PATH');
 const folder=path.dirname(path.dirname(paths[0]));
 a(paths[1].startsWith(folder+path.sep)&&paths[2].startsWith(folder+path.sep),'CROSS_DECK_DATA');
 const pkg=JSON.parse(fs.readFileSync(paths[0],'utf8'));
 const md=fs.readFileSync(paths[1],'utf8');
 const html=fs.readFileSync(paths[2],'utf8');
 a.equal(pkg.schema,'station-x-deck-package/1');a.equal(pkg.deck_id,671);
 a.equal(pkg.record.deck_id,671);a.equal(pkg.record.format,'tcg_advanced');
 const cards=new Map(),counts={main:0,extra:0,side:0,reserve:0};
 for(const c of pkg.record.cards){
  a(!cards.has(c.cid),'REPEATED_CID');cards.set(c.cid,c);
  for(const s of c.slots)counts[s.section]+=s.quantity;
 }
 a.equal(cards.size,39);a.deepEqual(counts,{main:41,extra:15,side:14,reserve:0});
 a(html.includes('name="viewport"')&&html.includes('@media'),'RESPONSIVE_STATIC_GUARD_MISSING');
 const openings=cut(md,'### A09.10 —','### A09.11 —');
 const tracing=cut(md,'### A09.11 —','### A09.12 —');
 const gates=cut(md,'### A09.13 —','### A09.14 —');
 const finals=cut(md,'### A09.14 —','### A09.15 —');
 const openingRows=[...openings.matchAll(/^\| \x60MEMD-(C\d\d)\x60 \|([^\n]+)$/gm)];
 const traceRows=[...tracing.matchAll(/^\| \x60(671:A09:(C\d\d):S(\d\d))\x60 \|([^\n]+)$/gm)];
 const gateRows=[...gates.matchAll(/^\| \x60(671:A09:(C\d\d):S(\d\d))\x60 \|([^\n]+)$/gm)];
 const finalRows=[...finals.matchAll(/^\| \x60(671:A09:(C\d\d):END)\x60 \|([^\n]+)$/gm)];
 a.equal(openingRows.length,12);a.equal(traceRows.length,69);a.equal(gateRows.length,69);
 a.equal(finalRows.length,12);a.equal(pkg.record.routes.length,12);
 const articles=[...html.matchAll(/<article class="combo-panel a10-lesson" id="a10-c(\d\d)" data-route="C\d\d">/g)];
 a.equal(articles.length,12,'TWELVE_HTML_GUIDES_REQUIRED');
 let seenSteps=0,stepPhotos=0,openingPhotos=0,rulePanels=0,logicalEnds=0;
 function checkPhoto(p,kind){
  const card=cards.get(p.cid);
  a(card,'FOREIGN_CID_'+kind+'_'+p.cid);
  a(card.full_image.endsWith('/imagenes/'+p.cid+'.'+p.ext),'WRONG_IMAGE_EXTENSION_'+kind);
 }
 for(let i=0;i<12;i++){
  const number=String(i+1).padStart(2,'0'),route='C'+number,rec=pkg.record.routes[i];
  a.equal(rec.id,'671:A09:'+route);
  a.equal(rec.steps.length,routeSizes[i]);
  a.equal(rec.endboard.spatial_verified,false,'ILLUSTRATIVE_BOARD_NOT_CERTIFIED');
  const start=articles[i].index,end=html.indexOf('</article>',start);
  a(end>start,'UNCLOSED_VISUAL_GUIDE_'+route);
  const panel=html.slice(start,end);
  const actualOpening=opening(panel);
  const declaredHand=[...cells(openingRows[i][0])[2].matchAll(/H(\d+)/g)].map(x=>Number(x[1]));
  a.deepEqual(actualOpening.map(p=>p.cid),declaredHand,'WRONG_VISUAL_OPENING_'+route);
  a.deepEqual(rec.hand_photos.map(x=>x.cid),declaredHand,'WRONG_IMPORT_OPENING_'+route);
  for(const p of actualOpening)checkPhoto(p,'HAND');
  openingPhotos+=actualOpening.length;
  const snippets=[...panel.matchAll(/<div class="route-step a10-step" data-step="(\d+)" data-step-id="(671:A09:C\d\d:S\d\d)" id="a10-c\d\d-s\d\d">/g)];
  a.equal(snippets.length,routeSizes[i],'MISSING_STEPS_'+route);
  for(let j=0;j<routeSizes[i];j++){
   const sid='671:A09:'+route+':S'+String(j+1).padStart(2,'0');
   const row=traceRows[seenSteps],gate=gateRows[seenSteps];
   a.equal(row[1],sid,'TRACE_OUT_OF_ORDER');
   a.equal(gate[1],sid,'GATE_OUT_OF_ORDER');
   a.equal(snippets[j][2],sid,'HTML_STEP_ID_MISMATCH');
   const next=snippets[j+1]?.index??panel.indexOf('<div class="a10-final',snippets[j].index);
   a(next>snippets[j].index,'STEP_FINAL_BOUNDARY_MISSING_'+sid);
   const segment=panel.slice(snippets[j].index,next);
   const group=segment.match(/<div class="a10-pics">([\s\S]*?)<\/div>/);
   a(group,'STEP_HAS_NO_IMAGES_'+sid);
   const photos=pictureIds(group[1]);
   a(photos.length>0,'EMPTY_PHOTO_SET_'+sid);
   const actor=[...cells(row[0])[1].matchAll(/671:a05:(\d+):/g)].map(x=>Number(x[1]));
   for(const cid of actor)a(photos.some(p=>p.cid===cid),'MISSING_EFFECT_ACTOR_PHOTO_'+sid+'_'+cid);
   for(const p of photos)checkPhoto(p,sid);
   const step=rec.steps[j];
   a.equal(step.number,j+1);
   a.deepEqual(step.photos.map(x=>x.cid),photos.map(x=>x.cid),'IMPORT_HTML_STEP_PHOTO_DRIFT_'+sid);
   a(segment.includes('data-canonical-step="'+sid+'"'),'MISSING_RULE_PANEL_'+sid);
   a(segment.includes('coste')&&segment.includes('ventana')&&segment.includes('Antes (recursos conocidos)'),'MISSING_TYPED_STATE_'+sid);
   a(segment.includes('<details class="a10-interrupt"'),'INTERRUPTION_CONTROL_MISSING_'+sid);
   rulePanels++;seenSteps++;stepPhotos+=photos.length;
  }
  const final=finalRows[i],fc=cells(final[0]);
  a.equal(final[1],'671:A09:'+route+':END','FINAL_MISMATCH_'+route);
  const endArea=panel.slice(panel.indexOf('<div class="a10-final'));
  a(endArea,'VISUAL_END_MISSING_'+route);
  const endboardCids=[...fc[1].matchAll(/M(\d+)/g)].map(x=>Number(x[1]));
  for(const cid of endboardCids){
   const image=cards.get(cid).full_image.split('/').pop();
   a(endArea.includes('../imagenes/'+image),'FINAL_MONSTER_PHOTO_MISSING_'+route+'_'+cid);
  }
  logicalEnds++;
 }
 a.equal(seenSteps,69);a.equal(stepPhotos,198);a.equal(openingPhotos,23);
 a.equal(rulePanels,69);a.equal(logicalEnds,12);
 return {ok:true,deck_id:671,routes:12,steps:69,stepPhotos:198,openingPhotos:23,typedStepPanels:69,
  logicalEnds:12,inventory:counts,staticResponsiveGuards:true,
  browserMobileDesktopExecuted:false,editorV40ParityCertified:false,
  spatialEndboardsCertified:0,replaysExecuted:0,independentFullPSCTCertified:0};
}
if(require.main===module){
 const args=process.argv.slice(2),files=args.filter(x=>!x.startsWith('--'));
 a.equal(files.length,3,'THREE_SCOPE_FILES_REQUIRED');
 console.log(JSON.stringify(audit({deckId:Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),
  assigned:args.includes('--user-assigned'),packagePath:files[0],documentPath:files[1],htmlPath:files[2]}),null,2));
}
module.exports=Object.freeze({audit});

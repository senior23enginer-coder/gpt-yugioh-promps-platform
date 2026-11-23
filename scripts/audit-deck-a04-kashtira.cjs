'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const ROOT=path.resolve(__dirname,'..');
const DIR=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const IMG='DECK_665_KASHTIRA_PURE/imagenes/tcg/';
const sha=bytes=>crypto.createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
function run(pkgPath,mdPath,histPath){
 const p=JSON.parse(fs.readFileSync(pkgPath,'utf8')),md=fs.readFileSync(mdPath,'utf8'),h=JSON.parse(fs.readFileSync(histPath,'utf8'));
 A.equal(p.deck_id,665);A.equal(p.record.deck_id,665);A.equal(h.deck_id,665);
 const status=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:p,stageId:'A04',authorizedSideOmissionForA04:true});
 A(status.eligible&&status.a04SideWaiverApplied);
 A.deepEqual(status.counts,{main:42,extra:15,side:0,reserve:19});
 const physical=new Map(p.record.cards.map(c=>[c.cid,c]));
 A.equal(physical.size,38);
 const tick=String.fromCharCode(96);
 const i=md.indexOf('### A04.1'),j=md.indexOf('### A04.2'),k=md.indexOf('### A04.3');
 A(i>=0&&j>i&&k>j);
 const photoRows=md.slice(i,j).split('\n').filter(line=>line.startsWith('| '+tick)&&line.includes('Konami CID '));
 const extraRows=md.slice(j,k).split('\n').filter(line=>line.startsWith('| '+tick)&&line.includes('REFERENCIA_EXTERNA_NO_INVENTARIO'));
 A.equal(photoRows.length,38);A.equal(extraRows.length,6);
 const used=new Set();
 function checkPhoto(row,cid,isPhysical){
   const m=row.match(/[a-f0-9]{40}/),d=row.match(/268 × 391 · (\d+) B/);
   A(m&&d,'PHOTO_PROVENANCE_INCOMPLETE_'+cid);
   const fp=path.join(DIR,'imagenes/tcg',cid+'.jpg');
   A(fs.existsSync(fp),'MISSING_IMAGE_'+cid);
   const data=fs.readFileSync(fp);
   A.equal(data.length,Number(d[1]));
   A.equal(sha(data),m[0],'IMAGE_GIT_HASH_CHANGED_'+cid);
   A(data.length>15000&&data[0]===255&&data[1]===216&&data.at(-2)===255&&data.at(-1)===217,'JPEG_SIGNATURE_'+cid);
   A(!used.has(cid),'REPEATED_IMAGE_'+cid);used.add(cid);
   if(isPhysical){
     const c=physical.get(cid);A(c,'CID_NOT_OWNED_'+cid);
     A(row.includes(c.name),'PHOTO_NAME_WRONG_'+cid);
     for(const slot of c.slots)A(row.includes('#'+slot.card_id+' ×'+slot.quantity),'PHOTO_SLOT_NOT_LINKED_'+cid);
     A(c.sources?.some(s=>s.includes('cid='+cid+'&')),'KONAMI_CID_NOT_LINKED_'+cid);
     A.equal(c.source_aliases?.[0],c.name);
     A.equal(c.image,IMG+cid+'.jpg');A.equal(c.full_image,c.image);
   } else {
     A(!physical.has(cid),'EXTRA_IMAGE_FALSELY_OWNED_'+cid);
     const guide=fs.readFileSync(path.join(DIR,'guias/DECK_665_670_687_TYPHON_GODDESS_GUIA_V13.md'),'utf8');
     A(guide.includes(cid+'.jpg'),'EXTERNAL_PHOTO_NOT_REFERENCED_'+cid);
   }
 }
 for(const line of photoRows)checkPhoto(line,Number(line.split(tick)[1]),true);
 for(const line of extraRows)checkPhoto(line,Number(line.split(tick)[1].replace('.jpg','')),false);
 A.equal(used.size,44);
 const gallery=fs.readdirSync(path.join(DIR,'imagenes/tcg')).filter(x=>/^\d+\.jpg$/.test(x));
 A.equal(gallery.length,44);
 for(const file of gallery)A(used.has(Number(file.replace('.jpg',''))),'UNDECLARED_IMAGE_'+file);
 let imageRefs=0;
 const walk=obj=>{
  if(Array.isArray(obj)){obj.forEach(walk);return;}
  if(!obj||typeof obj!=='object')return;
  for(const [key,value] of Object.entries(obj)){
   if((key==='image'||key==='full_image')&&typeof value==='string'&&value){
    A(/^DECK_665_KASHTIRA_PURE\/imagenes\/tcg\/\d+\.jpg$/.test(value),'CROSS_DECK_IMAGE');
    A(physical.has(Number(value.split('/').at(-1).replace('.jpg',''))),'PHOTO_NOT_IN_PHYSICAL_INVENTORY');
    imageRefs++;
   }else walk(value);
  }
 };walk(p.record);
 A(imageRefs>=700,'MISSING_DECK_IMAGE_REFERENCES');
 A.equal(p.record.routes.length,16);
 A.deepEqual(p.record.routes.map(x=>x.id),h.routes.map(x=>x.id),'CHANGED_HISTORICAL_ROUTE_IDS');
 let steps=0,photos=0,hands=0,endboards=0;
 for(const route of p.record.routes){
  steps+=route.steps.length;
  hands+=(route.hand_photos||[]).length;
  const variants=route.endboard?.variants||[];
  endboards+=variants.length;
  for(const v of variants)A(v.spatial_verified!==true,'UNSUPPORTED_SPATIAL_VERIFICATION');
  for(const step of route.steps)for(const photo of step.photos||[]){
   photos++;A(physical.has(photo.cid),'PHOTO_IN_STEP_NOT_IN_INVENTORY');
   A.equal(photo.image,IMG+photo.cid+'.jpg','STEP_IMAGE_PATH_WRONG');
  }
 }
 A.deepEqual({steps,photos,hands,endboards},{steps:92,photos:116,hands:24,endboards:10});
 A.equal(fs.readdirSync(path.join(DIR,'imagenes/infografias')).filter(x=>x.endsWith('.webp')).length,15);
 A.equal(fs.readdirSync(path.join(DIR,'imagenes/ejemplos_combos_kashtira')).filter(x=>x.endsWith('.webp')).length,4);
 const start=md.indexOf('## CONTROL_DE_TAREAS_A01_A10 —'),end=md.indexOf('\n---\n',start);
 A(start>=0&&end>start,'CHECKLIST_NOT_FOUND');
 const ledger=md.slice(start,end);
 const statuses=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 const expected=JSON.parse(fs.readFileSync(path.join(ROOT,'02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8')).stages
  .filter(s=>s.mandatory).flatMap(s=>s.tasks.map(t=>t.task_id));
 A.deepEqual(statuses.map(m=>m[2]),expected);
 A.deepEqual(statuses.filter(m=>m[1]==='x').map(m=>m[2]).slice(0,16),expected.slice(0,16));
 A(ledger.includes('28/35')&&ledger.includes('7/35'),'A04_PROGRESS_DRIFT');
 const section=md.slice(md.indexOf('## APARTADO_04 —'));
 for(const token of ['FOTO_OK_MINIATURA','FOTO_HD_NO_CERTIFICADA','FOTO_PENDIENTE=0',
  'NO_VERIFICADO_ESPACIAL','xyz_materials','graveyard','banished','A04-T1 [x]','A04-T2 [x]','A04-T3 [x]'])
  A(section.includes(token),'A04_EVIDENCE_MISSING_'+token);
 const original=fs.readFileSync(path.join(DIR,'imagenes/tcg',photoRows[0].split(tick)[1]+'.jpg'));
 A.notEqual(sha(Buffer.concat([original,Buffer.from([0])])),photoRows[0].match(/[a-f0-9]{40}/)[0],
   'IMAGE_MUTATION_HASH_NOT_DETECTED');
 return {ok:true,deck_id:665,stage:'A04',closed:16,pending:19,
  physical:{main:42,extra:15,side:0,reserve:19},cids:38,slots:44,
  jpgVerified:44,jpgPhysical:38,jpgExtraReferenced:6,quality:'THUMBNAIL_268x391_NOT_HD',
  webpInfographics:15,webpExamples:4,imageReferences:imageRefs,
  routes:16,steps:92,stepPhotos:116,handPhotos:24,endboardVariants:10,
  banlistAssessed:false,sideChanged:false,liveImport:false,engineExecuted:false};
}
if(require.main===module){
 const argv=process.argv.slice(2),files=argv.filter(x=>!x.startsWith('--'));
 A(argv.includes('--deck-id=665')&&argv.includes('--user-assigned')&&argv.includes('--authorized-side-waiver')&&files.length===3);
 console.log(JSON.stringify(run(...files)));
}
module.exports={run};

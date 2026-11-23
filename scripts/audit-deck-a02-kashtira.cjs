'use strict';
/** Only Kashtira Pure 665, A02 identity/import parity. Documentary; no live import.
 * Banlist deliberately not evaluated. Side=0 is user-authorized for A02 only.
 */
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const base=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks');
const root='DECK_665_KASHTIRA_PURE';
const folder=path.join(base,root);
const histRelative='torneos_yugioh/assets/editorial/20261117-folder-delivery-v40/665.json';
const sha='29a120ffd8378ea9606e4b509a478fde34e423bd';
function canonical(rows){return rows.map(x=>({id:x.id,section:x.section,quantity:x.quantity})).sort((a,b)=>a.id-b.id)}
function inventoryRows(cards){return cards.flatMap(c=>c.slots.map(s=>({id:s.card_id,card_name:c.name,section:s.section,quantity:s.quantity,cid:c.cid})))}
function physical(rows){const counts={main:0,extra:0,side:0,reserve:0};for(const r of rows){A(Object.hasOwn(counts,r.section),'UNKNOWN_SECTION');counts[r.section]+=r.quantity}return counts}
function run(packagePath,documentPath,historyPath){
 const pkgFile=path.resolve(packagePath),docFile=path.resolve(documentPath),srcFile=path.resolve(historyPath);
 A.equal(pkgFile,path.join(folder,'datos/stationx-deck.json'));A.equal(docFile,path.join(folder,root+'_CONTENIDO_CURADO.md'));
 A(srcFile.endsWith('/'+histRelative)&&srcFile.includes('/_platform_source/'),'HISTORY_WRONG');
 const pkg=JSON.parse(fs.readFileSync(pkgFile,'utf8')),h=JSON.parse(fs.readFileSync(srcFile,'utf8')),doc=fs.readFileSync(docFile,'utf8');
 A.equal(h.deck_id,665);A.equal(h.schema,'station-x-curated-v62');A.equal(pkg.schema,'station-x-deck-package/1');
 A.equal(pkg.deck_id,665);A.equal(pkg.deck_name,h.name);A.equal(pkg.inventory_binding,'deck-slots-v1');
 A.equal(pkg.content_mode,'structured');A.equal(pkg.package_root,root);
 A.equal(pkg.source_document,root+'/'+root+'_CONTENIDO_CURADO.md');A.equal(pkg.record.schema,h.schema);
 A.equal(pkg.record.deck_id,665);A.equal(pkg.record.format,h.format);A.equal(h.format,'tcg_advanced');
 A(!Object.hasOwn(pkg,'inventory_sha256'),'INVENTORY_HASH_NOT_OBTAINED_FROM_LIVE_STATIONX');
 A.equal(pkg.provenance.native_snapshot_blob_sha,sha);A.equal(pkg.provenance.native_snapshot_path,histRelative);
 A.equal(pkg.provenance.native_snapshot_repository,'senior23enginer-coder/platform-yugioh-md');
 const rows=inventoryRows(pkg.record.cards),historical=inventoryRows(h.cards);
 A.equal(pkg.record.cards.length,38);A.equal(h.cards.length,38);A.equal(rows.length,44);
 A.equal(new Set(rows.map(x=>x.id)).size,44);A.equal(new Set(rows.map(x=>x.cid)).size,38);
 A.deepEqual(canonical(rows),canonical(historical),'HISTORICAL_SLOTS_CHANGED');
 A.deepEqual(canonical(pkg.inventory),canonical(rows),'PORTABLE_ROWS_MISMATCH');
 const names=new Map(rows.map(x=>[x.id,x.card_name]));
 for(const row of pkg.inventory)A.equal(row.card_name,names.get(row.id),'SLOT_NAME_CHANGED');
 A.deepEqual(physical(rows),{main:42,extra:15,side:0,reserve:19});
 const admission={deck_id:665,format:h.format,inventory:pkg.inventory,record:pkg.record};
 A.equal(validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:admission}).eligible,false);
 const decision=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:admission,stageId:'A02',authorizedSideOmissionForA02:true});
 A(decision.eligible&&decision.a02SideWaiverApplied,'A02_SCOPE_NOT_AUTHORIZED');
 A.deepEqual(decision.counts,{main:42,extra:15,side:0,reserve:19});
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:admission,stageId:'A03',authorizedSideOmissionForA02:true}).eligible);
 A.deepEqual(pkg.record.routes.map(x=>x.id),h.routes.map(x=>x.id),'ROUTE_IDS_CHANGED');
 A.equal(pkg.record.routes.length,16);A.equal(pkg.record.routes.reduce((n,x)=>n+x.steps.length,0),92);
 A.equal(pkg.record.skills.length,0);A.equal(h.skills.length,0);
 A(!pkg.record.calculator || !pkg.record.calculator.rules?.length,'UNPROVEN_CALCULATOR_RULES');
 // All historic source content is identical apart from the A01 profile and local image paths.
 const normalized=JSON.parse(JSON.stringify(pkg.record));
 const sourceImages=new Map();
 function images(obj,restore){
  if(Array.isArray(obj)){obj.forEach(x=>images(x,restore));return}
  if(!obj||typeof obj!=='object')return;
  for(const [k,v] of Object.entries(obj)){
   if(['image','full_image'].includes(k)&&typeof v==='string'&&/\/imagenes\/tcg\/\d+\.jpg$/.test(v)){
    const img=v.split('/').at(-1);
    A(fs.existsSync(path.join(folder,'imagenes/tcg',img)),'PHOTO_NOT_PRESENT_'+img);
    sourceImages.set(img,img);
    obj[k]=restore?'./assets/editorial/20261104-checked-study/images/tcg/'+img:v;
   }else if(typeof v==='object')images(v,restore);
  }
 }
 images(normalized,true);normalized.profile=h.profile;
 // Later scoped A06 is allowed to append documented causal studies and maps;
 // historical slots, routes and all other native fields are still compared in full.
 normalized.engine_maps=h.engine_maps;
 normalized.causal_relations=h.causal_relations;
 delete normalized.a06_review;
 delete normalized.a07_review;
 delete normalized.a08_review;
 A.deepEqual(normalized,h,'RECORD_SOURCE_DRIFT_OUTSIDE_A01_PROFILE_AND_IMAGE_REFERENCES');
 A.equal(sourceImages.size,38,'CID_ART_NOT_GROUNDED');
 for(const c of pkg.record.cards){
  const fname=c.cid+'.jpg';
  A.equal(c.image,root+'/imagenes/tcg/'+fname);
  A.equal(c.full_image,c.image);
 }
 const files=fs.readdirSync(path.join(folder,'imagenes/tcg')).filter(x=>x.endsWith('.jpg'));
 A.equal(files.length,44);for(const file of files)A(fs.statSync(path.join(folder,'imagenes/tcg',file)).size>1000);
 const guideDir=path.join(folder,'guias');
 const guides=fs.readdirSync(guideDir).filter(x=>x.endsWith('.md'));A.equal(guides.length,7);
 const ledger=doc.slice(doc.indexOf('## CONTROL_DE_TAREAS_A01_A10'),doc.indexOf('\n---\n'));
 const all=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 const contract=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8')).stages.filter(x=>x.mandatory).flatMap(x=>x.tasks.map(t=>t.task_id));
 A.deepEqual(all.map(x=>x[2]),contract);A.equal(all.length,35);
 A.deepEqual(all.filter(x=>x[1]==='x').map(x=>x[2]).slice(0,16),['A01-T1','A01-T2','A01-T3','A02-T1','A02-T2','A02-T3','A03-T1','A03-T2','A03-T3','A04-T1','A04-T2','A04-T3','A05-T1','A05-T2','A05-T3','A05-T4']);
 A(ledger.includes('28/35')&&ledger.includes('7/35'),'CHECKLIST_COUNTS_WRONG');
 A(doc.includes('### A02.4 — identidad técnica, procedencia'),'A02_EVIDENCE_MISSING');
 A(doc.includes('SHA de blob real')||doc.includes('SHA del Git blob')||doc.includes('objeto Git'),'MISSING_VERSIONING');
 A(!doc.includes('A02-T4 [x]'),'EXTRANEOUS_TASK');
 return {ok:true,stage:'A02',deck_id:665,sourceSha:sha,format:h.format,physical:decision.counts,cids:38,
  cardIds:44,routes:16,steps:92,photos:44,guideFiles:7,calculatorCertified:false,
  sideCreated:false,banlistAssessed:false,liveDatabaseRead:false,liveImportPerformed:false,
  completedMandatory:16,mandatoryPending:19};
}
if(require.main===module){const a=process.argv.slice(2),f=a.filter(x=>!x.startsWith('--'));
 A(a.includes('--user-assigned')&&a.includes('--deck-id=665')&&a.includes('--authorized-side-waiver')&&f.length===3,'A02_EXPLICIT_ASSIGNMENT_REQUIRED');
 console.log(JSON.stringify(run(...f)));
}
module.exports={run};

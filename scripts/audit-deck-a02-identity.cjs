'use strict';
/**
 * Auditable read-only A02 identity/import/provenance gate for one user-assigned
 * deck. Unlike A10A this never publishes, imports into production, or proves
 * rule semantics or calculator execution.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
const EXPECTED_FOLDER='DECK_NUEVO_13_CRISTRON_HORUS';
const EXPECTED_SOURCE=EXPECTED_FOLDER+'/'+EXPECTED_FOLDER+'_CONTENIDO_CURADO.md';
const EXPECTED_HISTORICAL='torneos_yugioh/assets/editorial/20261117-folder-delivery-v40/677.json';
const KINDS=['main','extra','side','reserve'];
function countPhysical(cards){
 const counts={main:0,extra:0,side:0,reserve:0};
 for(const c of cards)for(const s of c.slots){
  assert(KINDS.includes(s.section),'INVALID_SLOT_'+s.section);
  assert(Number.isInteger(s.quantity)&&s.quantity>=1&&s.quantity<=3,'INVALID_QUANTITY');
  counts[s.section]+=s.quantity;
 }return counts;
}
function slotsFromRecord(record){
 const rows=[];
 for(const c of record.cards){
  assert(Number.isInteger(c.cid)&&c.cid>0,'INVALID_CID');
  assert(typeof c.name==='string'&&c.name.length>1,'CARD_WITHOUT_NAME');
  for(const s of c.slots){
   assert(Number.isInteger(s.card_id)&&s.card_id>0,'INVALID_CARD_ID');
   rows.push({id:s.card_id,section:s.section,quantity:s.quantity,name:c.name,cid:c.cid});
  }
 }return rows;
}
function canonicalRows(rows){
 return rows.map(row=>({id:row.id,section:row.section,quantity:row.quantity}))
  .sort((a,b)=>a.id-b.id);
}
function inspect(args){
 const {deckId,packageFile,documentFile,historicalFile}=args;
 assert.equal(deckId,677,'UNASSIGNED_DECK');
 const fullPkg=path.resolve(packageFile),fullDoc=path.resolve(documentFile);
 assert(fullPkg.startsWith(DECKS)&&fullDoc.startsWith(DECKS),'CROSS_DECK_SOURCE');
 assert.equal(path.basename(path.dirname(path.dirname(fullPkg))),EXPECTED_FOLDER);
 assert.equal(path.dirname(fullDoc),path.dirname(path.dirname(fullPkg)),'WRONG_DOCUMENT_FOLDER');
 const folder=path.dirname(fullDoc);
 const root=path.basename(folder);
 const envelope=JSON.parse(fs.readFileSync(fullPkg,'utf8'));
 const record=envelope.record;
 assert.equal(envelope.schema,'station-x-deck-package/1');
 assert.equal(envelope.inventory_binding,'deck-slots-v1');
 assert.equal(envelope.deck_id,deckId);
 assert.equal(record?.schema,'station-x-curated-v62');
 assert.equal(record.deck_id,deckId);
 assert.equal(record.format,'tcg_advanced');
 assert.equal(envelope.content_mode,'structured');
 assert.equal(envelope.package_root,root);
 assert.equal(envelope.source_document,EXPECTED_SOURCE);
 assert.equal(envelope.deck_name,'Crystron');
 assert(!Object.hasOwn(envelope,'inventory_sha256'),'UNVERIFIED_HASH_MUST_NOT_BE_SYNTHESIZED');
 assert(Array.isArray(envelope.inventory),'MISSING_STATION_X_INVENTORY');
 assert(Array.isArray(record.cards)&&Array.isArray(record.routes),'MISSING_NATIVE_STRUCTURE');
 assert(Array.isArray(record.skills)&&record.skills.length===0,'NO_SKILL_IN_THIS_DECK');
 const declared=envelope.inventory;
 const rows=slotsFromRecord(record),ids=new Set(rows.map(s=>s.id));
 assert.equal(record.cards.length,39,'CARD_IDENTITY_DRIFT');
 assert.equal(new Set(record.cards.map(c=>c.cid)).size,39,'CID_COLLISION');
 assert.equal(rows.length,40,'WRONG_NUMBER_OF_SLOTS');
 assert.equal(ids.size,40,'DUPLICATE_NATIVE_SLOT');
 assert.equal(declared.length,40,'MISSING_DECLARED_INVENTORY_ROWS');
 assert.equal(new Set(declared.map(row=>row.id)).size,40,'DUPLICATE_DECLARED_ROW');
 assert.deepEqual(canonicalRows(declared),canonicalRows(rows),
   'PORTABLE_INVENTORY_DOES_NOT_MATCH_RECORD');
 const counts=countPhysical(record.cards);
 assert.deepEqual(counts,{main:40,extra:15,side:15,reserve:0},'PHYSICAL_INVENTORY_CHANGED');
 const physical=new Map(rows.map(s=>[s.id,s]));
 for(const row of declared){
  const actual=physical.get(row.id);
  assert(actual&&row.card_name===actual.name,'DECLARED_NATIVE_CARD_NAME_MISMATCH_'+row.id);
 }
 const routeIds=record.routes.map(r=>r.id);
 assert.deepEqual(routeIds,[
  ...Array.from({length:7},(_,i)=>'677:A09:C'+String(i+1).padStart(2,'0')),
  ...Array.from({length:7},(_,i)=>'677:A09:V'+String(i+1).padStart(2,'0'))
 ],'STABLE_ROUTE_IDS_CHANGED');
 for(const route of record.routes)assert(Array.isArray(route.steps)&&route.steps.length>0,
  'ROUTE_WITHOUT_STEPS');
 const md=fs.readFileSync(fullDoc,'utf8');
 const ledgerBegin=md.indexOf('## CONTROL_DE_TAREAS_A01_A10 —');
 const ledgerEnd=md.indexOf('\n---\n',ledgerBegin);
 assert(ledgerBegin>=0&&ledgerEnd>ledgerBegin,'MISSING_CANONICAL_LEDGER');
 const ledger=md.slice(ledgerBegin,ledgerEnd);
 const manifest=JSON.parse(fs.readFileSync(path.join(ROOT,
   '02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8'));
 const taskIds=manifest.stages.filter(x=>x.mandatory)
   .flatMap(stage=>stage.tasks.map(t=>t.task_id));
 const entries=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 assert.equal(entries.length,35,'MISSING_LEDGER_TASKS');
 assert.deepEqual(entries.map(x=>x[2]),taskIds,'TASK_ORDER_DRIFT');
 const completed=entries.filter(x=>x[1]==='x').map(x=>x[2]);
 for(const id of ['A01-T1','A01-T2','A01-T3','A02-T1','A02-T2','A02-T3'])
   assert(completed.includes(id),'A02_NOT_CLOSED_'+id);
 assert(ledger.includes('6/35')&&ledger.includes('29/35'),'A02_PROGRESS_NOT_RECONCILED');
 assert(md.includes('### A02.4 — identidad técnica, procedencia'),
   'MISSING_A02_TECHNICAL_ACT');
 for(const token of ['CONTROL_DE_TAREAS_A01_A10','## IDENTIDAD BÁSICA',
   '## APARTADO_01','## APARTADO_02']){
  assert(md.includes(token),'MISSING_CANONICAL_MD_'+token);
 }
 assert(fs.existsSync(path.join(folder,'guias/GUIA_VISUAL_A01_A10.html')),
  'MISSING_NATIVE_VISUAL_GUIDE');
 const imgFolder=path.join(folder,'imagenes');
 const imgFiles=fs.readdirSync(imgFolder).filter(x=>/\.(png|jpg)$/i.test(x));
 assert.equal(imgFiles.length,39,'MISSING_OR_EXTRA_PHOTOS');
 const imageSet=new Set(imgFiles);
 for(const card of record.cards){
  assert(typeof card.full_image==='string'&&card.full_image.includes('/imagenes/'),
   'MISSING_CARD_PHOTO_CID_'+card.cid);
  const imageName=path.basename(card.full_image);
  assert(imageSet.has(imageName),'UNRESOLVED_IMAGE_'+imageName);
  assert(imageName.startsWith(card.cid+'.'),'WRONG_CID_IMAGE_'+card.cid);
 }
 const docs=['datos/stationx-deck.json',EXPECTED_FOLDER+'_CONTENIDO_CURADO.md',
  'guias/GUIA_VISUAL_A01_A10.html'];
 assert(docs.every(f=>fs.existsSync(path.join(folder,f))),'REQUIRED_FILE_MISSING');
 const source=envelope.provenance;
 assert(source && typeof source.source==='string'&&
   source.source.includes('V40'),'UNATTRIBUTED_SOURCE');
 if(historicalFile){
  const historical=JSON.parse(fs.readFileSync(path.resolve(historicalFile),'utf8'));
  assert.equal(historical.schema,'station-x-curated-v62');
  assert.equal(historical.deck_id,677);
  assert.equal(historical.format,record.format);
  assert.deepEqual(canonicalRows(slotsFromRecord(historical)),
    canonicalRows(rows),'HISTORICAL_PHYSICAL_DRIFT');
  assert.deepEqual(historical.routes.map(x=>x.id),routeIds,
    'HISTORICAL_ROUTE_IDS_DRIFT');
  assert.equal(source.native_snapshot_path,EXPECTED_HISTORICAL,
    'MISSING_NATIVE_SNAPSHOT_PATH');
  assert.equal(source.native_snapshot_blob_sha,'1c23d72192199d9324a4b55dd1ced3d0bdd43997',
    'HISTORICAL_BLOB_PROVENANCE_CHANGED');
 } else assert(false,'HISTORICAL_SOURCE_REQUIRED_FOR_CLOSURE');
 const result={ok:true,deck_id:deckId,format:record.format,schema:record.schema,
  inventoryBinding:envelope.inventory_binding,contentMode:envelope.content_mode,
  physical:counts,nativeInventoryRows:rows.length,physicalCIDs:record.cards.length,
  routeIDs:routeIds.length,routeSteps:record.routes.reduce((n,r)=>n+r.steps.length,0),
  photos:imgFiles.length,calculatorRulesPresent:record.calculator?.rules?.length||0,
  archivePackageRoot:root,sourceDocument:envelope.source_document,
  hashSynthesized:false,identitiesVsHistorical:true,routesVsHistorical:true,
  liveStationXInventoryRead:false,engineExecuted:false,importPublished:false};
 return result;
}
if(require.main===module){
 const args=process.argv.slice(2);
 assert(args.includes('--user-assigned'),'EXPLICIT_ASSIGNMENT_REQUIRED');
 const id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const paths=args.filter(x=>!x.startsWith('--'));
 assert(paths.length===3,'REQUIRE_PACKAGE_MD_HISTORICAL');
 console.log(JSON.stringify(inspect({deckId:id,packageFile:paths[0],
  documentFile:paths[1],historicalFile:paths[2]})));
}
module.exports={inspect};
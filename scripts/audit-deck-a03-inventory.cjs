'use strict';
/**
 * A03 native inventory audit for an explicitly assigned loaded deck.
 * Compare three independent repository representations: owner-approved
 * CRYH-001..039 matrix, GPT portable inventory/record and Platform V40.
 *
 * No card mutation, no new inventory_sha256, no simulator, no live DB calls.
 */
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..');
const DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
const EXPECTED_ROOT='DECK_NUEVO_13_CRISTRON_HORUS';
const NATIVE_FORMAT='tcg_advanced';
const SECTIONS=['main','extra','side','reserve'];
const EXPECTED_COUNTS={main:40,extra:15,side:15,reserve:0};
const OFFICIAL='https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=';

function stableRows(cards) {
 const list=[];
 for(const card of cards) {
  assert(Number.isInteger(card.cid)&&card.cid>0,'INVALID_CID');
  assert(typeof card.name==='string'&&card.name.length>1,'MISSING_CARD_NAME');
  for(const slot of card.slots) {
   assert(SECTIONS.includes(slot.section),'INVALID_SECTION');
   assert(Number.isInteger(slot.card_id)&&slot.card_id>0,'INVALID_NATIVE_ROW_ID');
   assert(Number.isInteger(slot.quantity)&&slot.quantity>=1&&slot.quantity<=3,
    'INVALID_SLOT_QUANTITY');
   list.push({id:slot.card_id,cid:card.cid,name:card.name,
     section:slot.section,quantity:slot.quantity});
  }
 }
 list.sort((a,b)=>a.id-b.id);
 return list;
}
function totals(rows) {
 const result={main:0,extra:0,side:0,reserve:0};
 for(const row of rows) result[row.section]+=row.quantity;
 return result;
}
function matrixRows(document) {
 const lines=document.split('\n').filter(line=>/^\| CRYH-\d{3} \|/.test(line));
 const entries=[];
 for(const line of lines) {
  const c=line.split('|').slice(1,-1).map(v=>v.trim());
  assert.equal(c.length,9,'BAD_A06_MATRIX_ROW');
  const m=/^CRYH-(\d{3})$/.exec(c[0]);
  assert(m,'BAD_ROW_REFERENCE');
  const quantities=c.slice(2,6).map(v=>Number(v));
  assert(quantities.every(n=>Number.isInteger(n)&&n>=0),'BAD_MATRIX_QUANTITY');
  const link=/^\[(\d+)\]\((https:\/\/www\.db\.yugioh-card\.com\/yugiohdb\/card_search\.action\?cid=(\d+)&ope=2&request_locale=(?:en|es))\)$/.exec(c[6]);
  assert(link,'INVALID_OFFICIAL_CID_LINK_'+c[0]);
  assert.equal(link[1],link[3],'SOURCE_CID_MISMATCH');
  entries.push({id:Number(m[1]),reference:c[0],name:c[1],
   counts:Object.fromEntries(SECTIONS.map((s,i)=>[s,quantities[i]])),
   cid:Number(link[1]),source:link[2]});
 }
 return entries;
}
function inspect({deckId,packagePath,documentPath,historicalPath}) {
 assert.equal(deckId,677,'EXPLICIT_CRYSTRON_677_ONLY');
 const packageFile=path.resolve(packagePath),documentFile=path.resolve(documentPath);
 assert(packageFile.startsWith(DECKS)&&documentFile.startsWith(DECKS),'UNAPPROVED_PATH');
 assert.equal(path.basename(path.dirname(path.dirname(packageFile))),EXPECTED_ROOT);
 assert.equal(path.dirname(documentFile),path.dirname(path.dirname(packageFile)),'CROSS_DECK');
 const pkg=JSON.parse(fs.readFileSync(packageFile,'utf8'));
 const doc=fs.readFileSync(documentFile,'utf8');
 const prior=JSON.parse(fs.readFileSync(path.resolve(historicalPath),'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');
 assert.equal(pkg.deck_id,677);
 assert.equal(pkg.record.deck_id,677);
 assert.equal(pkg.record.format,NATIVE_FORMAT);
 assert.equal(prior.deck_id,677);
 assert.equal(prior.format,NATIVE_FORMAT);
 assert.equal(pkg.record.schema,'station-x-curated-v62');
 assert.equal(pkg.inventory_binding,'deck-slots-v1');
 assert(!Object.hasOwn(pkg,'inventory_sha256'),'NO_FAKE_LIVE_INVENTORY_HASH');

 const record=pkg.record;
 assert.equal(record.cards.length,39,'CARD_CID_COUNT_CHANGED');
 assert.equal(prior.cards.length,39,'HISTORICAL_CARD_COUNT_CHANGED');
 assert.equal(new Set(record.cards.map(c=>c.cid)).size,39,'DUPLICATE_CID');
 assert(Array.isArray(record.skills)&&record.skills.length===0,'UNDECLARED_SKILL');
 const rows=stableRows(record.cards);
 const referenceRows=stableRows(prior.cards);
 assert.equal(rows.length,40,'NATIVE_ROW_COUNT_CHANGED');
 assert.equal(new Set(rows.map(r=>r.id)).size,40,'DUPLICATED_CARD_ID');
 assert.deepEqual(rows,referenceRows,'HISTORICAL_ID_CID_NAME_SLOT_OR_COUNT_DRIFT');
 assert.deepEqual(totals(rows),EXPECTED_COUNTS,'PHYSICAL_INVENTORY_CHANGED');
 assert.equal(rows.reduce((n,r)=>n+r.quantity,0),70,'TOTAL_COPIES_CHANGED');
 const nativeInventory=pkg.inventory.map(r=>({id:r.id,section:r.section,
   quantity:r.quantity,name:r.card_name})).sort((a,b)=>a.id-b.id);
 assert.equal(nativeInventory.length,40,'PORTABLE_INVENTORY_ROWS_MISSING');
 assert.equal(new Set(nativeInventory.map(r=>r.id)).size,40,'DUPLICATED_PORTABLE_ID');
 assert.deepEqual(nativeInventory,rows.map(r=>({id:r.id,section:r.section,
   quantity:r.quantity,name:r.name})), 'PORTABLE_ROWS_DISAGREE_WITH_RECORD');
 const table=matrixRows(doc);
 assert.equal(table.length,39,'MISSING_A06_CARD_MATRIX_ROW');
 assert.equal(new Set(table.map(x=>x.id)).size,39,'DUPLICATE_CRYH_REFERENCE');
 assert.equal(new Set(table.map(x=>x.cid)).size,39,'DUPLICATE_CRYH_CID');
 assert.deepEqual(table.map(x=>x.reference),
   Array.from({length:39},(_,i)=>'CRYH-'+String(i+1).padStart(3,'0')),
   'CHANGED_CRYH_LOCAL_IDENTITIES');
 const cardByCid=new Map(record.cards.map(c=>[c.cid,c]));
 for(const line of table){
  const card=cardByCid.get(line.cid);
  assert(card,'MISSING_CARD_FROM_MATRIX_'+line.reference);
  assert.equal(line.name,card.name,'ALIAS_OR_WRONG_NAME_'+line.reference);
  assert(line.source.startsWith(OFFICIAL+line.cid),'WRONG_KONAMI_CID_LINK');
  const expected={main:0,extra:0,side:0,reserve:0};
  for(const slot of card.slots)expected[slot.section]+=slot.quantity;
  assert.deepEqual(line.counts,expected,'MATRIX_SLOT_MISMATCH_'+line.reference);
 }
 const purulia=cardByCid.get(20206);
 assert(purulia,'MISSING_PURULIA');
 assert.deepEqual(purulia.slots.map(s=>[s.section,s.quantity]).sort((a,b)=>a[0].localeCompare(b[0])),
  [['main',2],['side',1]],'PURULIA_COPIES_OR_ZONES_CHANGED');
 assert.equal(record.cards.filter(c=>c.slots.length>1).length,1,
  'UNDECLARED_MULTIZONE_CARD');

 const hand=doc.indexOf('### A03.1 — Acta de cotejo de inventario');
 const approval=doc.slice(hand,doc.indexOf('**Dictamen A03:**',hand));
 assert(hand>=0&&approval.includes('APROBADO_EXPRESAMENTE_18-11-2026')&&
  approval.includes('40 Main')&&approval.includes('15 Extra')&&
  approval.includes('15 Side'),'OWNER_APPROVAL_NOT_GROUNDED');
 const ledgerStart=doc.indexOf('## CONTROL_DE_TAREAS_A01_A10 —');
 const ledgerEnd=doc.indexOf('\n---\n',ledgerStart);
 assert(ledgerStart>=0&&ledgerEnd>ledgerStart,'MISSING_CURRENT_TASK_LEDGER');
 const ledger=doc.slice(ledgerStart,ledgerEnd);
 const ids=['A01','A02','A03'].flatMap(s=>Array.from({length:3},
  (_,i)=>s+'-T'+(i+1)));
 const marks=[...ledger.matchAll(/^- \[x\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)]
  .map(x=>x[1]);
 assert.deepEqual(marks,ids,'A03_MUST_CLOSE_EXACTLY_NINE_TASKS');
 assert(ledger.includes('9/35')&&ledger.includes('26/35'),'MISSING_PROGRESS_RECONCILIATION');
 assert(doc.includes('### A03.2 — auditoría del contrato físico'),
  'MISSING_A03_CERTIFICATION_EVIDENCE');
 const routes=record.routes;
 assert.equal(routes.length,14,'HISTORICAL_ROUTE_COUNT_CHANGED');
 assert.deepEqual(routes.map(r=>r.id),prior.routes.map(r=>r.id),
  'FROZEN_ROUTE_IDENTITIES_CHANGED');
 const stepCount=routes.reduce((n,r)=>n+r.steps.length,0);
 assert.equal(stepCount,60,'DOCUMENTARY_STEPS_CHANGED');
 const portableVariants=record.calculator?.rules||[];
 assert.equal(portableVariants.length,13,'PORTABLE_VARIANTS_CHANGED');
 // A05 has not yet enumerated official effect_id; variants are not official effects.
 return {
  ok:true, deck_id:677, format:NATIVE_FORMAT,
  physical:totals(rows),copies:70,cids:cardByCid.size,
  nativeRows:rows.length,matrixRows:table.length,
  approvedInventory:true,alternateMainSidePurulia:true,
  routes:routes.length,steps:stepCount,portableVariants:portableVariants.length,
  completeOfficialEffectCount:null,skills:record.skills.length,
  exactHistoricalRows:true,stableCardIds:true,documentedOfficialCIDLinks:39,
  taskProgress:{closed:marks.length,required:35,pending:35-marks.length},
  engineExecuted:false,liveStationXInventoryRead:false,importPublished:false
 };
}
if(require.main===module){
 const args=process.argv.slice(2);
 assert(args.includes('--user-assigned'),'USER_ASSIGNMENT_REQUIRED');
 const id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const files=args.filter(x=>!x.startsWith('--'));
 assert(files.length===3,'REQUIRE_PACKAGE_DOC_HISTORICAL');
 console.log(JSON.stringify(inspect({deckId:id,packagePath:files[0],
  documentPath:files[1],historicalPath:files[2]})));
}
module.exports={inspect,matrixRows,stableRows};
'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const dir=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const pkg=JSON.parse(fs.readFileSync(path.join(dir,'datos/stationx-deck.json'),'utf8'));
const doc=fs.readFileSync(path.join(dir,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'),'utf8');
function audit(){
 const gate=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A06',authorizedSideOmissionForA06:true});
 A(gate.eligible&&gate.a06SideWaiverApplied,'A06_USER_ASSIGNMENT');
 A.deepEqual(gate.counts,{main:42,extra:15,side:0,reserve:19});
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A07',authorizedSideOmissionForA06:true}).eligible,'NO_A07_WAIVER');
 A(!validateDeckAssignment({selectedDeckId:666,explicitlyAssigned:true,payload:pkg,stageId:'A06',authorizedSideOmissionForA06:true}).eligible,'NO_OTHER_DECK');
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A06'}).eligible,'NO_UNAUTHORIZED_WAIVER');
 const r=pkg.record,review=r.a06_review;
 A(review&&review.status==='DOCUMENTAL_COMPLETA_NO_REPLAY'&&!review.banlist_evaluated);
 A.equal(r.cards.length,38);A.equal(pkg.inventory.length,44);A.equal(review.card_evaluations.length,38);A.equal(review.paper_cases.length,42);
 A.equal(r.causal_relations.length,21);A.equal(r.engine_maps.length,21);A(!r.calculator?.rules?.length);
 const cards=new Map(r.cards.map(c=>[c.cid,c]));A.equal(cards.size,38);
 const seen=new Set(),rids=new Set(),paperIds=new Set();
 for(const c of review.card_evaluations){
  A(cards.has(c.cid)&&!seen.has(c.cid),'CARD_MISSING_OR_DUPLICATE');seen.add(c.cid);
  A.deepEqual(c.slots,cards.get(c.cid).slots,'SLOT_MISMATCH');
  A(c.a05_effect_ids.length>0&&c.a05_effect_ids.every(id=>doc.includes(id)),'NOT_LINKED_TO_A05');
  A(c.source.includes('cid='+c.cid+'&')&&c.image.endsWith('/'+c.cid+'.jpg'));
  A(c.funcion.length>20&&c.requisito.length>8);
  if(c.slots.every(s=>s.section==='reserve'))A.equal(c.estado,'RESERVA_NO_DISPONIBLE','RESERVE_NOT_ACTIVE');
  if(c.cid===15366||c.cid===15882)A.equal(c.estado,'SIN_RUTA_ACREDITADA','NO_FALSE_FOSSIL_FUSION');
 }
 for(const x of r.causal_relations){
  A(!rids.has(x.id)&&cards.has(x.origen.cid)&&cards.has(x.destino.cid),'BAD_RELATION_ID');rids.add(x.id);
  A(doc.includes(x.effect_id)&&x.condicion.length>15&&x.fallo.length>15,'UNSOURCED_RELATION');
  for(const n of [x.origen,x.destino]){
   const valid=cards.get(n.cid).slots.filter(s=>s.section.toLowerCase()===n.zona.toLowerCase()).reduce((v,s)=>v+s.quantity,0);
   A.equal(n.copias,valid,'MAIN_AND_RESERVE_MIXED');
   A(n.zona.toLowerCase()!=='reserve','RESERVE_AS_ACTIVE');
  }
  A(r.engine_maps.some(m=>m.relation_id===x.id&&m.photos.length===2),'NO_CARD_PHOTOGRAPHS');
 }
 for(const c of review.paper_cases){
  A(!paperIds.has(c.id)&&rids.has(c.relation_id)&&doc.includes(c.effect_id));paperIds.add(c.id);
  A(c.status==='PAPER_NOT_ENGINE'&&['POSITIVO_CONDICIONAL','NEGATIVO'].includes(c.kind));
 }
 A.equal(paperIds.size,42,'PAPER_CASES_NOT_COMPLETE');
 const ledger=doc.slice(doc.indexOf('## CONTROL_DE_TAREAS_A01_A10'),doc.indexOf('\n---\n'));
 A(ledger.includes('20/35')&&ledger.includes('15/35'),'LEDGER_COUNTS');
 for(let n=1;n<=4;n++){A(ledger.includes('- [x] **A06-T'+n+'**'),'MISSING_A06_TASK');A(ledger.includes('- [ ] **A07-T'+n+'**'),'A07_PREMATURE');}
 const sec=doc.slice(doc.indexOf('## APARTADO_06 — Kashtira Pure 665 · motores y relaciones (23-11-2026)'));
 A(sec.length>10000&&sec.includes('### A06.5 —'),'NO_A06_STUDY');
 const tick=String.fromCharCode(96);
 A.equal(sec.split('\n').filter(line=>line.startsWith('| '+tick+'665:CARD:')).length,38,'A06_MISSING_CARDS');
 A.equal(sec.split('\n').filter(line=>line.startsWith('| '+tick+'A06:REL:')).length,21,'A06_MISSING_EDGES');
 A.equal(sec.split('\n').filter(line=>line.startsWith('| '+tick+'665:A06:')).length,42,'A06_MISSING_CASES');
 const bad=structuredClone(pkg);bad.inventory[0].section='side';
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:bad,stageId:'A06',authorizedSideOmissionForA06:true}).eligible,'NO_INVENTORY_SPOOFING');
 return{ok:true,deck_id:665,stage:'A06',completed:20,pending:15,cards:38,relations:21,paperCases:42,banlist:false,calculation:false,imported:false};
}
if(require.main===module){
 A(process.argv.includes('--deck-id=665')&&process.argv.includes('--user-assigned')&&process.argv.includes('--authorized-side-waiver'));
 console.log(JSON.stringify(audit()));
}
module.exports={audit};
'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const dir=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const pkg=JSON.parse(fs.readFileSync(path.join(dir,'datos/stationx-deck.json'),'utf8'));
const doc=fs.readFileSync(path.join(dir,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'),'utf8');
const COUNTS={main:42,extra:15,side:0,reserve:19};
const TICK=String.fromCharCode(96);
function audit(){
 const good=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A08',authorizedSideOmissionForA08:true});
 A(good.eligible&&good.a08SideWaiverApplied,'A08_USER_ASSIGNMENT');
 A.deepEqual(good.counts,COUNTS,'A08_INVENTORY_PRESERVATION');
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A09',authorizedSideOmissionForA08:true}).eligible,'NO_A09_WAIVER');
 A(!validateDeckAssignment({selectedDeckId:666,explicitlyAssigned:true,payload:pkg,stageId:'A08',authorizedSideOmissionForA08:true}).eligible,'NO_OTHER_DECK');
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:false,payload:pkg,stageId:'A08',authorizedSideOmissionForA08:true}).eligible,'NO_IMPLICIT_USER_ASSIGNMENT');
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A08'}).eligible,'NO_SIDE_WAIVER_BY_DEFAULT');
 const r=pkg.record,s=r.a08_review,A(s&&s.schema==='station-x-jugada-analysis/1');
 A.equal(s.deck_id,665);A.equal(s.format,'tcg_advanced');
 A(s.status==='EXPLORACION_DOCUMENTAL_COMPLETA_NO_CERTIFICA_A09'&&s.banlist_evaluated===false);
 A.deepEqual(s.inventory,COUNTS);A.equal(s.summary.certified_complete_combos,0);
 A.equal(r.routes.length,16);A.equal(r.routes.reduce((a,x)=>a+x.steps.length,0),92);
 A.equal(r.cards.length,38);A.equal(pkg.inventory.length,44);
 A.equal(s.route_candidates.length,16);A.equal(s.relation_candidates.length,21);
 A.equal(s.role_index.length,38);A.equal(s.decisions.length,4);A.equal(s.contrasts.length,48);
 A(!r.calculator?.rules?.length,'NO_CALCULATOR_A10B');
 const byCid=new Map(r.cards.map(x=>[x.cid,x]));
 A.equal(byCid.size,38);
 const a07=new Set(r.a07_review.rules.map(x=>x.rule_id)),a06=new Map(r.causal_relations.map(x=>[x.id,x]));
 const rids=new Set(),jids=new Set(),routeIds=new Set(r.routes.map(x=>x.id));
 const actualStepPhotos=r=>r.steps.filter(x=>x.photos?.length).length;
 for(let i=0;i<16;i++){
  const candidate=s.route_candidates[i],hist=r.routes[i];
  A(!jids.has(candidate.jugada_id)&&!rids.has(candidate.historical_route_id),'ROUTE_DUPLICATE');
  jids.add(candidate.jugada_id);rids.add(candidate.historical_route_id);
  A.equal(candidate.historical_route_id,hist.id,'HISTORICAL_ROUTE_ID_MISMATCH');
  A.equal(candidate.steps_count,hist.steps.length,'HISTORICAL_STEPS_CHANGED');
  A.equal(candidate.steps_with_photos,actualStepPhotos(hist),'PHOTO_STEP_COVERAGE_UNGROUNDED');
  A(candidate.category!=='COMBO_COMPLETO'&&candidate.independent_complete_combo_certified===false,'FALSE_CERTIFIED_COMBO');
  A.equal(candidate.legalidad_documental,'CONDICIONAL_PENDIENTE_A09');
  A(candidate.soporte_calculadora==='OPERADOR_PENDIENTE_A10B');
  A(candidate.objective&&candidate.requirements&&candidate.blocking_condition);
  A(candidate.source_a07_rules.length>0&&candidate.source_a07_rules.every(x=>a07.has(x)),'A07_RULE_NOT_FOUND');
  A(candidate.source_a06_relations.every(x=>a06.has(x)),'A06_UNKNOWN_RELATION');
  A(candidate.parent_route_id===null||routeIds.has(candidate.parent_route_id),'MISSING_PARENT_ROUTE');
  A.equal(candidate.confirmed_hand_photos.length,candidate.initial_hand_cids.length,'HAND_PHOTO_DISAGREEMENT');
  for(let q=0;q<candidate.initial_hand_cids.length;q++){
   const cid=candidate.initial_hand_cids[q],c=byCid.get(cid),p=candidate.confirmed_hand_photos[q];
   A(c&&c.slots.some(s=>s.section==='main'&&s.card_id===p.card_id),'EXTRA_OR_RESERVE_IN_INITIAL_HAND');
   A.equal(p.cid,cid);A.equal(p.image,c.image);A(p.image.endsWith('/'+cid+'.jpg'));
  }
  A(candidate.participants.length>0);
  for(const part of candidate.participants){
   const c=byCid.get(part.cid);
   A(c&&c.slots.some(s=>s.section===part.zone&&s.card_id===part.card_id),'FOREIGN_OR_RESERVE_PARTICIPANT');
   A.equal(part.physical_copies,c.slots.find(s=>s.card_id===part.card_id).quantity,'COPY_QTY_DRIFT');
   A(part.verified_step_participation===false,'UNSUPPORTED_A09_CERTIFICATION');
  }
  A(candidate.endboard_status==='DOCUMENTADO_SIN_CERTIFICACION_ESPACIAL_A09','A09_SPATIAL_PREMATURE');
 }
 A.equal(rids.size,16);A.equal(jids.size,16);
 const knownDiscrepancy=s.route_candidates.find(x=>x.historical_route_id.endsWith('ARISE3MAT08'));
 A(knownDiscrepancy.known_issue.includes('FOTO_ARISE_EN_MANO'),'MISSING_EXTRA_IN_HAND_WARNING');
 const fenrirMismatch=s.route_candidates.find(x=>x.historical_route_id.endsWith('SHANGRI02'));
 A(fenrirMismatch.known_issue.includes('FOTO_MANO_ADICIONAL'),'MISSING_HAND_MISMATCH_WARNING');
 const edges=new Set();
 for(const c of s.relation_candidates){
  A(!edges.has(c.jugada_id)&&a06.has(c.source_a06_relation_id),'DUPLICATE_OR_FOREIGN_EDGE');edges.add(c.jugada_id);
  const edge=a06.get(c.source_a06_relation_id);
  A.equal(c.actor_cid,edge.origen.cid);A.equal(c.dest_cid,edge.destino.cid);
  A.equal(c.source_a07_rule_id,edge.effect_id.replace('a05','a07'),'A05_TO_A07_FK');
  A(a07.has(c.source_a07_rule_id),'A07_EFFECT_MISSING');
  A(c.complete_combo===false&&c.a09_route_link===null,'EDGE_FALSE_COMBO');
  A(c.photos.length===2&&c.photos.every(p=>byCid.get(p.cid)?.image===p.image),'EDGE_PHOTO_MISMATCH');
  A(c.entry.length>10&&c.blocking_condition.length>10,'EDGE_GUARD_MISSING');
  if(c.source_a06_relation_id==='A06:REL:207')A(c.category==='NO_EJECUTABLE_RESTRICCION'&&c.state==='NO_EJECUTABLE');
 }
 A.equal(edges.size,21);
 const roleIds=new Set(),reserveOnly=[];
 for(const x of s.role_index){
  const c=byCid.get(x.cid);
  A(c&&!roleIds.has(x.cid),'ROLE_CID_DUPLICATED');roleIds.add(x.cid);
  A.deepEqual(x.slots,c.slots,'CARD_SLOTS_RECLASSIFIED');
  A(x.photo===c.image&&x.effect_refs.length>0&&x.reason_without_route.length>10);
  A(x.a08_initial_hand_links.every(id=>jids.has(id)),'ROLE_FOREIGN_STARTER');
  A(x.a08_route_documentary_links.every(id=>jids.has(id)),'ROLE_FOREIGN_ROUTE');
  A(x.a08_interaction_links.every(id=>edges.has(id)),'ROLE_FOREIGN_INTERACTION');
  if(c.slots.every(k=>k.section==='reserve')){
   A.equal(x.physical_availability,'RESERVA_NO_DISPONIBLE');reserveOnly.push(x.cid);
  }
  if([15366,15882].includes(x.cid))A.equal(x.status,'SIN_JUGADA_ACREDITADA','FALSE_FOSSIL_ACCESS');
 }
 A.equal(roleIds.size,38);A.equal(reserveOnly.length,7,'RESERVE_IDENTITY_COUNT');
 const decIds=new Set(r.decisions.map(d=>d.id));
 A(s.decisions.every(d=>decIds.has(d.jugada_id.split(':').at(-1))&&d.complete_combo===false),'DECISION_FALSE_COMBO');
 const cases=new Set(),types={};
 for(const t of s.contrasts){
  A(!cases.has(t.case_id),'DUPLICATE_A08_SCENARIO');cases.add(t.case_id);
  A(t.status==='PAPEL_NO_REPLAY'&&t.initial_state.length>3&&t.expected_legal.length>3);
  A(t.source_rule_ids.every(id=>a07.has(id)),'SCENARIO_FOREIGN_RULE');
  types[t.category]=(types[t.category]||0)+1;
 }
 A.equal(cases.size,48);
 A.deepEqual(types,{RUTA_CON_RECURSOS:16,RUTA_SIN_RECURSO:16,MOTOR_GUARDA_PRESENTE:4,MOTOR_GUARDA_AUSENTE:4,DECISION_ESTADO_HABILITANTE:4,DECISION_GUARDA_FALSA:4},'A08_TEST_DISTRIBUTION');
 const ledger=doc.slice(doc.indexOf('## CONTROL_DE_TAREAS_A01_A10'),doc.indexOf('\n---\n'));
 A(ledger.includes('28/35')&&ledger.includes('7/35'),'A08_PROGRESS_DRIFT');
 for(let n=1;n<=4;n++){A(ledger.includes('- [x] **A08-T'+n+'**'),'A08_TASK_NOT_CLOSED');A(ledger.includes('- [ ] **A09-T'+n+'**'),'A09_EARLY_CLOSURE');}
 const s8=doc.slice(doc.indexOf('## APARTADO_08 — Kashtira Pure 665 · exploración'));
 A(s8.length>20000&&s8.includes('### A08.5 —'),'A08_CANONICAL_NOT_PRESENT');
 const between=(start,end)=>s8.slice(s8.indexOf(start),s8.indexOf(end));
 A.equal(between('### A08.1','### A08.2').split('\n').filter(line=>line.startsWith('| '+TICK+'665:A08:ROUTE:')).length,16);
 A.equal(between('### A08.2','### A08.3').split('\n').filter(line=>line.startsWith('| '+TICK+'665:A08:EDGE:')).length,21);
 A.equal(between('### A08.4','### A08.5').split('\n').filter(line=>line.startsWith('| '+TICK+'665:A08:')).length,48);
 const m0=doc.indexOf('### APARTADO_06 — Matriz única'),m1=doc.indexOf('### Fichas de cartas',m0);
 A(m0>0&&m1>m0,'CANONICAL_A06_MATRIX_MISSING');
 const matrix=doc.slice(m0,m1);
 const rows=matrix.split('\n').filter(x=>x.startsWith('| '+TICK+'665:CARD:'));
 A.equal(rows.length,38,'A06_MATRIX_ROW_DRIFT');
 for(const x of s.role_index){
  const line=rows.find(y=>y.startsWith('| '+TICK+'665:CARD:'+x.cid+TICK+' '));
  A(line&&line.includes('A08 candidatas documentales'),'A08_NOT_LINKED_IN_A06_MATRIX');
 }
 const altered=structuredClone(pkg);altered.inventory[0].section='side';
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:altered,stageId:'A08',authorizedSideOmissionForA08:true}).eligible,'NO_RESERVE_TO_SIDE');
 return {ok:true,deck_id:665,stage:'A08',completed:28,pending:7,route_candidates:16,a06_edges:21,card_roles:38,contrasts:48,certified_A09:0,banlist:false,calculator:false,imported:false};
}
if(require.main===module){
 A(process.argv.includes('--deck-id=665')&&process.argv.includes('--user-assigned')&&process.argv.includes('--authorized-side-waiver'));
 console.log(JSON.stringify(audit()));
}
module.exports={audit};
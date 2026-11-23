'use strict';
/** Independent A09 resource-consistency audit; documentary conditional states
 * are NEVER claimed as engine/card-simulator replays or verified opponent actions.
 */
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const folder=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const pkg=JSON.parse(fs.readFileSync(path.join(folder,'datos/stationx-deck.json'),'utf8'));
const doc=fs.readFileSync(path.join(folder,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'),'utf8');
function audit(){
 const gate=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,stageId:'A09',authorizedSideOmissionForA09:true,payload:pkg});
 A(gate.eligible&&gate.a09SideWaiverApplied,'A09_SCOPED_ASSIGNMENT');
 A.deepEqual(gate.counts,{main:42,extra:15,side:0,reserve:19});
 const r=pkg.record,s=r.a09_review,trace=s.symbolic_paper_traces,finals=s.detailed_route_closure.route_finals;
 A.equal(r.routes.length,16);A.equal(pkg.inventory.length,44);A.equal(r.cards.length,38);
 A.equal(trace.routes.length,16);A.equal(finals.length,16);A.equal(s.route_assessments.length,16);
 A.equal(s.stage,'A09-T4');A.equal(s.status,'COMPLETA_DOCUMENTAL_CON_RUTAS_CONDICIONALES_NO_REPLAY');
 A.equal(s.summary.documentary_steps_with_before_after,92);
 A.equal(s.summary.certified_combos,0);A.equal(s.summary.engine_replays,0);
 A.equal(s.summary.spatial_endboards_certified,0);
 A.equal(s.documentary_closure.status,'A09_DOCUMENTAL_CERRADA_NO_EQUIVALE_A_REPLAY_NI_GUIA_VISUAL_A10A');
 A(!r.calculator?.rules?.length,'A10B_NOT_AUTHORIZED');
 const byCid=new Map(r.cards.map(c=>[c.cid,c])),sourceCase=new Map(r.a07_review.cases.map(x=>[x.case_id,x]));
 function flatten(snap){
  for(const key of ['hand','monster','field_spell','spell_trap_up','spell_trap_set','graveyard','banished_faceup'])
    A(Array.isArray(snap[key]),'MISSING_ZONE_'+key);
  A(Array.isArray(snap.xyz_materials)&&snap.opponent,'MISSING_XYZ_OR_OPPONENT');
  const direct=['hand','monster','field_spell','spell_trap_up','spell_trap_set','graveyard','banished_faceup'].flatMap(k=>snap[k]);
  const xyz=snap.xyz_materials.flatMap(x=>{
   A(snap.monster.some(m=>m.uid===x.xyz.uid&&m.cid===x.xyz.cid),'ORPHANED_XYZ_MATERIAL');
   return x.cards;
  });
  const objects=[...direct,...xyz], seen=new Set(),frequency=new Map();
  for(const obj of objects){
   A(obj&&Number.isInteger(obj.cid)&&/^\d+#\d+$/.test(obj.uid),'INVALID_COPY');
   A(!seen.has(obj.uid),'DUPLICATE_PHYSICAL_COPY_'+obj.uid);
   seen.add(obj.uid);frequency.set(obj.cid,(frequency.get(obj.cid)||0)+1);
   A(byCid.has(obj.cid),'FOREIGN_CID');
  }
  for(const [cid,n] of frequency){
   const limit=byCid.get(cid).slots.filter(slot=>['main','extra'].includes(slot.section)).reduce((x,y)=>x+y.quantity,0);
   A(n<=limit,'OVERDECK_COPY_'+cid);
  }
  A(snap.known_only===true&&snap.unseen_other_hand_cards==='NO_IDENTIFICADAS_NO_ANADIDAS');
  A(snap.unseen_opponent_cards==='NO_IDENTIFICADAS_NO_ANADIDAS');
  A(Array.isArray(snap.opponent.known_field_cids));
  A(snap.opponent.known_field_cids.every(cid=>cid===17800),'OPPONENT_IDENTITY_INVENTED');
  if(snap.opponent.blocked_zones>0)A(snap.monster.some(x=>x.cid===17800),'BLOCK_WITHOUT_SHANGRI');
  return seen;
 }
 function idsEqual(x,y){return JSON.stringify([...x].sort())===JSON.stringify([...y].sort())}
 let n=0,materialLinks=0;
 for(let i=0;i<16;i++){
  const route=r.routes[i],t=trace.routes[i],f=finals[i],assessment=s.route_assessments[i];
  A.equal(route.id,t.route_id);A.equal(f.route_id,t.route_id);A.equal(assessment.route_id,t.route_id);
  A.equal(t.steps.length,route.steps.length);
  A.deepEqual(t.initial_hand_cids,r.a08_review.route_candidates[i].initial_hand_cids);
  A.equal(assessment.certified_real_duel,false);
  let previous=null;
  for(let j=0;j<t.steps.length;j++){
   const st=t.steps[j],src=route.steps[j];
   A.equal(st.step_id,'665:A09:R'+String(i+1).padStart(2,'0')+':S'+String(j+1).padStart(2,'0'));
   A.equal(st.source_action,src.action,'STEP_SOURCE_CHANGED');
   A.equal(st.engine_replay,false);A.equal(st.rule_outcome_guaranteed,false);
   const before=flatten(st.before),after=flatten(st.after);
   if(previous)A.deepEqual(st.before,previous,'BROKEN_STEP_CONTINUITY');
   for(const uid of before)A(after.has(uid),'MATERIAL_OR_CARD_DISAPPEARED_'+uid);
   previous=st.after;n++;
   A(src.photos?.length,'MISSING_STEP_PHOTO');
   for(const ph of src.photos){
    A(byCid.has(ph.cid),'UNKNOWN_STEP_PHOTO');
    A.equal(ph.image,byCid.get(ph.cid).image,'PHOTO_SOURCE_CHANGED');
   }
   materialLinks+=st.after.xyz_materials.reduce((m,x)=>m+x.cards.length,0);
  }
  A.deepEqual(t.final,t.steps.at(-1).after);
  A.deepEqual(t.final.monster.map(x=>x.cid).sort((a,b)=>a-b),[...f.known_own_monsters].sort((a,b)=>a-b),'FINAL_MONSTERS_MISMATCH');
  for(const [xyz,cids] of Object.entries(f.xyz_materials)){
   if(!cids.length)continue; // historical Dark Armed does not specify surviving material identity
   const actual=t.final.xyz_materials.find(x=>x.xyz.cid===Number(xyz));
   A(actual,'FINAL_XYZ_MISSING');
   A.deepEqual(actual.cards.map(y=>y.cid).sort((a,b)=>a-b),[...cids].sort((a,b)=>a-b),'FINAL_MATERIALS_MISMATCH');
  }
  A.equal(f.presentation_status,'DOCUMENTADA_SIN_CAMPO_ESPACIAL');
  A.equal(f.engine_replay,false);
  A.equal(f.material_identity_verified_from_card_text,false);
  A.equal(f.interruption.continuation,'SIN_CONTINUACION_DEMOSTRADA');
  A.equal(f.interruption.cost_if_guard_false,'NO_PAGADO_POR_NO_ACTIVAR');
  const po=sourceCase.get(f.interruption.positive_paper_case_id),neg=sourceCase.get(f.interruption.negative_paper_case_id);
  A(po&&neg&&po.rule_id===neg.rule_id&&neg.rule_id===f.interruption.a07_rule_id);
  A(po.type==='POSITIVO'&&neg.type==='CONDICION_FALSA'&&po.no_replay&&neg.no_replay);
  A(!f.interruption.engine_replay,'FALSE_INTERRUPT_REPLAY');
  A(r.a08_review.route_candidates[i].independent_complete_combo_certified===false);
 }
 A.equal(n,92);
 A(materialLinks>100,'MISSING_XYZ_TRANSFER_EVIDENCE');
 A.equal(s.paper_case_links.summary.source_case_links,520);
 A.equal(s.paper_case_links.summary.engine_replays,0);
 // Deck-specific timing/negative invariants for known historically dangerous routes
 A.equal(trace.routes[1].final.opponent.blocked_zones,0,'NO_RETROACTIVE_SHANGRI_LOCK');
 A.equal(trace.routes[7].final.opponent.blocked_zones,0,'SHANGRI_LEFT_FIELD_LOCK_MUST_CLEAR');
 A.equal(trace.routes[8].final.opponent.blocked_zones,1,'SHANGRI_REMAINS_LOCK_MUST_PERSIST');
 A(trace.routes[12].steps[0].before.opponent.known_field_cids.includes(17800),'MIRROR_NEEDS_OPPONENT_SHANGRI');
 A.equal(trace.routes[12].final.xyz_materials.length,0,'ZEUS_MATERIALS_ALREADY_PAID');
 A(trace.routes[14].steps[1].after.monster.some(x=>x.cid===16386),'BARONNE_NOT_BEFORE_XYZ_LOCK');
 A.equal(trace.routes[14].steps[1].after.extra_only_xyz,false);
 A.equal(trace.routes[14].steps[3].after.extra_only_xyz,true);
 A(trace.routes[15].steps[0].before.graveyard.some(x=>x.cid===17770),'OGRE_NOT_IN_PRIOR_GY');
 A(trace.routes[15].steps[1].after.banished_faceup.some(x=>x.cid===17770),'OGRE_WAS_NOT_BANISHED');
 A(trace.routes[15].final.xyz_materials[0].cards.some(x=>x.cid===17770),'OGRE_NOT_RECOVERED_AS_MATERIAL');
 for(const idx of [13,14])A(!trace.routes[idx].final.monster.some(x=>x.cid===17768),'FUTURE_STANDBY_FENRIR_PREMATURELY_SUMMONED');
 const ledger=doc.slice(0,doc.indexOf('\n---\n'));
 A(ledger.includes('32/35')&&ledger.includes('3/35'),'COUNTER_WRONG');
 for(let n=1;n<=4;n++)A(ledger.includes('- [x] **A09-T'+n+'**'),'A09_TASK_OPEN_'+n);
 for(let n=1;n<=3;n++)A(ledger.includes('- [ ] **A10A-T'+n+'**'),'A10A_PREMATURE');
 A(doc.includes('## APARTADO_09 — CIERRE DOCUMENTAL'),'MISSING_CANONICAL_CLOSE');
 return {ok:true,deck_id:665,stage:'A09_DOCUMENTAL_CERRADO',completed:32,pending:3,routes:16,step_states:92,interruption_cases:16,referenced_paper_tests:520,spatial_endboards:0,engine_replays:0,certified_real_duel_combos:0};
}
if(require.main===module)console.log(JSON.stringify(audit()));
module.exports={audit};

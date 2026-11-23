'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const base=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const pkg=JSON.parse(fs.readFileSync(path.join(base,'datos/stationx-deck.json'),'utf8'));
const md=fs.readFileSync(path.join(base,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'),'utf8');
function audit(){
 const g=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A09',authorizedSideOmissionForA09:true});
 A(g.eligible&&g.a09SideWaiverApplied,'A09_665_GATED');
 A.deepEqual(g.counts,{main:42,extra:15,side:0,reserve:19});
 for(const x of [
  {selectedDeckId:666,explicitlyAssigned:true,stageId:'A09',authorizedSideOmissionForA09:true},
  {selectedDeckId:665,explicitlyAssigned:false,stageId:'A09',authorizedSideOmissionForA09:true},
  {selectedDeckId:665,explicitlyAssigned:true,stageId:'A09',authorizedSideOmissionForA09:false},
  {selectedDeckId:665,explicitlyAssigned:true,stageId:'A10A',authorizedSideOmissionForA09:true}
 ]) A(!validateDeckAssignment({...x,payload:pkg}).eligible,'NO_CROSS_SCOPE_WAIVER');
 const r=pkg.record,s=r.a09_review,cards=new Map(r.cards.map(c=>[c.cid,c]));
 A.equal(pkg.inventory.length,44);A.equal(r.cards.length,38);
 A(s&&s.schema==='station-x-a09-documentary-index/1'&&s.stage==='A09-T4');
 A.equal(s.deck_id,665);A.equal(s.banlist_evaluated,false);
 A.equal(r.routes.length,16);A.equal(r.routes.reduce((a,x)=>a+x.steps.length,0),92);
 A.equal(s.routes.length,16);A.deepEqual(s.inventory,g.counts);
 let photos=0,resources=0,all=0;
 const knownIds=new Set(r.routes.map(x=>x.id));
 for(let i=0;i<r.routes.length;i++){
  const rt=r.routes[i],entry=s.routes[i],pre=r.a08_review.route_candidates[i];
  A.equal(entry.route_id,rt.id);A.equal(entry.a08_id,pre.jugada_id);
  A.equal(entry.parent_id,pre.parent_route_id);
  A(entry.parent_id===null||knownIds.has(entry.parent_id),'FOREIGN_PARENT');
  A.deepEqual(entry.hand_cids,pre.initial_hand_cids);
  A.deepEqual(entry.verified_hand_photos,pre.confirmed_hand_photos);
  A.equal(entry.existing_steps,rt.steps.length);
  A.equal(entry.opening,rt.opening);
  A.equal(entry.status,'CATALOGADA_CONDICIONAL_NO_CERTIFICADA');
  for(let j=0;j<rt.steps.length;j++){
   const step=rt.steps[j],n=j+1;
   A.equal(entry.step_ids[j],`665:A09:R${String(i+1).padStart(2,'0')}:S${String(n).padStart(2,'0')}`);
   A(step.action?.trim()&&step.detail?.trim(),'INCOMPLETE_SOURCE_STEP');
   for(const photo of step.photos||[])A(cards.has(photo.cid)&&cards.get(photo.cid).image===photo.image,'PHOTO_FOREIGN_OR_WRONG_CID');
   if(step.photos?.length)photos++;else A(entry.missing_step_photos.includes(n),'UNACKNOWLEDGED_PHOTO_GAP');
   if(step.resources?.length)resources++;else A(entry.missing_step_states.includes(n),'UNACKNOWLEDGED_STATE_GAP');
   all++;
  }
 }
 A.equal(all,92);A.equal(photos,92);A.equal(resources,27);
 A.equal(s.summary.historical_routes,16);A.equal(s.summary.historical_steps,92);
 A.equal(s.summary.steps_with_photos,photos);A.equal(s.summary.steps_missing_photos,all-photos);
 A.equal(s.photo_reconciliation.historical.stepWith,57);
 A.equal(s.photo_reconciliation.historical.photos,116);
 A.equal(s.photo_reconciliation.current.stepWith,92);
 A.equal(s.photo_reconciliation.current.photos,227);
 A.equal(s.photo_reconciliation.current.hand,23);
 A.equal(s.summary.steps_with_structured_resources,resources);A.equal(s.summary.steps_missing_structured_resources,all-resources);
 A.equal(s.summary.certified_combos,0);A.equal(s.summary.engine_replays,0);A.equal(s.summary.spatial_endboards_certified,0);
 A(!r.calculator?.rules?.length,'UNAUTHORIZED_A10B_RULES');
 const ledger=md.slice(0,md.indexOf('\n---\n'));
 A((Number((ledger.match(/\b(\d+)\/35\b[^\n]*\b(\d+)\/35\b/)||[])[1]) + Number((ledger.match(/\b(\d+)\/35\b[^\n]*\b(\d+)\/35\b/)||[])[2]) === 35)&&ledger.includes('- [x] **A09-T1**'));
 for(let n=2;n<=4;n++)A(ledger.includes('- [x] **A09-T'+n+'**'),'A09_STAGE_NOT_COMPLETED');
 A(md.includes('## APARTADO_09 — Kashtira Pure 665 · catalogación T1'));
 const copy=structuredClone(pkg);copy.inventory[0].section='side';
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:copy,stageId:'A09',authorizedSideOmissionForA09:true}).eligible,'MUTATED_INVENTORY_ACCEPTED');
 A(s.documentary_closure&&s.documentary_closure.status==='A09_DOCUMENTAL_CERRADA_NO_EQUIVALE_A_REPLAY_NI_GUIA_VISUAL_A10A');
 A.equal(s.symbolic_paper_traces.routes.length,16);
 A.equal(s.summary.documentary_steps_with_before_after,92);
 return {ok:true,deck_id:665,phase:'A09-T1-T4',complete:32,pending:3,routes:16,step_resources_documentary:92,engine_replays:0,certified_combos:0};
}
if(require.main===module){
 A(process.argv.includes('--deck-id=665')&&process.argv.includes('--user-assigned')&&process.argv.includes('--authorized-side-waiver'));
 console.log(JSON.stringify(audit()));
}
module.exports={audit};

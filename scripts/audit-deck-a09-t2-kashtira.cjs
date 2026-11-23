'use strict';
// A09 T2 trace audit: evaluates source references and unknowns; not motor replay.
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const p=JSON.parse(fs.readFileSync(path.join(base,'datos/stationx-deck.json'),'utf8'));
function audit(){
 const r=p.record, s=r.a09_review,links=s.step_links;
 A.equal(p.deck_id,665);A.equal(p.inventory.length,44);A.equal(r.cards.length,38);
 A(Array.isArray(links)&&links.length===92,'STEP_COUNT');
 A.equal(r.routes.length,16);
 const byRule=new Map(r.a07_review.rules.map(x=>[x.rule_id,x]));
 const knownCid=new Set(r.cards.map(x=>x.cid)),seen=new Set();
 let linked=0,noRule=0,complete=0,incomplete=0;
 let k=0;
 for(let i=0;i<r.routes.length;i++){
  const route=r.routes[i];
  for(let j=0;j<route.steps.length;j++){
   const step=route.steps[j],t=links[k++];
   A.equal(t.route_id,route.id);A.equal(t.number,j+1);
   A.equal(t.step_id,`665:A09:R${String(i+1).padStart(2,'0')}:S${String(j+1).padStart(2,'0')}`);
   A(!seen.has(t.step_id),'DUPLICATE_STEP');seen.add(t.step_id);
   A.equal(t.step_action_source,step.action);
   A.deepEqual(t.source_photo_cids,(step.photos||[]).map(x=>x.cid));
   A(t.rule_source_is_not_replay===true && t.cost_and_window_verified_by_engine===false,'FALSE_CLAIMED_REPLAY');
   if(t.rule_evidence.length)linked++;else noRule++;
   const unique=new Set();
   for(const q of t.rule_evidence){
    const source=byRule.get(q.rule_id);
    A(source,'UNKNOWN_A07_RULE');A(!unique.has(q.rule_id),'DUPLICATE_RULE');
    unique.add(q.rule_id);
    A.equal(q.effect_id,source.effect_id);A.equal(q.cid,source.cid);A(knownCid.has(q.cid));
    for(const name of ['kind','actor_zone','guard','window','cost','target','chain_contract','expected_resolution','operator_status']){
      const src={cost:'cost_before_chain',target:'target_and_selection'}[name]||name;
      A.equal(q[name],source[src],'RULE_FIELD_DRIFT_'+name);
    }
   }
   const prev=j?route.steps[j-1].resources:null;
   if(prev?.length){
    A(t.before.type==='OCHO_ZONAS_DEL_PASO_PREVIO');
    A.deepEqual(t.before.resources,prev);
   }else{
    A(t.before.type==='ESTADO_ANTERIOR_PENDIENTE_DE_RECONSTRUCCION');
    A.equal(t.before.source,j?route.steps[j-1].action:route.opening);
   }
   if(step.resources?.length){
    A(t.after.type==='OCHO_ZONAS_HISTORICAS');
    A.deepEqual(t.after.resources,step.resources);
   }else{
    A(t.after.type==='ESTADO_NARRATIVO_NO_OCHO_ZONAS');
    A.equal(t.after.source,step.detail);
   }
   const both=!!(prev?.length && step.resources?.length);
   A.equal(t.state_completeness,both?'SNAPSHOT_DOCUMENTAL_ANCLA_A07':'TRANSICION_PENDIENTE_EVIDENCIA_POR_ZONA');
   if(both)complete++;else incomplete++;
  }
 }
 A.equal(k,92);A.equal(linked,75);A.equal(noRule,17);A.equal(complete,22);A.equal(incomplete,70);
 const summary=s.step_link_summary;
 A.equal(summary.linked_steps,92);A.equal(summary.steps_with_a07_references,linked);
 A.equal(summary.state_only_or_unmodeled,noRule);
 A.equal(summary.transitions_with_structured_before_and_after,complete);
 A.equal(summary.transitions_needing_zone_completion,incomplete);
 A.equal(summary.validated_engine_replays,0);
 A.equal(s.summary.certified_combos,0);
 A(!r.calculator?.rules?.length);
 A.equal(s.symbolic_paper_traces.routes.length,16);
 A.equal(s.symbolic_paper_traces.routes.reduce((n,x)=>n+x.steps.length,0),92);
 A.equal(s.documentary_closure.task_status.T2,'COMPLETA_DOCUMENTAL_CONDICIONAL');
 return {ok:true,deck_id:665,stage:'A09-T2-DOCUMENTAL',linked_steps:linked,state_only:noRule,historical_source_gaps:incomplete,new_documentary_snapshots:92,engine_replays:0,task_closed:true};
}
if(require.main===module){console.log(JSON.stringify(audit()));}
module.exports={audit};

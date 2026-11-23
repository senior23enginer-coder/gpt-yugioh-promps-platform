'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const p=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE/datos/stationx-deck.json'),'utf8'));
function audit(){
 const r=p.record,s=r.a09_review,z=s.paper_case_links;
 A(z&&z.schema==='station-x-a09-paper-case-links/1'&&z.deck_id===665);
 A(z.stage==='A09-T3-REFERENCIAS'&&z.status==='CASOS_EXISTENTES_ENLAZADOS_PENDIENTE_PRUEBA_DE_CONTINUACION');
 A.equal(z.route_cases.length,16);A.equal(z.step_cases.length,92);
 const sourceA07=new Map(r.a07_review.cases.map(x=>[x.case_id,x]));
 const sourceA08=new Map(r.a08_review.contrasts.map(x=>[x.case_id,x]));
 const ruleIds=new Set(r.a07_review.rules.map(x=>x.rule_id));
 const kinds=['POSITIVO','CONDICION_FALSA','VENTANA_ERRONEA','NEGACION_BLOQUEO','RECURSO_FALTANTE'];
 let links=0,occurrences=0;
 for(let i=0;i<16;i++){
  const route=r.routes[i],row=z.route_cases[i],a08=r.a08_review.route_candidates[i];
  A.equal(row.route_id,route.id);
  A.equal(row.positive_a08_case_id,a08.jugada_id+':P');
  A.equal(row.negative_a08_case_id,a08.jugada_id+':N');
  for(const id of [row.positive_a08_case_id,row.negative_a08_case_id]){
   const c=sourceA08.get(id);A(c&&c.status==='PAPEL_NO_REPLAY','A08_CASE_NOT_PAPER');
  }
  A(row.engine_replay===false&&row.interruption_followup==='SIN_CONTINUACION_DEMOSTRADA');
 }
 for(let i=0;i<92;i++){
  const row=z.step_cases[i],link=s.step_links[i];
  A.equal(row.step_id,link.step_id);A.equal(row.route_id,link.route_id);
  A.equal(row.stage_status,'PAPEL_CONDICIONAL_SIN_REPLAY');
  A.equal(row.cases.length,link.rule_evidence.length,'MISSING_EFFECT_CASE_LINK');
  for(let j=0;j<row.cases.length;j++){
   const group=row.cases[j],source=link.rule_evidence[j];
   A.equal(group.rule_id,source.rule_id);A(ruleIds.has(group.rule_id));
   A.deepEqual(group.case_types,kinds);A.equal(group.case_ids.length,5);
   A.equal(group.real_cost_payment,'NO_DEMOSTRADO');
   A.equal(group.negative_continuation,'SIN_CONTINUACION_DEMOSTRADA');
   for(let k=0;k<5;k++){
    const caseObj=sourceA07.get(group.case_ids[k]);A(caseObj,'A07_CASE_ID_INVALID');
    A.equal(caseObj.rule_id,source.rule_id);
    A.equal(caseObj.type,kinds[k]);A(caseObj.no_replay,'A07_REPLAY_FALSIFIED');
    links++;
   }
   occurrences++;
  }
 }
 A.equal(occurrences,104);A.equal(links,520);
 A.equal(z.summary.routes,16);A.equal(z.summary.steps,92);
 A.equal(z.summary.linked_rule_occurrences,occurrences);
 A.equal(z.summary.source_case_links,links);
 A.equal(z.summary.engine_replays,0);
 A.equal(z.summary.actual_paid_costs_verified,0);
 A.equal(z.summary.continuations_verified,0);
 A.equal(s.summary.certified_combos,0);
 A(!r.calculator?.rules?.length);
 return {ok:true,stage:'A09-T3-PREFLIGHT',routes:16,steps:92,rule_occurrences:104,referenced_paper_cases:520,real_interruption_replays:0,stage_closed:false};
}
if(require.main===module)console.log(JSON.stringify(audit()));
module.exports={audit};

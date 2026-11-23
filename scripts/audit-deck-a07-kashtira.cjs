'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const dir=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const pkg=JSON.parse(fs.readFileSync(path.join(dir,'datos/stationx-deck.json'),'utf8'));
const doc=fs.readFileSync(path.join(dir,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'),'utf8');
const KINDS={PRO:18,ACT:25,TRG:19,QCK:16,CONT:8,REP:4};
const CODES={P:'POSITIVO',C:'CONDICION_FALSA',Z:'ZONA_INVALIDA',W:'VENTANA_ERRONEA',R:'RECURSO_FALTANTE',U:'USO_AGOTADO',N:'NEGACION_BLOQUEO',F:'FORMATO_INCOMPATIBLE',X:'NO_MUTACION',S:'RESTRICCION_ZONA_MATERIAL'};
const TICK=String.fromCharCode(96);
function audit(){
 const gate=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A07',authorizedSideOmissionForA07:true});
 A(gate.eligible&&gate.a07SideWaiverApplied,'A07_EXPLICIT_AUTH_ONLY_665');
 A.deepEqual(gate.counts,{main:42,extra:15,side:0,reserve:19});
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A08',authorizedSideOmissionForA07:true}).eligible,'NO_A08_WAIVER');
 A(!validateDeckAssignment({selectedDeckId:666,explicitlyAssigned:true,payload:pkg,stageId:'A07',authorizedSideOmissionForA07:true}).eligible,'NO_OTHER_DECK');
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,stageId:'A07'}).eligible,'NO_WAIVER_NO_ENTRY');
 A.equal(pkg.deck_id,665);A.equal(pkg.record.format,'tcg_advanced');
 A.equal(pkg.record.cards.length,38);A.equal(pkg.inventory.length,44);A.equal(pkg.record.routes.length,16);
 A(!pkg.record.calculator?.rules?.length,'NO_UNAUTHORIZED_CALCULATOR');
 const review=pkg.record.a07_review;
 A(review&&review.schema==='station-x-rule-document/1'&&review.status==='DOCUMENTAL_COMPLETA_NO_SIMULADA');
 A.equal(review.deck_id,665);A.equal(review.format,'tcg_advanced');A.equal(review.banlist_evaluated,false);
 A.deepEqual(review.inventory_counts,gate.counts);A.equal(review.summary.rules,90);
 A.equal(review.summary.cases,900);A.equal(review.summary.source_a05_cases,630);
 A.equal(review.summary.added_cases,270);A.deepEqual(review.summary.kind_counts,KINDS);
 A.equal(review.summary.motor_executions,0);
 A.equal(review.rules.length,90);A.equal(review.cases.length,900);
 const cards=new Map(pkg.record.cards.map(c=>[c.cid,c]));A.equal(cards.size,38);
 const a05=doc.slice(doc.indexOf('### A05.2 —'),doc.indexOf('<!-- A05_EFFECTS_END -->'));
 const headings=[...a05.matchAll(/^#### (\d+)\. \x60(665:a05:(\d+):([a-z0-9-]+))\x60 — CID (\d+) \(([A-Z]+)\)$/gm)];
 A.equal(headings.length,90,'A05_FOREIGN_EFFECTS');
 const ids=new Set(),ruleIds=new Set(),caseIds=new Set(),kinds={},byRule=new Map(),cids=new Set();
 const expectedCaseKinds=Object.values(CODES);
 for(let i=0;i<headings.length;i++){
  const h=headings[i],rule=review.rules[i],cid=Number(h[3]),slug=h[4];
  const effectId=h[2],ruleId='665:a07:'+cid+':'+slug;
  A.equal(rule.rule_id,ruleId);A.equal(rule.effect_id,effectId);A.equal(rule.cid,cid);
  A.equal(rule.kind,h[6]);A(rule.status==='REGLA_DOCUMENTAL_NO_EJECUTABLE');
  A(rule.operator_status==='OPERADOR_PENDIENTE_A10B');
  A(rule.documentary_class==='DOCUMENTADA_CONDICIONAL');
  A(!ids.has(effectId)&&!ruleIds.has(ruleId),'DUPLICATED_RULE');
  ids.add(effectId);ruleIds.add(ruleId);kinds[rule.kind]=(kinds[rule.kind]||0)+1;cids.add(cid);
  const card=cards.get(cid);A(card&&card.name===rule.card_name,'CID_NAME_WRONG');
  A.deepEqual(rule.native_slots,card.slots,'CARD_ID_OR_SLOT_MUTATION');
  A(rule.source.startsWith('https://www.db.yugioh-card.com/yugiohdb/')&&rule.source.includes('cid='+cid+'&ope=2&request_locale=en'));
  A(rule.actor_zone.length>10&&rule.window.length>5&&rule.guard.length>8&&rule.trigger.length>7);
  A(rule.cost_before_chain.length>7&&rule.target_and_selection.length>7&&rule.expected_resolution.length>8);
  A(rule.chain_and_limit.length>10&&rule.restrictions_and_resources.length>7&&rule.negation_and_interruptions.length>8);
  const chain=['ACT','TRG','QCK'].includes(rule.kind);
  A.equal(rule.active_effect,chain);
  A(rule.chain_contract.includes(chain?'EFECTO_ACTIVADO':'SIN_CADENA_PROPIA'),'INCORRECT_CHAIN_MODE');
  if(card.slots.every(s=>s.section==='reserve'))A.equal(rule.availability,'SOLO_RESERVA_NO_JUGABLE');
  else A.equal(rule.availability,'DISPONIBILIDAD_CONDICIONAL_MAIN_EXTRA');
  A(rule.cases.length===10&&new Set(rule.cases).size===10);
  const block=a05.slice(h.index+h[0].length,headings[i+1]?.index||a05.length);
  for(const [key,field] of [
    ['Actor / zona','actor_zone'],['Ventana','window'],['Guarda física','guard'],
    ['Disparador','trigger'],['Coste','cost_before_chain'],['Objetivo y selección','target_and_selection'],
    ['Resolución y estado posterior','expected_resolution'],['Límite / cadena','chain_and_limit'],
    ['Restricciones y recursos','restrictions_and_resources'],['Negaciones','negation_and_interruptions'],
    ['Fuente oficial','source']]){
    const found=block.split('\n').find(s=>s.startsWith('- **'+key+':** '));
    A(found,'A05_FIELD_MISSING_'+effectId+'_'+key);
    A.equal(rule[field],found.slice(('- **'+key+':** ').length).trim(),'A05_TO_A07_DATA_DRIFT_'+field);
  }
  for(const code of Object.keys(CODES)){
   const name=code==='P'?'665:A07:P'+String(i+1).padStart(3,'0'):'665:A07:N'+String(i+1).padStart(3,'0')+code;
   A(rule.cases.includes(name),'RULE_CASE_MISSING_'+name);
  }
 }
 A.deepEqual(kinds,KINDS,'EFFECT_CATEGORIES_DRIFT');A.equal(cids.size,38,'NOT_ALL_CIDS_REVIEWED');
 for(const p of review.cases){
  A(!caseIds.has(p.case_id)&&ruleIds.has(p.rule_id)&&ids.has(p.effect_id),'CASE_FK_OR_DUP');
  caseIds.add(p.case_id);byRule.set(p.rule_id,(byRule.get(p.rule_id)||0)+1);
  A(p.official_source.includes('cid='+Number(p.effect_id.split(':')[2])+'&'),'SOURCE_CID_MISMATCH');
  A(p.initial_state.length>10&&p.expected_legal.length>1&&p.expected_costs.length>3);
  A(p.expected_events.length>2&&p.expected_state_after.length>7);
  A(p.type&&expectedCaseKinds.includes(p.type),'CASE_TYPE_UNKNOWN');
  A(p.no_replay===true,'NO_SIMULATION_CLAIM');
  if(p.type==='FORMATO_INCOMPATIBLE')A(p.expected_legal.startsWith('NO'),'FORMAT_FAIL_CLOSED');
  if(p.type==='NO_MUTACION')A(p.expected_state_after.includes('SIN_MUTACION'),'NO_MUTATION_EXPECTED');
  if(p.type==='NEGACION_BLOQUEO'){
   const rule=review.rules.find(r=>r.rule_id===p.rule_id);
   if(['PRO','CONT','REP'].includes(rule.kind))A(/NO_APLICA/.test(p.expected_legal),'NON_CHAIN_NEGATION');
  }
 }
 A.equal(caseIds.size,900);for(const count of byRule.values())A.equal(count,10);
 const ledger=doc.slice(doc.indexOf('## CONTROL_DE_TAREAS_A01_A10'),doc.indexOf('\n---\n'));
 A(ledger.includes('28/35')&&ledger.includes('7/35'),'STAGE_COUNTERS');
 for(let n=1;n<=4;n++){A(ledger.includes('- [x] **A07-T'+n+'**'),'A07_NOT_CLOSED');A(ledger.includes('- [x] **A08-T'+n+'**'),'A08_UNAUTHORIZED');}
 const section=doc.slice(doc.indexOf('## APARTADO_07 — Kashtira Pure 665 · reglas contextuales'));
 A(section.length>50000&&section.includes('### A07.4 —'),'INCOMPLETE_A07_DOCUMENT');
 A.equal(section.split('\n').filter(s=>s.startsWith('| '+TICK+'665:a07:')).length,90);
 A.equal(section.split('\n').filter(s=>s.startsWith('| '+TICK+'665:A07:')).length,900);
 // Negative checks: invalid zone and reserve reclassification fail, foreign deck cannot enter A07.
 const altered=structuredClone(pkg);altered.inventory[0].section='reserve';
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:altered,stageId:'A07',authorizedSideOmissionForA07:true}).eligible);
 return {ok:true,deck_id:665,stage:'A07',completed:24,pending:11,card_cids:38,effects:90,cases:900,kind_counts:KINDS,source_a05_cases:630,added_negatives:270,calculation:false,banlist:false};
}
if(require.main===module){
 A(process.argv.includes('--deck-id=665')&&process.argv.includes('--user-assigned')&&process.argv.includes('--authorized-side-waiver'));
 console.log(JSON.stringify(audit()));
}
module.exports={audit};
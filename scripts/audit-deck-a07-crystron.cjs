'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
const kinds={ACT:16,TRG:17,QCK:15,SPL:12,PRO:17,CONT:13,RES:2};
const modes={ACT:'activated_chain',TRG:'triggered_chain',QCK:'activated_chain',SPL:'activated_chain',PRO:'not_activated',CONT:'not_activated',RES:'resolved_lingering'};
const cats=['P','R','T','Z','U','N','F'],no=new Set([50,58,59,60,63,65,67]);
function cut(s,a,b){let i=s.indexOf(a),j=s.indexOf(b,i+a.length);A(i>=0&&j>i,'MISSING_SECTION_'+a);return s.slice(i,j);}
function jsonlines(s,heading){
 const t=cut(s,heading,'## APARTADO_08');
 const i=t.indexOf('\x60\x60\x60jsonl\n'),j=t.indexOf('\n\x60\x60\x60',i+9);
 A(i>=0&&j>i,'MISSING_JSONL_'+heading);
 return t.slice(i+9,j).trim().split('\n').map(JSON.parse);
}
function audit(id,pf,df){
 A.equal(id,677);let p=path.resolve(pf),d=path.resolve(df);
 A(p.startsWith(base)&&d.startsWith(base),'CROSS_DECK');
 A.equal(path.dirname(path.dirname(p)),path.dirname(d));
 const pkg=JSON.parse(fs.readFileSync(p,'utf8')),doc=fs.readFileSync(d,'utf8');
 A.equal(pkg.deck_id,677);A.equal(pkg.record.deck_id,677);
 A.equal(pkg.record.format,'tcg_advanced');A.equal(pkg.record.calculator.rules.length,13);
 const cards=new Map(pkg.record.cards.map(x=>[x.cid,x]));A.equal(cards.size,39);
 const effects=[...cut(doc,'### A05.2 —','<!-- A05_EFFECTS_END -->').matchAll(/^#### (\d+)\. \x60(677:a05:(\d+):[a-z0-9-]+)\x60 — CID (\d+) \(([A-Z]+)\)$/gm)];
 A.equal(effects.length,92);
 const rules=jsonlines(doc,'### A07.5 —'),cases=jsonlines(doc,'### A07.6 —');
 A.equal(rules.length,92);A.equal(cases.length,644);
 const counts={};
 for(let i=0;i<rules.length;i++){
  const r=rules[i],f=effects[i],c=cards.get(r.cid);
  A(c,'FOREIGN_CID');A.equal(r.effect_id,f[2]);A.equal(r.cid,Number(f[3]));
  A.equal(r.psct_kind,f[5]);A.equal(r.chain_mode,modes[r.psct_kind]);
  A.deepEqual(r.native_card_ids,c.slots.map(x=>x.card_id));
  A.equal(r.format,'tcg_advanced');A.equal(r.a10b_status,'NO_CERTIFICADO');
  A(r.source.includes('card_search.action?cid='+r.cid+'&ope=2'),'SOURCE_CID_MISMATCH');
  A(r.before.actor_zone&&r.before.window&&r.before.precondition,'MISSING_INITIAL_STATE');
  A(r.activation.cost&&r.activation.target_or_selection,'MISSING_COST_SELECTION');
  A(r.expected.resolution&&r.expected.usage&&r.expected.negation&&r.expected.failure,'MISSING_RESOLUTION');
  A(r.operator_requirement,'MISSING_OPERATOR_NEED');
  if(['PRO','CONT','RES'].includes(r.psct_kind))A.equal(r.spell_speed,0);
  if(r.psct_kind==='QCK')A.equal(r.spell_speed,2);
  if(r.psct_kind==='SPL'){
   const speed=[11411,4861].includes(r.cid)?3:[7445,15299,13619,11849].includes(r.cid)?2:1;
   A.equal(r.spell_speed,speed,'SPELL_SPEED');
  }
  counts[r.psct_kind]=(counts[r.psct_kind]||0)+1;
  A.equal(r.paper_applicability,no.has(i+1)?'NO_APLICA_CONSTRUCCION_677':'CONDICIONAL_TCG_ADVANCED');
 }
 A.deepEqual(counts,kinds);
 const byKind={};
 for(let i=0;i<cases.length;i++){
  const x=cases[i],r=rules[Math.floor(i/7)],k=cats[i%7],num=String(Math.floor(i/7)+1).padStart(3,'0');
  A.equal(x.case_id,'677:A07:E'+num+':'+k);A.equal(x.effect_id,r.effect_id);
  A.equal(x.cid,r.cid);A.equal(x.kind,k);A.equal(x.state_before.actor_cid,r.cid);
  A.equal(x.state_before.chain_mode,r.chain_mode);
  for(const field of ['expected_costs','expected_events','expected_state_after','reason'])
   A(typeof x[field]==='string'&&x[field].length>5,'CASE_MISSING_'+field);
  A([true,false,null].includes(x.expected_legal),'BAD_EXPECTED_LEGAL');
  A.equal(x.legal_certification,'PAPEL_CONDICIONAL_NO_EJECUTADO');
  if(k==='P')A.equal(x.expected_legal,no.has(Math.floor(i/7)+1)?null:true,'POSITIVE_NOT_GROUNDED');
  if(['R','Z','F'].includes(k))A.equal(x.expected_legal,false);
  if(k==='T'&&['PRO','CONT','RES'].includes(r.psct_kind))A.equal(x.expected_legal,null);
  if(k==='N'){
   const chain=['activated_chain','triggered_chain'].includes(r.chain_mode);
   A.equal(x.expected_legal,chain?true:null);
   if(chain)A(x.expected_state_after.includes('COSTE_ACTIVACION_YA_PAGADO'),'DO_NOT_REFUND_PAID_COST');
  }
  if(k==='U'&&['NO_PRINTED_OPT','NOT_ESTABLISHED'].includes(r.usage_class))
   A.equal(x.expected_legal,null,'DO_NOT_INVENT_OPT');
  byKind[k]=(byKind[k]||0)+1;
 }
 for(const k of cats)A.equal(byKind[k],92,'MISSING_A07_CASE_CLASS');
 for(const cid of [20500,20206]){
  const r=rules.find(x=>x.effect_id==='677:a05:'+cid+':end-phase-hand-rollback');
  A(r&&r.psct_kind==='RES'&&r.chain_mode==='resolved_lingering','END_PHASE_IS_NOT_NEW_CHAIN');
 }
 for(const [id,lock] of [
  ['677:a05:12608:field-destroy-summon-tuner','MACHINE_SYNCHRO_ONLY_THIS_TURN'],
  ['677:a05:12609:field-destroy-summon-tuner','MACHINE_SYNCHRO_ONLY_THIS_TURN'],
  ['677:a05:20759:hand-gy-destroy-summon','MACHINE_ONLY_THIS_TURN']
 ]){
  A.equal(rules.find(x=>x.effect_id===id)?.extra_lock,lock,'MACHINE_LOCK_WRONG');
 }
 const notes=cut(doc,'### A07.7 —','## APARTADO_08');
 for(const key of ['PENDIENTE_DE_RULING','A05-T4','SIN_CERTIFICACION_A10B','NO_APLICA_CONSTRUCCION_677'])A(notes.includes(key));
 const ledger=cut(doc,'## CONTROL_DE_TAREAS_A01_A10 —','\n---\n');
 const checks=[...ledger.matchAll(/^- \[x\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)].map(x=>x[1]);
 A(!checks.includes('A05-T4'),'A05_T4_FALSELY_CLOSED');
 for(const id of ['A07-T1','A07-T2','A07-T3','A07-T4'])A(checks.includes(id),'A07_TASK_OPEN');
 A.equal(checks.length,23);A(ledger.includes('23/35')&&ledger.includes('12/35'));
 return {ok:true,deck_id:677,physicalCIDs:39,effectRecords:92,types:counts,paperCases:644,
  byScenario:byKind,positiveUnusable:no.size,portableVariantsUntouched:13,
  A05T4Certified:0,calculatorExecuted:false,mandatoryClosed:23,mandatoryPending:12};
}
if(require.main===module){
 const args=process.argv.slice(2),files=args.filter(x=>!x.startsWith('--'));
 A(args.includes('--user-assigned')&&files.length===2);
 console.log(JSON.stringify(audit(Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),files[0],files[1])));
}
module.exports={audit};
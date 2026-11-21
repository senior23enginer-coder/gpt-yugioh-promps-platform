'use strict';
/** Reusable paper model extractor for ONE explicitly assigned, physically loaded deck.
 * Builds a typed paper model IN MEMORY from the single curated Markdown. No A10B.
 * Parsing and schema validation do not establish TCG legal correctness.
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {checkPaper} = require('./test-paper-case-contract.cjs');
const ROOT = path.resolve(__dirname, '..');
const DECKS = path.join(ROOT, '01_INFORMACION_PARA_IMPORTAR/decks') + path.sep;
const KINDS = {
 ACTIVACION: 'activated', ACTIVACION_GY: 'activated', ACTIVACION_MANO: 'activated',
 RAPIDO: 'activated', RAPIDO_MANO: 'activated', MAGICA_NORMAL: 'activated',
 MAGICA_RAPIDA: 'activated', DISPARO: 'trigger', DISPARO_GY: 'trigger',
 CONTINUO: 'continuous', RESTRICCION: 'continuous', MANTENIMIENTO: 'continuous',
 PROCEDIMIENTO: 'procedure'
};
const FIELDS = {
 actor: 'Actor / estado inicial', activation_window: 'Ventana / disparador',
 costs: 'Coste o requisito previo', selections: 'Selección / targeting',
 resolution: 'Resolución', usage_limit: 'Uso, negación y restricciones',
 after: 'Estado posterior esperado', source: 'Fuente oficial'
};
function sliceSection(doc, head) {
 const start=doc.indexOf(head);
 assert(start>=0,'MISSING_SECTION_'+head);
 const next=doc.indexOf('\n### ',start+head.length);
 assert(next>start,'UNBOUNDED_SECTION_'+head);
 return doc.slice(start,next);
}
function blocks(section, header) {
 const heads=[...section.matchAll(header)];
 const result=[];
 for (let i=0;i<heads.length;i++){
   const m=heads[i];
   result.push({head:m, body:section.slice(m.index+m[0].length,
      i+1<heads.length?heads[i+1].index:section.length)});
 }
 return result;
}
function field(block, name) {
 const marker='- **'+name+':**';
 const line=block.split('\n').find(line=>line.startsWith(marker));
 assert(line && line.slice(marker.length).trim().length>7,'UNDEFINED_PAPER_FIELD_'+name);
 return line.slice(marker.length).trim();
}
function getTextBetween(line, begin, next, effect) {
 const a=line.indexOf(begin);
 assert(a>=0,'MISSING_CASE_FIELD_'+effect+'_'+begin);
 const b=next?line.indexOf(next,a+begin.length):line.length;
 assert(b>a,'MISSING_NEXT_CASE_FIELD_'+effect+'_'+next);
 return line.slice(a+begin.length,b).trim();
}
function build(args) {
 const packageFile=path.resolve(args.packageFile);
 const file=path.resolve(args.curatedFile);
 assert(packageFile.startsWith(DECKS)&&file.startsWith(DECKS),'DECK_SCOPE_VIOLATION');
 assert(path.dirname(path.dirname(packageFile))===path.dirname(file),'CROSS_DECK_SCOPE_VIOLATION');
 const pkg=JSON.parse(fs.readFileSync(packageFile,'utf8'));
 assert(pkg.schema==='station-x-deck-package/1'&&pkg.deck_id===args.deckId&&
   pkg.record?.deck_id===args.deckId,'DECK_MISMATCH');
 const physical=new Map(pkg.record.cards.map(c=>[c.cid,c]));
 assert(physical.size===pkg.record.cards.length);
 const counts={main:0,extra:0,side:0,reserve:0};
 for(const card of physical.values())for(const slot of card.slots){
  assert(Object.hasOwn(counts,slot.section));counts[slot.section]+=slot.quantity;
 }
 for(const needed of ['main','extra','side'])assert(counts[needed]>0,'MISSING_'+needed);
 const doc=fs.readFileSync(file,'utf8');
 const reg=sliceSection(doc,'### A05.6 —');
 const causal=sliceSection(doc,'### A05.7 —');
 const papers=sliceSection(doc,'### A05.8 —');
 const known=new Map();
 for(const m of reg.matchAll(/^\s+- \u0060(\d+:a05:(\d+):[a-z0-9-]+)\u0060 · \*\*([A-Z_]+)\*\* · ([^\n]+)/gm)){
  const id=m[1],cid=Number(m[2]),kind=KINDS[m[3]];
  assert(kind&&physical.has(cid)&&id.startsWith(args.deckId+':a05:'),'UNKNOWN_EFFECT_'+id);
  assert(!known.has(id),'DUPLICATE_EFFECT_'+id);
  known.set(id,{cid,kind,summary:m[4].trim()});
 }
 const causalRows=blocks(causal,/^#### \d+\. \u0060(\d+:a05:(\d+):[a-z0-9-]+)\u0060 · CID \d+ \([A-Z_]+\)/gm);
 const effects=[];
 for(const row of causalRows){
  const id=row.head[1],base=known.get(id);
  assert(base&&Number(row.head[2])===base.cid,'UNREGISTERED_CAUSAL_'+id);
  const o={};for(const [key,name] of Object.entries(FIELDS))o[key]=field(row.body,name);
  assert(o.source.includes('cid='+base.cid),'OFFICIAL_SOURCE_MISMATCH_'+id);
  effects.push({
   effect_id:id,cid:base.cid,kind:base.kind,
   actor:{description:o.actor,physical_zone:'must_be_read_from_state'},
   activation_window:{description:o.activation_window,chain_status:base.kind==='procedure'?'no_chain':base.kind==='continuous'?'continuous':'requires_legal_window'},
   trigger:base.kind==='trigger'?{description:o.activation_window}:null,
   guards:[o.costs], selections:[o.selections], costs:[o.costs], resolution:[o.resolution],
   on_negation:{description:'Negation cannot refund already paid costs; verify each physical chain.'},
   usage_limit:{description:o.usage_limit}, restrictions:[o.usage_limit],
   resource_delta:{description:o.after},source:o.source.trim(),
   assumptions:['Descriptive clauses; full independent paper legality remains conditional.'],
   support_status:'DOCUMENTADO_CON_FUENTE'
  });
 }
 const paperRows=blocks(papers,/^#### \d+\. \u0060(\d+:a05:(\d+):[a-z0-9-]+)\u0060 — dos casos de papel/gm);
 const cases=[];
 for(const row of paperRows){
  const effect=row.head[1],cid=Number(row.head[2]);
  assert(known.has(effect)&&known.get(effect).cid===cid,'PAPER_MISATTRIBUTED_'+effect);
  const url='https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid='+cid;
  assert(row.body.includes(url),'PAPER_SOURCE_MISSING_'+effect);
  for(const prefix of ['P','N']){
   const lines=row.body.split('\n').filter(s=>s.includes('case_id='+args.deckId+':A05:'+prefix));
   assert(lines.length===1,'NOT_EXACTLY_ONE_CASE_'+effect+'_'+prefix);
   const line=lines[0];
   const caseId=line.match(/case_id=(\d+:A05:[PN]\d+)/)?.[1];
   assert(caseId,'CASE_ID_MISSING');
   const nullCase=prefix==='P'&&line.includes('status=NO_APLICA');
   const legal=nullCase?null:prefix==='P';
   assert(line.includes('expected_legal='+(legal===null?'null':String(legal))),
      'CASE_LEGALITY_DISCREPANCY_'+caseId);
   const beforeTag=line.includes('\u0060state_before\u0060/causa:')?\n     '\u0060state_before\u0060/causa:':'\u0060state_before\u0060:';\n   const b=getTextBetween(line,beforeTag,'\u0060action\u0060:',caseId);
   const action=getTextBetween(line,'\u0060action\u0060:','\u0060expected_costs\u0060:',caseId);
   const cost=getTextBetween(line,'\u0060expected_costs\u0060:','\u0060expected_events/state_after\u0060:',caseId);
   const result=getTextBetween(line,'\u0060expected_events/state_after\u0060:','\u0060reason\u0060:',caseId);
   const why=getTextBetween(line,'\u0060reason\u0060:',null,caseId);
   cases.push({
    case_id:caseId,effect_id:effect,
    source:'https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid='+cid+'&ope=2&request_locale=en',
    state_before:{description:b,physical_state_typed:false},
    action:{description:action},
    expected_legal:legal,expected_costs:legal===false?[]:[cost],
    expected_events:legal===false?[]:[result],
    expected_state_after:{description:result,physical_state_typed:false},
    expected_restrictions:[],
    reason:why,known_vs_unknown:'conditional',
    status:nullCase?'NO_APLICA':'CONDICIONAL'
   });
  }
 }
 const suite={schema:'station-x-paper-cases/1',deck_id:args.deckId,
  format:pkg.record.format,effects,cases};
 const check=checkPaper(suite);
 assert.equal(effects.length,known.size,'EFFECT_CAUSAL_COVERAGE_INCOMPLETE');
 assert.equal(cases.length,effects.length*2,'PAIR_COVERAGE_INCOMPLETE');
 return {suite,report:{ok:true,counts,identities:physical.size,
   effectCount:known.size,typedStructure:check,conditionalCases:cases.filter(c=>c.status==='CONDICIONAL').length,
   noAplicaCases:cases.filter(c=>c.status==='NO_APLICA').length,
   verifiedCases:cases.filter(c=>c.status==='VERIFICADO').length,
   physicalStatesTyped:cases.filter(c=>c.state_before.physical_state_typed&&
     c.expected_state_after.physical_state_typed).length,
   independentSemanticCheck:false,calculatorExecuted:false}};
}
if(require.main===module){
 const args=process.argv.slice(2);
 assert(args.includes('--user-assigned'),'EXPLICIT_DECK_ASSIGNMENT_REQUIRED');
 const deckId=Number(args.find(a=>a.startsWith('--deck-id='))?.split('=')[1]);
 const files=args.filter(a=>!a.startsWith('--'));
 assert(Number.isInteger(deckId)&&files.length===2,'BAD_DECK_AND_FILES');
 const {report}=build({deckId,packageFile:files[0],curatedFile:files[1]});
 console.log(JSON.stringify(report));
}
module.exports=Object.freeze({build});
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const schema=JSON.parse(fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX/contrato_casos_logicos.schema.json')));
function checkPaper(document){
 assert.equal(document?.schema,'station-x-paper-cases/1');
 assert(Number.isInteger(document.deck_id)&&document.deck_id>0);
 assert(typeof document.format==='string'&&document.format.length>0);
 assert(Array.isArray(document.effects)&&document.effects.length);
 assert(Array.isArray(document.cases)&&document.cases.length);
 const ids=new Set();
 for(const e of document.effects){
   assert(typeof e.effect_id==='string'&&!ids.has(e.effect_id));
   ids.add(e.effect_id);
   assert(Number.isInteger(e.cid)&&e.cid>0);
   assert(['activated','trigger','continuous','procedure','replacement','skill','no-effect'].includes(e.kind));
   for(const key of ['actor','activation_window','guards','selections','costs','resolution','restrictions','source','support_status'])
     assert(Object.hasOwn(e,key),'Effect lacks '+key);
 }
 const caseIds=new Set(),types=new Map();
 for(const c of document.cases){
   assert(typeof c.case_id==='string'&&!caseIds.has(c.case_id));
   caseIds.add(c.case_id);
   assert(ids.has(c.effect_id),'Paper case references an unknown effect');
   assert(typeof c.source==='string'&&c.source.length);
   for(const key of ['state_before','action','expected_legal','expected_costs','expected_events',
     'expected_state_after','expected_restrictions','reason','known_vs_unknown','status'])
     assert(Object.hasOwn(c,key),'Paper case lacks '+key);
   assert(typeof c.expected_legal==='boolean'||c.expected_legal===null);
   if(c.expected_legal===null)assert(['CONDICIONAL','PENDIENTE','NO_APLICA'].includes(c.status));
   if(c.status==='NO_APLICA')assert(c.expected_legal===null&&c.reason?.length>=20,
     'NO_APLICA requires a concrete physical reason');
   const entry=types.get(c.effect_id)||{positive:0,negative:0,noAplica:0};
   if(c.expected_legal===true)entry.positive++;
   if(c.expected_legal===false)entry.negative++;
   if(c.status==='NO_APLICA')entry.noAplica++;
   types.set(c.effect_id,entry);
 }
 for(const e of document.effects){
   const coverage=types.get(e.effect_id)||{positive:0,negative:0,noAplica:0};
   if(e.kind!=='no-effect')
     assert((coverage.positive>0||coverage.noAplica>0)&&coverage.negative>0,
       'Every supported paper effect needs a positive and negative scenario: '+e.effect_id);
 }
 return {effects:ids.size,cases:caseIds.size};
}
assert.equal(schema.$id,'urn:station-x:paper-cases:1');
assert.deepEqual(schema.required,['schema','deck_id','format','effects','cases']);
for(const k of ['expected_legal','state_before','expected_state_after','known_vs_unknown'])
 assert(Object.hasOwn(schema.properties.cases.items.properties,k));
const sample=JSON.parse(fs.readFileSync(path.join(root,'scripts/fixtures/stationx-paper-case.synthetic.json')));
const result=checkPaper(sample);
assert.equal(result.effects,1);assert.equal(result.cases,2);
const invalid=JSON.parse(JSON.stringify(sample));
invalid.cases.pop();
assert.throws(()=>checkPaper(invalid),/positive and negative/);
console.log(JSON.stringify({ok:true,syntheticOnly:true,deckAnalysesExecuted:0,
 universalPaperCaseSchema:schema.$id,...result}));
module.exports={checkPaper};

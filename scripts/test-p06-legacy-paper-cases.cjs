'use strict';
// GPT owns the logical "paper" assertions. Platform executes them.
// This is a schema contract check only: it never runs A01-A10.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const file=path.resolve(__dirname,'../03_COMPROBACIONES_NO_IMPORTAR/fixtures/p06-legacy-paper-cases.json');
const suite=JSON.parse(fs.readFileSync(file,'utf8'));
assert.equal(suite.schema,'station-x-legacy-paper-regression-suite/1');
assert.equal(suite.explicitly_not_a_new_deck_analysis,true);
assert.equal(suite.coverage_policy,'partial_by_legacy_file; do not delete original tests until all assertions match');
assert.equal(suite.documents.length,2);
assert.deepEqual(suite.documents.map(doc=>doc.deck_id),[671,677]);
const ids=new Set();
for(const paper of suite.documents){
 assert.equal(paper.schema,'station-x-paper-cases/1');
 assert.equal(paper.format,'tcg_advanced');
 assert(Array.isArray(paper.effects)&&paper.effects.length>0);
 const effectIds=new Set(paper.effects.map(x=>x.effect_id));
 assert.equal(effectIds.size,paper.effects.length);
 for(const item of paper.cases){
   assert(!ids.has(item.case_id),'Duplicate case ID '+item.case_id);
   ids.add(item.case_id);
   assert(effectIds.has(item.effect_id),'Unknown effect '+item.effect_id);
   assert.equal(item.status,'VERIFICADO');
   assert.equal(item.known_vs_unknown,'known');
   assert.equal(typeof item.expected_legal,'boolean');
   assert(Array.isArray(item.state_before.placements));
   assert(/^[a-z_]+_test\.cjs$/.test(item.source_legacy_test),
     'Paper assertions must name their existing source test');
   if(item.expected_legal){
     assert(Array.isArray(item.expected_state_after?.tokens)&&
       item.expected_state_after.tokens.length>0);
   }else assert(!item.expected_state_after,'Negative cases must not invent an outcome');
 }
}
assert.equal(ids.size,8);
console.log(JSON.stringify({ok:true,documents:2,paperCases:ids.size,
  additionalPerCardCodeFiles:0,deckAnalysesExecuted:0,legacyCoverage:'partial'}));

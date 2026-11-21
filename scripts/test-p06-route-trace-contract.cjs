'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const fixture=JSON.parse(fs.readFileSync(path.resolve(__dirname,
  '../03_COMPROBACIONES_NO_IMPORTAR/fixtures/p06-memento-route-traces.json'),'utf8'));
assert.equal(fixture.schema,'station-x-legacy-route-traces/1');
assert.equal(fixture.deck_id,671);
assert.equal(fixture.authorization,'regression_only_no_new_deck_analysis');
assert.equal(fixture.historical_tests_retained,true);
assert.equal(fixture.routes.length,12);
const ids=new Set();
let transitions=0;
const discrepancies=[];
for(const r of fixture.routes){
  assert(!ids.has(r.route_id),'Duplicate historical route '+r.route_id);ids.add(r.route_id);
  assert(/^671:A09:C(?:0[1-9]|1[0-2])$/.test(r.route_id));
  assert.equal(r.source_test,'torneos_yugioh/tests/memento_'+
    r.route_id.slice(-3).toLowerCase()+'_route_replay_test.cjs');
  assert(/^[0-9a-f]{40}$/.test(r.source_blob_sha),'Git blob SHA must be recorded');
  assert.equal(r.migration_status,'TRACE_ONLY_LEGACY_TEST_RETAINED');
  assert(Array.isArray(r.ordered_effect_ids)&&r.ordered_effect_ids.length>0);
  assert.equal(r.observed_action_calls,r.ordered_effect_ids.length);
  assert(r.ordered_effect_ids.every(id=>/^671:[a-z0-9:-]+$/.test(id)));
  assert(Number.isInteger(r.route_documented_steps)&&r.route_documented_steps>0);
  assert(typeof r.source_scope==='string'&&r.source_scope.length>0);
  assert(typeof r.verified_final_description==='string'&&r.verified_final_description.length>0);
  if(r.declared_executed_transitions!==r.observed_action_calls){
    assert.equal(r.parity_status,'KNOWN_METADATA_DISCREPANCY',
      'Never certify a discrepant legacy replay by comparing only documentation');
    discrepancies.push(r.route_id);
  }else assert.equal(r.parity_status,'TRACE_ALIGNED_NOT_FULLY_MIGRATED');
  transitions+=r.observed_action_calls;
}
assert.equal(transitions,105);
assert.deepEqual(discrepancies,['671:A09:C02']);
assert.deepEqual(fixture.stats,{routes:12,observed_effect_calls:105,
  metadata_discrepancies:discrepancies});
console.log(JSON.stringify({ok:true,historicalRoutes:12,actionsTraced:105,
  independentlyReplayed:0,knownDiscrepancies:discrepancies,
  analysesExecuted:0,legacyTestsPreserved:true}));

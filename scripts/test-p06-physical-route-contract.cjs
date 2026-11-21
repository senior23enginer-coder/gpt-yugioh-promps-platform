'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const doc=JSON.parse(fs.readFileSync(path.join(__dirname,
  '../03_COMPROBACIONES_NO_IMPORTAR/fixtures/p06-memento-c01-physical-route.json'),'utf8'));
assert.equal(doc.schema,'station-x-declarative-route-fixtures/1');
assert.equal(doc.scope,'historical_regression_only_not_a_new_deck_analysis');
assert.equal(doc.deck_id,671);
assert.equal(doc.format,'tcg_advanced');
assert.equal(doc.source,'torneos_yugioh/tests/memento_c01_route_replay_test.cjs');
assert.equal(doc.migration_status,'PARITY_CANDIDATE_REQUIRES_PLATFORM_CI');
assert.equal(doc.routes.length,1);
const r=doc.routes[0];
assert.equal(r.route_id,'671:A09:C01');
assert.equal(r.documented_steps,7);
assert.equal(r.expected_transitions,9);
assert.equal(r.steps.length,r.expected_transitions);
assert.deepEqual(r.state_before.placements.map(c=>c.card_id).sort(),[482,497]);
for(const [i,s] of r.steps.entries()){
  assert(/^671:[a-z0-9:-]+$/.test(s.effect_id),'Invalid effect '+i);
  assert(Array.isArray(s.expected_after.tokens)&&s.expected_after.tokens.length>0);
  for(const token of s.expected_after.tokens){
    assert(Number.isInteger(token.cid)&&token.cid>0);
    assert(/^(?:m[1-5]|s[1-5]|monster|hand|graveyard|field|banished)$/.test(token.zone));
  }
}
assert(Array.isArray(r.expected_final.tokens));
assert.equal(doc.routes.length,1);
console.log(JSON.stringify({ok:true,canonicalDeckNotReanalyzed:true,steps:r.steps.length,
  sourceRoute:r.route_id,physicalCheckpoints:true,parityPendingPlatformCI:true}));

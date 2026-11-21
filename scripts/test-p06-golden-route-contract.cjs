'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const p=path.join(__dirname,
 '../03_COMPROBACIONES_NO_IMPORTAR/fixtures/p06-memento-golden-route-states.json');
const d=JSON.parse(fs.readFileSync(p,'utf8'));
assert.equal(d.schema,'station-x-p06-golden-route-states/1');
assert.equal(d.deck_id,671);
assert.equal(d.format,'tcg_advanced');
assert.equal(d.provenance,
 'historical trusted tests; regression-only, not independent oracle');
assert.equal(d.legacy_tests_preserved,true);
assert.equal(d.requires_independent_semantic_parity,true);
assert.equal(d.routes.length,12);
assert.equal(d.direct_golden_routes,11);
assert.deepEqual(d.known_mismatches,['671:A09:C02']);
let effects=0;
for(let i=0;i<12;i++){
 const route=d.routes[i],id='671:A09:C'+String(i+1).padStart(2,'0');
 assert.equal(route.route_id,id);
 assert.equal(route.source_test,'torneos_yugioh/tests/memento_c'+
   String(i+1).padStart(2,'0')+'_route_replay_test.cjs');
 assert(/^[0-9a-f]{40}$/.test(route.source_blob_sha));
 assert(Array.isArray(route.initial_state?.tokens));
 assert(Array.isArray(route.steps)&&route.steps.length>0);
 assert.equal(route.steps.length,route.observed_actions);
 assert(route.steps.every(s=>/^671:[a-z0-9:-]+$/.test(s.effect_id)&&
   /^[0-9a-f]{64}$/.test(s.after_state_sha256)));
 assert.equal(route.migration_status,
   i===7?'NEEDS_DECLARATIVE_NON_ACTION_EVENT':
     'GOLDEN_STATE_TRACE_NOT_SEMANTIC_PARITY');
 assert.equal(route.known_metadata_discrepancy,i===1);
 assert.equal(route.interruptions.length,i===7?1:0);
 effects+=route.steps.length;
}
assert.equal(effects,105);
console.log(JSON.stringify({ok:true,routes:12,transitionHashes:effects,
 uninterrupted:11,unmodeledRivalEvent:1,semanticParityClaimed:false,
 deckAnalysesExecuted:0}));

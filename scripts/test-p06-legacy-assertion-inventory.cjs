'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const fixture=JSON.parse(fs.readFileSync(path.join(__dirname,
 '../03_COMPROBACIONES_NO_IMPORTAR/fixtures/p06-protected-legacy-assertions.json'),'utf8'));
assert.equal(fixture.schema,'station-x-p06-legacy-assertion-inventory/1');
assert.equal(fixture.scope,'regression_only_no_new_deck_analysis');
assert.equal(fixture.historical_tests_preserved,true);
assert.equal(fixture.semantic_parity_complete,false);
assert.equal(fixture.tests.length,40);
const seen=new Set();
let sites=0,routes=0,pilot=0;
for(const item of fixture.tests){
 assert(/^torneos_yugioh\/tests\/[a-z0-9_]+_test\.(?:cjs|php)$/.test(item.test_file));
 assert(!seen.has(item.test_file));seen.add(item.test_file);
 assert(/^[0-9a-f]{40}$/.test(item.source_blob_sha));
 assert(Number.isInteger(item.assertion_call_sites)&&item.assertion_call_sites>=0);
 assert(Array.isArray(item.referenced_effect_ids));
 assert(item.referenced_effect_ids.every(id=>/^(?:671|677):[a-z0-9:-]+$/i.test(id)));
 assert(['GOLDEN_ROUTE_TRACE_REPLAYED_ASSERTIONS_RETAINED',
   'PARTIAL_PAPER_CASES_ASSERTIONS_RETAINED',
   'LEGACY_SOURCE_ASSERTIONS_RETAINED'].includes(item.domain_migration_status));
 if(item.domain_migration_status.startsWith('GOLDEN_'))routes++;
 if(item.domain_migration_status.startsWith('PARTIAL_'))pilot++;
 sites+=item.assertion_call_sites;
}
assert.equal(routes,12);
assert.equal(pilot,2);
assert.equal(sites,1005);
assert.deepEqual(fixture.stats,{tests:40,textual_assertion_sites:1005,
 golden_route_files:12,partial_paper_case_sources:2});
console.log(JSON.stringify({ok:true,sources:40,textualAssertionSites:sites,
 routeSources:routes,paperPilotSources:pilot,semanticsFullyMigrated:false,
 testsDeleted:0,deckAnalysesExecuted:0}));

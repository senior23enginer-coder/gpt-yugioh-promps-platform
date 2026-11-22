'use strict';
/**
 * Fail-closed A05-T4 documentary evidence gate.
 *
 * Verifies consistency of every proposed positive/negative paper pair against
 * the actual assigned deck and the independently authored A07 PSCT review.
 * IMPORTANT: this is not a duel engine and does not promote conditional
 * cases to VERIFIED or certify physical before/after transitions.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {build}=require('./audit-deck-paper-model.cjs');

function section(doc,heading){
 const at=doc.indexOf(heading);
 assert(at>=0,'MISSING_SECTION_'+heading);
 const end=doc.indexOf('\n### ',at+heading.length);
 assert(end>at,'UNBOUNDED_SECTION_'+heading);
 return doc.slice(at,end);
}
function idsFromRows(text,pattern){
 return [...text.matchAll(pattern)].map(m=>m[1]);
}
function verify({deckId,packageFile,curatedFile}){
 const pkg=JSON.parse(fs.readFileSync(packageFile,'utf8'));
 assert.equal(pkg.deck_id,deckId);
 const physical=new Map(pkg.record.cards.map(card=>[card.cid,card]));
 const md=fs.readFileSync(curatedFile,'utf8');
 const {suite,report}=build({deckId,packageFile,curatedFile});
 assert.equal(suite.effects.length,94);
 assert.equal(suite.cases.length,188);
 const registry=new Map(suite.effects.map(e=>[e.effect_id,e]));
 const casesByEffect=new Map();
 for(const entry of suite.cases){
   const effect=registry.get(entry.effect_id);
   assert(effect,'CASE_UNKNOWN_EFFECT_'+entry.case_id);
   assert(physical.has(effect.cid),'CASE_ACTOR_ABSENT_'+entry.case_id);
   assert(entry.source.includes('cid='+effect.cid),'CASE_WRONG_SOURCE_'+entry.case_id);
   assert(entry.state_before.description.length>=35,'CASE_UNSPECIFIED_START_'+entry.case_id);
   assert(entry.expected_state_after.description.length>=20,'CASE_UNSPECIFIED_END_'+entry.case_id);
   assert(entry.reason.length>=25,'CASE_MISSING_CAUSAL_REASON_'+entry.case_id);
   assert(entry.known_vs_unknown==='conditional','FALSE_CERTIFICATION_'+entry.case_id);
   assert(entry.status==='CONDICIONAL'||entry.status==='NO_APLICA',
     'UNREVIEWED_STATUS_PROMOTION_'+entry.case_id);
   const pair=casesByEffect.get(entry.effect_id)||[];
   pair.push(entry);
   casesByEffect.set(entry.effect_id,pair);
 }
 assert.equal(casesByEffect.size,94);
 const noAplica=new Set([
  '671:a05:13081:sent-field-to-gy-dark-contract',
  '671:a05:16845:polymerization-gy-target-protection',
  '671:a05:19932:pointed-opponent-material-link5',
  '671:a05:20196:hand-discard-search-fiendsmith-spelltrap',
  '671:a05:20533:gy-banish-detach-atk-reduction'
 ]);
 const notApplicableReasons=new Map([
   ['671:a05:13081:sent-field-to-gy-dark-contract',/no contiene.*Contrato Oscuro/i],
   ['671:a05:16845:polymerization-gy-target-protection',/Polimerizaci[oó]n.*no forma parte/i],
   ['671:a05:19932:pointed-opponent-material-link5',/no incluyen.*Link-5/i],
   ['671:a05:20196:hand-discard-search-fiendsmith-spelltrap',/no contiene.*Fiendsmith/i],
   ['671:a05:20533:gy-banish-detach-atk-reduction',/no incluyen.*Xyz Goblin/i]
 ]);
 for(const [effectId,pair] of casesByEffect){
   assert.equal(pair.length,2,'CASE_PAIR_INCOMPLETE_'+effectId);
   const [positive,negative]=['P','N'].map(prefix=>
     pair.find(c=>c.case_id.startsWith(deckId+':A05:'+prefix)));
   assert(positive&&negative,'CASE_MISSING_POSITIVE_OR_NEGATIVE_'+effectId);
   assert.equal(negative.expected_legal,false,'NEGATIVE_MUST_REJECT_'+effectId);
   assert.equal(negative.expected_costs.length,0,'NEGATIVE_COST_ALREADY_CONSUMED_'+effectId);
   assert.equal(negative.expected_events.length,0,'NEGATIVE_PHANTOM_EVENT_'+effectId);
   if(noAplica.has(effectId)){
     assert.equal(positive.expected_legal,null,'MISSING_NOT_APPLICABLE_'+effectId);
     assert.equal(positive.status,'NO_APLICA','INVALID_POSITIVE_STATUS_'+effectId);
     assert(notApplicableReasons.get(effectId).test(positive.state_before.description),
       'MISSING_PHYSICAL_EXCLUSION_REASON_'+effectId);
   } else {
     assert.equal(positive.expected_legal,true,'MISSING_POSITIVE_HYPOTHESIS_'+effectId);
     assert.equal(positive.status,'CONDICIONAL','CASE_WRONGLY_CERTIFIED_'+effectId);
   }
 }
 const contrasted=idsFromRows(section(md,'### A07.14 —'),
   /^\| \d{2} · `(\d+:a05:\d+:[a-z0-9-]+)` \|/gm);
 const derived=idsFromRows(section(md,'### A07.15 —'),
   /^\| `(\d+:a05:\d+:[a-z0-9-]+)` \|/gm);
 assert.equal(contrasted.length,33,'A07_MANUAL_REVIEW_COUNT_CHANGED');
 assert.equal(derived.length,61,'A07_DERIVED_REVIEW_COUNT_CHANGED');
 const reviewed=new Set([...contrasted,...derived]);
 assert.equal(reviewed.size,94,'A07_DUPLICATED_OR_MISSING_EFFECT');
 for(const e of registry.keys())assert(reviewed.has(e),'A07_NO_CROSS_REFERENCE_'+e);
 const a06=section(md,'### A06.7 —');
 const a09=section(md,'### A09.11 —');
 assert(a06.includes('REL-M40')&&a09.includes('MEMD-C12'),
   'MISSING_A06_A09_TRACEABILITY');
 const outcome={
   deckId,counts:report.counts,physicalIdentities:physical.size,
   effectIds:registry.size,paperCaseIds:suite.cases.length,
   explicitNonApplicable:noAplica.size,
   conditionalCases:report.conditionalCases,
   manuallyContrastedFamiliesInA07:contrasted.length,
   derivedConditionalFamiliesInA07:derived.length,
   completelyTypedPhysicalCaseStates:report.physicalStatesTyped,
   independentlyVerifiedPaperCases:report.verifiedCases,
   readyToCloseA05T4:report.verifiedCases===188&&report.physicalStatesTyped===188,
   calculatorExecuted:false
 };
 assert.equal(outcome.readyToCloseA05T4,false,
   'If all paper cases become verified, update the acceptance gate deliberately');
 return outcome;
}
if(require.main===module){
 const argv=process.argv.slice(2);
 assert(argv.includes('--user-assigned'),'EXPLICIT_ASSIGNMENT_REQUIRED');
 const deckId=Number(argv.find(s=>s.startsWith('--deck-id='))?.split('=')[1]);
 const files=argv.filter(s=>!s.startsWith('--'));
 assert(deckId===671&&files.length===2,'ONLY_ASSIGNED_MEMENTO');
 console.log(JSON.stringify(verify({deckId,packageFile:path.resolve(files[0]),
   curatedFile:path.resolve(files[1])})));
}
module.exports={verify};

'use strict';
/** Negative admission regression for user-assigned Kashtira Pure 665.
 * The absence of an approved Side is intentional evidence, NOT permission to
 * convert Reserve into Side or to run A01/A05/A09.
 * Tournament banlists are explicitly outside the requested analysis.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const root=path.resolve(__dirname,'..');
const pathArg=process.argv[2];
assert(pathArg,'HISTORIC_PLATFORM_SNAPSHOT_REQUIRED');
const file=path.resolve(pathArg);
assert(file.startsWith(path.join(root,'_platform_source','torneos_yugioh','assets','editorial')+path.sep),'SOURCE_SCOPE');
assert(file.endsWith(path.sep+'665.json'),'ONLY_DECK_665');
const historic=JSON.parse(fs.readFileSync(file,'utf8'));
assert.equal(historic.deck_id,665);
assert.equal(historic.format,'tcg_advanced');
assert.equal(historic.cards.length,38);
const rows=historic.cards.flatMap(c=>c.slots.map(s=>({id:s.card_id,section:s.section,quantity:s.quantity})));
const approved={deck_id:665,format:historic.format,record:{deck_id:665,format:historic.format,cards:historic.cards},inventory:rows};
const tested=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:approved});
assert.equal(tested.eligible,false,'INVALID_UNAUTHORISED_ADMISSION');
assert.deepEqual(tested.counts,{main:42,extra:15,side:0,reserve:19});
assert.deepEqual(tested.violations,['REQUIRED_SIDE_NOT_LOADED']);
const packagePath=path.join(root,'01_INFORMACION_PARA_IMPORTAR','decks','DECK_665_KASHTIRA_PURE','datos','stationx-deck.json');
assert(!fs.existsSync(packagePath),'A02_NATIVE_PACKAGE_NOW_EXISTS_RECHECK_GATE');
const doc=fs.readFileSync(path.join(root,'03_COMPROBACIONES_NO_IMPORTAR','KASHTIRA_665_A01_PRECHECK.md'),'utf8');
for(const task of ['A01-T1','A01-T2','A01-T3']){
 assert(doc.includes('- [ ] **'+task),'A01_MUST_NOT_BE_CERTIFIED_'+task);
}
assert(doc.includes('BLOQUEADA_POR_PRECONDICION'),'FALSE_A01_CLOSURE');
assert(doc.includes('No evaluar banlist si no se pidió'),'USER_OUT_OF_SCOPE_RULE_MISSING');
const a01=fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX/apartados/01_ROL_Y_OBJETIVO_PRINCIPAL.md'),'utf8');
assert(a01.includes('la banlist (lista de cartas prohibidas/limitadas y límites de copias por torneo) **no se consulta, no se evalúa y nunca bloquea este análisis**'),'A01_BANLIST_OUT_OF_SCOPE_INSTRUCTION_MISSING');
console.log(JSON.stringify({
  ok:true,deck_id:665,gate:'BLOCKED_AS_REQUIRED',eligible:false,
  inventory:tested.counts,cardIdentities:38,missingNativePackage:true,
  banlistAssessed:false, banlistUsedAsGate:false, a01Certified:0,
  reserveConvertedToSide:false,inventoryChanged:false,
  ruleEngineExecuted:false,productionImported:false
}));

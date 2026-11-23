'use strict';
/** Negative admission regression for user-assigned Kashtira Pure 665.
 * The user's express authorization permits A01 and separately assigned A02 with Side=0.
 * The current gate requires Main+Extra only. Historical Side waiver markers
 * remain for provenance but have no admission effect; neither Side nor Reserve is modified.
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
assert.equal(tested.eligible,true,'MAIN_EXTRA_ELIGIBLE_UNDER_CURRENT_POLICY');
assert.deepEqual(tested.counts,{main:42,extra:15,side:0,reserve:19});
assert.deepEqual(tested.violations,[]);
const waived=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:approved,
 stageId:'A01',authorizedSideOmissionForA01:true});
assert(waived.eligible&&waived.a01SideWaiverApplied,'A01_USER_WAIVER_NOT_HONORED');
assert.deepEqual(waived.counts,tested.counts,'SIDE_COPIES_CHANGED');
assert(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:approved,
 stageId:'A02',authorizedSideOmissionForA01:true}).eligible,'A02_SIDE_OPTIONAL');
const packagePath=path.join(root,'01_INFORMACION_PARA_IMPORTAR','decks','DECK_665_KASHTIRA_PURE','datos','stationx-deck.json');
assert(fs.existsSync(packagePath),'A02_NATIVE_PACKAGE_NOT_CREATED');
const structure=JSON.parse(fs.readFileSync(packagePath,'utf8'));
assert.equal(structure.deck_id,665);
assert.equal(structure.inventory.length,44);
assert.equal(structure.record.routes.length,16);
const doc=fs.readFileSync(path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE/DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'),'utf8');
for(const task of ['A01-T1','A01-T2','A01-T3'])assert(doc.includes('- [x] **'+task),'A01_NOT_CERTIFIED_'+task);
assert(doc.includes('**A09-T1**')&&doc.includes('Side 0'),'A01_A02_A03_PROGRESS_WRONG');
const report=fs.readFileSync(path.join(root,'03_COMPROBACIONES_NO_IMPORTAR/KASHTIRA_665_A01_PRECHECK.md'),'utf8');
assert(report.includes('EXCEPCION_A01_AUTORIZADA')&&report.includes('COMPLETA 3/3'),'OLD_BLOCKING_REPORT_NOT_RECONCILED');
assert(report.includes('No evaluar banlist si no se pidió'),'USER_OUT_OF_SCOPE_RULE_MISSING');
const a01=fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX/apartados/01_ROL_Y_OBJETIVO_PRINCIPAL.md'),'utf8');
assert(a01.includes('la banlist (lista de cartas prohibidas/limitadas y límites de copias por torneo) **no se consulta, no se evalúa y nunca bloquea este análisis**'),'A01_BANLIST_OUT_OF_SCOPE_INSTRUCTION_MISSING');
const a06=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:structure,stageId:'A06',authorizedSideOmissionForA06:true});
assert(a06.eligible&&a06.a06SideWaiverApplied,'USER_ASSIGNED_A06');
assert(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:structure,stageId:'A07',authorizedSideOmissionForA06:true}).eligible,'A07_SIDE_OPTIONAL');
const a07=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:structure,stageId:'A07',authorizedSideOmissionForA07:true});
assert(a07.eligible&&a07.a07SideWaiverApplied,'A07_SCOPED_AUTH');
assert(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:structure,stageId:'A08',authorizedSideOmissionForA07:true}).eligible,'A08_SIDE_OPTIONAL');
const a08=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:structure,stageId:'A08',authorizedSideOmissionForA08:true});
assert(a08.eligible&&a08.a08SideWaiverApplied,'A08_SCOPED_AUTH');
assert(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:structure,stageId:'A09',authorizedSideOmissionForA08:true}).eligible,'A09_SIDE_OPTIONAL');
console.log(JSON.stringify({
  ok:true,deck_id:665,gate:'MAIN_EXTRA_MINIMUM',defaultEligible:true,a01Eligible:true,
  inventory:tested.counts,cardIdentities:38,nativePackageCreated:true,
  banlistAssessed:false, banlistUsedAsGate:false, a01Certified:3,
  reserveConvertedToSide:false,inventoryChanged:false,
  ruleEngineExecuted:false,productionImported:false
}));

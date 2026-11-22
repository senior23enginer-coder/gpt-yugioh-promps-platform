'use strict';
// A07 paper QA: attributed cases and operator needs, NOT legality certification.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const TYPES=['Z','W','C','T','U','N','F'];
function chunk(src,a,b){
 const i=src.indexOf(a),j=src.indexOf(b,i+a.length);
 assert(i>=0&&j>i,'A07_SECTION_MISSING_'+a);
 return src.slice(i,j);
}
function audit({deckId,userAssigned,packageFile,curatedFile}){
 assert(userAssigned===true&&Number.isInteger(deckId)&&deckId>0,'EXPLICIT_ASSIGNMENT_REQUIRED');
 const pf=path.resolve(packageFile),df=path.resolve(curatedFile);
 assert(pf.startsWith(DECKS)&&df.startsWith(DECKS),'A07_FOREIGN_DECK_PATH');
 assert(path.dirname(path.dirname(pf))===path.dirname(df),'A07_MIXED_DECK_SOURCE');
 const pkg=JSON.parse(fs.readFileSync(pf,'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');assert.equal(pkg.deck_id,deckId);
 assert.equal(pkg.record?.deck_id,deckId);
 const src=fs.readFileSync(df,'utf8');
 const a05=chunk(src,'### A05.8 —','### A05.9 —');
 const rules=chunk(src,'### A07.7 —','### A07.8 —');
 const cases=chunk(src,'### A07.8 —','### A07.9 —');
 const operators=chunk(src,'### A07.9 —','### A07.10 —');
 const registered=[...rules.matchAll(/^\| \x60(\d+:a05:(\d+):[a-z0-9-]+)\x60 \| \x60([A-Z_]+)\x60 \/ \x60([a-z_]+)\x60 \|([^\n]+)$/gm)];
 const registeredIds=registered.map(x=>x[1]);assert.equal(registered.length,94,'A07_RULE_COUNT');
 assert.equal(new Set(registeredIds).size,registeredIds.length,'A07_RULE_DUPLICATE');
 const a05heads=[...a05.matchAll(/^#### \d+\. \x60(\d+:a05:\d+:[a-z0-9-]+)\x60 — dos casos de papel/gm)];
 const a05map=new Map();
 for(let i=0;i<a05heads.length;i++){
  const h=a05heads[i],block=a05.slice(h.index,i+1<a05heads.length?a05heads[i+1].index:a05.length);
  const pair=[...block.matchAll(/case_id=(671:A05:[PN]\d+)/g)].map(x=>x[1]);
  assert(pair.length===2&&pair[0].includes(':P')&&pair[1].includes(':N'),'A07_A05_PAIR_INVALID_'+h[1]);
  assert(!a05map.has(h[1]),'A07_A05_DUPLICATE_EFFECT_'+h[1]);a05map.set(h[1],pair);
 }
 assert.equal(a05map.size,94,'A07_NOT_ALL_EFFECTS_HAVE_A05_PAIR');
 const caseRows=[...cases.matchAll(/^\| E(\d{3}) \/ \x60(\d+:a05:\d+:[a-z0-9-]+)\x60 \|([^\n]+)$/gm)];
 assert.equal(caseRows.length,94,'A07_NOT_ALL_EFFECTS_HAVE_REGRESSION_CASES');
 const all=new Set();let na=0,cond=0,uncertain=0,missingSource=0,sourceIds=0;
 for(let i=0;i<caseRows.length;i++){
  const m=caseRows[i],ordinal=String(i+1).padStart(3,'0'),id=m[2],cells=m[0].split('|').slice(1,-1).map(x=>x.trim());
  assert.equal(m[1],ordinal,'A07_NONSTABLE_ORDINAL_'+id);
  assert.equal(id,registeredIds[i],'A07_CROSSWALK_ORDER_MISMATCH_'+id);
  assert.equal(cells.length,10,'A07_EXPECT_TEN_COLUMNS_'+id);
  const pair=a05map.get(id);
  assert(pair&&pair.every(x=>cells[1].includes(x)),'A07_PAIR_ATTRIBUTION_MISMATCH_'+id);
  for(let k=0;k<TYPES.length;k++){
   const prefix=deckId+':A07:E'+ordinal+':'+TYPES[k];
   assert(cells[k+2].startsWith('\x60'+prefix+'\x60 '),'A07_MISSING_CASE_CATEGORY_'+prefix);
   assert(!all.has(prefix),'A07_DUPLICATE_CASE_ID_'+prefix);all.add(prefix);
   const status=cells[k+2].slice(prefix.length+3);
   assert(status.length>20,'A07_CASE_HAS_NO_JUSTIFICATION_'+prefix);
   if(status.startsWith('NO_APLICA:')||status.startsWith('NO_APLICA_TORNEO_ACTUAL:')||status.startsWith('NO_APLICA_TORNEO_DECK_671:'))na++;
   else if(status.startsWith('CONDICIONAL:'))cond++;
   else if(status.startsWith('SIN_EVIDENCIA:'))uncertain++;
   else assert.fail('A07_PREMATURE_OR_UNKNOWN_CASE_STATUS_'+prefix);
  }
  const formatCase=cells[8];
  assert(formatCase.includes('NO_APLICA_TORNEO_ACTUAL:')||
    formatCase.includes('NO_APLICA_TORNEO_DECK_671:'),
    'A07_FORMAT_CASE_CANNOT_CLAIM_TOURNAMENT_LEGAL_'+id);
  const cid=id.split(':')[2];
  if(!cells[9].includes('cid='+cid))missingSource++;
  else sourceIds++;
 }
 assert.equal(missingSource,0,'A07_CASE_SOURCE_LINK_UNMATCHED');
 assert.equal(all.size,94*7,'A07_INCOMPLETE_CATEGORY_MATRIX');
 const ops=[...operators.matchAll(/^\| \x60(\d+:a05:(\d+):[a-z0-9-]+)\x60 \|([^\n]+)$/gm)];
 assert.equal(ops.length,94,'A07_OPERATOR_COVERAGE_INCOMPLETE');
 for(let i=0;i<ops.length;i++){
  const id=ops[i][1],line=ops[i][0],cid=ops[i][2];
  assert.equal(id,registeredIds[i],'A07_OPERATOR_ID_MISMATCH_'+id);
  assert(line.includes('cid='+cid),'A07_OPERATOR_SOURCE_MISSING_'+id);
  assert(line.includes('OPERADOR_A_VALIDAR_EN_A10B')||
    line.includes('NO_APLICA_INVENTARIO'),'A07_FALSIFIED_ENGINE_SUPPORT_'+id);
 }
 const noAplica=ops.filter(x=>x[0].includes('NO_APLICA_INVENTARIO')).map(x=>x[1]);
 const expected=['13081:sent-field-to-gy-dark-contract',
   '16845:polymerization-gy-target-protection',
   '19932:pointed-opponent-material-link5',
   '20196:hand-discard-search-fiendsmith-spelltrap',
   '20533:gy-banish-detach-atk-reduction'].map(x=>deckId+':a05:'+x);
 assert.deepEqual([...noAplica].sort(),expected.sort(),'A07_INVENTORY_EXCLUSIONS_NOT_EXACT');
 return {ok:true,deck_id:deckId,format:pkg.record.format,
  physicalIdentities:pkg.record.cards.length,typedEffects:registered.length,
  previousPositiveNegativePairs:a05map.size,newCaseCategories:TYPES,
  categorizedPaperCaseIds:all.size,conditional:cond,noAplica:na,sinEvidencia:uncertain,
  officialCaseSources:sourceIds,operatorRequirements:ops.length,inventoryNoAplica:noAplica.length,
  fullPhysicalStateCasesCertified:0,independentRuleLegalityCertified:false,
  calculatorExecuted:false};
}
if(require.main===module){
 const args=process.argv.slice(2),files=args.filter(x=>!x.startsWith('--'));
 const id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 assert.equal(files.length,2,'A07_TWO_INPUT_FILES_REQUIRED');
 console.log(JSON.stringify(audit({deckId:id,userAssigned:args.includes('--user-assigned'),
  packageFile:files[0],curatedFile:files[1]})));
}
module.exports=Object.freeze({audit});
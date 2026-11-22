'use strict';
/**
 * Reusable A01 documentary gate for exactly one user-assigned, loaded deck.
 * Checks the native profile, inventory, task ledger, CID/source and route/rule
 * traceability. Does not assert legal effect execution or A10B coverage.
 */
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const ROOT=path.resolve(__dirname,'..');
const SAFE=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const TASKS=JSON.parse(fs.readFileSync(path.join(ROOT,
 '02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8'));
const TICK=String.fromCharCode(96);

function run({deckId,packagePath,documentPath}){
 assert(Number.isInteger(deckId)&&deckId>0,'EXPLICIT_DECK_ID_REQUIRED');
 const pkgFile=path.resolve(packagePath),docFile=path.resolve(documentPath);
 assert(pkgFile.startsWith(SAFE)&&docFile.startsWith(SAFE),
  'CROSS_REPOSITORY_SCOPE');
 assert(path.dirname(path.dirname(pkgFile))===path.dirname(docFile),
  'CROSS_DECK_SCOPE');
 const envelope=JSON.parse(fs.readFileSync(pkgFile,'utf8'));
 assert.equal(envelope.schema,'station-x-deck-package/1');
 assert.equal(envelope.deck_id,deckId);
 assert.equal(envelope.record.deck_id,deckId);
 assert.equal(envelope.record.format,'tcg_advanced');
 assert.equal(envelope.content_mode,'structured');
 const record=envelope.record;
 const physical=new Map(record.cards.map(c=>[c.cid,c]));
 assert.equal(physical.size,record.cards.length,'DUPLICATED_CARD_CID');
 const counts={main:0,extra:0,side:0,reserve:0};
 for(const c of record.cards)for(const slot of c.slots){
  assert(Object.hasOwn(counts,slot.section),'BAD_SLOT');
  counts[slot.section]+=slot.quantity;
 }
 for(const s of ['main','extra','side'])assert(counts[s]>0,'MISSING_'+s);
 const doc=fs.readFileSync(docFile,'utf8');
 const controlStart=doc.indexOf('## CONTROL_DE_TAREAS_A01_A10 —');
 const controlEnd=doc.indexOf('\n---\n',controlStart);
 assert(controlStart>=0&&controlEnd>controlStart,'MISSING_A01_TASK_LEDGER');
 const ledger=doc.slice(controlStart,controlEnd);
 const rows=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 const expected=TASKS.stages.filter(x=>x.mandatory).flatMap(x=>x.tasks.map(t=>t.task_id));
 assert.equal(expected.length,35);
 assert.equal(rows.length,35,'TASK_LEDGER_MISSING_ROWS');
 assert.deepEqual(rows.map(m=>m[2]),expected,'TASK_LEDGER_WRONG_ORDER');
 const closed=rows.filter(m=>m[1]==='x').map(m=>m[2]);
 assert.deepEqual(closed.filter(t=>t.startsWith('A01-')),
  ['A01-T1','A01-T2','A01-T3'], 'A01_MUST_REMAIN_CERTIFIED');
 const section2=doc.slice(doc.indexOf('### A01.2 —'),doc.indexOf('### A01.3 —'));
 assert(section2.length>200,'A01_FICHA_EVIDENCE_MISSING');
 const profile=record.profile;
 for(const k of ['Arquetipo','Tipo de estrategia','Estilo breve',
  'Resumen para ficha','Qué vigilar']){
  const value=profile[k];
  assert(typeof value==='string'&&value.length>=14,'BAD_PROFILE_'+k);
  assert(section2.includes('- **'+k+':** '+value),
   'PROFILE_MARKDOWN_DRIFT_'+k);
 }
 assert(profile['Estilo breve'].length<=190,'BRIEF_TOO_LONG');
 assert(profile['Resumen para ficha'].length<=250,'SUMMARY_TOO_LONG');
 assert(typeof profile['Cómo se juega']==='string'&&
  profile['Cómo se juega'].length>800 &&
  profile['Cómo se juega'].includes('Plan de juego (A01'),
  'MISSING_FULL_GAME_PLAN');
 const forbid=/Cat[aá]logo completo|consultar el plan|ganas siempre/i;
 for(const k of ['Arquetipo','Tipo de estrategia','Estilo breve',
  'Resumen para ficha'])assert(!forbid.test(profile[k]),
    'GENERIC_OR_UNGROUNDED_PROFILE_'+k);
 const begin=doc.indexOf('### A01.3 —');
 const end=doc.indexOf('**Regla de resultado:**',begin);
 assert(begin>=0&&end>begin,'MISSING_PURPOSE_TRACE');
 const matrix=doc.slice(begin,end);
 const purposeRows=matrix.split('\n').filter(line=>
  line.startsWith('| '+TICK+'A01-R'));
 assert.equal(purposeRows.length,6,'SIX_A01_PURPOSES_REQUIRED');
 const routeIds=new Set(record.routes.map(r=>r.id));
 const ruleIds=new Set(record.calculator?.rules?.map(r=>r.id)||[]);
 const cids=new Set(),routes=new Set(),rules=new Set(),refNames=new Set();
 for(const line of purposeRows){
  const cols=line.split('|').slice(1,-1).map(x=>x.trim());
  assert.equal(cols.length,7,'MALFORMED_PURPOSE_TABLE');
  const ref=cols[0].replaceAll(TICK,'');
  assert(!refNames.has(ref),'DUPLICATE_PURPOSE_'+ref);
  refNames.add(ref);
  const ids=(cols[2].match(/\d{4,5}/g)||[]).map(Number);
  assert(ids.length>=2,'PURPOSE_HAS_TOO_FEW_ACTORS_'+ref);
  for(const cid of ids){
    assert(physical.has(cid),'UNLOADED_PURPOSE_CID_'+cid);
    cids.add(cid);
  }
  const portable=cols[3].match(/677:[a-z0-9:-]+/g)||[];
  for(const id of portable){
   assert(ruleIds.has(id),'UNDECLARED_PORTABLE_RULE_'+id);rules.add(id);
  }
  if(!portable.length)assert(cols[3].includes('SIN_REGLA_PORTATIL_ACREDITADA_A01'),
    'DO_NOT_INVENT_PORTABLE_EFFECTS_'+ref);
  const usedRoutes=cols[4].match(/677:A09:[CV]\d{2}/g)||[];
  for(const id of usedRoutes){
   assert(routeIds.has(id),'UNDECLARED_ROUTE_'+id);routes.add(id);
  }
  if(!usedRoutes.length)assert(cols[4].includes('SIN_RUTA_A09_ACREDITADA'),
   'DO_NOT_INVENT_ROUTES_'+ref);
  const cited=[...cols[6].matchAll(
   /Konami CID (\d+)\]\(https:\/\/www\.db\.yugioh-card\.com\/yugiohdb\/card_search\.action\?cid=(\d+)&ope=2&request_locale=en\)/g)];
  assert(cited.length>=1,'MISSING_OFFICIAL_SOURCE_'+ref);
  for(const entry of cited){
   assert.equal(entry[1],entry[2],'SOURCE_CID_MISMATCH_'+ref);
   assert(ids.includes(Number(entry[1])),'SOURCE_NOT_PART_OF_PURPOSE_'+ref);
  }
 }
 assert(cids.size>=15&&routes.size>=10&&rules.size>=4,
  'A01_TRACEABILITY_BELOW_MINIMUM');
 const result={ok:true,deck_id:deckId,inventory:counts,cardIdentities:physical.size,
  routesInPackage:routeIds.size,portableVariants:record.calculator.rules.length,
  documentedPurposes:purposeRows.length,uniqueReferencedCIDs:cids.size,
  referencedRouteIds:routes.size,referencedPortableRuleIds:rules.size,
  closedTasks:closed,pendingTasks:35-closed.length,calculatorExecuted:false,
  independentRuleLegalityCertified:false};
 return result;
}
if(require.main===module){
 const arg=process.argv.slice(2);
 assert(arg.includes('--user-assigned'),'ASSIGNMENT_REQUIRED');
 const id=Number(arg.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const files=arg.filter(x=>!x.startsWith('--'));
 assert(id===677&&files.length===2,'CRYSTRON_677_ONLY');
 console.log(JSON.stringify(run({deckId:id,packagePath:files[0],
   documentPath:files[1]})));
}
module.exports={run};

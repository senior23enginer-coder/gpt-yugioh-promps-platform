'use strict';
/**
 * Crystron 677 A06: causal relationship and paper-case CONTRACT audit.
 * This checks real physical CIDs and ids, sources, 21 directed relationships,
 * 42 P/N paper cases, compatible zones and named routes. It does not replay
 * a duel, certify the 184 A05 paper transitions, or execute A10B.
 */
const a=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),safe=path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
const expectedActors=[20798,12608,12608,20759,20798,12606,20758,
 20758,20778,20778,12609,12756,19153,19200,13826,16850,
 7445,7445,20798,20787,20817];
const expectedRoutes=14,expectedRelations=21;
const maxCase=21;
function validateCaseTable(text,sourceIds,allCardCids,allRoutes,sourceCids,document){
 const lines=text.split('\n').filter(line=>/^\| \x60R\d{2}\x60 \x60677:A06:P\d{2}\x60/.test(line));
 a.equal(lines.length,expectedRelations,'MISSING_A06_RELATION_CASES');
 const effects=new Set(),cases=new Set(),mappedRoutes=new Set(),sourcedCards=new Set();
 const noRoute=[];
 for(let i=0;i<lines.length;i++){
  const col=lines[i].split('|').slice(1,-1).map(s=>s.trim());
  a.equal(col.length,6,'A06_CASE_TABLE_WRONG_COLUMN_COUNT');
  const m=/^\x60(R\d\d)\x60 \x60(677:A06:P\d\d)\x60 \/ \x60(677:A06:N\d\d)\x60$/.exec(col[0]);
  a(m,'INVALID_A06_CASE_IDENTIFIERS');
  const n=String(i+1).padStart(2,'0'),id='R'+n;
  a.equal(m[1],id,'A06_RELATION_ID_OUT_OF_ORDER');
  a.equal(m[2],'677:A06:P'+n,'A06_POSITIVE_ID_DRIFT');
  a.equal(m[3],'677:A06:N'+n,'A06_NEGATIVE_ID_DRIFT');
  for(const caseId of [m[2],m[3]]){
   a(!cases.has(caseId),'DUPLICATE_A06_PAPER_CASE');cases.add(caseId);
  }
  const ownEffects=[...col[1].matchAll(/677:a05:(\d+):[a-z0-9-]+/g)].map(x=>x[0]);
  a(ownEffects.length>0,'A06_MISSING_EFFECT_ID_'+id);
  a.equal(Number(ownEffects[0].split(':')[2]),expectedActors[i],
   'WRONG_CAUSAL_ACTOR_'+id);
  for(const ef of ownEffects){
   a(sourceIds.has(ef),'EFFECT_NOT_DEFINED_IN_A05_'+ef);
   const cid=Number(ef.split(':')[2]);a(allCardCids.has(cid),'FOREIGN_CID_'+cid);
   effects.add(ef);sourcedCards.add(cid);
   a(sourceCids.has(cid),'NO_OFFICIAL_CID_SOURCE_'+cid);
  }
  const before=col[2],after=col[3],negative=col[4],link=col[5];
  for(const [value,tag] of [[before,'PRE'],[after,'POST'],[negative,'NEG']]){
   a(value.length>=50,'A06_UNDERSPECIFIED_'+tag+'_'+id);
   a(!/undefined|null|PENDIENTE_DE_ESCRIBIR/i.test(value),'A06_INVALID_STATE_'+tag+'_'+id);
  }
  a(/\d{4,5}/.test(before),'POSITIVE_REQUIRES_EXPLICIT_PHYSICAL_CID_'+id);
  a(/(?:GY|MZ|Deck|mano|Campo|destierro|Extra|S\/T|M\/T)/i.test(after),
   'POST_STATE_WITHOUT_ZONE_'+id);
  a(/(?:no|sin|falta|bloque|impide|negad|NIVEL|NO_APLICA)/i.test(negative),
   'NEGATIVE_CASE_MUST_FAIL_CLOSED_'+id);
  const rules=[...link.matchAll(/\x60(RGL\d\d)\x60/g)].map(x=>x[1]);
  const decisions=[...link.matchAll(/\x60(D\d\d)\x60/g)].map(x=>x[1]);
  const routes=[...link.matchAll(/\x60(677:A09:[CV]\d\d)\x60/g)].map(x=>x[1]);
  a(rules.length>=1,'MISSING_A07_RULE_LINK_'+id);
  a(decisions.length>=1,'MISSING_A08_DECISION_LINK_'+id);
  for(const rule of rules)a(document.includes('| '+rule+' |'),'FOREIGN_A07_RULE_'+rule);
  for(const decision of decisions)a(document.includes('| '+decision+' |'),'FOREIGN_A08_DECISION_'+decision);
  for(const route of routes){
   a(allRoutes.has(route),'FOREIGN_A09_ROUTE_'+route);mappedRoutes.add(route);
  }
  if(!routes.length){
   a(link.includes('SIN_RUTA_IDENTIFICADA'),'A06_INVENTED_ROUTE_'+id);
   noRoute.push(id);
  }
  a(document.includes('| '+id+' |'),'ORIGINAL_A06_RELATION_REMOVED_'+id);
 }
 a.equal(cases.size,42,'A06_PAPER_CASE_COUNT');
 a(effects.size>=30,'MISSING_CAUSAL_EFFECT_COVERAGE');
 a(mappedRoutes.size>=11,'A06_TOO_FEW_ACTUAL_ROUTE_LINKS');
 return {cases:cases.size,relations:lines.length,
  distinctReferencedA05Effects:effects.size,actorCIDs:sourcedCards.size,
  mappedRouteIds:mappedRoutes.size,noRouteDeclared:noRoute};
}
function audit({deckId,packagePath,documentPath}){
 a.equal(deckId,677,'CRYSTRON_677_ONLY');
 const pkgPath=path.resolve(packagePath),docPath=path.resolve(documentPath);
 a(pkgPath.startsWith(safe)&&docPath.startsWith(safe),'OUTSIDE_ASSIGNED_DECK');
 a.equal(path.dirname(path.dirname(pkgPath)),path.dirname(docPath),'DECK_ROOT_MISMATCH');
 const pkg=JSON.parse(fs.readFileSync(pkgPath,'utf8')),doc=fs.readFileSync(docPath,'utf8');
 a.equal(pkg.deck_id,deckId);a.equal(pkg.record.deck_id,deckId);
 a.equal(pkg.record.format,'tcg_advanced');
 const cardCids=new Set(pkg.record.cards.map(x=>x.cid));
 a.equal(cardCids.size,39);
 const counts={main:0,extra:0,side:0,reserve:0};
 for(const card of pkg.record.cards)for(const slot of card.slots)counts[slot.section]+=slot.quantity;
 a.deepEqual(counts,{main:40,extra:15,side:15,reserve:0});
 a.equal(pkg.record.routes.length,expectedRoutes);
 a.equal(pkg.record.calculator.rules.length,13,'A10B_UNCHANGED');
 const ids=new Set(pkg.record.routes.map(x=>x.id));
 a.equal(ids.size,14,'DUPLICATE_ROUTE');
 const s=doc.indexOf('### A05.2 —'),e=doc.indexOf('<!-- A05_EFFECTS_END -->',s);
 a(s>=0&&e>s,'MISSING_A05_SOURCE');
 const section=doc.slice(s,e);
 const effectList=[...section.matchAll(/^#### \d+\. \x60(677:a05:(\d+):[a-z0-9-]+)\x60/gm)];
 a.equal(effectList.length,92,'A05_CENSUS_CHANGED');
 const effectIds=new Set(effectList.map(x=>x[1])),sourceCids=new Set(effectList.map(x=>Number(x[2])));
 const r=doc.indexOf('### A06.5 —'),end=doc.indexOf('## APARTADO_07 —',r);
 a(r>=0&&end>r,'A06_TRACEABILITY_NOT_DOCUMENTED');
 const relationRows=[...doc.matchAll(/^\| R(\d\d) \|/gm)];
 a.equal(relationRows.length,21,'A06_DIRECTED_RELATIONS_CHANGED');
 a.deepEqual(relationRows.map(x=>x[1]),Array.from({length:21},(_,i)=>String(i+1).padStart(2,'0')));
 const current=doc.slice(r,end);
 const details=validateCaseTable(current,effectIds,cardCids,ids,sourceCids,doc);
 const a06=doc.slice(doc.indexOf('### A06.2 —'),doc.indexOf('### A06.4 —'));
 const extraRows=a06.split('\n').filter(x=>/^\| [^|]+ ×\d \|/.test(x));
 a.equal(extraRows.length,13,'NOT_ALL_13_EXTRA_IN_A06');
 const five=doc.slice(doc.indexOf('### A06.3 —'),r);
 for(let i=1;i<=5;i++)a(five.includes('ACC0'+i),'MISSING_CONDITIONAL_EXTRA_ACCESS_'+i);
 a(current.includes('A05-T4 permanecen pendientes'),'DONT_MASK_A05_T4_GAP');
 const ledgerBegin=doc.indexOf('## CONTROL_DE_TAREAS_A01_A10 —');
 const ledgerEnd=doc.indexOf('\n---\n',ledgerBegin);
 a(ledgerBegin>=0&&ledgerEnd>ledgerBegin,'TASK_LEDGER_MISSING');
 const ledger=doc.slice(ledgerBegin,ledgerEnd);
 const marks=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 a.equal(marks.length,35,'MISSING_REQUIRED_TASKS');
 const closed=marks.filter(x=>x[1]==='x').map(x=>x[2]);
 a.equal(closed.length,19,'A06_EXACTLY_NINETEEN_TASKS_CLOSED');
 a(closed.includes('A06-T1')&&closed.includes('A06-T2')&&closed.includes('A06-T3')&&closed.includes('A06-T4'),'A06_NOT_CLOSED');
 a(!closed.includes('A05-T4'),'A05_T4_MUST_REMAIN_OPEN');
 a(ledger.includes('19/35')&&ledger.includes('16/35'),'PROGRESS_MISMATCH');
 return {ok:true,deck_id:677,physical:counts,identities:39,
  a05ClauseIds:92,a05T4IndependentlyVerified:false,
  a06Relations:details.relations,a06PaperCases:details.cases,
  distinctEffectIdsInSynergies:details.distinctReferencedA05Effects,
  actualRouteIds:details.mappedRouteIds,
  noStandaloneRouteRelations:details.noRouteDeclared,
  extraDeckIdentities:13,alternativeAccesses:5,
  checklist:{closed:closed.length,total:35,pending:35-closed.length},
  independentlyReplayedSynergies:0,calculatorExecuted:false,productionImported:false};
}
if(require.main===module){
 const args=process.argv.slice(2);
 a(args.includes('--user-assigned'),'EXPLICIT_USER_ASSIGNMENT_REQUIRED');
 const id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const files=args.filter(x=>!x.startsWith('--'));a.equal(files.length,2);
 const report=audit({deckId:id,packagePath:files[0],documentPath:files[1]});
 console.log(JSON.stringify(report));
}
module.exports={audit,validateCaseTable};
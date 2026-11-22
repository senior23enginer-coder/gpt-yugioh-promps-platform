'use strict';
/**
 * Snapshot-based, fail-closed TCG Advanced legality check for ONE assigned deck.
 * Checks explicit documented F/L facts only. Never modifies cards or upgrades
 * hypothetical paper effects into executable/legal tournament actions.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const DECK_ROOT=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const SNAPSHOT={
 effective_date:'2026-10-19',
 format:'tcg_advanced',
 source:'https://www.yugioh-card.com/en/limited/list_2026-10-19/',
 restricted:new Map([
  [13081,{status:'Forbidden',max:0}],
  [13619,{status:'Forbidden',max:0}],
  [15296,{status:'Forbidden',max:0}],
  [9279,{status:'Limited',max:1}]
 ])
};
function section(src,start,end){
 const a=src.indexOf(start),b=src.indexOf(end,a+start.length);
 assert(a>=0&&b>a,'FORMAT_REQUIRED_SECTION_MISSING');
 return src.slice(a,b);
}
function audit({deckId,assigned,documentPath}){
 assert(assigned&&Number.isInteger(deckId)&&deckId>0,'FORMAT_EXPLICIT_ASSIGNMENT_REQUIRED');
 const file=path.resolve(documentPath);
 assert(file.startsWith(DECK_ROOT),'FORMAT_CROSS_DECK_VIOLATION');
 const src=fs.readFileSync(file,'utf8'),roster=section(src,'### A06.2 —','### A06.3 —');
 const a07=section(src,'### A07.8 —','### A07.9 —'),format=section(src,'### A07.12 —','## APARTADO_08 —');
 assert(format.includes(SNAPSHOT.source)&&format.includes(SNAPSHOT.effective_date),
   'FORMAT_OFFICIAL_SNAPSHOT_UNTRACEABLE');
 const parsed=[...roster.matchAll(/^\| MEMD-(\d{3}) · \[(\d+)\]\([^)]*\) \| ([^|]+?) · (\d+)\/(\d+)\/(\d+)\/(\d+) \|/gm)];
 assert.equal(parsed.length,39,'FORMAT_ROSTER_NOT_COMPLETE');
 const byCid=new Map(),totals={main:0,extra:0,side:0,reserve:0};
 for(const m of parsed){
  const cid=Number(m[2]);
  assert(!byCid.has(cid),'FORMAT_DUPLICATE_PHYSICAL_CID');
  const quantities={main:Number(m[4]),extra:Number(m[5]),side:Number(m[6]),reserve:Number(m[7])};
  const total=Object.values(quantities).reduce((a,b)=>a+b,0);
  assert(total>0,'FORMAT_UNLOADED_IDENTITY');
  byCid.set(cid,{name:m[3],quantities,total});
  for(const key of Object.keys(totals))totals[key]+=quantities[key];
 }
 assert.deepEqual(totals,{main:41,extra:15,side:14,reserve:0},'FORMAT_INVENTORY_CHANGED');
 const violations=[];
 for(const [cid,limit] of SNAPSHOT.restricted){
  const c=byCid.get(cid);
  assert(c,'FORMAT_EXPECTED_CID_MISSING_'+cid);
  if(c.total>limit.max)violations.push({cid,card:c.name,quantity:c.total,
   maximum:limit.max,status:limit.status,excess:c.total-limit.max});
 }
 assert.equal(violations.length,4,'FORMAT_EXPECT_FOUR_DOCUMENTED_CONFLICTS');
 assert.equal(violations.reduce((n,v)=>n+v.excess,0),5,'FORMAT_EXCESS_COUNT_CHANGED');
 const cases=[...a07.matchAll(/^\| E\d{3} \/ \x60(\d+:a05:(\d+):[a-z0-9-]+)\x60 \|[^\n]+$/gm)];
 const forbidden=cases.filter(x=>SNAPSHOT.restricted.has(Number(x[2])));
 assert.equal(forbidden.length,6,'FORMAT_AFFECTED_EFFECT_COUNT');
 for(const row of forbidden){
  assert(row[0].includes('NO_APLICA_TORNEO_ACTUAL:')&&row[0].includes('TOUR')===false ||
   row[0].includes('NO_APLICA_TORNEO_ACTUAL:'),
   'FORMAT_BANNED_CARD_CASE_NOT_BLOCKED_'+row[1]);
 }
 const legal=violations.length===0;
 assert(legal===false,'FORMAT_HISTORICAL_DECK_FALSIFIED');
 return {ok:true,deck_id:deckId,effective_date:SNAPSHOT.effective_date,
  format:SNAPSHOT.format,source:SNAPSHOT.source,
  physical_identites:parsed.length,totals,restrictedViolations:violations,
  excessiveCopies:5,affectedEffectClauses:forbidden.length,tournamentLegal:legal,
  ruleTextStillDocumentable:true,proposedCardMutations:0,
  independentEffectLegalityCertified:false};
}
if(require.main===module){
 const args=process.argv.slice(2);
 const id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const files=args.filter(x=>!x.startsWith('--'));
 assert.equal(files.length,1,'FORMAT_EXPECT_SINGLE_CURATED_FILE');
 console.log(JSON.stringify(audit({deckId:id,assigned:args.includes('--user-assigned'),
  documentPath:files[0]}),null,2));
}
module.exports=Object.freeze({audit});
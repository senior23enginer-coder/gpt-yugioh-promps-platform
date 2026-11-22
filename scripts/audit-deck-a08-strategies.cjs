'use strict';
const a=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),decks=path.join(root,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const swaps=[['S01',20500,2,9139,2],['S02',20764,3,9139,3],
 ['S03',21203,3,9139,3],['S04',20206,3,9139,3],['S05',11243,3,9139,3]];
function cut(s,lo,hi){const i=s.indexOf(lo),j=s.indexOf(hi,i+lo.length);a(i>=0&&j>i,'MISSING_SECTION_'+lo);return s.slice(i,j);}
function audit({id,assigned,pkgPath,docPath}){
 a(assigned&&id===671,'USER_ASSIGNED_DECK_671_ONLY');
 const pf=path.resolve(pkgPath),df=path.resolve(docPath);
 a(pf.startsWith(decks)&&df.startsWith(decks)&&path.dirname(path.dirname(pf))===path.dirname(df),'CROSS_DECK_SCOPE');
 const pkg=JSON.parse(fs.readFileSync(pf,'utf8'));
 a.equal(pkg.schema,'station-x-deck-package/1');a.equal(pkg.deck_id,id);a.equal(pkg.record.deck_id,id);
 const count={main:0,extra:0,side:0,reserve:0},cards=new Map();
 for(const c of pkg.record.cards){
  a(!cards.has(c.cid),'DUPLICATE_CID');cards.set(c.cid,c);
  for(const slot of c.slots){a(Object.hasOwn(count,slot.section));count[slot.section]+=slot.quantity;}
 }
 a.equal(cards.size,39);a.deepEqual(count,{main:41,extra:15,side:14,reserve:0});
 const doc=fs.readFileSync(df,'utf8');
 const a05=cut(doc,'### A05.6 —','### A05.7 —'),
  a06=cut(doc,'### A06.2 —','### A06.3 —'),
  a08=cut(doc,'## APARTADO_08 —','## APARTADO_09 —'),
  a09=doc.slice(doc.indexOf('## APARTADO_09 —'));
 const effects=new Set([...a05.matchAll(/\x60(671:a05:\d+:[a-z0-9-]+)\x60 · \*\*[A-Z_]+\*\*/g)].map(m=>m[1]));
 a.equal(effects.size,94,'MISSING_EFFECTS');
 a.equal([...a06.matchAll(/^\| MEMD-\d{3} · \[\d+\]/gm)].length,39,'A06_CARD_PROFILE_COUNT');
 const matrix=cut(a08,'### A08.5 —','### A08.6 —');
 const paper=cut(a08,'### A08.6 —','### A08.7 —');
 const sidebar=cut(a08,'### A08.7 —','### A08.8 —');
 const tactical=cut(a08,'### A08.8 —','## APARTADO_09 —');
 const lines=[...matrix.matchAll(/^\| (I\d{2}) · \x60([A-Z_]+)\x60 \|([^\n]+)$/gm)];
 a.equal(lines.length,34,'A08_NOT_THIRTY_FOUR');
 const routes=new Set([...a09.matchAll(/^### MEMD-(C\d{2}) —/gm)].map(m=>m[1]));
 a.equal(routes.size,12);
 let photoCount=0,physicalCount=0,fxLinks=0,notLinked=0,extraPaths=0;
 for(let i=0;i<lines.length;i++){
  const line=lines[i][0],entry=lines[i][1],cells=line.split('|').slice(1,-1).map(x=>x.trim());
  a.equal(entry,'I'+String(i+1).padStart(2,'0'),'A08_UNSTABLE_ID');
  a.equal(cells.length,7,'A08_COLS_'+entry);
  const [head,photos,initial,refs,context,routeCell,status]=cells;
  a(context.length>=28,'A08_NO_CONTEXT_'+entry);
  const places=[...initial.matchAll(/(SIDE|H|M|G|S|E)(\d+)(?:#(\d+))?/g)];
  const images=[...photos.matchAll(/<img src="(imagenes\/(\d+)\.(png|jpg))" width="38" alt="CID \d+ (?:SIDE|H|M|G|S|E)">/g)];
  a(places.length>0&&places.length===images.length,'A08_PHOTO_COUNT_'+entry);
  const used=new Map(),uids=new Set();
  for(let k=0;k<places.length;k++){
   const [,zone,cidTxt,serial]=places[k],cid=Number(cidTxt),card=cards.get(cid);
   a(card,'A08_UNKNOWN_CID_'+cid);
   const required=zone==='E'?'extra':zone==='SIDE'?'side':zone==='H'?'main':null;
   if(required)a(card.slots.some(x=>x.section===required&&x.quantity>0),'A08_WRONG_ZONE_'+entry+cid);
   const uid=cid+'#'+(serial||'1');a(!uids.has(uid),'A08_DUPLICATED_COPY');uids.add(uid);
   used.set(cid,(used.get(cid)||0)+1);
   a.equal(Number(images[k][2]),cid,'A08_PHOTO_WRONG_CID');
   a(fs.existsSync(path.join(path.dirname(df),images[k][1])),'A08_MISSING_PHOTO_'+entry);
   photoCount++;physicalCount++;
  }
  for(const [cid,n] of used)a(n<=cards.get(cid).slots.reduce((sum,s)=>sum+s.quantity,0),'A08_CARD_COPY_OVERUSE_'+entry);
  const refsIds=[...refs.matchAll(/\x60(671:a05:\d+:[a-z0-9-]+)\x60/g)].map(m=>m[1]);
  a(refsIds.length>0,'A08_NO_EFFECT_LINK_'+entry);
  for(const fx of refsIds)a(effects.has(fx),'A08_UNREGISTERED_EFFECT_'+entry+'_'+fx);
  fxLinks+=refsIds.length;
  const route=routeCell.replaceAll(String.fromCharCode(96),'');
  if(route==='—'){notLinked++;a(status.includes('SIN_JUGADA_ACREDITADA'));}
  else if(route.startsWith('EX-')){a(a09.includes(route),'A08_UNKNOWN_EXTRA_'+route);extraPaths++;}
  else a(routes.has(route),'A08_UNKNOWN_ROUTE_'+route);
  a(/CONDICIONAL|SIN_JUGADA_ACREDITADA|SIN_RUTA_REPRODUCIBLE/.test(status),'A08_PREMATURELY_CERTIFIED');
 }
 const tests=[...paper.matchAll(/^\| \x60(671:A08:D\d{2})\x60 \|([^\n]+)$/gm)];
 a.equal(tests.length,16,'A08_PAPER_TEST_COUNT');
 for(let i=0;i<tests.length;i++){
  const idCase=id+':A08:D'+String(i+1).padStart(2,'0'),line=tests[i][0];
  a.equal(tests[i][1],idCase,'A08_BAD_PAPER_ID');
  const refs=[...line.matchAll(/\x60(671:a05:\d+:[a-z0-9-]+)\x60/g)].map(x=>x[1]);
  a(refs.length>0&&refs.every(x=>effects.has(x)),'A08_PAPER_NOT_SOURCED_'+idCase);
  a(/CONDICIONAL|NO_APLICA_TORNEO_ACTUAL/.test(line));
 }
 const plans=[...sidebar.matchAll(/^\| (S0[1-5]) \|([^\n]+)$/gm)];
 a.equal(plans.length,5,'A08_FIVE_SIDEBAR_PLANS');
 for(const [plan,plus,n,minus,m] of swaps){
  const row=plans.find(x=>x[1]===plan);a(row,'A08_UNKNOWN_SIDEBAR_PLAN');
  a(row[0].includes('CID'+plus)&&row[0].includes('CID'+minus),'A08_SIDEBAR_CID_MISMATCH_'+plan);
  a(cards.get(plus).slots.some(s=>s.section==='side'&&s.quantity>=n),'A08_SIDEBAR_ENTRY_MISSING_'+plan);
  a(cards.get(minus).slots.some(s=>s.section==='main'&&s.quantity>=m),'A08_SIDEBAR_EXIT_MISSING_'+plan);
  a.equal(count.main+n-m,41);
 }
 a(sidebar.includes('no convierten la lista 671 en legal para torneo'),'A08_FALSE_TOURNAMENT_CLAIM');
 const tRows=[...tactical.matchAll(/^\| (I\d{2}) \|([^\n]+)$/gm)];
 a.equal(tRows.length,34,'A08_NOT_THIRTY_FOUR_CAUSAL_COST_ROWS');
 for(let i=0;i<34;i++){
  const line=tRows[i][0],id='I'+String(i+1).padStart(2,'0');
  a.equal(tRows[i][1],id,'A08_CAUSAL_ROW_NOT_SAME_DECISION_'+id);
  const cols=line.split('|').slice(1,-1).map(x=>x.trim());
  a.equal(cols.length,6,'A08_CAUSAL_COST_COLUMNS_'+id);
  for(let k=1;k<5;k++)a(cols[k].length>=4,'A08_EMPTY_COST_OR_WINDOW_'+id);
  const fx=[...cols[5].matchAll(/\x60(671:a05:\d+:[a-z0-9-]+)\x60/g)].map(m=>m[1]);
  a(fx.length>0&&fx.every(x=>effects.has(x)),'A08_MISSING_RULE_REF_'+id);
 }

 return {ok:true,deck_id:id,format:pkg.record.format,counts:count,physicalIdentities:cards.size,
  decisions:34,photos:photoCount,initialPlacements:physicalCount,effectLinks:fxLinks,
  knownA09Links:34-notLinked,unlinkedStrategicDecisions:notLinked,extraLinks:extraPaths,
  documentedPositiveNegativeCases:tests.length,exactSidePlans:plans.length,
  costWindowSelectionLimitRows:tRows.length,
  tournamentLegal:false,replaysVerified:0,calculatorExecuted:false};
}
if(require.main===module){
 const x=process.argv.slice(2),files=x.filter(s=>!s.startsWith('--'));
 a.equal(files.length,2);
 console.log(JSON.stringify(audit({id:Number(x.find(s=>s.startsWith('--deck-id='))?.split('=')[1]),
  assigned:x.includes('--user-assigned'),pkgPath:files[0],docPath:files[1]}),null,2));
}
module.exports=Object.freeze({audit});
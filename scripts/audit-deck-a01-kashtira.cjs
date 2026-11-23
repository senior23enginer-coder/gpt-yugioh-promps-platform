'use strict';
// A01 Kashtira 665 documentary certification; A01-only user-authorized Side=0.
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const root=path.resolve(__dirname,'..');
const sourceDir=path.join(root,'_platform_source/torneos_yugioh/assets/editorial')+path.sep;
const deckDir=path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const tick=String.fromCharCode(96);
function area(text,start,end){const i=text.indexOf(start),j=text.indexOf(end,i+start.length);A(i>=0&&j>i,'SECTION_MISSING_'+start);return text.slice(i+start.length,j)}
function official(cid){return 'https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid='+cid+'&ope=2&request_locale=es'}
function run(historyFile,documentFile){
 const p=path.resolve(historyFile),f=path.resolve(documentFile);
 A(p.startsWith(sourceDir)&&p.endsWith('/665.json'),'HISTORICAL_665_ONLY');
 A.equal(f,path.join(deckDir,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'));
 const j=JSON.parse(fs.readFileSync(p,'utf8')),md=fs.readFileSync(f,'utf8');
 A.equal(j.deck_id,665);A.equal(j.format,'tcg_advanced');A.equal(j.cards.length,38);
 const cards=new Map(j.cards.map(c=>[c.cid,c]));
 A.equal(cards.size,38);A.equal(j.routes.length,16);
 const routes=new Set(j.routes.map(r=>r.id));A.equal(routes.size,16);
 const rel=new Set(j.causal_relations.map(x=>x.id));
 const inv=j.cards.flatMap(c=>c.slots.map(s=>({id:s.card_id,section:s.section,quantity:s.quantity})));
 A.equal(inv.length,44);
 const payload={deck_id:665,format:j.format,record:{deck_id:665,format:j.format,cards:j.cards},inventory:inv};
 const normal=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload});
 A.equal(normal.eligible,false);A(normal.violations.includes('REQUIRED_SIDE_NOT_LOADED'));
 const allowed=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload,
  stageId:'A01',authorizedSideOmissionForA01:true});
 A(allowed.eligible&&allowed.a01SideWaiverApplied,'USER_WAIVER_NOT_APPLIED');
 A.deepEqual(allowed.counts,{main:42,extra:15,side:0,reserve:19});
 A.equal(validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload,
  stageId:'A02',authorizedSideOmissionForA01:true}).eligible,false);
 const ledger=area(md,'## CONTROL_DE_TAREAS_A01_A10 — Kashtira Pure 665','\n---\n');
 const taskRows=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 const expected=JSON.parse(fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8'))
  .stages.filter(s=>s.mandatory).flatMap(s=>s.tasks.map(t=>t.task_id));
 A.deepEqual(taskRows.map(m=>m[2]),expected);A.equal(taskRows.length,35);
 A.deepEqual(taskRows.filter(m=>m[1]==='x').map(m=>m[2]).slice(0,16),['A01-T1','A01-T2','A01-T3','A02-T1','A02-T2','A02-T3','A03-T1','A03-T2','A03-T3','A04-T1','A04-T2','A04-T3','A05-T1','A05-T2','A05-T3','A05-T4']);
 A((Number((ledger.match(/\b(\d+)\/35\b[^\n]*\b(\d+)\/35\b/)||[])[1]) + Number((ledger.match(/\b(\d+)\/35\b[^\n]*\b(\d+)\/35\b/)||[])[2]) === 35)&&ledger.includes('Side 0'));
for(const k of ['A02-T1','A02-T2','A02-T3'])A(taskRows.some(x=>x[2]===k&&x[1]==='x'),'A02_CHECKLIST_NOT_SYNCHRONIZED');
 const a01=area(md,'## APARTADO_01 — Kashtira Pure','## IDENTIDAD BÁSICA');
 const first=area(a01,'### A01.1 —','### A01.2 —');
 const second=area(a01,'### A01.2 —','### A01.3 —');
 const third=area(a01,'### A01.3 —','**Regla de resultado:**');
 for(const cid of [18204,17769,17768,18203,18151,17800,18191,9861,17815,18220]){
  A(cards.has(cid));A(first.includes(official(cid)),'MISSING_OFFICIAL_CID_'+cid);
 }
 const labels=['Arquetipo','Tipo de estrategia','Estilo breve','Resumen para ficha','Qué vigilar'];
 const profile={};for(const label of labels){
  const marker='- **'+label+':** ';
  const line=second.split('\n').find(x=>x.startsWith(marker));
  A(line,'MISSING_PROFILE_'+label);profile[label]=line.slice(marker.length);
  A(profile[label].length>=(label==='Arquetipo'?3:15),'EMPTY_PROFILE_'+label);
 }
 A.equal(profile.Arquetipo,'Kashtira');
 A(profile['Tipo de estrategia'].includes('Rango 7'));
 A(profile['Estilo breve'].length<=190&&profile['Resumen para ficha'].length<=250,'PROFILE_TOO_LONG');
 A(second.includes('**Cómo se juega:**'));
 for(const title of ['**Primero.**','**Segundo.**','**Medio y tardío.**','**Gestión y riesgos.**','**Condición de victoria realista.**']){
  A(second.includes(title),'MISSING_PLAN_'+title);
 }
 const efRows=third.split('\n').filter(x=>x.startsWith('| '+tick+'665:A01:EF:'));
 A.equal(efRows.length,15);const effects=new Set();
 for(const row of efRows){
  const col=row.split('|').slice(1,-1).map(x=>x.trim()),id=col[0].replaceAll(tick,'');
  const matched=id.match(/^665:A01:EF:(\d+):[A-Z_]+$/);A(matched,'BAD_EFFECT_REF');
  const cid=Number(matched[1]),card=cards.get(cid);A(card,'FOREIGN_EFFECT_CARD_'+cid);
  const slotId=Number(col[1].match(/card_id (\d+)/)?.[1]);
  A(card.slots.some(s=>s.card_id===slotId&&['main','extra'].includes(s.section)),'BAD_EFFECT_CARD_SLOT');
  A(col[3].includes(official(cid)),'MISSING_EFFECT_SOURCE');
  A(!effects.has(id));effects.add(id);
 }
 const goals=third.split('\n').filter(x=>x.startsWith('| '+tick+'A01-R'));
 A.equal(goals.length,6);
 const relatedRoutes=new Set(),cids=new Set(),refs=new Set();
 for(const row of goals){
  const col=row.split('|').slice(1,-1).map(x=>x.trim());A.equal(col.length,7);
  const ids=[...col[2].matchAll(/(\d{4,5}) \/ card_id (\d+)/g)];
  A(ids.length>=2,'GOAL_WITHOUT_PHYSICAL_CARDS');
  for(const [,c,s] of ids){
   const cid=Number(c),sid=Number(s),card=cards.get(cid);
   A(card&&card.slots.some(x=>x.card_id===sid&&['main','extra'].includes(x.section)),'GOAL_CID_SLOT_MISMATCH');
   cids.add(cid);
  }
  const ef=[...col[3].matchAll(/665:A01:EF:\d+:[A-Z_]+/g)].map(x=>x[0]);
  A(ef.length>=2);for(const e of ef){A(effects.has(e));refs.add(e)}
  const route=col[4].replaceAll(tick,'');A(routes.has(route),'UNVERIFIED_ROUTE_REF');
  relatedRoutes.add(route);
  const a06=col[6].match(/A06:REL:\d+/)?.[0];
  A(a06&&rel.has(a06),'BAD_A06_LINK');
  A(col[6].includes('Konami CID')&&col[5].length>70,'NO_GOAL_LIMIT_OR_SOURCE');
 }
 A(cids.size>=11&&refs.size>=10&&relatedRoutes.size===6);
 A(second.includes('Side continúa en cero'),'SIDE_NOT_PRESERVED');
 return {ok:true,deck_id:665,stage:'A01',completed:['A01-T1','A01-T2','A01-T3'],
  tasksClosed:3,tasksPending:32,cardIdentities:38,physicalSlots:44,historicalRoutes:16,
  registeredEffectReferences:effects.size,documentedPurposes:goals.length,linkedRoutes:relatedRoutes.size,
  physical:allowed.counts,explicitWaiverForA01:true,sideInvented:false,banlistAssessed:false,
  engineExecuted:false,livePlatformChanged:false};
}
if(require.main===module){
 const argv=process.argv.slice(2),files=argv.filter(x=>!x.startsWith('--'));
 A(argv.includes('--user-assigned')&&argv.includes('--authorized-side-waiver')&&
 argv.includes('--deck-id=665')&&files.length===2,'EXPLICIT_665_A01_WAIVER_REQUIRED');
 console.log(JSON.stringify(run(...files)));
}
module.exports={run};

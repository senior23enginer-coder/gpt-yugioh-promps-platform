'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const ROOT=path.resolve(__dirname,'..'),DIR=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const COUNTS={4342:1,5432:1,5537:1,7153:1,9279:1,9352:1,9861:2,12464:1,12668:1,12950:1,13587:1,13631:2,13896:2,13974:3,14400:3,14740:2,14741:1,15296:3,15366:4,15524:4,15741:4,15756:1,15882:4,16386:4,17768:3,17769:3,17770:3,17800:4,17804:3,17815:3,17831:2,18151:2,18152:3,18153:3,18191:5,18203:2,18204:3,18220:2};
const KINDS={PRO:18,ACT:25,TRG:19,QCK:16,CONT:8,REP:4};
const FIELDS=['Actor / zona','Ventana','Guarda física','Disparador','Coste','Objetivo y selección','Resolución y estado posterior','Límite / cadena','Restricciones y recursos','Negaciones','Fuente oficial','Casos de papel','Estado'];
const ORACLE=[
 ['17768:attack-trigger-banish','Resolución y estado posterior',/boca abajo.*sin negar/i],
 ['18151:banish-topthree-level7','Coste',/destierro es resoluci[oó]n/i],
 ['18152:quick-hand-summon-banish','Coste',/despu[eé]s de Invocaci[oó]n/i],
 ['12950:discard-negate-deck-operation','Coste',/Descartar Ash/i],
 ['14740:shifter-hand-send','Guarda física',/GY propio vac[ií]o/i],
 ['17815:main-revive-kashtira','Guarda física',/no Xyz/i],
 ['18203:target-summon-different-attribute','Guarda física',/Atributo diferente/i],
 ['15756:pot-banish-excavate','Coste',/3 o 6.*Extra/i],
 ['13631:impermanence-set-column','Guarda física',/Set|Colocada/i],
 ['17831:preparations-trap-hand-banish','Guarda física',/YA boca arriba/i],
 ['17800:shangri-zone-block','Objetivo y selección',/SIN USAR/i],
 ['18191:arise-quick-detach-three','Coste',/Desacoplar 3/i],
 ['15524:zeus-quick-send-all','Resolución y estado posterior',/Enviar todas las dem[aá]s/i],
 ['13974:dark-armed-alt-xyz','Guarda física',/Exactamente 5/i],
 ['16386:baronne-negate-activation','Límite / cadena',/una vez mientras/i],
 ['17804:donner-tribute-revive-furhire','Coste',/Sacrificar 1/i],
 ['15741:goddess-link-opponent-material','Guarda física',/uno controlado por rival/i],
 ['15366:fossil-knight-fusion-procedure','Restricciones y recursos',/Fossil Fusion/i],
 ['15882:fossil-wagon-fusion-procedure','Restricciones y recursos',/Fossil Fusion/i],
 ['13896:pankratops-quick-tribute-destroy','Coste',/Sacrificar/i],
 ['14741:nibiru-five-opponent-summons','Guarda física',/cinco invocaciones/i],
 ['13587:ghost-belle-discard-negate-graveyard','Coste',/Descartar/i],
 ['14400:goliath-machine-xyz-protection','Actor / zona',/xyz_materials/i]
];
function inspect(pkgFile,mdFile,srcFile){
 A.equal(path.resolve(pkgFile),path.join(DIR,'datos/stationx-deck.json'));
 A.equal(path.resolve(mdFile),path.join(DIR,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'));
 A(path.resolve(srcFile).includes('/_platform_source/')&&srcFile.endsWith('/20261117-folder-delivery-v40/665.json'));
 const p=JSON.parse(fs.readFileSync(pkgFile,'utf8')),md=fs.readFileSync(mdFile,'utf8'),src=JSON.parse(fs.readFileSync(srcFile,'utf8'));
 A.equal(p.deck_id,665);A.equal(src.deck_id,665);A.equal(p.record.cards.length,38);A.equal(p.inventory.length,44);
 A(!p.record.calculator?.rules?.length,'NO_UNAUTHORIZED_ENGINE_CLAIM');
 const gate=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:p,stageId:'A05',authorizedSideOmissionForA05:true});
 A(gate.eligible&&gate.a05SideWaiverApplied,'A05_USER_SCOPED_PERMISSION');
 A.deepEqual(gate.counts,{main:42,extra:15,side:0,reserve:19});
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:p,stageId:'A06',authorizedSideOmissionForA05:true}).eligible,'A06_NOT_GRANTED');
 const cards=new Map(p.record.cards.map(c=>[c.cid,c]));A.equal(cards.size,38);
 const all=md.slice(md.indexOf('## APARTADO_05 —'));
 A(all.includes('### A05.1 —')&&all.includes('### A05.2 —')&&all.includes('### A05.3 —')&&all.includes('### A05.4 —'));
 const profiles=all.slice(all.indexOf('### A05.1 —'),all.indexOf('### A05.2 —')).split('\n').filter(x=>/^\| \d{4,5} \|/.test(x));
 A.equal(profiles.length,38,'A05_T1_INCOMPLETE');
 for(const c of cards.values()){
  const row=profiles.find(x=>x.startsWith('| '+c.cid+' | '));
  A(row&&row.includes(c.name)&&row.includes('imagenes/tcg/'+c.cid+'.jpg')&&row.includes('cid='+c.cid+'&'),'MISSING_PROFILE_'+c.cid);
  for(const slot of c.slots)A(row.includes('#'+slot.card_id+' ×'+slot.quantity),'MISSING_NATIVE_SLOT_'+c.cid);
 }
 const middle=all.slice(all.indexOf('### A05.2 —'),all.indexOf('<!-- A05_EFFECTS_END -->'));
 const headings=[...middle.matchAll(/^#### (\d+)\. \x60(665:a05:(\d+):([a-z0-9-]+))\x60 — CID (\d+) \(([A-Z]+)\)$/gm)];
 A.equal(headings.length,90,'A05_EFFECT_COUNT');
 const fields=new Map(),cnt={},kinds={},seen=new Set(),tick=String.fromCharCode(96);
 for(let i=0;i<headings.length;i++){
  const h=headings[i],id=h[2],cid=Number(h[3]),kind=h[6];
  A.equal(Number(h[1]),i+1);A.equal(Number(h[5]),cid);
  A(cards.has(cid)&&Object.hasOwn(KINDS,kind)&&!seen.has(id),'A05_BAD_EFFECT_ID_'+id);
  seen.add(id);cnt[cid]=(cnt[cid]||0)+1;kinds[kind]=(kinds[kind]||0)+1;
  const block=middle.slice(h.index+h[0].length,i+1<headings.length?headings[i+1].index:middle.length);
  const values={};for(const field of FIELDS){
   const row=block.split('\n').find(x=>x.startsWith('- **'+field+':** '));
   A(row,'A05_MISSING_FIELD_'+field+'_'+id);values[field]=row.slice(('- **'+field+':** ').length);
   A(values[field].length>7,'A05_EMPTY_FIELD_'+field+'_'+id);
  }
  A(values['Fuente oficial'].includes('cid='+cid+'&ope=2&request_locale=en'),'A05_WRONG_SOURCE_'+id);
  fields.set(id,values);
  const suffix=String(i+1).padStart(3,'0');
  for(const caseId of ['P'+suffix,...['C','Z','W','R','U','N'].map(n=>'N'+suffix+n)])
   A(values['Casos de papel'].includes('665:A05:'+caseId),'CASE_NOT_DECLARED_'+id);
 }
 A.deepEqual(cnt,COUNTS,'A05_PER_CID_EFFECT_COUNTS_DIFFER');
 A.deepEqual(kinds,KINDS,'A05_EFFECT_TYPES_DIFFER');
 for(const [slug,field,re] of ORACLE){
  const key='665:a05:'+slug;
  A(fields.has(key),'A05_CRITICAL_EFFECT_NOT_FOUND_'+key);
  A(re.test(fields.get(key)[field]),'A05_CRITICAL_PSCT_GUARD_'+key);
 }
 const cases=all.slice(all.indexOf('### A05.3 —'),all.indexOf('### A05.4 —')).split('\n').filter(x=>x.startsWith('| '+tick+'665:A05:'));
 A.equal(cases.length,630,'A05_T4_PAPER_CASE_COUNT');
 const byEffect=new Map(),caseIds=new Set(),caseTypes={};
 for(const row of cases){
  const cells=row.split('|').slice(1,-1).map(x=>x.trim());
  A.equal(cells.length,11,'PAPER_CASE_COLUMNS');
  const caseId=cells[0].replaceAll(tick,''),effectId=cells[1].replaceAll(tick,''),type=cells[2];
  A(!caseIds.has(caseId)&&fields.has(effectId),'PAPER_CASE_WRONG_FK_'+caseId);
  caseIds.add(caseId);byEffect.set(effectId,(byEffect.get(effectId)||0)+1);caseTypes[type]=(caseTypes[type]||0)+1;
  for(const val of cells.slice(3))A(val.length>=2,'PAPER_CASE_INCOMPLETE_'+caseId);
  const cid=Number(effectId.split(':')[2]);A(row.includes('cid='+cid+'&'),'PAPER_CASE_WRONG_OFFICIAL_CID');
 }
 A.equal(caseIds.size,630);A.equal(byEffect.size,90);
 for(const n of byEffect.values())A.equal(n,7);
 for(const kind of ['POSITIVO','CONDICION_FALSA','ZONA_INVALIDA','VENTANA_ERRONEA','RECURSO_FALTANTE','USO_AGOTADO','NEGACION_BLOQUEO'])
  A.equal(caseTypes[kind],90,'PAPER_CASE_TYPE_COUNT_'+kind);
 const links=all.slice(all.indexOf('### A05.4 —')).split('\n').filter(s=>/^\| \d{4,5} \|/.test(s));
 A.equal(links.length,38);
 for(const c of cards.values()){
  const row=links.find(x=>x.startsWith('| '+c.cid+' | '));
  A(row&&row.includes(c.name)&&row.includes('A07:665:'+c.cid),'LINKS_MISSING_'+c.cid);
 }
 const i=md.indexOf('## CONTROL_DE_TAREAS_A01_A10 —'),end=md.indexOf('\n---\n',i);
 const ledger=md.slice(i,end);
 const stages=JSON.parse(fs.readFileSync(path.join(ROOT,'02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8')).stages;
 const ordered=stages.filter(s=>s.mandatory).flatMap(s=>s.tasks.map(t=>t.task_id));
 const items=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 A.deepEqual(items.map(x=>x[2]),ordered);
 A.deepEqual(items.filter(x=>x[1]==='x').map(x=>x[2]).slice(0,16),ordered.slice(0,16));
 A(ledger.includes('20/35')&&ledger.includes('15/35'),'CHECKLIST_COUNTS');
 return {ok:true,deck_id:665,stage:'A05',completed:16,pending:19,
  identities:38,physicalSlots:44,effects:90,paperCases:630,
  independentHighRiskGuards:ORACLE.length,motorCasesExecuted:0,banlistAssessed:false,
  sideReclassified:false,physical:gate.counts};
}
if(require.main===module){
 const args=process.argv.slice(2),files=args.filter(s=>!s.startsWith('--'));
 A(args.includes('--deck-id=665')&&args.includes('--user-assigned')&&args.includes('--authorized-side-waiver')&&files.length===3);
 console.log(JSON.stringify(inspect(...files)));
}
module.exports={inspect};

'use strict';
// One explicitly assigned deck. Documentary A09 route audit, not a calculator.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),decks=path.join(root,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const stepCounts=[7,4,7,8,9,5,4,4,5,5,6,5];
function part(s,a,b){const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert(i>=0&&j>i,'SECTION_NOT_FOUND_'+a);return s.slice(i,j);}
function cells(s){return s.split('|').slice(1,-1).map(x=>x.trim());}
function tokens(s){
 const plain=s.replace(/\x60/g,'').replace(/^APERTURA:\s*/,'');
 return [...plain.matchAll(/(?:^|,)([HDEMSGB])(\d+)(?:#(\d+))?(?=,|$)/g)]
   .map(m=>({zone:m[1],cid:Number(m[2]),copy:m[3]||'1'}));
}
function audit({id,assigned,packagePath,documentPath}){
 assert(assigned===true&&id===671,'USER_ASSIGNED_DECK_671_REQUIRED');
 const pf=path.resolve(packagePath),df=path.resolve(documentPath);
 assert(pf.startsWith(decks)&&df.startsWith(decks)&&path.dirname(path.dirname(pf))===path.dirname(df),'DECK_SCOPE_MISMATCH');
 const pkg=JSON.parse(fs.readFileSync(pf,'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');assert.equal(pkg.deck_id,id);assert.equal(pkg.record.deck_id,id);
 const cards=new Map(),count={main:0,extra:0,side:0,reserve:0};
 for(const card of pkg.record.cards){
  assert(!cards.has(card.cid),'DUPLICATE_CARD_CID');cards.set(card.cid,card);
  for(const z of card.slots){assert(Object.hasOwn(count,z.section),'BAD_SECTION');count[z.section]+=z.quantity;}
 }
 assert.equal(cards.size,39);assert.deepEqual(count,{main:41,extra:15,side:14,reserve:0});
 const md=fs.readFileSync(df,'utf8');
 const registry=part(md,'### A05.6 —','### A05.7 —');
 const effects=new Set([...registry.matchAll(/\x60(671:a05:\d+:[a-z0-9-]+)\x60 · \*\*[A-Z_]+\*\*/g)].map(m=>m[1]));
 assert.equal(effects.size,94,'MISSING_NINETY_FOUR_EFFECTS');
 const a09=part(md,'## APARTADO_09 —','## APARTADO_10 —');
 const openings=part(a09,'### A09.10 —','### A09.11 —');
 const trace=part(a09,'### A09.11 —','### A09.12 —');
 const cases=part(a09,'### A09.12 —','### A09.13 —');
 const gates=part(a09,'### A09.13 —','### A09.14 —');
 const openRows=[...openings.matchAll(/^\| \x60MEMD-(C\d{2})\x60 \|([^\n]+)$/gm)];
 const stepRows=[...trace.matchAll(/^\| \x60(671:A09:(C\d{2}):S(\d{2}))\x60 \|([^\n]+)$/gm)];
 const caseRows=[...cases.matchAll(/^\| \x60(C\d{2})\x60 · \x60(671:A09:C\d{2}:S\d{2})\x60 \|([^\n]+)$/gm)];
 const gateRows=[...gates.matchAll(/^\| \x60(671:A09:C\d{2}:S\d{2})\x60 \|([^\n]+)$/gm)];
 assert.equal(openRows.length,12,'ROUTE_COUNT_NOT_12');
 assert.equal(stepRows.length,69,'STEP_COUNT_NOT_69');
 assert.equal(caseRows.length,12,'INTERRUPTION_COUNT_NOT_12');
 assert.equal(gateRows.length,69,'COST_GATE_COUNT_NOT_69');
 const routeData=new Map();let knownCidChecks=0;
 for(let i=0;i<12;i++){
  const id='C'+String(i+1).padStart(2,'0'),m=openRows[i],v=cells(m[0]);
  assert.equal(m[1],id,'ROUTE_ORDER_MISMATCH');assert.equal(v.length,9,'ROUTE_COLUMNS');
  assert.equal(Number(v[6]),stepCounts[i],'ROUTE_MACROSTEP_COUNT_'+id);
  assert(/DOCUMENTADA_SIN_CAMPO_ESPACIAL|FIN_TURNO_Y_RESPUESTA_SEPARADOS/.test(v[8]),
   'FALSE_SPATIAL_CERTIFICATION_'+id);
  for(const [value,zoneRequirement] of [[v[2],'main'],[v[3],null],[v[4],null],[v[5],null]]){
   for(const t of tokens(value)){
    const card=cards.get(t.cid);assert(card,'UNLOADED_CID_'+id+'_'+t.cid);knownCidChecks++;
    if(t.zone==='D')assert(card.slots.some(x=>x.section==='main'),'INVALID_MAIN_MATERIAL_'+t.cid);
    if(t.zone==='E')assert(card.slots.some(x=>x.section==='extra'),'INVALID_EXTRA_MATERIAL_'+t.cid);
    if(t.zone==='H')assert(card.slots.some(x=>x.section==='main'),'SIDE_AS_OPENING_HAND_'+t.cid);
   }
  }
  const final=[...tokens(v[4]),...tokens(v[5])],copies=new Set(),nByCid=new Map();
  for(const t of final){
   const copy=t.cid+'#'+t.copy;
   assert(!copies.has(copy),'CARD_IN_TWO_FINAL_ZONES_'+id+'_'+copy);
   copies.add(copy);nByCid.set(t.cid,(nByCid.get(t.cid)||0)+1);
  }
  for(const [cid,n] of nByCid)assert(n<=cards.get(cid).slots.reduce((sum,s)=>sum+s.quantity,0),
   'FINAL_COPIES_EXCEED_INVENTORY_'+id+'_'+cid);
  const current=a09.indexOf('### MEMD-'+id+' —');
  assert(current>=0,'ORIGINAL_ROUTE_MISSING_'+id);
  const next=i===11?a09.indexOf('### A09.0 —',current+5):
   a09.indexOf('### MEMD-C'+String(i+2).padStart(2,'0')+' —',current+5);
  assert(next>current,'ORIGINAL_ROUTE_UNBOUNDED_'+id);
  const originalSteps=a09.slice(current,next).split('\n').filter(x=>/^\d+\.\s/.test(x));
  assert.equal(originalSteps.length,stepCounts[i],'ORIGINAL_STEP_COUNT_CHANGED_'+id);
  routeData.set(id,{hand:v[2],final:v[4],steps:originalSteps});
 }
 let linkedEffectRefs=0,combinedActions=0,stateOnly=0;
 const seen=new Set(),last=new Map();
 for(let i=0;i<stepRows.length;i++){
  const m=stepRows[i],id=m[1],route=m[2],num=Number(m[3]),v=cells(m[0]);
  assert.equal(v.length,8,'STEP_COLUMNS_'+id);
  const original=routeData.get(route);assert(original,'UNKNOWN_ROUTE_'+route);
  assert(num>0&&num<=original.steps.length,'OUT_OF_RANGE_STEP_'+id);
  assert(!seen.has(id),'DUPLICATED_STEP_'+id);seen.add(id);
  if(num===1)assert(v[3].includes('APERTURA:')&&v[3].includes(original.hand),'STEP_OPENING_MISMATCH_'+id);
  else assert.equal(v[3].replace(/\x60/g,''),last.get(route),'STEP_BEFORE_NOT_PREVIOUS_AFTER_'+id);
  const source=original.steps[num-1].replace(/^\d+\.\s*/,'').replaceAll('|','/').slice(0,240);
  assert.equal(v[4],source.trimEnd(),'CANONICAL_PROSE_DRIFT_'+id);
  const links=[...v[1].matchAll(/\x60(671:a05:\d+:[a-z0-9-]+)\x60/g)].map(x=>x[1]);
  const only=v[1].includes('STATE_ONLY');
  assert(links.length>0||only,'STEP_HAS_NO_EFFECT_'+id);
  assert(!(links.length>0&&only),'STATE_ONLY_WITH_EFFECT_'+id);
  for(const e of links){assert(effects.has(e),'UNREGISTERED_EFFECT_'+id+'_'+e);linkedEffectRefs++;}
  if(only)stateOnly++;
  if(links.length>1){combinedActions++;assert(v[6].includes('ACCIONES_SECUENCIALES'),'MULTI_ACTIONS_FUSED_TO_ONE_CHAIN_'+id);}
  const snapshot=tokens(v[5]),uni=new Set();
  assert(v[5].startsWith('\x60')&&v[5].endsWith('\x60'),'MISSING_AFTER_SNAPSHOT_'+id);
  for(const t of snapshot){
   assert(cards.has(t.cid),'AFTER_HAS_FOREIGN_CID_'+id);
   const key=t.cid+'#'+t.copy;assert(!uni.has(key),'DUPLICATED_PHYSICAL_UID_IN_STEP_'+id);uni.add(key);
  }
  last.set(route,v[5].replace(/\x60/g,''));
  assert(v[7].includes('CONDICIONAL_PENDIENTE_PSCT_POR_PASO'),'STEP_FALSIFIED_AS_VERIFIED_'+id);
  const gate=gateRows[i],g=cells(gate[0]);
  assert.equal(gate[1],id,'COST_WINDOW_GATE_OUT_OF_ORDER_'+id);assert.equal(g.length,8,'BAD_GATE_FIELDS_'+id);
  for(let n=2;n<=6;n++)assert(g[n].replace(/\x60/g,'').length>3,'EMPTY_COST_OR_WINDOW_'+id);
 }
 for(let i=0;i<12;i++){
  const m=caseRows[i],route='C'+String(i+1).padStart(2,'0'),v=cells(m[0]);
  assert.equal(m[1],route,'CASE_ROUTE_OUT_OF_ORDER');
  assert.equal(v.length,6,'CASE_COLUMNS_'+route);
  const sid=m[2];assert(seen.has(sid),'INTERRUPTION_UNKNOWN_STEP_'+route);
  const ef=[...v[1].matchAll(/\x60(671:a05:\d+:[a-z0-9-]+)\x60/g)];
  assert(ef.length===1&&effects.has(ef[0][1]),'INTERRUPTION_UNKNOWN_EFFECT_'+route);
  assert(v[1].includes('cid='+ef[0][1].split(':')[2]),'INTERRUPTION_MISSING_OFFICIAL_CID_'+route);
  assert(v[2].length>25&&v[3].length>25&&v[4].length>45&&v[5].includes('CONDICIONAL'),'INTERRUPTION_WITHOUT_STATE_'+route);
 }
 for(const [route,data] of routeData){
  const lastRow=route==='C08'?stepRows.find(x=>x[1]==='671:A09:C08:S03'):stepRows.find(x=>x[1]==='671:A09:'+route+':S'+String(data.steps.length).padStart(2,'0'));
  const after=tokens(cells(lastRow[0])[5]);
  for(const t of tokens(data.final))assert(t.zone==='M'&&after.some(x=>x.zone==='M'&&x.cid===t.cid),
   'FINAL_BOARD_NOT_IN_LAST_CHECKPOINT_'+route+'_'+t.cid);
 }
 return {ok:true,deck_id:id,format:pkg.record.format,inventory:count,loadedCids:cards.size,
  routes:routeData.size,steps:seen.size,linkedEffectReferences:linkedEffectRefs,
  stepsWithSequentialActions:combinedActions,stateOnlySteps:stateOnly,
  knownRouteCardChecks:knownCidChecks,positiveNegativeInterruptionPairs:caseRows.length,
  spatialEndboardsCertified:0,replaysExecuted:0,independentFullPSCTCertified:0,
  tournamentLegal:false};
}
if(require.main===module){
 const args=process.argv.slice(2),files=args.filter(x=>!x.startsWith('--'));assert.equal(files.length,2);
 console.log(JSON.stringify(audit({id:Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),
  assigned:args.includes('--user-assigned'),packagePath:files[0],documentPath:files[1]}),null,2));
}
module.exports=Object.freeze({audit});
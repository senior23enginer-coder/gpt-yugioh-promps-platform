'use strict';
// Audits documentary A06 for ONE explicitly assigned, physically loaded deck.
// Structural traceability is not independent legal/playability certification.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const deckRoot=path.join(root,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
function section(doc,heading) {
 const start=doc.indexOf(heading);
 assert(start>=0,'A06_SECTION_NOT_FOUND_'+heading);
 const end=doc.indexOf('\n### ',start+heading.length);
 assert(end>start,'A06_SECTION_BOUNDARY_NOT_FOUND_'+heading);
 return doc.slice(start,end);
}
function unique(xs,msg){assert.equal(xs.length,new Set(xs).size,msg);}
function audit({deckId,userAssigned,packagePath,curatedPath}){
 assert(userAssigned===true&&Number.isInteger(deckId)&&deckId>0,'A06_EXPLICIT_ASSIGNMENT_REQUIRED');
 const pf=path.resolve(packagePath),cf=path.resolve(curatedPath);
 assert(pf.startsWith(deckRoot)&&cf.startsWith(deckRoot),'A06_DECK_SCOPE_VIOLATION');
 assert(path.dirname(path.dirname(pf))===path.dirname(cf),'A06_CROSS_DECK_SCOPE');
 const pkg=JSON.parse(fs.readFileSync(pf,'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');
 assert.equal(pkg.deck_id,deckId);assert.equal(pkg.record.deck_id,deckId);
 const cids=pkg.record.cards.map(x=>x.cid),known=new Set(cids);
 unique(cids,'A06_DUPLICATE_INVENTORY_CID');
 const sums={main:0,extra:0,side:0,reserve:0};
 for(const card of pkg.record.cards)for(const slot of card.slots){
  assert(Object.hasOwn(sums,slot.section),'A06_INVALID_DECK_ZONE');
  assert(Number.isInteger(slot.quantity)&&slot.quantity>0,'A06_INVALID_QUANTITY');
  sums[slot.section]+=slot.quantity;
 }
 for(const zone of ['main','extra','side'])assert(sums[zone]>0,'A06_MISSING_REQUIRED_ZONE_'+zone);
 const text=fs.readFileSync(cf,'utf8');
 const a05=section(text,'### A05.6 —');
 const a06Card=section(text,'### A06.2 —');
 const a06Rel=section(text,'### A06.3 —');
 const a06Cross=section(text,'### A06.7 —');
 const a06Plan=section(text,'### A06.8 —');
 const a06Cases=section(text,'### A06.9 —');
 const registry=new Map();
 for(const m of a05.matchAll(/\x60(\d+:a05:(\d+):[a-z0-9-]+)\x60 · \*\*([A-Z_]+)\*\*/g)){
  assert(m[1].startsWith(deckId+':a05:')&&known.has(Number(m[2])),'A06_FOREIGN_EFFECT_'+m[1]);
  assert(!registry.has(m[1]),'A06_DUPLICATE_A05_'+m[1]);
  registry.set(m[1],Number(m[2]));
 }
 const entries=[...a06Card.matchAll(/^\| MEMD-(\d{3}) · \[(\d+)\]\(/gm)];
 unique(entries.map(x=>x[1]),'A06_DUPLICATE_MEMD_ID');
 unique(entries.map(x=>x[2]),'A06_DUPLICATE_MEMD_CID');
 assert.equal(entries.length,known.size,'A06_NOT_ALL_IDENTITIES_AUDITED');
 assert(entries.every(x=>known.has(Number(x[2]))),'A06_FOREIGN_CARD_ROW');
 const base=[...a06Rel.matchAll(/^\| \*\*REL-(M\d{2})\*\* \|([^\n]+)$/gm)];
 const details=[...a06Cross.matchAll(/^\| REL-(M\d{2}) \|([^\n]+)$/gm)];
 const cases=[...a06Cases.matchAll(/^\| \x60(\d+:A06:(M\d{2}):P)\x60 \/ \x60(\d+:A06:(M\d{2}):N)\x60 \|([^\n]+)$/gm)];
 for(const a of [base,details,cases])assert.equal(a.length,40,'A06_REQUIRED_FORTY_RELATIONS');
 unique(base.map(x=>x[1]),'A06_BASE_DUPLICATE_REL');
 unique(details.map(x=>x[1]),'A06_DETAIL_DUPLICATE_REL');
 unique(cases.map(x=>x[2]),'A06_CASE_DUPLICATE_REL');
 assert.deepEqual(base.map(x=>x[1]),details.map(x=>x[1]),'A06_CROSSWALK_MISMATCH');
 assert.deepEqual(base.map(x=>x[1]),cases.map(x=>x[2]),'A06_CASE_ROUTE_MISMATCH');
 let sourcedEffects=0;
 for(let i=0;i<40;i++){
  const id=base[i][1],a=base[i][0],d=details[i][0],p=cases[i][0];
  const pieces=a.split('|').map(x=>x.trim());
  assert(pieces.length>=6&&pieces[3].length>15&&pieces[4].length>8,
    'A06_REL_MISSING_GUARD_OR_FAILURE_'+id);
  const fx=[...d.matchAll(/\x60(\d+:a05:(\d+):[a-z0-9-]+)\x60/g)];
  assert(fx.length>0,'A06_REL_HAS_NO_EFFECT_'+id);
  unique(fx.map(x=>x[1]),'A06_DUPLICATE_REL_EFFECT_'+id);
  for(const e of fx){
   assert(registry.get(e[1])===Number(e[2]),'A06_REL_FOREIGN_EFFECT_'+e[1]);
   assert(d.includes('cid='+e[2]),'A06_MISSING_OFFICIAL_SOURCE_'+e[1]);
   sourcedEffects++;
  }
  assert(p.includes('CONDICIONAL_SIN_ESTADO_TIPADO'),'A06_FALSE_CASE_CERTIFICATION_'+id);
  assert(p.includes(id),'A06_MISSING_RELATION_IN_CASE_'+id);
 }
 const examples=[...a06Cases.matchAll(/^#### (\d+:A06:S\d{2}) —/gm)];
 assert.equal(examples.length,16,'A06_EXPECT_SIXTEEN_PHYSICAL_CASE_EXAMPLES');
 unique(examples.map(x=>x[1]),'A06_DUPLICATE_SCENARIO');
 for(let i=0;i<examples.length;i++){
   const begin=examples[i].index+examples[i][0].length;
   const end=i+1<examples.length?examples[i+1].index:a06Cases.length;
   const content=a06Cases.slice(begin,end);
   for(const field of ['state_before','action','expected_costs','expected_events/state_after',
     'Contraejemplo','CONDICIONAL_PENDIENTE_DE_VALIDACION'])
    assert(content.includes(field),'A06_SCENARIO_FIELD_MISSING_'+examples[i][1]+'_'+field);
 }
 for(const sectionName of ['A06.8a','A06.8b','A06.8c','A06.8d'])
  assert(a06Plan.includes(sectionName),'A06_MISSING_TACTICAL_PLAN_'+sectionName);
 assert(a06Cross.includes('no existe el conflicto simultáneo Lancea'),'A06_LANCEA_TIMING_NOT_CORRECTED');
 assert(a06Cross.includes('durante la resolución'),'A06_GORDIAN_COST_TIME_NOT_CORRECTED');
 return {ok:true,deck_id:deckId,format:pkg.record.format,counts:sums,
  identities:known.size,inventoryRows:entries.length,
  relations:base.length,relationsWithRegisteredEffects:details.length,
  attributedEffectLinks:sourcedEffects,paperPositiveCandidates:cases.length,
  paperNegativeCandidates:cases.length,conditionalPhysicalScenarios:examples.length,
  independentEffectLegalityVerified:false,physicalTransitionsVerified:0,
  a06SemanticTasksCertified:false,calculatorExecuted:false};
}
if(require.main===module){
 const args=process.argv.slice(2),id=Number(args.find(a=>a.startsWith('--deck-id='))?.split('=')[1]);
 const files=args.filter(a=>!a.startsWith('--'));
 assert.equal(files.length,2,'A06_EXPECT_TWO_FILES');
 console.log(JSON.stringify(audit({deckId:id,userAssigned:args.includes('--user-assigned'),
  packagePath:files[0],curatedPath:files[1]})));
}
module.exports=Object.freeze({audit});
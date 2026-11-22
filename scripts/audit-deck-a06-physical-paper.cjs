'use strict';
// Generic physical paper-state audit for one expressly assigned loaded deck.
// Tests copy conservation and attribution, NOT semantic legality or calculator.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const ZONES=new Set(['H','D','G','M','S','E','B','X','OM','OG','OS','OB','OH']);
function slice(doc,a,b){
 const start=doc.indexOf(a),end=doc.indexOf(b,start+a.length);
 assert(start>=0&&end>start,'PAPER_SECTION_NOT_FOUND');
 return doc.slice(start,end);
}
function token(raw){
 const m=raw.trim().match(/^(H|D|G|M|S|E|B|X|OM|OG|OS|OB|OH):(\d+(?:#[a-z]+)?|o\d+)$/);
 assert(m&&ZONES.has(m[1]),'INVALID_TOKEN_'+raw);
 const zone=m[1],op=zone.startsWith('O'),[cid,serial]=m[2].split('#');
 if(op)assert(/^o\d+$/.test(cid),'OPPONENT_CARD_ID_INFERRED');
 return {uid:op?cid:cid+'#'+(serial||'1'),cid:op?null:Number(cid),
  owner:op?'opponent':'self',controller:op?'opponent':'self',zone,
  known:!op};
}
function parsePlaces(s){
 const arr=s.split(',').map(token);
 assert.equal(new Set(arr.map(x=>x.uid)).size,arr.length,'DUPLICATED_PHYSICAL_UID');
 return arr;
}
function parseMoves(s,kind){
 if(s==='-')return [];
 return s.split(';').map(pair=>{
  const chunks=pair.split('>');
  assert.equal(chunks.length,2,'INVALID_TRANSFER_'+pair);
  const a=token(chunks[0]),b=token(chunks[1]);
  assert.equal(a.uid,b.uid,'COPY_IDENTITY_CHANGED');
  assert.equal(a.owner,b.owner,'COPY_OWNER_CHANGED');
  return {uid:a.uid,cid:a.cid,from:a.zone,to:b.zone,kind};
 });
}
function apply(known,move,id){
 const obj=known.find(x=>x.uid===move.uid);
 assert(obj&&obj.zone===move.from,'MOVE_FROM_WRONG_ZONE_'+id+'_'+move.uid);
 obj.zone=move.to;
}
function negative(before,mutation,phase,event){
 const cards=before.map(x=>({...x}));
 if(mutation.startsWith('drop:')){
  const item=token(mutation.slice(5));
  const at=cards.findIndex(x=>x.uid===item.uid&&x.zone===item.zone);
  assert(at>=0,'NEGATIVE_NOT_PRESENT_'+mutation);
  cards.splice(at,1);return {cards,phase,event,category:'absent_resource'};
 }
 if(mutation.startsWith('phase:'))return {cards,phase:mutation.slice(6),
  event,category:'wrong_phase'};
 if(mutation==='event:none')return {cards,phase,event:'required_event_missing',
  category:'missing_event'};
 assert.fail('UNSUPPORTED_NEGATIVE_'+mutation);
}
function audit({deckId,userAssigned,packageFile,markdownFile}){
 assert(userAssigned===true&&Number.isInteger(deckId)&&deckId>0,
  'EXPLICIT_DECK_ASSIGNMENT_REQUIRED');
 const pf=path.resolve(packageFile),mf=path.resolve(markdownFile);
 assert(pf.startsWith(DECKS)&&mf.startsWith(DECKS),'FOREIGN_DECK_PATH');
 assert(path.dirname(path.dirname(pf))===path.dirname(mf),'CROSS_DECK_SCOPE');
 const pkg=JSON.parse(fs.readFileSync(pf,'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');
 assert.equal(pkg.deck_id,deckId);assert.equal(pkg.record.deck_id,deckId);
 const inventory=new Map(),quantities={main:0,extra:0,side:0,reserve:0};
 for(const c of pkg.record.cards){
  assert(!inventory.has(c.cid),'DUPLICATED_INVENTORY_CID');
  inventory.set(c.cid,c);
  for(const s of c.slots){assert(Object.hasOwn(quantities,s.section));
    quantities[s.section]+=s.quantity;}
 }
 for(const zone of ['main','extra','side'])assert(quantities[zone]>0,'MISSING_'+zone);
 const doc=fs.readFileSync(mf,'utf8');
 const source=slice(doc,'### A06.12 —','## APARTADO_07 —');
 const block=source.match(/~~~text\n([\s\S]*?)\n~~~/);
 assert(block,'NO_STRUCTURED_CASE_MATRIX');
 const eventSource=slice(doc,'### A06.14 —','## APARTADO_07 —');
 const eventBlock=eventSource.match(/~~~text\n([\s\S]*?)\n~~~/);
 assert(eventBlock,'NO_PHYSICAL_PAPER_SUPPLEMENT');
 const meta=new Map();
 for(const line of eventBlock[1].trim().split('\n')){
   const [id,...extras]=line.split('|');
   assert(/^M\d{2}$/.test(id)&&extras.length===1&&!meta.has(id),'INVALID_EVENT_SUPPLEMENT_'+id);
   const facts=Object.fromEntries(extras[0].split(';').map(x=>{
     const [key,value]=x.split('=');
     assert(/^[a-z0-9_]+$/.test(key)&&value!==undefined,'INVALID_EVENT_METADATA_'+id);
     return [key,value==='true'?true:(value==='false'?false:(/^\d+$/.test(value)?Number(value):value))];
   }));
   assert(Object.keys(facts).length>0,'EMPTY_EVENT_METADATA_'+id);
   meta.set(id,facts);
 }
 const rows=block[1].trim().split('\n').map(x=>x.split('|'));
 assert.equal(rows.length,40,'A06_REQUIRED_RELATIONSHIPS');
 const details=slice(doc,'### A06.7 —','### A06.8 —');
 const fx=new Map([...details.matchAll(/^\| REL-(M\d{2}) \|([^\n]+)$/gm)]
  .map(m=>[m[1],[...m[2].matchAll(/\x60(\d+:a05:\d+:[a-z0-9-]+)\x60/g)].map(x=>x[1])]));
 assert.equal(fx.size,40,'MISSING_CID_EFFECT_CROSSWALK');
 const registry=slice(doc,'### A05.6 —','### A05.7 —');
 const validIds=new Set([...registry.matchAll(/\x60(\d+:a05:\d+:[a-z0-9-]+)\x60 ·/g)].map(m=>m[1]));
 const records=[];let movements=0,costs=0,side=0;
 for(let i=0;i<rows.length;i++){
  const row=rows[i];assert.equal(row.length,8,'CASE_FIELDS_'+i);
  const [id,active,phase,places,paid,applied,invalid,event]=row;
  assert.equal(id,'M'+String(i+1).padStart(2,'0'));
  assert(['self','opponent'].includes(active));
  assert(['main1','main2','start_main1','start_main2','battle','end'].includes(phase));
  assert(event.length>5,'MISSING_EVENT_'+id);
  const before=parsePlaces(places),count=new Map();
  for(const p of before){
   if(p.cid===null)continue;
   const meta=inventory.get(p.cid);
   assert(meta,'CARD_NOT_IN_LOADED_DECK_'+p.cid);
   const slots=meta.slots.map(x=>x.section);
   if(p.zone==='E')assert(slots.includes('extra'),'NO_EXTRA_COPY_'+p.cid);
   if(p.zone==='D')assert(slots.includes('main'),'NO_MAIN_DECK_COPY_'+p.cid);
   if(p.zone==='H'&&!slots.includes('main')){
    assert(slots.includes('side')&&['M39','M40'].includes(id),
      'SIDE_USED_WITHOUT_CHANGE_'+id);
    side++;
   }
   count.set(p.cid,(count.get(p.cid)||0)+1);
  }
  for(const [cid,n] of count)assert(n<=inventory.get(cid).slots.reduce((sum,s)=>sum+s.quantity,0),
   'CARD_COPIES_EXCEEDED_'+id+'_'+cid);
  const costMoves=parseMoves(paid,'activation_cost');
  const resolutionMoves=parseMoves(applied,'resolution');
  const after=before.map(p=>({...p}));
  for(const m of [...costMoves,...resolutionMoves])apply(after,m,id);
  const bad=negative(before,invalid,phase,event);
  const effects=fx.get(id);
  assert(effects&&effects.length>0&&effects.every(x=>validIds.has(x)),
   'UNKNOWN_SOURCE_EFFECT_'+id);
  movements+=costMoves.length+resolutionMoves.length;
  costs+=costMoves.length;
  records.push({
   relation:'REL-'+id,
   positive:{case_id:deckId+':A06:'+id+':P',
    state_before:{turn:active==='self'?1:2,active,phase,window:event,
      chain:[],used_effects:[],known_cards:before,unknown_cards:'not_inferred',
      spatial_verified:false},
    action:{effect_ids:effects,costs:costMoves,resolution:resolutionMoves},
    expected_legal:true,
    expected_state_after:{known_cards:after,conditional_events:meta.get(id)||{},spatial_verified:false},
    status:'CONDICIONAL'},
   negative:{case_id:deckId+':A06:'+id+':N',
    state_before:{turn:active==='self'?1:2,active,phase:bad.phase,
     window:bad.event,chain:[],used_effects:[],known_cards:bad.cards,
     unknown_cards:'not_inferred',spatial_verified:false},
    expected_legal:bad.category==='absent_resource'?null:false,
    expected_relation_available:false,
    legal_interpretation:bad.category==='absent_resource'?'RELACION_ESPECIFICA_NO_DISPONIBLE; OTRO EFECTO PODRIA SER LEGAL':'ACTIVACION_O_DISPARO_NO_DISPONIBLE',
    expected_costs:[],expected_events:[],
    expected_state_after:{known_cards:bad.cards,spatial_verified:false},
    reason:bad.category,status:'CONDICIONAL'}
  });
 }
 const ids=records.flatMap(x=>[x.positive.case_id,x.negative.case_id]);
 assert.equal(new Set(ids).size,80,'DUPLICATED_CASE_ID');
 return {ok:true,deck_id:deckId,format:pkg.record.format,counts:quantities,
  identities:inventory.size,relations:records.length,typedCases:ids.length,
  physicalZoneTransitionsChecked:movements,costTransitionsChecked:costs,
  sideOnlyCardsInLegalPostSideContext:side,
  temporalAndUnknownInformationAnnotations:meta.size,
  unknownDrawsNotInvented:meta.get('M19')?.unknown_draw_count||0,
  temporaryBanishReturnsScheduled:meta.get('M20')?.temporary_banish_until_end||0,
  negativeCasesWithoutPrematureIllegality:records.filter(x=>x.negative.expected_legal===null).length,
  negativeCasesWithInvalidTimingOrTrigger:records.filter(x=>x.negative.expected_legal===false).length,
  exactSpatialSlotsCertified:false,independentEffectSemanticsVerified:false,
  calculatorExecuted:false};
}
if(require.main===module){
 const args=process.argv.slice(2),id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const files=args.filter(x=>!x.startsWith('--'));
 assert.equal(files.length,2,'TWO_FILES_REQUIRED');
 console.log(JSON.stringify(audit({deckId:id,userAssigned:args.includes('--user-assigned'),
  packageFile:files[0],markdownFile:files[1]})));
}
module.exports=Object.freeze({audit});
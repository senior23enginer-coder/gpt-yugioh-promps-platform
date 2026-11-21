'use strict';
// Generic read-only A04 shared zone/photo routing audit for exactly one explicitly assigned deck.
// Does not validate non-spatial illustrative endboards as exact motor positions.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
function audit({deckId,explicitAssignment=false,packageFile}={}){
 assert.equal(explicitAssignment,true,'EXPLICIT_USER_ASSIGNMENT_REQUIRED');
 assert(Number.isInteger(deckId)&&deckId>0,'INVALID_USER_SELECTED_DECK_ID');
 assert(typeof packageFile==='string'&&packageFile.endsWith('/datos/stationx-deck.json'),
  'EXPLICIT_SINGLE_DECK_PACKAGE_PATH_REQUIRED');
 const resolved=path.resolve(packageFile),safeRoot=path.resolve(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
 assert(resolved.startsWith(safeRoot),'DECK_PACKAGE_MUST_RESIDE_IN_CURATED_FOLDER');
 const folder=path.dirname(path.dirname(resolved));
 const json=JSON.parse(fs.readFileSync(path.join(folder,'datos/stationx-deck.json'),'utf8'));
 const provenance=JSON.parse(fs.readFileSync(path.join(folder,'datos/A04_HD_IMAGE_PROVENANCE.json'),'utf8'));
 const html=fs.readFileSync(path.join(folder,'guias/GUIA_VISUAL_A01_A10.html'),'utf8');
 assert.equal(json.deck_id,deckId);
 assert.equal(json.record.deck_id,deckId);
 assert(typeof json.record.format==='string'&&json.record.format.length>1);
 assert.equal(provenance.deck_id,deckId);
 assert.equal(provenance.photo_count,json.record.cards.length);
 const mapped=new Map(),byCardId=new Map(),counts={main:0,extra:0,side:0,reserve:0};
 for(const card of json.record.cards){
   assert(Number.isInteger(card.cid)&&!mapped.has(card.cid),'Invalid/duplicate CID');
   assert(card.full_image.includes('/imagenes/'+card.cid+'.'),'Wrong card photo CID');
   const photo=path.join(folder,'imagenes',path.basename(card.full_image));
   assert(fs.statSync(photo).size>40000,'Missing HD image file');
   const src=provenance.images.find(p=>p.cid===card.cid);
   assert(src?.konami_id===card.cid&&['en','es'].includes(src?.source_language),'Image source CID mismatch');
   assert(src.dimensions[0]>=600&&src.dimensions[1]>=850,'Image is still small');
   mapped.set(card.cid,{card,photo,source:src});
   for(const slot of card.slots){
     assert(Number.isInteger(slot.card_id)&&!byCardId.has(slot.card_id),'Invalid native slot');
     byCardId.set(slot.card_id,{cid:card.cid,section:slot.section,quantity:slot.quantity});
     assert(Object.hasOwn(counts,slot.section),'Unknown physical section');
     counts[slot.section]+=slot.quantity;
   }
 }
 assert.equal(mapped.size,json.record.cards.length);
 assert.equal(byCardId.size,json.inventory.length);
 for(const zone of ['main','extra','side'])assert(counts[zone]>0,'MISSING_REQUIRED_'+zone);
 const declared=json.inventory.map(r=>[r.id,r.section,r.quantity].join(':')).sort();
 const actual=[...byCardId.entries()].map(([id,t])=>[id,t.section,t.quantity].join(':')).sort();
 assert.deepEqual(actual,declared,'SLOTS_AND_APPROVED_INVENTORY_MISMATCH');
 const refs=[...html.matchAll(/<img\b[^>]*\bsrc=["']\.\.\/imagenes\/(\d+)\.(png|jpg)["'][^>]*>/gi)];
 assert(refs.length>=39,'Visual HTML does not reference all deck photos');
 const htmlCids=new Set();
 for(const ref of refs){
   const cid=Number(ref[1]),card=mapped.get(cid);
   assert(card,'Visual guide references a card outside selected deck: '+cid);
   assert(card.photo.toString().toLowerCase().endsWith('.'+ref[2].toLowerCase()),
     'Visual image extension mismatch: '+cid);
   htmlCids.add(cid);
 }
 assert.equal(htmlCids.size,mapped.size,'Visual gallery omits at least one CID');
 let routeSteps=0,photos=0,layouts=0,zones=0,verifiedBoards=0;const routeIds=new Set();
 const allowed=['monster','spell','field','hand','graveyard','banished','deck','extra','opponent_objects','skill'];
 for(const route of json.record.routes){
   assert(typeof route.id==='string'&&route.id.startsWith(deckId+':A09:')&&
     !routeIds.has(route.id),'DUPLICATE_OR_FOREIGN_ROUTE_ID');
   routeIds.add(route.id);
   assert(typeof route.endboard?.spatial_verified==='boolean',
     'Spatial verification must be explicit, never inferred');
   if(route.endboard.spatial_verified)verifiedBoards++;
   assert(Array.isArray(route.steps)&&route.steps.length>0);
   for(const step of route.steps){
     routeSteps++;
     assert(Array.isArray(step.photos)&&step.photos.length>0,
       'A09 step has no linked photo: '+route.id+'/'+step.number);
     for(const p of step.photos){
       assert(mapped.has(p.cid),'Route uses foreign CID: '+route.id+'/'+p.cid);
       assert(typeof p.image==='string'&&p.image.includes('/imagenes/'+p.cid+'.'),
         'Route photo path mismatches CID');
       photos++;
     }
   }
   for(const variant of route.endboard.variants||[]){
     layouts++;
     for(const zone of allowed){
       const entries=variant[zone]||[];
       assert(Array.isArray(entries),'Invalid zone map field');
       for(const item of entries){
         assert(mapped.has(item.cid),'Illustrative zone map references foreign CID');
         assert(typeof item.image==='string'&&item.image.includes('/imagenes/'+item.cid+'.'),
           'Zone image mismatches CID');
         zones++;
       }
     }
   }
 }
 return {ok:true,deck_id:deckId,format:json.record.format,cards:mapped.size,nativeSlots:byCardId.size,
  counts,htmlImageReferences:refs.length,uniqueGuideImages:htmlCids.size,
  routes:json.record.routes.length,steps:routeSteps,stepPhotos:photos,illustrativeBoards:layouts,
  zoneMapEntries:zones,spatiallyCertifiedBoards:verifiedBoards,
  exactPositionsPendingA09A10:verifiedBoards<json.record.routes.length,deckAnalysesStarted:0};
}
if(require.main===module){
 const args=process.argv.slice(2),arg=args.find(x=>x.startsWith('--deck-id='));
 const file=args.find(x=>!x.startsWith('--'));
 const result=audit({deckId:Number(arg?.slice(10)),
   explicitAssignment:args.includes('--user-assigned'),packageFile:file});
 const expected=args.find(x=>x.startsWith('--expected='));
 if(expected){
   const values=expected.slice('--expected='.length).split(',').map(Number);
   assert.deepEqual([result.cards,result.routes,result.steps,result.stepPhotos,result.illustrativeBoards],
     values,'EXPECTED_SINGLE_DECK_VISUAL_DENOMINATORS_MISMATCH');
 }
 console.log(JSON.stringify(result));
}
module.exports=Object.freeze({audit});

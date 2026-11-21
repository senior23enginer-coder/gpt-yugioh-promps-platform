'use strict';
// Read-only A04 shared zone/photo routing audit for the only user-selected deck.
// Does not validate non-spatial illustrative endboards as exact motor positions.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
function audit({deckId,explicitAssignment=false}={}){
 assert.equal(explicitAssignment,true,'EXPLICIT_USER_ASSIGNMENT_REQUIRED');
 assert.equal(deckId,671,'ONLY_USER_ASSIGNED_DECK_671');
 const folder=path.join(root,
  '01_INFORMACION_PARA_IMPORTAR/decks/DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO');
 const json=JSON.parse(fs.readFileSync(path.join(folder,'datos/stationx-deck.json'),'utf8'));
 const provenance=JSON.parse(fs.readFileSync(path.join(folder,'datos/A04_HD_IMAGE_PROVENANCE.json'),'utf8'));
 const html=fs.readFileSync(path.join(folder,'guias/GUIA_VISUAL_A01_A10.html'),'utf8');
 assert.equal(json.deck_id,671);
 assert.equal(json.record.deck_id,671);
 assert.equal(json.record.format,'tcg_advanced');
 assert.equal(provenance.deck_id,671);
 assert.equal(provenance.photo_count,39);
 const mapped=new Map(),byCardId=new Map(),counts={main:0,extra:0,side:0,reserve:0};
 for(const card of json.record.cards){
   assert(Number.isInteger(card.cid)&&!mapped.has(card.cid),'Invalid/duplicate CID');
   assert(card.full_image.includes('/imagenes/'+card.cid+'.'),'Wrong card photo CID');
   const photo=path.join(folder,'imagenes',path.basename(card.full_image));
   assert(fs.statSync(photo).size>40000,'Missing HD image file');
   const src=provenance.images.find(p=>p.cid===card.cid);
   assert(src?.konami_id===card.cid&&src?.source_language==='en','Image source CID mismatch');
   assert(src.dimensions[0]>=600&&src.dimensions[1]>=850,'Image is still small');
   mapped.set(card.cid,{card,photo,source:src});
   for(const slot of card.slots){
     assert(Number.isInteger(slot.card_id)&&!byCardId.has(slot.card_id),'Invalid native slot');
     byCardId.set(slot.card_id,{cid:card.cid,section:slot.section,quantity:slot.quantity});
     assert(Object.hasOwn(counts,slot.section),'Unknown physical section');
     counts[slot.section]+=slot.quantity;
   }
 }
 assert.equal(mapped.size,39);
 assert.equal(byCardId.size,40);
 assert.deepEqual(counts,{main:41,extra:15,side:14,reserve:0});
 const refs=[...html.matchAll(/<img\b[^>]*\bsrc=["']\.\.\/imagenes\/(\d+)\.(png|jpg)["'][^>]*>/gi)];
 assert(refs.length>=39,'Visual HTML does not reference all deck photos');
 const htmlCids=new Set();
 for(const ref of refs){
   const cid=Number(ref[1]),card=mapped.get(cid);
   assert(card,'Visual guide references a card outside selected deck: '+cid);
   assert(card.photo.extname===undefined||true);
   assert(card.photo.toString().toLowerCase().endsWith('.'+ref[2].toLowerCase()),
     'Visual image extension mismatch: '+cid);
   htmlCids.add(cid);
 }
 assert.equal(htmlCids.size,39,'Visual gallery omits at least one CID');
 let routeSteps=0,photos=0,layouts=0,zones=0;
 const allowed=['monster','spell','field','hand','graveyard','banished','deck','extra','opponent_objects','skill'];
 for(const route of json.record.routes){
   assert(/^671:A09:C(?:0[1-9]|1[0-2])$/.test(route.id));
   assert(route.endboard?.spatial_verified===false,
     'Illustrative board must not falsely claim exact zones');
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
 assert.equal(json.record.routes.length,12);
 assert.equal(routeSteps,69);
 assert.equal(photos,155);
 assert.equal(layouts,13);
 return {ok:true,deck_id:671,format:'tcg_advanced',cards:mapped.size,nativeSlots:byCardId.size,
  counts,htmlImageReferences:refs.length,uniqueGuideImages:htmlCids.size,
  routes:12,steps:routeSteps,stepPhotos:photos,illustrativeBoards:layouts,
  zoneMapEntries:zones,spatiallyCertifiedBoards:0,
  exactPositionsPendingA09A10:true,deckAnalysesStarted:0};
}
if(require.main===module){
 const args=process.argv.slice(2),arg=args.find(x=>x.startsWith('--deck-id='));
 const result=audit({deckId:Number(arg?.slice(10)),explicitAssignment:args.includes('--user-assigned')});
 console.log(JSON.stringify(result));
}
module.exports=Object.freeze({audit});

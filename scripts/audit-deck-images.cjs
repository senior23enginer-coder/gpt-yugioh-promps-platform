'use strict';
// Generic, read-only image provenance + technical-quality audit for ONE explicitly
// assigned deck. It does not execute A01–A10, infer card effects or alter data.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const repoRoot=path.resolve(__dirname,'..');
function pngDimensions(buf){
 if(buf.length<24||buf.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||
    buf.toString('ascii',12,16)!=='IHDR')throw Error('INVALID_PNG');
 return {width:buf.readUInt32BE(16),height:buf.readUInt32BE(20)};
}
function jpegDimensions(buf){
 if(buf.length<16||buf[0]!==0xff||buf[1]!==0xd8)throw Error('INVALID_JPEG');
 let off=2;
 while(off+4<buf.length){
   if(buf[off]!==0xff){off++;continue;}
   const marker=buf[off+1];off+=2;
   if(marker===0xd9||marker===0xda)break;
   if(marker===0x01||(marker>=0xd0&&marker<=0xd7))continue;
   const length=buf.readUInt16BE(off);
   if(length<2||off+length>buf.length)throw Error('TRUNCATED_JPEG');
   if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){
     return {height:buf.readUInt16BE(off+3),width:buf.readUInt16BE(off+5)};
   }
   off+=length;
 }
 throw Error('JPEG_DIMENSIONS_NOT_FOUND');
}
function audit(packageFile,{deckId,explicitAssignment=false,minimumWidth=300,minimumHeight=420}={}){
 assert(explicitAssignment===true,'EXPLICIT_USER_ASSIGNMENT_REQUIRED');
 assert(Number.isInteger(deckId)&&deckId>0,'SELECT_EXACT_DECK_ID');
 const data=JSON.parse(fs.readFileSync(packageFile,'utf8'));
 assert.equal(data.schema,'station-x-deck-package/1');
 assert.equal(data.deck_id,deckId,'DECK_ID_MISMATCH');
 assert.equal(data.record?.deck_id,deckId,'RECORD_ID_MISMATCH');
 assert(typeof data.record.format==='string'&&data.record.format.length>1);
 assert(Array.isArray(data.record.cards)&&data.record.cards.length>0);
 const counts={main:0,extra:0,side:0,reserve:0},rows=[];
 const cids=new Set();let minWidth=Number.MAX_SAFE_INTEGER,minHeight=Number.MAX_SAFE_INTEGER;
 const bad=[];const images=[];
 for(const card of data.record.cards){
   assert(Number.isInteger(card.cid)&&card.cid>0&&!cids.has(card.cid),
     'CARD_CID_DUPLICATE_OR_INVALID');
   cids.add(card.cid);
   assert(typeof card.name==='string'&&card.name.length>1);
   assert(Array.isArray(card.sources)&&card.sources.some(u=>
     typeof u==='string'&&u.startsWith('https://www.db.yugioh-card.com/')&&
     u.includes('cid='+card.cid)),'OFFICIAL_SOURCE_CID_MISSING');
   const rel=card.full_image;
   assert(typeof rel==='string'&&rel.startsWith(data.package_root+'/imagenes/')&&
     new RegExp('/'+card.cid+'\\.(?:png|jpe?g)$','i').test(rel)&&
     !rel.includes('..')&&!path.isAbsolute(rel),'IMAGE_PATH_CID_MISMATCH');
   const file=path.resolve(repoRoot,'01_INFORMACION_PARA_IMPORTAR/decks',rel);
   assert(fs.existsSync(file),'PHOTO_NOT_LOADED_'+card.cid);
   const buf=fs.readFileSync(file);
   assert(buf.length>5000,'EMPTY_OR_PLACEHOLDER_PHOTO_'+card.cid);
   const dim=/\.png$/i.test(rel)?pngDimensions(buf):jpegDimensions(buf);
   assert(dim.width>0&&dim.height>0,'INVALID_IMAGE_DIMENSIONS');
   minWidth=Math.min(minWidth,dim.width);minHeight=Math.min(minHeight,dim.height);
   if(dim.width<minimumWidth||dim.height<minimumHeight)
     bad.push({cid:card.cid,width:dim.width,height:dim.height});
   images.push({cid:card.cid,width:dim.width,height:dim.height,bytes:buf.length});
   for(const slot of card.slots||[]){
     assert(Number.isInteger(slot.card_id)&&slot.card_id>0,'INVALID_NATIVE_ID');
     assert(Object.hasOwn(counts,slot.section),'INVALID_SECTION');
     assert(Number.isInteger(slot.quantity)&&slot.quantity>0,'INVALID_QUANTITY');
     counts[slot.section]+=slot.quantity;
     rows.push({id:slot.card_id,section:slot.section,quantity:slot.quantity});
   }
 }
 assert(new Set(rows.map(x=>x.id)).size===rows.length,'DUPLICATE_NATIVE_IDS');
 for(const section of ['main','extra','side'])assert(counts[section]>0,
   'REQUIRED_'+section.toUpperCase()+'_NOT_LOADED');
 const existing=(data.inventory||[]).map(x=>[x.id,x.section,x.quantity].join(':')).sort();
 const expected=rows.map(x=>[x.id,x.section,x.quantity].join(':')).sort();
 assert.deepEqual(existing,expected,'PACKAGE_INVENTORY_MISMATCH');
 const routePhotos=(data.record.routes||[]).flatMap(r=>(r.steps||[]).flatMap(s=>s.photos||[]));
 for(const photo of routePhotos){
   assert(cids.has(photo.cid),'ROUTE_REFERENCES_UNKNOWN_CID');
   assert(typeof photo.image==='string'&&photo.image.includes('/'+photo.cid+'.'),
     'ROUTE_PHOTO_CID_MISMATCH');
 }
 return {deck_id:deckId,format:data.record.format,identities:cids.size,photos:images.length,
   counts,routePhotos:routePhotos.length,minWidth,minHeight,
   belowMinimum:bad,images,technicalQaPassed:bad.length===0};
}
if(require.main===module){
 const args=process.argv.slice(2),file=args.find(x=>!x.startsWith('--')),
   idArg=args.find(x=>x.startsWith('--deck-id='));
 assert(file&&idArg,'Usage: --deck-id=ID --user-assigned package.json');
 const report=audit(path.resolve(file),{deckId:Number(idArg.slice(10)),
   explicitAssignment:args.includes('--user-assigned')});
 console.log(JSON.stringify({...report,images:args.includes('--details')?report.images:undefined}));
 if(!report.technicalQaPassed)process.exitCode=1;
}
module.exports=Object.freeze({audit,pngDimensions,jpegDimensions});

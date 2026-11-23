'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const ROOT=path.resolve(__dirname,'..');
const DIR=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const IMG='DECK_665_KASHTIRA_PURE/imagenes/tcg/';
const sha=bytes=>crypto.createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
function run(pkgPath,mdPath,histPath){
 const p=JSON.parse(fs.readFileSync(pkgPath,'utf8')),md=fs.readFileSync(mdPath,'utf8'),h=JSON.parse(fs.readFileSync(histPath,'utf8'));
 A.equal(p.deck_id,665);A.equal(p.record.deck_id,665);A.equal(h.deck_id,665);
 const status=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:p,stageId:'A04',authorizedSideOmissionForA04:true});
 A(status.eligible&&status.a04SideWaiverApplied);
 A.deepEqual(status.counts,{main:42,extra:15,side:0,reserve:19});
 const physical=new Map(p.record.cards.map(c=>[c.cid,c]));
 A.equal(physical.size,38);
 const tick=String.fromCharCode(96);
 const i=md.indexOf('### A04.1'),j=md.indexOf('### A04.2'),k=md.indexOf('### A04.3');
 A(i>=0&&j>i&&k>j);
 const photoRows=md.slice(i,j).split('\n').filter(line=>line.startsWith('| '+tick)&&line.includes('Konami CID '));
 const extraRows=md.slice(j,k).split('\n').filter(line=>line.startsWith('| '+tick)&&line.includes('REFERENCIA_EXTERNA_NO_INVENTARIO'));
 A.equal(photoRows.length,38);A.equal(extraRows.length,6);
 const used=new Set();
 function checkPhoto(row,cid,isPhysical){
   const m=row.match(/[a-f0-9]{40}/),d=row.match(/268 × 391 · (\d+) B/);
   A(m&&d,'PHOTO_PROVENANCE_INCOMPLETE_'+cid);
   const fp=path.join(DIR,'imagenes/tcg',cid+'.jpg');
   A(fs.existsSync(fp),'MISSING_IMAGE_'+cid);
   const data=fs.readFileSync(fp);
   A.equal(data.length,Number(d[1]));
   A.equal(sha(data),m[0],'IMAGE_GIT_HASH_CHANGED_'+cid);
   A(data.length>15000&&data[0]===255&&data[1]===216&&data.at(-2)===255&&data.at(-1)===217,'JPEG_SIGNATURE_'+cid);
   A(!used.has(cid),'REPEATED_IMAGE_'+cid);used.add(cid);
   if(isPhysical){
     const c=physical.get(cid);A(c,'CID_NOT_OWNED_'+cid);
     A(row.includes(c.name),'PHOTO_NAME_WRONG_'+cid);
     for(const slot of c.slots)A(row.includes('#'+slot.card_id+' ×'+slot.quantity),'PHOTO_SLOT_NOT_LINKED_'+cid);
     A(c.sources?.some(s=>s.includes('cid='+cid+'&')),'KONAMI_CID_NOT_LINKED_'+cid);
     A.equal(c.source_aliases?.[0],c.name);
     A.equal(c.image,IMG+cid+'.jpg');A.equal(c.full_image,c.image);
   } else {
     A(!physical.has(cid),'EXTRA_IMAGE_FALSELY_OWNED_'+cid);
     const guide=fs.readFileSync(path.join(DIR,'guias/DECK_665_670_687_TYPHON_GODDESS_GUIA_V13.md'),'utf8');
     A(guide.includes(cid+'.jpg'),'EXTERNAL_PHOTO_NOT_REFERENCED_'+cid);
   }
 }
 for(const line of photoRows)checkPhoto(line,Number(line.split(tick)[1]),true);
 for(const line of extraRows)checkPhoto(line,Number(line.split(tick)[1].replace('.jpg','')),false);
 A.equal(used.size,44);
 const gallery=fs.readdirSync(path.join(DIR,'imagenes/tcg')).filter(x=>/^\d+\.jpg$/.test(x));
 A.equal(gallery.length,44);
 for(const file of gallery)A(used.has(Number(file.replace('.jpg',''))),'UNDECLARED_IMAGE_'+file);

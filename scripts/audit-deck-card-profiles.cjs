'use strict';
// Universal A05-T1 identity/function coverage gate; does NOT certify all effects.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const {audit:photoAudit}=require('./audit-deck-images.cjs');
function audit({deckId,explicitAssignment,packageFile}={}){
 assert(explicitAssignment===true,'EXPLICIT_DECK_ASSIGNMENT_REQUIRED');
 assert(Number.isInteger(deckId)&&deckId>0,'INVALID_DECK_ID');
 assert(typeof packageFile==='string','PACKAGE_REQUIRED');
 const file=path.resolve(packageFile);
 assert(file.startsWith(path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep),
   'OUTSIDE_SINGLE_DECK_SCOPE');
 const pkg=JSON.parse(fs.readFileSync(file,'utf8'));
 assert.equal(pkg.deck_id,deckId);
 assert.equal(pkg.record?.deck_id,deckId);
 assert(Array.isArray(pkg.record.cards)&&pkg.record.cards.length>0);
 const foto=photoAudit(file,{deckId,explicitAssignment:true});
 assert(foto.technicalQaPassed,'Image quality A04 must be complete before A05');
 const ids=new Set(),cids=new Set(),bad=[],zones={main:0,extra:0,side:0,reserve:0};
 const placeholder=/consultar (?:el )?(?:plan|an[aá]lisis)|cat[aá]logo completo|pendiente de descripci[oó]n/i;
 for(const c of pkg.record.cards){
   assert(Number.isInteger(c.cid)&&!cids.has(c.cid),'DUPLICATE_OR_INVALID_CID');
   cids.add(c.cid);
   assert(Array.isArray(c.slots)&&c.slots.length,'MISSING_PHYSICAL_SLOTS');
   const source=(c.sources||[]).find(u=>u.startsWith('https://www.db.yugioh-card.com/')
     &&u.includes('cid='+c.cid));
   const role=String(c.role||'').trim(),purpose=String(c.functional?.purpose||'').trim(),
     explain=String(c.functional?.explanation||'').trim();
   if(!source||!role||!purpose||!explain||placeholder.test(role)||placeholder.test(purpose)||
      role.length<30||purpose.length<30)bad.push({cid:c.cid,name:c.name});
   for(const slot of c.slots){
     assert(Number.isInteger(slot.card_id)&&slot.card_id>0&&!ids.has(slot.card_id),
       'DUPLICATE_NATIVE_CARD_ID');ids.add(slot.card_id);
     assert(Object.hasOwn(zones,slot.section),'FOREIGN_CARD_SECTION');
     zones[slot.section]+=slot.quantity;
   }
 }
 assert.deepEqual(bad,[],'A05-T1 missing substantive function or official source');
 assert.equal(ids.size,pkg.inventory.length);
 for(const zone of ['main','extra','side'])assert(zones[zone]>0,'REQUIRED_ZONE_NOT_LOADED');
 return {ok:true,deck_id:deckId,identities:cids.size,cardSlots:ids.size,
   functionsVerified:cids.size,officialSources:cids.size,highResolutionPhotos:foto.photos,
   zones,allCardEffectsInventoried:false,semanticsChecked:false};
}
if(require.main===module){
 const args=process.argv.slice(2),idArg=args.find(x=>x.startsWith('--deck-id=')),
  file=args.find(x=>!x.startsWith('--'));
 const result=audit({deckId:Number(idArg?.slice(10)),
    explicitAssignment:args.includes('--user-assigned'),packageFile:file});
 console.log(JSON.stringify(result));
}
module.exports=Object.freeze({audit});

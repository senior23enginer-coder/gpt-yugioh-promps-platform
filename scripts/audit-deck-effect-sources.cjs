'use strict';
// Single-deck A05 metadata cross-check. Fetches official-Konami-ID-linked
// card metadata from YGOPRODeck; NEVER runs or compiles calculator effects.
// Does NOT mislabel a portable rule as exhaustive effect coverage.
const fs=require('node:fs');
const path=require('node:path');
const https=require('node:https');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function fetchJson(url){
 return new Promise((resolve,reject)=>{
  const req=https.get(url,{headers:{'User-Agent':'StationX-A05-Assigned-Deck-Audit/1.0',
    'Accept':'application/json'}},res=>{
   if(res.statusCode!==200){res.resume();return reject(Error('REMOTE_HTTP_'+res.statusCode));}
   let text='';res.setEncoding('utf8');
   res.on('data',x=>{text+=x;if(text.length>200000){req.destroy(Error('REMOTE_OVERSIZE'));}});
   res.on('end',()=>{try{resolve(JSON.parse(text));}catch(e){reject(e);}});
  });req.setTimeout(18000,()=>req.destroy(Error('REMOTE_TIMEOUT')));
  req.on('error',reject);
 });
}
async function run({deckId,explicitlyAssigned,packageFile}){
 assert.equal(explicitlyAssigned,true,'EXPLICIT_USER_DECK_ASSIGNMENT_REQUIRED');
 assert(Number.isInteger(deckId)&&deckId>0,'INVALID_DECK_ID');
 const file=path.resolve(packageFile);
 const allowed=path.resolve(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
 assert(file.startsWith(allowed)&&file.endsWith('/datos/stationx-deck.json'),
  'PACKAGE_MUST_BE_USER_SELECTED_DECK_FOLDER');
 const data=JSON.parse(fs.readFileSync(file,'utf8')),record=data.record;
 assert(data.schema==='station-x-deck-package/1'&&data.deck_id===deckId&&
  record?.deck_id===deckId,'DECK_PACKAGE_MISMATCH');
 assert(typeof record.format==='string'&&record.format.length>1);
 assert(record.cards.length>0&&record.cards.length<100,'INVALID_DECK_CARD_SET');
 const manifestFile=path.resolve(file,'../../datos/A04_HD_IMAGE_PROVENANCE.json');
 assert(fs.existsSync(manifestFile),'IMAGE_PROVENANCE_REQUIRED_BEFORE_A05');
 const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
 assert(manifest.deck_id===deckId&&manifest.photo_count===record.cards.length);
 const rules=record.calculator?.rules||[],uniqueRules=new Map(),actors=new Map();
 for(const rule of rules){
   if(!uniqueRules.has(rule.id))uniqueRules.set(rule.id,new Set());
   if(Number.isInteger(rule.actor?.cid)){
     const cid=rule.actor.cid;
     if(!actors.has(cid))actors.set(cid,new Set());
     actors.get(cid).add(rule.id);
     uniqueRules.get(rule.id).add(cid);
   }
 }
 const rows=[];
 for(const card of [...record.cards].sort((a,b)=>a.cid-b.cid)){
   const cid=card.cid;
   assert(Number.isInteger(cid)&&cid>0&&
     Array.isArray(card.sources)&&card.sources.some(s=>s.includes('db.yugioh-card.com')&&s.includes('cid='+cid)),
     'OFFICIAL_KONAMI_REFERENCE_REQUIRED_'+cid);
   const entry=manifest.images.find(x=>x.cid===cid);
   assert(entry&&entry.konami_id===cid,'PHOTO_SOURCE_KONAMI_ID_MISMATCH_'+cid);
   let response;
   for(let n=0;n<3;n++){
     try{response=await fetchJson('https://db.ygoprodeck.com/api/v7/cardinfo.php?konami_id='+cid+'&misc=yes');break;}
     catch(e){if(n===2)throw Error('CARD_METADATA_UNAVAILABLE_'+cid+': '+e.message);await sleep(250*(n+1));}
   }
   const matched=(response.data||[]).filter(c=>(c.misc_info||[]).some(x=>x.konami_id===cid));
   assert(matched.length===1,'CID_NOT_UNIQUELY_MATCHED_'+cid);
   const external=matched[0];
   assert(typeof external.desc==='string'&&external.desc.trim().length>12,'EMPTY_CARD_DESCRIPTION_'+cid);
   const type=String(external.type||''),desc=external.desc;
   assert(typeof external.name==='string'&&external.name.trim(),'MISSING_OFFICIAL_ENGLISH_NAME');
   const actorRules=[...(actors.get(cid)||[])].sort();
   const checksum=crypto.createHash('sha256').update(desc).digest('hex');
   const kind=/Spell Card/i.test(type)?'SPELL':/Trap Card/i.test(type)?'TRAP':
     /Normal Monster/i.test(type)?'NORMAL_MONSTER':
     /Fusion|Synchro|XYZ|Link|Pendulum|Effect|Tuner|Ritual/i.test(type)?'MONSTER_EFFECT_OR_PROCEDURE':'TEXT_CLASSIFICATION_PENDING';
   rows.push({cid,name:card.name,english_name:external.name,type,kind,
     sections:[...new Set(card.slots.map(s=>s.section))].sort(),card_id:card.slots.map(s=>s.card_id),
     effect_rule_ids:actorRules,existing_rule_count:actorRules.length,official_source:card.sources[0],
     secondary_metadata_source:'https://db.ygoprodeck.com/api/v7/cardinfo.php?konami_id='+cid+'&misc=yes',
     card_text_sha256:checksum,card_text_characters:desc.length,
     semantic_census_status:kind==='NORMAL_MONSTER'?'CHECK_NO_EFFECT_PROCEDURE':
       'EFFECT_CLAUSES_NOT_INDIVIDUALLY_RECONCILED',
     operator_coverage:actorRules.length?'PORTABLE_RULES_PARTIAL_NOT_EXHAUSTIVE':'NO_ACTOR_RULE_IN_PORTABLE_PACKAGE'});
   await sleep(200);
 }
 assert(rows.length===record.cards.length,'CARD_COUNT_CHANGED');
 const missed=rows.filter(x=>x.existing_rule_count===0);
 const result={schema:'station-x-a05-source-audit/1',deck_id:deckId,format:record.format,
   identities:rows.length,portable_variants:rules.length,unique_portable_rule_ids:uniqueRules.size,
   actor_covered_cids:rows.length-missed.length,without_actor_rule:missed.map(x=>x.cid),
   source:'YGOPRODeck konami_id crosscheck, official Neuron reference retained',
   no_claim_of_full_effect_coverage:true,full_effect_inventory_certified:false,entries:rows};
 return result;
}
if(require.main===module){
 const args=process.argv.slice(2),id=args.find(x=>x.startsWith('--deck-id=')),
   file=args.find(x=>!x.startsWith('--'));
 run({deckId:Number(id?.slice(10)),explicitlyAssigned:args.includes('--user-assigned'),
   packageFile:file}).then(result=>{
   console.log('A05_SOURCE_AUDIT_JSON='+JSON.stringify(result));
 }).catch(err=>{console.error(err.stack||err.message);process.exitCode=1;});
}
module.exports={run};

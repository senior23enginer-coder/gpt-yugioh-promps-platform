'use strict';
// Read-only A05 text-version comparison, one explicitly assigned deck.
// Konami is authoritative; YGOPRODeck is a secondary cross-check.
// Never saves or copies full copyrighted card text into the deck or engine.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const https=require('node:https');
const crypto=require('node:crypto');
const {sourceCard}=require('./audit-deck-official-source-text.cjs');
const root=path.resolve(__dirname,'..');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function decode(s){
 return s.replace(/&(?:#x([a-f\d]+)|#(\d+)|quot|amp|lt|gt|nbsp|rsquo|lsquo|ldquo|rdquo);/gi,(full,h,n)=>{
   if(h||n){try{return String.fromCodePoint(parseInt(h||n,h?16:10));}catch{return full;}}
   const dict={quot:'"',amp:'&',lt:'<',gt:'>',nbsp:' ',rsquo:"'",lsquo:"'",ldquo:'"',rdquo:'"'};
   return dict[full.slice(1,-1).toLowerCase()]||full;
 });
}
function normalize(s){
 return decode(s).normalize('NFKC')
  .replace(/[\r\n\t]+/g,' ')
  .replace(/[“”]/g,'"').replace(/[‘’]/g,"'")
  .replace(/\s+/g,' ').trim();
}
function digest(text){return crypto.createHash('sha256').update(text).digest('hex');}
function get(url){return new Promise((resolve,reject)=>{
 const req=https.get(url,{headers:{'User-Agent':'StationX-KONAMI-Identity-Review/1.0','Accept':'application/json'}},res=>{
  if(res.statusCode!==200){res.resume();return reject(Error('HTTP_'+res.statusCode));}
  let s='';res.setEncoding('utf8');res.on('data',c=>{s+=c;if(s.length>200000)req.destroy(Error('OVERSIZED'));});
  res.on('end',()=>{try{resolve(JSON.parse(s));}catch(e){reject(e)}});
 });req.setTimeout(15000,()=>req.destroy(Error('TIMEOUT')));req.on('error',reject);
});}
async function main(){
 const args=process.argv.slice(2),id=Number(args.find(x=>x.startsWith('--deck-id='))?.slice(10)),
  file=args.find(x=>!x.startsWith('--'));
 assert(args.includes('--user-assigned')&&Number.isInteger(id)&&id>0,
  'EXPLICIT_USER_DECK_ASSIGNMENT_REQUIRED');
 const absolute=path.resolve(file),allowed=path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
 assert(absolute.startsWith(allowed)&&absolute.endsWith('/datos/stationx-deck.json'),
  'DECK_FILE_OUTSIDE_SINGLE_ASSIGNED_SCOPE');
 const data=JSON.parse(fs.readFileSync(absolute,'utf8'));
 assert(data.deck_id===id&&data.record?.deck_id===id);
 const rows=[];
 for(const card of data.record.cards){
  const cid=card.cid;let official;
  try{official=await sourceCard(cid,{includeText:true});}
  catch(e){throw Error('KONAMI_TEXT_UNAVAILABLE_CID_'+cid+': '+e.message);}
  const url='https://db.ygoprodeck.com/api/v7/cardinfo.php?konami_id='+cid+'&misc=yes';
  let response;
  for(let t=0;t<3;t++){try{response=await get(url);break;}catch(e){if(t===2)throw Error('SECONDARY_TEXT_UNAVAILABLE_CID_'+cid+': '+e.message);await sleep((t+1)*500);}}
  const matched=(response.data||[]).filter(c=>(c.misc_info||[]).some(x=>x.konami_id===cid));
  assert(matched.length===1,'SECONDARY_CID_MISMATCH_'+cid);
  const second=matched[0];
  assert(typeof second.desc==='string'&&second.desc.length>10);
  const a=normalize(official._officialTextForComparisonOnly),b=normalize(second.desc);
  const aMinimal=a.replace(/\s+/g,''),bMinimal=b.replace(/\s+/g,'');
  rows.push({cid,name:card.name,konami_hash:digest(a),secondary_hash:digest(b),
    normalized_match:a===b,whitespace_insensitive_match:aMinimal===bMinimal,
    official_length:a.length,secondary_length:b.length,
    substantive_text_mismatch:aMinimal!==bMinimal});
  await sleep(260);
 }
 const differing=rows.filter(x=>x.substantive_text_mismatch);
 console.log('A05_TEXT_COMPARE='+JSON.stringify({deck_id:id,identities:rows.length,
   normalized_matches:rows.filter(x=>x.normalized_match).length,
   whitespace_insensitive_matches:rows.filter(x=>x.whitespace_insensitive_match).length,
   substantive_mismatch_candidates:differing.map(x=>({cid:x.cid,name:x.name,
      official_length:x.official_length,secondary_length:x.secondary_length})),
   secondary_differences_are_not_assumed_errata:true,
   official_neuron_is_authoritative:true,no_card_text_copied:true,
   full_card_effect_semantics_certified:false,deckAnalysesExecuted:0}));
}
main().catch(e=>{console.error(e.stack||e.message);process.exitCode=1;});

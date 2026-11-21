'use strict';
// Audits official Konami Neuron HTML for the explicitly assigned physical deck.
// No external card text is copied into the deck. Only hashes/effect extraction
// diagnostics are emitted. A05-T2 remains pending until all clauses are reviewed.
const https=require('node:https');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const sleep=t=>new Promise(done=>setTimeout(done,t));
const root=path.resolve(__dirname,'..');
function getText(url){
 return new Promise((resolve,reject)=>{
   const req=https.get(url,{headers:{'User-Agent':'StationX-OfficialCardSourceAudit/1.0',
     'Accept':'text/html'}},r=>{
     if(r.statusCode!==200){r.resume();return reject(Error('HTTP_'+r.statusCode));}
     let s='';r.setEncoding('utf8');r.on('data',c=>{s+=c;if(s.length>700000)req.destroy(Error('HTML_LIMIT'));});
     r.on('end',()=>resolve(s));
   });req.setTimeout(18000,()=>req.destroy(Error('TIMEOUT')));
   req.on('error',reject);
 });
}
async function sourceCard(cid,{probe=false}={}){
 const url='https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid='+cid+'&ope=2&request_locale=en';
 let html;for(let n=0;n<3;n++){try{html=await getText(url);break;}catch(e){if(n===2)throw e;await sleep(500*(n+1));}}
 const patterns=['item_box_text','text_linebreak','Card Text'];
 if(probe)return {cid,patterns:patterns.map(term=>{const i=html.toLowerCase().indexOf(term.toLowerCase());
  return {term,index:i,context:i>=0?html.slice(Math.max(0,i-250),i+750):null};}),
  size:html.length};
 // First, match the text_linebreak inside the *main card's* CardText area.
 // Related-card listings include additional card_text blocks and must never
 // be confused with the card whose CID was explicitly requested.
 const main=html.indexOf('<div class="item_box_text">');
 assert(main>=0,'MAIN_KONAMI_CARD_TEXT_PANEL_MISSING_'+cid);
 const segment=html.slice(main,main+12000);
 const textMatch=segment.match(/<div\s+class=["']text_linebreak["']\s*>([\s\S]*?)<\/div>/i);
 const raw=textMatch?.[1]||null;
 assert(raw!==null,'NO_OFFICIAL_CARD_TEXT_NODE_'+cid);
 // Normalize HTML only enough to fingerprint its content. Do not paraphrase
 // automatically: the review must distinguish text clauses and conditions.
 const plain=raw.replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'')
  .replace(/&quot;/g,'"').replace(/&amp;/g,'&')
  .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ')
  .replace(/[ \t]+/g,' ').trim();
 assert(plain.length>10,'EMPTY_OFFICIAL_CARD_TEXT_'+cid);
 return {cid,officialUrl:url,officialTextSHA256:crypto.createHash('sha256').update(plain).digest('hex'),
   textLength:plain.length,lines:plain.split(/\n/).filter(Boolean).length,
   hasEffectCue:/(You can|If |When |During |cannot|must|Once per turn|negate|Special Summon)/i.test(plain),
   containsCardTitle:html.includes('Card Text'),officiallyRetrieved:true};
}
async function main(){
 const args=process.argv.slice(2),idArg=args.find(x=>x.startsWith('--deck-id=')),
  file=args.find(x=>!x.startsWith('--'));
 const deckId=Number(idArg?.slice(10));
 assert(args.includes('--user-assigned')&&Number.isInteger(deckId)&&deckId>0,
  'USER_DECK_ASSIGNMENT_REQUIRED');
 const absolute=path.resolve(file);
 assert(absolute.startsWith(path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep)&&
   absolute.endsWith('/datos/stationx-deck.json'),'SCOPE_OUTSIDE_SELECTED_DECK');
 const d=JSON.parse(fs.readFileSync(absolute,'utf8'));
 assert(d.deck_id===deckId&&d.record?.deck_id===deckId,'DECK_ID_MISMATCH');
 const cards=d.record.cards;
 if(args.includes('--probe')){
  const probeCid=Number(args.find(x=>x.startsWith('--probe-cid='))?.slice(12))||cards[0].cid;
  assert(cards.some(x=>x.cid===probeCid),'PROBE_CID_NOT_IN_ASSIGNED_DECK');
  console.log('OFFICIAL_PROBE='+JSON.stringify(await sourceCard(probeCid,{probe:true})));
  return;
 }
 const out=[];for(const c of cards){
  const data=await sourceCard(c.cid);
  out.push(data);await sleep(200);
 }
 assert(out.length===cards.length);
 console.log('OFFICIAL_SOURCE_AUDIT='+JSON.stringify({deck_id:deckId,officialTexts:out,
  identityCount:out.length,fullSemanticEffectsCertified:false,deckAnalysesExecuted:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.stack||e.message);process.exitCode=1;});
module.exports={sourceCard};

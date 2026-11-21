'use strict';
// Read-only targeted probe for Memento CID 19364. No card analysis or writes.
const https=require('node:https');
const urls=[
 'https://db.ygoprodeck.com/api/v7/cardinfo.php?konami_id=19364&misc=yes',
 'https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=19364&request_locale=es'
];
async function read(url){return new Promise((resolve,reject)=>{
 https.get(url,{headers:{'User-Agent':'StationX-PhotoQualityAudit/1.0 (single deck ID 671)',
 'Accept':'application/json,text/html,*/*'}},res=>{
 const data=[];res.on('data',part=>data.push(part));res.on('end',()=>{
 const buf=Buffer.concat(data);resolve({status:res.statusCode,contentType:res.headers['content-type'],
 location:res.headers.location,text:buf.toString('utf8').slice(0,280000),
 size:buf.length})});
 }).on('error',reject);
});}
(async()=>{
 for(const url of urls){try{
 const r=await read(url);
 let summary={host:new URL(url).hostname,status:r.status,size:r.size,contentType:r.contentType,location:r.location};
 if(url.includes('ygoprodeck')){
  try{const j=JSON.parse(r.text);const cards=j.data||[];
   summary.cards=cards.map(c=>({id:c.id,name:c.name,
    konami_id:c.misc_info?.[0]?.konami_id,
    full:c.card_images?.[0]?.image_url,
    small:c.card_images?.[0]?.image_url_small}));}
  catch(e){summary.body=r.text.slice(0,400)}
 }else{
  const matches=[...r.text.matchAll(/(?:src|href)=["']([^"']*(?:get_image|\.png|\.jpg|card_image)[^"']*)["']/gi)]
    .slice(0,12).map(x=>x[1]);
  const keywords=['get_image.action','card_image','card_img','enc=','ciid=','/card/detail','cardimage'];
  summary.images=matches;summary.title=r.text.match(/<title[^>]*>(.*?)<\/title>/is)?.[1]?.slice(0,150);
  summary.imageHints=keywords.map(needle=>{const i=r.text.toLowerCase().indexOf(needle.toLowerCase());
    return {needle,found:i>=0,surrounding:i<0?null:r.text.slice(Math.max(0,i-150),i+260)};});
  summary.imgTags=[...r.text.matchAll(/<img[^>]*>/gi)].map(x=>x[0]).filter(x=>/19364|detail|card|image|zoom/i.test(x)).slice(0,10);
  summary.htmlHead=r.text.slice(0,200);
 }
 console.log(JSON.stringify(summary));
 }catch(e){console.log(JSON.stringify({host:new URL(url).hostname,error:e.message}));}}
})().catch(e=>{console.error(e.message);process.exitCode=1});

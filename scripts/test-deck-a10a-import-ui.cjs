'use strict';
// Actual Station X frontend UI smoke with isolated mocked HTTP responses.
// Native PHP ZIP/prepare/publish/reload is tested separately in the same CI.
// Neither test logs into, changes or deploys a live Station X installation.
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const repo=path.resolve(__dirname,'..');
const own=path.join(repo,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO/datos/stationx-deck.json');
const platform=path.join(repo,'_platform_source/torneos_yugioh/assets/modules/deck-data');
const record=JSON.parse(fs.readFileSync(own,'utf8'));
assert.equal(record.deck_id,671);assert.equal(record.record.routes.length,12);assert.equal(record.record.cards.length,39);
const ui=fs.readFileSync(path.join(platform,'ui.js'),'utf8');
const css=fs.readFileSync(path.join(platform,'styles.css'),'utf8');
const html=String.raw`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
body{font-family:system-ui;margin:0;padding:16px;background:#101d32;color:#fff}
button{cursor:pointer}header{padding:4px}main{max-width:1100px;margin:auto}
</style><link rel="stylesheet" href="/deck-data.css"></head><body>
<main><header><h1>Ficha Memento 671</h1><p data-deck-last-updated></p><button data-deck-data-open>Importar / exportar Data</button></header></main>
<script>
window.__observed={converted:0,rendered:0,hasOnlyNeutralPhotos:false,errors:[]};
window.YgoDocumentedCombos={convert(record,route){
 if(record.deck_id!==671||!route.id.startsWith('671:A09:C'))throw Error('Wrong route');
 window.__observed.converted++;
}};
window.YgoCuratedStudy={render(host,deck,data){
 const steps=data.routes.reduce((n,r)=>n+r.steps.length,0);
 const photos=data.routes.reduce((n,r)=>n+r.steps.reduce((a,s)=>a+s.photos.length,0),0);
 if(deck.id!==671||data.cards.length!==39||data.routes.length!==12||steps!==69||photos!==198)throw Error('Invalid preview render shape');
 window.__observed.rendered++;
 const sample=data.routes[0].steps[0].photos[0];
 window.__observed.hasOnlyNeutralPhotos=sample.image.startsWith('data:image/gif');
 host.innerHTML='<div data-checked-study></div>';
}};
</script><script src="/deck-data-ui.js"></script>
<script>window.YgoDeckData.mount({id:671,name:'Memento'});</script></body></html>`;
const server=http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://127.0.0.1').pathname;
 if(pathname==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(html);}
 if(pathname==='/deck-data-ui.js'){res.writeHead(200,{'Content-Type':'application/javascript'});return res.end(ui);}
 if(pathname==='/deck-data.css'){res.writeHead(200,{'Content-Type':'text/css'});return res.end(css);}
 res.writeHead(404);res.end('not found');
});
async function run(browser,base,name,opts){
 const context=await browser.newContext(opts);
 const page=await context.newPage();const errors=[],calls={status:0,preview:0,commit:0};
 let persisted=false;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/?api=deck_data*',route=>{
  const op=new URL(route.request().url()).searchParams.get('op');calls[op]=(calls[op]||0)+1;
  let data={ok:false,message:'Unsupported op'};let status=400;
  if(op==='status'){
   data={ok:true,token:'isolated-csrf',has_data:true,cards:39,routes:12,updated_at:persisted?'2026-11-22T18:00:00Z':null};status=200;
  }else if(op==='preview'){
   assert.equal(route.request().method(),'POST');assert(route.request().headers()['x-csrf-token']==='isolated-csrf');
   data={ok:true,ticket:'isolated-preview-671',deck:'Memento',cards:39,routes:12,new_routes:0,changed_routes:12,removed_routes:0,saved_revisions:0,
    candidate:record.record,native_cards:record.inventory,skills:[],compatibility:{package:'station-x-deck-package/1',import_mode:'estructurado',
    visual_quality:{routes:12,steps:69,illustrated_steps:69,illustrative_endboards:12,full_endboards:0,visual_complete:false},
    calculator_rules:0}};status=200;
  }else if(op==='commit'){
   assert.equal(route.request().method(),'POST');
   assert(route.request().postData().includes('isolated-preview-671'),'TICKET_NOT_SENT');
   persisted=true;data={ok:true,deck:'Memento',entry:{cards:39,routes:12}};status=200;
  }
  return route.fulfill({status,contentType:'application/json',body:JSON.stringify(data)});
 });
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await page.locator('[data-deck-data-open]').click();
 await page.locator('.deck-data-dialog[open]').waitFor();
 await page.locator('[data-dd-status]').filter({hasText:'39 fichas y 12 jugadas'}).waitFor();
 await page.locator('[data-dd-file]').setInputFiles({name:'memento-671.zip',mimeType:'application/zip',buffer:Buffer.from('UI fixture only; native ZIP validated in PHP roundtrip')});
 await page.locator('[data-dd-preview]:not([hidden])').waitFor();
 assert((await page.locator('[data-dd-preview]').innerText()).includes('Calidad visual'));
 assert((await page.locator('[data-dd-preview]').innerText()).includes('Guía documental parcial'),'MUST_NOT_FALSIFY_SPATIAL_ENDBOARDS');
 const observed=await page.evaluate(()=>window.__observed);
 assert.deepEqual([observed.converted,observed.rendered,observed.hasOnlyNeutralPhotos],[12,1,true]);
 await page.locator('[data-dd-commit]:not([hidden])').click();
 await page.locator('.deck-data-finished').waitFor();
 assert((await page.locator('.deck-data-finished').innerText()).includes('Importación completada'));
 assert(persisted,'MOCK_COMMIT_NOT_REACHED');
 await page.locator('[data-dd-reload]:not([hidden])').click();
 await page.waitForURL('**/#deck_ficha');
 await page.waitForLoadState('domcontentloaded');
 const returnDeck=await page.evaluate(()=>sessionStorage.getItem('stationx:deck-data-return'));
 assert.equal(returnDeck,'671','ORIGINAL_DECK_RETURN_NOT_PRESERVED');
 assert.equal(errors.length,0,'BROWSER_JS_ERRORS:'+errors.join(';'));
 assert(calls.status>=2&&calls.preview===1&&calls.commit===1,'REQUEST_SEQUENCE_INCORRECT');
 const result={viewport:name,statusReads:calls.status,zipPreviews:calls.preview,commitRequests:calls.commit,
  guidePreviewConverted:observed.converted,guideRendered:observed.rendered,originalDeckRestored:true,
  visualDisclaimerPreserved:true,browserErrors:errors.length,serverBackendIsMock:true};
 await context.close();return result;
}
(async()=>{
 let browser;
 try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port+'/';
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const desktop=await run(browser,base,'desktop',{viewport:{width:1366,height:900}});
  const mobile=await run(browser,base,'mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  console.log(JSON.stringify({ok:true,deck_id:671,actualFrontend:true,desktop,mobile,
   nativeBackendPersistenceTestedSeparately:true,livePlatformTouched:false},null,2));
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});

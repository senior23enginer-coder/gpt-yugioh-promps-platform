'use strict';
// Browser smoke for the single user-selected Memento A10A guide. Not an importer or game-engine test.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const folder=path.resolve(process.argv[2]||'');
const guide=path.join(folder,'guias','GUIA_VISUAL_A01_A10.html');
assert(fs.existsSync(guide),'MEMENTO_GUIDE_REQUIRED');
const allowedFolder=path.resolve(__dirname,'..','01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
assert(folder.startsWith(allowedFolder)&&folder.endsWith('DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO'),'EXPLICIT_DECK_FOLDER_REQUIRED');
const mime={'.html':'text/html','.png':'image/png','.jpg':'image/jpeg','.css':'text/css','.js':'application/javascript'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const rel=pathname==='/'?'/guias/GUIA_VISUAL_A01_A10.html':pathname;
 const file=path.resolve(folder,'.'+rel);
 if(!file.startsWith(folder+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){
  res.writeHead(404);return res.end('Not found');
 }
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});
 fs.createReadStream(file).pipe(res);
});
async function run(browser,base,label,options){
 const context=await browser.newContext(options),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'guias/GUIA_VISUAL_A01_A10.html',{waitUntil:'domcontentloaded'});
 const buttons=page.locator('#rutas .a10-select'),lessons=page.locator('#rutas .a10-lesson');
 assert.equal(await buttons.count(),12,'TWELVE_NAV_CHOICES_'+label);
 assert.equal(await lessons.count(),12,'TWELVE_GUIDES_'+label);
 assert.equal(await page.locator('.a10-rule-check').count(),69,'SIXTY_NINE_RULE_PANELS_'+label);
 assert(await page.locator('#a10-c01').isVisible(),'C01_INITIAL_VISIBILITY_'+label);
 await page.locator('.a10-select[data-target="C12"]').click();
 assert(await page.locator('#a10-c12').isVisible(),'SELECT_C12_'+label);
 assert((await page.locator('#a10-current').innerText()).includes('C12'),'C12_STATUS_'+label);
 await page.locator('#a10-c12 .a10-rule-check').first().locator('summary').click();
 assert(await page.locator('#a10-c12 .a10-rule-check').first().evaluate(el=>el.open),'RULE_DETAIL_TOGGLE_'+label);
 const visual=page.locator('#a10-c12 .a10-step').first().locator('img').first();
 await visual.scrollIntoViewIfNeeded();
 assert(await visual.evaluate(img=>img.complete&&img.naturalWidth>=600),'REAL_CARD_IMAGE_C12_'+label);
 await page.locator('#a10-c12 .a10-interrupt').first().locator('summary').click();
 assert(await page.locator('#a10-c12 .a10-final').isHidden(),'INTERRUPTION_MUST_HIDE_BASE_FINAL_'+label);
 assert(await page.locator('#a10-c12 .a10-branch-state').isVisible(),'INTERRUPTION_MUST_SHOW_BRANCH_'+label);
 await page.locator('#a10-c12 .a10-interrupt').first().locator('summary').click();
 assert(await page.locator('#a10-c12 .a10-final').isVisible(),'RECOVER_BASE_FINAL_'+label);
 await page.locator('#a10-c12 .a10-next-route').click();
 assert(await page.locator('#a10-c01').isVisible(),'NEXT_WRAP_C01_'+label);
 await page.locator('#a10-c01 .a10-prev').click();
 assert(await page.locator('#a10-c12').isVisible(),'PREVIOUS_WRAP_C12_'+label);
 assert.equal(errors.length,0,'UNCAUGHT_BROWSER_ERRORS_'+label+':'+errors.join('; '));
 const result={viewport:label,routes:12,ruleDetails:69,openingNavigator:true,
  interruptionToggle:true,fullCardImageLoaded:true,jsErrors:errors.length};
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
  console.log(JSON.stringify({ok:true,deck_id:671,desktop,mobile,
   editorImportExecuted:false,gameEngineExecuted:false,spatialEndboardsCertified:0},null,2));
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});

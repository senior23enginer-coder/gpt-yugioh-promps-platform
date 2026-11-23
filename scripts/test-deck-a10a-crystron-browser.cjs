'use strict';
// Browser QA of actual Crystron/Horus 677 static guide on desktop and mobile.
// No game engine or live Station X system is opened.
const A=require('node:assert/strict'),{chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const dir=path.resolve(process.argv[2]||'');
const safe=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
A(dir.startsWith(safe)&&dir.endsWith('DECK_NUEVO_13_CRISTRON_HORUS'),'DECK_677_ONLY');
const htmlPath=path.join(dir,'guias/GUIA_VISUAL_A01_A10.html');
A(fs.existsSync(htmlPath),'GUIDE_MISSING');
const mime={'.html':'text/html; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.css':'text/css'};
const server=http.createServer((req,res)=>{
 const uri=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const rel=uri==='/'?'/guias/GUIA_VISUAL_A01_A10.html':uri;
 const p=path.resolve(dir,'.'+rel);
 if(!p.startsWith(dir+path.sep)||!fs.existsSync(p)||!fs.statSync(p).isFile()){res.writeHead(404);return res.end('Not found');}
 res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(res);
});
async function check(browser,origin,label,opts){
 const context=await browser.newContext(opts),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',res=>{if(res.status()===404)errors.push('HTTP_404 '+res.url())});
 await page.goto(origin+'/guias/GUIA_VISUAL_A01_A10.html',{waitUntil:'domcontentloaded'});
 A.equal(await page.locator('#rutas .a10-picker').count(),14);
 A.equal(await page.locator('#rutas .a10-lesson').count(),14);
 A.equal(await page.locator('#rutas .a10-step').count(),60);
 A.equal(await page.locator('#rutas .a10-rule').count(),60);
 A.equal(await page.locator('#rutas .a10-end').count(),15);
 const intro=page.locator('#a10-c01 .a10-initial img').first();
 await intro.scrollIntoViewIfNeeded();
 await intro.evaluate(img=>img.decode());
 A(await intro.evaluate(img=>img.complete&&img.naturalWidth>=600&&img.naturalHeight>=850),'INITIAL_REAL_PHOTO_'+label);
 const step=page.locator('#a10-c03 .a10-step').nth(2);
 await step.scrollIntoViewIfNeeded();
 A((await step.innerText()).includes('Tristaros'),'C03_SOURCE_STEP');
 A(!(await page.locator('#a10-c03').innerText()).includes('Luna'),'FOREIGN_DECK_WARNING_'+label);
 await step.locator('summary').click();
 A(await step.locator('.a10-rule').evaluate(x=>x.open),'RULE_TOGGLE_FAILED_'+label);
 A((await step.locator('.a10-rule').innerText()).includes('677:a05:20758'),'A05_LINK_MISSING_'+label);
 await page.locator('#a10-c06 .a10-end').first().scrollIntoViewIfNeeded();
 A.equal(await page.locator('#a10-c06 .a10-end [data-zone="xyz_materials"] img').count(),3,'INFINITY_THREE_MATERIALS_'+label);
 await page.locator('#a10-c06 .a10-end [data-zone="xyz_materials"] img').first().evaluate(img=>img.decode());
 A(await page.locator('#a10-c06 .a10-end [data-zone="xyz_materials"] img').first().evaluate(img=>img.naturalWidth>=600),'XYZ_REAL_PHOTO_'+label);
 await page.locator('.a10-picker[data-target="V07"]').click();
 await page.waitForFunction(()=>location.hash==='#a10-v07');
 A.equal(await page.locator('#a10-v07 .a10-end').count(),2);
 await page.locator('#a10-v07 .a10-interrupt summary').click();
 A(await page.locator('#a10-v07 .a10-interrupt').evaluate(x=>x.open),'FAIL_CASE_NOT_EXPANDED_'+label);
 const horizontal=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:window.innerWidth}));
 A(horizontal.width<=horizontal.viewport+3,'HORIZONTAL_OVERFLOW_'+label+': '+JSON.stringify(horizontal));
 A.deepEqual(errors,[],'BROWSER_ERRORS_'+label);
 const result={viewport:label,routeChoices:14,steps:60,endboards:15,cardImageLoaded:true,navAndInterruption:true,noHorizontalOverflow:true,jsErrors:errors.length};
 await context.close();return result;
}
(async()=>{
 let browser;
 try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const origin='http://127.0.0.1:'+server.address().port;
  const desktop=await check(browser,origin,'desktop',{viewport:{width:1366,height:900}});
  const mobile=await check(browser,origin,'mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  console.log(JSON.stringify({ok:true,deck_id:677,desktop,mobile,livePlatformTouched:false,engineExecuted:false},null,2));
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
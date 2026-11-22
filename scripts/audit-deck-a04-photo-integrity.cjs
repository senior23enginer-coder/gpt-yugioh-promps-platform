'use strict';
/**
 * Generic, fail-closed A04 photo/provenance/zone audit for a single assigned deck.
 * Sources and authentic bytes are CID-matched; images never certify a replay,
 * exact field positions or rules legality.
 */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const assert=require('node:assert/strict');
const {audit:technical,pngDimensions,jpegDimensions}=require('./audit-deck-images.cjs');
const {audit:visual}=require('./audit-deck-visual-zone-links.cjs');
const ROOT=path.resolve(__dirname,'..');
const SAFE=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
function run({deckId,packagePath,documentPath}){
 assert.equal(deckId,677,'EXPLICIT_ASSIGNED_CRYSTRON_ONLY');
 const packageFile=path.resolve(packagePath),documentFile=path.resolve(documentPath);
 assert(packageFile.startsWith(SAFE)&&documentFile.startsWith(SAFE),'CROSS_DECK_SOURCE');
 const folder=path.dirname(path.dirname(packageFile));
 assert.equal(path.dirname(documentFile),folder,'WRONG_CANONICAL_DOCUMENT');
 const pkg=JSON.parse(fs.readFileSync(packageFile,'utf8'));
 assert.equal(pkg.deck_id,677);assert.equal(pkg.record.deck_id,677);
 assert.equal(pkg.record.format,'tcg_advanced');
 assert.equal(pkg.record.cards.length,39);
 const doc=fs.readFileSync(documentFile,'utf8');
 const prov=JSON.parse(fs.readFileSync(path.join(folder,'datos/A04_HD_IMAGE_PROVENANCE.json'),'utf8'));
 assert.equal(prov.schema,'station-x-card-photo-provenance/1');
 assert.equal(prov.deck_id,deckId);assert.equal(prov.format,pkg.record.format);
 assert.equal(prov.photo_count,39);assert.equal(prov.images.length,39);
 const auditOne=technical(packageFile,{deckId,explicitAssignment:true,
   minimumWidth:600,minimumHeight:850});
 assert.equal(auditOne.technicalQaPassed,true,'LOW_RES_IMAGE_DETECTED');
 const zone=visual({deckId,explicitAssignment:true,packageFile});
 assert.deepEqual(zone.counts,{main:40,extra:15,side:15,reserve:0});
 assert.equal(zone.cards,39);assert.equal(zone.nativeSlots,40);
 assert.equal(zone.routes,14);assert.equal(zone.steps,60);
 assert.equal(zone.stepPhotos,151);
 assert.equal(zone.illustrativeBoards,15);
 assert.equal(zone.zoneMapEntries,60);
 assert.equal(zone.spatiallyCertifiedBoards,0);
 assert.equal(zone.htmlImageReferences,77,'HTML_IMAGE_TAG_COUNT_DRIFT');
 const byCid=new Map(pkg.record.cards.map(c=>[c.cid,c]));
 const seen=new Set();
 let minWidth=Number.POSITIVE_INFINITY,minHeight=Number.POSITIVE_INFINITY;
 let jpgs=0,pngs=0;
 for(const item of prov.images){
  assert(Number.isInteger(item.cid)&&byCid.has(item.cid)&&!seen.has(item.cid),
    'FOREIGN_OR_DUPLICATE_SOURCE_CID_'+item.cid);seen.add(item.cid);
  const card=byCid.get(item.cid);
  assert.equal(item.konami_id,item.cid);
  assert.equal(item.display_name_es,card.name,'SOURCE_DISPLAY_NAME_DRIFT');
  assert(item.source_language==='en'&&item.source_name_en?.length>2,
    'UNVERIFIED_TCG_IMAGE_SOURCE_'+item.cid);
  assert(Number.isInteger(item.ygoprodeck_card_id)&&item.ygoprodeck_card_id>0,
    'MISSING_ART_IMAGE_ID_'+item.cid);
  assert.equal(item.url,
    'https://images.ygoprodeck.com/images/cards/'+item.ygoprodeck_card_id+'.jpg',
    'UNTRUSTED_REMOTE_IMAGE_URL_'+item.cid);
  assert.equal(item.original_path,path.relative(ROOT,path.join(folder,'imagenes',
    path.basename(card.full_image))).split(path.sep).join('/'),
    'CROSS_DECK_IMAGE_PATH_'+item.cid);
  assert.equal(card.image,card.full_image,'DISTINCT_IMAGE_REFERENCES_NOT_EXPECTED_'+item.cid);
  const filename=path.basename(card.full_image);
  const binary=fs.readFileSync(path.join(folder,'imagenes',filename));
  const actualHash=crypto.createHash('sha256').update(binary).digest('hex');
  assert.equal(actualHash,item.saved_sha256,'IMAGE_HASH_CHANGED_'+item.cid);
  assert.equal(binary.length,item.saved_bytes,'IMAGE_BYTE_COUNT_DRIFT_'+item.cid);
  assert(/^[0-9a-f]{64}$/.test(item.previous_sha256)&&
    /^[0-9a-f]{64}$/.test(item.source_sha256),'UNVERIFIED_ORIGINAL_HASH_'+item.cid);
  assert.notEqual(item.previous_sha256,item.saved_sha256,
    'LOW_RES_IMAGE_NEVER_REPLACED_'+item.cid);
  const dims=/\.png$/i.test(filename)?pngDimensions(binary):jpegDimensions(binary);
  assert.deepEqual([dims.width,dims.height],item.dimensions,
    'PHOTO_DIMENSIONS_DO_NOT_MATCH_SOURCE_'+item.cid);
  assert(dims.width>=600&&dims.height>=850,'NOT_HIGH_RES_'+item.cid);
  minWidth=Math.min(minWidth,dims.width);minHeight=Math.min(minHeight,dims.height);
  if(/\.png$/i.test(filename))pngs++;else jpgs++;
  assert(card.sources.some(u=>u.startsWith(
    'https://www.db.yugioh-card.com/yugiohdb/')&&u.includes('cid='+item.cid)),
    'KONAMI_RULES_SOURCE_MISSING_'+item.cid);
 }
 assert.equal(seen.size,39);assert.equal(jpgs,20);assert.equal(pngs,19);
 // The guide contains hyperlinks as well as <img> tags; both must resolve.
 const html=fs.readFileSync(path.join(folder,'guias/GUIA_VISUAL_A01_A10.html'),'utf8');
 const guideRefs=[...html.matchAll(/(?:src|href)=["']\.\.\/imagenes\/(\d+)\.(png|jpg)["']/gi)];
 assert.equal(guideRefs.length,96,'HISTORIC_GUIDE_IMAGE_LINK_COUNT_DRIFT');
 const ids=new Set();
 for(const match of guideRefs){
  const cid=Number(match[1]),card=byCid.get(cid);
  assert(card&&path.basename(card.full_image)===cid+'.'+match[2].toLowerCase(),
    'UNKNOWN_OR_MISMATCHED_GUIDE_CID_'+cid);
  ids.add(cid);
 }
 assert.equal(ids.size,39,'NOT_ALL_CIDS_VISIBLE_IN_GUIDE');
 // Markdown is source material, not runtime: verify known relative assets.
 const documentRefs=[...doc.matchAll(/(?:\.\.\/)?(?:imagenes|guias)\/[0-9A-Za-z_-]+\.(?:png|jpg|html)/g)]
  .map(x=>x[0]);
 assert(documentRefs.length>=55,'CANONICAL_DOCUMENT_LOST_REFERENCES');
 for(const ref of documentRefs){
  assert(!ref.startsWith('../'),'ESCAPING_CANONICAL_FOLDER_'+ref);
  assert(fs.existsSync(path.resolve(folder,ref)),'BROKEN_DOC_RELATIVE_LINK_'+ref);
 }
 // Position facts remain explicitly unresolved, never inferred from card art.
 const routeIds=new Set();
 for(const route of pkg.record.routes){
  assert(!routeIds.has(route.id),'DUPLICATE_ROUTE_ID');routeIds.add(route.id);
  assert.equal(route.endboard?.spatial_verified,false,
    'UNSUPPORTED_POSITION_CERTIFICATION_'+route.id);
 }
 assert.equal(routeIds.size,14);
 assert(doc.includes('### A04.2 — biblioteca HD')&&
   doc.includes('### A04.3 — mapa de zonas'),
   'DOCUMENTARY_A04_EVIDENCE_MISSING');
 const ledgerStart=doc.indexOf('## CONTROL_DE_TAREAS_A01_A10 —');
 const ledgerEnd=doc.indexOf('\n---\n',ledgerStart);
 assert(ledgerStart>=0&&ledgerEnd>ledgerStart,'MISSING_CHECKLIST');
 const ledger=doc.slice(ledgerStart,ledgerEnd);
 const expected=['A01','A02','A03','A04'].flatMap(id=>Array.from({length:3},
   (_,i)=>id+'-T'+(i+1)));
 const closed=[...ledger.matchAll(/^- \[x\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)]
   .map(m=>m[1]);
 assert.deepEqual(closed,expected,'A04_MUST_CLOSE_ONLY_T1_T2_T3');
 assert(ledger.includes('12/35')&&ledger.includes('23/35'),'PROGRESS_NOT_CONSISTENT');
 return {ok:true,deck_id:deckId,photos:seen.size,minWidth,minHeight,
   jpgs,pngs,nativeSlots:zone.nativeSlots,physical:zone.counts,
   guideReferences:guideRefs.length,guideVisibleCIDs:ids.size,
   canonicalRelativeReferences:documentRefs.length,routes:zone.routes,
   steps:zone.steps,stepPhotos:zone.stepPhotos,illustrativeBoards:zone.illustrativeBoards,
   zoneMapEntries:zone.zoneMapEntries,spatiallyCertifiedBoards:0,
   referenceSource:'Konami CID-matched YGOPRODeck TCG full images',
   tasksCompleted:closed.length,mandatoryTotal:35,calculatorExecuted:false,
   replayCertified:false,productionImport:false};
}
if(require.main===module){
 const argv=process.argv.slice(2);
 assert(argv.includes('--user-assigned'),'ASSIGNMENT_REQUIRED');
 const deckId=Number(argv.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const paths=argv.filter(x=>!x.startsWith('--'));
 assert(paths.length===2,'REQUIRE_PACKAGE_AND_CANONICAL_DOCUMENT');
 console.log(JSON.stringify(run({deckId,packagePath:paths[0],documentPath:paths[1]})));
}
module.exports=Object.freeze({run});
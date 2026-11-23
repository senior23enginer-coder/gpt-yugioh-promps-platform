'use strict';
/* Kashtira Pure 665 A03: identity, all physical slots, source CID, and fail-closed changes.
 * User-authorized stage A03 alone. No banlist, live import, or calculator.
 */
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const ROOT=path.resolve(__dirname,'..');
const DECK=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const SOURCE='torneos_yugioh/assets/editorial/20261117-folder-delivery-v40/665.json';
const SHA='29a120ffd8378ea9606e4b509a478fde34e423bd';
function rows(cards){return cards.flatMap(c=>c.slots.map(s=>({id:s.card_id,cid:c.cid,name:c.name,alias:c.source_aliases?.[0]||c.name,zone:s.section,qty:s.quantity})))}
function verify(pkg,history){
 A.equal(pkg.schema,'station-x-deck-package/1');
 A.equal(pkg.inventory_binding,'deck-slots-v1');
 A.equal(pkg.deck_id,665);A.equal(pkg.record.deck_id,665);
 A.equal(pkg.record.format,'tcg_advanced');A.equal(history.format,pkg.record.format);
 A.equal(pkg.record.schema,history.schema);
 A(!Object.hasOwn(pkg,'inventory_sha256'),'UNVERIFIED_LIVE_HASH');
 A.equal(pkg.record.cards.length,38);
 const physical=rows(pkg.record.cards),historic=rows(history.cards);
 A.equal(physical.length,44,'MISSING_OR_EXTRA_SLOT');
 A.equal(new Set(physical.map(x=>x.id)).size,44,'DUPLICATED_NATIVE_ID');
 A.equal(new Set(physical.map(x=>x.cid)).size,38,'DUPLICATED_CID_IDENTITY');
 A.equal(pkg.inventory.length,44,'PORTABLE_ROW_LOSS');
 const prev=new Map(historic.map(x=>[x.id,x])),declared=new Map();
 for(const x of pkg.inventory){A(!declared.has(x.id),'DECLARED_DUPLICATE');declared.set(x.id,x)}
 const counts={main:0,extra:0,side:0,reserve:0};
 for(const s of physical){
  const prior=prev.get(s.id),cur=declared.get(s.id);
  A(prior&&cur,'UNVERIFIED_CARD_ID_'+s.id);
  A.deepEqual(s,prior,'PHYSICAL_IDENTITY_OR_ZONE_CHANGED_'+s.id);
  A.equal(cur.section,s.zone);A.equal(cur.quantity,s.qty);A.equal(cur.card_name,s.name);
  A(Object.hasOwn(counts,s.zone),'UNKNOWN_PHYSICAL_ZONE');A(Number.isInteger(s.qty)&&s.qty>0&&s.qty<=3);
  counts[s.zone]+=s.qty;
 }
 A.deepEqual(counts,{main:42,extra:15,side:0,reserve:19});
 A.equal(Object.values(counts).reduce((n,v)=>n+v,0),76);
 A.equal(pkg.record.skills.length,0);
 for(const c of pkg.record.cards){
  A(c.source_aliases?.length===1&&c.source_aliases[0]===c.name,'ALIAS_UNMATCHED_'+c.cid);
  A(c.sources?.some(u=>u.startsWith('https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid='+c.cid+'&')),'MISSING_OFFICIAL_SOURCE_'+c.cid);
  const img='DECK_665_KASHTIRA_PURE/imagenes/tcg/'+c.cid+'.jpg';
  A.equal(c.image,img);A.equal(c.full_image,img);
 }
 return counts;
}
function audit(pkgFile,mdFile,historyFile){
 A.equal(path.resolve(pkgFile),path.join(DECK,'datos/stationx-deck.json'));
 A.equal(path.resolve(mdFile),path.join(DECK,'DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md'));
 const source=path.resolve(historyFile);
 A(source.endsWith('/'+SOURCE)&&source.includes('/_platform_source/'),'WRONG_SOURCE');
 const pkg=JSON.parse(fs.readFileSync(pkgFile,'utf8')),old=JSON.parse(fs.readFileSync(source,'utf8'));
 const doc=fs.readFileSync(mdFile,'utf8');
 A.equal(pkg.provenance.native_snapshot_blob_sha,SHA);
 A.equal(pkg.provenance.native_snapshot_path,SOURCE);
 const counts=verify(pkg,old);
 const valid=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,
  stageId:'A03',authorizedSideOmissionForA03:true});
 A(valid.eligible&&valid.a03SideWaiverApplied,'NO_A03_USER_PERMISSION');
 A.deepEqual(valid.counts,counts);
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg}).eligible);
 A(!validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:pkg,
  stageId:'A04',authorizedSideOmissionForA03:true}).eligible);
 const cids=new Set(pkg.record.cards.map(x=>x.cid));
 const jpg=fs.readdirSync(path.join(DECK,'imagenes/tcg')).filter(x=>x.endsWith('.jpg'));
 A.equal(jpg.length,44);
 A.equal(jpg.filter(x=>!cids.has(Number(x.slice(0,-4)))).length,6);
 for(const cid of cids){
  const im=path.join(DECK,'imagenes/tcg',cid+'.jpg');
  A(fs.existsSync(im)&&fs.statSync(im).size>1000,'PHYSICAL_CARD_IMAGE_MISSING_'+cid);
 }
 A.equal(pkg.record.routes.length,16);
 A.deepEqual(pkg.record.routes.map(r=>r.id),old.routes.map(r=>r.id));
 let steps=0,photos=0;
 for(const route of pkg.record.routes)for(const step of route.steps){
  steps++;for(const img of step.photos||[]){
   photos++;A(cids.has(img.cid),'PHOTO_REF_FOREIGN_CID_'+img.cid);
  }
 }
 A.equal(steps,92);A.equal(photos,116);
 const begin=doc.indexOf('## CONTROL_DE_TAREAS_A01_A10'),end=doc.indexOf('\n---\n',begin);
 A(begin>=0&&end>begin);
 const ledger=doc.slice(begin,end);
 const all=[...ledger.matchAll(/^- \[([ x])\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)];
 const taskIds=JSON.parse(fs.readFileSync(path.join(ROOT,'02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8'))
  .stages.filter(s=>s.mandatory).flatMap(s=>s.tasks.map(t=>t.task_id));
 A.deepEqual(all.map(m=>m[2]),taskIds);
 A.deepEqual(all.filter(m=>m[1]==='x').map(m=>m[2]).slice(0,16),taskIds.slice(0,16));
 A(ledger.includes('20/35')&&ledger.includes('15/35'));
 const section=doc.slice(doc.indexOf('## APARTADO_03 —'));
 A(section.includes('### A03.1')&&section.includes('### A03.2')&&section.includes('### A03.3'));
 const lines=section.split('### A03.2')[0].split('\n');
 for(const p of rows(pkg.record.cards)){
  const row=lines.find(x=>x.startsWith('| '+String.fromCharCode(96)+p.id+String.fromCharCode(96)+' | '));
  A(row&&row.includes(' | '+p.qty+' | ')&&row.includes('cid='+p.cid+'&'),'ROW_NOT_GROUNDED_'+p.id);
 }
 for(const k of ['A03-T1','A03-T2','A03-T3'])A(section.includes('**'+k+' [x]'),'A03_TASK_EVIDENCE_MISSING_'+k);
 const negatives=[
  ['deck',x=>x.deck_id=666],
  ['cid',x=>x.record.cards[0].cid=999999],
  ['name',x=>x.record.cards[0].name='wrong'],
  ['card_id',x=>x.record.cards[0].slots[0].card_id=999999],
  ['quantity',x=>x.record.cards[0].slots[0].quantity++],
  ['slot-extra',x=>x.record.cards[0].slots.push({...x.record.cards[0].slots[0]})],
  ['slot-missing',x=>x.record.cards[0].slots.shift()],
  ['reserve-to-side',x=>x.record.cards.find(c=>c.slots.some(s=>s.section==='reserve')).slots.find(s=>s.section==='reserve').section='side'],
  ['format',x=>x.record.format='rush_duel'],
  ['photo',x=>x.record.cards[0].image='other-deck.jpg'],
  ['declared-zone',x=>x.inventory[0].section='reserve'],
  ['fake-hash',x=>x.inventory_sha256='invented']
 ];
 for(const [id,modify] of negatives){const x=structuredClone(pkg);modify(x);A.throws(()=>verify(x,old),undefined,'MUTATION_NOT_REJECTED_'+id)}
 return {ok:true,deck_id:665,stage:'A03',complete:16,pending:19,counts,totalCopies:76,
  cids:38,cardIds:44,officialSources:38,photos:44,externalPhotoReferences:6,
  routes:16,steps:92,stepImageReferences:116,negativeTests:negatives.length,
  banlistAssessed:false,reserveReclassified:false,gameEngineExecuted:false,livePublished:false};
}
if(require.main===module){
 const a=process.argv.slice(2),paths=a.filter(s=>!s.startsWith('--'));
 A(a.includes('--deck-id=665')&&a.includes('--user-assigned')&&a.includes('--authorized-side-waiver')&&paths.length===3,
  'A03_USER_ASSIGNMENT_REQUIRED');
 console.log(JSON.stringify(audit(...paths)));
}
module.exports={audit};
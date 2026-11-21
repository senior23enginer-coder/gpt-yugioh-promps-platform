'use strict';
// Generic A05 structural audit for ONE explicitly assigned deck.
// Structural completeness is NOT independent semantic or calculator certification.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const allowedRoot=path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
const TYPES=new Set(['ACTIVACION','DISPARO','CONTINUO','PROCEDIMIENTO','RESTRICCION',
 'RAPIDO','RAPIDO_MANO','ACTIVACION_GY','ACTIVACION_MANO','DISPARO_GY',
 'MAGICA_RAPIDA','MAGICA_NORMAL','MANTENIMIENTO']);
function audit({deckId,explicitlyAssigned,packageFile,sourceFile,expectedClauses}={}){
 assert(explicitlyAssigned===true,'EXPLICIT_DECK_ASSIGNMENT_REQUIRED');
 assert(Number.isInteger(deckId)&&deckId>0,'EXPLICIT_DECK_ID_REQUIRED');
 assert(typeof packageFile==='string'&&typeof sourceFile==='string','FILES_REQUIRED');
 const pkgFile=path.resolve(packageFile),markdown=path.resolve(sourceFile);
 assert(pkgFile.startsWith(allowedRoot)&&markdown.startsWith(allowedRoot),'OUT_OF_DECK_SCOPE');
 assert(path.dirname(path.dirname(pkgFile))===path.dirname(markdown),'FOREIGN_DECK_FILE');
 const pkg=JSON.parse(fs.readFileSync(pkgFile,'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');
 assert.equal(pkg.deck_id,deckId);
 assert.equal(pkg.record?.deck_id,deckId);
 assert(typeof pkg.record.format==='string'&&pkg.record.format.length>1);
 const sum={main:0,extra:0,side:0,reserve:0},cards=new Map();
 for(const card of pkg.record.cards){
  assert(Number.isInteger(card.cid)&&card.cid>0&&!cards.has(card.cid),'DUPLICATE_OR_INVALID_CID');
  cards.set(card.cid,card);
  assert((card.sources||[]).some(u=>typeof u==='string'&&
    u.startsWith('https://www.db.yugioh-card.com/yugiohdb/')&&u.includes('cid='+card.cid)),
    'OFFICIAL_SOURCE_MISSING_'+card.cid);
  for(const slot of card.slots){
   assert(Number.isInteger(slot.card_id)&&slot.card_id>0&&Number.isInteger(slot.quantity)&&slot.quantity>0);
   assert(Object.hasOwn(sum,slot.section),'INVALID_SECTION');sum[slot.section]+=slot.quantity;
  }
 }
 for(const sec of ['main','extra','side'])assert(sum[sec]>0,'MISSING_REQUIRED_'+sec);
 const source=fs.readFileSync(markdown,'utf8');
 const first=source.indexOf('### A05.6 — registro individual de cláusulas por CID');
 assert(first>=0,'DOCUMENTAL_EFFECT_REGISTRY_MISSING');
 const next=source.indexOf('\n### ',first+8);
 assert(next>first,'EFFECT_REGISTRY_BOUNDARY_MISSING');
 const section=source.slice(first,next);
 const headers=[...section.matchAll(/^- \*\*CID (\d+) — ([^\n*]+)\*\* \(([^)]+)\)/gm)];
 assert.equal(headers.length,cards.size,'NOT_ALL_PHYSICAL_IDENTITIES_HAVE_EFFECT_LIST');
 const seenCids=new Set(),seenIds=new Set(),effectsByCid=new Map();
 for(let i=0;i<headers.length;i++){
  const h=headers[i],cid=Number(h[1]),card=cards.get(cid);
  assert(card&&!seenCids.has(cid),'FOREIGN_OR_DUPLICATE_CID_'+cid);
  seenCids.add(cid);
  const sourceUrl='https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid='+
   cid+'&ope=2&request_locale=en';
  assert(section.slice(h.index,h.index+h[0].length+300).includes(sourceUrl),
    'A05_ROW_MUST_LINK_OFFICIAL_CID_'+cid);
  const expectedSections=[...new Set(card.slots.map(s=>s.section))].sort();
  assert.deepEqual(h[3].split(';')[0].split('+').sort(),expectedSections,'ZONE_MISMATCH_CID_'+cid);
  const end=i+1<headers.length?headers[i+1].index:section.length;
  const block=section.slice(h.index,end);
  const clauses=[...block.matchAll(/^\s+- \x60(\d+:a05:(\d+):([a-z0-9-]+))\x60 · \*\*([A-Z_]+)\*\* · ([^\n]+)/gm)];
  assert(clauses.length>0,'NO_CLAUSES_CID_'+cid);
  effectsByCid.set(cid,[]);
  for(const match of clauses){
   const [_,id,idCid,slug,type,description]=match;
   assert(Number(idCid)===cid&&id.startsWith(deckId+':a05:'+cid+':'),
      'EFFECT_CLAUSE_ATTACHED_TO_WRONG_CARD_'+id);
   assert(!seenIds.has(id),'DUPLICATE_EFFECT_ID_'+id);
   assert(TYPES.has(type),'UNKNOWN_EFFECT_KIND_'+type);
   assert(description.trim().length>=30,'NOT_SUBSTANTIVE_EFFECT_DESCRIPTION_'+id);
   seenIds.add(id);
   effectsByCid.get(cid).push({id,type,slug,description:description.trim()});
  }
 }
 assert.equal(seenCids.size,cards.size);
 if(expectedClauses!==undefined)assert.equal(seenIds.size,expectedClauses,'MISSING_CLAUSE');
 assert.equal(seenIds.size,[...effectsByCid.values()].reduce((n,x)=>n+x.length,0));
 const types={};for(const clauses of effectsByCid.values())for(const x of clauses)types[x.type]=(types[x.type]||0)+1;
 return {ok:true,deck_id:deckId,format:pkg.record.format,identities:cards.size,clauses:seenIds.size,
  kinds:types,counts:sum,taskT2StructuralCoverage:true,fullCausalSemanticsChecked:false,
  officialEffectTextIndependentlyMatched:false,caseMatrixComplete:false,calculatorExecuted:false};
}
if(require.main===module){
 const args=process.argv.slice(2),idArg=args.find(a=>a.startsWith('--deck-id=')),
  expectedArg=args.find(a=>a.startsWith('--expected-clauses=')),
  files=args.filter(a=>!a.startsWith('--'));
 const data=audit({deckId:Number(idArg?.slice(10)),explicitlyAssigned:args.includes('--user-assigned'),
  packageFile:files[0],sourceFile:files[1],
  expectedClauses:expectedArg?Number(expectedArg.slice('--expected-clauses='.length)):undefined});
 console.log(JSON.stringify(data));
}
module.exports=Object.freeze({audit});
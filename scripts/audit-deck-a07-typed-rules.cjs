'use strict';
// One explicitly assigned deck only. Structural A07 attribution, never calculator certification.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const ACTIVATED=new Set(['ACTIVACION','ACTIVACION_GY','ACTIVACION_MANO','RAPIDO','RAPIDO_MANO','MAGICA_NORMAL','MAGICA_RAPIDA']);
const TRIGGERS=new Set(['DISPARO','DISPARO_GY']);
const NONCHAIN=new Set(['PROCEDIMIENTO','CONTINUO','RESTRICCION','MANTENIMIENTO']);
const CHAIN_MODE={activated_chain:ACTIVATED,triggered_chain:TRIGGERS,not_activated:NONCHAIN};
function between(src,start,end) {
 const a=src.indexOf(start),b=src.indexOf(end,a+start.length);
 assert(a>=0&&b>a,'A07_SECTION_MISSING_OR_UNBOUNDED_'+start);
 return src.slice(a,b);
}
function audit({deckId,assigned,packagePath,curatedPath,expectEffects=94}) {
 assert(assigned===true&&Number.isInteger(deckId)&&deckId>0,'A07_EXPLICIT_DECK_ASSIGNMENT_REQUIRED');
 const pf=path.resolve(packagePath),df=path.resolve(curatedPath);
 assert(pf.startsWith(DECKS)&&df.startsWith(DECKS),'A07_DECK_SCOPE_VIOLATION');
 assert(path.dirname(path.dirname(pf))===path.dirname(df),'A07_MIXED_DECK_SOURCE');
 const pkg=JSON.parse(fs.readFileSync(pf,'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');
 assert.equal(pkg.deck_id,deckId);assert.equal(pkg.record.deck_id,deckId);
 assert.equal(pkg.record.format,'tcg_advanced','A07_FORMAT_NOT_TCG');
 const cards=new Map(),counts={main:0,extra:0,side:0,reserve:0};
 for(const c of pkg.record.cards){
  assert(!cards.has(c.cid),'A07_DUPLICATE_PHYSICAL_CID');
  cards.set(c.cid,c);
  for(const slot of c.slots){assert(Object.hasOwn(counts,slot.section));counts[slot.section]+=slot.quantity;}
 }
 for(const section of ['main','extra','side'])assert(counts[section]>0,'A07_MISSING_'+section);
 const src=fs.readFileSync(df,'utf8');
 const registry=between(src,'### A05.6 —','### A05.7 —');
 const causal=between(src,'### A05.7 —','### A05.8 —');
 const paper=between(src,'### A05.8 —','### A05.9 —');
 const matrix=between(src,'### A07.7 —','## APARTADO_08 —');
 const effects=new Map();
 for(const match of registry.matchAll(/^\s+- \x60(\d+:a05:(\d+):[a-z0-9-]+)\x60 · \*\*([A-Z_]+)\*\* · ([^\n]+)/gm)){
  const [_,id,cidText,kind,summary]=match,cid=Number(cidText);
  assert(cards.has(cid)&&id.startsWith(deckId+':a05:'),'A07_NONINVENTORY_EFFECT_'+id);
  assert(!effects.has(id),'A07_DUPLICATE_EFFECT_'+id);
  effects.set(id,{cid,kind,summary});
 }
 assert.equal(effects.size,expectEffects,'A07_NOT_EXPECTED_EFFECT_CENSUS');
 const rows=[...matrix.matchAll(/^\| \x60(\d+:a05:(\d+):[a-z0-9-]+)\x60 \| \x60([A-Z_]+)\x60 \/ \x60([a-z_]+)\x60 \| \x60([^|]+)\x60 \| \x60([^|]+)\x60 \| \x60([^|]+)\x60 \| \x60([^|]+)\x60 \| \x60([^|]+)\x60 \| \x60([^|]+)\x60 \| \[CID (\d+)\]\(([^)\s]+)\)([^\n]*) \|$/gm)];
 assert.equal(rows.length,expectEffects,'A07_TYPED_ROW_COUNT_MISMATCH');
 let procedures=0,continuouslyApplied=0,activated=0,triggered=0,sourceLinks=0,realCost=0,sideExclusive=0;
 const seen=new Set();
 for(const m of rows){
  const [_,id,cidStr,kind,mode,actor,window,cost,selection,limit,transition,linkCid,url,annotations]=m;
  const c=effects.get(id),cid=Number(cidStr);
  assert(c&&c.cid===cid&&c.kind===kind,'A07_EFFECT_TYPE_OR_CID_MISMATCH_'+id);
  assert(!seen.has(id),'A07_DUPLICATE_TYPED_EFFECT_'+id);seen.add(id);
  assert(CHAIN_MODE[mode]?.has(kind),'A07_MISMATCH_CHAIN_CLASS_'+id);
  for(const [key,value] of Object.entries({actor,window,cost,selection,limit,transition})){
   assert(value.trim().length>=4,'A07_EMPTY_CAUSAL_FIELD_'+id+'_'+key);
  }
  assert(Number(linkCid)===cid&&url.includes('cid='+cid)&&url.includes('request_locale=en'),
   'A07_OFFICIAL_SOURCE_CID_MISMATCH_'+id);sourceLinks++;
  const card=cards.get(cid),sections=new Set(card.slots.map(x=>x.section));
  if(actor==='extra')assert(sections.has('extra'),'A07_EXTRA_CARD_NOT_LOADED_'+id);
  if(actor.includes('post-side')){
   assert(sections.has('side'),'A07_POST_SIDE_WITHOUT_SIDE_COPY_'+id);sideExclusive++;
  }
  if(kind==='PROCEDIMIENTO'){
   procedures++;
   assert(!cost.startsWith('discard-')&&!cost.startsWith('pay'),'A07_PROCEDURE_PREPAID_COST_UNVERIFIED_'+id);
  }else if(kind==='CONTINUO'||kind==='RESTRICCION')continuouslyApplied++;
  else if(TRIGGERS.has(kind))triggered++;
  else activated++;
  if(cost!=='none'&&!cost.startsWith('none-'))realCost++;
  const causalHead='#### ';
  assert(causal.includes('\x60'+id+'\x60 · CID '+cid+' ('+kind+')'),
    'A07_CAUSAL_TEXT_MISSING_'+id);
  assert(paper.includes('\x60'+id+'\x60 — dos casos de papel'),
    'A07_PAPER_PAIR_MISSING_'+id);
  if(annotations.includes('NO_APLICA_INVENTARIO'))
   assert(/no-inventory|no-goblin-xyz/.test(transition),
    'A07_INVENTORY_EXCEPTION_NOT_JUSTIFIED_'+id);
 }
 assert.equal(seen.size,effects.size,'A07_TYPED_CENSUS_NOT_BIJECTIVE');
 // Known regressions: independent source-based checks, not generic string aliases.
 const rowFor=id=>rows.find(m=>m[1]===deckId+':a05:'+id);
 assert(rowFor('11243:quick-tribute-banish-lock')?.[6]==='opponent-turn-quick-window',
   'A07_LANCEA_WRONG_TURN');
 assert(rowFor('13081:quick-negate-special-summon-activation')?.[8]==='chain-link-no-target',
   'A07_CAESAR_CHAIN_NOT_LINKED');
 assert(rowFor('13081:quick-negate-special-summon-activation')?.[9]==='no-opt-in-official-text',
   'A07_CAESAR_FALSE_ONCE_PER_TURN');
 assert(rowFor('21203:initial-main-banish-cost-bounce')?.[7]==='none-resource-banish-on-resolution',
   'A07_GORDIAN_FALSE_PREPAID_COST');
 assert(src.includes('**no existe el conflicto simultáneo Lancea'),'A07_LANCEA_GY_CONFLICT_NOT_CORRECTED');
 return {ok:true,deck_id:deckId,format:pkg.record.format,
  inventory:counts,cardIdentities:cards.size,effects:effects.size,
  typedEffects:rows.length,sourceLinks,procedures,continuouslyApplied,activated,triggered,
  costOrProcedureAnnotations:realCost,postSideDeclarations:sideExclusive,
  pairedA05PaperReferenced:rows.length,
  independentTCGCaseLegalityCertified:false,allCostsSemanticallyReconciled:false,
  calculatorExecuted:false,mergePermittedByThisAudit:false};
}
if(require.main===module){
 const args=process.argv.slice(2),id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 const files=args.filter(x=>!x.startsWith('--'));
 assert.equal(files.length,2,'A07_PACKAGE_AND_DOCUMENT_REQUIRED');
 console.log(JSON.stringify(audit({deckId:id,assigned:args.includes('--user-assigned'),
  packagePath:files[0],curatedPath:files[1]})));
}
module.exports=Object.freeze({audit});
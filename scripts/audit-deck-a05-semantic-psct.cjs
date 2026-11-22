'use strict';
/**
 * User-assigned Memento 671 PSCT review: independently curated semantic gates
 * reconciled against 94 A05.6 clauses, their 94 A05.7 causal records and the
 * 94 A07.7 typed rules. The ordinal oracle was manually reviewed against
 * Konami TCG card text, not generated from the code under test.
 *
 * This verifies written effect semantics, not game execution, tournament
 * legality, or the 188 independent before/after paper cases of A05-T4.
 */
const a=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
const NONCHAIN=new Set([3,5,8,10,12,18,20,21,22,23,25,28,29,31,43,50,51,56,65,69,70,71,74,77,78,79,80,83,84,94]);
const TRIGGER=new Set([6,14,19,26,30,32,35,37,44,48,49,52,53,62,63,67,85,86,87,88,91]);
const COST_PAID_AT_ACTIVATION=new Set([2,4,7,11,13,17,24,35,39,41,47,55,58,60,64,66,72,82,89,90,91,92]);
const TARGET_AT_ACTIVATION=new Set([9,15,26,27,32,35,38,39,44,45,47,48,57,59,68,73,76,82,87,93]);
const PROCEDURE=new Set([3,5,8,12,18,21,22,25,28,31,50,56,65,70,74,78,83]);
const MAINTENANCE=new Set([79]);
const SELF_COPY_SOFT_OPT=new Set([4,9,24,30,45]);
const OFFICIAL='https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=';
const HOPS=Object.freeze({
 '9139:opening-main1-summon-lock':[['window','start-self-main1'],['result','lock-both-effect-summons']],
 '9279:after-opponent-main-deck-add':[['window','response-after-real-opponent-add-outside-draw'],['cost','send-self-hand-to-gy']],
 '9657:detach-banish-damage':[['result','burn-based-on-own-banished-monsters'],['cost','detach-one-xyz-material']],
 '11243:quick-tribute-banish-lock':[['window','opponent-turn-quick-window'],['cost','tribute-this-copy']],
 '12870:continuous-negate-counters':[['mode','not_activated'],['result','negate-activated-effects-of-marked-opponent-monsters']],
 '12950:hand-deck-effect-negate':[['cost','discard-self-hand-to-gy'],['result','negate-effect-not-activation']],
 '13081:quick-negate-special-summon-activation':[['usage','no-opt-in-official-text'],['result','negate-activation-destroy-optional-dd-atk']],
 '13619:opponent-gy-banish-name-negate':[['target','target-monster-opponent-gy'],['result','banish-on-resolution-then-name-negate']],
 '15296:opponent-main-phase-activated-monster-effect-choice':[['window','self-main-after-opponent-monster-effect'],['target','choose-exactly-one-of-three-modes']],
 '15299:send-other-cards-negate-monsters':[['cost','send-n-other-own-hand-field-cards-to-gy'],['target','choose-n-opponent-effect-monsters-on-resolution-not-target']],
 '16845:fusion-hand-field-procedure':[['target','three-distinct-names-at-least-one-hand-one-field']],
 '16845:fusion-summon-draw-destroy':[['target','choose-opponent-cards-on-resolution-not-target'],['result','draw-unknown-from-hand-materials-destroy-by-field-materials']],
 '19184:alternative-xyz-highest-atk':[['window','self-open-summon-window-this-or-next-turn-after-opponent-two-extra-summons'],['usage','no-activation-summon-lock']],
 '19184:continuous-3000-activation-lock':[['mode','not_activated'],['result','both-players-3000-atk-effect-lock']],
 '19188:quick-observed-activation-temporary-banish':[['target','target-two-faceup-monsters-one-own'],['result','temporarily-banish-then-return-end']],
 '19360:special-five-distinct-names':[['cost','shuffle-five-other-distinct-own-memento-hand-gy-as-summon-procedure'],['mode','not_activated']],
 '19360:continuous-attack-each-monster-alone':[['result','attack-each-opponent-monster-once']],
 '19360:opponent-activation-revive-memento':[['usage','once-per-turn-per-faceup-copy'],['mode','triggered_chain']],
 '19361:destroyed-field-target-three-faceup':[['target','target-exactly-three-faceup-including-own-memento']],
 '19362:main-destroy-memento-send-level-total':[['cost','none'],['result','destroy-then-send-level-sum-bounded']],
 '19363:on-summon-discard-destroy-spelltrap':[['cost','discard-own-memento-hand-to-gy'],['target','target-opponent-spelltrap']],
 '19364:gy-target-destroy-revive-level2':[['cost','none'],['target','target-own-memento-gy-level2-or-less']],
 '19365:opponent-main-discard-control-monster':[['window','opponent-main-quick-window-with-own-creation'],['cost','discard-self-hand-to-gy']],
 '19366:quick-discard-target-protection':[['cost','discard-self-hand-to-gy'],['result','own-mementos-untargetable-rest-turn']],
 '19367:end-set-memento-spelltrap':[['window','self-end-phase'],['usage','once-per-turn-per-faceup-copy']],
 '19368:gy-banish-piercing':[['cost','banish-self-from-gy'],['target','target-own-memento-monster']],
 '19472:sent-by-memento-monster-gy-special':[['window','trigger-sent-by-own-memento-monster-effect']],
 '19878:on-fusion-destroy-search-two':[['result','destroy-then-search-up-to-two']],
 '19904:quick-play-fusion':[['target','choose-fusion-materials-hand-field-including-memento-plus-own-gy-memento-if-own-possession-destroyed-by-effect']],
 '19904:gy-banish-destroy-search-spelltrap':[['cost','banish-self-from-gy'],['result','destroy-then-search']],
 '19932:pointed-opponent-material-link5':[['target','target-opponent-faceup-pointed-monster'],['result','authorize-opponent-material-only-for-link5-this-turn']],
 '20196:gy-shuffle-light-fiend-self-revive':[['cost','shuffle-other-light-fiend-from-gy-to-deck'],['result','self-revive']],
 '20199:on-summon-fusion-memento':[['result','fusion-summon-memento']],
 '20206:hand-discard-draw-opponent-hand-summons':[['window','quick-window-with-no-own-cards'],['usage','mulcharmy-shared-turn-group']],
 '20216:same-chain-effect-restriction':[['mode','not_activated'],['result','block-quick-and-fusion-trigger-in-same-chain']],
 '20216:quick-equal-destroy':[['target','target-equal-own-memento-monsters-and-opponent-cards'],['cost','none']],
 '20225:special-summon-name-once':[['usage','one-special-summon-per-name-per-turn']],
 '20225:quick-main-tribute-fiendsmith-summon':[['cost','tribute-self-field-to-gy'],['usage','no-opt-in-official-text']],
 '20226:main-gy-fusion':[['cost','none-material-procedure-on-resolution'],['result','shuffle-gy-fusion-summon']],
 '20389:standby-pay500-or-destroy':[['mode','not_activated'],['cost','pay500-lp-or-self-destruct-maintenance']],
 '20423:hand-sent-activation-trigger-choice':[['window','trigger-monster-sent-hand-to-gy-for-activation'],['result','equip-plus500-or-draw-one']],
 '20491:gy-on-own-memento-destruction-revive':[['window','trigger-own-memento-in-hand-or-faceup-field-destroyed']],
 '20500:hand-discard-draw-opponent-deck-extra-summons':[['window','quick-window-with-no-own-cards'],['usage','mulcharmy-shared-turn-group']],
 '20533:quick-tribute-summon-goblin-from-deck':[['cost','tribute-one-own-monster']],
 '20533:gy-banish-detach-atk-reduction':[['cost','banish-self-from-gy-and-detach-n-goblin-xyz-materials']],
 '20764:hand-discard-draw-opponent-gy-banish-summons':[['window','quick-window-with-no-own-cards'],['usage','mulcharmy-shared-turn-group']],
 '21203:initial-main-banish-cost-bounce':[['cost','none-resource-banish-on-resolution'],['target','target-one-or-more-faceup-field-cards']],
 '21203:cannot-negate-activation-or-effect':[['mode','not_activated'],['result','cannot-negate-activation-or-effect']]
});
function between(s,lo,hi){
 const i=s.indexOf(lo),j=s.indexOf(hi,i+lo.length);
 a(i>=0&&j>i,'MISSING_SECTION_'+lo);
 return s.slice(i,j);
}
function cells(s){return s.split('|').slice(1,-1).map(x=>x.trim().replace(/^\x60|\x60$/g,''));}
function sourceCid(field,cid){
 a(field.includes(OFFICIAL+cid),'OFFICIAL_CID_NOT_LINKED_'+cid);
}
function audit({deckId,assigned,packagePath,documentPath}){
 a(assigned===true&&deckId===671,'USER_ASSIGNED_671_REQUIRED');
 const packageFile=path.resolve(packagePath),docFile=path.resolve(documentPath);
 a(packageFile.startsWith(DECKS)&&docFile.startsWith(DECKS)
  &&path.dirname(path.dirname(packageFile))===path.dirname(docFile),'SCOPE_NOT_MEMENTO_FOLDER');
 const pkg=JSON.parse(fs.readFileSync(packageFile,'utf8')),md=fs.readFileSync(docFile,'utf8');
 a.equal(pkg.schema,'station-x-deck-package/1');a.equal(pkg.deck_id,671);
 a.equal(pkg.record.deck_id,671);a.equal(pkg.record.format,'tcg_advanced');
 const counts={main:0,extra:0,side:0,reserve:0},cards=new Map();
 for(const c of pkg.record.cards){
  a(!cards.has(c.cid),'DUPLICATE_CARD_CID');cards.set(c.cid,c);
  for(const slot of c.slots)counts[slot.section]+=slot.quantity;
 }
 a.deepEqual(counts,{main:41,extra:15,side:14,reserve:0});a.equal(cards.size,39);
 const registry=between(md,'### A05.6 —','### A05.6.1 —');
 const causal=between(md,'### A05.7 —','### A05.8 —');
 const typed=between(md,'### A07.7 —','### A07.8 —');
 const ids=[...registry.matchAll(/^\s+- \x60(671:a05:(\d+):[a-z0-9-]+)\x60 · \*\*[A-Z_]+\*\* ·/gm)];
 const blocks=[...causal.matchAll(/^#### (\d+)\. \x60(671:a05:(\d+):[a-z0-9-]+)\x60 · CID (\d+) \([A-Z_]+\)/gm)];
 const rows=[...typed.matchAll(/^\| \x60(671:a05:(\d+):[a-z0-9-]+)\x60 \|([^\n]+)$/gm)];
 a.equal(ids.length,94,'94_CLAUSES_REQUIRED');a.equal(blocks.length,94,'94_CAUSAL_SEMANTICS_REQUIRED');
 a.equal(rows.length,94,'94_TYPED_EFFECTS_REQUIRED');
 // A05.7 is ordered by tactical importance, not by CID. Reconcile by effect_id,
 // while proving its own 94 ordinals are stable and contain no duplicate entries.
 const causalById=new Map();
 for(let i=0;i<blocks.length;i++){
  const block=blocks[i],id=block[2],next=blocks[i+1]?.index??causal.length;
  a.equal(Number(block[1]),i+1,'UNSTABLE_CAUSAL_ORDINAL_'+i);
  a(!causalById.has(id),'DUPLICATE_CAUSAL_EFFECT_'+id);
  causalById.set(id,{block,body:causal.slice(block.index,next)});
 }
 const ccount={activated:0,triggered:0,notActivated:0,procedure:0,maintenance:0,activationCost:0,activationTargets:0,softOpt:0};
 let reviewedFields=0,checkedSpecialRules=0;
 for(let i=0;i<94;i++){
  const n=i+1,reg=ids[i],row=rows[i],cid=Number(reg[2]),id=reg[1];
  const causalEntry=causalById.get(id);
  a(causalEntry,'CAUSAL_EFFECT_NOT_FOUND_'+id);
  const {block,body:causalText}=causalEntry;
  a.equal(row[1],id,'TYPED_REORDERED_'+n);
  a.equal(Number(block[3]),cid);a.equal(Number(block[4]),cid);a(cards.has(cid),'FOREIGN_ACTOR_'+cid);
  const v=cells(row[0]);a.equal(v.length,9,'A07_NOT_NINE_COLS_'+n);
  const [effect,type,zone,window,cost,target,usage,result,source]=v;
  const kind=type.match(/^\x60?([A-Z_]+)\x60? \/ \x60?([a-z_]+)\x60?$/);
  a(kind,'INVALID_TYPE_'+n);
  const mode=kind[2],manual=NONCHAIN.has(n)?'not_activated':TRIGGER.has(n)?'triggered_chain':'activated_chain';
  a.equal(mode,manual,'INDEPENDENT_PSCT_CHAIN_MISMATCH_'+id);
  const expectedCost=COST_PAID_AT_ACTIVATION.has(n);
  const actualCost=mode!=='not_activated'&&!cost.startsWith('none')&&cost!=='';
  a.equal(actualCost,expectedCost,'ACTIVATION_VS_RESOLUTION_COST_MISMATCH_'+id);
  const actualTarget=target.startsWith('target-');
  a.equal(actualTarget,TARGET_AT_ACTIVATION.has(n),'TARGET_VS_RESOLUTION_SELECTION_MISMATCH_'+id);
  if(expectedCost)a(mode!=='not_activated','NONCHAIN_CANNOT_PAY_ACTIVATION_COST_'+id);
  if(PROCEDURE.has(n)){a.equal(kind[1],'PROCEDIMIENTO');a(cost.includes('procedure')||cost.includes('summon'),'MISSING_PROCEDURE_MATERIALS_'+id);ccount.procedure++;}
  if(MAINTENANCE.has(n)){a.equal(kind[1],'MANTENIMIENTO');a(mode==='not_activated','MAINTENANCE_MUST_NOT_OPEN_CHAIN');ccount.maintenance++;}
  if(SELF_COPY_SOFT_OPT.has(n)){
   a(/once-per-turn-per-(copy|faceup-copy)/.test(usage),'SOFT_OPT_MISLABELLED_HOPT_'+id);ccount.softOpt++;
  }
  if(mode==='activated_chain')ccount.activated++;
  else if(mode==='triggered_chain')ccount.triggered++;
  else ccount.notActivated++;
  if(expectedCost)ccount.activationCost++;
  if(actualTarget)ccount.activationTargets++;
  for(const label of ['Actor / estado inicial','Ventana / disparador','Coste o requisito previo',
   'Selección / targeting','Resolución','Uso, negación y restricciones','Estado posterior esperado','Fuente oficial']){
   const pattern='- **'+label+':** ';
   a(causalText.includes(pattern),'MISSING_CAUSAL_FIELD_'+label+'_'+id);reviewedFields++;
  }
  sourceCid(causalText,cid);sourceCid(source,cid);
  const check=HOPS[id.slice('671:a05:'.length)];
  if(check){
   const named={mode,zone,window,cost,target,usage,result};
   for(const [field,expected] of check)a.equal(named[field],expected,'OFFICIAL_PSCT_SPECIAL_GUARD_'+field+'_'+id);
   checkedSpecialRules++;
  }
  if(cid===19360&&id.endsWith('opponent-activation-revive-memento')){
   a(causalText.includes('soft OPT'),'CAUSAL_MUST_DISTINGUISH_SOFT_OPT');
  }
  if(cid===19184&&id.endsWith('alternative-xyz-highest-atk')){
   a(causalText.includes('turno siguiente'),'NEXT_TURN_MUST_BE_EVIDENT');
  }
  if(cid===19904&&id.endsWith('quick-play-fusion')){
   a(causalText.includes('al menos un Memento')&&causalText.includes('en tu posesión'),
    'FUSION_MUST_ALLOW_NONMEMENTO_MATERIAL_AND_GY_CONDITION');
  }
  if(cid===16845&&id.endsWith('fusion-summon-draw-destroy')){
   a(causalText.includes('exactamente'),'CHIMERA_DRAW_AND_DESTRUCTION_MUST_BE_EXACT');
  }
 }
 a.deepEqual(ccount,{activated:43,triggered:21,notActivated:30,procedure:17,maintenance:1,
  activationCost:22,activationTargets:20,softOpt:5});
 a(checkedSpecialRules>=40,'NOT_ENOUGH_MANUAL_OFFICIAL_GUARDS');
 a(!md.includes('A10B SOLICITADA'),'CALCULATOR_NOT_AUTHORIZED');
 return {ok:true,deck_id:671,format:'tcg_advanced',inventory:counts,cids:cards.size,
  clauses:94,semanticFieldsCrossChecked:reviewedFields,manualPSCTClassifications:94,
  sourceLinked:94,manualHighRiskEffects:checkedSpecialRules,...ccount,
  independentlyExecutedPaperCases:0,calculatorExecuted:false,tournamentLegal:false,
  certificationScope:'documentary_semantic_specification_not_duel_simulation'};
}
if(require.main===module){
 const args=process.argv.slice(2),files=args.filter(x=>!x.startsWith('--'));
 a.equal(files.length,2,'A05_PACKAGE_AND_CANONICAL_DOC_REQUIRED');
 console.log(JSON.stringify(audit({deckId:Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),
  assigned:args.includes('--user-assigned'),packagePath:files[0],documentPath:files[1]}),null,2));
}
module.exports=Object.freeze({audit});

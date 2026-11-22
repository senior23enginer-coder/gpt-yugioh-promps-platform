'use strict';
// Full 658-case typed source crosswalk for one assigned deck; no game engine.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR','decks')+path.sep;
const TYPES=['Z','W','C','T','U','N','F'];
function segment(s,a,b){const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert(i>=0&&j>i,'MISSING_SECTION');return s.slice(i,j);}
function parseRule(line){
 const x=line.split('|').slice(1,-1).map(s=>s.trim());
 assert.equal(x.length,9,'WRONG_EFFECT_COLUMNS');
 const id=x[0].match(/^\x60(\d+:a05:(\d+):[a-z0-9-]+)\x60$/);
 const k=x[1].match(/^\x60([A-Z_]+)\x60 \/ \x60([a-z_]+)\x60$/);
 assert(id&&k,'WRONG_EFFECT_ID_OR_KIND');
 const vals=x.slice(2,8).map(s=>{assert(/^\x60[^\x60]+\x60$/.test(s));return s.slice(1,-1);});
 const official=x[8].match(/\[CID (\d+)\]\((https:\/\/www\.db\.yugioh-card\.com\/yugiohdb\/card_search\.action\?cid=\d+&ope=2&request_locale=en)\)/);
 assert(official&&Number(official[1])===Number(id[2]),'WRONG_OFFICIAL_CID');
 return {id:id[1],cid:Number(id[2]),kind:k[1],mode:k[2],zone:vals[0],window:vals[1],cost:vals[2],target:vals[3],usage:vals[4],result:vals[5],source:official[2]};
}
function parseCases(line,fx,num){
 const parts=line.split('|').slice(1,-1).map(x=>x.trim());
 assert.equal(parts.length,10,'WRONG_PAPER_COLUMNS');
 assert(parts[0]==='E'+num+' / \x60'.replace('\\x60','\x60')+fx.id+'\x60','PAPER_RULE_MISMATCH');
 const arr=[];
 for(let i=0;i<7;i++){
  const id='671:A07:E'+num+':'+TYPES[i],prefix='\x60'+id+'\x60 ';
  const value=parts[i+2];assert(value.startsWith(prefix),'CASE_ID_NOT_STABLE_'+id);
  const status=value.slice(prefix.length).split(':')[0],reason=value.slice(prefix.length+status.length+1).trim();
  assert(['CONDICIONAL','NO_APLICA','NO_APLICA_TORNEO_ACTUAL','NO_APLICA_TORNEO_DECK_671','SIN_EVIDENCIA'].includes(status));
  assert(reason.length>10);
  arr.push({id,category:TYPES[i],status,reason});
 }
 return arr;
}
function paper(fx,x){
 const nonchain=fx.mode==='not_activated',target=fx.target.startsWith('target-'),
  choose=fx.target.startsWith('choose-'),cost=fx.cost!=='none'&&!fx.cost.startsWith('none-'),
  used=/once-per-turn|one-special-summon-per-name|mulcharmy-shared-turn/.test(fx.usage);
 const negative={Z:'actor_absent',W:nonchain?'no_effect_chain_exists':'window_or_event_absent',
  C:cost?'cost_not_available':'no_cost_negative_applicable',
  T:target?'target_absent':choose?'other_valid_choices_may_exist':'no_target_negative_applicable',
  U:used?'usage_limit_consumed':'no_written_opt',N:nonchain?'no_activation_to_negate':'negation_after_real_cost',
  F:'current_deck_not_tournament_legal'}[x.category];
 return {case_id:x.id,effect_id:fx.id,official_source:fx.source,
  classification:x.category,status:x.status,reason:x.reason,
  state_before:{actor:{cid:fx.cid,zone:fx.zone,uid:'cid-'+fx.cid+'#copy',physically_present_required:true,
    post_side_change_required:fx.zone.includes('post-side')},
   active_player:fx.window.includes('opponent')?'opponent':fx.window.includes('self')?'self':'contextual',
   phase_and_trigger:fx.window,chain:nonchain?'none':'requires_observed_window',
   usage_flag:fx.usage,hidden_cards:'unknown',spatial_slots:'not_certified'},
  action:{cost_stage:nonchain?'no_effect_activation':cost?'paid_at_activation':'none',
   activation_cost:nonchain?null:cost?fx.cost:null,
   materials_or_maintenance:nonchain?fx.cost:null,
   target_at_activation:target?fx.target:null,resolution_choice:choose?fx.target:null,
   result:fx.result,negative_mutation:negative},
  expected_state_after:{if_negated_costs_persist:nonchain?null:cost,
    if_negated_no_effect_resolution:nonchain?null:true,
    specific_zone_changes:'requires_independent_review',hidden_draw_cid:'not_inferred'},
  expected_legal:null,psct_certified:false,calculator_executed:false};
}
function audit({deckId,assigned,packageFile,curatedFile}){
 assert(assigned===true&&deckId===671,'USER_ASSIGNED_671_ONLY');
 const pf=path.resolve(packageFile),df=path.resolve(curatedFile);
 assert(pf.startsWith(DECKS)&&df.startsWith(DECKS)&&path.dirname(path.dirname(pf))===path.dirname(df),'DECK_SCOPE_VIOLATION');
 const pkg=JSON.parse(fs.readFileSync(pf,'utf8'));
 assert.equal(pkg.schema,'station-x-deck-package/1');assert.equal(pkg.deck_id,deckId);
 const physical=new Set(pkg.record.cards.map(c=>c.cid));assert.equal(physical.size,39);
 const s=fs.readFileSync(df,'utf8');
 const rules=segment(s,'### A07.7 —','### A07.8 —').split('\n').filter(x=>/^\| \x60671:a05:/.test(x)).map(parseRule);
 const lines=segment(s,'### A07.8 —','### A07.9 —').split('\n').filter(x=>/^\| E\d{3} \/ \x60671:a05:/.test(x));
 assert.equal(rules.length,94);assert.equal(lines.length,94);
 const result=[];
 for(let i=0;i<94;i++){
  const fx=rules[i];assert(physical.has(fx.cid),'EFFECT_NOT_LOADED_'+fx.cid);
  result.push(...parseCases(lines[i],fx,String(i+1).padStart(3,'0')).map(x=>paper(fx,x)));
 }
 assert.equal(result.length,658);assert.equal(new Set(result.map(x=>x.case_id)).size,658);
 const n=x=>result.filter(c=>c.status===x).length;
 assert.equal(n('CONDICIONAL'),369);
 assert.equal(n('NO_APLICA')+n('NO_APLICA_TORNEO_ACTUAL')+n('NO_APLICA_TORNEO_DECK_671'),289);
 assert.equal(result.filter(x=>x.classification==='F'&&x.status.startsWith('NO_APLICA_TORNEO')).length,94);
 const find=id=>rules.find(x=>x.id==='671:a05:'+id);
 assert.equal(find('19367:end-set-memento-spelltrap').usage,'once-per-turn-per-faceup-copy');
 assert.equal(find('19367:destroyed-own-monster-target-lower-revive').usage,'once-per-turn-by-name-effect');
 assert.equal(find('21203:initial-main-banish-cost-bounce').cost,'none-resource-banish-on-resolution');
 const manual=segment(s,'### A07.14 —','## APARTADO_08 —');
 const reviewed=[...manual.matchAll(/^\| \d{2} · \x60(671:a05:(\d+):[a-z0-9-]+)\x60 \|([^\n]+)$/gm)];
 assert.equal(reviewed.length,33,'A07_NOT_THIRTY_THREE_SOURCED_MANUAL_CASES');
 assert.equal(new Set(reviewed.map(m=>m[1])).size,33,'A07_DUPLICATED_MANUAL_REVIEW');
 for(const item of reviewed){
  const fx=rules.find(x=>x.id===item[1]);
  assert(fx&&fx.cid===Number(item[2]),'A07_UNKNOWN_SOURCED_CASE_'+item[1]);
  const line=item[0];
  assert(line.includes('cid='+fx.cid)&&line.includes('request_locale=en'),
   'A07_MANUAL_CASE_OFFICIAL_SOURCE_MISSING_'+item[1]);
  assert(line.split('|').filter(x=>x.trim()).length===5,'A07_MANUAL_CASE_NOT_POSITIVE_NEGATIVE_'+item[1]);
 }
 const additional=segment(s,'### A07.15 —','## APARTADO_08 —');
 const reviewedAdditional=[...additional.matchAll(/^\| \x60(671:a05:(\d+):[a-z0-9-]+)\x60 \|([^\n]+)$/gm)];
 assert.equal(reviewedAdditional.length,61,'A07_EXPECT_SIXTY_ONE_CONDITIONAL_PAIRS');
 assert.equal(new Set(reviewedAdditional.map(x=>x[1])).size,61,'A07_DUPLICATE_ADDITIONAL_PAIRS');
 const overlap=new Set([...reviewed.map(x=>x[1]),...reviewedAdditional.map(x=>x[1])]);
 assert.equal(overlap.size,94,'A07_NOT_ALL_NINETY_FOUR_CASE_FAMILIES');
 for(const m of reviewedAdditional){
   const fx=rules.find(x=>x.id===m[1]);
   assert(fx&&Number(m[2])===fx.cid,'A07_CONDITIONAL_PAIR_FOREIGN_EFFECT_'+m[1]);
   assert(m[0].includes('cid='+fx.cid),'A07_CONDITIONAL_PAIR_SOURCE_MISSING_'+m[1]);
   assert(m[0].split('|').filter(x=>x.trim()).length===5,
     'A07_CONDITIONAL_PAIR_MISSING_POSITIVE_NEGATIVE_'+m[1]);
 }
 return {ok:true,deck_id:deckId,card_cids:39,typed_effects:94,case_ids:658,manuallyReviewedPSCTScenarioFamilies:33,explicitlyConditionedScenarioFamilies:61,
  completePositiveNegativeEffectFamilies:94,
  conditional:369,not_applicable:289,
  format_cases_blocked:94,source_and_timing_and_cost_and_target_and_usage_present_for_all:true,
  independently_legal_cases:0,calculator_executed:false};
}
if(require.main===module){
 const a=process.argv.slice(2),files=a.filter(x=>!x.startsWith('--'));
 assert.equal(files.length,2);
 console.log(JSON.stringify(audit({deckId:Number(a.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),
   assigned:a.includes('--user-assigned'),packageFile:files[0],curatedFile:files[1]}),null,2));
}
module.exports=Object.freeze({audit});
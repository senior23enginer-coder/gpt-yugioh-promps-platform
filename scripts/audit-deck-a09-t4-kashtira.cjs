'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const p=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE/datos/stationx-deck.json'),'utf8'));
function audit(){
 const r=p.record,s=r.a09_review.endboard_review;
 A(s&&s.schema==='station-x-a09-final-board-review/1'&&s.deck_id===665);
 A(s.status==='FINAL_DOCUMENTAL_CON_ESTADOS_ESPACIALES_PENDIENTES');
 A.equal(s.review.length,16);
 A.equal(r.routes.length,16);A.equal(r.cards.length,38);A.equal(p.inventory.length,44);
 const cards=new Map(r.cards.map(c=>[c.cid,c]));
 let resourceFinal=0,temporallyDisambiguated=0;
 for(let i=0;i<16;i++){
  const route=r.routes[i],review=s.review[i];
  A.equal(route.id,review.route_id);A.equal(review.source,'record.routes['+i+'].result');
  A.equal(review.source_result_length,route.result.length);
  A.equal(review.source_endboard_photo_count,(route.board||[]).length);
  A(review.presentation_status==='DOCUMENTADA_SIN_CAMPO_ESPACIAL');
  A(review.status==='REVISADO_DOCUMENTALMENTE_CONDICIONAL');
  A(review.independent_exact_monster_slots_verified===false);
  A(review.material_copy_identity_verified===false);
  A(review.procedural_engine_replay_verified===false);
  A.equal(review.final_step_resources_are_structured,!!route.steps.at(-1).resources?.length);
  if(review.final_step_resources_are_structured)resourceFinal++;
  const freq=new Map();
  for(const cid of review.on_field_cids_from_narrative)freq.set(cid,(freq.get(cid)||0)+1);
  const targets=new Set();
  for(const xyz of review.xyz_materials_from_narrative){
   A(!targets.has(xyz.target),'Xyz_DUPLICATE');targets.add(xyz.target);
   A(cards.get(xyz.target)?.slots.some(x=>x.section==='extra'),'XYZ_TARGET_NOT_EXTRA');
   for(const cid of xyz.materials)freq.set(cid,(freq.get(cid)||0)+1);
  }
  for(const [cid,count] of freq){
   const c=cards.get(cid);A(c,'FOREIGN_CID');
   const available=c.slots.filter(x=>['main','extra'].includes(x.section)).reduce((n,x)=>n+x.quantity,0);
   A(count<=available,'COPY_EXCEEDS_DECK_'+cid);
  }
  if(review.link_materials_from_narrative){
   const l=review.link_materials_from_narrative;
   A(l.target===15741&&l.own.length===3&&l.opponent_unknown===1&&l.total_link_rating===5);
   A(!Object.hasOwn(l,'opponent_cid'),'DO_NOT_INVENT_ENEMY_ID');
  }
  const boardIds=(route.board||[]).map(x=>Number((x.image||'').match(/\/(\d+)\.jpg$/)?.[1])).filter(Boolean);
  if(i===13||i===14){
   A(review.source_board_time==='DESPUES_DE_STANDBY_RIVAL_CONDICIONAL');
   A(review.next_rival_standby_conditional);
   A(route.endboard?.variants?.[0]?.label.includes('Standby'),'MISSING_TEMPORAL_PROVENANCE');
   temporallyDisambiguated++;
  }else{
   A(boardIds.every(cid=>review.on_field_cids_from_narrative.includes(cid)),'BOARD_PHOTO_NOT_SUPPORTED');
  }
 }
 A.equal(resourceFinal,5);A.equal(temporallyDisambiguated,2);
 A.deepEqual(s.summary,{routes:16,source_result_sections:16,spatial_monster_slots_verified:0,
  endboards_engine_verified:0,with_full_final_step_resource_snapshot:5,
  pending_exact_positions:16,no_invented_board_slots:true});
 A.equal(r.a09_review.summary.certified_combos,0);
 A(!r.calculator?.rules?.length);
 return {ok:true,stage:'A09-T4-PREFLIGHT',routes_reviewed:16,full_final_state_sources:5,missing_final_8zones:11,spatial_endboards_verified:0,temporally_separated:2,stage_closed:false};
}
if(require.main===module)console.log(JSON.stringify(audit()));
module.exports={audit};

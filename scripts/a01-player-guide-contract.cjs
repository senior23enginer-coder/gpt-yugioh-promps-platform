'use strict';
/** Strong, opt-in player-facing guide contract. No deck is analysed by this module. */
const assert=require('node:assert/strict');
const VERSION='station-x-player-guide/1';
const PHASES=['first','second','mid','late'];
const BAD=/\bCID\s*\d+\b|\b[CV]\d{2}\b|\bA(?:0[1-9]|10[AB]?)\s*[-–]?\s*T?\d*\b|\beffect_id\b|\broute_id\b|PARCIAL_AVANZADO|dictamen\s+editorial|PENDIENTE_REPLAY|cat[aá]logo completo|consultar el plan|estudio individual|iteraci[oó]n\s*\d+|cobertura\s+documental|validaci[oó]n\s+observada|evaluaci[oó]n\s+editorial|no\s+(?:escribir|redactar|inferir|inventar)\b|informe\s+de\s+auditor[ií]a|\b\d+\s+de\s+\d+\s+decks\b/iu;
const quality=(value,min,key)=>{
 assert(typeof value==='string'&&value.trim()===value&&value.length>=min,'A01_PLAYER_TEXT_MISSING_'+key);
 assert(!BAD.test(value),'A01_PLAYER_AUDIT_LEAK_'+key);
};
const STRATEGY_SCHEMA='station-x-player-strategy/1';
const SECTION_IDS=['first','second','mid','late','weak_hand','disruption','win_condition','common_errors'];
function validateStrategy(record){
 const strategy=record?.player_guide?.strategy;
 assert.equal(strategy?.schema,STRATEGY_SCHEMA,'A01_STRATEGY_REQUIRED');
 assert(Array.isArray(strategy.sections)&&strategy.sections.length===SECTION_IDS.length,'A01_EIGHT_SECTIONS_REQUIRED');
 assert.deepEqual(strategy.sections.map(s=>s.id),SECTION_IDS,'A01_STRATEGY_SECTION_ORDER');
 const cards=new Map((record.cards||[]).map(c=>[c.cid,c]));
 const routes=new Set((record.routes||[]).map(r=>r.id));
 const objectives=new Set(), actionLists=new Set();
 for(const section of strategy.sections){
   for(const key of ['title','objective','situation','expected_result','resources_to_keep','alternative'])
     quality(section[key],key==='title'?6:20,section.id+'_'+key);
   assert(!objectives.has(section.objective),'A01_DUPLICATE_OBJECTIVE');objectives.add(section.objective);
   assert(Array.isArray(section.card_cids)&&section.card_cids.length>0&&new Set(section.card_cids).size===section.card_cids.length,'A01_STRATEGY_CARD_REFS');
   for(const cid of section.card_cids)assert(Number.isInteger(cid)&&cards.get(cid)?.slots?.some(s=>['main','extra'].includes(s.section)),'A01_STRATEGY_CARD_NOT_ACTIVE');
   assert(Array.isArray(section.actions)&&section.actions.length>=2&&section.actions.length<=7,'A01_STRATEGY_ACTIONS');
   assert.equal(new Set(section.actions).size,section.actions.length,'A01_DUPLICATE_ACTION');
   for(const action of section.actions)quality(action,15,section.id+'_action');
   const signature=section.actions.join('|');assert(!actionLists.has(signature),'A01_DUPLICATE_SECTION_ACTIONS');actionLists.add(signature);
   assert(Array.isArray(section.related_route_ids)&&new Set(section.related_route_ids).size===section.related_route_ids.length,'A01_STRATEGY_ROUTE_REFS');
   for(const id of section.related_route_ids)assert(typeof id==='string'&&routes.has(id),'A01_STRATEGY_UNKNOWN_ROUTE');
 }
 // Structural validation alone is deliberately not semantic acceptance.
 return {ok:true,sections:strategy.sections.length,semanticReview:false};
}
function validatePlayerGuide(record){
 assert.equal(record?.player_guide?.schema,VERSION,'A01_PLAYER_GUIDE_CONTRACT_REQUIRED');
 const g=record.player_guide, cards=record.cards||[], routes=record.routes||[];
 const byCid=new Map(cards.map(c=>[c.cid,c]));
 const byRoute=new Set(routes.map(r=>r.id));
 const p=record.profile||{};
 for(const field of ['Arquetipo','Tipo de estrategia','Estilo breve','Resumen para ficha','Cómo se juega','Qué vigilar'])
   quality(p[field],field==='Cómo se juega'?400:field==='Qué vigilar'?15:8,field);
 assert(!/(?:^|\n)\s*\*?\*?Dictamen/i.test(p['Cómo se juega']),'A01_PLAYER_EDITORIAL');
 assert(Array.isArray(g.featured_cards)&&g.featured_cards.length>=1&&g.featured_cards.length<=4,'A01_FEATURED_REQUIRED');
 const featured=new Set();
 for(const f of g.featured_cards){
   assert(Number.isInteger(f.cid)&&byCid.has(f.cid),'A01_FEATURED_UNKNOWN_CID');
   assert(!featured.has(f.cid),'A01_FEATURED_DUPLICATED');featured.add(f.cid);
   assert(byCid.get(f.cid).slots?.some(s=>['main','extra'].includes(s.section)),'A01_FEATURED_UNAVAILABLE');
   quality(f.role,15,'role');quality(f.reason,35,'reason');quality(f.when_to_use,30,'when_to_use');
   assert(Array.isArray(f.related_cids),'A01_RELATED_CIDS_REQUIRED');
   for(const cid of f.related_cids)assert(Number.isInteger(cid)&&byCid.has(cid),'A01_RELATED_CID_UNKNOWN');
 }
 assert(Array.isArray(g.phases)&&g.phases.length===4,'A01_FOUR_PHASES_REQUIRED');
 assert.deepEqual(g.phases.map(x=>x.id).sort(),[...PHASES].sort(),'A01_PHASES_MISMATCH');
 for(const phase of g.phases){
   quality(phase.title,6,'phase_title');
   quality(phase.plan,100,'phase_plan');
   quality(phase.preconditions,35,'preconditions');
   quality(phase.risks,35,'risks');
   assert(Array.isArray(phase.related_route_ids),'A01_PHASE_ROUTES_REQUIRED');
   for(const id of phase.related_route_ids)assert(typeof id==='string'&&byRoute.has(id),'A01_PHASE_UNKNOWN_ROUTE');
 }
 if(g.strategy)validateStrategy(record);
 return {ok:true,schema:VERSION,featured:featured.size,phases:g.phases.length,strategy:!!g.strategy,semanticReview:false};
}
module.exports={VERSION,STRATEGY_SCHEMA,SECTION_IDS,validatePlayerGuide,validateStrategy};

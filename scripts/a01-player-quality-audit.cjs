'use strict';
// Explicit 16-deck scope; source audit only, never certifies gameplay or rewrites data.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {validatePlayerGuide,validateStrategy}=require('./a01-player-guide-contract.cjs');
const {validateProfile,assertSourceParity}=require('./a01-profile-contract.cjs');
const root=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks');
const ids=[653,671,677,665,650,656,670,684,687,660,673,699,704,705,706,707];
const folders=new Map();
for(const folder of fs.readdirSync(root)){const file=path.join(root,folder,'datos/stationx-deck.json');if(!fs.existsSync(file))continue;const p=JSON.parse(fs.readFileSync(file,'utf8'));if(ids.includes(p.deck_id)){assert(!folders.has(p.deck_id));folders.set(p.deck_id,{p,folder});}}
const report=[],evidence=[];
for(const id of ids){
 const {p,folder}=folders.get(id)||{};assert(p,'missing assigned deck '+id);
 const r=p.record;assert.equal(r.deck_id,id);
 const counts={main:0,extra:0,side:0,reserve:0};for(const card of r.cards)for(const slot of card.slots)counts[slot.section]+=slot.quantity;
 const slots=rows=>rows.map(s=>[Number(s.id),s.section,Number(s.quantity)].join(':')).sort();
 const native=r.cards.flatMap(c=>c.slots.map(s=>({id:s.card_id,section:s.section,quantity:s.quantity})));
 assert.deepEqual(slots(p.inventory),slots(native));
 assert(counts.main>0);if(!['goat','rush','rush_duel'].includes(r.format))assert(counts.extra>0);
 const md=fs.readFileSync(path.join(root,folder,folder+'_CONTENIDO_CURADO.md'),'utf8');
 let structure='PASS',quality='PENDING';
 try{validateProfile(r);assertSourceParity(r,md);validatePlayerGuide(r);}catch(e){structure=e.message;}
 try{validateStrategy(r);quality='STRUCTURE_ONLY_REQUIRES_SEMANTIC_AND_BROWSER_REVIEW';}catch(e){quality=e.message;}
 const legacyKeys=['delivery_progress','rule_scenarios','general_rules','format_context','delivery_dossier','delivery_v21'].filter(k=>r[k]&&(!(Array.isArray(r[k]))||r[k].length));
 const details={deck_id:id,folder,name:r.name,format:r.format,counts,structure,quality,legacyKeys,closure:'REOPENED_NO_FUNCTIONAL_CERTIFICATION',cards:r.cards.length,routes:r.routes.length};
 report.push(details);
 evidence.push({ ...details, profile:r.profile,featured:r.player_guide?.featured_cards, phases:r.player_guide?.phases,inventory:r.cards.map(c=>({cid:c.cid,name:c.name,slots:c.slots.map(s=>({section:s.section,quantity:s.quantity})),role:c.role,sources:c.sources})),route_details:r.routes.map(t=>({id:t.id,title:t.title,opening:t.opening,result:t.result,steps:t.steps.map(s=>({action:s.action,detail:s.detail})),interruptions:t.interruptions,variants:t.variants})),context:r.format_context,decisions:r.decisions });
 console.log(JSON.stringify(details));
}
assert.equal(report.length,16);
fs.mkdirSync(path.resolve(__dirname,'../outputs'),{recursive:true});
fs.writeFileSync(path.resolve(__dirname,'../outputs/a01-quality-audit.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.resolve(__dirname,'../outputs/a01-source-evidence.json'),JSON.stringify(evidence,null,2)+'\n');
// Condensed source for manual review. Never substitutes this for checking effects and conditions.
for(const e of evidence) console.log('A01_EVIDENCE '+JSON.stringify({deck_id:e.deck_id,featured:e.featured,phases:e.phases,routes:e.route_details.map(r=>({id:r.id,title:r.title,opening:r.opening,result:r.result,steps:r.steps.slice(0,4).map(s=>s.action)})),inventory:e.inventory.map(c=>({cid:c.cid,name:c.name,slots:c.slots}))}));

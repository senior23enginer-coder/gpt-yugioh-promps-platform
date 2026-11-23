'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validatePlayerGuide}=require('./a01-player-guide-contract.cjs');
const {validateProfile,assertSourceParity}=require('./a01-profile-contract.cjs');
const folder=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks/DECK_NUEVO_13_CRISTRON_HORUS');
const pkg=JSON.parse(fs.readFileSync(path.join(folder,'datos/stationx-deck.json'),'utf8'));
const md=fs.readFileSync(path.join(folder,'DECK_NUEVO_13_CRISTRON_HORUS_CONTENIDO_CURADO.md'),'utf8');
assert.equal(pkg.deck_id,677);
assert.equal(pkg.record.deck_id,677);
assert.equal(pkg.record.format,'tcg_advanced');
assert.equal(pkg.inventory_binding,'deck-slots-v1');
assert.equal(pkg.content_mode,'structured');
assert.equal(pkg.record.cards.length,39);
assert.equal(pkg.record.routes.length,14);
assert.equal(validateProfile(pkg.record).fields,6);
assert.equal(assertSourceParity(pkg.record,md).fields,6);
assert.equal(validatePlayerGuide(pkg.record).featured,4);
assert.equal(validatePlayerGuide(pkg.record).phases,4);
const allRows=pkg.record.cards.flatMap(c=>c.slots.map(s=>({
  id:s.card_id,section:s.section,quantity:s.quantity
})));
const sort=rows=>rows.map(r=>[r.id,r.section,r.quantity].join(':')).sort();
assert.deepEqual(sort(allRows),sort(pkg.inventory.map(r=>({id:r.id,section:r.section,quantity:r.quantity}))));
const counts={main:0,extra:0,side:0,reserve:0};
for(const row of pkg.inventory)counts[row.section]+=row.quantity;
assert.deepEqual(counts,{main:40,extra:15,side:15,reserve:0});
const copy=o=>JSON.parse(JSON.stringify(o));
const negative=fn=>{const x=copy(pkg.record);fn(x);assert.throws(()=>validatePlayerGuide(x));};
negative(x=>x.player_guide.featured_cards[0].cid=99999);
negative(x=>x.player_guide.phases[0].related_route_ids.push('677:A09:UNKNOWN'));
negative(x=>x.player_guide.phases.pop());
negative(x=>x.profile['Cómo se juega']+=' CID 12608');
negative(x=>x.profile['Resumen para ficha']='Consultar el plan');
console.log(JSON.stringify({ok:true,deck_id:677,profile_fields:6,
  featured_cards:4,phases:4,card_identities:39,routes:14,counts,
  negative_cases:5,production_imports:0}));

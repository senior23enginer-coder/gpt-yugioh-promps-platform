'use strict';
const assert=require('node:assert/strict');
const {validateDeckAssignment:check}=require('./analysis-eligibility.cjs');
// Admission checks do not run any A01 task or import any ZIP.
const make=()=>({
  deck_id:13579,format:'tcg_advanced',
  inventory:[{id:1,section:'main',quantity:40},{id:2,section:'extra',quantity:15},
    {id:3,section:'side',quantity:15}],
  record:{deck_id:13579,format:'tcg_advanced',
    cards:[{slots:[{card_id:1,section:'main',quantity:40},
      {card_id:2,section:'extra',quantity:15},
      {card_id:3,section:'side',quantity:15}]}]},
});
const verdict=(payload,selectedDeckId=13579,explicitlyAssigned=true,stageId='A01')=>
  check({selectedDeckId,explicitlyAssigned,payload,stageId});
assert(verdict(make()).eligible,'Main+Extra and optionally Side are eligible');
assert.deepEqual(verdict(make()).requiredSections,['main','extra']);
assert.deepEqual(verdict(make()).optionalSections,['side','reserve']);
assert(!verdict(make(),13579,false).eligible,'Explicit user deck assignment is always required');
assert(!verdict(make(),13580).eligible,'Never infer a deck from another id');
assert(!verdict(null).eligible,'Missing package must block admission');
for(const stage of ['A01','A02','A03','A04','A05','A06','A07','A08','A09','A10A']){
  const emptySide=make();emptySide.inventory.pop();emptySide.record.cards[0].slots.pop();
  const accepted=verdict(emptySide,13579,true,stage);
  assert(accepted.eligible,'Side is optional in '+stage);
  assert.equal(accepted.counts.side,0,'Side must not be fabricated');
}
for(const section of ['main','extra']){
  const p=make();
  p.inventory=p.inventory.filter(x=>x.section!==section);
  p.record.cards[0].slots=p.record.cards[0].slots.filter(x=>x.section!==section);
  const r=verdict(p);
  assert(!r.eligible && r.violations.includes('REQUIRED_'+section.toUpperCase()+'_NOT_LOADED'),
    section+' must remain mandatory');
}
const reserve=make();reserve.inventory.push({id:4,section:'reserve',quantity:2});
reserve.record.cards[0].slots.push({card_id:4,section:'reserve',quantity:2});
assert(verdict(reserve).eligible,'Optional Reserve is preserved');
const onlyMainAndExtra=make();onlyMainAndExtra.inventory.pop();onlyMainAndExtra.record.cards[0].slots.pop();
assert(verdict(onlyMainAndExtra).eligible,'Main+Extra only must pass');
const noSlots=make();noSlots.record.cards[0].slots.pop();
assert(verdict(noSlots).violations.includes('INVENTORY_RECORD_SLOTS_MISMATCH'),
  'Native and portable slots must match');
const duplicate=make();duplicate.inventory.push({...duplicate.inventory[0]});
assert(!verdict(duplicate).eligible,'Duplicate physical card slots rejected');
const zero=make();zero.inventory[2].quantity=0;zero.record.cards[0].slots[2].quantity=0;
assert(!verdict(zero).eligible,'Invalid zero-quantity rows are rejected even in optional sections');
const wrongFormat=make();wrongFormat.record.format='rush_duel';
assert(!verdict(wrongFormat).eligible,'Format mismatch must block');
const missingFormat=make();delete missingFormat.record.format;delete missingFormat.format;
assert(!verdict(missingFormat).eligible,'Missing format must block');
const unsupportedZone=make();unsupportedZone.inventory[2].section='unknown';
unsupportedZone.record.cards[0].slots[2].section='unknown';
assert(!verdict(unsupportedZone).eligible,'Unknown section cannot be accepted');
console.log(JSON.stringify({ok:true,required:['main','extra'],optional:['side','reserve'],
  stageCases:10,analysisExecuted:false,syntheticFixturesOnly:true}));

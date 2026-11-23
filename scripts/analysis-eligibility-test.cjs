'use strict';
const assert=require('node:assert/strict');
const {validateDeckAssignment:check}=require('./analysis-eligibility.cjs');
const make=()=>({
 deck_id:13579,format:'tcg_advanced',
 inventory:[
  {id:1,section:'main',quantity:40},{id:2,section:'extra',quantity:15},
  {id:3,section:'side',quantity:15}
 ],
 record:{deck_id:13579,format:'tcg_advanced',
 cards:[{slots:[{card_id:1,section:'main',quantity:40},
                  {card_id:2,section:'extra',quantity:15},
                  {card_id:3,section:'side',quantity:15}]}]}
});
const verdict=(payload,selectedDeckId=13579,explicitlyAssigned=true)=>
  check({selectedDeckId,explicitlyAssigned,payload});
assert(verdict(make()).eligible,'An explicitly selected deck with all required sections is eligible');
assert(!verdict(make(),13579,false).eligible,'No analysis without an explicit user assignment');
assert(!verdict(make(),13580).eligible,'Never substitute a similar deck by name or ID');
assert(!verdict(null).eligible,'Do not analyze an uncaptured deck');
for(const section of ['main','extra','side']){
 const p=make();p.inventory=p.inventory.filter(row=>row.section!==section);
 p.record.cards[0].slots=p.record.cards[0].slots.filter(row=>row.section!==section);
 const result=verdict(p);
 assert(!result.eligible && result.violations.includes('REQUIRED_'+section.toUpperCase()+'_NOT_LOADED'),
  section+' is mandatory even if the other two have data');
}
const withReserve=make();withReserve.inventory.push({id:4,section:'reserve',quantity:2});
withReserve.record.cards[0].slots.push({card_id:4,section:'reserve',quantity:2});
assert(verdict(withReserve).eligible,'Reserve may be loaded but is not mandatory');
const noSlots=make();noSlots.record.cards[0].slots.pop();
assert(verdict(noSlots).violations.includes('INVENTORY_RECORD_SLOTS_MISMATCH'),
  'Real native rows and portable package must agree');
const duplicate=make();duplicate.inventory.push({...duplicate.inventory[0]});
assert(!verdict(duplicate).eligible,'Duplicate native rows cannot enter analysis');
const zero=make();zero.inventory[2].quantity=0;zero.record.cards[0].slots[2].quantity=0;
assert(!verdict(zero).eligible,'An empty Side section is not treated as loaded');
const a01MissingSide=make();
a01MissingSide.inventory=a01MissingSide.inventory.filter(x=>x.section!=='side');
a01MissingSide.record.cards[0].slots=a01MissingSide.record.cards[0].slots.filter(x=>x.section!=='side');
const explicitA01=check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,stageId:'A01',authorizedSideOmissionForA01:true});
assert(explicitA01.eligible&&explicitA01.a01SideWaiverApplied&&explicitA01.counts.side===0,'Explicit A01 exception preserves Side=0');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,stageId:'A02',authorizedSideOmissionForA01:true}).eligible,'Never waive A02 Side');
const explicitA02=check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A02',authorizedSideOmissionForA02:true});
assert(explicitA02.eligible&&explicitA02.a02SideWaiverApplied&&explicitA02.counts.side===0,'Explicit A02-only exception preserves Side=0');
assert(!check({selectedDeckId:13579,explicitlyAssigned:false,payload:a01MissingSide,
 stageId:'A02',authorizedSideOmissionForA02:true}).eligible,'A02 still requires assignment');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A03',authorizedSideOmissionForA02:true}).eligible,'Never waive A03');
const explicitA03=check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A03',authorizedSideOmissionForA03:true});
assert(explicitA03.eligible&&explicitA03.a03SideWaiverApplied&&explicitA03.counts.side===0,'A03 scoped exception must preserve Side 0');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A04',authorizedSideOmissionForA03:true}).eligible,'No A04 admission from A03');
const explicitA04=check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A04',authorizedSideOmissionForA04:true});
assert(explicitA04.eligible&&explicitA04.a04SideWaiverApplied&&explicitA04.counts.side===0,'Explicit A04 permission keeps Side empty');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A05',authorizedSideOmissionForA04:true}).eligible,'A05 is not admitted by A04 authorization');
const a05Authorized=check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A05',authorizedSideOmissionForA05:true});
assert(a05Authorized.eligible&&a05Authorized.a05SideWaiverApplied&&a05Authorized.counts.side===0,'A05 scoped authorization leaves Side empty');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,stageId:'A06',authorizedSideOmissionForA05:true}).eligible,'A05 does not authorize A06');
assert(!check({selectedDeckId:13579,explicitlyAssigned:false,payload:a01MissingSide,stageId:'A05',authorizedSideOmissionForA05:true}).eligible,'A05 needs explicit user deck assignment');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,stageId:'A05'}).eligible,'A05 is blocked without explicit waiver');

assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A04'}).eligible,'A04 default still requires Side');
assert(!check({selectedDeckId:13579,explicitlyAssigned:false,payload:a01MissingSide,
 stageId:'A04',authorizedSideOmissionForA04:true}).eligible,'A04 still requires explicit deck selection');

assert(!check({selectedDeckId:13579,explicitlyAssigned:false,payload:a01MissingSide,
 stageId:'A03',authorizedSideOmissionForA03:true}).eligible,'No unassigned deck A03');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A03'}).eligible,'A03 default must require Side');

assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,
 stageId:'A02'}).eligible,'A02 default gate requires Side');

assert(!check({selectedDeckId:13579,explicitlyAssigned:false,payload:a01MissingSide,stageId:'A01',authorizedSideOmissionForA01:true}).eligible,'Never waive assignment');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingSide,stageId:'A01'}).eligible,'Never waive by default');
const a01MissingMain=make();
a01MissingMain.inventory=a01MissingMain.inventory.filter(x=>x.section!=='main');
a01MissingMain.record.cards[0].slots=a01MissingMain.record.cards[0].slots.filter(x=>x.section!=='main');
assert(!check({selectedDeckId:13579,explicitlyAssigned:true,payload:a01MissingMain,stageId:'A01',authorizedSideOmissionForA01:true}).eligible,'A01 still requires Main');

assert(!verdict(make(),undefined,false).eligible,'Missing selection never implies all decks');
console.log(JSON.stringify({ok:true,selectedDeckGate:true,required:['main','extra','side'],
 reserve:'optional',analysisExecuted:false,syntheticFixturesOnly:true}));

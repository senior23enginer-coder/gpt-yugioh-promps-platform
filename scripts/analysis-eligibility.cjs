'use strict';
// Reusable admission gate; validates data only. It NEVER starts an analysis.
const fs = require('node:fs');
const path = require('node:path');
const required = Object.freeze(['main','extra','side']);
const allowed = new Set([...required,'reserve']);
const key = r => Number(r?.id ?? r?.card_id);
function parseRows(rows, violations, label) {
  if (!Array.isArray(rows)) {violations.push(label + '_NOT_LOADED');return [];}
  const seen = new Set();
  return rows.map((row, index) => {
    const id=key(row);
    const section=String(row?.section||'').toLowerCase();
    const quantity=Number(row?.quantity);
    if(!Number.isInteger(id)||id<=0||seen.has(id))violations.push(label+'_INVALID_OR_DUPLICATE_ROW_'+index);
    else seen.add(id);
    if(!allowed.has(section)||!Number.isInteger(quantity)||quantity<=0)violations.push(label+'_INVALID_SECTION_OR_QUANTITY_'+index);
    return {id, section, quantity};
  });
}
function fromRecord(record) {
  return Array.isArray(record?.cards) ?
    record.cards.flatMap(c=>Array.isArray(c?.slots)?c.slots.map(s=>({
      id:s.card_id,section:s.section,quantity:s.quantity
    })):[]) : null;
}
function signature(rows) {
  return rows.map(r=>[r.id,r.section,r.quantity].join(':')).sort();
}
function validateDeckAssignment({selectedDeckId=null,explicitlyAssigned=false,payload=null,
  stageId=null,authorizedSideOmissionForA01=false,
  authorizedSideOmissionForA02=false,authorizedSideOmissionForA03=false}={}) {
  const violations=[];
  const selected=Number(selectedDeckId);
  if(explicitlyAssigned!==true||!Number.isInteger(selected)||selected<=0)
    violations.push('EXPLICIT_USER_DECK_SELECTION_REQUIRED');
  if(!payload||typeof payload!=='object'||Array.isArray(payload))
    return {eligible:false,violations:[...violations,'DECK_PACKAGE_NOT_LOADED'],counts:null};
  if(!Number.isInteger(payload.deck_id)||payload.deck_id<=0||
    (Number.isInteger(selected)&&selected>0&&selected!==payload.deck_id))
    violations.push('DECK_ID_MISMATCH');
  if(payload.record&&payload.record.deck_id!==payload.deck_id)
    violations.push('RECORD_DECK_ID_MISMATCH');
  const format=payload.record?.format||payload.format;
  if(typeof format!=='string'||!format.trim()||
    (payload.format&&payload.record?.format&&payload.format!==payload.record.format))
    violations.push('FORMAT_MISSING_OR_MISMATCHED');
  const rows=parseRows(payload.inventory,violations,'INVENTORY');
  const rec=fromRecord(payload.record||payload);
  if(rec!==null){
    const source=parseRows(rec,violations,'RECORD');
    if(JSON.stringify(signature(rows))!==JSON.stringify(signature(source)))
      violations.push('INVENTORY_RECORD_SLOTS_MISMATCH');
  }
  const counts={main:0,extra:0,side:0,reserve:0};
  for(const row of rows)if(allowed.has(row.section)&&Number.isInteger(row.quantity)&&row.quantity>0)
    counts[row.section]+=row.quantity;
  // Scoped, user-authorized structural A01/A02 exceptions; Side stays EMPTY.
  // Neither exception waives Main, Extra, row signatures, format or deck ID.
  // A04-A10A stay behind their original inventory gate. A03 requires its own explicit authorization.
  const a01SideWaiverApplied=stageId==='A01' && authorizedSideOmissionForA01===true &&
    explicitlyAssigned===true && Number.isInteger(selected) && selected===payload.deck_id &&
    counts.main>0 && counts.extra>0 && counts.side===0;
  const a02SideWaiverApplied=stageId==='A02' && authorizedSideOmissionForA02===true &&
    explicitlyAssigned===true && Number.isInteger(selected) && selected===payload.deck_id &&
    counts.main>0 && counts.extra>0 && counts.side===0;
  const a03SideWaiverApplied=stageId==='A03' && authorizedSideOmissionForA03===true &&
    explicitlyAssigned===true && Number.isInteger(selected) && selected===payload.deck_id &&
    counts.main>0 && counts.extra>0 && counts.side===0;
  for(const section of required)if(counts[section]===0 &&
    !(section==='side' && (a01SideWaiverApplied||a02SideWaiverApplied||a03SideWaiverApplied)))
    violations.push('REQUIRED_'+section.toUpperCase()+'_NOT_LOADED');
  // Reserve is optional; never manufacture a card to fill an empty section.
  return Object.freeze({eligible:violations.length===0,violations,
    deck_id:payload.deck_id,format,counts,a01SideWaiverApplied,a02SideWaiverApplied,a03SideWaiverApplied});
}
if(require.main===module){
  const args=process.argv.slice(2);
  const selection=args.find(a=>a.startsWith('--deck-id='));
  const file=args.find(a=>!a.startsWith('--'));
  const result=validateDeckAssignment({
    selectedDeckId:selection?Number(selection.slice('--deck-id='.length)):null,
    explicitlyAssigned:args.includes('--user-assigned'),
    stageId:args.find(a=>a.startsWith('--stage='))?.slice(8)||null,
    authorizedSideOmissionForA01:args.includes('--authorized-side-waiver'),
    authorizedSideOmissionForA02:args.includes('--authorized-side-waiver'),
    authorizedSideOmissionForA03:args.includes('--authorized-side-waiver'),
    payload:file?JSON.parse(fs.readFileSync(path.resolve(file),'utf8')):null
  });
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
  process.exitCode=result.eligible?0:1;
}
module.exports=Object.freeze({validateDeckAssignment});

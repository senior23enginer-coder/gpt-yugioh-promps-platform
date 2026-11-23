'use strict';
/** Crystron 677 A09 documentary audit: 14 historical routes, 60 numbered source
 * steps, 28 conditional paper cases, 15 non-spatial endboard variants.
 * Does not simulate engine resolution, certify A05-T4, import or run calculator.
 */
const a=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
function cut(text,begin,end){const i=text.indexOf(begin),j=text.indexOf(end,i+begin.length);a(i>=0&&j>i,'MISSING_SECTION_'+begin);return text.slice(i+begin.length,j)}
function rows(doc,start,end){return cut(doc,start,end).split('\n').filter(s=>s.startsWith('{')).map(JSON.parse)}
const zones=new Set(['hand','monster','spell_trap','graveyard','banished','deck','extra','xyz_materials']);
function audit(id,packPath,docPath){
 a.equal(id,677);const p=path.resolve(packPath),d=path.resolve(docPath);
 a(p.startsWith(root)&&d.startsWith(root),'CROSS_DECK');
 a.equal(path.dirname(path.dirname(p)),path.dirname(d),'NOT_SAME_DECK');
 const pkg=JSON.parse(fs.readFileSync(p,'utf8')),doc=fs.readFileSync(d,'utf8');
 a.equal(pkg.deck_id,677);a.equal(pkg.record.format,'tcg_advanced');
 a.equal(pkg.record.calculator.rules.length,13);
 const cards=new Map(pkg.record.cards.map(c=>[c.cid,c]));
 a.equal(cards.size,39);a.equal(pkg.record.routes.length,14);
 const sourceRoutes=new Map(pkg.record.routes.map(r=>[r.id,r]));
 const legalEffects=new Set([...doc.matchAll(/^#### \d+\. .(677:a05:\d+:[a-z0-9-]+). — CID \d+ \([A-Z]+\)$/gm)].map(m=>m[1]));
 a.equal(legalEffects.size,92);
 const starters=rows(doc,'<!-- A09_ROUTES_BEGIN -->','<!-- A09_ROUTES_END -->');
 const steps=rows(doc,'<!-- A09_STEPS_BEGIN -->','<!-- A09_STEPS_END -->');
 const cases=rows(doc,'<!-- A09_CASES_BEGIN -->','<!-- A09_CASES_END -->');
 const boards=rows(doc,'<!-- A09_BOARDS_BEGIN -->','<!-- A09_BOARDS_END -->');
 a.equal(starters.length,14);a.equal(steps.length,60);a.equal(cases.length,14);a.equal(boards.length,15);
 const totals=new Map(), main=new Map();let physical={main:0,extra:0,side:0};
 for(const c of pkg.record.cards)for(const slot of c.slots){
  a(['main','extra','side'].includes(slot.section));
  physical[slot.section]+=slot.quantity;
  totals.set(c.cid,(totals.get(c.cid)||0)+slot.quantity);
  if(slot.section==='main')main.set(c.cid,(main.get(c.cid)||0)+slot.quantity);
 }
 a.deepEqual(physical,{main:40,extra:15,side:15});
 function validateZones(known){
  a(known&&typeof known==='object'&&!Array.isArray(known),'NO_KNOWN_ZONE_OBJECT');
  const seen=new Map();
  for(const [zone,arr] of Object.entries(known)){
   a(zones.has(zone),'INVALID_ZONE_'+zone);a(Array.isArray(arr),'NOT_ZONE_ARRAY');
   for(const cid of arr){
    a(Number.isInteger(cid)&&cards.has(cid),'FOREIGN_CID_'+cid);
    const n=(seen.get(cid)||0)+1;seen.set(cid,n);
    a(n<=totals.get(cid),'TOO_MANY_PHYSICAL_COPIES_CID_'+cid);
   }
  }
 }
 const checkRoutes=[];
 for(let i=0;i<14;i++){
  const key=(i<7?'C':'V')+String(i<7?i+1:i-6).padStart(2,'0');
  const id='677:A09:'+key,s=starters[i],source=sourceRoutes.get(id);
  a(source,'ROUTE_NOT_IN_NATIVE_PACKAGE_'+id);a.equal(s.route_id,id);
  a.equal(s.initial.phase,'OWN_MAIN');
  a.equal(s.initial.opponent_state,'DESCONOCIDO');
  a.equal(s.initial.unmentioned_cards,'NO_PRESUPUESTAS');
  a(s.initial.required_condition.length>=35);
  validateZones(s.initial.known_zones);
  if(s.parent_route)a(sourceRoutes.has(s.parent_route),'FOREIGN_PARENT_ROUTE');
  const h=s.initial.known_zones.hand||[],deck=s.initial.known_zones.deck||[],extra=s.initial.known_zones.extra||[];
  const physicalCount=new Map();
  for(const cid of [...h,...deck,...extra])physicalCount.set(cid,(physicalCount.get(cid)||0)+1);
  for(const [cid,n] of physicalCount){a(n<=totals.get(cid),'SOURCE_START_EXCEEDS_PHYSICAL_COPIES');}
  for(const cid of h)a(main.has(cid),'START_HAND_NOT_IN_MAIN');
  for(const cid of deck)a(main.has(cid),'START_DECK_NOT_IN_MAIN');
  for(const cid of extra)a(cards.get(cid).slots.some(z=>z.section==='extra'),'START_EXTRA_NOT_IN_EXTRA');
  checkRoutes.push(id);
 }
 let stepIndex=0,hasChain=0,hasMissing=0;
 for(const r of pkg.record.routes){
  for(let j=0;j<r.steps.length;j++){
   const x=steps[stepIndex++],id=r.id+':S'+String(j+1).padStart(2,'0');
   a.equal(x.step_id,id,'STEP_STABLE_ID_MISMATCH');
   a.equal(x.route_id,r.id);a.equal(x.source_step_number,j+1);
   a(r.steps[j].action.startsWith(x.step_action_prefix),'SOURCE_STEP_CHANGED_'+id);
   a(x.step_action_prefix.length>=30);
   a(Array.isArray(x.effect_ids),'EFFECT_ID_LIST_MISSING');
   for(const e of x.effect_ids)a(legalEffects.has(e),'UNOFFICIAL_EFFECT_IN_STEP_'+id);
   a(x.action_class.length>=8&&x.phase_or_window.length>=6);
   a(typeof x.activation_cost==='string'&&x.activation_cost.length>=4);
   a(x.materials_or_targets.length>=8);
   for(const key of ['state_before','state_after_if_uninterrupted']){
    const s=x[key];a.equal(s.opponent,'DESCONOCIDO');a.equal(s.unmentioned,'DESCONOCIDO');
    validateZones(s.known_zones);
   }
   a.equal(x.certification,'PAPEL_CONDICIONAL_NO_REPLAY');
   a(x.interruption_and_fallthrough.length>=35,'NOT_FAIL_CLOSED_'+id);
   if(x.phase_or_window.includes('CHAIN'))hasChain++;
   if(x.interruption_and_fallthrough.includes('SIN_CONTINUACION'))hasMissing++;
  }
 }
 a.equal(stepIndex,60);
 for(let i=0;i<14;i++){
  const r=starters[i].route_id,t=cases[i];
  a.equal(t.route_id,r);a.equal(t.positive_case_id,r+':P');a.equal(t.negative_case_id,r+':N');
  a(steps.some(x=>x.step_id===t.critical_step_id),'MISSING_CRITICAL_STEP');
  a(t.critical_step_id.startsWith(r+':S'),'CROSS_ROUTE_CASE');
  a(t.positive_condition_and_expected.length>50&&t.negative_condition_and_expected.length>50);
  a.equal(t.fail_closed,'SIN_CONTINUACION_DEMOSTRADA');
  a.equal(t.cost_preservation,'COSTE_PAGADO_NO_SE_REEMBOLSA_CON_NEGACION');
  a.equal(t.certification,'PAPEL_CONDICIONAL_NO_REPLAY');
 }
 let bi=0;
 const byRoute=new Map();
 for(const r of pkg.record.routes){
  a.equal(r.endboard.source,'A09_SOURCE_DERIVED');
  a(Array.isArray(r.endboard.variants)&&r.endboard.variants.length>=1);
  for(const [j,board] of r.endboard.variants.entries()){
   const row=boards[bi++];
   a.equal(row.route_id,r.id);a.equal(row.variant_index,j);
   a.equal(board.spatial_verified,false);
   a.equal(row.spatial_certification,'NO_VERIFICADO_ILUSTRATIVO');
   a.equal(row.opponent_state,'DESCONOCIDO');
   a.equal(row.certification,'CONCORDANCIA_ESTATICA_DE_CARTAS_Y_ZONAS_SIN_REPLAY');
   for(const [key,z] of Object.entries({monster:'monster',spell:'spell_trap',hand:'hand',graveyard:'graveyard',banished:'banished'})){
    const source=(board[key]||[]).map(x=>x.cid),e=row.expected_known_zones[z]||[];
    a.deepEqual(source,e,'END_BOARD_ZONE_DRIFT_'+r.id+'_'+j+'_'+key);
   }
   validateZones(row.expected_known_zones);
   for(const [zone,entries] of Object.entries(row.expected_known_zones)){
    if(zone==='xyz_materials')continue;
    for(const cid of entries){a(cards.has(cid),'BOARD_FOREIGN_CARD');}
   }
   if(row.expected_known_zones.xyz_materials.length){
    const hasXyz=(board.monster||[]).some(x=>[13826,16850,11765].includes(x.cid));
    a(hasXyz,'XYZ_MATERIAL_NOT_ATTACHED_TO_XYZ');
   }
   byRoute.set(r.id,(byRoute.get(r.id)||0)+1);
  }
 }
 a.equal(bi,15);a.equal(byRoute.get('677:A09:V07'),2);
 const docA09=cut(doc,'## APARTADO_09','## APARTADO_10');
 for(const id of checkRoutes)a(docA09.includes(id.split(':').at(-1)),'MISSING_NARRATIVE_ROUTE');
 a(docA09.includes('PENDIENTE_DE_RULING')||doc.includes('PENDIENTE_DE_RULING'));
 const ledger=cut(doc,'## CONTROL_DE_TAREAS_A01_A10 —','\n---\n');
 const checked=[...ledger.matchAll(/^- \[x\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)].map(x=>x[1]);
 a.equal(checked.length,31);for(const k of ['A09-T1','A09-T2','A09-T3','A09-T4'])a(checked.includes(k));
 for(const k of ['A05-T4','A10A-T1','A10A-T2','A10A-T3'])a(!checked.includes(k),'UNVERIFIED_STAGE_FALSELY_CLOSED');
 a(ledger.includes('31/35')&&ledger.includes('4/35'));
 return {ok:true,deck_id:677,sourceRoutes:14,sourceSteps:60,stepReferences:stepIndex,conditionalCases:28,
  endboardVariants:15,spatiallyCertified:0,portableRules:13,physical,
  paperOnly:true,calculationEngineExecuted:false,previousA05T4StillOpen:true,closed:31,pending:4};
}
if(require.main===module){
 const args=process.argv.slice(2),files=args.filter(x=>!x.startsWith('--'));
 a(args.includes('--user-assigned')&&files.length===2,'EXPLICIT_USER_ASSIGNMENT_REQUIRED');
 console.log(JSON.stringify(audit(Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),files[0],files[1])));
}
module.exports={audit};
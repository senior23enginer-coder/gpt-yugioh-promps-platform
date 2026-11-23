'use strict';
/* Crystron 677 A08 documentary contract. No simulation or calculator execution. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
function between(doc,a,b){const i=doc.indexOf(a),j=doc.indexOf(b,i+a.length);assert(i>=0&&j>i,'MISSING_'+a);return doc.slice(i+a.length,j)}
function records(doc,a,b){return between(doc,a,b).split('\n').filter(s=>s.startsWith('{')).map(JSON.parse)}
function audit(id,packagePath,docPath){
 assert.equal(id,677);const p=path.resolve(packagePath),d=path.resolve(docPath);
 assert(p.startsWith(root)&&d.startsWith(root),'CROSS_DECK');
 assert.equal(path.dirname(path.dirname(p)),path.dirname(d));
 const pkg=JSON.parse(fs.readFileSync(p,'utf8')),doc=fs.readFileSync(d,'utf8');
 assert.equal(pkg.deck_id,677);assert.equal(pkg.record.format,'tcg_advanced');
 assert.equal(pkg.record.calculator.rules.length,13);
 const cards=new Map(pkg.record.cards.map(c=>[c.cid,c]));
 assert.equal(cards.size,39);
 const routeIds=new Set(pkg.record.routes.map(r=>r.id));
 assert.equal(routeIds.size,14);
 const effects=new Set([...doc.matchAll(/^#### \d+\. .(677:a05:\d+:[a-z0-9-]+). — CID \d+ \([A-Z]+\)$/gm)].map(m=>m[1]));
 assert.equal(effects.size,92);
 const D=records(doc,'<!-- A08_DECISIONS_BEGIN -->','<!-- A08_DECISIONS_END -->');
 assert.equal(D.length,26);let routed=0,situational=0;const referencedEffects=new Set();
 for(let i=0;i<D.length;i++){
  const q=D[i],name='D'+String(i+1).padStart(2,'0');assert.equal(q.decision_id,name);
  assert.equal(q.positive_case_id,'677:A08:'+name+':P');
  assert.equal(q.negative_case_id,'677:A08:'+name+':N');
  assert.equal(q.certification,'CASO_DOCUMENTAL_NO_EJECUTADO');
  for(const key of ['state_before','expected_if_guard_resolves','blocked_if'])
   assert(typeof q[key]==='string'&&q[key].length>=30,'INADEQUATE_'+key+'_'+name);
  assert(q.physical_cids.length>0&&q.effect_ids.length>0);
  for(const cid of q.physical_cids)assert(cards.has(cid),'FOREIGN_CARD_'+name);
  for(const e of q.effect_ids){
   assert(effects.has(e),'FOREIGN_EFFECT_'+e);assert(q.physical_cids.includes(Number(e.split(':')[2])),'WRONG_EFFECT_CID');
   referencedEffects.add(e);
  }
  if(q.route_id==='SIN_JUGADA_ACREDITADA')situational++;
  else{assert(routeIds.has(q.route_id),'INVENTED_ROUTE_'+q.route_id);routed++}
 }
 const main=new Map(),side=new Map();let total={main:0,side:0,extra:0};
 for(const c of pkg.record.cards)for(const s of c.slots){
  assert(['main','side','extra'].includes(s.section));
  total[s.section]+=s.quantity;
  const m=s.section==='main'?main:s.section==='side'?side:null;
  if(m)m.set(c.cid,(m.get(c.cid)||0)+s.quantity);
 }
 assert.deepEqual(total,{main:40,side:15,extra:15});
 const expected={
 S01:{i:{9454:2,11243:2},o:{20206:2,20500:2}},
 S02:{i:{13619:1,15296:1},o:{20206:2}},
 S03:{i:{11849:2,16868:2},o:{9279:2,20206:2}},
 S04:{i:{4861:3},o:{7445:3}},
 S05:{i:{11411:1},o:{7445:1}},
 S06:{i:{20206:1},o:{9279:1}}};
 const plans=records(doc,'<!-- A08_SIDE_BEGIN -->','<!-- A08_SIDE_END -->');
 assert.equal(plans.length,6);
 for(let i=0;i<plans.length;i++){
  const q=plans[i],name='S'+String(i+1).padStart(2,'0');assert.equal(q.plan_id,name);
  const got={i:Object.fromEntries(q.in_from_side.map(x=>[x.cid,x.quantity])),
   o:Object.fromEntries(q.out_from_main.map(x=>[x.cid,x.quantity]))};
  assert.deepEqual(got,expected[name]);let n=0,m=0;
  for(const x of q.in_from_side){assert((side.get(x.cid)||0)>=x.quantity);n+=x.quantity}
  for(const x of q.out_from_main){assert((main.get(x.cid)||0)>=x.quantity);m+=x.quantity}
  assert.equal(n,m);assert.deepEqual(q.after_swap,[40,15,15,0]);
  assert.equal(q.tournament_legal,false);assert(q.risk.length>30);
 }
 const f=[{cid:9279,max:1,have:3},{cid:13619,max:0,have:1},
 {cid:15296,max:0,have:1},{cid:4861,max:1,have:3}];
 let excess=0;for(const x of f){const v=(main.get(x.cid)||0)+(side.get(x.cid)||0);
  assert.equal(v,x.have);excess+=Math.max(0,v-x.max)}
 assert.equal(excess,6);assert(doc.includes('https://www.yugioh-card.com/en/limited/list_2026-10-19/'));
 const sec=between(doc,'## APARTADO_08','## APARTADO_09');
 for(let i=1;i<=7;i++)for(const pfx of ['C','V'])assert(sec.includes(pfx+String(i).padStart(2,'0')),'MISSING_ROUTE');
 for(const s of ['Memento 671','Purrely 660','Salamangreat 673'])assert(sec.includes(s),'MISSING_MATCHUP_'+s);
 const ledger=between(doc,'## CONTROL_DE_TAREAS_A01_A10 —','\n---\n');
 const checked=[...ledger.matchAll(/^- \[x\] \*\*(A(?:0[1-9]|10A)-T\d)\*\*/gm)].map(x=>x[1]);
 assert(checked.length>=27&&checked.length<=35);
 for(const id of ['A08-T1','A08-T2','A08-T3','A08-T4'])assert(checked.includes(id),'A08_OPEN_'+id);
 for(const id of ['A05-T4','A10A-T1','A10A-T2','A10A-T3'])
  assert(!checked.includes(id),'FALSE_CLOSURE_'+id);
 assert(ledger.includes(checked.length+'/35')&&ledger.includes((35-checked.length)+'/35'));
 return {ok:true,deck_id:677,decisions:26,positiveNegativeCases:52,
  routed,situational,distinctEffectIds:referencedEffects.size,existingRoutes:14,
  sidePlans:6,TCGAdvancedExcess:6,tournamentLegal:false,
  replays:0,calculatorExecuted:false,closed:checked.length,pending:35-checked.length};
}
if(require.main===module){const args=process.argv.slice(2),files=args.filter(x=>!x.startsWith('--'));
 assert(args.includes('--user-assigned')&&files.length===2);
 console.log(JSON.stringify(audit(Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]),files[0],files[1])));
}
module.exports={audit};
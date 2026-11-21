'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const dir=path.join(root,'02_PROMPT_PARA_CODEX','apartados');
const files=fs.readdirSync(dir).filter(name=>/^\d{2}_.*\.md$/.test(name)).sort();
assert.equal(files.length,36,'The 36 protected modular prompts must stay present.');
for(let i=1;i<=36;i++)assert(files.some(name=>name.startsWith(String(i).padStart(2,'0')+'_')),'Missing protected A'+i);
for(const file of ['00_PROMPT_UNICO_STATION_X_V31.md','01_ANEXO_PROPOSITO_TACTICO_EDITOR_V31.md','REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md']){
  assert(fs.statSync(path.join(root,'02_PROMPT_PARA_CODEX',file)).size>100,'Missing protected base prompt '+file);
}
const clauses={
  1:['Estilo breve','Resumen para ficha','Arquetipo','Qué vigilar'],
  2:['station-x-deck-package/1','deck_id','inventory_sha256','content_mode=structured'],
  3:['card_id','CID','section','quantity'],
  4:['FOTO_PENDIENTE','image','full_image','CID'],
  5:['record.cards','slots','source_aliases','card_id'],
  6:['record.engine_maps','Estilo breve','motor_id','BUSCA'],
  7:['regla_id','record.calculator','station-x-calculator/1','OPERADOR_PENDIENTE'],
  8:['jugada_id','combo_id','DOCUMENTADA_SIN_CAMPO_ESPACIAL','A09'],
  9:['record.routes','hand_photos','endboard.variants','result_photos'],
  10:['station-x-visual-v1','390 px','1280 px','GUIA_VISUAL_COMPLETA']
};
for(let i=1;i<=10;i++){
  const file=files.find(name=>name.startsWith(String(i).padStart(2,'0')+'_'));
  const source=fs.readFileSync(path.join(dir,file),'utf8');
  assert(source.includes('### Entregable A'+String(i).padStart(2,'0')),'A'+i+' missing its specific deliverable');
  assert(source.includes('Prueba de aceptación A'+String(i).padStart(2,'0')) || (i===10&&source.includes('Comprobaciones de navegador obligatorias')),'A'+i+' missing acceptance criteria');
  for(const term of clauses[i])assert(source.includes(term),'A'+i+' missing canonical acceptance field '+term);
  assert(!source.includes('\\'+String.fromCharCode(96)),'Markdown code marker incorrectly escaped in '+file);
}
// New division and per-deck checklist are part of the mandatory prompt contract.
const mandatoryChecks={1:3,2:3,3:3,4:3,5:4,6:4,7:4,8:4,9:4,10:6};
for(let stage=1;stage<=10;stage++){
  const moduleName=files.find(x=>x.startsWith(String(stage).padStart(2,'0')+'_'));
  const moduleText=fs.readFileSync(path.join(dir,moduleName),'utf8');
  const number=String(stage).padStart(2,'0');
  assert(moduleText.includes('## Checklist obligatorio por deck A'+number),
    'Missing mandatory per-deck checkboxes: A'+number);
  const checklistOnly=moduleText.slice(moduleText.lastIndexOf('## Checklist obligatorio por deck A'+number));
  const found=[...checklistOnly.matchAll(new RegExp('^- \\[ \\] \\*\\*A'+number+'(?:[AB])?-T\\d+','gm'))];
  assert.equal(found.length,mandatoryChecks[stage],
    'Checklist missing a required task or has duplicate task IDs: A'+number);
  assert(moduleText.includes('CONTROL_DE_TAREAS_A01_A10'),
    'Checklist must be persisted inside the existing deck file: A'+number);
  assert(moduleText.includes('A10B') && moduleText.includes('opcional'),
    'Calculator must remain opt-in: A'+number);
}
const a07=fs.readFileSync(path.join(dir,files.find(x=>x.startsWith('07_'))),'utf8');
const a10=fs.readFileSync(path.join(dir,files.find(x=>x.startsWith('10_'))),'utf8');
assert(a07.includes('### Precedencia normativa A07'),
  'A07 may describe effects but must not compile or run the calculator');
assert(a10.includes('## Contrato definitivo A10A / A10B'),
  'A10 must explicitly split mandatory guides from opt-in calculator');
assert(a10.includes('fixtures JSON parametrizadas') && a10.includes('No modificar la plataforma')===false,
  'A10B must prescribe scalable reusable fixtures rather than per-effect code files');

const master=fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md'),'utf8');
assert(master.includes('Norma vigente A01–A10A / A10B'),'Missing current A10A/A10B master rule');
assert(master.includes('Puerta de aceptación transversal A01–A10'),'Master must enforce end-to-end contract');
for(let i=1;i<=10;i++)assert(master.includes('| A'+String(i).padStart(2,'0')+' |'),'Master crosswalk missing A'+i);
assert(master.includes('Kashtira es referencia'),'Reference comparison must not copy Kashtira cards');
assert(master.includes('DOCUMENTADA_SIN_CAMPO_ESPACIAL'),'Unknown endboards must not be invented');
// Verify calculator interoperability remains mandatory across the eight
// existing prompts, without creating or renumbering modules.
const calculatorContract = [
  ['00_PROMPT_UNICO_STATION_X_V31.md','Puerta transversal A01–A10 → calculadora'],
  ['apartados/02_RECEPCION_DE_UN_DECK.md','Puerta A02 — identidad'],
  ['apartados/05_ANALISIS_INDIVIDUAL_DE_TODAS_LAS_CARTAS.md','Puerta A05 — inventario'],
  ['apartados/07_MECANICAS_Y_REGLAS_POR_FORMATO.md','Puerta A07 — regla ejecutable'],
  ['apartados/08_EXPLORACION_Y_CLASIFICACION_EXHAUSTIVA_DE_JUGADAS.md','Puerta A08 — no confundir'],
  ['apartados/09_FICHA_UNICA_OBLIGATORIA_DE_CADA_COMBO_COMPLETO.md','Puerta A09 — contrato reproducible'],
  ['apartados/10_GENERACION_DE_GUIAS_VISUALES_DE_COMBOS_Y_ESTRATEGIAS_YU_GI_OH.md','Puerta A10 — paridad visual'],
  ['apartados/30_COMPROBACION_INTERNA_Y_BITACORA_UNICA.md','Control privado A30 — cobertura ejecutable']
];
for (const [file, clause] of calculatorContract) {
  const source=fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX',file),'utf8');
  assert(source.includes(clause),'Calculator acceptance missing: '+file);
}
for (const required of ['station-x-calculator/1','OPERADOR_PENDIENTE','CALCULADORA_REGLAS_PROBADAS']) {
  const combined=calculatorContract.map(([file])=>fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX',file),'utf8')).join('\n');
  assert(combined.includes(required),'Missing calculator contract term: '+required);
}
const packs=[
  ['DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO',671,12],
  ['DECK_NUEVO_13_CRISTRON_HORUS',677,14]
];
const reports=[];
for(const [folder,id,routes] of packs){
  const folderPath=path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks',folder);
  const file=path.join(folderPath,'datos/stationx-deck.json');
  const pack=JSON.parse(fs.readFileSync(file,'utf8'));
  assert.equal(pack.schema,'station-x-deck-package/1','Canonical import package required');
  assert.equal(pack.deck_id,id,'Do not mix deck identities');
  assert.equal(pack.record.deck_id,id,'Record must belong to package deck');
  assert.equal(pack.package_root,folder,'Never rename historical folder');
  assert.equal(pack.record.routes.length,routes,'Do not delete documented routes');
  const cardIds=new Set(pack.record.cards.flatMap(c=>(c.slots||[]).map(s=>Number(s.card_id))));
  assert.equal(cardIds.size,pack.inventory.length,'Preserve native inventory row IDs');
  const calculator=pack.record.calculator;
  if(calculator!==undefined){
    assert.equal(calculator.schema,'station-x-calculator/1','Unsupported calculator schema');
    assert.equal(calculator.deck_id,id,'Calculator rules belong to a different deck');
    assert.equal(calculator.format,pack.record.format,'Calculator rules belong to another format');
    assert(Array.isArray(calculator.rules),'Calculator rules must be an array');
    for(const rule of calculator.rules){
      assert.equal(rule.deckId,id,'Foreign executable rule deck identity');
      assert.equal(rule.format,pack.record.format,'Foreign executable rule format');
    }
  }
  const declaredRules=Array.isArray(calculator?.rules)?calculator.rules.length:0;
  if(id===677){
    assert(declaredRules>=9,'Crystron package must retain Horus, Smiger and Thystvern search variants');
    const fieldThystvern=calculator.rules.filter(rule=>rule.id==='677:thystvern:destroy-tuner');
    assert.deepEqual(fieldThystvern.map(rule=>rule.resolve[2]?.cid).sort((a,b)=>a-b),[12606,20758],
      'Thystvern may summon only verified Citree and Tristaros Tuners');
    assert(fieldThystvern.every(rule=>rule.actor.cid===12609&&rule.oncePerName&&
      rule.resolve[0]?.flag==='machineSynchroOnly'&&rule.resolve[1]?.op==='destroy'),
      'Thystvern field must share its GY usage and impose Machine Synchro restriction');
    const thystvern=calculator.rules.filter(rule=>rule.id==='677:thystvern:graveyard-search');
    assert.deepEqual(thystvern.map(rule=>rule.resolve[0]?.cid).sort((a,b)=>a-b),[12606,12608,12756,20758,20759],
      'Thystvern must search only verified Crystron names in the real deck, never itself');
    assert(thystvern.every(rule=>rule.actor?.cid===12609&&rule.oncePerName&&rule.oncePerTurn&&
      rule.costs.some(op=>op.op==='move'&&op.ref==='actor'&&op.to==='banished')),
      'Thystvern variants must share one name limit and banish the GY actor as cost');
    const sarcophagus=calculator.rules.filter(rule=>rule.id==='677:sarcophagus:send-horus');
    assert.deepEqual(sarcophagus.map(rule=>rule.resolve[0].cid).sort((a,b)=>a-b),[19153,19155],
      'Only verified Horus targets are sent to GY by Sarcophagus');
    assert(sarcophagus.every(rule=>rule.actor.cid===19200&&rule.maxUsesPerTurn===4&&
      rule.oncePerName&&rule.costs[0]?.ref==='sent'&&rule.costs[0]?.to==='graveyard'),
      'Sarcophagus has four name-shared uses and a real hand-to-GY cost');
    const horus=calculator.rules.filter(rule=>rule.id.startsWith('677:horus-gy:'));
    const smiger=calculator.rules.filter(rule=>rule.id.startsWith('677:smiger:'));
    assert.deepEqual(horus.map(rule=>rule.actor.cid).sort((a,b)=>a-b),[19153,19155]);
    assert.deepEqual(smiger.map(rule=>rule.id).sort(),[
      '677:smiger:destroy-citree','677:smiger:graveyard-search']);
    assert(smiger.every(rule=>rule.actor.cid===12608&&rule.oncePerName===true&&rule.oncePerTurn===true),
      'Both Smiger effects share once-per-name use');
    const fieldSmiger=smiger.find(rule=>rule.id==='677:smiger:destroy-citree');
    assert(fieldSmiger.resolve.some(op=>op.op==='flag'&&op.flag==='machineSynchroOnly'&&op.duration==='turn'),
      'Smiger restricts the Extra to Machine Synchro for the turn');
    assert(fieldSmiger.select.length===1&&fieldSmiger.select[0].allowActor===true,
      'Smiger can explicitly select himself as a face-up own destruction target');
    assert(fieldSmiger.resolve.some(op=>op.op==='take'&&op.cid===12606&&op.summonMethod==='special'&&op.to==='free-monster'));
    const graveSmiger=smiger.find(rule=>rule.id==='677:smiger:graveyard-search');
    assert(graveSmiger.costs.some(op=>op.op==='move'&&op.ref==='actor'&&op.to==='banished'));
    assert(graveSmiger.resolve.some(op=>op.op==='take'&&op.cid===20798&&op.to==='hand'));
    for(const rule of horus){
      assert.equal(rule.resolve.length,1,'One supported Horus GY procedure per card');
      assert.equal(rule.resolve[0].op,'move');
      assert.equal(rule.resolve[0].to,'free-monster');
      assert.equal(rule.resolve[0].summonMethod,'special');
      assert.equal(rule.activation,false,'Horus GY procedure is not an activated Sarcophagus effect');
      assert(rule.guards.some(g=>g.kind==='count'&&g.selector?.cid===19200&&g.selector.faceUp===true),
        'Controlling a face-up King\'s Sarcophagus is mandatory');
    }
  }
  if(id===671){
    assert.equal(declaredRules,353,'Memento must retain all verified portable variants');
    const ids=new Set(calculator.rules.map(rule=>rule.id));
    assert.equal(ids.size,59,'Multiple variants must share their stable effect ID');
    for(const id of ['671:mictlan:activate','671:creation-king:destroy',
      '671:twin-dragon:fusion-search','671:duke:recover-engraver'])
      assert(ids.has(id),'Lost existing verified portable effect: '+id);
    assert.equal(calculator.rules.filter(rule=>rule.id==='671:bone-party:main').length,53,
      'Bone Party must preserve all 43 exact variants');
    assert(calculator.rules.every(rule=>rule.version===1 && rule.deckId===671 &&
      rule.format==='tcg_advanced' && Array.isArray(rule.guards) &&
      Array.isArray(rule.resolve) && rule.resolve.length>0),
      'Portable Memento rules must preserve version, guards and resolution');
  }
  const steps=pack.record.routes.flatMap(route=>route.steps||[]);
  const photos=steps.filter(step=>Array.isArray(step.photos)&&step.photos.length>0).length;
  const boards=pack.record.routes.filter(route=>route.endboard?.variants?.length>0).length;
  const complete=photos===steps.length&&boards===routes&&steps.length>0;
  if(pack.record.presentation_contract==='station-x-visual-v1')assert(complete,'A partial deck cannot falsely claim complete spatial guidance');
  const imageNames=new Set(fs.readdirSync(path.join(folderPath,'imagenes')));
  for(const card of pack.record.cards){
    const name=path.basename(card.image||'');
    if(name)assert(imageNames.has(name),'Missing referenced local image '+name);
  }
  reports.push({deck_id:id,cards:pack.record.cards.length,steps:steps.length,illustrated_steps:photos,spatial_endboards:boards,routes,visual_complete:complete,
    declared_calculator_rules:declaredRules,calculator_rule_execution:'NOT_VERIFIED_BY_THIS_TEST'});
}
console.log(JSON.stringify({ok:true,protected_prompts:39,modules_with_acceptance:10,existing_decks:reports}));

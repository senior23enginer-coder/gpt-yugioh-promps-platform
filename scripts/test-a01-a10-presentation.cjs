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
const mandatoryChecks={1:5,2:3,3:3,4:3,5:4,6:4,7:4,8:4,9:4,10:6};
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
  assert(moduleText.includes('### Precondición A'+number+' — selección expresa y deck realmente cargado'),
    'Any single stage must block unassigned decks: A'+number);
  assert(moduleText.includes('Main') && moduleText.includes('Side') &&
    moduleText.includes('Extra') && moduleText.includes('Reserva'),
    'Stage must mention the real inventory sections and format-aware eligibility: A'+number);
  assert(moduleText.includes('CONTROL_DE_TAREAS_A01_A10'),
    'Checklist must be persisted inside the existing deck file: A'+number);
  assert(moduleText.includes('A10B') && moduleText.includes('opcional'),
    'Calculator must remain opt-in: A'+number);
}
// The machine-readable manifest and prose checklists must never drift.
const manifest=JSON.parse(fs.readFileSync(path.join(root,
  '02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json'),'utf8'));
assert.equal(manifest.schema,'station-x-a01-a10-task-manifest/1');
assert.deepEqual(manifest.required_sections,['main']);
assert.deepEqual(manifest.extra_deck_policy.required_for,['tcg','tcg_advanced','tcg_traditional','ocg','ocg_advanced']);
assert.deepEqual(manifest.extra_deck_policy.optional_for,['goat','rush_duel','rush']);
assert.deepEqual(manifest.optional_sections,['side','reserve']);
assert.equal(manifest.applicable_only_to_user_assigned_deck,true);
assert.equal(manifest.analysis_is_not_triggered_by_this_manifest,true);
assert.equal(manifest.stages.length,11);
const taskIds=manifest.stages.flatMap(stage=>stage.tasks.map(task=>task.task_id));
assert.equal(taskIds.length,40,'37 mandatory plus 3 optional task IDs');
assert.equal(new Set(taskIds).size,40,'Never duplicate stage task IDs');
for(let i=1;i<=10;i++){
  const number=String(i).padStart(2,'0');
  const body=fs.readFileSync(path.join(dir,files.find(x=>x.startsWith(number+'_'))),'utf8');
  const fromMarkdown=[...body.matchAll(/^- \[ \] \*\*(A\d{2}[AB]?-T\d+)\*\*/gm)].map(m=>m[1]).sort();
  const fromManifest=manifest.stages.filter(x=>x.stage_id==='A'+number||
    (i===10&&['A10A','A10B'].includes(x.stage_id))).
    flatMap(x=>x.tasks.map(t=>t.task_id)).sort();
  assert.deepEqual(fromMarkdown,fromManifest,'Manifest mismatch with A'+number);
}
assert(manifest.stages.filter(s=>s.mandatory).reduce((n,s)=>n+s.tasks.length,0)===37);
assert(manifest.stages.find(s=>s.stage_id==='A10B').mandatory===false);

// A01 defines an evidence-backed strategy before A05-A09. This is a contract
// regression only: it must not execute deck analysis or alter deck artifacts.
const a01Prompt=fs.readFileSync(path.join(dir,files.find(x=>x.startsWith('01_'))),'utf8');
const a01Tasks=manifest.stages.find(stage=>stage.stage_id==='A01');
assert(a01Tasks?.mandatory===true&&a01Tasks.tasks.length===5,
  'A01 must contain five mandatory tasks including structural and import acceptance');
for(const field of ['Arquetipo','Tipo de estrategia','Estilo breve',
  'Resumen para ficha','Cómo se juega','Qué vigilar']){
  assert(a01Prompt.includes('`'+field+'`'),'A01 missing profile field '+field);
}
for(const clause of ['### Método obligatorio de diagnóstico estratégico A01',
  '### Trazabilidad progresiva A01-T3 sin IDs ficticios',
  '### Puerta de aceptación A01 — contenido, consistencia y portabilidad',
  'PENDIENTE_DE_ENLACE_A05_A09','PENDIENTE_DE_SINCRONIZACION_O_IMPORTACION',
  'NO_IMPORTABLE_TODAVIA','tcg_advanced','goat','rush_duel',
  'Combo','Control','Midrange','Stun','Aggro','OTK','Híbrido',
  'A05 analiza individualmente','A10B es opcional','190 caracteres',
  '250 caracteres','record.profile','datos/stationx-deck.json',
  '### A01-T4 — validación estructural del perfil y paridad de fuente',
  '### A01-T5 — prueba de importación y presentación del perfil',
  'a01_profile_contract','station-x-a01-profile/1',
  'PERFIL_JSON_DESINCRONIZADO','PRUEBA_IMPORTACION_PENDIENTE']){
  assert(a01Prompt.includes(clause),'A01 evidence/format contract missing '+clause);
}
for(const task of a01Tasks.tasks){
  assert(a01Prompt.includes('- [ ] **'+task.task_id+'** '+task.description),
    'A01 checklist/manifest description drift: '+task.task_id);
}
assert(!a01Prompt.includes('Una consulta para listar tareas, auditar prompts, corregir código o estimar duración NO es una asignación de deck.') ||
  a01Prompt.includes('no autoriza ejecutar A01'),
  'A01 prompt editing must not trigger deck analysis');

// Prevent duplicate per-deck checklists and schema drift in all ten modules.
for (let stage=1;stage<=10;stage++) {
  const no=String(stage).padStart(2,'0');
  const filename=files.find(name=>name.startsWith(no+'_'));
  const body=fs.readFileSync(path.join(dir,filename),'utf8');
  const expected=mandatoryChecks[stage];
  const taskRows=[...body.matchAll(new RegExp('^- \\[ \\] \\*\\*A'+no+'(?:[AB])?-T\\d+','gm'))].map(m=>m[0]);
  assert.equal(taskRows.length,expected,
    'Duplicated or missing per-deck checklist entries in A'+no);
  assert.equal(new Set(taskRows).size,taskRows.length,
    'Duplicate checklist ID in A'+no);
  assert(body.includes('Entrega estandarizada A'+no),
    'No universal causal deliverable for A'+no);
}
const formatBase=fs.readFileSync(path.join(root,
  '02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md'),'utf8');
const tacticsBase=fs.readFileSync(path.join(root,
  '02_PROMPT_PARA_CODEX/01_ANEXO_PROPOSITO_TACTICO_EDITOR_V31.md'),'utf8');
for (const term of ['effect_id','case_id','expected_legal','expected_state_after','A10B']) {
  assert(formatBase.includes(term), 'Missing canonical logical-case field: '+term);
}
assert(tacticsBase.includes('effect_id') && tacticsBase.includes('A10A') &&
  tacticsBase.includes('A10B'),'Tactical base is not using the universal IDs');

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
assert(master.includes('## PUERTA CERO — autorización') &&
  master.includes('BLOQUEADO_POR_INVENTARIO_O_AUTORIZACION') &&
  master.includes('Main+Extra en TCG/OCG y solo Main en GOAT/Rush Duel'),
  'Master cannot start any deck analysis without explicit assignment and loaded zones');
for(const field of ['## CONTRATO TRANSVERSAL OBLIGATORIO','effect_id','state_before',
  'expected_costs','expected_events','expected_state_after','case_id',
  'OPERADOR_NO_SOPORTADO','CONTROL_DE_TAREAS_A01_A10']){
  assert(master.includes(field),'Missing universal deck language contract: '+field);
}
assert(a07.includes('expected_legal') && a07.includes('expected_state_after'),
  'A07 must prepare typed positive/negative paper cases before A10B');
assert(a10.includes('A10B opt-in') && a10.includes('runner común'),
  'A10B must consume causal cases with one reusable runner');

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
    // La cobertura de Extra no se satisface sólo con 12 rutas y fotos.
    const extras=pack.record.cards.filter(c=>c.slots.some(s=>s.section==='extra'));
    assert.equal(extras.length,13,'Memento requires thirteen distinct Extra identities');
    const documented=new Map();
    for(const card of extras){
      assert((card.practical||[]).length>0&&Object.keys(card.operational||{}).length>0&&
        Object.keys(card.learning||{}).length>0,'Extra without practical usage: '+card.cid);
      assert((card.synergy?.labels||[]).length>0,'Extra without A06 classification: '+card.cid);
      for(const access of card.extra_access||[]){
        assert.equal(access.cid,card.cid,'Extra access wrongly attached to card');
        assert(!documented.has(access.id),'Duplicate Extra access '+access.id);
        assert(['DOCUMENTADA_CONDICIONAL_SIN_REPLAY','TEORICA_PENDIENTE_VALIDACION'].includes(access.status));
        for(const key of ['opening','materials','result','limitation','source_section'])
          assert(typeof access[key]==='string'&&access[key].trim(),'Incomplete '+access.id+': '+key);
        assert(Array.isArray(access.steps)&&access.steps.length>=2&&access.steps.every(s=>typeof s==='string'&&s.trim()),
          'Extra access missing ordered actions '+access.id);
        if(access.parent_route_id)assert(pack.record.routes.some(r=>r.id===access.parent_route_id),'Invalid parent route');
        documented.set(access.id,card.cid);
      }
    }
    assert.deepEqual([...documented.entries()].sort((a,b)=>a[0].localeCompare(b[0])),
      [['EX-M01',12870],['EX-M02',19184],['EX-M03',9657],['EX-M04',13081]]);
    const source=fs.readFileSync(path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks',pack.source_document),'utf8');
    for(const [accessId,cid] of documented){
      assert(source.includes(accessId)&&source.includes(String(cid)),'Missing A09 source for '+accessId);
      assert(!pack.record.routes.some(r=>r.id.includes(accessId)),'Extra documentary access miscounted as full combo');
    }
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

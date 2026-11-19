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
const master=fs.readFileSync(path.join(root,'02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md'),'utf8');
assert(master.includes('Puerta de aceptación transversal A01–A10'),'Master must enforce end-to-end contract');
for(let i=1;i<=10;i++)assert(master.includes('| A'+String(i).padStart(2,'0')+' |'),'Master crosswalk missing A'+i);
assert(master.includes('Kashtira es referencia'),'Reference comparison must not copy Kashtira cards');
assert(master.includes('DOCUMENTADA_SIN_CAMPO_ESPACIAL'),'Unknown endboards must not be invented');
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
  reports.push({deck_id:id,cards:pack.record.cards.length,steps:steps.length,illustrated_steps:photos,spatial_endboards:boards,routes,visual_complete:complete});
}
console.log(JSON.stringify({ok:true,protected_prompts:39,modules_with_acceptance:10,existing_decks:reports}));

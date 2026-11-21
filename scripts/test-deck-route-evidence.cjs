'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks');
const pilots=[
  {deck_id:671,folder:'DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO',routes:12,steps:69,rows:40,main:41,extra:15,side:14},
  {deck_id:677,folder:'DECK_NUEVO_13_CRISTRON_HORUS',routes:14,steps:60,rows:40,main:40,extra:15,side:15}
];
const normalize=s=>String(s??'').replace(/<\/?[^>]+>/g,'').replace(/\*\*/g,'').split(String.fromCharCode(96)).join('').replace(/\s+/g,' ')
  .normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().trim();
const reports=[];
for(const pilot of pilots){
  const base=path.join(root,pilot.folder);
  const envelope=JSON.parse(fs.readFileSync(path.join(base,'datos/stationx-deck.json'),'utf8'));
  const record=envelope.record;
  assert.equal(envelope.schema,'station-x-deck-package/1');
  assert.equal(envelope.inventory_binding,'deck-slots-v1');
  assert.equal(envelope.package_root,pilot.folder);
  assert.equal(envelope.deck_id,pilot.deck_id);
  assert.equal(record.deck_id,pilot.deck_id);
  assert.equal(record.schema,'station-x-curated-v62');
  assert.equal(record.cards.length,39);
  assert.equal(envelope.inventory.length,pilot.rows);
  assert.equal(record.routes.length,pilot.routes);
  assert.equal(record.presentation_contract,undefined,'Illustrative boards are not certified exact placements');
  const totals={main:0,extra:0,side:0};
  const actual=new Set();
  for(const c of envelope.inventory){
    assert(!actual.has(c.id),'Inventory row repeated');
    actual.add(c.id);
    totals[c.section]=(totals[c.section]||0)+Number(c.quantity);
  }
  assert.equal(totals.main,pilot.main);
  assert.equal(totals.extra,pilot.extra);
  assert.equal(totals.side,pilot.side);
  if(pilot.deck_id===671){
    const certified=record.routes.filter(route=>route.replay_certification?.status==='REPLAY_CERTIFIED');
    assert.equal(certified.length,11,'C01–C11 must each have scoped evidence');
    for(const id of ['C01','C02','C03','C04','C05','C06','C07','C08','C09','C10','C11']){
      const route=record.routes.find(r=>r.id==='671:A09:'+id);
      assert.equal(route.replay_certification?.scope,id==='C08' ?
        'exact-opening-observed-opponent-activation-no-further-response' :
        'exact-opening-no-opponent-response');
      assert(route.replay_certification.test.endsWith('_route_replay_test.cjs'));
    }
    const c05=record.routes.find(route=>route.id==='671:A09:C05');
    assert.equal(c05.replay_certification?.documented_steps,9);
    assert.equal(c05.replay_certification?.executed_transitions,13);
    assert(c05.replay_certification?.verified_final.includes('segunda Fusión'),
      'The second physical Fusion Spell must remain in the graveyard');
    const c06=record.routes.find(route=>route.id==='671:A09:C06');
    assert.equal(c06.replay_certification?.documented_steps,5);
    assert.equal(c06.replay_certification?.executed_transitions,10);
    assert(c06.replay_certification?.verified_final.includes('Goblin en mano'),
      'C06 holds Goblin in hand; do not claim protection was activated');
    assert(c06.replay_certification?.limits.includes('NO se activa'),
      'No-response Twin Dragon replay cannot certify Goblin Quick Effect');
    const c07=record.routes.find(route=>route.id==='671:A09:C07');
    assert.equal(c07.replay_certification?.documented_steps,4);
    assert.equal(c07.replay_certification?.executed_transitions,8);
    assert(c07.replay_certification?.verified_final.includes('identidad desconocida'),
      'C07 must not invent the card drawn by Guardian Chimera');
    assert(c07.replay_certification?.limits.includes('ni otorga protección de Polimerización'),
      'Mementotlan Fusion cannot be misrepresented as Polymerization');
    const c08=record.routes.find(route=>route.id==='671:A09:C08');
    assert.equal(c08.replay_certification?.documented_steps,4);
    assert.equal(c08.replay_certification?.executed_transitions,5);
    assert(c08.replay_certification?.limits.includes('no se simula ni certifica el efecto original rival'),
      'C08 must not claim resolution of the opponent original activation');
    assert(c08.replay_certification?.verified_final.includes('sin Invocación Especial'),
      'C08 End Phase return cannot be called a Special Summon');
    const c10=record.routes.find(route=>route.id==='671:A09:C10');
    assert(!c10.opening.includes('No se acreditó mediante simulación.'),
      'C10 cannot retain a no-simulation warning after scoped certification');
    assert.equal(c10.replay_certification?.documented_steps,5);
    assert.equal(c10.replay_certification?.executed_transitions,11);
    assert(c10.result.includes('Secuencia')&&c10.result.includes('Duque')&&
      c10.result.includes('Angbruja'), 'C10 must expose its evidenced final board');
    const c09=record.routes.find(route=>route.id==='671:A09:C09');
    assert(!c09.opening.includes('No se acreditó mediante simulación.'),
      'Certified route cannot keep an obsolete unverified-simulation note');
    assert.equal(c09.replay_certification?.documented_steps,5);
    assert.equal(c09.replay_certification?.executed_transitions,8);
    assert(c09.replay_certification?.verified_final.includes('cero robos'),
      'C09 Princess contact Summon cannot trigger a draw from material Goblin');
    assert(c09.replay_certification?.limits.includes('no es Fusión ordinaria'),
      'C09 is an Extra Deck contact Special Summon, not normal Fusion');
  }
  const sources=fs.readFileSync(path.join(base,pilot.folder+'_CONTENIDO_CURADO.md'),'utf8');
  const lines=sources.split('\n');
  const identity=new Map(record.cards.map(c=>[Number(c.cid),c]));
  const files=new Set(fs.readdirSync(path.join(base,'imagenes')));
  const checkPhoto=photo=>{
    assert(identity.has(Number(photo.cid)),'A card image cannot belong to another deck: '+photo.cid);
    assert.equal(photo.name,identity.get(Number(photo.cid)).name);
    assert.equal(photo.image,identity.get(Number(photo.cid)).image);
    const m=photo.image.match(/\/imagenes\/([0-9]+\.(?:png|jpe?g|webp|gif))$/i);
    assert(m&&files.has(m[1]),'Photo missing in GPT folder: '+photo.image);
  };
  let totalSteps=0,totalVariants=0,photos=0;
  for(const route of record.routes){
    assert(route.id.startsWith(pilot.deck_id+':'));
    assert(route.result.trim(),'A route cannot hide an empty result: '+route.id);
    assert.equal(route.presentation_status,'ZONAS_DOCUMENTADAS_CASILLAS_ILUSTRATIVAS');
    assert.equal(route.endboard.source,'A09_SOURCE_DERIVED');
    assert.equal(route.endboard.spatial_verified,false);
    assert(route.endboard.variants.length>0);
    const short=route.id.split(':').at(-1);
    const expression=new RegExp('^#{3,4}\\s+(?:MEMD-)?'+short+'\\b');
    const heading=lines.findIndex(line=>expression.test(line)&&!/verificación por texto oficial/.test(line));
    assert(heading>=0,'A09 source route missing: '+short);
    const rest=lines.slice(heading+1);
    const next=rest.findIndex(line=>/^#{3,4}\s+/.test(line));
    const section=rest.slice(0,next>=0?next:undefined);
    const writtenSteps=section.filter(line=>/^\d+\.\s+/.test(line));
    assert.equal(route.steps.length,writtenSteps.length,'Source A09 step count drift '+short);
    for(let i=0;i<route.steps.length;i++){
      const step=route.steps[i],sourceStep=normalize(writtenSteps[i].replace(/^\d+\.\s+/,'')),jsonStep=normalize(step.action);
      assert(sourceStep.slice(0,24)===jsonStep.slice(0,24),'A09 source/action mismatch '+short+'#'+(i+1));
      assert(step.photos?.length>0,'Missing visual card for '+route.id+' step '+(i+1));
      for(const photo of step.photos)checkPhoto(photo);
      photos++;totalSteps++;
    }
    for(const variant of route.endboard.variants){
      totalVariants++;
      assert.equal(variant.spatial_verified,false,'Never certify arbitrary column positions');
      assert.equal(variant.columns,5);
      assert(variant.layout_note.toLowerCase().includes('ilustrativ'),'Must disclose illustrative columns');
      const zones=['monster','spell','field','hand','graveyard','banished','deck','extra'];
      for(const zone of zones){
        assert(Array.isArray(variant[zone]),'Missing zone '+zone);
        for(const photo of variant[zone]){
          checkPhoto(photo);
          if(zone==='monster'||zone==='spell')assert(Number.isInteger(photo.slot)&&photo.slot>=1&&photo.slot<=5);
          for(const material of photo.materials||[])checkPhoto(material);
          if(photo.materials)assert.equal(photo.material_count,photo.materials.length,'Xyz material count differs from known cards');
        }
      }
    }
  }
  assert.equal(totalSteps,pilot.steps);
  reports.push({deck_id:pilot.deck_id,routes:record.routes.length,illustrated_steps:photos,steps:totalSteps,
    documented_zone_diagrams:record.routes.length,variants:totalVariants,exact_slots_certified:0});
}
console.log(JSON.stringify({ok:true,source:'original Markdown A09',pilots:reports}));

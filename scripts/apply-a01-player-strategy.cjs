'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {validatePlayerGuide,validateStrategy}=require('./a01-player-guide-contract.cjs');
const {validateProfile,assertSourceParity}=require('./a01-profile-contract.cjs');
const root=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks');
const evidence=path.resolve(__dirname,'../03_COMPROBACIONES_NO_IMPORTAR/A01_CIERRES_INDIVIDUALES');
const ids=[653,671,677,665,650,656,670,684,687,660,673,699,704,705,706,707];
const pending=[], report=[];
for(const id of ids){
 const matches=fs.readdirSync(evidence).filter(n=>n.startsWith(id+'_')&&n.endsWith('.md'));assert.equal(matches.length,1);
 const act=fs.readFileSync(path.join(evidence,matches[0]),'utf8');
 const m=act.match(/<!-- A01_ESTRATEGIA_REVISADA -->\s*```json\s*([\s\S]+?)\s*```/);assert(m,'Missing authored strategy '+id);
 const strategy=JSON.parse(m[1]);
 const folders=fs.readdirSync(root).filter(n=>{const f=path.join(root,n,'datos/stationx-deck.json');return fs.existsSync(f)&&JSON.parse(fs.readFileSync(f,'utf8')).deck_id===id;});
 assert.equal(folders.length,1);const folder=folders[0];
 const jp=path.join(root,folder,'datos/stationx-deck.json'), mp=path.join(root,folder,folder+'_CONTENIDO_CURADO.md');
 const orig=JSON.parse(fs.readFileSync(jp,'utf8')), p=structuredClone(orig);
 let oldMd=fs.readFileSync(mp,'utf8');assert.equal(p.record.deck_id,id);
 validateProfile(p.record);assertSourceParity(p.record,oldMd);
 if(id===707){
  const oldRisk=p.record.profile['Qué vigilar'];
  const newRisk='Illusion of Execution solo está disponible desde el turno 2 y exige la construcción y revelación correctas. Conserva el acceso a la única copia de Mago Oscuro; el nombre del Hechicero Eliminador dura un turno. Las Fusiones Gaia carecen de materiales accesibles en esta lista.';
  const oldLine='- **Qué vigilar:** '+oldRisk;assert(oldMd.includes(oldLine));oldMd=oldMd.replace(oldLine,'- **Qué vigilar:** '+newRisk);p.record.profile['Qué vigilar']=newRisk;
 }
 p.record.player_guide.strategy=strategy;
 validateStrategy(p.record);validatePlayerGuide(p.record);
 const copy=structuredClone(p);if(orig.record.player_guide.strategy)copy.record.player_guide.strategy=orig.record.player_guide.strategy;else delete copy.record.player_guide.strategy;
 if(id===707)copy.record.profile['Qué vigilar']=orig.record.profile['Qué vigilar'];
 assert.deepEqual(copy,orig,'Non-A01 data changed: '+id);
 const names=new Map(p.record.cards.map(c=>[c.cid,c.name]));
 const block=['<!-- A01_PLAYER_STRATEGY_V2_START -->','### Plan práctico de juego',...strategy.sections.flatMap(s=>['','#### '+s.title,'','**Objetivo:** '+s.objective,'','**Situación:** '+s.situation,'','**Cartas:** '+s.card_cids.map(cid=>names.get(cid)).join(', '),'',...s.actions.map((a,i)=>(i+1)+'. '+a),'','**Resultado esperado:** '+s.expected_result,'','**Recursos que conservar:** '+s.resources_to_keep,'','**Alternativa:** '+s.alternative]),'','<!-- A01_PLAYER_STRATEGY_V2_END -->',''].join('\n');
 const cleaned=oldMd.replace(/<!-- A01_PLAYER_STRATEGY_V2_START -->[\s\S]*?<!-- A01_PLAYER_STRATEGY_V2_END -->\n?/g,'');
 const marker=/^## APARTADO_02\b/m;assert(marker.test(cleaned),'A02 boundary missing '+id);
 const md=cleaned.replace(marker,match=>block+'\n'+match);
 assertSourceParity(p.record,md);
 pending.push([jp,JSON.stringify(p,null,2)+'\n'],[mp,md]);report.push({deck_id:id,lessons:strategy.sections.length,status:'STRUCTURE_PASS_SEMANTIC_BROWSER_PENDING'});
}
assert.equal(pending.length,32);assert.equal(report.reduce((s,r)=>s+r.lessons,0),128);
for(const [file,content] of pending)fs.writeFileSync(file,content);
console.log(JSON.stringify(report,null,2));
console.log('A01_APPLIED 16 decks, 128 individually authored lessons, non-A01 JSON unchanged; no semantic certification');

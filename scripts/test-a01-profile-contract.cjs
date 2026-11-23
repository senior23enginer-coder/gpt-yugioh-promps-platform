'use strict';
const assert=require('node:assert/strict');
const {CONTRACT,FIELDS,validateProfile,assertSourceParity}=require('./a01-profile-contract.cjs');
const copy=v=>JSON.parse(JSON.stringify(v));
const profile={
 'Arquetipo':'Nexo Umbral',
 'Tipo de estrategia':'Combo de Fusión y Cementerio',
 'Estilo breve':'Prepara recursos en el Cementerio y desarrolla Fusiones para mantener presión.',
 'Resumen para ficha':'Inicia con cartas válidas, convierte recursos en materiales de Fusión y gana ventaja de forma condicional.',
 'Cómo se juega':'Primero conserva recursos; segundo verifica amenazas y materiales. En el juego tardío recupera cartas si las condiciones reales se cumplen.',
 'Qué vigilar':'Pérdida de recursos e interrupciones de las Invocaciones.'
};
const record={a01_profile_contract:CONTRACT,profile};
const section=['## APARTADO_01 — Propósito estratégico',
 ...FIELDS.map(key=>'- **'+key+':** '+profile[key]),
 '## APARTADO_02 — Siguiente etapa'].join('\n');
assert.equal(validateProfile(record).fields,6);
assert.equal(assertSourceParity(record,section).fields,6);
function bad(modify,message){
 const a=copy(record);modify(a);
 assert.throws(()=>validateProfile(a),message);
}
bad(x=>delete x.a01_profile_contract,/A01_EXPLICIT_CONTRACT_REQUIRED/);
bad(x=>x.a01_profile_contract='desconocido',/A01_EXPLICIT_CONTRACT_REQUIRED/);
bad(x=>delete x.profile['Resumen para ficha'],/A01_NON_STRING/);
bad(x=>x.profile['Estilo breve']='x'.repeat(191),/A01_TOO_LONG/);
bad(x=>x.profile['Resumen para ficha']='x'.repeat(251),/A01_TOO_LONG/);
bad(x=>x.profile['Arquetipo']='Nexo Umbral — estudio individual',/A01_DIRTY_ARCHETYPE/);
bad(x=>x.profile['Tipo de estrategia']='Consultar el plan de juego',/A01_PLACEHOLDER/);
bad(x=>x.profile['Cómo se juega']='Poco',/A01_FULL_GAMEPLAN_REQUIRED/);
bad(x=>x.profile['Qué vigilar']='Nada',/A01_RISKS_REQUIRED/);
assert.throws(()=>assertSourceParity(record,section.replace('Nexo Umbral','Otro arquetipo')),
 /A01_MD_JSON_MISMATCH/);
assert.throws(()=>assertSourceParity(record,'## APARTADO_02'),/A01_SOURCE_SECTION_REQUIRED/);
const emoji=copy(record);emoji.profile['Estilo breve']='⚔️'.repeat(60);
assert.equal(validateProfile(emoji).fields,6);
console.log(JSON.stringify({ok:true,contract:CONTRACT,tests:14,fields:6,synthetic_only:true,
  analyzed_decks:0,calculator_executed:false}));

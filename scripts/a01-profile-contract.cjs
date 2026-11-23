'use strict';
// A01 source contract. Pure validation: never discovers or analyzes decks.
const assert=require('node:assert/strict');

const CONTRACT='station-x-a01-profile/1';
const FIELDS=['Arquetipo','Tipo de estrategia','Estilo breve',
  'Resumen para ficha','Cómo se juega','Qué vigilar'];
const LIMITS={'Estilo breve':190,'Resumen para ficha':250};
const UNSUITABLE=/cat[aá]logo completo|consultar el plan|^pendiente\b|^sin datos\b|dictamen editorial|ganas siempre/i;
function validateProfile(record){
  assert(record && typeof record==='object'&&!Array.isArray(record),'A01_RECORD_REQUIRED');
  assert.equal(record.a01_profile_contract,CONTRACT,'A01_EXPLICIT_CONTRACT_REQUIRED');
  const profile=record.profile;
  assert(profile && typeof profile==='object'&&!Array.isArray(profile),'A01_PROFILE_REQUIRED');
  for(const key of FIELDS){
    const value=profile[key];
    assert.equal(typeof value,'string','A01_NON_STRING_'+key);
    assert.equal(value, value.trim(),'A01_EXTRA_WHITESPACE_'+key);
    assert(value.length>0 && !/\s{3,}/.test(value) && !/[<>]/.test(value),'A01_INVALID_TEXT_'+key);
    assert(!UNSUITABLE.test(value.trim()),'A01_PLACEHOLDER_'+key);
    if(LIMITS[key])assert(Array.from(value).length<=LIMITS[key],'A01_TOO_LONG_'+key);
  }
  assert(!/\b(?:estudio individual|iteraci[oó]n|versi[oó]n\s*[v\d]|dictamen)\b|\b\d{4}-\d{2}-\d{2}\b/i
    .test(profile.Arquetipo),'A01_DIRTY_ARCHETYPE');
  assert(Array.from(profile['Cómo se juega']).length>=60,'A01_FULL_GAMEPLAN_REQUIRED');
  assert(Array.from(profile['Qué vigilar']).length>=15,'A01_RISKS_REQUIRED');
  return {ok:true,contract:CONTRACT,fields:FIELDS.length,styleLength:Array.from(profile['Estilo breve']).length,
    summaryLength:Array.from(profile['Resumen para ficha']).length};
}
function assertSourceParity(record,markdown){
  validateProfile(record);
  assert.equal(typeof markdown,'string','A01_MARKDOWN_REQUIRED');
  const start=markdown.indexOf('## APARTADO_01');
  assert(start>=0,'A01_SOURCE_SECTION_REQUIRED');
  const next=markdown.indexOf('\n## APARTADO_02',start);
  const section=markdown.slice(start,next<0?undefined:next);
  for(const field of FIELDS){
    // Canonical A01 values are one paragraph per field, preserving exact text.
    const escaped=field.replace(/[.*+?^\\$\x7b\x7d()|[\]\\]/g,'\\$&');
    const re=new RegExp('^- \\*\\*'+escaped+':\\*\\* (.+)$','gm');
    const found=[...section.matchAll(re)].map(m=>m[1]);
    assert.equal(found.length,1,'A01_SOURCE_FIELD_COUNT_'+field);
    assert.equal(found[0],record.profile[field],'A01_MD_JSON_MISMATCH_'+field);
  }
  return {ok:true,fields:FIELDS.length,source:'APARTADO_01'};
}
module.exports={CONTRACT,FIELDS,validateProfile,assertSourceParity};

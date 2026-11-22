'use strict';
/**
 * A05 documentary semantic audit for user-assigned Crystron/Horus 677.
 * The source-specific ordinal oracle was compared independently against
 * Konami Neuron TCG PSCT; a registry with invented/misattributed or missing
 * clauses must fail CI. Paper P/N are proposals, not independent replays.
 */
const a=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),DECKS=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
const OFFICIAL='https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=';
const TYPES=new Set(['PRO','CONT','TRG','ACT','QCK','SPL']);
const COUNTS=new Map(Object.entries({
 20759:2,12608:2,20758:2,12756:2,12606:1,12609:2,19153:3,19155:2,
 12950:1,9279:1,20500:2,20206:2,20798:3,19200:3,7445:1,15299:1,
 5236:1,20817:2,13710:5,20778:4,12781:3,19188:3,20787:3,
 11765:5,10870:4,12157:3,13826:4,16850:3,13360:3,17746:3,
 13454:3,9454:2,11243:3,11411:1,13619:1,15296:3,16868:1,
 11849:1,4861:1
}).map(([k,v])=>[Number(k),v]));
const FIELDS=[
 'Actor / zona','Ventana','Guarda física','Coste','Objetivo y selección',
 'Resolución y estado posterior','Límite / cadena','Contraejemplo',
 'Fuente oficial','Casos de papel','Estado'
];
/** Independently curated PSCT risk guards, compared with the doc under test. */
const ORACLE={
 '12608:field-destroy-summon-tuner':[['Límite / cadena',/Solo un efecto Smiger/i],['Coste',/NO coste/i],['Guarda física',/Cantante Cristron/]],
 '12608:gy-banish-search-spelltrap':[['Coste',/Desterrar/i],['Límite / cadena',/Solo un efecto Smiger/i]],
 '20758:response-summon-synchro':[['Ventana',/activaci[oó]n.*rival/i],['Resolución y estado posterior',/no negar/i]],
 '20758:gy-banish-destroy-synchro-summon-two':[['Coste',/Desterrar Tristaros/i],['Resolución y estado posterior',/Extra solo M[aá]quina/i]],
 '12756:hand-gy-discard-revive':[['Coste',/Descartar otro Cristron/i]],
 '12606:opponent-main-battle-target-revive-synchro':[['Ventana',/Main o Battle rival/i],['Resolución y estado posterior',/desterrar ambos/i]],
 '19153:hand-send-two-search-sarcophagus':[['Coste',/Enviar dos cartas/i],['Resolución y estado posterior',/robo adicional opcional/i]],
 '19155:on-opponent-remove-recover-two':[['Objetivo y selección',/dos cartas/i]],
 '12950:hand-deck-effect-negate':[['Coste',/Descartar/i],['Resolución y estado posterior',/EFECTO/i]],
 '9279:after-opponent-main-deck-add':[['Ventana',/fuera de Draw Phase/i]],
 '20500:hand-discard-activate-draw':[['Guarda física',/no controlas cartas/i],['Resolución y estado posterior',/Deck\/Extra/i]],
 '20206:hand-discard-activate-draw':[['Resolución y estado posterior',/desde mano/i]],
 '20798:gy-banish-target-revive':[['Coste',/Desterrar Inclusi[oó]n/i]],
 '19200:hand-send-horus-deck-gy':[['Límite / cadena',/cuatro usos/i],['Coste',/Enviar una carta/i]],
 '15299:quick-send-n-negate-opponent-monsters':[['Objetivo y selección',/NO target/i],['Coste',/Enviar N otras cartas/i]],
 '13710:quick-reduce-level-negate-spelltrap':[['Resolución y estado posterior',/Negar activaci[oó]n/i]],
 '20778:on-synchro-recover-card':[['Ventana',/tras invocaci[oó]n por Sincron[ií]a/i]],
 '12781:synchro-three-materials':[['Guarda física',/Dos o m[aá]s Cantantes/i]],
 '19188:quick-opponent-activation-temporary-banish':[['Objetivo y selección',/dos monstruos/i],['Resolución y estado posterior',/sin negar/i]],
 '20787:on-link-send-continuous-search-clockworknight':[['Contraejemplo',/NO_APLICA.*Clockwork Night/i]],
 '11765:alternative-xyz-on-nova':[['Coste',/transferir/i],['Resolución y estado posterior',/Nova/i]],
 '11765:quick-detach-negate-activation':[['Resolución y estado posterior',/ACTIVACI[OÓ]N/i]],
 '10870:detach-target-cyberdragon-revive':[['Contraejemplo',/NO_APLICA.*Cyber Dragon/i]],
 '10870:sent-gy-by-opponent-fusion-machine':[['Contraejemplo',/NO_APLICA.*Fusi[oó]n M[aá]quina/i]],
 '12157:gy-speedroid-tuner-special':[['Contraejemplo',/NO_APLICA.*Velociroid/i]],
 '13826:quick-detach-negate-opponent-monster':[['Resolución y estado posterior',/Galaxy/i]],
 '13826:opponent-turn-get-photon-galaxy':[['Contraejemplo',/NO_APLICA.*Fot[oó]n\/Galaxia/i]],
 '16850:detach-mill-four-each-special':[['Resolución y estado posterior',/cuatro cartas/i]],
 '17746:fusion-two-same-type-attr-diffnames':[['Guarda física',/mismo Tipo y Atributo/i]],
 '13454:fusion-two-same-attr-diff-types':[['Guarda física',/mismo Atributo y diferente Tipo/i]],
 '11243:quick-tribute-hand-field-banish-lock':[['Ventana',/turno rival/i]],
 '11411:solemn-scolding-pay3000-negate':[['Coste',/3000 LP/i],['Guarda física',/única CARTA COLOCADA/i]],
 '15296:talent-draw-two':[['Ventana',/Main propia/i],['Límite / cadena',/tres modos/i]],
 '4861:solemn-judgment-pay-half-lp-negate':[['Coste',/mitad de LP/i],['Contraejemplo',/no puede negar una activaci[oó]n de efecto de monstruo/i]]
};
function audit(args){
 const j=path.resolve(args.packageFile),f=path.resolve(args.curatedFile);
 a(j.startsWith(DECKS)&&f.startsWith(DECKS),'OUT_OF_DECK_SCOPE');
 a.equal(path.dirname(path.dirname(j)),path.dirname(f),'CROSS_DECK_SOURCE');
 const pkg=JSON.parse(fs.readFileSync(j,'utf8')),doc=fs.readFileSync(f,'utf8');
 a.equal(pkg.deck_id,677);a.equal(pkg.record.deck_id,677);
 a.equal(pkg.record.cards.length,39);a.equal(pkg.record.calculator.rules.length,13);
 const original=new Map(pkg.record.cards.map(c=>[c.cid,c]));
 a.equal(original.size,39);a.equal(COUNTS.size,39);
 const start=doc.indexOf('### A05.2 — censo causal preliminar');
 const end=doc.indexOf('<!-- A05_EFFECTS_END -->',start);
 a(start>=0&&end>start,'MISSING_EFFECT_CENSUS');
 const content=doc.slice(start,end);
 const headers=[...content.matchAll(/^#### (\d+)\. \x60(677:a05:(\d+):[a-z0-9-]+)\x60 — CID (\d+) \(([A-Z]+)\)$/gm)];
 a.equal(headers.length,92,'EXPECTED_INDEPENDENT_92_PSCT_CLAUSES');
 const ids=new Set(),counts=new Map(),paperIds=new Set(),parsed=[];
 for(let i=0;i<headers.length;i++){
  const m=headers[i],index=i+1,id=m[2],cid=Number(m[3]),type=m[5];
  a.equal(Number(m[1]),index,'EFFECT_ORDINAL_CHANGED');
  a.equal(Number(m[4]),cid,'MISATTRIBUTED_EFFECT_'+id);
  a(original.has(cid),'FOREIGN_CARD_IN_EFFECT_CENSUS_'+id);
  a(TYPES.has(type),'UNKNOWN_PSCT_KIND_'+id);
  a(!ids.has(id),'DUPLICATE_EFFECT_ID_'+id);
  ids.add(id);counts.set(cid,(counts.get(cid)||0)+1);
  const block=content.slice(m.index+m[0].length,
    i+1<headers.length?headers[i+1].index:content.length);
  const fields={};
  for(const key of FIELDS){
   const value=block.split('\n').find(line=>line.startsWith('- **'+key+':** '));
   a(value,'MISSING_SEMANTIC_FIELD_'+key+'_'+id);
   const text=value.slice(('- **'+key+':** ').length).trim();
   a(text.length>=28,'EMPTY_SEMANTIC_FIELD_'+key+'_'+id);fields[key]=text;
  }
  a(fields['Fuente oficial'].includes(OFFICIAL+cid+'&ope=2&request_locale=en'),
    'WRONG_OFFICIAL_SOURCE_'+id);
  const paper=fields['Casos de papel'];
  for(const kind of ['P','N']){
   const caseId='677:A05:'+kind+String(index).padStart(3,'0');
   a(paper.includes(caseId),'MISSING_PAPER_CASE_'+caseId);
   a(!paperIds.has(caseId),'DUPLICATED_CASE_ID_'+caseId);paperIds.add(caseId);
  }
  for(const [field,re] of ORACLE[id.slice('677:a05:'.length)]||[])
    a(re.test(fields[field]),'PSCT_SPECIFIC_GUARD_FAILED_'+id+'_'+field);
  parsed.push({id,cid,type,fields});
 }
 a.equal(ids.size,92);a.equal(paperIds.size,184);
 for(const [cid,n] of COUNTS){
  a.equal(counts.get(cid),n,'INCOMPLETE_PUBLISHED_PSCT_SET_CID_'+cid);
 }
 const noAplica=parsed.filter(x=>/NO_APLICA/.test(x.fields['Contraejemplo']));
 // These were not automatically promoted to VERIFIED; physical paper states
 // and legal chain transitions remain an independent A05-T4 obligation.
 a(parsed.every(x=>x.fields['Estado'].includes('CONDICIONAL_PENDIENTE')));
 const typeCounts=Object.fromEntries([...TYPES].map(t=>[t,parsed.filter(x=>x.type===t).length]));
 return {ok:true,deck_id:677,identities:39,officialClauseRecords:92,
  semanticFields:92*8,typedPSCTKinds:typeCounts,linkedPaperCaseDescriptions:184,
  noApplicableResourceWarnings:noAplica.length,
  independentHighRiskGuards:Object.keys(ORACLE).length,
  physicalTransitionsIndependentlyCertified:0,
  calculatorVariantsRetained:13,calculatorExecuted:false,
  A05T1T2T3ReadyForDocumentaryClose:true,A05T4IndependentClosure:false};
}
if(require.main===module){
 const args=process.argv.slice(2);
 a(args.includes('--user-assigned'),'EXPLICIT_CRYSTRON_ASSIGNMENT_REQUIRED');
 const id=Number(args.find(x=>x.startsWith('--deck-id='))?.split('=')[1]);
 a.equal(id,677);
 const paths=args.filter(x=>!x.startsWith('--'));a.equal(paths.length,2);
 console.log(JSON.stringify(audit({packageFile:paths[0],curatedFile:paths[1]})));
}
module.exports={audit};
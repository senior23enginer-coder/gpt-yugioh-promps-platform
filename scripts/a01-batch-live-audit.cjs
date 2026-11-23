'use strict';
/**
 * Scope-only audit for the user's explicit batch A01 assignment.
 * Never certifies T1-T5, creates effects, changes inventories or publishes decks.
 * Input must be a real native decklist snapshot; sources are existing GPT files.
 */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const root=path.resolve(__dirname,'..');
function inspect(snapshot){
  assert(Array.isArray(snapshot)&&snapshot.length>0,'A01 requires actual native decklist records');
  const folders=path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks');
  const names=fs.readdirSync(folders).filter(x=>fs.statSync(path.join(folders,x)).isDirectory());
  const found=[],excluded=[];
  for(const deck of snapshot){
    assert(Number.isInteger(deck.id)&&deck.id>0&&Array.isArray(deck.cards),'Invalid native decklist');
    const counts={main:0,extra:0,side:0,reserve:0};
    const rows=deck.cards.map(x=>({
      id:Number(x.id),section:String(x.section).toLowerCase()==='tech'?'reserve':String(x.section).toLowerCase(),
      quantity:Number(x.quantity)
    }));
    for(const row of rows){assert(Object.hasOwn(counts,row.section),'Unknown native zone');counts[row.section]+=row.quantity;}
    const format=String(deck.format||'').trim().toLowerCase();
    const withExtra=new Set(['tcg','tcg_advanced','tcg_traditional','ocg','ocg_advanced']);
    const mainOnly=new Set(['goat','rush','rush_duel']);
    const requiredSections=withExtra.has(format)?['main','extra']:['main'];
    if(!withExtra.has(format)&&!mainOnly.has(format)){
      excluded.push({deck_id:deck.id,name:deck.name,format,counts,reason:'UNKNOWN_FORMAT_REQUIRES_VERIFICATION'});continue;
    }
    if(requiredSections.some(section=>counts[section]===0)){
      excluded.push({deck_id:deck.id,name:deck.name,format,counts,
        required_sections:requiredSections,reason:'REQUIRED_SECTION_NOT_LOADED'});continue;
    }
    const matches=names.filter(x=>x.startsWith('DECK_'+deck.id+'_'));
    const mapped=deck.source_folder && names.includes(deck.source_folder)?deck.source_folder:matches[0];
    if(!mapped){found.push({deck_id:deck.id,name:deck.name,counts,source:'MISSING_GPT_FOLDER',task_status:'BLOCKED'});continue;}
    const folder=path.join(folders,mapped),md=fs.readdirSync(folder).filter(x=>x.endsWith('_CONTENIDO_CURADO.md'));
    const doc=md.length===1?fs.readFileSync(path.join(folder,md[0]),'utf8'):'';
    const jsonPath=path.join(folder,'datos/stationx-deck.json');
    const pack=fs.existsSync(jsonPath)?JSON.parse(fs.readFileSync(jsonPath,'utf8')):null;
    const payload={deck_id:deck.id,format,
      inventory:rows,record:{deck_id:deck.id,format,
        cards:rows.map(r=>({slots:[{card_id:r.id,section:r.section,quantity:r.quantity}]}))}};
    const gate=validateDeckAssignment({selectedDeckId:deck.id,explicitlyAssigned:true,payload});
    const a01Begin=doc.indexOf('APARTADO_01'),a02Begin=doc.indexOf('APARTADO_02',a01Begin+1);
    const sourceA01=a01Begin<0?'':doc.slice(a01Begin,a02Begin>a01Begin?a02Begin:a01Begin+15000);
    const evidence={
      required_sections_authorized:gate.eligible,
      source_markdown:md.length===1,
      existing_a01_section:sourceA01.length>120,
      has_documented_cids:/CID|cid=\d+/i.test(sourceA01),
      has_canonical_json:!!pack,
      canonical_record_id:pack?.record?.deck_id||null,
      six_profile_fields:['Arquetipo','Tipo de estrategia','Estilo breve','Resumen para ficha','Cómo se juega','Qué vigilar'].every(k=>typeof pack?.record?.profile?.[k]==='string'&&pack.record.profile[k].trim()),
      player_guide_schema:pack?.record?.player_guide?.schema||null,
      routes:pack?.record?.routes?.length??null,
    };
    found.push({deck_id:deck.id,name:deck.name,format:payload.format,counts,required_sections:requiredSections,source_folder:mapped,
      canonical_md:md[0]||null,source_a01_excerpt:sourceA01.slice(0,1100),
      evidence,task_status:'PREFLIGHT_ONLY_NOT_A01_COMPLETE',
      next:'A01-T1 research: verify actual card identities, official effects, strategy, and source compatibility',
    });
  }
  return {schema:'stationx-a01-batch-live-preflight/1',explicit_user_batch_assignment:true,
    required_sections_by_format:{tcg:['main','extra'],ocg:['main','extra'],goat:['main'],rush_duel:['main']},optional_sections:['side','reserve'],
    eligible_count:found.length,not_eligible_count:excluded.length,
    decks:found,excluded,analysis_completed:0,production_imports:0};
}
if(require.main===module){
  const input=process.argv[2],output=process.argv[3];
  assert(input&&output,'Usage: node ... input.json output.json');
  const report=inspect(JSON.parse(fs.readFileSync(input,'utf8')));
  fs.mkdirSync(path.dirname(output),{recursive:true});
  fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({eligible:report.eligible_count,excluded:report.not_eligible_count,
    haveMarkdown:report.decks.filter(x=>x.evidence?.source_markdown).length,
    haveJson:report.decks.filter(x=>x.evidence?.has_canonical_json).length,
    blocked:report.decks.filter(x=>x.task_status==='BLOCKED').map(x=>x.deck_id)}));
}
module.exports={inspect};

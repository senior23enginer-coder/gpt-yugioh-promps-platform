'use strict';
/** A05-T1 identity/functional-profile gate for one explicitly assigned deck. */
const fs=require('node:fs'),path=require('node:path'),a=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),base=path.join(root,'01_INFORMACION_PARA_IMPORTAR/decks')+path.sep;
function audit(deckId,jsonPath,mdPath){
 a.equal(deckId,677);const file=path.resolve(jsonPath),mdFile=path.resolve(mdPath);
 a(file.startsWith(base)&&mdFile.startsWith(base));
 a.equal(path.dirname(path.dirname(file)),path.dirname(mdFile));
 const pkg=JSON.parse(fs.readFileSync(file,'utf8')),doc=fs.readFileSync(mdFile,'utf8');
 a.equal(pkg.deck_id,677);a.equal(pkg.record.deck_id,677);
 const cards=pkg.record.cards;a.equal(cards.length,39);
 const counts={main:0,extra:0,side:0,reserve:0},slots=new Set(),cids=new Set(),reports=[];
 for(const c of cards){
  a(!cids.has(c.cid));cids.add(c.cid);
  a.equal(c.id,'677:CARD:'+c.cid,'STABLE_ID_'+c.cid);
  a(typeof c.name==='string'&&c.name.length>3,'NO_NAME_'+c.cid);
  a(c.sources.some(s=>s.startsWith('https://www.db.yugioh-card.com/yugiohdb/')&&s.includes('cid='+c.cid)),
   'OFFICIAL_SOURCE_MISSING_'+c.cid);
  a(c.full_image.includes('/imagenes/'+c.cid+'.'),'PHOTO_CID_'+c.cid);
  a(fs.existsSync(path.resolve(base,c.full_image)),'MISSING_REAL_PHOTO_'+c.cid);
  a(Array.isArray(c.fields)&&c.fields.length>0,'MISSING_PLAYER_FIELDS_'+c.cid);
  a(typeof c.functional?.purpose==='string'&&c.functional.purpose.trim().length>=48,
   'MISSING_FUNCTIONAL_PURPOSE_'+c.cid);
  a(typeof c.role==='string'&&c.role.length>=48,'MISSING_CARD_ROLE_'+c.cid);
  for(const s of c.slots){
   a(Number.isInteger(s.card_id)&&!slots.has(s.card_id),'DUPLICATE_ROW');
   slots.add(s.card_id);a(Object.hasOwn(counts,s.section));counts[s.section]+=s.quantity;
  }
  reports.push({cid:c.cid,name:c.name,slots:c.slots.map(x=>x.section+':'+x.quantity),
   official:'https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid='+c.cid+'&ope=2&request_locale=en'});
 }
 a.deepEqual(counts,{main:40,extra:15,side:15,reserve:0});
 a.equal(slots.size,40);a.equal(cids.size,39);
 a(doc.includes('### A05.1 —'),'A05_ROLE_SECTION_MISSING');
 const rows=doc.split('\n').filter(x=>/^\| CRYH-\d{3} \|/.test(x));
 a.equal(rows.length,39,'MATRIX_39_MISSING');
 const sourced=new Set(rows.map(r=>Number(r.match(/card_search\.action\?cid=(\d+)/)?.[1])));
 a.equal(sourced.size,39);for(const cid of cids)a(sourced.has(cid),'MATRIX_MISSING_'+cid);
 return {ok:true,deck_id:677,identities:39,slots:40,counts,
  playerFacingRoles:39,officialCIDLinks:39,photos:39,
  physicalMainExtraSideComplete:true,
  effectCensusComplete:false,calculatorExecuted:false,
  details:reports};
}
if(require.main===module){
 const argv=process.argv.slice(2);a(argv.includes('--user-assigned'));
 const id=Number(argv.find(v=>v.startsWith('--deck-id='))?.split('=')[1]);
 const files=argv.filter(v=>!v.startsWith('--'));a.equal(files.length,2);
 const out=audit(id,files[0],files[1]);delete out.details;console.log(JSON.stringify(out));
}
module.exports={audit};
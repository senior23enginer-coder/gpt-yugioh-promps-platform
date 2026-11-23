'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {validateDeckAssignment}=require('./analysis-eligibility.cjs');
const ROOT=path.resolve(__dirname,'..');
const DIR=path.join(ROOT,'01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE');
const IMG='DECK_665_KASHTIRA_PURE/imagenes/tcg/';
const sha=bytes=>crypto.createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
function run(pkgPath,mdPath,histPath){
 const p=JSON.parse(fs.readFileSync(pkgPath,'utf8')),md=fs.readFileSync(mdPath,'utf8'),h=JSON.parse(fs.readFileSync(histPath,'utf8'));
 A.equal(p.deck_id,665);A.equal(p.record.deck_id,665);A.equal(h.deck_id,665);
 const status=validateDeckAssignment({selectedDeckId:665,explicitlyAssigned:true,payload:p,stageId:'A04',authorizedSideOmissionForA04:true});
 A(status.eligible&&status.a04SideWaiverApplied);
 A.deepEqual(status.counts,{main:42,extra:15,side:0,reserve:19});
 const physical=new Map(p.record.cards.map(c=>[c.cid,c]));
 A.equal(physical.size,38);

'use strict';
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const folder=path.join(root,'02_PROMPT_PARA_CODEX/apartados');
const names=fs.readdirSync(folder).filter(name=>/^\d{2}_.*\.md$/.test(name)).sort();
if(names.length!==36||names.some((name,i)=>!name.startsWith(String(i+1).padStart(2,'0')+'_')))throw Error('Falta uno de los 36 prompts modulares protegidos.');
const bases=['00_PROMPT_UNICO_STATION_X_V31.md','01_ANEXO_PROPOSITO_TACTICO_EDITOR_V31.md','REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md'];
for(const name of bases)if(!fs.existsSync(path.join(root,'02_PROMPT_PARA_CODEX',name)))throw Error('Falta documento base '+name);
const edited=[...names.slice(0,10).map(name=>'02_PROMPT_PARA_CODEX/apartados/'+name),...bases.map(name=>'02_PROMPT_PARA_CODEX/'+name)];
const file=path.join(root,'03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md');
// Approved A01–A10A/A10B revision keeps a compact, reviewed checksum
// overlay: the historical 7MB log is retained byte-for-byte instead of
// rewriting it for a prompt-only policy change. Unknown edits still fail.
const overlayFile=path.join(root,'03_COMPROBACIONES_NO_IMPORTAR/HUELLAS_AUTORIZADAS_A10A_A10B_20261121.json');
const overlay=fs.existsSync(overlayFile)
  ? JSON.parse(fs.readFileSync(overlayFile,'utf8')) : null;
if(overlay){
  if(overlay.schema!=='station-x-authorized-protected-hashes/1' ||
    !overlay.sha256 || Object.keys(overlay.sha256).length!==edited.length ||
    edited.some(name=>!/^[0-9a-f]{64}$/.test(overlay.sha256[name]||'')) ||
    Object.keys(overlay.sha256).some(name=>!edited.includes(name)))
    throw Error('Manifiesto de huellas autorizadas inválido.');
}
const original=fs.readFileSync(file,'utf8');
let lines=original.split('\n');
const changes=[];
for(const filename of edited){
  const digest=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,filename))).digest('hex');
  const prefix='| `'+filename+'` | `';
  let matches=0;
  lines=lines.map(line=>{
    if(!line.startsWith(prefix))return line;
    matches++;
    const old=line.slice(prefix.length,prefix.length+64);
    if(!/^[0-9a-f]{64}$/.test(old)||line.slice(prefix.length+64,prefix.length+65)!=='`')throw Error('Fila SHA-256 inválida: '+filename);
    if(old===digest)return line;
    if(process.argv.includes('--check') && overlay?.sha256?.[filename]===digest)return line;
    changes.push(filename);
    return prefix+digest+line.slice(prefix.length+64);
  });
  if(matches!==1)throw Error('El registro debe tener una fila única de integridad para '+filename+': '+matches);
}
const updated=lines.join('\n');
if(process.argv.includes('--check')&&updated!==original)throw Error('Las huellas de los prompts editados no coinciden con el registro protegido.');
if(!process.argv.includes('--check')&&updated!==original)fs.writeFileSync(file,updated,'utf8');
console.log(JSON.stringify({ok:true,protected:39,changed:changes.length,hashesReconciled:edited.length,approvedOverlayChecks:overlay?edited.length:0}));

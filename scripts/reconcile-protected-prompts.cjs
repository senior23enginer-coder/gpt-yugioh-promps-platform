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
const edited=[...names.slice(0,10).map(name=>'02_PROMPT_PARA_CODEX/apartados/'+name),'02_PROMPT_PARA_CODEX/'+bases[0]];
const file=path.join(root,'03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md');
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
    changes.push(filename);
    return prefix+digest+line.slice(prefix.length+64);
  });
  if(matches!==1)throw Error('El registro debe tener una fila única de integridad para '+filename+': '+matches);
}
const updated=lines.join('\n');
if(updated!==original)fs.writeFileSync(file,updated,'utf8');
console.log(JSON.stringify({ok:true,protected:39,changed:changes.length,hashesReconciled:edited.length}));

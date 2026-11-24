#!/usr/bin/env python3
"""A02 only; 16 explicitly assigned decks, sequential. No production writes."""
import datetime, hashlib, http.cookiejar, io, json, pathlib, re, subprocess, sys, tempfile, time, urllib.request, zipfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
BASE='7bd257a47655d332c931f9cf944f8cf099ee2ba7'
PLATFORM='574c6426b3c6668f1ae8b95cd1a539c79ee14d2f'
ORDER=[653,671,677,665,650,656,670,684,687,660,673,699,704,705,706,707]
PROOF=json.loads(r'''{"650":{"production":{"deck_id":650,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:12+00:00","counts":{"main":40,"extra":15,"side":15,"reserve":0},"cards":42,"routes":20,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"ad5abc925b3e4da56ce6d2909d589bda40a9f9d69f5e0a80e60cca5d050e9de9"},"isolated":{"deck_id":650,"status":"ISOLATED_PASS","counts":{"main":40,"extra":15,"side":15,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":42,"routes":20,"rejections":12}},"653":{"production":{"deck_id":653,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:19+00:00","counts":{"main":40,"extra":15,"side":9,"reserve":0},"cards":37,"routes":16,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"126577b4275b91114fe3de1459992eb26d63ba625cc31d76847a7af00ac23c5b"},"isolated":{"deck_id":653,"status":"ISOLATED_PASS","counts":{"main":40,"extra":15,"side":9,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":37,"routes":16,"rejections":12}},"656":{"production":{"deck_id":656,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:25+00:00","counts":{"main":44,"extra":15,"side":0,"reserve":16},"cards":50,"routes":23,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"6040e756e22965067e42399a0495da82fd44b7c85a0c90d98855c00ebf101581"},"isolated":{"deck_id":656,"status":"ISOLATED_PASS","counts":{"main":44,"extra":15,"side":0,"reserve":16},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":50,"routes":23,"rejections":12}},"660":{"production":{"deck_id":660,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:50+00:00","counts":{"main":48,"extra":15,"side":7,"reserve":0},"cards":36,"routes":5,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"8595e7e9d36cc86c1f8d6649a16e92bc87100ca82902069d22cbd7c91a3b4273"},"isolated":{"deck_id":660,"status":"ISOLATED_PASS","counts":{"main":48,"extra":15,"side":7,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":36,"routes":5,"rejections":12}},"665":{"production":{"deck_id":665,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:05+00:00","counts":{"main":42,"extra":15,"side":0,"reserve":19},"cards":38,"routes":16,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"4a051cc00fee67e8a354165b82205288c0a3a2af93654e3cefba0db3d6a89394"},"isolated":{"deck_id":665,"status":"ISOLATED_PASS","counts":{"main":42,"extra":15,"side":0,"reserve":19},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":38,"routes":16,"rejections":12}},"670":{"production":{"deck_id":670,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:31+00:00","counts":{"main":42,"extra":15,"side":0,"reserve":12},"cards":45,"routes":11,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"df0577129fa0193250a4d07aea2982ceb5c3771676e7c9d6b32cf09780af7e06"},"isolated":{"deck_id":670,"status":"ISOLATED_PASS","counts":{"main":42,"extra":15,"side":0,"reserve":12},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":45,"routes":11,"rejections":12}},"671":{"production":{"deck_id":671,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:20:57+00:00","counts":{"main":41,"extra":15,"side":14,"reserve":0},"cards":39,"routes":12,"calculator_rules":353,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"4b565799729edb5187f21500d987329ba9cb0463216bd5aa186175f6418ccb06"},"isolated":{"deck_id":671,"status":"ISOLATED_PASS","counts":{"main":41,"extra":15,"side":14,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":39,"routes":12,"rejections":12}},"673":{"production":{"deck_id":673,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:55+00:00","counts":{"main":40,"extra":15,"side":15,"reserve":0},"cards":39,"routes":5,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"46684ba89a10e0f107f28ef3d1b7cc48af20b6fc89dbd057b7ae640745c8ddb5"},"isolated":{"deck_id":673,"status":"ISOLATED_PASS","counts":{"main":40,"extra":15,"side":15,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":39,"routes":5,"rejections":12}},"677":{"production":{"deck_id":677,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:21:43+00:00","counts":{"main":40,"extra":15,"side":15,"reserve":0},"cards":39,"routes":14,"calculator_rules":13,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"ad28a927e1cdeaf03edf9aef01c67ada9c9f54bbb4626d9a434ad19a07fd5b5c"},"isolated":{"deck_id":677,"status":"ISOLATED_PASS","counts":{"main":40,"extra":15,"side":15,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":39,"routes":14,"rejections":12}},"684":{"production":{"deck_id":684,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:38+00:00","counts":{"main":42,"extra":15,"side":0,"reserve":24},"cards":52,"routes":17,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"ba0b7e0f3234bc35f237b3e0c6613eb2703d8c62e5beda9d9c0e4e5e1aa76c21"},"isolated":{"deck_id":684,"status":"ISOLATED_PASS","counts":{"main":42,"extra":15,"side":0,"reserve":24},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":52,"routes":17,"rejections":12}},"687":{"production":{"deck_id":687,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:45+00:00","counts":{"main":42,"extra":15,"side":0,"reserve":14},"cards":36,"routes":22,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"ebc40f718051b6a53fadfa7d0a5da5b582c4bf7319cf98ea5b632bfda1525280"},"isolated":{"deck_id":687,"status":"ISOLATED_PASS","counts":{"main":42,"extra":15,"side":0,"reserve":14},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":36,"routes":22,"rejections":12}},"699":{"production":{"deck_id":699,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:22:59+00:00","counts":{"main":40,"extra":14,"side":0,"reserve":0},"cards":39,"routes":5,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"2e4d5f4077484ab0329f55d998eca1a511a63140d712ebe191fc2234e7a50552"},"isolated":{"deck_id":699,"status":"ISOLATED_PASS","counts":{"main":40,"extra":14,"side":0,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":39,"routes":5,"rejections":12}},"704":{"production":{"deck_id":704,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:23:10+00:00","counts":{"main":30,"extra":5,"side":0,"reserve":0},"cards":17,"routes":3,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"510ef2111a67eb878b591714e228f94e3f45705d3ee6f16908f78193e0425de3"},"isolated":{"deck_id":704,"status":"ISOLATED_PASS","counts":{"main":30,"extra":5,"side":0,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":17,"routes":3,"rejections":12}},"705":{"production":{"deck_id":705,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:23:26+00:00","counts":{"main":30,"extra":0,"side":0,"reserve":0},"cards":16,"routes":6,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"58cb9af54bbfd86a0094cc1175f0d6f4caed879e0b4c974a6eb3255d06a26fe7"},"isolated":{"deck_id":705,"status":"ISOLATED_PASS","counts":{"main":30,"extra":0,"side":0,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":16,"routes":6,"rejections":12}},"706":{"production":{"deck_id":706,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:23:44+00:00","counts":{"main":30,"extra":8,"side":0,"reserve":0},"cards":17,"routes":9,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"57f7272edc88b181b4a25f40553193259271986689569b080833ec48c4ffd3a2"},"isolated":{"deck_id":706,"status":"ISOLATED_PASS","counts":{"main":30,"extra":8,"side":0,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":17,"routes":9,"rejections":12}},"707":{"production":{"deck_id":707,"status":"PRODUCTION_IMPORT_VERIFIED","updated_at":"2026-11-24T03:24:04+00:00","counts":{"main":30,"extra":7,"side":0,"reserve":0},"cards":20,"routes":9,"calculator_rules":0,"profile_fields":6,"phases":4,"lessons":8,"semantic_certification":false,"source_zip_sha256":"e8e12fc51d5c8881c8c15288c54982175a39b9bd9fa59ceb8b316aea5a723c0c"},"isolated":{"deck_id":707,"status":"ISOLATED_PASS","counts":{"main":30,"extra":7,"side":0,"reserve":0},"fields":6,"featured":4,"phases":4,"lessons":8,"semantic_certification":false,"photos":20,"routes":9,"rejections":12}}}''')
URL='https://stationxtulua.com/yugioh/'
def need(ok,msg):
    if not ok: raise RuntimeError(msg)
def git(*args):
    return subprocess.check_output(['git',*args],cwd=ROOT,text=True).strip()
def zone(z): return 'reserve' if z=='tech' else z
def inv(rows): return sorted((int(r['id']),zone(r['section']),int(r['quantity'])) for r in rows)
def slots(r): return sorted((int(s['card_id']),zone(s['section']),int(s['quantity']),int(c['cid'])) for c in r['cards'] for s in c['slots'])
def cards(r): return sorted((str(c['id']),int(c['cid'])) for c in r['cards'])
def routes(r): return [x['id'] for x in r['routes']]
def no_images(v):
    if isinstance(v,list): return [no_images(x) for x in v]
    if isinstance(v,dict): return {k:no_images(x) for k,x in v.items() if k not in ['image','full_image']}
    return v
def get(opener,url):
    for attempt in range(3):
        try:
            req=urllib.request.Request(url,headers={'Accept':'application/json, application/zip','Cache-Control':'no-cache','User-Agent':'StationX-A02-ReadOnly'})
            with opener.open(req,timeout=30) as response: return response.read()
        except Exception as e:
            if attempt==2: raise RuntimeError('Native read failed: '+type(e).__name__) from None
            time.sleep(3)
def native(opener,url):
    x=json.loads(get(opener,url));need(x.get('ok') is True,'Native GET rejected');return x
def readzip(blob):
    with zipfile.ZipFile(io.BytesIO(blob)) as z:
        need(z.testzip() is None,'ZIP damaged')
        names=[n for n in z.namelist() if n.endswith('/datos/stationx-deck.json') or n=='datos/stationx-deck.json']
        need(len(names)==1,'ZIP must have one native JSON')
        envelope=json.loads(z.read(names[0]))
        folder=envelope['package_root']
        need(all(n.startswith(folder+'/') and '..' not in n.split('/') for n in z.namelist()),'Native ZIP contains a foreign path')
        source=envelope['source_document']
        need(source.startswith(folder+'/') and source in z.namelist() and source.endswith('_CONTENIDO_CURADO.md'),'Native export source missing')
        if envelope.get('content_mode')=='auto':
            baseline=envelope.get('baseline',{})
            need(hashlib.sha256(z.read(source)).hexdigest()==baseline.get('source_sha256'),'Native document baseline drift')
            need(re.fullmatch(r'[0-9a-f]{64}',str(baseline.get('record_sha256',''))) is not None,'Native record baseline missing')
            # Record bytes are compared against the approved source by identity/slots/skills/profile below.
        return envelope
def cell(s):return str(s).replace('|','\\|').replace('\n',' ')
def audit(id,platform,folder):
    proof=PROOF[str(id)]
    jp=folder/'datos/stationx-deck.json';doc=folder/(folder.name+'_CONTENIDO_CURADO.md')
    rel=jp.relative_to(ROOT).as_posix();docrel=doc.relative_to(ROOT).as_posix()
    blob=git('rev-parse',BASE+':'+rel)
    need(git('hash-object',rel)==blob,'Package differs from approved imported source')
    pkg=json.loads(jp.read_text('utf-8'));r=pkg['record']
    need(pkg['deck_id']==id and r['deck_id']==id and pkg['schema']=='station-x-deck-package/1' and r['schema']=='station-x-curated-v62','Package identity/schema mismatch')
    need(pkg['package_root']==folder.name and pkg['content_mode']=='structured' and pkg['inventory_binding']=='deck-slots-v1','Package root/mode/binding mismatch')
    # Native V40 packages declare basename; historical native packages use a folder-relative path.
    need(pkg['source_document'] in (doc.name,folder.name+'/'+doc.name),'Source document does not resolve to the canonical file: '+str(pkg.get('source_document')))
    gate=json.loads(subprocess.check_output(['node','scripts/analysis-eligibility.cjs',str(jp),'--user-assigned','--deck-id='+str(id),'--stage=A02'],cwd=ROOT,text=True))
    need(gate['eligible'] is True,'A02 eligibility rejected')
    rr=slots(r);cc=cards(r);rt=routes(r);counts=gate['counts']
    need(len({x[0] for x in rr})==len(rr),'Duplicate native row')
    need(len({x[0] for x in cc})==len(cc) and len({x[1] for x in cc})==len(cc) and all(x[0] and x[1]>0 for x in cc),'Invalid/duplicate card identity')
    need(len(set(rt))==len(rt) and all(rt),'Invalid/duplicate route ID')
    need(inv(pkg['inventory'])==[x[:3] for x in rr],'Inventory/record rows mismatch')
    need(counts==proof['production']['counts']==proof['isolated']['counts'],'Approved inventory count drift')
    need(len(cc)==proof['production']['cards']==proof['isolated']['photos'] and len(rt)==proof['production']['routes']==proof['isolated']['routes'],'Approved identity/route count drift')
    need(isinstance(r.get('skills'),list),'Skill structure missing')
    opener=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
    live=native(opener,URL+'?api=deck_builder&deck_id='+str(id))
    need(int(live['deck']['id'])==id and inv(live['cards'])==inv(pkg['inventory']),'Live inventory drift')
    api=URL+'?api=deck_data&deck_id='+str(id)+'&op='
    status=native(opener,api+'status');need(status.get('has_data') is True,'No native data')
    ex=readzip(get(opener,api+'export'));er=ex['record']
    need(ex['deck_id']==id and er['deck_id']==id and er['format']==r['format'] and ex['schema']==pkg['schema'],'Export identity/format drift')
    # Native exports use the real inventory SHA-256 and auto mode; portable GPT
    # input packages use deck-slots-v1 and structured mode. Never confuse the two.
    need(ex['package_root']==folder.name,'Native export folder drift')
    need(ex.get('content_mode')=='auto' and re.fullmatch(r'[0-9a-f]{64}',str(ex.get('inventory_sha256',''))) is not None,'Native export missing authentic inventory SHA or auto mode')
    need(inv(ex['inventory'])==inv(pkg['inventory']) and slots(er)==rr and cards(er)==cc,'Export native row/CID identity drift')
    need(routes(er)==rt and no_images(er['skills'])==no_images(r['skills']),'Export route/Skill drift')
    need(er['profile']==r['profile'] and er['player_guide']==r['player_guide'],'A01 content drift')
    native_hash=ex.get('inventory_sha256') or live.get('inventory_sha256')
    if pkg.get('inventory_sha256'):need(pkg['inventory_sha256']==native_hash,'Authentic inventory hash drift')
    files=sorted(x for x in folder.rglob('*') if x.is_file())
    need(all(not x.is_symlink() for x in files),'Unsafe symlink')
    with tempfile.TemporaryDirectory() as temp:
        zp=pathlib.Path(temp)/'deck.zip'
        with zipfile.ZipFile(zp,'w',zipfile.ZIP_DEFLATED) as z:
            for f in files:z.write(f,f.relative_to(folder.parent).as_posix())
        with zipfile.ZipFile(zp) as z:
            names=z.namelist()
            need(z.testzip() is None and len(set(names))==len(names),'Bad ZIP')
            need(all(n.split('/')[0]==folder.name and '..' not in n.split('/') for n in names),'Cross-deck ZIP')
            need(sum(n.endswith('/datos/stationx-deck.json') for n in names)==1 and folder.name+'/'+doc.name in names,'ZIP document/package absent or duplicate')
            need(z.read(folder.name+'/datos/stationx-deck.json')==jp.read_bytes(),'ZIP JSON drift')
        zip_hash=hashlib.sha256(zp.read_bytes()).hexdigest()
    md=doc.read_text('utf-8')
    # Some historical documents place extensive subsections between the ledger
    # heading and its actual checklist. Identify one complete ordered task set
    # by the canonical manifest, not an arbitrary Markdown divider.
    lm=re.search(r'^## CONTROL_DE_TAREAS_A01_A10[^\n]*\n',md,re.M)
    need(lm is not None,'Missing canonical ledger')
    manifest=json.loads((ROOT/'02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json').read_text('utf-8'))
    expected=[t['task_id'] for st in manifest['stages'] if st['mandatory'] for t in st['tasks']]
    rx=r'^- \[([ xX])\] \*\*(A(?:0[1-9]|10A)-T\d+)\*\*[^\n]*'
    matches=list(re.finditer(rx,md[lm.end():],re.M))
    taskids=[m.group(2) for m in matches]
    # Old ledgers have 35 tasks, excluding the separately recorded A01 T4/T5.
    legacy=[x for x in expected if x not in ('A01-T4','A01-T5')]
    candidates=[]
    for i in range(len(matches)):
        for wanted in (expected,legacy):
            if taskids[i:i+len(wanted)]==wanted:
                candidates.append((i,i+len(wanted),wanted))
    # One ordered canonical checklist; no guessing between multiple candidates.
    need(len(candidates)==1,'Canonical ordered ledger missing/ambiguous: '+str([(x[0],len(x[2])) for x in candidates])+'; rows='+str(len(matches)))
    lo,hi,wanted=candidates[0]
    begin=lm.end()+matches[lo].start();stop=lm.end()+matches[hi-1].end()
    ledger=md[begin:stop]
    before=re.findall(rx,ledger,re.M)
    reasons=['Identidad, formato, CID, fila y cantidades cotejados con la API y la fuente aprobada.','ZIP único, preflight PHP nativo y exportación/reimportación aisladas verificadas.','Identificadores, Skill y procedencia conservados; evidencia versionada en APARTADO_02.']
    for i,reason in enumerate(reasons,1):
        # Preserve the historical task explanation and any following evidence.
        pattern=r'^- \[[ xX]\] \*\*A02-T'+str(i)+r'\*\*[^\n]*'
        def update(m):
            row=re.sub(r'^- \[[ xX]\]','- [x]',m.group(0))
            row=re.sub(r' — Revalidación A02 24-11-2026:.*$','',row)
            return row+' — Revalidación A02 24-11-2026: '+reason
        ledger,n=re.subn(pattern,update,ledger,flags=re.M)
        need(n==1,'A02 task missing or duplicated '+str(i))
    after=re.findall(rx,ledger,re.M)
    need([(v,k) for v,k in before if not k.startswith('A02-')]==[(v,k) for v,k in after if not k.startswith('A02-')],'Other task states changed')
    total=len(after);done=sum(v.lower()=='x' for v,k in after);old=sum(v.lower()=='x' for v,k in before)
    # Update only an exact aggregate pair before this checklist, if present.
    prefix=md[:begin]
    old_prefix=prefix[:lm.start()]
    ledger_header=prefix[lm.start():]
    ledger_header=re.sub(r'(?<!\d)'+str(old)+'/'+str(total)+r'\b([^\n]*?)'+str(total-old)+'/'+str(total)+r'\b',lambda m:str(done)+'/'+str(total)+m[1]+str(total-done)+'/'+str(total),ledger_header,count=1)
    md=old_prefix+ledger_header+ledger+md[stop:]
    tick=chr(96)
    lines=['<!-- A02_RECEPCION_IDENTIDAD_V1_START -->','### A02 — Recepción e identidad técnica verificada','',
        '**Estado: COMPLETA (3/3).** Solo A02; no acredita legalidad de combos, efectos ni calculadora.','',
        '- ID: '+str(id)+'; nombre en plataforma: '+cell(live['deck'].get('name',''))+'; nombre fuente: '+cell(r.get('name',''))+'; formato: '+tick+r['format']+tick+'.',
        '- Carpeta única: '+tick+folder.name+tick+'; documento: '+tick+doc.name+tick+'.',
        '- Main '+str(counts['main'])+' / Extra '+str(counts['extra'])+' / Side '+str(counts['side'])+' / Reserva '+str(counts['reserve'])+'; '+str(len(cc))+' CID; '+str(len(rr))+' filas; '+str(len(r['skills']))+' Skill(s) separadas.',
        '- Transferencia ESTRUCTURADA_IMPORTABLE; station-x-deck-package/1, station-x-curated-v62. Entrada GPT: deck-slots-v1/structured; export nativo: inventory_sha256/auto con baseline. A10B no solicitado.',
        '- Fuente GPT: '+tick+BASE+tick+'; blob JSON: '+tick+blob+tick+'; blob documental anterior: '+tick+git('hash-object',docrel)+tick+'.',
        '- Plataforma: '+tick+PLATFORM+tick+'; procedencia registrada: '+cell(json.dumps(pkg.get('provenance',{}),ensure_ascii=False))+'.',
        '- Huella de inventario nativa: '+(tick+str(native_hash)+tick if native_hash else 'no proporcionada, no fabricada')+'. SHA-256 del ZIP de entrada auditado: '+tick+zip_hash+tick+'.',
        '- [Importación previa verificada](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45311363853): '+proof['production']['updated_at']+'; lectura nativa de solo lectura: '+datetime.datetime.now(datetime.timezone.utc).isoformat()+'.',
        '- [Aceptación PHP previa](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45311165600): 12 rechazos, preparación/publicación aislada, exportación y reimportación; se ejecuta el mismo preflight individual sobre este documento antes de confirmar el commit.','',
        '| ID fila | CID | Carta | Zona | Copias |','|---:|---:|---|---|---:|']
    names={int(c['cid']):c['name'] for c in r['cards']}
    for row,curr,q,cid in rr:lines.append(f'| {row} | {cid} | {cell(names[cid])} | {curr} | {q} |')
    lines+=['','**Rutas existentes:** '+', '.join(tick+x+tick for x in rt)+'.','**Skills:** '+(cell(json.dumps(no_images(r['skills']),ensure_ascii=False)) if r['skills'] else 'No aplica.')+'.','',f'**Checklist existente:** {done}/{total} checks obligatorios marcados; {total-done}/{total} pendientes. Solo A02 se revalida aquí.','<!-- A02_RECEPCION_IDENTIDAD_V1_END -->','']
    md=re.sub(r'<!-- A02_RECEPCION_IDENTIDAD_V1_START -->[\s\S]*?<!-- A02_RECEPCION_IDENTIDAD_V1_END -->\n?','',md)
    am=re.search(r'^## APARTADO_02\b[^\n]*\n',md,re.M)
    need(am is not None,'Missing A02 section')
    md=md[:am.end()]+'\n'+'\n'.join(lines)+'\n'+md[am.end():]
    original=doc.read_bytes();doc.write_text(md,'utf-8')
    try:
        # Use the real existing PHP suite with a temporary one-deck selection.
        test=platform/'torneos_yugioh/tests/a01_assigned_packages_test.php'
        src,n=re.subn(r'\$assigned=\[[^\]]+\];',f'$assigned=[{id}];',test.read_text('utf-8'),count=1)
        need(n==1,'Native test selection unavailable')
        temp=test.with_name('.a02-native-one.php');temp.write_text(src,'utf-8')
        try:
            res=subprocess.run(['php',str(temp),str(ROOT)],cwd=platform,text=True,capture_output=True,timeout=180)
            need(res.returncode==0,'Native isolated test failed: '+res.stdout[-1000:]+' '+res.stderr[-200:])
            report=json.loads(res.stdout.strip().splitlines()[-1])['decks']
            need(len(report)==1 and report[0]['deck_id']==id and report[0]['status']=='ISOLATED_PASS','Native acceptance missing')
        finally:temp.unlink(missing_ok=True)
        need(git('hash-object',rel)==blob,'JSON changed')
        git('diff','--check','--',docrel);git('add','--',docrel)
        git('commit','-m',f'analysis(A02): verify native identity and package for deck {id}')
        git('push','origin','HEAD:refs/heads/analysis/a02-assigned-16-20261124')
    except Exception:
        if git('status','--porcelain','--',docrel):
            doc.write_bytes(original);subprocess.run(['git','reset','--',docrel],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        raise
    return {'deck_id':id,'status':'A02_COMPLETE','tasks':3,'format':r['format'],'counts':counts,'cards':len(cc),'rows':len(rr),'skills':len(r['skills']),'native_rejections':report[0]['rejections'],'ledger_done':done,'ledger_total':total,'commit':git('rev-parse','HEAD')}
def main():
    platform=pathlib.Path(sys.argv[1]).resolve()
    need(subprocess.check_output(['git','-C',str(platform),'rev-parse','HEAD'],text=True).strip()==PLATFORM,'Platform source drift')
    root=ROOT/'01_INFORMACION_PARA_IMPORTAR/decks'
    folders={}
    for f in root.glob('*/datos/stationx-deck.json'):
        id=json.loads(f.read_text('utf-8')).get('deck_id')
        if id in ORDER:
            need(id not in folders,'Duplicate assigned folder')
            folders[id]=f.parent.parent
    need(set(folders)==set(ORDER),'Missing assigned source')
    completed=set()
    for line in git('log','--format=%s',BASE+'..HEAD').splitlines():
        m=re.fullmatch(r'analysis\(A02\): verify native identity and package for deck (\d+)',line)
        if m: completed.add(int(m.group(1)))
    for id in ORDER:
        if id in completed:
            doc=folders[id]/(folders[id].name+'_CONTENIDO_CURADO.md')
            need('<!-- A02_RECEPCION_IDENTIDAD_V1_START -->' in doc.read_text('utf-8'),'Missing verified evidence for '+str(id))
            print('A02_RESUME_VERIFIED '+str(id),flush=True)
            continue
        print('A02_START '+str(id),flush=True)
        try:print('A02_RESULT '+json.dumps(audit(id,platform,folders[id]),ensure_ascii=False),flush=True)
        except Exception as e:
            print('A02_BLOCKED '+json.dumps({'deck_id':id,'reason':str(e)[:1200]},ensure_ascii=False),flush=True);return 1
    print('A02_ALL_COMPLETE 16 decks 48 tasks',flush=True)
    return 0
if __name__=='__main__':sys.exit(main())

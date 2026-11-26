# Station X — Prompts y entregas de Yu-Gi-Oh
<!-- station-x-repository-guide:start -->

## Guía de esta copia

### Ruta para colaboradores
Empieza por la elegibilidad y el contrato vigentes de este README. [02_PROMPT_PARA_CODEX](./02_PROMPT_PARA_CODEX) reúne los contratos y las instrucciones, [01_INFORMACION_A_IMPORTAR](./01_INFORMACION_A_IMPORTAR) las entregas de origen y [scripts](./scripts) las comprobaciones de infraestructura.
### Validación técnica y entrega
Ejecuta las comprobaciones de contrato citadas en las secciones correspondientes. Cada entrega conserva el deck autorizado, sus identificadores, cantidades, secciones, Skills y estados de verificación. En la integración, la aplicación consume el paquete conforme al contrato documentado.
### Trabajo entre repositorios
El código de la aplicación se mantiene en [Station X Platform](https://github.com/senior23enginer-coder/platform-yugioh-md). Consulta [AGENTS.md](./AGENTS.md) para los límites editoriales y trabaja sobre la rama base.

<!-- station-x-repository-guide:end -->

## Regla de elegibilidad y contrato con Station X (23-11-2026)

Por instrucción del propietario, **TCG/OCG requieren Main Deck y Extra Deck; GOAT y Rush Duel requieren únicamente Main Deck** para A01–A10A. Extra Deck es opcional en GOAT/Rush Duel; Side Deck y Reserva son opcionales en todos los formatos. Conservar siempre secciones reales, cantidades, CIDs, `card_id`, formato y fuentes; no completar Side desde Reserva ni consultar banlist sin petición expresa. La selección explícita por deck sigue siendo obligatoria. Las excepciones documentales antiguas de Kashtira Side=0 son históricas y no una puerta necesaria.

El análisis de GPT proporciona exclusivamente los cuatro contenidos estratégicos de Station X mediante `record.profile` (estilo/arquetipo y plan de ficha), `record.player_guide` (cartas y fases), `record.routes` (combos/estrategias documentales) y `record.calculator.rules` (solo efectos realmente modelados). Inventarios, partidas, estados físicos y herramientas de edición nativas son responsabilidad de Station X. Todo nuevo paquete debe conservar datos sin fabricar reglas ni trasladar metadatos técnicos a la UI del jugador.

**Asignación del lote A01:** el propietario solicitó los decks con inventario cargado. El preflight de producción del 23-11-2026 confirmó **67 decks registrados, 16 con inventario elegible según su formato y 51 aún sin inventario elegible**. Royal 705 está incluido: es Rush Duel y tiene Main 30, sin Extra. Hay 16 fuentes documentales GPT y 3 paquetes JSON canónicos; esos números no representan la certificación A01. La auditoría automatizada solo verifica acceso e inventario y **nunca cierra por sí sola T1–T5**. Los seis campos del perfil, fuentes/propósitos, paridad Markdown/JSON y aceptación de importación/render/export deben comprobarse por deck. Memento 671 cuenta con A01-T5 certificado e importación real anterior; no se asume que los otros 15 tengan el mismo grado de completitud.


## Contrato de casos lógicos por efecto (infraestructura, sin analizar decks)

El esquema **`02_PROMPT_PARA_CODEX/contrato_casos_logicos.schema.json`** define un lenguaje compartido para las pruebas lógicas de papel que genera GPT después de seleccionar un deck con las secciones cargadas que requiere su formato (Main+Extra en TCG/OCG; Main en GOAT/Rush Duel; Side y Reserva opcionales). Cada `effect_id` mantiene actor, CID, tipo, costes, ventana, condiciones, resolución y restricciones; cada `case_id` documenta un estado inicial, acción y resultado esperado, incluyendo casos positivos y negativos. **A10A no necesita compilar reglas de calculadora.**

A10B, solo con autorización expresa, puede transformar esas especificaciones en el contrato ejecutable `station-x-calculator/1` y en fixtures `station-x-logic-case-fixtures/1` que el runner genérico de Platform compara con transiciones físicas. Una prueba de papel no certifica que la calculadora soporte la operación: un operador ausente queda bloqueado, no sustituido por un movimiento ficticio. Mantener los casos de dominio en GPT y las pruebas del intérprete en Platform; no crear archivos de tests por carta o deck. Los archivos de prueba `scripts/fixtures/stationx-paper-case.synthetic.json` son **ficticios**, no pertenecen a ningún mazo real y nunca autorizan una ejecución de A01–A10.

Validar únicamente los contratos (sin analizar decks):

```bash
node scripts/test-paper-case-contract.cjs
node scripts/analysis-eligibility-test.cjs
```


## Estándar operativo vigente — análisis controlado por deck

Esta especificación rige sobre las instantáneas históricas descritas más abajo. **Estar registrado entre más de 60 decks no significa que un mazo esté asignado, cargado, aprobado o autorizado para análisis.** El sistema jamás selecciona un deck por su cuenta, ni ejecuta todos los mazos, ni infiere autorización de una petición de estado, planificación, documentación o mantenimiento. Solo se analizan **decks expresamente asignados por el usuario**. Cuando se autoriza un lote, se valida y procesa individualmente cada `deck_id` real y su formato; no se extrapola evidencia, no se marca A01-T1–T5 terminado por una auditoría global ni se ejecutan decks vacíos. Memento y Crystron no se reanalizan como consecuencia de modificar este estándar.

### Puerta de entrada A00 — selección y disponibilidad real

Antes de ejecutar **cualquiera** de A01–A10A/A10B se requieren simultáneamente:

1. `deck_id` concreto **asignado expresamente por el usuario**, o selección de lote expresamente autorizada con resolución y registro de cada ID real, sin sustituirlo por otro de nombre parecido.
2. Un inventario real y coherente con el paquete y las filas/IDs de Station X: **Main en todos los formatos y también Extra solo en TCG/OCG**, con cantidades positivas. GOAT y Rush Duel admiten Main únicamente; Side y Reserva nunca son requisitos para acceder a A01–A10A. No se presupone que el tamaño obligatorio sea 40/15/15: se respeta la lista aprobada.
3. Identidad, formato y `card_id`/slots concordantes entre inventario y `record.cards`. **Reserva es opcional**, puede estar vacía o ausente; no se rellena artificialmente.

Si falla cualquier condición, registrar `BLOQUEADO_POR_INVENTARIO_O_AUTORIZACION`, detallar el campo faltante y **no iniciar ni un análisis provisional**. Una carga incompleta puede seguir existiendo en el catálogo, pero todavía no es un deck elegible para los prompts.

Validador compartido en este repositorio (comprueba datos; **no invoca IA ni ejecuta análisis**):

```bash
node scripts/analysis-eligibility-test.cjs
node scripts/analysis-eligibility.cjs --deck-id=ID_ASIGNADO --user-assigned ruta/al/stationx-deck.json
```

La segunda línea solo se utiliza cuando existe una asignación expresa del usuario; no usar la opción `--user-assigned` para simular autorización. Un resultado `eligible:false` es una prohibición de comenzar.

### Pipeline editorial y contrato común

| Bloque | Obligación | Salida |
| --- | --- | --- |
| A01–A04 | Selección autorizada, identidad, inventario y fotos | IDs/zonas/CIDs/recursos de un solo deck |
| A05–A07 | Efectos completos y relaciones causales | `effect_id`, condición, coste, target, ventana, restricción, pruebas lógicas de papel |
| A08–A09 | Estrategias, rutas y estados físicos | `route_id`, `step_id`, `state_before`, `expected_state_after`, fuentes |
| **A10A obligatorio** | Guías visuales, tableros y contenido importable | `record.cards`, `record.routes`, fotos y presentación |
| **A10B opcional** | Traducir especificaciones ya documentadas para la calculadora | `record.calculator` validado contra operadores disponibles, replays y tests |

La semántica de cartas, efectos, coste, chain, propietario/controlador, OPT/HOPT, materiales, recursos, información conocida/desconocida y campos finales **se define una sola vez**. GPT investiga y documenta pruebas lógicas de papel como datos; Platform prueba el intérprete técnico. No insertar operaciones no soportadas ni inventar resultados. Un ZIP A10A no necesita reglas de A10B.

### Tareas verificables y medición de tiempos

A01 incorpora ahora T4/T5 para validar los seis campos del perfil y comprobar su importación/presentación; las actas históricas de 35 tareas no quedan completadas de forma retroactiva.


`02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json` es el **manifiesto único y versionado de tareas**, no un archivo por deck: **37 tareas obligatorias** repartidas entre A01–A10A y **3 tareas opcionales** A10B. Cada ejecución autorizada conserva la evidencia y el estado real de esas tareas en la sección `CONTROL_DE_TAREAS_A01_A10` del `DECK_*_CONTENIDO_CURADO.md` existente. `[x]` requiere prueba y resultado completos; una tarea bloqueada permanece abierta con causa y siguiente acción. El reporte muestra todas las terminadas y faltantes, aunque solo se haya trabajado un apartado.

**Medición:** no se atribuyen tiempos a la IA sin ejecutar la tarea. Los `started_at`, `finished_at`, `elapsed_seconds` y reintentos corresponden a sesiones realmente observadas; un ETA solo es defendible tras obtener muestras comparables de trabajo real. La lógica reutilizable del ledger y la estimación está en Platform; **no está conectada todavía a un ejecutor autónomo de prompts ni a un grid de producción**. No hay procesamiento masivo ni en segundo plano habilitado por este contrato.

### Pruebas y compatibilidad entre repositorios

```bash
node scripts/test-a01-a10-presentation.cjs
node scripts/analysis-eligibility-test.cjs
node scripts/reconcile-protected-prompts.cjs --check
```

Las pruebas son de **contratos y elegibilidad**, no vuelven a analizar Memento, Crystron ni ningún mazo. El workflow `.github/workflows/validate-prompts.yml` impide regresiones de selección e inventario. Platform tiene pruebas de operador e importación separadas y comprueba la compatibilidad del manifiesto al verificar la integración ZIP. Los tests históricos permanecen hasta acreditar una sustitución sin pérdida de cobertura; no deben copiarse en los ZIP.


## Flujo obligatorio A01–A10A y extensión opcional A10B (21-11-2026)

- **A01–A09:** investigación integral verificable de cartas, efectos, recursos, sinergias, decisiones y rutas. Los datos deben ser lo bastante específicos para que A10B no tenga que investigar nuevamente los efectos.
- **A10A obligatorio:** guías visuales, fotografías, pasos y campos finales, con el paquete del deck importable. No ejecuta, compila ni prueba la calculadora.
- **A10B exclusivamente opt-in:** construcción/validación de reglas, estados y acciones del motor físico; importación de `record.calculator` y pruebas end-to-end. Su ausencia no impide aprobar A10A.

Cada prompt mantiene su checklist por deck en la sección única `CONTROL_DE_TAREAS_A01_A10` del documento curado **existente**. La ejecución devuelve todas las tareas A01–A10A con `[x]` para evidencia completa, `[ ]` con causa y acciones para lo que falte y un bloque A10B opcional separado. No se acepta marcar COMPLETA una etapa con tareas pendientes. Los pendientes reales no se ocultan ni se reetiquetan artificialmente. No crear diez archivos de checklists ni múltiples informes por versión.

**Paquete mínimo para el importador:** un JSON estructurado canónico, documentación del análisis cuando corresponda, guía visual y una imagen por CID único. Ni la cantidad de variantes de reglas ni las pruebas de CI implican multiplicar los archivos del ZIP. Markdown y HTML no reemplazan el JSON.

**Escalado de pruebas:** no crear un archivo de test por cada efecto/deck. A10B trabaja sobre el ejecutor común y escenarios/fichas de datos parametrizados por IDs; las capacidades generales se prueban una vez por operador y sólo se añaden regresiones específicas cuando descubren un fallo nuevo. Los tests heredados de Memento/Crystron se mantienen hasta comparar cobertura de la sustitución; no borrar evidencia automáticamente. Los recuentos históricos que aparecen más abajo son instantáneas, no el estado actual de cobertura.


### ZIP directo de una carpeta histórica y alcance de compatibilidad

Se puede comprimir una carpeta individual `DECK_*` del repositorio GPT y cargarla en la ficha correspondiente de Station X. Si la carpeta solo contiene el estudio `*_CONTENIDO_CURADO.md`, `imagenes/` y `guias/`, el importador intenta una **importación documental heredada** y preserva las rutas estructuradas previamente existentes. Acepta referencias de imágenes locales seguras, pero no habilita HTML ejecutable. Esto NO certifica paridad completa de las fichas interactivas A01–A10.

La **actualización integral** requiere `datos/stationx-deck.json` con la huella y los identificadores reales de la exportación nativa de Station X. Generarlo desde ese ZIP exportado antes de empaquetar el directorio en GPT; nunca inventar `deck_id`, `inventory_sha256` ni datos de `baseline`. Los prompts deben preferir sintaxis Markdown para imágenes (`![Carta](imagenes/19364.png)`) en lugar de etiquetas HTML `<img>` en archivos Markdown. No se regeneran automáticamente Memento ni Crystron.

Repositorio independiente del contenido de `torneos_yugioh/context/gpt/`. El código de la plataforma se mantiene en [platform-yugioh-md](https://github.com/senior23enginer-coder/platform-yugioh-md).

- `01_INFORMACION_PARA_IMPORTAR/`: entregas de decks, documentos curados, imágenes y guías.
- `02_PROMPT_PARA_CODEX/`: instrucciones generales y los 36 apartados protegidos.
- `03_COMPROBACIONES_NO_IMPORTAR/`: comprobaciones internas y registro único; no se publican como contenido de la plataforma.
- `01_INFORMACION_A_IMPORTAR/revisiones_editor/`: registro de sincronización de revisiones del editor, conservado en su ruta existente.

Este es el repositorio independiente y canónico de prompts y entregas. La plataforma **no contiene una carpeta `gpt`**, ni siquiera vacía. Sus herramientas de importación leen este clon hermano o la ubicación indicada por `YGO_PROMPTS_ROOT`. Los archivos originales se conservan sin cambios de contenido. Para importar desde la web se utiliza el ZIP individual del deck y su misma carpeta, generado por «Importar / exportar Data». No se necesita Codex para ese flujo.

Mantener separados los inventarios Main/Extra/Side/Reserva y las Skills; conservar IDs, referencias y estados documentales. La estructura de Kashtira es la referencia de organización, sin trasladar sus cartas ni sus combos a otros decks. Las instrucciones actuales excluyen las listas de cartas prohibidas/limitadas y exigen archivos importables mínimos.

### Paquetes estructurados portátiles de Memento y Crystron/Horus

Los decks **671 (Memento)** y **677 (Crystron/Horus)** incorporan ahora en su carpeta original `datos/stationx-deck.json`. El archivo conserva `station-x-deck-package/1`, el estudio estructurado `station-x-curated-v62` de Station X V40, los IDs de cartas y los identificadores de las 12/14 rutas respectivamente. Su `inventory_binding=deck-slots-v1` indica que el importador cotejará **todas** las filas de inventario y el formato contra el deck real, sin inventar una huella `inventory_sha256` que solo puede calcular Station X.

**Uso:** comprimir únicamente una carpeta `DECK_*` con su contenido original, seleccionar el mismo deck en Station X y abrir «Importar / exportar Data». Revisar la previsualización antes de confirmar; si el inventario cambió, no forzar la importación. Tras completar el paso, la propia exportación nativa de Station X vuelve a producir la huella real para las siguientes entregas.

**Alcance de la adaptación:** no se volvieron a ejecutar los diez apartados y no se reescribieron los Markdown, guías ni fotografías. Los objetos interactivos se recuperan de las versiones estructuradas **V40 ya existentes**, mientras que el Markdown más reciente A01–A10 se incorpora como material documental. La paridad paso a paso con las revisiones editoriales posteriores y los efectos ejecutables de calculadora **no se declara certificada** hasta realizar pruebas específicas por ruta.

### Memento: contrato portable ampliado (20-11-2026)

La entrega canónica del deck **671** conserva las **12 rutas documentales** y
su inventario original, e incluye **351 variantes ejecutables acotadas
agrupadas en 55 IDs de efecto** dentro de `record.calculator`. Las distintas
variantes de un efecto comparten su límite de uso por turno. La plataforma debe
validar `station-x-calculator/1`, conservar definiciones de respaldo no
importadas y rechazar duplicados exactos o políticas incompatibles. Las
variantes se cotejaron con las reglas de respaldo verificadas en la rama
`base` de Station X; **no certifican todos los efectos ni la legalidad general de las cartas**. C01–C12 tienen replays acotados: C12 verifica el Dragón de Cuerno destruido en campo y la retirada de dos cartas rivales boca arriba conocidas; C11 comprueba el Sacrificio de Angbruja por Gran Fuga como coste y un tablero final doble; C10 certifica Secuencia + Duque + Angbruja y Normal inmediata sin repetir la búsqueda; C09 certifica el procedimiento físico de Princesa Necroequipo sin robo gratuito; C08 requiere activación rival observada, sin resolver su efecto original; las 12 rutas tienen replay acotado certificado; la legalidad universal y las cadenas complejas aún no están certificadas. La fotografía de los 69 pasos y los
12 tableros finales ilustrativos se mantiene enlazada por CID con el paquete,
sin afirmar ubicaciones físicas exactas (`spatial_verified=false`).

La variante adicional **Gran Fuga Moto Goblin** (CID 20533) implementa dos
ventanas de activación de su primer efecto: desde la mano propia o desde una
copia colocada en un turno anterior. Tributa un monstruo propio como coste,
Invoca un Goblin real del Deck y le impide atacar ese turno. Las pruebas
verifican el coste, el bloqueo de ataque, la negación y las ventanas temporales.
Su segundo efecto requiere un Xyz «Goblin» que no está en el Extra de este deck.
**30/39 identidades** tienen al menos una regla de actor; faltan 9 y siguen
0 replays A09 pendientes para las aperturas exactas documentadas; C01–C07, C09 y C10 cuentan con pruebas sin respuesta rival, C08 es condicional a activación rival observada.

### Crystron/Horus: reglas portables acotadas (20-11-2026)

El deck **677** mantiene **14 rutas A09 documentadas** y registra **13
variantes ejecutables**: los dos procedimientos desde Cementerio de
Amset/Hapi, dos efectos de Smiger, cinco objetivos de búsqueda desde el
Cementerio de Thystvern, dos variantes de destrucción en Campo de
Thystvern que Invocan Citree o Tristaros y dos objetivos de envío a Cementerio de
**Sarcófago del Rey**. Estas últimas variantes comparten un contador de
**hasta cuatro usos por turno por nombre**, independiente de la Invocación
Especial propia de cada monstruo Horus. Fuentes oficiales: [Thystvern](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=12609&ope=2)
y [Sarcófago del Rey](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19200&ope=2).

La prueba automática de efectos verifica costes, destino de cartas, uso
compartido, ausencia de material o recurso y transiciones del estado real.
**No representa cobertura completa de las 39 identidades de cartas ni
certifica las 14 rutas A09**. La sincronización de fotografías y diagramas
ilustrativos entre el paquete y la plataforma se verifica estructuralmente;
las posiciones exactas sin prueba espacial continúan sin certificar.

### Guias y recursos por deck

Cada carpeta de deck conserva sus guias e infografias. El ZIP individual incluye los archivos del deck y el seguimiento permanece en el registro privado.

No incluir código de la tienda, credenciales, configuraciones privadas ni datos operativos de producción. No eliminar prompts protegidos ni crear informes paralelos por versión. Los cambios se controlan mediante commits de Git.

### Estándar de aceptación A01–A10 para todos los decks

El paquete portable y la plataforma conservan **una sola identidad** (deck_id, formato, CIDs, card_id, secciones, cantidades, Skills y versiones del editor). Kashtira es un ejemplo de experiencia visual, no una fuente de cartas, efectos ni resultados para otro deck. El cierre de cada apartado se decide por pruebas **independientes**, no por la presencia del documento:

| Apartado | Puerta verificable |
| --- | --- |
| A01 | Perfil de jugador comprensible, propósito y estilo táctico específicos del deck, sin auditorías crudas en la ficha. |
| A02–A03 | Paquete nativo, inventario completo, IDs/zonas/cantidades y Skills separadas sin alteraciones. |
| A04–A05 | Fotografías locales por CID, identidades, texto oficial, función y límites de cada carta. |
| A06 | Motores, relaciones, recursos, juego de primer/segundo turno y restricciones con evidencia por carta. |
| A07 | Cada efecto oficial: actor, estado, costes, ventanas, selectores, cadena, resolución, límite de usos, pruebas positivas y negativas. Las variantes no equivalen a cartas completas. |
| A08 | Decisiones situacionales, continuidad, interrupciones, bricks y cambios de recursos con estado y dependencia. |
| A09 | Identidad y orden de rutas; replay legal de cada paso con estados antes/después y bloqueo ante requisitos ausentes. |
| A10 | Fotos reales por paso y campo final por zona con los mismos CIDs de A09; revisión visual a 390/1280 px. Si las posiciones exactas no están verificadas, mostrar bandejas de zonas y advertirlo, nunca fingir casillas exactas. |

**Validación compartida:** `node scripts/verify-pilot-decks.cjs --prompts-root=../gpt-yugioh-promps-platform`, ejecutado en el repositorio hermano `platform-yugioh-md`, comprueba estructura, reglas y concordancia de rutas/fotografías en los pilotos 671 (Memento) y 677 (Crystron/Horus). `--require-finished` debe rechazar el cierre mientras falten replays A09 o pruebas suficientes. El importador, los tests de reglas, la interfaz, las pruebas PHP y la CI deben verificarse sobre el mismo commit. **Importable, visualmente documentado y ejecutable legalmente son estados independientes**. Un commit/push no significa despliegue.

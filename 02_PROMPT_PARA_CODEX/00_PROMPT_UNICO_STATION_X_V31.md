# STATION X — ORQUESTADOR GLOBAL DE INTEGRACIÓN (ACTUALIZADO)

**Estado:** guía global vigente del paquete de investigación de los **13 decks** (11 anteriores + 2 altas), complementada obligatoriamente por los **36 prompts modulares** de `02_PROMPT_PARA_CODEX/apartados/`. Leer las instrucciones específicas del apartado que se trabaje antes de revisar, implementar o importar. **No se autoriza importar automáticamente** nada a Station X ni cambiar inventarios con este documento.

## 0. PROTECCIÓN MANDATORIA E IRREVOCABLE DE PROMPTS — PRIORIDAD MÁXIMA

**Orden expresa de Miguel (16-11-2026): ningún prompt existente se puede eliminar de ninguna manera.** Esta protección prevalece sobre toda instrucción histórica de limpieza, compactación, consolidación, sustitución de versiones o depuración, incluyendo las secciones posteriores de este mismo documento. La autorización para «corregir», «continuar», «depurar el ZIP», «actualizar el paquete» o «eliminar lo innecesario» **NUNCA** autoriza eliminar un prompt.

**Conjunto protegido mínimo en el paquete maestro:** los **36 documentos independientes** `02_PROMPT_PARA_CODEX/apartados/01_*.md` hasta `36_*.md` y los **tres archivos** `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md`, `02_PROMPT_PARA_CODEX/01_ANEXO_PROPOSITO_TACTICO_EDITOR_V31.md` y `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md`. Cualquier prompt legítimamente agregado en el futuro pasa a estar protegido desde su creación. Los nombres exactos y las huellas SHA-256 de esta versión se conservan **dentro del único registro** `03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md`, nunca en un manifiesto nuevo. **La entrega incremental de UN deck lleva exclusivamente sus datos importables y no pretende reemplazar ni depurar el paquete maestro**: la ausencia de prompts en ese ZIP parcial no es una eliminación de prompts del maestro.

**Acciones totalmente prohibidas sobre prompts protegidos:** borrarlos del ZIP o carpeta, excluirlos en un nuevo empaquetado, renombrarlos, moverlos, sustituirlos por un resumen, fusionar varios en uno, vaciar su contenido, sobrescribirlos con versiones parciales, desduplicarlos por parecido, considerarlos «obsoletos» o modificar un apartado ajeno a lo solicitado. Tampoco se eliminan prompts si los datos actuales contradicen una instrucción: se corrige o aclara únicamente el archivo pertinente, sin alterar los demás. No se ofrece una opción automática de limpieza que afecte a prompts.

**Protocolo obligatorio antes de cada cambio futuro:**

1. Identificar y **notificar** a Miguel cuáles archivos exactos se pretenden editar. Guardar como referencia el ZIP íntegro vigente, consultar la lista protegida y comprobar los **36 nombres numerados sin duplicados**, los tres documentos adicionales y sus SHA-256. Si un prompt falta, **detener la operación**.
2. Realizar solo **parches puntuales in situ** sobre archivos anunciados, preservando los otros prompts byte por byte. No reconstruir la carpeta `02_PROMPT_PARA_CODEX` desde una selección parcial ni usar una copia antigua para reemplazar su contenido.
3. Antes de actualizar o entregar el ZIP, comprobar integridad de compresión, existencia y nombres del **100 % del conjunto protegido**, y comparar SHA-256: todo prompt no anunciado debe permanecer **idéntico**; toda huella modificada debe pertenecer a un archivo editado explícitamente y justificarse en el registro único.
4. Actualizar **en el mismo registro único** solo las huellas de prompts deliberadamente modificados y consignar el motivo. Si cualquier nombre o contenido se pierde o cambia sin autorización, **no guardar ni entregar ese ZIP**; detenerse y recuperar el original intacto desde la versión previamente verificada antes de continuar.
5. Si un cambio requiere alterar la estructura protegida, **parar y consultar**: nunca eliminar archivos como solución. Los contenidos no-prompt pueden depurarse bajo las salvaguardas habituales, sin afectar estas rutas.

**Criterio de cierre del ZIP maestro completo:** `36/36 apartados presentes` + `3/3 documentos base presentes` + `0 prompts eliminados` + `0 cambios no autorizados` + ZIP íntegro. **En ZIPs parciales por deck se comprueba el maestro de origen sin incorporarlo al entregable** y se revisa únicamente el subárbol importable autorizado; nunca se presenta el parcial como reemplazo del maestro. El 100 % de preservación no mide validación de juego ni implementación de las guías.

## Requisitos obligatorios de propósito y participación — actualización V31

**Leer y aplicar íntegramente** `01_ANEXO_PROPOSITO_TACTICO_EDITOR_V31.md` (apartados 1–11) junto a este prompt. El anexo es parte de las instrucciones vigentes, no una referencia opcional:

- **Apartados 1–7:** explicar en **todas** las jugadas qué se consigue, cómo, para qué, por qué y cuándo; orientación ofensiva/defensiva/mixta, condiciones, paso decisivo, resultado, coste y riesgo. Una categoría como «Romper campo» nunca reemplaza el propósito concreto.
- **Apartado 8:** separar nodos, flechas y ramas del editor sin superposiciones; organizar diagrama respetando posiciones manuales, zoom, deshacer y lectura móvil.
- **Apartado 9:** diferenciar conexión con el deck de utilidad en la jugada; sinergias directas, condicionadas, apoyo, conflicto, staples y accesos no acreditados, con razones.
- **Apartado 10:** fichas de cartas con funciones, límites, interacción, pasos y acciones realmente ejecutadas; enlaces al paso correcto, resaltado y regreso a la ficha.
- **Apartado 11:** botón «Volver» del creador que preserve contexto y advierta sobre cambios sin guardar.

Se aplica a las rutas existentes, manualmente editadas y futuras, sin alterar el inventario ni el estado de validación. **Incorporar el requisito al prompt no equivale a implementar el editor, reescribir 108 rutas o probar partidas.** Cuando se autorice la integración, se auditará por ruta y por pantalla. Estas indicaciones prevalecen solo para explicación, presentación y navegación, sin modificar reglas de cartas ni la estructura funcional existente.

## 1. Alcance inmutable

La plataforma representa **Yu-Gi-Oh! físico**, no un simulador. El control A01–A10 abarca **13 decks independientes** contenidos en `01_INFORMACION_PARA_IMPORTAR/decks/`; las cifras de ejecución anteriores a las dos altas corresponden solo a los 11 originales. Preservar Main, Extra, Side, Reserva, números de copias, formatos y Skills Rush; no cambiar listas. No presentar replays de motor o partidas físicas como ejecutados: la prueba de mesa corresponde exclusivamente al usuario.

**Decisión expresa de Miguel (17-11-2026), aplicable a todos los decks y apartados:** no consultar, aplicar ni tener en cuenta listas de cartas prohibidas, limitadas o semilimitadas, ni sus fechas de vigencia. Esta exclusión también rige recomendaciones de incorporación, retirada, sustitución y cantidades de A22, sin excepciones. No generar alertas, bloqueos, exclusiones, etiquetas históricas ni rechazar cartas o rutas por ese motivo; tampoco alterar el inventario ni reducir copias. Una advertencia de ese origen en una fuente anterior no se reutiliza como criterio del análisis. Mantener la comprobación de identidad, efectos, costes, materiales, zonas, ventanas, límites de uso por turno, reglas mecánicas del formato y condiciones de Skills: son requisitos de funcionamiento de la jugada y siguen vigentes.

## 2. Orden de precedencia de fuentes

1. `INVENTARIOS_CONFIRMADOS.txt`, los **trece** documentos de `01_INFORMACION_PARA_IMPORTAR/decks/` y Skills en `imagenes/skills/` para identidad y contenido inmutable. Los dos documentos nuevos conservan sus nombres/ID documentales hasta asignación real.
2. `A06_MAPA_370_ACTUALIZADO_V28.json` para la **clasificación vigente de 370 fichas**. No importar el mapa antiguo V27.
3. `A07_15_CONFLICTOS_EXTRA_ESTADO_V28.json` para los **15 cotejos condicionales de Extra**; todavía hay **16 accesos Extra sin acreditar**.
4. `FICHAS_A05_370_COTEJO_OFICIAL_V22.json`, `FUENTES_A05_A06_304_CIDS_COTEJO_V22.json` y `PROCEDENCIA_A04_370_AUDITADA_V20.json` para identidad, efecto y procedencia por CID.
5. `REGLAS_A07_370_CONTRATOS_Y_98_CASOS_V20.json` y `REGLAS_A07_MATRIZ_294_VARIANTES_V21.json` para contratos/variantes; sus casos son **documentales**, no replays.
6. `ESTRATEGIAS_A08_77_DECISIONES_SITUACIONALES_V21.json`, `MANOS_REPRODUCIBLES_110_11_DECKS_V14.json`, `EJERCICIOS_PRACTICA_108_RUTAS.json` y `PRACTICA_ESPECIFICA_33_DESAFIOS_V14.json` para escenarios de estrategia/práctica, conservando sus etiquetas de incertidumbre.
7. `RUTAS_EXTRA_28_CASOS_V13.json` como rutas históricas; cuando colisionen con V28 **prevalece V28**.
8. `guias_a10/`, `infografias_a10_v09/`, `imagenes/`, `GUIAS_VISUALES_15_EXTRA_COTEJADOS_V28.html` para presentación visual, no certificación reglamentaria.
9. `03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md` es el **único registro vigente de avances, pendientes, faltantes, bloqueos y cierres**. Nunca mostrarlo como datos para el jugador.

No seguir rutas históricas `work_v16`, `01_INFORMACION_A_IMPORTAR`, `02_PROMPTS_MAESTRO_Y_CODEX` ni versiones V09–V27 cuando la fuente vigente indicada arriba las sustituya. El respaldo V29 conserva todo lo omitido; recuperarlo solo cuando se demuestre necesario.

## 3. Criterio de evaluación de cartas

Toda carta deberá tener un papel **demostrable y explícito** dentro de su deck. Para cada ficha, documentar uno o varios:

- Iniciador, extensor, motor, buscador, interrupción, protección, remoción o recuperación.
- Invocación legal del Extra, material de Sincro/Xyz/Link/Fusión, envío desde Extra por efecto, coste de descarte/destierro/sacrificio, equipo o recurso del Cementerio.
- Función independiente (robar, remover, defender) aunque no forme parte de un combo.
- Sinergia completa, de engine, condicional, utilidad autónoma o **cero sinergia realmente acreditada** cuando ninguna función sea viable con la lista.

**Prohibido** marcar una carta como sinérgica por compartir arquetipo o atribuirle sinergia cero porque no tiene una ruta Extra escrita. La clasificación debe citar carta objetivo, inventario real, condición, coste, zona, turno/fase y limitación. Si falta evidencia, marcar `NO_VERIFICADO` y proponer la verificación documental específica.

### Matriz única obligatoria de trazabilidad entre cartas, sinergias, jugadas y combos

**Requisito transversal de los apartados 05, 06, 08, 09 y 23:** por cada deck mantener **una sola matriz canónica en `APARTADO_06` del archivo `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<REFERENCIA>_<NOMBRE>/DECK_*_CONTENIDO_CURADO.md` ya existente**, sin archivos nuevos. Cubrir el **100 % de las identidades y copias del Main, Extra, Side y Reserva**; enlazar cada `carta_id` con ficha A05, función y juicio de sinergia A06, jugadas A08, combos/variantes A09 donde realmente participe, papel causal, requisitos, disponibilidad, estado de evidencia y ausencia justificada de rutas. A07 comprueba la legalidad y A10 enseña visualmente lo acreditado. Cada ruta A08/A09 debe devolver sus participantes reales por ID a la misma matriz; un mismo combo no se multiplica por aparecer en varias filas.

**Separación crítica:** una carta útil puede no tener combos; un Extra sin vía de invocación puede tener otro uso demostrado o quedar `SIN_RUTA_ACREDITADA`; el Side solo participa en variantes con sustituciones concretas entre duelos; la Reserva genera únicamente hipótesis y jamás se incorpora por inferencia. No inflar resultados, inventar jugadas, modificar inventarios, exigir partidas físicas como tareas de IA o crear tablas de seguimiento paralelas. Al cerrar el análisis declarar cobertura `filas justificadas/identidades confirmadas` por zona y total, enlaces rotos y comprobaciones documentales pendientes en el **único archivo de seguimiento**. La matriz se integra en el trabajo existente, **no añade un nuevo apartado ni una tarea independiente al cómputo de 33 tareas A01–A10**.

## 4. Reglas, causalidad y pruebas

Para cada jugada:

1. Estado inicial completo: mano, campo, Cementerio, Extra, cartas desterradas, fase/turno y recursos rivales necesarios.
2. Pasos numerados con activación, coste, cadena, resolución, material, posición, nueva cadena y destino de recursos.
3. Requisitos del texto oficial Konami de todas las cartas determinantes, restricciones activas y una-vez-por-turno por efecto/nombre.
4. Campo final real, cartas restantes, ruta alternativa y respuesta a una interrupción concreta.
5. Dictamen diferenciado: `VALIDO_CONDICIONAL`, `NO_ACREDITADO`, `ILEGAL` o `PENDIENTE_DE_ESTADO`. **Nunca inferir legalidad solo porque una ruta fue redactada.**

No construir porcentajes de éxito en partidas desde conteos de fichas, rutas o documentos. Los módulos de simulación/motor no son requeridos ni deben sustituir las pruebas físicas.

## 5. Interfaz: conservar los módulos existentes

Preservar la estructura de Station X y los **36 apartados modulares originales del Prompt Maestro**, ahora preservados individualmente bajo `02_PROMPT_PARA_CODEX/apartados/`; no crear componentes de la aplicación independientes por cada apartado ni archivos de seguimiento por ocurrencia. Los diez ejes **A01–A10 de auditoría documental** son **trece controles individuales, uno por deck**, resumidos en el registro único; no sustituyen ni renumeran los 36 apartados de instrucción. Mantener separados Decklist, Estilo y estrategia, Calculador y Matchups.

**Estilo y estrategia** debe ser interactivo y comprensible en móvil, con decisiones ante amenaza, fase, mano y turno. Cada combo exige un título y objetivo claro, fotografías reales de cartas, flechas/orden, pasos cortos numerados, materiales, campo final, variantes y respuesta a interrupciones. Separar interacción básica de combo genuino.

**Práctica y mejora** contiene tareas para usuario físico, sugerencias opcionales de mejora, riesgos de brick, carencias, Side y respuestas por matchup; ningún cambio automático de deck.

## 6. Estado medido y pendientes

- 370 fichas en 11 decks: 138 engine documentadas, 201 relaciones condicionales no verificadas, 15 Extra condicionales con cotejo de escritorio y 16 Extra sin acceso acreditado.
- Las **15/15 rutas en conflicto V27** se cotejaron en V28, pero **no** son 15 replays de motor ni 100% de A01–A10.
- Auditar las 16 cartas Extra listadas en `ESTADO_UNICO_A01_A10_11_DECKS.md` y las 201 condicionales antes de afirmar que cada carta tiene función demostrada.
- Revalidar 77 decisiones situacionales, 108 ejercicios y 110 manos documentadas; estado físico permanece no acreditado.

## 7. Control previo de importación

Antes de importar en una operación futura **expresamente autorizada**:

1. Verificar las tres carpetas raíz y la sección de integridad de `ESTADO_UNICO_A01_A10_11_DECKS.md`.
2. Comprobar **13 decks y 448 identidades** en sus inventarios; el corpus anterior de 11 decks mantiene 370 fichas y 312 imágenes conservadas, mientras las 78 identidades añadidas siguen bajo cotejo y no heredan esos resultados.
3. Contrastar los CID y las Skill de Rush; no alterar datos existentes.
4. Comprobar que cada imagen y ruta relativa de HTML/guías existe.
5. Mantener estados `CONDICIONAL`, `NO_VERIFICADO`, `EXTRA_NO_ACREDITADO` y `VALIDADO_LOGICO_CONDICIONAL`.
6. Mostrar al usuario qué se va a importar y qué queda pendiente de revisión, **sin publicar ni modificar el repositorio/base de datos todavía**.

## 8. Política obligatoria de depuración, archivos y progreso único

**Aplicar en cada iteración, validación, ampliación de contenido o modificación de prompts.** El paquete contiene únicamente archivos necesarios para funcionar, conservar evidencias aún útiles o representar los datos actuales. No acumular reportes por versión, carpetas de respaldo ni archivos técnicos transitorios dentro del ZIP.

### Restricción estricta de contenido importable — orden de Miguel, 17-11-2026

`01_INFORMACION_PARA_IMPORTAR/` es exclusivamente una carpeta de entrega funcional. Solo admite **las carpetas de los decks entregados y los archivos extremadamente necesarios para importarlos, leer sus datos o resolver sus recursos reales**. Esta regla rige la generación inicial, cada ampliación y cada nueva versión; prevalece sobre instrucciones anteriores que permitan producir archivos auxiliares.

- **Actualizar en el mismo lugar:** integrar nuevos análisis, tablas, cálculos, estados, fuentes y correcciones en la ficha canónica del deck y en sus datos estructurados vigentes cuando los consuma el importador. No crear otro archivo por apartado, tema, lote, revisión, fecha o número de versión. Mantener los IDs y las rutas que usa la plataforma.
- **Contenido mínimo por deck:** una ficha `DECK_*_CONTENIDO_CURADO.md`, las imágenes auténticas que realmente referencia, la guía visual vigente si se utiliza y el mínimo de datos estructurados que exija el contrato real del importador. `stationx-deck.json` se conserva cuando sea el documento requerido por Importar/exportar Data. No duplicar configuraciones, inventarios o contenido en varios JSON equivalentes.
- **Prueba de necesidad antes de crear un archivo:** identificar qué importador, pantalla o documento vigente lo consume, su referencia exacta y por qué no basta actualizar un archivo existente. Si no hay consumidor o referencia real, no generar el archivo. Una carpeta compartida o un índice raíz solo se admite si resuelve una dependencia comprobada; no crear recursos compartidos por conveniencia o anticipación.
- **Cero auxiliares en `01`:** no añadir scripts de generación, ejecutables, pruebas, QA, auditorías, manifiestos de control, reportes, checklists, resúmenes, estadísticas de avance, bitácoras, borradores, versiones alternativas, capturas de comprobación, copias de respaldo ni ZIP dentro del ZIP. Las evidencias y el seguimiento corresponden a `03_COMPROBACIONES_NO_IMPORTAR/`, usando su registro único, y las instrucciones a `02_PROMPT_PARA_CODEX/`. Un manifiesto técnico solo se admite si el importador real lo exige, nunca como informe de progreso.
- **Sin expansión por versión:** un cambio de versión actualiza los archivos canónicos; no genera `Vxx.json`, `DELTA_*`, `REPORTE_*` ni colecciones paralelas de resultados dentro de `01`. Consolidar el contenido único en los archivos que ya consume el deck. Conservar los archivos preexistentes necesarios mientras existan consumidores; no romper referencias para aparentar limpieza.
- **Revisión de entrega:** comprobar que cada archivo tiene una función real, que toda imagen o dato auxiliar está referenciado y que no hay duplicados ni carpetas vacías. Una entrega de un solo deck lleva exclusivamente su carpeta y dependencias imprescindibles. No entregar archivos sin uso ni otros decks por inercia. Esta regla no autoriza borrar datos únicos ni los prompts protegidos.

### Antes de crear o modificar archivos

1. **Notificar al usuario** qué archivo existente se actualizará, si se requiere algún archivo nuevo y por qué. No crear silenciosamente prompts, resúmenes, validaciones, informes, manifiestos, respaldos ni ficheros auxiliares.
2. **Preferir editar el archivo vigente** y conservar su identidad y ruta. Crear otro archivo solamente si cumple una función nueva y necesaria que no cabe con claridad en los existentes; anunciarlo y justificarlo antes.
3. Reutilizar este orquestador para instrucciones comunes y **editar el apartado original correspondiente** para instrucciones específicas. No crear copias nuevas por deck, tarea ni versión; los **trece documentos de deck** existentes contienen la información operativa y los estados A01–A10 de **cada deck por separado**. Mantener el anexo vigente de propósito táctico en su ruta.
4. Anotar la evidencia y el pendiente del **apartado A01–A10 trabajado en la tabla de estado del archivo `DECK_*.md` de ese deck**, y mantener **`03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md`** como **único resumen central**. No crear `PENDIENTES_Vxx`, `PROGRESO_Vxx`, `RESUMEN_Vxx`, `QA_Vxx` o informes paralelos para el seguimiento rutinario.

### Durante la tarea

5. Para cada trabajo registrar **primero en el deck seleccionado y luego en el resumen único**: ID estable (A01–A10/deck/carta/ruta), estado (`PENDIENTE`, `EN_CURSO`, `BLOQUEADO`, `VALIDADO_LOGICO`, `PENDIENTE_MESA` o `COMPLETADO`), evidencia disponible, fecha, resultado concreto y siguiente acción. Separar revisión documental, validación lógica y prueba física. **No modificar la tabla de los otros doce decks** como efecto lateral.
6. Si una prueba falla, **corregir el documento o dato de origen** y actualizar la misma entrada del seguimiento. La salida temporal de una comprobación puede existir solo fuera del ZIP mientras se trabaja; no se entrega como archivo independiente cuando sus hallazgos ya quedaron incorporados.
7. No reducir porcentajes pendientes mediante cambios de etiqueta sin evidencia. Toda variación de progreso debe indicar numerador, denominador y casos afectados; nunca inferir tasa de victoria a partir de cobertura documental.

### Al terminar una tarea o validación

8. Actualizar la misma entrada: registrar `COMPLETADO`, `VALIDADO_LOGICO` o `PENDIENTE_MESA`, enlazar la evidencia **que aún es útil**, retirar la tarea de la lista activa de faltantes y conservar una línea breve de cierre **dentro del mismo archivo único**.
9. Consolidar los hallazgos en las fuentes canónicas A01–A10; depurar **únicamente archivos auxiliares que NO sean prompts protegidos** (borradores, intermedios, informes duplicados, previews antiguas o validaciones temporales ya absorbidas) tras comprobar que no contienen datos únicos. **Está prohibido eliminar prompts, incluso si parecen sustituidos, antiguos o redundantes.** No guardar una carpeta `históricos`, `backup` o `papelera` dentro del paquete.
10. Antes de excluir cualquier archivo **no protegido** comprobar referencias internas, CIDs, hashes cuando proceda, función actual y presencia de información única. **No eliminar ningún prompt**, ni inventarios, cartas, Skills, fotos necesarias, guías vigentes, fuentes oficiales o evidencia técnica que siga sustentando un dictamen. Si su utilidad es incierta, dejarlo documentado como pendiente de depuración en el archivo único, no borrarlo por intuición.
11. Para una **entrega completa del maestro**, verificar exactamente tres carpetas, **13 decks y 13 tablas A01–A10 de diez filas**, identidades de cartas, imágenes referenciadas, vínculos entre prompts/datos, integridad de JSON y separación entre importable y comprobaciones. Para **entrega incremental por deck**, aplicar el contrato del apartado 13 y comprobar únicamente los archivos necesarios para **ese deck**; no arrastrar las otras doce fichas ni la carpeta de prompts.
12. Si la operación necesita un nuevo ZIP de entrega, **actualizar el paquete vigente cuando sea posible**, en vez de multiplicar versiones. No borrar archivos externos al ZIP o respaldos del usuario sin una instrucción separada y explícita.

**Regla de cierre:** cada uno de los trece archivos de deck guarda únicamente **su estado individual A01–A10**; en todo momento existe **un solo archivo de seguimiento global de avances, tareas faltantes y validaciones pendientes**. Las evidencias fuente permanecen donde corresponden y no generan una colección paralela de informes.

## 9. Concordancia obligatoria con los 36 apartados recuperados

**Inventario modular:** existen **36 archivos distintos, numerados 01–36, en `02_PROMPT_PARA_CODEX/apartados/`**. Son instrucciones operativas, no 36 partidas probadas ni 36 trabajos finalizados. La instrucción de cada archivo prima **para su tema específico**, sujeta al inventario confirmado, al texto y reglas oficiales, a la prohibición de alterar cartas sin permiso y a las decisiones posteriores expresas de Miguel. Las políticas comunes de no importación, juego físico, privacidad y único seguimiento de este orquestador prevalecen frente a instrucciones antiguas de empaquetado. Si dos requisitos sustantivos se excluyen, anotar el conflicto en el registro único y no elegir silenciosamente.

**Rutas vigentes:** los apartados 01–35 consultan ahora los decks directamente en `01_INFORMACION_PARA_IMPORTAR/decks/`; los módulos viven en `02_PROMPT_PARA_CODEX/apartados/` y el orquestador en `02_PROMPT_PARA_CODEX/`. **El apartado 36 permanece literalmente sin cambios por orden de Miguel**: cualquier mención allí a `decks/` se interpreta como `01_INFORMACION_PARA_IMPORTAR/decks/`, sin requerir ni buscar estructuras antiguas. **Solo A01–A10 tienen seguimiento de ejecución individual por deck dentro de su `DECK_*.md`.** Los módulos 11–36 permanecen como instrucciones de consulta y **no tienen porcentaje, estado de ejecución ni filas de progreso por deck**. El registro `03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md` consolida el estado de los 13; la ficha local es su evidencia específica, no una segunda bitácora general.

**Decisión expresa de Miguel (16-11-2026) sobre dependencias antiguas:** las tres referencias compartidas del esquema anterior se **retiran definitivamente de los requisitos y del registro de pendientes**. No buscarlas, reconstruirlas, recrearlas ni tratarlas como bloqueo. Los apartados 01–35 fueron adaptados a las fuentes vigentes del paquete: este orquestador, las fichas A09/A10, el material A07 contextual y los documentos de cada deck. La mención original conservada dentro de A36 por petición expresa de no modificarlo **no reactiva ninguna dependencia**. A10 se acepta con su contenido y recursos actuales, sin obligación de visor, scripts o PDF históricos. La aceptación editorial de A10 no convierte en certificadas las rutas cuyo estado reglamentario siga pendiente.

**Adaptaciones para evitar contradicciones:**

1. **A05 y A06:** toda carta requiere función, incluso material/coste, destierro, descarte, recurso autónomo o envío desde Extra. En A06 distinguir **tres ejes independientes** —tipo de relación, papel táctico y estado de evidencia— como detalla `apartados/06_SINERGIAS_Y_MOTORES.md`; ninguna etiqueta de procedencia es prueba de sinergia. La ausencia de ruta o de evidencia no basta para declarar sinergia cero.
2. **A07–A13:** las cifras históricas de rutas visualizadas y los 108 ejercicios / 110 manos actuales describen **conjuntos o cortes diferentes**, no una discrepancia editorial de A10. **A10 es conforme con lo existente por instrucción de Miguel**, sin recuperar herramientas históricas. La ficha causal A09 y su lectura visual A10 siguen siendo una única jugada; A12/A13 referencian el mismo ID, sin duplicarla ni atribuir validación física.
3. **A22:** las propuestas se justifican por función, recursos y consistencia; se aplica la exclusión transversal establecida en la sección 1 y no se modifica el inventario. **A23/A28:** Side solo tras incorporación efectiva; Reserva no es carta disponible en el duelo. **A27:** probabilidad teórica de mano no equivale a tasa de victoria.
4. **A30/A31/A32/A36:** conservar **únicamente** el seguimiento privado vigente en `03_COMPROBACIONES_NO_IMPORTAR/`, sin importar estados, porcentajes ni bitácoras a Station X. Los 36 apartados no obligan a crear 36 reportes separados. A36 menciona un prompt operativo por deck; aprovechar los once documentos ya existentes, identificar las secciones aún ausentes como pendientes y no crear once maestros duplicados.
5. **A34/A35:** 67 registros son **instantánea anterior** del catálogo, no 67 decks estudiados ni incorporados al ZIP. El alcance actual de este paquete es de **13 decks**, solo con las identidades inventariadas y sin acreditar por extensión las dos altas.

**Control de coherencia:** la auditoría de instrucciones por apartado y cualquier discrepancia de implementación se registra **solo** en `ESTADO_UNICO_A01_A10_11_DECKS.md`. La recuperación de los 36 archivos no acredita ejecución de sus 36 contenidos sobre cada deck, ni implementación visual o porcentajes de validación A01–A10.

## 10. Alta incremental de dos decks — 16-11-2026

**Decisión posterior y específica de Miguel:** el paquete pasa de **11 a 13 decks documentados**. Los once anteriores se preservan con sus IDs, listas, matrices, análisis y cifras históricas; se añaden **Mementotlán / Demoniherrero** y **Cristron / Horus** como decks **12 y 13 de esta carpeta**, no como IDs inventados de Station X.

1. El inventario vigente de los trece está en `01_INFORMACION_PARA_IMPORTAR/INVENTARIOS_CONFIRMADOS.txt` y los trece archivos de configuración individuales `01_INFORMACION_PARA_IMPORTAR/decks/DECK_*/DECK_*_CONTENIDO_CURADO.md`. Las dos altas nuevas constan en `DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO/DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO_CONTENIDO_CURADO.md` y `DECK_NUEVO_13_CRISTRON_HORUS/DECK_NUEVO_13_CRISTRON_HORUS_CONTENIDO_CURADO.md` hasta obtener sus **IDs reales de Station X**. No autoriza importar ni crear automáticamente registros en la plataforma.
2. El deck 12 aporta **41 Main + 15 Extra + 14 Side = 70 copias**, y el 13 **40 Main + 15 Extra + 15 Side = 70 copias**. En ambos hay **39 identidades documentales**. Conservar ambas distribuciones sin completar artificialmente el Side, mover cartas ni mezclar Side/Reserva con Main.
3. Los archivos analíticos antiguos con sufijos `370`, `108`, `110` u `11_DECKS`, sus métricas, CIDs y la referencia a **33 tareas de IA** describen el **corte original de 11 decks**. **No** extender sus logros a las 78 identidades nuevas ni interpretar que sus efectos, fuentes, combos o guías visuales están verificados. Para el alcance agregado hay **13 decks, 786 copias y 448 identidades por deck**, con **78 nuevas identidades pendientes de cotejo funcional y causal A04–A10**. Las etapas y denominadores ampliados deberán conciliarse en el único registro de seguimiento, sin crear reportes paralelos.
4. Este inciso aclara únicamente las referencias previas de este orquestador que afirman «exactamente once» como alcance actual, sin alterar retroactivamente la evidencia histórica. **Los 36 prompts modulares, particularmente los apartados 10 y 36, no se modifican.** Todo prompt sigue protegido contra eliminación, renombrado, resumen sustitutivo o limpieza.

## 11. Criterio único de curaduría e integración a Station X — consolidación sin archivos adicionales

Esta sección incorpora **solo requisitos operativos vigentes y no redundantes** del material anterior. No reactiva `MATRIZ_IMPORTACION_00_36.txt`, ningún antiguo `PROMPT_MAESTRO.md`, `PROMPT_CODEX_STATION_X.md`, LEEME de entregas anteriores ni los archivos compartidos expresamente descartados. **Ninguno es dependencia de ejecución**, y no se añade una carpeta de históricos. Los 36 apartados actuales siguen siendo los únicos módulos vigentes para sus respectivos temas.

### Separación obligatoria entre control editorial y contenido para jugadores

- `CONTROL_DEL_PROMPT`: verificar nombres/CID, funciones, reglas, ventanas, costes, materiales, disponibilidad de zona, evidencia y resultados. Guardar estados, porcentajes, bloqueos y bitácora **exclusivamente** en el registro de `03_COMPROBACIONES_NO_IMPORTAR/`; no implementar ni mostrar en Station X un campo, pantalla, atributo o persistencia de estado editorial o de certificación.
- `CONTENIDO_UI`: presentar **solo** información táctica sustentada para el jugador: identidad, funcionamiento de cartas y motores, sinergias demostradas, decisiones, rutas con pasos reales, campo final y respuestas acreditadas. No introducir prompts completos, instrucciones para Codex, listas de pendientes, métricas editoriales o afirmaciones sin sustento. Cuando un paso no pueda justificarse, corregirlo u omitirlo **antes** de preparar su visualización; no publicarlo con una etiqueta de pendiente como sustituto.
- La comprobación editorial y la preparación de la vista **no autorizan escritura en Station X**. Si posteriormente se autoriza importación, inspeccionar primero la arquitectura y las claves reales, asociar por `deck_id` confirmado, actualizar de forma idempotente sin crear decks duplicados, comprobar la vista en escritorio/móvil y dejar la verificación humana posterior a Miguel. Para los decks nuevos 12 y 13, **no** atribuir IDs reales hasta obtenerlos.

### Destino de los 36 apartados sin crear 36 pantallas

La siguiente clasificación distingue **contenido**, **contexto**, **soporte**, **otros módulos** y **control interno**. Un apartado puede aparecer en más de una fila cuando distintos fragmentos tienen destinos diferentes. **La clasificación no otorga permiso de publicación ni certifica legalidad.**

| Destino | Apartados pertinentes | Aplicación correcta |
|---|---|---|
| **P — Principal** | 05, 06, 08, 09, 10, 14, 15, 16, 17, 18, 19, 20, 21, 24, 28, 33 | Explicación útil para aprender y decidir con el deck; solo evidencia sustentada |
| **C — Contextual** | 02, 04, 07, 11, 12, 13, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 32 | Regla, coste, ejemplo, ajuste o explicación desplegable junto a la carta/paso afectado |
| **O — Otro módulo** | 02, 34, 35 | Identidad del deck, navegación de catálogo y métricas globales en sus módulos existentes |
| **S — Soporte** | 03, 26, 31, 32, 33, 35 | Cotejo y fuente de calidad; importar solo fragmentos tácticos expresamente habilitados por P/C |
| **I — Interno** | 01, 30, 36 | Instrucción, comprobación y continuidad; jamás como estrategia visible ni datos del jugador |

**El supuesto apartado 00 de referencias compartidas antiguas no se reintroduce**: su gobernanza útil ya está expresada en este orquestador y en los 36 módulos actuales. Los códigos P/C/O/S/I son una **regla integrada aquí**, no un archivo que haya que buscar.

### Una sola experiencia de aprendizaje, sin duplicar rutas

Dentro del módulo real **Estilo y estrategia**, organizar la lectura en **cinco bloques lógicos**, no necesariamente cinco pestañas ni nuevos componentes: (1) *Empieza aquí*: objetivo y motor; (2) *Cartas y sinergias*: función por carta y conexión real; (3) *Aprende jugadas*: una ficha A09 por ruta y su representación A10 **en la misma lección**; (4) *Estrategia y decisiones*: primero/segundo, adversidad, recursos, matchup; (5) *Practica y mejora*: manos, errores, Side/Reserva y ajustes opcionales. No fabricar un bloque vacío para aparentar cobertura de los 36 procesos.

Para cada ruta visible, mantener un **único ID canónico A09**, fotografías auténticas y nombre/verbo individual bajo cada carta, mano y estado inicial reales, pasos verticales numerados, costes y materiales, tablero final con zonas y recursos verdaderos —incluidos Cementerio, destierro y materiales Xyz cuando correspondan— y la interrupción A12/A13 **en el paso donde sea posible**, con coste pagado y continuación solo si está acreditada. A07 se explica junto a esa acción, no en una pestaña de reglamento; una interacción básica jamás se promociona como combo completo. A10 es una presentación del mismo caso A09, **no una segunda jugada ni un segundo contador**. Estas condiciones interpretan el anexo de interfaz vigente; **no modifican el contenido del prompt modular 10**, que Miguel declaró conforme.

El material contextual A07 específico de los 11 decks previos **ya existe** en `REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md`; no duplicarlo ni contar advertencias repetidas como nuevo análisis. **Mementotlán/Demoniherrero** tiene en su propia carpeta **30 controles A07**, 12 rutas C01–C12 y seis desvíos documentales, todavía pendientes de simulador; **Cristron/Horus** conserva pendiente la evaluación A04–A10. No inventar reglas ni vías de Invocación Extra. Las cifras de análisis, rutas e imágenes de entregas anteriores no se incorporan como progreso nuevo: el corte de **13 decks / 448 identidades** y sus pendientes se consolida en el registro único.

## 12. Ejecución incremental: un deck y un apartado A01–A10 por vez

**Esta es la instrucción operativa vigente para continuar el trabajo.** No ejecutar A01–A10 sobre los 13 decks en una sola pasada ni actualizar automáticamente todos los decks porque una regla compartida haya cambiado. El alcance de cada ejecución se identifica mediante la pareja estable **`deck_ref` + `Axx`**, donde `Axx` pertenece exclusivamente a **A01–A10**. `deck_ref` será el `deck_id` real para los once anteriores; para los dos nuevos se admite temporalmente `NUEVO_12` o `NUEVO_13` **solo como referencia documental**, no ID de Station X.

1. **Seleccionar exactamente un deck:** abrir su archivo `01_INFORMACION_PARA_IMPORTAR/decks/DECK_*/DECK_*_CONTENIDO_CURADO.md`, leer identidad, inventario, el cuadro **«Estado de ejecución por apartado (contenido de este deck)»**, la matriz A06 y las evidencias de la tarea escogida. El usuario puede seleccionar otro orden, pero nunca se extiende el trabajo a otro deck por inferencia.
2. **Seleccionar el apartado concreto:** elegir A01–A10 según petición o dependencias necesarias (habitualmente A03/A04/A05 → A06/A07 → A08/A09 → A10, con cierre cruzado A01/A02). Consultar solo el prompt modular pertinente y fuentes requeridas; los módulos 11–36 se pueden usar como **criterios de apoyo**, nunca se ejecutan ni se puntúan como apartados adicionales.
3. **Trabajar solo en ese deck:** contrastar sus identidades, zonas Main/Extra/Side/Reserva, efecto oficial, función, sinergia, coste, carta objetivo, materiales, jugadas y resultado. Reutilizar JSON/guías compartidos como evidencia sin alterarlos globalmente durante una operación local; si una fuente compartida requiere corrección transversal, separar y anunciar esa operación antes de ejecutarla.
4. **Actualizar el mismo archivo del deck:** conservar los diez renglones A01–A10. En la fila trabajada registrar `fecha de corte | cobertura documental real | cierre acreditado/objetivo o — sin conciliación | estado | IDs de cartas/rutas verificados | fuente | pendiente concreto y siguiente acción`; si la tabla usa texto condensado, expresar esos datos en su celda o en una nota inmediatamente asociada. No usar existencia de fichas/fotos como sinónimo de legalidad ni convertir un porcentaje documental en porcentaje de finalización. Un asunto bloqueado continúa visible en el deck.
5. **Sincronizar el resumen único:** reflejar exclusivamente **el cambio acreditado de ese `deck_ref` + `Axx`** en `03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md`. El resto de decks y apartados conserva su último corte. No recalcular 13 decks, no cerrar las 33 categorías de tareas en bloque, no añadir un archivo de progreso por deck.
6. **Conservar evidencia y continuidad:** informar qué se cerró, qué no, cuáles IDs fueron comprobados y el **siguiente apartado recomendado de ese mismo deck**. El porcentaje por apartado se calcula solo con `unidades acreditadas / total verificable × 100`; mostrar `—` cuando no esté conciliado. El porcentaje total de deck requiere los diez cierres individualizados, con objetivos comparables; **no promediar etiquetas ni asignar 100 % por existencia de diez filas**.

**Separación absoluta:** el avance que se documenta es únicamente **A01–A10 por cada uno de los 13 decks**. Los prompts **11–36** siguen completos, protegidos y disponibles como instrucciones, pero no se crean campos `APARTADO_11` a `APARTADO_36` de progreso, tablas de avance, porcentajes o estados de cierre para ellos. No importar este control editorial a Station X ni publicar nada sin nueva autorización.

## 13. Contrato de entrega incremental — únicamente la carpeta del deck solicitado

**Nueva decisión de Miguel:** cuando se solicite **cargar un deck nuevo** o **analizar/actualizar X apartados de un deck**, no reconstruir, reentregar ni comprimir nuevamente el ZIP completo de Station X. El resultado será **un ZIP pequeño con una sola carpeta importable correspondiente a ese deck**, con su configuración y archivos efectivamente necesarios. Los prompts y la bitácora general permanecen en el **paquete maestro local**, no viajan dentro de ese ZIP parcial. Solo crear un nuevo ZIP general si Miguel lo pide **expresamente**.

### Carpeta única obligatoria para cada deck (existente o nuevo)

```text
01_INFORMACION_PARA_IMPORTAR/
└── decks/
    └── DECK_<ID_REAL_O_REFERENCIA>_<NOMBRE_CORTO>/
        ├── DECK_<ID_REAL_O_REFERENCIA>_CONTENIDO_CURADO.md
        ├── imagenes/      (solo si hay imágenes usadas por este deck)
        ├── guias/         (solo si hay guías A10 de este deck)
        └── datos/         (solo si hay JSON o recursos específicos requeridos)
```

**No generar carpetas vacías** ni añadir `README`, manifiestos, respaldos, historias, capturas de control, prompts globales o imágenes ajenas solo para rellenar el esquema. La ficha `DECK_*.md` es también el **archivo único de configuración**: ID real o referencia provisional, nombre, formato, versión, Main/Extra/Side/Reserva, Skill si aplica, procedencia, tabla individual A01–A10 y matriz A06; no duplicar esos datos en un segundo archivo de configuración. Si un importador real exige otro formato técnico, verificar primero su contrato y generar **únicamente** lo necesario con autorización, sin inventar esquema ni modificar Station X.

**Autocontención:** incluir solamente fotografías autorizadas, guías y datos efectivamente citados por el deck, con rutas **relativas a su propia carpeta**; copiar únicamente el recurso compartido imprescindible o resolver una dependencia oficial estable. Prohibidas referencias rotas a carpetas de otro deck, archivos locales históricos o rutas absolutas. Comprobar que todo CID/imagen/guía declarado existe y corresponde a la carta; si falta una evidencia, registrar la falta en A04/A10 sin presentar la carpeta como importable y validada al 100 %. Las copias Main/Extra/Side/Reserva y las restricciones no pueden cambiar por el empaquetado.

### Procedimiento que se ejecutará en cada solicitud futura

1. Identificar el deck y los **apartados A01–A10 explícitamente solicitados**; conservar los otros apartados y la lista de cartas sin modificarlos. Para altas sin ID real, utilizar `NUEVO_NN` como referencia **solo documental** y no afirmar importación lista.
2. Usar los módulos del maestro como instrucciones, trabajar **solo en la ficha y recursos del deck elegido** y actualizar su control A01–A10 con cobertura, evidencia, estado y siguiente acción. Sincronizar el resumen global en su archivo existente **sin incluirlo en la entrega importable**.
3. Empaquetar exclusivamente `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<...>/` y su contenido; **cero carpetas de otros decks**, **cero prompts**, **cero bitácoras**, **cero duplicados**. Al descomprimir el ZIP parcial, se recupera exactamente la ruta bajo `01_INFORMACION_PARA_IMPORTAR/`.
4. Validar lista de archivos, cantidad de cartas y zonas, referencias relativas, integridad de imágenes/JSON y que solo cambió el deck solicitado; indicar qué apartados se trabajaron, su cobertura y lo pendiente. **La entrega no autoriza importar ni publicar automáticamente**.
5. Si Miguel solicita una **actualización global de prompts**, entregar solo los prompts **modificados** como **parche incremental identificado**, con sus rutas exactas y sin presentarlo como ZIP maestro sustitutivo. Verificar previamente que los 39 documentos protegidos del maestro permanecen completos. El maestro íntegro solo se genera a petición expresa.

**Migración de los 13 decks actuales — autorizada por Miguel el 16-11-2026:** las trece fichas existentes están ya organizadas en **trece subcarpetas individuales** `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<REFERENCIA>_<NOMBRE>/`, con una configuración `DECK_*_CONTENIDO_CURADO.md` por carpeta, fotografías/guías existentes por deck y sin archivos de configuración planos duplicados. Se conservaron los recursos compartidos `imagenes/` y `guias_a10/` para los demás consumidores del maestro; las referencias Markdown de las fichas se adaptaron y comprobaron. **No se ha comprobado ni modificado un importador real de Station X**: antes de integrar en una aplicación, validar allí el contrato de rutas. La entrega ordinaria sigue siendo el ZIP pequeño de un solo deck; el maestro completo solo se reentrega por petición expresa, como esta. El módulo 36 se conserva literalmente sin editar; las rutas antiguas escritas allí se interpretan conforme a esta estructura vigente.

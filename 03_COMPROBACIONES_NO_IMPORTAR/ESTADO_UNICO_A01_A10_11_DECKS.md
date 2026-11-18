# Station X — Estado único de avance, validaciones y pendientes (A01–A10; 16 decks, 11 de estudio previo)

## Corrección transversal de contratos de prompts — 17-11-2026

**Verificación de cierre de cinco hallazgos críticos:** se precisó en el orquestador que A36 permanece literalmente intacto pero su salida histórica `APARTADO_36` y su dependencia `00_REGLAS_COMPARTIDAS.md` no se ejecutan ni reactivan; solo hay seguimiento A01–A10. Se corrigieron referencias operativas remanentes de 13 a 16 decks. El módulo 31 ahora distingue integridad de 36 prompts de progreso real por diez ejes y contiene matriz de transición por documentación, guía y reglas. El módulo 10 separa las cinco puertas de salida (documentación, guía, reglas, importador, autorización) para no confundir archivo importable con ruta certificada o contenido publicado. La fuente de inventario aprobada prevalece para cantidades; cualquier diferencia con Station X requiere registro y decisión expresa, sin cambio silencioso. Se actualizaron únicamente las huellas de los tres prompts editados en esta revisión. No hubo nuevos análisis de decks ni importación/publicación.

Se revisaron los 39 prompts y se editaron puntualmente **35**: el orquestador, el anexo y los módulos 02, 04–35. Los módulos 01, 03 y 36 y el documento base de reglas permanecen byte por byte idénticos. Se mantienen 36/36 módulos y 3/3 documentos base; no se borró, renombró ni fusionó ninguno. Las huellas actualizadas están en la tabla única inferior.

**Decisiones de consistencia:** alcance operativo de 16 decks e IDs reales confirmados; seguimiento únicamente A01–A10; módulos 11–36 como criterios auxiliares sin campos de progreso; fuentes físicas aprobadas prevalecen para cantidades ante diferencias con producción; estados documentales, reglamentarios, de guía, importación y publicación separados. Se completaron mínimos de evidencia A05/A06/A08/A09, contratos de interrupciones/ramas, Side, matchups, rúbricas, cálculos probabilísticos, manos reproducibles y revalidación dirigida por dependencia. Las cifras de 11 y 13 decks siguen como cortes históricos fechados. La corrección **no reejecuta ni certifica combos**, no cambia inventarios, no importa a Station X y no publica contenido de la aplicación.

## Depuración editorial del repositorio — 17-11-2026

**Sincronización de guías A10 (segunda fase, 17-11-2026):** se verificaron mediante SHA-256 **47 grupos canónicos y 50 copias locales**, con **0 diferencias**. La fuente de edición es `01_INFORMACION_PARA_IMPORTAR/guias_a10/`; las copias en `decks/*/guias/` se mantienen por independencia de los ZIPs y compatibilidad de rutas. `tools/sincronizar_guias_a10.py` comprueba diferencias sin escribir y ofrece `--sync` explícito para propagar del canónico a copias existentes. La comprobación en GitHub Actions sobre `base` evita que nuevas divergencias se integren sin detectarse. En esta fase no hubo alteraciones de contenido de ninguna guía, deck o prompt, ni importación a Station X.

Alcance vigente: **16 decks**, con las 11 identidades originales y cinco altas ya vinculadas a IDs reales. Se retiraron de las once fichas originales **370 advertencias de alcance de ficha**, **366 advertencias de guía**, **364 repeticiones literales de uso de recursos** y **56 duplicaciones literales de explicación práctica**. Cada deck conserva una advertencia editorial general; los inventarios, cartas, CIDs, rutas y estados de evidencia no se modificaron. En los cinco estudios nuevos se simplificaron los avisos históricos del encabezado y se marcó V38–V40 como historial complementario, conservando sus análisis.

Las guías duplicadas entre `decks/*/guias/` y `guias_a10/` se conservan deliberadamente: los ZIPs de un deck necesitan su carpeta autocontenida y el maestro mantiene consumidores de las rutas compartidas. Tampoco se eliminaron pares JSON/Markdown sin comprobar el contrato de generación ni se alteró `previsualizacion_v19/datos_v19.js`. Los cortes de 11 y 13 decks que figuran más abajo son históricos y **no deben leerse como estado vigente**.

Prompts editados puntualmente en esta depuración: `00_PROMPT_UNICO_STATION_X_V31.md`, `apartados/02_RECEPCION_DE_UN_DECK.md` y `apartados/03_VALIDACION_DEL_INVENTARIO_SIN_REVISION_GENERAL_DE_BANLIST.md` para aclarar 16 decks e IDs confirmados. Todos los demás prompts protegidos permanecen byte por byte idénticos; actualizaron sus tres huellas en la tabla de integridad. No hubo importación ni publicación en la plataforma.

## Ajuste de prompts solicitado por Miguel — 17-11-2026

Se retiraron las instrucciones de consulta/aplicación de listas de construcción y su excepción en A22. La sección 1 del orquestador excluye ese criterio para todos los decks, apartados, propuestas y alertas, conservando las condiciones mecánicas de efectos, costes e invocación. Se reforzó la política de contenido mínimo de 01_INFORMACION_PARA_IMPORTAR: archivos canónicos, recursos referenciados y contrato real del importador; cero auxiliares o resultados paralelos por versión. No se eliminaron los datos existentes.

Prompts modificados exclusivamente: 00_PROMPT_UNICO_STATION_X_V31.md, apartados/03_VALIDACION_DEL_INVENTARIO_SIN_REVISION_GENERAL_DE_BANLIST.md y apartados/22_CANTIDADES_CAMBIOS_Y_ALTERNATIVAS.md. Sus huellas se actualizaron en esta misma tabla. 36/36 apartados y 3/3 bases conservados; 0 prompts eliminados, 0 renombrados, 36 archivos no editados idénticos. Respaldo y comprobación técnica fuera de la carpeta importable: outputs/prompt-policy-20261117/. Sin importación ni despliegue en esta tarea.


## Importación V40 completada — 17-11-2026

Actualizados Memento 671, Crystron 677, Purrely 660, Salamangreat 673 y Goat Control 699, conservando los once estudios anteriores. Se importaron 40 cálculos de apertura documentados, 56 fichas de acceso y función del Extra, y 30 escenarios estratégicos con planes primero/segundo y Side registrado. Las probabilidades son coincidencias de cartas, no victorias ni ejecuciones certificadas. Los documentos completos están disponibles en el lector; las fichas del Extra y las decisiones también están en sus componentes interactivos. Se actualizaron los cinco ZIP descargables desde Importar/exportar Data.

Biblioteca activa: 16 decks, 562 fichas, 193 rutas, 933 pasos y 75 decisiones. V40 no añade rutas de combo. Validador nativo: 193 conversiones aprobadas; guías comprobadas localmente en 1440 y 390 px, incluidas las decisiones V40. Publicado con caché 208, bytes remotos verificados y cero cambios de inventarios/resultados. Los 39 prompts protegidos se conservaron. Evidencia: outputs/import-20261117-v40/deployment.json, native-validation.json, ui-validation.json y content-validation.json.


## Importación V38/V39 completada — 17-11-2026

Actualizados los cinco estudios modificados: Memento 671, Crystron 677, Purrely 660, Salamangreat 673 y Goat Control 699. Se conservan los demás estudios activos y todos los vínculos previamente confirmados por Miguel. Las tres variantes de Crystron V05/V06/V07 se incorporan como secuencias condicionales, sin presentarlas como tres familias tácticas distintas.

La biblioteca activa `20261117-folder-delivery-v39` contiene 16 decks, 562 fichas con fotografía disponible y 193 secuencias principales/variantes consultables. Se preservaron las 51 comprobaciones documentales de los cinco estudios y las observaciones de formato de sus respectivas fuentes; estas observaciones no implican simulación ejecutada ni certificación nueva por el importador. Los textos de inicio, ventanas, límites, interrupciones y fuentes quedan vinculados por ID a las rutas que corresponden; las alternativas sin secuencia independiente permanecen como documentación de variantes, sin inventar pasos.

Las 193 conversiones pasaron el validador PHP nativo del editor; las 16 guías se comprobaron localmente en 1440 y 390 px. Publicado en el sitio con caché 206 y comprobación de bytes remotos. Evidencia: `outputs/import-20261117-v39/deployment.json`, `native-validation.json`, `ui-validation.json` y `content-validation.json`. Cero escrituras de inventarios o resultados deportivos; 39 prompts protegidos conservados sin modificación.

## Integración V37 — 17-11-2026 — 16 decks

Miguel confirmó expresamente `NUEVO_14 → 660 Purrely (tcg_advanced)`, `NUEVO_15 → 673 Salamangreat (tcg_advanced)` y `NUEVO_16 → 699 Goat Control (goat)`. Se conservan los destinos anteriormente confirmados `NUEVO_12 → 671 Memento` y `NUEVO_13 → 677 Crystron`; no volver a solicitarlos salvo discrepancia nueva. La denominación provisional de las carpetas no representa un deck adicional.

Los tres inventarios nuevos ya estaban cargados en el registro vivo: Purrely 48/15/7/0, Salamangreat 40/15/15/0 y Goat Control 40/14/0/0 (Main/Extra/Side/Reserva). Esta actualización no cambió esas listas ni rellenó las zonas incompletas o no recibidas. El estudio GOAT conserva su formato y tablero propios.

La entrega preparada `20261117-folder-delivery-v37-complete` reúne 16 estudios, 562 identidades con fotografía disponible y 190 rutas principales; los tres estudios añadidos aportan cinco rutas cada uno. Sus variantes y condiciones se conservan como parte de las fichas, sin contarlas como combos nuevos independientes. Las 190 conversiones pasaron el validador PHP del editor y las 16 guías se probaron localmente en 1440 y 390 px. Fotografías completas no equivalen a simulaciones ni certificación de reglas. Los estados editoriales previos se conservan.

Evidencia técnica de preparación y publicación: `outputs/import-20261117-v37-complete/` fuera de los prompts. Registro nativo e inventarios comparados; cero escrituras de resultados deportivos. Ninguno de los 39 prompts protegidos fue editado o eliminado durante la importación.

## Importación autorizada a Station X — 16-11-2026

Miguel confirmó los destinos `NUEVO_12 → 671 Memento` y `NUEVO_13 → 677 Crystron`. Se cotejaron ambos registros nativos como TCG Advanced. Las listas se guardaron mediante el editor nativo con control de versión y auditoría: Memento 41 Main / 15 Extra / 14 Side; Crystron 40 Main / 15 Extra / 15 Side; 70 copias por deck. Las once listas anteriores permanecen intactas.

La entrega pública `20261116-folder-delivery-v31` contiene 13 estudios, 448 fichas y 175 rutas disponibles en la biblioteca y convertibles al editor nativo. Incluye la lectura íntegra del contenido jugable de las fichas por carpeta, sin incorporar este registro ni los prompts al contenido público. Las 175 conversiones se validaron con el contrato PHP del editor; las 13 pantallas y sus rutas se probaron localmente en escritorio y móvil. Esto acredita importación y funcionamiento de interfaz, no simulación reglamentaria ni cierre de los pendientes del estudio. Las fotos ausentes continúan pendientes.

Evidencia de publicación y listas: `outputs/import-20261116-v31/deployment.json`, `native-import.json` y `report.json`, fuera del paquete editorial. No se modificaron ligas, copas, resultados, cantidades anteriores ni ninguno de los 39 prompts protegidos. Las referencias posteriores a dos altas sin ID describen el estado anterior a esta confirmación.

**Este es el único archivo de seguimiento vigente dentro del ZIP.** Aquí se registran los pendientes, bloqueos, avances y cierres de todas las tareas A01–A10, por deck y por ruta. No generar archivos paralelos `PENDIENTES`, `QA`, `PROGRESO`, `RESUMEN` o `VALIDACION` por iteración: actualizar este mismo documento. La evidencia técnica necesaria permanece en los archivos fuente correspondientes.

**Consolidación previa sin históricos:** las reglas vigentes de clasificación de los 36 apartados por destino, separación de control editorial y contenido público, validación de `deck_id`, presentación visual de jugadas y prevención de duplicidades se integraron al apartado 11 del maestro existente. La referencia vigente de A07 ya cubre el material contextual útil del documento V60; no se necesita duplicarla. No se incorporan los antiguos `LEEME`, la matriz ni los maestros anteriores como archivos separados o dependencias. En **la iteración anterior** se reorganizó el flujo del maestro, este registro y **el control A01–A10 dentro de los 13 documentos de deck**; ello **no equivalió a ejecutar ni completar** análisis adicionales ni a validar más cartas, combos o sinergias. En **esta entrega de carpetas individuales** se actualizaron las rutas del orquestador y de los apartados **03, 05, 06, 09, 10 y 32**. El **36** sigue intacto.

**Decisión posterior — entregas incrementales por deck (16-11-2026):** cuando Miguel solicite un deck nuevo o continuar X apartados A01–A10 de un deck, el trabajo se hace **solo en ese deck** y el entregable contiene exclusivamente su carpeta `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<REFERENCIA>_<NOMBRE>/`, con **una ficha de configuración `DECK_*_CONTENIDO_CURADO.md`** y únicamente imágenes, guías o datos que necesite. No reenviar los otros decks, prompts ni este registro de control en un ZIP destinado a importar un deck. El maestro con sus tres carpetas y **39 prompts protegidos** permanece como origen. **Migración global expresamente solicitada después:** las 13 fichas quedaron organizadas dentro de sus 13 subcarpetas, sin copias de configuración sueltas y con referencias de imágenes/guías corregidas. **No se han alterado listas de cartas, apartados A01–A10, porcentajes ni conclusiones competitivas** por el mero cambio de rutas. El ZIP maestro completo se entrega porque Miguel lo solicitó explícitamente; para futuras actualizaciones de un deck se mantiene el ZIP individual. Los prompts modificados específicamente por esta migración son el orquestador y los apartados **03, 05, 06, 09, 10, 32**; los demás se conservan byte por byte, particularmente el **36**.

## Método de avance individual por deck — vigente

**Unidad mínima de trabajo: un deck + un apartado A01–A10.** Cada uno de los **13 archivos `01_INFORMACION_PARA_IMPORTAR/decks/DECK_*/DECK_*_CONTENIDO_CURADO.md` contiene su propio control de los diez apartados**, con estado, cobertura real y pendiente concreto. Primero se elige el deck (ID real para los 11 anteriores; referencia documental `NUEVO_12` o `NUEVO_13` para las altas), después **un apartado**; se actualiza solo ese deck y al final se refleja el cambio en este resumen. Un avance acreditado en Kashtira **no aumenta** los numeradores de DoomZ ni de otro deck. Se pueden consultar efectos compartidos para ahorrar trabajo, pero cada aplicación necesita evidencia causal dentro de su propia lista.

**Cómo se mide:** `cobertura documentada` (existencia de ficha/fila/caso) y `cierre acreditado` (revisión con texto, requisitos y resultado demostrados) son dos medidas distintas. Registrar `fecha | deck_ref | Axx | ID de carta/ruta | acreditado/objetivo | evidencia | pendiente/siguiente acción`; cuando falte un numerador reconciliado, indicar `—`, **no inventar 0 % o 100 %**. La existencia de diez filas solo acredita que hay diez entradas de control. Cada deck tiene su propio siguiente apartado y puede cerrarse sin esperar que los otros doce lo terminen. Para la integración en Station X, los estados editoriales siguen siendo privados y nunca se importan como contenido para jugadores.

**Límite absoluto:** se lleva progreso solamente de **A01–A10 por deck**. Los módulos 11–36 son prompts/instrucciones preservados, **sin ejecución, porcentaje ni control de progreso por deck**. La tabla de conciliación editorial de los 36 prompts ubicada más adelante controla únicamente compatibilidad e integridad del texto, no avance de estudio. No abrir tareas nuevas para A11–A36, no añadir archivos ni tablas de seguimiento paralelas. Ver el apartado 12 del orquestador.

## Alta de dos nuevos decks — 16 de noviembre de 2026

**Alcance actualizado: 13 decks.** Los cuadros heredados que declaran expresamente **11 decks / 370 identidades / 646 copias** siguen siendo el **corte histórico de los 11 decks previamente analizados**. No reinterpretarlos como medición actual de los 13, ni alterar los once inventarios anteriores. El archivo conserva su nombre histórico `_11_DECKS.md` para no romper referencias; sigue siendo **el único seguimiento vigente**.

| Alta documental | `deck_id` de Station X | Main | Extra | Side | Reserva | Total copias | Identidades distintas | Fuente |
|---|---|---:|---:|---:|---:|---:|---:|---|
| Mementotlán / Demoniherrero — deck 12 | **PENDIENTE** | 41 | 15 | 14 | 0 | **70** | **39** | Lista textual de Miguel (16-11-2026) |
| Cristron / Horus — deck 13 | **PENDIENTE** | 40 | 15 | 15 | 0 | **70** | **39** | Lista textual de Miguel (16-11-2026) |
| **Total anterior + dos altas** | **11 IDs reales + 2 pendientes** | **493** | **155** | **53** | **85** | **786** | **448** | **13 documentos de deck** |

Las **78 identidades nuevas** se han enumerado una vez por deck en las dos nuevas matrices `APARTADO_06`; cada fila conserva cantidades separadas por zona. `Fuwalos Multivadora`: 1 Main + 2 Side en Mementotlán; `Purulia Multivadora`: 2 Main + 1 Side en Cristron/Horus. **A03 recibido y cotejado por suma** en ambos decks. **Actualización individual 16-11-2026:** Mementotlán contiene **39/39 CIDs**, **39/39 funciones**, **40 relaciones causales**, **30 controles reglamentarios**, **34 decisiones A08**, **12 rutas C01–C12** (9 familias y 3 variantes), **14 manos H01–H14 de 3–4 cartas**, **5 planes Side**, **12 respuestas adversarias**, **6 recuperaciones B01–B06**, **4 accesos Extra EX-M01–EX-M04** y **12 guías G01–G12**, todos con estado documental y **0 replays acreditados**. **12 de 13 identidades Extra tienen ruta explicada**; la decimotercera (César) tiene materiales posibles pero figura **Prohibida TCG** en la ficha oficial consultada. **No es 100 % visual:** faltan 26 fotos auténticas y validaciones de simulador. Cristron/Horus conserva íntegramente su evaluación anterior pendiente. El formato **TCG** sigue provisional y **solo se hizo una comprobación puntual de la carta César**, no auditoría general de banlist. **No se alteró ningún prompt modular ni los otros 12 decks.**

### Progreso verificable de las dos altas A01–A10

| Nuevo deck | A01 rol | A02 planes | A03 inventario | A04 CID/fotos | A05 efecto/uso por identidad | A06 matriz y sinergia | A07 legalidad | A08 estrategias | A09 combos/manos | A10 guías |
|---|---|---|---|---|---|---|---|---|---|---|
| Mementotlán / Demoniherrero | **9 familias/12 rutas**, parcial avanzado | **12 rutas, 5 cálculos** de apertura, parcial avanzado | **70/70** copias, **39/39** identidades, a aprobar | **39/39 CIDs**; **13/39 fotos** | **39/39** roles, 5 grupos y 6 riesgos; parcial avanzado | **39/39** filas; **40 relaciones**, 3 motores; **12/13 Extra con ruta**, 1 Prohibida TCG | **30 controles**, **12 cortes** y **6 desvíos**, parcial avanzado | **34 decisiones + 5 planes Side** exactos, parcial avanzado | **12 rutas C01–C12**, **14 manos H01–H14**, **3 continuaciones y 4 accesos Extra**, **0 replays** | **12 guías G01–G12** + 4 paneles Extra, 26 fotos faltantes, no publicable |
| Cristron / Horus | Perfil preliminar; no validado | Pendiente | **70/70 copias y 39/39 identidades enumeradas** | **0/39** cotejos oficiales nuevos | **0/39** fichas con dictamen oficial | **39/39** filas existentes; **0/39** relaciones demostradas | Pendiente | Pendiente | **0** rutas/manos nuevas acreditadas | Pendiente |

**IDs pendientes vigentes (sin crear tareas IA adicionales):** para `NUEVO_12` conciliar formato/ID, conseguir **26 fotos**, contrastar **C01–C12 y H01–H14** en simulador y bajo interrupciones adversarias, comprobar en partidas los **12 accesos documentados del Extra** y respetar el bloqueo de César en TCG oficial, y producir guías visuales finales; A01–A10 poseen **avance individual documentado**, sin cierre global acreditado. Para `NUEVO_13` se conservan pendientes la conciliación de formato/ID, **39 CIDs**, 39 funciones, relaciones y accesos Extra, reglas, Side, rutas y guías. Todo permanece dentro de las **33 categorías de tarea existentes**; no se suma a las **370 fichas históricas** ni a los 108 ejercicios anteriores hasta tener evidencia. La ausencia de una ruta no implica sinergia cero.

## Registro de protección obligatoria de prompts — 16 de noviembre de 2026

**Regla permanente de Miguel:** no borrar, excluir, fusionar, sustituir, vaciar ni renombrar ningún prompt, incluso durante depuración del ZIP. Este es el único registro de integridad; **no crear manifiestos auxiliares**. Toda entrega debe conservar como mínimo **36/36 apartados y 3/3 documentos base**, y cualquier prompt futuro también pasa a estar protegido. Antes de editar, verificar estos nombres y huellas; después, volver a comprobar los SHA-256 de los archivos **no autorizados para edición**. Solo se cambia una huella aquí si se modificó deliberadamente su archivo y se notificó a Miguel. Si falta uno o se modifica sin autorización, detener la entrega y recuperar el original intacto. La integridad de prompts **no cuenta** como validación de las cartas ni progreso A01–A10.

**Historial de cambios protegidos:** la regla de integridad se introdujo inicialmente en el orquestador y los apartados **30, 32 y 36**. En esta edición posterior Miguel ordenó adecuar los enlaces de los apartados **01–35** a `01_INFORMACION_PARA_IMPORTAR/decks/`, retirar dependencias históricas y aceptar el apartado 10 en su estado actual. **El apartado 36 se mantuvo intacto byte por byte**, al igual que los otros documentos base no anunciados. Las huellas de la tabla describen el contenido vigente **después** de estas correcciones, no versiones anteriores.

**Actualización autorizada 16-11-2026 — trazabilidad carta/jugada/combo:** se ajustaron únicamente los apartados **05, 06, 08, 09 y 23** y el orquestador para exigir la matriz canónica por carta dentro del A06 de cada deck. Se integró el requisito en las tareas existentes A05-03, A06-04, A08-04 y A09-04; **no** se añadieron tareas, archivos de seguimiento ni cambios de inventario. El apartado **10 permanece conforme y sin cambios**; el **36 permanece literalmente intacto**. Las seis huellas de los prompts modificados se actualizaron a continuación; todos los demás valores deben permanecer idénticos.

**Actualización posterior de rutas por carpetas individuales — 16-11-2026:** se editaron el **orquestador y los apartados 03, 05, 06, 09, 10 y 32** exclusivamente para la migración de referencias, políticas de importación y entrega por deck. El apartado 10 cambió **ahora** solo en indicaciones de rutas; su contenido táctico y alcance no fueron suprimidos. El 36 y los otros **32 prompts** conservan exactamente su contenido original. Las huellas de los siete archivos modificados se renovaron en la tabla siguiente.

| Archivo protegido (ruta relativa desde la raíz del ZIP) | SHA-256 de referencia |
|---|---|
| `02_PROMPT_PARA_CODEX/apartados/01_ROL_Y_OBJETIVO_PRINCIPAL.md` | `1d1382980a556d56e1092c5d095f583a33064b3cdad84ff45d064a0c37108665` |
| `02_PROMPT_PARA_CODEX/apartados/02_RECEPCION_DE_UN_DECK.md` | `85c041a110a7da202a39824e6483b3da60ee119eeeef58a1ce51ccf1205554ad` |
| `02_PROMPT_PARA_CODEX/apartados/03_VALIDACION_DEL_INVENTARIO_SIN_REVISION_GENERAL_DE_BANLIST.md` | `538238903057a51568ed6c19b909df1575d49b14d8cfb37bb60087a69a68885b` |
| `02_PROMPT_PARA_CODEX/apartados/04_FUENTES_Y_ZONAS_DE_CARTAS.md` | `24c984c8de61a0e398fbd1bede96c12a8dd785e4942f8f082801207dbb4c9abb` |
| `02_PROMPT_PARA_CODEX/apartados/05_ANALISIS_INDIVIDUAL_DE_TODAS_LAS_CARTAS.md` | `3084d4b92cda820bff50024f708e853e598ea2bce8dd2eeef031f8cc074c18c4` |
| `02_PROMPT_PARA_CODEX/apartados/06_SINERGIAS_Y_MOTORES.md` | `0e53340243eb2450d2c609aaf05b78ed4ab3938e3c2b7e7f305a310c83fedb31` |
| `02_PROMPT_PARA_CODEX/apartados/07_MECANICAS_Y_REGLAS_POR_FORMATO.md` | `46f57693df46e098f7552c2d05615b59493c4dd545cc268c492f8b8adc238f12` |
| `02_PROMPT_PARA_CODEX/apartados/08_EXPLORACION_Y_CLASIFICACION_EXHAUSTIVA_DE_JUGADAS.md` | `85f94deb0d4a5037c85efbc92974d56bfe84d2401c12156bb73c9031c9a659ad` |
| `02_PROMPT_PARA_CODEX/apartados/09_FICHA_UNICA_OBLIGATORIA_DE_CADA_COMBO_COMPLETO.md` | `2bd6400a2bf931605f53bf2872d90c781ba6a18d2d69123013df36f01a7fbf76` |
| `02_PROMPT_PARA_CODEX/apartados/10_GENERACION_DE_GUIAS_VISUALES_DE_COMBOS_Y_ESTRATEGIAS_YU_GI_OH.md` | `0774c339ffbe14941a7b3069c3e472c66ec94b85797575bb7f2f79ee39830865` |
| `02_PROMPT_PARA_CODEX/apartados/11_CADENAS_Y_RESOLUCION_DE_EFECTOS.md` | `5b95a0f07b7936de2720a989d7da0450b1aa0cae53fff3c9384cfe33c8d732b8` |
| `02_PROMPT_PARA_CODEX/apartados/12_RESPUESTAS_DEL_ADVERSARIO.md` | `836dee08755b6b6700f7549af25d6fe424d3ee9c0d90fdfe910045aa200ef99f` |
| `02_PROMPT_PARA_CODEX/apartados/13_RECUPERACION_VARIANTES_Y_RAMAS_SIN_SALIDA.md` | `b2d953c25accf1313c3bc0f6c7810feeb860a895b0052575743f20cec9bce07c` |
| `02_PROMPT_PARA_CODEX/apartados/14_PLAN_PARA_IR_PRIMERO.md` | `b9a70d7a9e5a54894f9f94ca27a1c4d238987402cf83b6692fd7f421bcaeee84` |
| `02_PROMPT_PARA_CODEX/apartados/15_PLAN_PARA_IR_SEGUNDO.md` | `25664d69a332367afb5babfd792e1c894f83878de82dc1da55165154b7175bd4` |
| `02_PROMPT_PARA_CODEX/apartados/16_ESTRATEGIAS_FRENTE_A_SITUACIONES_ADVERSAS.md` | `8aded1cec3d0153e371d1e2597373251ec4329f4c93936d70108e867428fd102` |
| `02_PROMPT_PARA_CODEX/apartados/17_FORTALEZAS.md` | `3b465f2d03c6324e1265c62afbdb68823ddf1ac2753a88520a5c0ce0567e9559` |
| `02_PROMPT_PARA_CODEX/apartados/18_DEBILIDADES.md` | `7a7832bed82c8aa8073627a1140fc5b08a3c2ffdb0ed429d8bc07216e9758b20` |
| `02_PROMPT_PARA_CODEX/apartados/19_BRICKS_Y_MANOS_DIFICILES.md` | `06c397635a93ab4673b5ce17ebc96c9ce157fbd9d7176d470ffde237981c098a` |
| `02_PROMPT_PARA_CODEX/apartados/20_GESTION_DE_RECURSOS_Y_JUEGO_MEDIO_TARDIO.md` | `c969747860c4a86e43f6ea9177e0d19c7f1504b0239b41ae888c0ff4da491d2d` |
| `02_PROMPT_PARA_CODEX/apartados/21_CONDICIONES_DE_VICTORIA.md` | `1d3648d7cb0579252ea87ee76c9b5f09600fc23d782646248f498db24ef7e870` |
| `02_PROMPT_PARA_CODEX/apartados/22_CANTIDADES_CAMBIOS_Y_ALTERNATIVAS.md` | `db8bc38bfa72245e052616dd92566054d7b8b91b7434d9b8eba6a004a562487c` |
| `02_PROMPT_PARA_CODEX/apartados/23_SIDE_DECK_Y_RESERVA.md` | `c42cea53367cc2b7f463a94886c4e8e1542d3e21fcde6f50b13fada8c80a65b7` |
| `02_PROMPT_PARA_CODEX/apartados/24_MATCHUPS_CONTRA_DECKS_REGISTRADOS.md` | `95d758b0d4cdb88509f0c5cce896360e036401ff8d21f0ffcd1ef4e96d9f64b9` |
| `02_PROMPT_PARA_CODEX/apartados/25_CALIFICACION_GLOBAL_DEL_DECK_1_10.md` | `7ce7be9f65255dc557f2ea14d71e816dd62bd35d09d1dea0bd02165db4b5e707` |
| `02_PROMPT_PARA_CODEX/apartados/26_PROMEDIO_Y_CLASIFICACION_TECNICA.md` | `336f564409a067eb32f568c4de163facb068f7e723e80ea697c2a7357f695aea` |
| `02_PROMPT_PARA_CODEX/apartados/27_PROBABILIDADES_Y_CONSISTENCIA.md` | `d1fb95ad9a01f56829d4be5de55a5553151cb5fe5c20d21de733f5e9a0c4f5f0` |
| `02_PROMPT_PARA_CODEX/apartados/28_DIEZ_ESCENARIOS_DE_MANO_PARA_ENTRENAMIENTO.md` | `575fda765d630dedec1a7e93efcaa2f437e91be7df48c4057a957bb465661dc1` |
| `02_PROMPT_PARA_CODEX/apartados/29_ERRORES_FRECUENTES.md` | `582eb9e8a3a37158ce5d8e60035603bba6a7c970c04440b663bcb997b4704aaf` |
| `02_PROMPT_PARA_CODEX/apartados/30_COMPROBACION_INTERNA_Y_BITACORA_UNICA.md` | `4e4697996b162a33b322347555726497c9f095badca1ded42d7f21958697e82d` |
| `02_PROMPT_PARA_CODEX/apartados/31_ESTADOS_UNICOS_Y_PORCENTAJES_HONESTOS.md` | `eec9114a9ffeb8bfc229e516f8a2efc77dc5d840f00640bfa4a3c3d0d810e455` |
| `02_PROMPT_PARA_CODEX/apartados/32_CONTROL_DE_VERSIONES_Y_REANUDACION.md` | `6236d9f73da23fb37031667a9e38a563e818b851b639146ae6341927d906a549` |
| `02_PROMPT_PARA_CODEX/apartados/33_RESUMEN_FINAL_POR_DECK.md` | `f44f9b0b42bfa387400243018804ee030d41c30af23339cbbac378c8d3ccfe5c` |
| `02_PROMPT_PARA_CODEX/apartados/34_CATALOGO_DE_DECKS.md` | `b622576b1f22c7ce99a5278d59c2d4ac13c90461ce910c537b79ac44a5ce7930` |
| `02_PROMPT_PARA_CODEX/apartados/35_ESTADISTICAS_DEL_CATALOGO.md` | `9d8d969af51e332978f71a429407f7161b8fbd3286f502a2ca881a905dc00cbc` |
| `02_PROMPT_PARA_CODEX/apartados/36_CONFIRMACION_FINAL_Y_CONTINUIDAD.md` | `758e2d9a98df75ec2d9b7e7ec0c31d877dd48e1e36eb676c9f7de33d83c2de72` |
| `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` | `99d405a26db258a12ea0c6041de1f07c8a06508288b36464a96068c4657db599` |
| `02_PROMPT_PARA_CODEX/01_ANEXO_PROPOSITO_TACTICO_EDITOR_V31.md` | `3b552fbfaf7cc9d0f9892c790afd055a4a43c8a77fb71d7de900f667ea0466e1` |
| `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` | `bd56599d7c82fe3f1f5ce89c592ddd94261b7512858bb4fffff968934f3fb14e` |

## Conciliación de los 36 prompts modulares — 16 de noviembre de 2026

**Resultado de recuperación: 36/36 archivos de instrucciones incorporados** en `02_PROMPT_PARA_CODEX/apartados/`. Se preservan las secciones 01–36 con su contenido específico; los archivos originalmente recibidos con sufijo `(1)` de 02, 28 y 32 se normalizaron a su nombre canónico sin alterar su tema. **36/36 es integridad documental de prompts, no cumplimiento del análisis de los once decks, ni validación lógica/física, ni implementación en Station X.** La auditoría editorial siguiente revisa compatibilidad con V31, no verifica de nuevo 370 efectos ni ejecuta rutas.

| Apartado | Compatibilidad con V31 | Discrepancia o criterio de aplicación |
|---|---|---|
| **01** Rol y objetivo | CONFORME | Definir propósito y condiciones de victoria con inventario real; se vincula a A01/A02. |
| **02** Recepción | CONFORME EN RUTAS | Actualizadas todas sus rutas a `01_INFORMACION_PARA_IMPORTAR/decks/`; se mantiene la identidad por ID real. |
| **03** Inventario | CONFORME CON SALVEDAD | Sin revisión general de banlist; la comprobación puntual de propuestas de A22 es una excepción delimitada. |
| **04** Fuentes y zonas | CONFORME | CID, procedencia y zona comprobables antes de atribuir efectos o combinaciones. |
| **05** Análisis individual | CONFORME COMO PROMPT | Se aplica la política de importación del orquestador vigente, sin matriz externa. |
| **06** Sinergias y motores | ACLARADO EN SU PROMPT | Clasificar relación, función y evidencia como ejes separados; cero sinergia solo demostrado, no por falta de ruta. |
| **07** Mecánicas por formato | CONFORME COMO PROMPT | Reglas TCG/GOAT/Rush y Skills en fuentes actuales, sin referencia compartida obsoleta. |
| **08** Exploración de jugadas | CONFORME COMO PROMPT | Distingue interacción, starter, extensión y combo; sus referencias están ahora en A09/A10. |
| **09** Ficha única de combo | CONFORME COMO PROMPT | Sus 78 rutas históricas son un corte documental distinto de 108 ejercicios actuales; no existe dependencia de base externa. |
| **10** Guías visuales | CONFORME ACTUAL POR DECISIÓN DE MIGUEL | **No existe discrepancia editorial A10**. Se acepta el material vigente, sin exigir visor, scripts, atlas ni base históricos. |
| **11** Cadenas y efectos | CONFORME COMO PROMPT | Costes, ventanas y resolución se contrastan con las fichas A09/A10 vigentes. |
| **12** Respuesta del adversario | CONFORME COMO PROMPT | Cada interrupción se vincula a su paso canónico A09, sin base externa. |
| **13** Recuperación y ramas | CONFORME COMO PROMPT | Continuaciones basadas en estado residual real de A09/A10, sin base externa. |
| **14** Ir primero | CONFORME COMO PROMPT | Citar fichas A09 y visualización A10 disponibles sin dependencia antigua. |
| **15** Ir segundo | CONFORME COMO PROMPT | Romper campo con rutas A09/A10 y condiciones rivales reales. |
| **16** Situaciones adversas | CONFORME COMO PROMPT | Decisiones por IDs y rutas A09/A10 existentes; no convertir consejos en combos. |
| **17** Fortalezas | CONFORME | Ventajas demostrables, dependencias y alcance, no clichés ni tasas inventadas. |
| **18** Debilidades | CONFORME | Riesgos y cartas concretas, sin declarar brick o inutilidad sin escenario. |
| **19** Bricks y manos difíciles | CONFORME COMO PROMPT | Enlazar recuperación real A09/A10 o declarar falta de salida. |
| **20** Recursos y medio/tardío | CONFORME | Gastos y recuperación efectivos, sin reutilizar materiales ya consumidos. |
| **21** Condiciones de victoria | CONFORME COMO PROMPT | Sustentar daño/letal en A09/A10, sin base externa. |
| **22** Cantidades y alternativas | EXCEPCIÓN DELIMITADA | Solo sugerir cambios; si hay propuesta, revisar banlist específica y fechada, sin modificar inventario. |
| **23** Side y Reserva | CONFORME COMO PROMPT | Variante condicional ligada a A09/A10; Side solo si realmente ingresó al deck. |
| **24** Matchups | CONFORME COMO PROMPT | Rivales registrados y guías A09/A10, sin partidas simuladas. |
| **25** Calificación 1–10 | CONFORME | Juicio editorial razonado, separado de probabilidad de victoria y avance de validación. |
| **26** Clasificación técnica | CONFORME | Promedio de criterios declarados y categoría orientativa, no ranking competitivo demostrado. |
| **27** Probabilidad y consistencia | CONFORME | Cálculo teórico con inventario y muestras explícitas, nunca tasa de victoria física. |
| **28** Diez manos | CONFORME CON CONDICIÓN | Solo manos posibles; Side únicamente si ingresó realmente; 110 manos V31 se auditan sin extrapolar. |
| **29** Errores frecuentes | CONFORME | Casos identificables y solución de regla, no recomendaciones sin estado. |
| **30** Bitácora única | CONTRADICCIÓN RESUELTA | Su texto antiguo excluía cualquier seguimiento en ZIP; se ajustó al **único registro privado aquí existente**, sin UI de progreso. |
| **31** Estados y porcentajes | CONFORME | Tres dimensiones internas separadas: documentación, guía visual y reglas; sin importar porcentajes a la plataforma. |
| **32** Versiones y continuidad | CONFORME | Actualización incremental del mismo deck y del mismo registro; ningún ZIP general por cada ajuste. |
| **33** Resumen por deck | CONFORME | Resumir evidencia y faltantes desde fuentes vigentes, sin otro archivo de progreso. |
| **34** Catálogo | ALCANCE HISTÓRICO | Sus 67 identidades son un censo antiguo; el ZIP actual contiene 13 decks, aunque ese censo no se recalculó para las dos altas. |
| **35** Estadísticas catálogo | ALCANCE HISTÓRICO | No atribuir métricas del catálogo histórico a los 11 decks estudiados o al catálogo vivo. |
| **36** Cierre y continuidad | ADAPTADO CON PENDIENTE | Un maestro, documentos operativos por deck existentes y este único registro; confirmar si faltan secciones `APARTADO_NN` en cada deck antes de afirmar ejecución completa. |

**Decisión definitiva sobre referencias retiradas (Miguel, 16-11-2026):** las tres dependencias compartidas históricas **dejan de existir como requisitos y como tareas pendientes**. No recuperarlas, reconstruirlas, agregarlas ni bloquear los análisis por ellas. Las instrucciones de los apartados 01–35 utilizan las fuentes vigentes y rutas correctas. El apartado 36 se dejó **tal cual** por orden expresa y su antigua notación de ruta se interpreta conforme al orquestador; tampoco impone recuperar dependencias antiguas. Las guías visuales del **apartado 10 quedan editorialmente conformes con lo actualmente disponible**, sin discrepancia ni exigencia de componentes históricos. Esta decisión no acredita automáticamente reglas, combos ni resultados físicos no evaluados.

**Continuidad:** quedan vigentes las **33 categorías de tarea de IA** A01–A10 detalladas abajo, aplicadas de forma **independiente al deck que se seleccione**. Sus denominadores originales corresponden a los once decks previos salvo indicación expresa; el trabajo de las dos altas se acredita en las mismas categorías **pero solo en sus fichas locales**, hasta conciliación de cantidades del conjunto de trece. No sumar partidas ni ensayos manuales a los denominadores. La compatibilidad editorial de los 36 módulos no altera por sí misma el número de cartas, casos ni el estado de sus tareas. Las instrucciones de UI A06 mantienen su propio estado de implementación por comprobar; **A10 se acepta editorialmente como está**, sin certificar rutas. Los módulos del ZIP son especificaciones, no pruebas de despliegue ni certificaciones de partida.

## Tablero operativo vigente

| Bloque | Estado | Evidencia y siguiente acción |
|---|---|---|
| A01–A04 | **PENDIENTE DE AUDITORÍA INTEGRAL** | Inventarios y procedencia conservados; comprobar trazabilidad sin modificarlos |
| A05–A06 | **EN REVISIÓN DOCUMENTAL** | 370 fichas; 201 relaciones condicionales y 16 accesos Extra requieren profundización |
| A07 — 15 conflictos concretos | **VALIDADO LÓGICO CONDICIONAL** | 15/15 rutas cotejadas en V28; faltan otros escenarios y, separadamente, mesa física |
| A08 | **PENDIENTE DE AMPLIACIÓN** | 77 decisiones documentadas sin prueba de partida física |
| A09–A10 | **PENDIENTE DE PROFUNDIZACIÓN** | 108 ejercicios y 110 manos requieren revisión causal, visual y situacional |
| Limpieza de ZIP | **COMPLETADO** | Tres carpetas; 11 decks y sus 312 imágenes del corte previo preservados, además de las dos altas; 13 subcarpetas individuales, sin informes temporales duplicados |
| Prompt de propósito/UX | **COMPLETADO COMO INSTRUCCIÓN** | Once apartados del anexo integrados; **implementación en Station X no realizada** |
| Política de archivos y seguimiento | **COMPLETADO COMO INSTRUCCIÓN** | Prompt principal exige aviso previo, depuración al cerrar y este archivo como única fuente de pendientes |
| Matriz única carta → sinergia → jugada → combo | **COMPLETADO COMO INSTRUCCIÓN; ANÁLISIS POR DECK PENDIENTE** | A05/A06/A08/A09/A23 y orquestador exigen trazabilidad bidireccional del 100 % de Main/Extra/Side/Reserva en `APARTADO_06` de cada deck; ejecutar en tareas A05-03/A06-04/A08-04/A09-04 ya existentes, sin archivos ni tareas nuevas |

## Integridad y límites de validación

- Se conservan íntegramente los **11 decks**, **370 fichas** y **312 imágenes** del corte previo; el ZIP actual incluye también **Mementotlán** y **Cristron/Horus**, para **13 decks**.
- **15/15** rutas Extra conflictivas tienen cotejo lógico condicional, **16 accesos** Extra siguen sin acreditar.
- Ninguna partida física se considera ejecutada por la IA. Una conclusión lógica no es una victoria ni una simulación.
- No se cambian Main, Extra, Side, Reserva, Skills, cantidades o listas de cartas.
- Cualquier revisión nueva debe indicar **ID de caso o carta, fecha, estado, evidencia, resultado y siguiente acción** aquí, sin crear archivos de progreso independientes.
- **Regla de trazabilidad incorporada el 16-11-2026 y primera ejecución documental realizada:** una sola matriz de cartas en `APARTADO_06` de cada `DECK_*.md`, relacionada por IDs documentales con A05, A08 y A09; las filas Side/Reserva conservan su condición A23. Se crearon **11 matrices con 370 filas**, cotejando las identidades y copias A05 contra el inventario confirmado. Los vínculos A08 y las fotografías A09 siguen como **candidatos por contrastar**, no participación causal ni legalidad certificada. Se continuará dentro de las 33 tareas de IA vigentes, no como 11 tareas adicionales.
- Al cerrar un pendiente, marcarlo `COMPLETADO`, `VALIDADO_LOGICO` o `PENDIENTE_MESA`, retirarlo del backlog activo e incorporar su cierre en este mismo archivo. Solo eliminar evidencias temporales ya consolidadas, nunca fuentes únicas.

**Corte de inventario analítico:** 15 de noviembre de 2026, después de V28. **Plan de tareas A01–A10 actualizado:** 16 de noviembre de 2026. **Alcance:** análisis documental y lógico para Yu-Gi-Oh! físico. Las pruebas de mesa del usuario están expresamente **fuera de la lista de tareas, los denominadores y todos los porcentajes de este seguimiento**. No cambiar inventarios, copias, Main/Extra/Side/Reserva ni Skills; no revisar banlists. No mezclar porcentaje editorial con probabilidad de ganar.

## Estado medido por deck

### Ejecución documental de los 10 apartados sobre los 11 decks — 16-11-2026

**Corrección de lectura del inventario — 16-11-2026:** los números 42/42, 38/38, etc., en las columnas A03–A07 indican **identidades de cartas diferentes examinadas**, no el total de copias físicas del deck. Una carta con tres copias cuenta como **una identidad y tres copias**. Para impedir confundir cobertura documental con número de cartas, el inventario completo y su distribución se presentan por separado:

| Deck | Main (copias) | Extra (copias) | Side (copias) | Reserva (copias) | **Total de copias** | **Identidades diferentes** |
|---|---:|---:|---:|---:|---:|---:|
| Elfnote | 40 | 15 | 15 | 0 | **70** | **42** |
| DoomZ | 40 | 15 | 9 | 0 | **64** | **37** |
| Tearlaments | 44 | 15 | 0 | 16 | **75** | **50** |
| Kashtira Pure | 42 | 15 | 0 | 19 | **76** | **38** |
| Infernoble | 42 | 15 | 0 | 12 | **69** | **45** |
| Cyber Dragon Pure | 42 | 15 | 0 | 24 | **81** | **52** |
| Volcanic | 42 | 15 | 0 | 14 | **71** | **36** |
| Pyro Rush | 30 | 5 | 0 | 0 | **35** | **17** |
| Royal Rebel Rush | 30 | 0 | 0 | 0 | **30** | **16** |
| HERO Rush | 30 | 8 | 0 | 0 | **38** | **17** |
| Dark Magician Rush | 30 | 7 | 0 | 0 | **37** | **20** |
| **Total** | **412** | **125** | **24** | **85** | **646** | **370** |

**La Reserva no es Side activo.** Estos números provienen de `INVENTARIOS_CONFIRMADOS.txt` y el conjunto de identidades A05; no se agregó, trasladó ni eliminó ninguna copia. Las 370 identidades se cuentan **dentro de cada deck**, por lo que la misma carta presente en dos decks aparece en ambos análisis; el total de 370 no equivale a 370 nombres globalmente distintos.

La siguiente tabla refleja **evidencia presente y cotejada automáticamente**, no el porcentaje de terminación de un apartado: **D** = perfil documentado sin cierre táctico; **C** = identidad y cantidades cotejadas estructuralmente; **n/n** = **identidades distintas del deck** con registros/archivos presentes, **no copias físicas** ni texto/efecto validado; **A08** = decisiones documentadas; **A09** = `e` ejercicios y `m` manos documentados (conteos de elementos distintos, no fracción ni porcentaje); **E** = guía existente y editorialmente conforme según decisión de Miguel, aún sin verificación causal completa. Todo apartado conserva estado general `PARCIAL` hasta completar sus tareas de IA.

| Deck | A01 | A02 | A03 identidades | A04 CID de identidades | A05 fichas de identidades | A06 matriz por identidad | A07 contratos por identidad | A08 decisiones | A09 ejercicios/manos | A10 |
|---|:---:|:---:|---:|---:|---:|---:|---:|---:|---:|:---:|
| Elfnote | D | C | 42/42 | 42/42 | 42/42 | 42/42 | 42/42 | 7 | 9e · 10m | E |
| DoomZ | D | C | 37/37 | 37/37 | 37/37 | 37/37 | 37/37 | 7 | 8e · 10m | E |
| Tearlaments | D | C | 50/50 | 50/50 | 50/50 | 50/50 | 50/50 | 7 | 12e · 10m | E |
| Kashtira Pure | D | C | 38/38 | 38/38 | 38/38 | 38/38 | 38/38 | 7 | 15e · 10m | E |
| Infernoble | D | C | 45/45 | 45/45 | 45/45 | 45/45 | 45/45 | 7 | 10e · 10m | E |
| Cyber Dragon Pure | D | C | 52/52 | 52/52 | 52/52 | 52/52 | 52/52 | 7 | 16e · 10m | E |
| Volcanic | D | C | 36/36 | 36/36 | 36/36 | 36/36 | 36/36 | 7 | 19e · 10m | E |
| Pyro Rush | D | C | 17/17 | 17/17 | 17/17 | 17/17 | 17/17 | 7 | 2e · 10m | E |
| Royal Rebel Rush | D | C | 16/16 | 16/16 | 16/16 | 16/16 | 16/16 | 7 | 4e · 10m | E |
| HERO Rush | D | C | 17/17 | 17/17 | 17/17 | 17/17 | 17/17 | 7 | 6e · 10m | E |
| Dark Magician Rush | D | C | 20/20 | 20/20 | 20/20 | 20/20 | 20/20 | 7 | 7e · 10m | E |
| **Total** | **11 D** | **11 C** | **370/370** | **370/370** | **370/370** | **370/370** | **370/370** | **77** | **108e · 110m** | **11 E** |

**Comprobaciones adicionales:** las **312/312 imágenes físicas** del paquete se abrieron satisfactoriamente; 304 son imágenes CID únicas utilizadas en las 370 identidades y las demás son Skills/ejemplos. Las 77 decisiones A08 no contienen CID ajenos al inventario, y los 108 ejercicios tienen rutas a imágenes existentes y sin CIDs fotográficos ajenos a la lista correspondiente. El detalle de cada deck y sus 370 filas de trazabilidad están exclusivamente dentro de los once archivos `DECK_*.md`, sin informe paralelo.

**A04-03, reparación de referencias — 16-11-2026:** se localizaron **214 menciones del prefijo anterior** `01_INFORMACION_A_IMPORTAR/` en **11 archivos JSON existentes** (diez de escenarios/índice y el archivo de planes Side). Se comprobó individualmente que **214/214 destinos existen** al sustituirlo por `01_INFORMACION_PARA_IMPORTAR/`; se actualizaron únicamente las cadenas de ruta, sin alterar cartas, cantidades, condiciones, casos o estados. Los JSON siguen siendo sintácticamente válidos y no queda ese prefijo en los JSON inspeccionados. **No se cierra todavía A04-03**, porque pueden existir referencias antiguas de otra forma o en otros formatos no incluidos en esta pasada. No se crearon archivos.

**Límite de progreso:** la revisión encontró **0/108 ejercicios con indicador de replay en motor** y **0/108 con `card_text_checked_all=true`** en la fuente de ejercicios; por ello **no se acredita ninguna ruta nueva como validada reglamentariamente** en esta pasada. Permanecen las 201 relaciones condicionales y los 16 accesos Extra pendientes ya conocidos. La cobertura documental de filas o fotografías **no** permite calcular un porcentaje global honesto de ejecución de A01–A10; los numeradores de cierre de las 33 tareas quedan abiertos hasta revisión causal individual.

### Curaduría funcional A05/A06 — primera tanda, 16-11-2026

Se cotejó directamente el **texto oficial de Konami de 7 identidades CID** repetidas en **23 fichas deck×CID de 7 decks**. Se corrigieron en los dos JSON existentes de A05/A06 y en la matriz canónica A06 de cada deck afectado las interpretaciones heurísticas que atribuían efectos ajenos a las cartas. Cada deck afectado incorpora el dictamen funcional, requisito/coste, uso en el deck, fuente oficial y aviso de que los posibles combos A09 **no están acreditados**. No se generó un archivo de seguimiento adicional ni se cambió Main, Extra, Side, Reserva, Skill o cartas.

| Deck | Fichas A05 revisadas con fuente oficial en esta tanda | Identidades pendientes de esta misma comprobación (de las fichas totales) | Situación A06 |
|---|---:|---:|---|
| Elfnote | 2 | 40 | Función corregida; sin cierre de relaciones/combos |
| DoomZ | 3 | 34 | Función corregida; sin cierre de relaciones/combos |
| Tearlaments | 2 | 48 | Wraitsoth busca Kashtira existente; acceso a Shangri-Ira no acreditado |
| Kashtira Pure | 7 | 31 | Buscador Wraitsoth y respuestas autónomas distinguidos; A09 no acreditado |
| Infernoble | 3 | 42 | Función corregida; sin cierre de relaciones/combos |
| Cyber Dragon Pure | 3 | 49 | Función corregida; sin cierre de relaciones/combos |
| Volcanic | 3 | 33 | Función corregida; sin cierre de relaciones/combos |
| Pyro Rush | 0 | 17 | Sin cambios de curaduría en esta tanda |
| Royal Rebel Rush | 0 | 16 | Sin cambios de curaduría en esta tanda |
| HERO Rush | 0 | 17 | Sin cambios de curaduría en esta tanda |
| Dark Magician Rush | 0 | 20 | Sin cambios de curaduría en esta tanda |
| **Total** | **23/370 fichas** | **347 fichas** | **No se certificó ningún combo A09 nuevo** |

**Correcciones de raíz por CID:** `12950` Ash Blossom (no es extensor ni invoca del Deck); `9279` Droll (no recupera mano); `13631` Infinite Impermanence (columna solo con condiciones de colocación); `14740` Dimension Shifter (reemplaza envíos al Cementerio, no carga motor GY); `12668` Dimensional Barrier (no Invoca Especial); `18204` Wraitsoth (no Tributa para buscar ni hace daño por efecto); `15756` Pot of Prosperity (excava a coste del Extra; no es robo/recuperación). Fuente individual: `https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=<CID>&ope=2&request_locale=en`. **Esta intervención solo certifica función textual y su clasificación principal**, sin cerrar automáticamente A06-01 (201 relaciones), A06-02 (16 accesos Extra), A06-04 (matrices completas) ni A09 (108 ejercicios). Siguen vigentes las 33 tareas de IA existentes y ninguna tarea del usuario se contabiliza.

| Deck | Fichas | Engine documentado | Extra condicional validado | Relaciones condicionales aún sin verificar | Extra sin acceso acreditado |
|---|---:|---:|---:|---:|---:|
| Elfnote | 42 | 12 | 5 | **22** | **3** |
| DoomZ | 37 | 11 | 6 | **19** | **1** |
| Tearlaments | 50 | 15 | 4 | **28** | **3** |
| Kashtira Pure | 38 | 13 | 0 | **23** | **2** |
| Infernoble | 45 | 12 | 0 | **29** | **4** |
| Cyber Dragon Pure | 52 | 13 | 0 | **39** | 0 |
| Volcanic | 36 | 11 | 0 | **25** | 0 |
| Pyro Rush | 17 | 12 | 0 | **5** | 0 |
| Royal Rebel Rush | 16 | 13 | 0 | **3** | 0 |
| HERO Rush | 17 | 13 | 0 | **4** | 0 |
| Dark Magician Rush | 20 | 13 | 0 | **4** | **3** |
| **Total** | **370** | **138** | **15** | **201** | **16** |

Estas son **etiquetas documentales mutuamente excluyentes del mapa A06 V28**, no resultados competitivos. Una relación condicional no verificada puede tener una función autónoma legítima. Un Extra no acreditado no equivale automáticamente a cero sinergia.

## Regla de seguimiento: exactamente 33 tareas de IA, A01–A10

**Solo se registran aquí tareas realizables por IA con el contenido del paquete.** No crear una tarea por cada archivo técnico ni por cada variante ya cubierta por otra tarea. No contabilizar tareas, duelos, confirmaciones o ensayos de mesa realizados por personas. Un escenario que requiere información de mesa no disponible puede concluir documentalmente como `PENDIENTE_DE_ESTADO` con explicación fundada; no se debe inventar un resultado.

Para cada ID de abajo, **elegir primero un deck y después una tarea del apartado A01–A10**. Registrar inicialmente en su `DECK_*.md` y reflejar aquí **solo el cambio de ese deck**: `fecha | deck_ref | Axx/tarea | estado | avance acreditado/objetivo | identificadores cerrados | evidencia/fuente | resultado | siguiente acción`. Estados permitidos: `PENDIENTE`, `EN_CURSO`, `BLOQUEADO`, `VALIDADO_LOGICO`, `COMPLETADO`. En los cuadros iniciales, `—/N` quiere decir **cierre aún no recalculado**, no 0% de trabajo. El porcentaje se calcula solo después de revisar los casos, acreditar el numerador y resolver los denominadores; no declarar un apartado al 100% mientras alguna de sus tareas siga abierta. **Las 33 tareas son tipos de comprobación, no una orden para procesar los trece decks simultáneamente.** Los objetivos cuantificados que todavía expresan 11 decks, 370 fichas o un corpus de 108 rutas/110 manos delimitan el **corte inicial de once decks**; para cada alta nueva usar su tabla A01–A10 local y no sumarla artificialmente a un denominador antiguo. No registrar progreso de A11–A36.

### A01 — Rol, propósito y victoria (2 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A01-01 | Auditar en cada deck plan central, estilo y condición principal/secundaria de victoria contra su inventario real | 11 decks | —/11 · PENDIENTE | Perfil específico, cartas que ejecutan el plan y contradicciones corregidas |
| A01-02 | Validar por deck la cadena trazable `carta → rol → ruta → resultado → fuente → estado` con ejemplos existentes | 11 decks | —/11 · PENDIENTE | Ninguna relación sin fuente o resultado distinguible de una hipótesis |

### A02 — Identidad y planes de juego (3 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A02-01 | Revisar perfil por deck: ofensivo/defensivo/mixto, fortalezas, debilidades y condición de cambio de plan | 11 decks | —/11 · PENDIENTE | Ficha de estilo concreta, sin afirmaciones genéricas |
| A02-02 | Documentar y contrastar un plan legal de ir primero y otro de ir segundo por deck | 22 planes | —/22 · PENDIENTE | Apertura, recursos, objetivo, riesgo y alternativa por plan |
| A02-03 | Documentar recuperación y gestión de recursos a medio/largo plazo por deck | 11 decks | —/11 · PENDIENTE | Situación inicial, decisión, coste y forma plausible de continuar |

### A03 — Inventario y compatibilidad (3 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A03-01 | Contrastar Main/Extra/Side/Reserva, cantidades, nombres y formato en los 11 inventarios contra sus fichas | 11 decks | —/11 · PENDIENTE | Inventario idéntico al confirmado, inconsistencias referenciadas sin cambiar copias |
| A03-02 | Auditar que las 108 rutas de ejercicios no exijan cartas ausentes o copias imposibles | 108 rutas | —/108 · PENDIENTE | Listado de CID/cartas usadas por ruta y sus existencias en el deck |
| A03-03 | Cotejar que las cuatro Skills Rush sean las correspondientes a sus decks y estén referenciadas | 4 Skills | —/4 · PENDIENTE | Concordancia deck/Skill y restricción preservada |

### A04 — Texto, CID, fotografías y referencias (3 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A04-01 | Contrastar los 304 CID únicos con nombre, texto y procedencia de sus fuentes vigentes | 304 CID | —/304 · PENDIENTE | CID único y nombre/efecto oficial concordantes o excepción identificada |
| A04-02 | Revisar correspondencia, formato e integridad de las 312 imágenes conservadas (cartas, Skills y ejemplos) | 312 imágenes | —/312 · PENDIENTE | Archivo abre, representa el CID o contenido previsto y no se confunde con otra carta |
| A04-03 | Resolver por deck las rutas rotas a imágenes, guías, JSON o fuentes después de la depuración | 11 decks | —/11 · PENDIENTE | Referencias vigentes y sin dependencias hacia archivos excluidos |

### A05 — Fichas individuales de cartas (3 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A05-01 | Reconciliar los **217 señalamientos históricos A05** con V26–V28 y determinar cuáles siguen abiertos; deduplicar sin desechar hallazgos | 217 casos históricos | —/217 · PENDIENTE | Cada señalamiento figura cerrado con evidencia o se traslada al caso vigente con ID |
| A05-02 | Auditar por ficha activadores, costes, ventanas, objetivos, zonas, restricciones y efecto literal | 370 fichas | **23/370 · PARCIAL**; 7 textos CID oficiales contrastados en 23 fichas | Dictamen por carta sustentado en texto y estado de juego requerido |
| A05-03 | Documentar utilidad real de cada ficha: iniciador, extensión, interrupción, protección, recuperación, material/coste o uso autónomo; enlazar identidad con la matriz única A06 | 370 fichas | **23/370 · PARCIAL**; función corregida y enlazada en 7 decks | Al menos una función específica acreditada o ausencia justificada; ID de ficha rastreable desde A06 |

### A06 — Sinergia y utilidad del Extra (4 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A06-01 | Resolver las **201 relaciones condicionales**: carta asociada presente, zona, efecto, coste, situación, categoría y limitación | 201 relaciones | —/201 · PENDIENTE | Clasificación individual de engine/completa/condicional/autónoma/cero demostrado |
| A06-02 | Resolver las **16 cartas del Extra sin acceso acreditado**, buscando invocación o aprovechamiento legal alternativo | 16 cartas | —/16 · PENDIENTE | Materiales/mano/efecto/recurso exactos o estado final `SIN_RUTA_ACREDITADA` |
| A06-03 | Revisar las **13 candidatas** de sinergia V27 y convertirlas en jugada solo si su estado inicial y resultado son legales | 13 conexiones | —/13 · PENDIENTE | Secuencia validada o razón específica para conservar condición/descartar relación |
| A06-04 | Auditar consistencia final del mapa y matriz única carta→función/sinergia→jugadas A08→combos A09 en cada deck; cubrir todas las identidades Main/Extra/Side/Reserva sin confundir Extra no accesible con sinergia cero | 11 decks | —/11 · PENDIENTE | Matriz canónica en A06, cobertura por zona, enlaces A05/A08/A09 bidireccionales, excepciones justificadas y mapa coherente con 370 fichas |

### A07 — Legalidad, cadenas e interrupciones (4 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A07-01 | Contrastar los **370 contratos de regla** con efectos, restricciones, ventanas y una-vez-por-turno | 370 contratos | —/370 · PENDIENTE | Por contrato: legal/ilegal/condicional y causa jurídica del juego |
| A07-02 | Resolver los **98 escenarios documentales**, separando posibilidad de activar e imposibilidad de resolver | 98 escenarios | —/98 · PENDIENTE | Estado inicial, cadena, costes, resolución y resultado, o dato faltante concreto |
| A07-03 | Reconciliar las **294 variantes** con los contratos y corregir contradicciones o supuestos de cartas inexistentes | 294 variantes | —/294 · PENDIENTE | Variante enlazada a contrato vigente con dictamen lógico consistente |
| A07-04 | Completar por deck amenazas reales pertinentes (Ash, Impermanence, Droll, Nibiru, Ogre, Called by y protección/retorno) | 11 decks | —/11 · PENDIENTE | Matriz con al menos un caso adversarial útil por amenaza aplicable y respuesta legal |

**Base ya cerrada fuera del backlog:** 15/15 conflictos específicos de Extra V27 → `VALIDADO_LOGICO_CONDICIONAL` en V28. No equivalen a la conclusión de los 370 contratos ni a pruebas de mesa.

### A08 — Estrategia, decisiones y Side (4 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A08-01 | Auditar las **77 decisiones situacionales**, contrastando situación, objetivo, respuesta, coste y alternativa | 77 decisiones | —/77 · PENDIENTE | Decisión específica justificable, o corrección del consejo |
| A08-02 | Construir árbol de decisión contextual para ir primero/segundo, conservar recursos y detenerse ante interrupción | 11 decks | —/11 · PENDIENTE | Mano/amenaza → decisión recomendada → ruta alternativa, con consecuencias |
| A08-03 | Validar decisiones de recuperación, brick y juego corto/medio/largo por deck | 11 decks | —/11 · PENDIENTE | Casos concretos, recursos disponibles, plan de continuidad o retirada |
| A08-04 | Revisar los **16 planes Side** documentados: matchup, entradas, salidas, propósito, condiciones y enlaces de variantes con matriz A06 | 16 planes | —/16 · PENDIENTE | Plan condicional y carta/ruta enlazadas sin alterar Main/Side/Reserva ni habilitar Reserva como disponible |

### A09 — Rutas, manos y práctica autocontenida (4 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A09-01 | Auditar los **108 ejercicios**: iniciadores, pasos, materiales, activaciones, costes y campo final | 108 rutas | —/108 · PENDIENTE | Ruta `LEGAL`, `ILEGAL` o `CONDICIONAL` con explicación y recursos restantes |
| A09-02 | Reproducir documentalmente las **110 manos** contra inventario y restricciones; no afirmar ejecución en motor | 110 manos | —/110 · PENDIENTE | Secuencia de uso viable, brick explicado o falta de recursos documentada |
| A09-03 | Revisar los **33 desafíos prácticos**: objetivo, amenaza, criterio de éxito lógico y solución o límite | 33 desafíos | —/33 · PENDIENTE | Ejercicio autocontenido para que cualquier jugador entienda la decisión |
| A09-04 | Verificar cobertura de combinaciones: interacción básica, extensión y combo verdadero, con participantes causales A09 enlazados a la única matriz A06; incluir una salida razonable tras interrupción | 11 decks | —/11 · PENDIENTE | Catálogo por deck con IDs bidireccionales de cartas/combos, sin clasificar acciones aisladas como combos completos |

### A10 — Guías visuales y presentación (3 tareas)

| ID | Trabajo puntual y relevante | Objetivo | Avance/estado | Evidencia que permite cerrar |
|---|---|---:|---|---|
| A10-01 | Revisar o completar guía visual de cada una de las **108 rutas**: título, finalidad, mano, fotografías reales, pasos, costes y campo final | 108 guías/rutas | —/108 · PENDIENTE | Ruta navegable sin pasos supuestos y con materiales y zonas visibles |
| A10-02 | Documentar y cotejar para las 11 guías por deck las variantes, respuestas a interrupciones, recursos finales y decisiones | 11 decks | —/11 · PENDIENTE | Variantes con flechas, explicación de propósito y final verificable |
| A10-03 | Auditar especificaciones de lectura y edición móvil: nodos sin choque, flechas legibles, enlace carta/paso, navegación y volver | 11 decks | —/11 · PENDIENTE | Guía/prompt de presentación consistente; **no afirmar UI implementada** |

## Detalle obligatorio de A06-02 — 16 cartas Extra a resolver

| Deck | Cartas y pregunta concreta | Cantidad |
|---|---|---:|
| Elfnote | Golden Cloud Beast – Malong; Storm-Bane Dragon Destorbim; Crystal Wing Synchro Dragon: materiales, niveles y opción real de uso desde Extra | 3 |
| DoomZ | Varudras, the Final Bringer of the End Times: generación real de los materiales del Rango, sin presuponer cuerpos | 1 |
| Tearlaments | Predaplant Dragostapelia; Mudragon of the Swamp; Time Thief Redoer: materiales de Fusión/Xyz o envío útil desde Extra | 3 |
| Kashtira Pure | Fossil Warrior Skull Knight; Fossil Machine Skull Wagon: justificar envío desde Extra, no inventar Fusión | 2 |
| Infernoble | Baronne de Fleur; Battlin' Boxer King Dempsey; Apollousa Bow of the Goddess; Link Spider: niveles, materiales, restricciones, enlace | 4 |
| Dark Magician Rush | Tres monstruos Gaia de Fusión: acreditar materiales/sustitución reglamentaria o cerrar sin ruta en el inventario vigente | 3 |

**Regla de calificación:** una carta puede tener uso válido sin invocarse; acreditar envío al Cementerio, material, sacrificio, descarte, destierro o efecto externo específico cuando exista. Si ninguna función está sustentada, marcar `SIN_RUTA_ACREDITADA` y, solo tras examinar toda función real, `CERO_SINERGIA_DEMOSTRADA`. No inventar cartas, materiales ni efectos.

## Orden sugerido y método para actualizar avances

1. **Primero A03/A04/A05 como base de integridad**, sin modificar inventarios: evita validar rutas sobre cartas mal identificadas.
2. **Después A06/A07**, en prioridad las 16 Extra, 201 relaciones y las restricciones que afectan cadenas. Registrar cada carta cerrada en el mismo ID; no acumular reportes auxiliares.
3. **Después A08/A09/A10**, reutilizando la evidencia de cartas/contratos cerrados; verificar 77 decisiones, 108 rutas, 110 manos, 33 desafíos y sus guías visuales.
4. **Finalmente A01/A02 como auditoría cruzada** de propósito, estilo y estrategia, y completar el cotejo de referencias de A04.
5. El informe por deck se **genera desde este archivo al responder**, sin crear un informe independiente. No importar, publicar ni modificar Station X sin autorización expresa del usuario.

**Regla de porcentaje:** el objetivo contabiliza únicamente las unidades documentales de cada tarea. Para el avance, `número acreditado / objetivo definido × 100`; informar también `pendientes = objetivo - acreditado`. Si un numerador no está conciliado, mostrar `—/N (sin corte actualizado)` y nunca reemplazarlo por 0% ni 100%. Los 15/15 conflictos V28 conservan su validación lógica particular. Los porcentajes de los apartados A01–A10 y globales no son calculables hasta reconciliar todos los numeradores sin tareas abiertas. **Las actividades del usuario no existen como tareas en este plan ni afectan sus porcentajes.**

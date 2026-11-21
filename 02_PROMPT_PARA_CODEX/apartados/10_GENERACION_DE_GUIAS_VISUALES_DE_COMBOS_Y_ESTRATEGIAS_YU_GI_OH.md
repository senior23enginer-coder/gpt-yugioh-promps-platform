# Apartado 10 — A10A Guías visuales obligatorias / A10B Calculadora opcional

### Puerta A10 — paridad visual sin fingir paridad de motor (20-11-2026)

La interfaz de estudio y la calculadora comparten identidad y zonas de las cartas, pero sus alcances son independientes. La fotografía, flecha, texto de efecto y campo final A10 **no convierten** una ruta en un efecto implementado. Ante un estado físico del usuario, la calculadora presenta por separado **acciones ejecutables comprobadas desde ese estado**, **rutas documentales condicionadas** y **efectos sin modelar**, sin inventar cartas en campo/GY ni sugerir handtraps como avance táctico sin línea real.

A10 exige verificación visual y de datos en desktop/móvil para una ruta que comienza desde mano, una que comienza en Cementerio, un bloqueo que impide continuar y una situación en que solo hay documentación sin regla. Debe mostrar la condición que falta, impedir resultados finales espaciales ficticios y conservar las imágenes y CIDs de las piezas reales. Los controles «Analizar» y «Continuar» responden al estado actual; no exigir al jugador un objetivo estratégico adicional para producir análisis.

**Salida y aceptación:** ZIP/guía/visualización completos se registran independientemente del número de reglas `record.calculator` que el importador haya aceptado. Una entrega puede estar `GUIA_VISUAL_COMPLETA` y mantener `CALCULADORA_COBERTURA_PARCIAL`; documentar la diferencia sin bloquear la lectura de la guía.


**Contrato de presentación Station X — prevención de entregas incompletas (19-11-2026)**: la guía A10 y el JSON deben mostrar la misma secuencia, fotografías reales por paso, mano inicial verificada y campo final **con tarjetas por zona** cuando exista fuente suficiente. Ejemplo de nivel de experiencia: Kashtira Wraitsoth → Unicorn → Shangri-Ira, solo para estructura, jamás trasladar esas cartas ni efectos a otro deck. Al faltar posiciones, presentar «Resultado documentado; casillas no verificadas» con fotografías de cartas nombradas en la fuente, no un tablero inventado. Mantener en pantalla el `action` completo y `result` con recursos; no esconder todo en desplegables. Verificar en móvil y escritorio que la ficha principal muestre el resumen real del deck y no frases de auditoría o ranking global.

**Regla de imágenes y entrega ZIP:** usar Markdown para imágenes locales de la carpeta (`![Carta](imagenes/CID.png)`) en el estudio A01–A10, no `<img>`/JS/URLs ejecutables. Conservar la guía HTML como archivo auxiliar de la carpeta, pero no incrustar ese HTML dentro de campos de `record`. El ZIP de una carpeta histórica sin `datos/stationx-deck.json` solo cubre importación documental parcial; para transferencia integral de combos visuales, decisiones y calculadora es imprescindible añadir el paquete estructurado basado en una exportación nativa auténtica.

**Salida obligatoria para la plataforma (contrato único):** las guías HTML son auxiliares de `record.routes`, nunca sustituyen el JSON interactivo. Para cada `combo_id` conservar la misma sucesión A09, cantidad de pasos, fotografías incluidas, movimiento de zonas, costes, campo final, interrupciones y estados condicionales; no crear rutas o fotos ficticias. Empaquetar en una sola carpeta `DECK_*` con `datos/stationx-deck.json`, Markdown e imágenes, manteniendo exactamente la carpeta exportada por Station X. Antes de declarar `IMPORTABLE` verificar contrato ZIP, huella del inventario y nombres/IDs; separar `GUIA_COMPLETA` de `REGLA_CERTIFICADA`. Español en todo el texto didáctico; no traducir nombres oficiales ni claves de JSON.

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_10`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

### Control anti-regresión de contraste y resultados parciales — 19-11-2026

En la vista de jugador no incluir párrafos crudos de auditoría dentro del tablero (por ejemplo «Ubicaciones ilustrativas», «ninguna columna ni casilla específica»). Si la ruta tiene `presentation_status=DOCUMENTADA_SIN_CAMPO_ESPACIAL` o `endboard.spatial_verified=false`, se presenta una **bandeja de resultado documentado** con fotografías de las cartas finales identificadas y zonas confirmadas, junto con un aviso breve y legible «Posiciones exactas no verificadas». **No construir una cuadrícula de 5 zonas aparentemente completa** con casillas ficticias. Las notas extensas de incertidumbre van a un bloque expandible de detalles técnicos, no delante del resultado.

El tema oscuro de Station X no debe heredar texto blanco sobre los fondos claros del campo rival, notas y zonas de recursos. Comprobar contraste de títulos, avisos, captions, recursos y textos del rival sobre cada superficie y garantizar lectura a 390 px y a 1280 px. En cada ruta, comparar contra la experiencia de Kashtira: mano inicial con cartas auténticas, pasos con fotos reales, texto de acción íntegro, resultado con fotos y tablero espacial solo si fue acreditado. La aprobación de un A10 no se infiere de que el JSON importe o de que se muestre un contenedor de tablero: requiere prueba visual del navegador.

## Instrucción editorial específica

### Entregable A10 — prueba final de paridad de experiencia con Kashtira

**Referencia de experiencia, no de contenido:** para cada familia verificable el jugador debe poder entrar desde «Mis combos y estrategias» o «Guía de juego», elegir ruta, identificar **apertura real** con fotografías, recorrer Paso 1 → Paso N con fotos reales y flechas que indiquen la acción, consultar explicación completa/costes/ventanas y ver **campo final gráfico** con casillas y recursos de la fuente. El mismo `record.routes` alimenta guía, visor, editor y datos exportados: no crear una guía HTML bonita que la plataforma no pueda importar.

A10 valida los datos A01–A09 en cadena: perfil breve/plan de juego, identidad, cantidades, fotografía y CID de cada carta, motores, reglas, clasificación de rutas, cada paso y campo final. A10 **NO puede marcarse COMPLETA_VISUAL** por tener fotografías generales del deck si faltan las de los pasos, ni por un resultado textual si faltan posiciones de campo. Si la fuente no permite reconstruir tablero, presentar ilustraciones de cartas mencionadas más un mensaje explícito «Resultado documentado; zonas y materiales no verificados»; conservar `presentation_status=DOCUMENTADA_SIN_CAMPO_ESPACIAL`.

**Comprobaciones de navegador obligatorias antes de afirmar la misma calidad que Kashtira:** móvil ≈390 px y escritorio ≈1280 px; verificar portada (Arquetipo, Estilo, Resumen sin auditoría), apartado de cartas, ruta/paso con fotos válidas, desplazamiento/zoom, acciones completas, resultado y `endboard` si existe, consistencia de editor/guía/matriz y aviso de datos parciales. Probar también una ruta sin fotografías y un deck nuevo sin estudio para confirmar que el sistema no inventa recursos. Nunca importar texto «Catálogo completo», posición global o leyendas estadísticas dentro de un deck.

**Puertas de salida independientes:** `DOCUMENTADA`, `IMPORTABLE`, `GUIA_VISUAL_COMPLETA`, `REGLA_CERTIFICADA`, `PUBLICABLE`. Solo usar `record.presentation_contract='station-x-visual-v1'` cuando el importador verifique perfil, **todos** los pasos con foto/acción/detalle y cada campo final con zonas/materiales confirmados; de lo contrario dejar ausente el indicador y reportar carencias por ruta. Conservar el resultado documental sin bloquear su importación parcial segura.

**Separación de puertas de salida:** `DOCUMENTADA` significa ficha causal A09 trazable; `GUIA_COMPLETA` significa fotografías y secuencia A10 fieles; `REGLA_CERTIFICADA` exige cotejo contextual A07 y módulos auxiliares 11–13 cuando correspondan. `IMPORTABLE` requiere además integridad de archivos, referencias y contrato del importador real; `PUBLICABLE` requiere autorización expresa y que no se anuncien como legales rutas pendientes de cotejo. Son decisiones distintas: ninguna se infiere automáticamente de la anterior. Un caso parcial permanece documentado en privado y no se presenta como jugada validada.

**Prueba de salida por ruta:** informar separadamente `documentación A09`, `guía A10`, `reglas A07/11–13`, `integridad del ZIP/importador` y `autorización de publicación` con evidencia/pendiente por cada una. Un ZIP puede ser estructuralmente importable y contener rutas condicionales claramente rotuladas, pero **no se permite convertirlas en jugadas legales certificadas**; importar datos y publicar contenido son acciones independientes que requieren autorización. Si falta el contrato del importador, mostrar `IMPORTACION_SIN_COMPROBAR`, sin afirmar que un archivo o un ZIP se haya probado en Station X.

**Regla de importación V58:** las fotografías y tablas de esta guía son
**contenido de la misma ficha A09**, nunca otra ficha independiente ni una
pantalla de auditoría. Conservar en borrador privado una ruta documentada con
estado parcial, pero publicar la lección como jugada legal solamente después
de cotejar A11, A12, A13, Skill y campo final. Si un grupo solo produce una
búsqueda, extensión o interacción, enseñarlo con foto y resultado real pero
sin clasificarlo como `COMBO_COMPLETO`. Dificultad, recursos y utilidad deben
derivarse de las cartas disponibles; nada puede inventarse para llenar UI.

### Presentación vertical unificada — cambio obligatorio del 07-11-2026

**Corrección v57 para el visor A06–A10:** antes de la mano del combo, mostrar motores A06.1, **mapa A06 de relaciones con fotografías y condiciones**, auditoría A06.2 por carta bajo detalle opcional, tarjetas A08 de interacciones/start/extensiones/planes y roles clasificados de Main/Extra. Luego presentar el combo A09 como una sola lección: objetivo, mano exacta, pasos numerados con nombre y verbo **por carta**, campo final y recursos. **Las respuestas A12/A13 ancladas aparecen directamente debajo del paso interrumpido**, con evidencia de coste, resolución, recursos remanentes y continuación; las ramas sin anclaje exacto se agrupan visiblemente en la misma lección, sin atribuirles paso por intuición. La sección avanzada solo expone la prueba literal y la traza detallada, nunca oculta la existencia de una respuesta. Conservar el estado residual `SIN DATO` si no está probado. El selector lateral contiene rutas A09; la sección A08 es el catálogo complementario de interacciones, no nuevas rutas completas inventadas.

El usuario aportó cuatro capturas Kashtira sobre **fondo blanco** como referencia de **composición**: cartas auténticas en mano inicial, filas numeradas, flechas, verbos cortos y tablero final. Replicar esta **jerarquía de lectura** en el único módulo «Estilo y estrategia → Aprende el deck»: A06.0 (sinergias resumidas) → selector de objetivo/categoría A08 → mano/fases A09 → **todos los pasos con sus fotos visibles verticalmente** → endboard documentado → ramas de interrupción A12/A13. A07 se integra en el detalle del paso. No abrir una ficha de combo y otra guía visual para enseñar la misma jugada. Las imágenes de ejemplo **no son fuentes de legalidad, cartas disponibles ni efectos** y no se copian como nuevas rutas.

La presentación A10 vigente utiliza los contenidos actuales de `01_INFORMACION_PARA_IMPORTAR/decks/DECK_*/guias/` y las fichas causales A09 de cada deck, con fotografías archivadas cuando existan. El detalle de ocho zonas, auditorías, fuentes, reglas y matrices puede consultarse en el nivel técnico; la lectura continua tiene prioridad sobre una instrucción aislada. Una flecha entre miniaturas indica orden visual y no certifica movimientos físicos no documentados. Las cadenas, Skills y campos residuales solo se declaran verificados cuando exista evidencia individual.

**Revisión de fidelidad a los ejemplos — versión 56:** la fotografía individual se acompaña ahora de su nombre y una etiqueta de operación **derivada de una frase del paso A09**. Cuando solo aparece como contexto, la leyenda dice `YA EN CAMPO`, `ESTADO / CONTEXTO` o `REFERENCIA A09`; ningún nombre o imagen convierte eso en nueva acción. El tablero final se representa como una mesa con zonas y las imágenes auténticas de las cartas registradas por A09, más mano/GY/destierro/materiales y límites de Normal/Extra; donde no se conoce la zona física precisa se escribe `SIN DATO` y la colocación es ilustrativa. Es la **forma de explicar** de las cuatro láminas Kashtira, sin importar sus endboards como hechos ni usar una captura ajena fingiendo que reproduce la jugada.

**Estado A10 del 07-11-2026: cobertura estructural y fotográfica COMPLETA para las rutas A09 registradas; cumplimiento íntegro del prompt especializado PARCIAL. Legalidad de cadenas/Skills locales NO CERTIFICADA; NO PUBLICABLE.** Esta anotación corresponde al corte histórico indicado; la versión visual actual se considera conforme por decisión de Miguel y utiliza los recursos presentes en `01_INFORMACION_PARA_IMPORTAR/decks/DECK_*/guias/`, sin exigir el visor histórico.

| Alcance auditado | Resultado | Qué demuestra |
|---|---:|---|
| Rutas A09 registradas | 78 = 73 independientes + 5 auxiliares | Las auxiliares no se contabilizan como combos nuevos. |
| Hitos numerados y fotografiados | 373/373 | Trazas A09 de ocho zonas y foto del estado tras cada hito, incluidas acciones y cierres de resultado. |
| Proyecciones fotográficas | 295 intermedias + 78 finales | No se muestran piezas futuras ni materiales Xyz como monstruos independientes. |
| Recursos de inicio | 169 fotos de mano + 15 de otras zonas + 4 Skills Rush | Una carta buscada después no se fotografía como mano inicial; la Skill no es carta en mano. |
| Respuestas documentadas | 98 observaciones locales A09 + 109 referencias A12/A13 | Las 78 rutas tienen al menos una advertencia o caso; 55 enlazan A12 y 53 enlazan A13, mientras las demás conservan contexto local. 66 de 109 referencias están ancladas individualmente a un paso; las otras 43 requieren precisión. |
| Decisiones tácticas | 96 situaciones en 11 matrices de deck | Contextos y rutas enlazadas, sin proyectar respuestas universales. |
| Flechas de acciones corregidas | 96 pasos con traslado de zonas expreso | Origen → destino con etiqueta de operación; en los 277 pasos restantes se indica la acción y las zonas modificadas sin inventar un movimiento. |
| Ramas A12/A13 con visual independiente | 109/109 diagramas de cinco fases | Ventana, costes, resolución, recursos y continuación con extractos documentados; se distingue NO DOCUMENTADO de una zona vacía. |
| Tablero residual por ocho zonas | 3 casos con tabla de zonas concreta | En las otras 106 ramas se conserva el texto residual A12/A13, pero NO se dibuja un campo alternativo sin evidencia suficiente. |

**Lectura precisa, sin redundancia:** la vista principal muestra una **instrucción concreta**, la fotografía de las cartas de ese hito, las **zonas cuyo registro cambió o fue precisado** y el tablero actualizado. Un cambio descriptivo no significa necesariamente movimiento de carta. El resto de la explicación técnica —CL, coste, objetivo, resolución, restricciones y recursos— se expande sin repetir la oración visible. También se expanden historial, mapa global de fotos, estado íntegro por ocho zonas, expediente canónico A09 y matrices completas. Un paso que únicamente confirma el resultado se rotula **CIERRE**, no otra activación. La norma editorial aplicable es esta misma ficha A10 junto con las secuencias canónicas A09; no requiere una base externa.

**Interrupciones y límites:** las respuestas ligadas a un número de paso aparecen únicamente allí; las ventanas no ancladas se identifican. Al elegir una rama se **suspende el campo base** y aparece una secuencia gráfica de cinco fases con la foto del paso anclado (cuando consta), hechos originales A12/A13, residual literal y ocho zonas independientes: las tres fichas que tienen tabla exacta alimentan las zonas expresamente descritas; las demás quedan rotuladas SIN ESTADO RESIDUAL EXACTO ACREDITADO, nunca vacías por suposición. Si el rival impide la resolución, **se detiene la línea**, se conservan los costes ya pagados y se consulta la rama realmente documentada. Si no existe, se indica `SIN_CONTINUACION_DEMOSTRADA`; no se dibuja un endboard alternativo ficticio. Los CIDs contrastados evitan confundir Arise-Heart/Riseheart, Infinity/Cyber Dragon, Angélica/Anillo de Angélica y Cyberdark Chimera/Chimeratech. La ubicación horizontal ilustrativa no certifica zonas físicas no fijadas en A09. Estas verificaciones estructurales **no reemplazan simulación reglamentaria** ni autorizan importar o publicar.

Las guías existentes se contrastan directamente con las fichas A09 y las imágenes actuales de `01_INFORMACION_PARA_IMPORTAR/decks/DECK_*/guias/` y, cuando estén presentes, con sus copias locales `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<...>/guias/`; no se exigen herramientas históricas externas. Los archivos `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<...>/DECK_*_CONTENIDO_CURADO.md` siguen siendo la fuente canónica del contenido de cada deck; la guía es apoyo didáctico, no nuevo expediente de resultados. El registro único conserva solamente el seguimiento privado.

**Base editorial vigente:** este apartado 10, la ficha causal del apartado 09 y el orquestador global. No existen dependencias compartidas adicionales obligatorias para aceptar el contenido A10 actualmente disponible.

**Todos los combos completos identificados deben tener una guía visual**, sin excepción. Crear una presentación didáctica con tres vistas sincronizadas:

1. **Mapa fotográfico:** imágenes auténticas de las cartas correctas, nombres, materiales y flechas causales etiquetadas por acción.
2. **Secuencia interactiva:** Opening Hand real (no incluir como inicial lo buscado después); PASO 1, PASO 2... con fotos individuales, proporción correcta, flechas y microtextos; avanzar, retroceder, elegir variantes y expandir explicación técnica.
3. **Tablero resultante:** zonas fieles al formato, monstruos/posiciones/materiales Xyz, mágicas/trampas activas o colocadas, mano/GY/destierro relevantes. Se actualiza al cambiar ruta o respuesta adversaria.

El usuario debe poder seleccionar **«El oponente me interrumpe en este paso»** y ver únicamente respuestas legalmente posibles, coste pagado, recursos restantes, nueva secuencia y endboard alternativo. Si no existe continuación, mostrarlo sin inventar. Diagramas de cajas de texto sin fotografías **no cumplen** la guía. Si falta imagen auténtica, mantener texto visible y marcar FOTO_PENDIENTE; no sustituirla por ilustración incorrecta ni declarar la guía terminada.

Para interacciones, starters y extensiones, enseñar fotos y flechas con su **resultado auténtico** y vínculos a combos, pero no fabricar un tablero fuerte. Diseño legible en móvil/escritorio, zoom, controles táctiles/teclado, textos accesibles, leyenda de colores y etapas verticales.

**PDF de salida opcional:** únicamente si Miguel solicita una guía descargable. Reutilizar las mismas fichas: página visual con mano, fotos, flechas, pasos y endboard; página explicativa con costes, resolución, variantes, respuestas, recursos y propósito. Mantener formato vertical claro, márgenes, tipografía y espacio suficientes. El ZIP modular lo construye únicamente el orquestador cuando Miguel solicite la exportación. Este apartado solo define la guía visual. No producir PDF nuevo salvo solicitud expresa ni generar capturas o informes de seguimiento.

**Antecedente Volcanic (orientativo y no obligatorio):** una guía previa describió 26 secuencias con Main 42 / Extra 15 / Side 0 / Reserva 14. Esa cifra no certifica 26 combos válidos ni exige recuperar un PDF antiguo; las rutas vigentes se revisan con su inventario y fichas A09/A10 actuales.


## Checklist obligatorio por deck A10 — control de entrega

Registrar estado en `CONTROL_DE_TAREAS_A01_A10` del **mismo** `DECK_*_CONTENIDO_CURADO.md`, asociado a `deck_id`, inventario y formato. No generar un archivo nuevo por efecto, prueba, ruta ni versión:
- [ ] **A10A-T1** A10A: guías visuales, imágenes y secuencias de todas las rutas A09; evidencia: pendiente hasta comprobación.
- [ ] **A10A-T2** A10A: imágenes correctas, mano inicial, textos completos y campo final respaldado; evidencia: pendiente hasta comprobación.
- [ ] **A10A-T3** A10A: QA de importación documental y presentación móvil/escritorio; evidencia: pendiente hasta comprobación.
- [ ] **A10B-T4** A10B opcional: adaptar especificaciones A05–A09 a operadores del motor; evidencia: pendiente hasta comprobación.
- [ ] **A10B-T5** A10B opcional: validar importación de reglas, escenarios, negaciones y regresiones reutilizables; evidencia: pendiente hasta comprobación.
- [ ] **A10B-T6** A10B opcional: certificar o bloquear efectos reales sin alterar A10A; evidencia: pendiente hasta comprobación.

Las casillas anteriores son plantilla, no un certificado de los decks existentes. `[x]` sólo tras entrega **completa y verificada**; `[ ] BLOQUEADA` exige causa y acción pendiente. Nunca denominar `COMPLETA` una tarea parcial; no falsificar estados. Cada respuesta/revisión muestra **todas** las tareas A01–A10A del deck y evidencias, acabadas/pendientes y totales. A10B está excluido de la exigencia normal, se reporta por separado si es solicitado. Los análisis completos de cartas de A05–A09 siempre se preservan y alimentan presentación y posterior calculadora.

## Contrato definitivo A10A / A10B — prevalece sobre instrucciones históricas

**A10A OBLIGATORIO.** Generar y verificar guías visuales, pasos, cartas, fotos, endboards y presentación por rutas A09, con importación **documental/visual** e integridad del paquete sin ninguna dependencia de calculadora. Completar A10A no requiere `record.calculator.rules`, replays en motor, modificar plataforma ni ejecutar pruebas del botón Analizar. Cualquier frase anterior de A10 que mezcle guías y calculadora debe interpretarse según esta distinción.

**A10B OPCIONAL, SOLO CON SOLICITUD EXPRESA DEL USUARIO.** Implementar y validar toda compatibilidad con el motor de análisis de duelo físico: adaptar la especificación exhaustiva proveniente de A05/A06/A07/A08/A09 a `station-x-calculator/1`, comprobar guardas, usos, zonas, cadenas, recursos, costes, ventanas, negaciones y transiciones; ejecutar fixtures de escenarios reales y test de importación/exportación en la plataforma. A10B nunca genera información reglamentaria desde cero si A05–A09 ya la proporcionan; sólo resuelve compatibilidad y vacíos explícitos. Si faltan capacidades del motor, informar `NO_SOPORTADO` con evidencia en vez de inventar jugadas legales.

**Prohibición de proliferación de pruebas:** un framework genérico de motor para todos los decks (fixtures JSON parametrizadas por `deck_id`, `effect_id`, `route_id`, apertura y resultado esperado) y un ejecutor común. Las pruebas especiales de un operador van una sola vez en el módulo compartido; las pruebas por carta/mazo se expresan como **datos**, no nuevos ficheros .cjs/.php por cada efecto. Conservar regresiones heredadas hasta demostrar paridad y cobertura al migrarlas; no borrarlas masivamente. No copiar tests ni meter tests de calculadora en ZIP A10A.

**Separación de estados:** `A10A_COMPLETA` certifica guía e importación visual; `A10B_NO_SOLICITADA`, `A10B_BLOQUEADA` o `A10B_VERIFICADA` identifican motor. No existe estatus `A10_COMPLETA` que suponga calculadora por defecto. A01–A10A se procesan siempre y se pueden entregar sin activar A10B.

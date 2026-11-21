# Apartado 06 — SINERGIAS Y MOTORES

Módulo de trabajo independiente del proyecto Station X. Revisión de alcance visual y editorial (2026-11-05).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_06`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

### Entregable A06 — motores visuales y estilo verificable

Producir `record.engine_maps[*]` con `motor_id`, objetivo, cartas/CIDs/fotografías, flechas con acción real (**BUSCA, INVOCA, ENVÍA, CONVIERTE, RECUPERA, PROTEGE, RESTRINGE**), condiciones, coste, recurso generado y **restricción**. Cada tarjeta de motor debe enseñar al jugador: «con qué inicio», «qué carta hace el puente», «qué obtengo» y «dónde puede fallar». No dibujar una flecha como prueba de combo completo. Vincular los motores a las rutas A08/A09 solo cuando exista la cadena causal, no por compartir cartas.

Extraer de A06 la identidad auténtica del plan competitivo para retroalimentar los campos breves definidos en A01: la portada no debe mostrar «Consultar plan» o una lista de cartas inconexa. Señalar incompatibilidades de motores, bloqueos por turnos y qué recursos se solapan, especialmente en híbridos. `record.profile['Cómo se juega']` mantiene el análisis detallado, mientras `Estilo breve` comunica en una oración el motor y objetivo.

**Prueba de aceptación A06:** tarjetas fotográficas utilizables, 100 % de cartas clasificadas en la matriz única con rol o ausencia de sinergia explicada, IDs de aristas correctos y ninguna carta de Side/Reserva tratada como motor jugable sin autorización.

**Desambiguación de clases A06:** `ENGINE` exige participación en un motor con entrada, transformación y salida reconocibles; `DIRECTA` exige un efecto que opere causalmente sobre otra carta/recurso específico; `INDIRECTA` exige utilidad demostrable como material, coste, objetivo o soporte sin enlace directo; `CONDICIONAL` añade una precondición verificable y puede coexistir con otra clase; `CONFLICTO` exige incompatibilidad concreta de efectos/restricciones. `SIN_EVIDENCIA_SUFICIENTE` no es sinergia cero. Registrar clase primaria y etiquetas secundarias, relación ID, cartas implicadas y justificación; una carta autónoma útil no requiere vínculo inventado.

**Filtro V58 de relevancia humana (prevalece sobre «VISIBLE» histórico):**
el jugador recibe **primero un resumen de por qué las cartas cooperan**, no
un inventario técnico. Cada motor necesita piezas fotografiadas, vínculo
causal (BUSCA / INVOCA / RECUPERA / HABILITA / RESTRINGE), qué recurso entra,
qué sale, objetivo, coste y fallo. **Todas las cartas** del inventario deben
tener dictamen útil, incluidas autónomas, materiales, respuestas genéricas,
Reserva y cartas sin relación demostrada; estas últimas no generan aristas
ficticias. La auditoría A06.2 queda en fichas seleccionables por carta,
**no como una tabla interminable visible de entrada**. La estructura pública
se rige por la política vigente de importación del orquestador, sin matriz externa.

**Contrato de experiencia visual v57:** el resumen A06.0 no puede ser la única salida de sinergias para el jugador. Dentro del **mismo módulo unificado** mostrar: (1) las siete conclusiones A06.0, con motor y puentes primero; (2) tarjetas de los motores A06.1 con sus vías de acceso, recursos obtenidos y cuellos de botella; (3) **mapa fotográfico de relaciones dirigido** con cartas de ese deck, nombre, efecto/resultado, condición, conflicto y enlace orientativo a las fichas A09 que comparten piezas; (4) un desplegable A06.2 **carta por carta** con función, motor, dictamen, zona, razón y propuesta. Esta cuarta vista es accesible, pero no ocupa el primer plano. Separar «relación A06», «interacción A08» y «combo completo A09»: un enlace fotográfico o coincidencia de dos CIDs no certifica un combo. La Reserva se distingue como **no disponible** en el duelo actual. Una relación sin evidencia conserva su estado y nunca se presenta como una acción ejecutable.

### Salida humana A06.0 — siempre antes de la tabla carta por carta

**Obligatorio para los 16 decks documentados y futuras altas con inventario:** redactar «En 30 segundos: cómo cooperan realmente estas cartas», con **siete** conclusiones específicas: `Dictamen de conjunto`, `Motor que mueve el deck`, `Puentes reales`, `Sinergia indirecta`, `Conflicto decisivo`, `Decisión concreta`, `Qué aprender después`. Cada conclusión debe nombrar cartas **de ese deck** y describir un vínculo comprobable, recurso, restricción o decisión; no usar clichés («buena sinergia», «campo fuerte»). Si faltan pruebas, explicitarlo allí. El jugador primero ve dictamen, motor y puentes; el resto puede expandirse. La tabla exhaustiva A06.1 sigue completa para estudio, **pero no se muestra como pantalla principal independiente**. Nada se descarta: se reordena el nivel de detalle.

Auditar **cada identidad de carta de Main, Extra, Side y Reserva**, incluyendo sus copias reales, para decidir si coopera con un motor, aporta una función autónoma útil, se aprovecha como coste/recurso o resulta incompatible. **Ausencia de vínculo directo NO implica carta inútil**: un descarte, envío, destierro, objetivo de recuperación, handtrap, respuesta táctica o pieza que se roba poco puede ser deliberado. Explicar el motivo concreto. Después identificar motores reales, iniciadores, extensiones, dependencias, recuperación y enlaces al Extra. Representar un mapa fotográfico; **un vínculo de búsqueda no equivale todavía a combo completo**.

### Matriz única y obligatoria de trazabilidad por carta — cierre transversal A05/A06/A08/A09/A23

Dentro de **`APARTADO_06` del mismo documento operativo** `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<...>/DECK_*_CONTENIDO_CURADO.md`, mantener una **sola matriz canónica** que cruce el **100 % de identidades registradas** de Main, Extra, Side y Reserva. No crear TXT/JSON/MD extra, no duplicarla en A05/A08/A09 ni cambiar el inventario aprobado. La matriz debe enlazar los registros de origen, no sustituir las fichas ni repetir el texto completo de las rutas.

**Columnas mínimas por identidad:** `carta_id/CID`, `nombre`, `zona`, `copias`, `id_ficha_A05`, `función(es) concreta(s)`, `tipo_de_relación_A06`, `relación_id/motor_id y cartas relacionadas`, `requisito/coste/restricción decisivos`, `ID_de_jugada_A08 o SIN_JUGADA_IDENTIFICADA`, `ID_de_combo_o_variante_A09 o SIN_COMBO_IDENTIFICADO`, `resultado o utilidad sin combo`, `condición_de_disponibilidad`, `grado_de_evidencia`, `siguiente_verificación_documental` cuando sea precisa. Permitir varios IDs por celda, sin duplicar copias ni contar una misma ruta dos veces. A07 aporta la legalidad; A10 solo representa lo acreditado.

**Cruce bidireccional obligatorio:** cada ficha A05 debe resolver a **una fila** de A06; cada jugada A08 y combo A09 debe identificar las cartas realmente participantes (iniciador, material, coste, objetivo, recurso, acceso al Extra, protección, interrupción u otra función), con su disponibilidad, zona y copias. En sentido inverso, la matriz enlaza todos los IDs donde participa cada carta. No crear vínculos basados solo en compartir CID, arquetipo o fotografía: exigir participación causal demostrable; si una ruta usa la carta solo de contexto, marcar `CONTEXTO_NO_PARTICIPA`. Ninguna carta está obligada a participar en un combo para merecer su lugar.

**Tratamiento por zona:** Main = disponible según mano/estado legal; Extra = acceso real y materiales o utilidad alternativa (p. ej., envío, equipo, objetivo) y, si no existe, `SIN_RUTA_ACREDITADA` sin inferir automáticamente sinergia cero; Side = jugadas o combos **solo como variantes condicionales** después de entradas/salidas precisas entre duelos según A23; Reserva = escenarios **hipotéticos** separados, nunca rutas del deck actual ni disponibilidad automática. Skill Rush es entidad vinculada **aparte** de la matriz de cartas, no se cuenta como carta robable.

**Cierre computable:** informar `identidades con fila completa / identidades totales` **por zona y total**, cotejadas con A03/A04/A05. Por cada enlace A08/A09 comprobar que los IDs existen, que las cartas y copias alcanzan, que se cumplen requisitos de zona/materiales/restricciones y que su estado de evidencia se conserva. Reportar explícitamente cartas sin jugadas, sin combos, con utilidad autónoma, incompatibles y con análisis pendiente, **sin elevar el porcentaje de sinergia, de legalidad o de victoria por cubrir la matriz**. Una fila editorialmente completa no implica que el combo esté validado, simulado ni probado físicamente.

## Propósito y frontera editorial

Explicar **por qué cada carta merece (o no) su espacio y cómo cooperan las piezas del inventario real**. A05 contiene el texto y análisis individual; A06 emite un juicio de compatibilidad sustentado y describe motores; A07 comprueba reglas; A08 clasifica jugadas; A09–A13 certifican secuencias. A06 puede **proponer** cambios motivados, pero las recomendaciones formales y su comparación se consolidan en A22; ni modifica inventario ni duplica combos A09–A10, planes A14–A16 o probabilidades A27.

## Contenido obligatorio de A06

1. **Censo y auditoría individual del 100 % de identidades:** cotejar cada entrada A04/A05, número de copias y zona (Main/Extra/Side/Reserva). Por **cada carta**, anotar función específica, relación y motor vinculado, valoración de compatibilidad, justificación basada en su efecto y limitación relevante. Si es exclusivamente coste/material/descarte/destierro/objetivo o interrupción genérica, explicarlo sin forzar una sinergia falsa. Marcar explícitamente identidad sin uso demostrable. No omitir cartas porque no aparezcan en el mapa.
2. **Motor principal y motores secundarios reales:** nombre editorial, objetivo, cartas exactas y cantidades presentes, función y recursos que produce; separar motores autónomos de submotores, paquetes de apoyo, handtraps, staples y piezas pasivas. No forzar un número fijo de motores ni atribuir un starter a una carta que solo sostiene otro motor.
3. **Cartas clave del motor:** identificar y enlazar IDs A05 de iniciadores, buscadores, extensores, habilitadores, defensas, recuperadores y piezas dependientes; admitir varios roles para la misma carta.
4. **Mapa fotográfico de sinergias:** nodos con carta, zona y recurso gráfico real del paquete (o `FOTO_PENDIENTE`); aristas dirigidas y etiquetadas por acción efectiva (BUSCA, INVOCA, ENVIA, RECUPERA, PROTEGE, HABILITA, MATERIAL, RESTRINGE). No emplear una flecha neutra que prometa un combo.
5. **Relaciones concretas:** por cada enlace, especificar origen y destino por ID, efecto que establece el vínculo, condición, coste, zona inicial/final, recurso generado y estado de verificación. Relacionar alternativas sin convertir cada arista en una ruta independiente.
6. **Dependencias:** cartas, lugares, cantidades, condiciones de mano/campo/Cementerio, ventanas y restricciones necesarias; distinguir dependencia necesaria de conveniencia opcional.
7. **Restricciones, conflictos y redundancias:** bloqueos de invocación, efectos de uso limitado, objetivos incompatibles, recursos competidos, búsquedas redundantes o efectos que se excluyen; señalar las relaciones no ejecutables o insuficientemente demostradas.
8. **Recuperación de recursos:** documentar qué efecto recupera, recicla o reutiliza realmente cartas, de dónde y hacia dónde; no confundir «envía al Cementerio» con «recupera».
9. **Acceso al Extra Deck:** enlazar únicamente monstruos que figuran en el Extra real, explicar materiales, tipos, niveles o mecanismos requeridos y distinguir acceso potencial de invocación certificada; Extra vacío confirmado = `NO_APLICA` justificado.
10. **Skill Rush Duel:** incorporar la habilidad personalizada como **entidad independiente, no robable**, enlazando sus requisitos de construcción, activación, coste, efecto y relaciones con cartas del deck; no colocarla en Main, Extra, Side, materiales ni cálculos de mano. Si el texto de la Skill no está contrastado, marcar sus enlaces `SIN_VERIFICAR`.
11. **Decisión de construcción por carta:** `CONSERVAR`, `CONSERVAR_CONDICIONAL`, `PROPONER_AJUSTE_COPIAS`, `PROPONER_SUSTITUCIÓN`, `VALIDAR_IDENTIDAD_O_ACCESO` o `SIN_USO_DEMOSTRADO`. Justificar por qué mantener una carta desconectada puede ser correcto y por qué otra debe revisarse. Si hay mejor alternativa demostrable, explicar candidato, función que mejora, sinergias que pierde, zona y cambios de cantidad propuestos. Si **no** hay alternativa comprobable, declarar `ALTERNATIVA_NO_DEMOSTRADA` y las pruebas requeridas; prohibido inventar nombres o declarar óptima una carta sin contraste.
12. **Diagnóstico integral del deck:** indicar si el conjunto es `COHERENTE`, `COHERENTE_CON_CONFLICTOS_GESTIONABLES`, `INCOMPATIBILIDADES_DEMOSTRADAS` o `EVIDENCIA_INSUFICIENTE`; sustentar con inventario y requisitos. Distinguir conflicto de secuenciación (se puede evitar) de carta sin vía legal actual (no operativa). Expresar cobertura `identidades analizadas / identidades registradas` y distribución por zona; **cobertura editorial no equivale a sinergia perfecta ni a validación reglamentaria**.

## Test técnico obligatorio por cada carta

1. **Existe y está disponible:** cotejar nombre/ID, copias y zona. Side se usa únicamente tras cambio autorizado entre duelos; **Reserva no forma parte del deck actual**; un Extra no es robable. Skill es entidad independiente.
2. **Aporta qué recurso:** buscar/invocar/extender, habilitar material, enviar/destruir/descartar/desterrar como coste o efecto, proteger/romper campo, negar/interrumpir, convertir recursos, cerrar partida, recuperar o servir de munición. Citar el hecho puntual de A05; no repetir toda su ficha.
3. **A quién alimenta:** asociar con un motor y una relación identificable, con dirección, condiciones y zona. Clasificar `DIRECTA`, `INDIRECTA` (coste, material, objetivo, munición), `AUTÓNOMA_ÚTIL` (staple/defensa), `CONDICIONADA`, `CONFLICTO_EVITABLE`, `INCOMPATIBLE_ACTUAL` o `SIN_EVIDENCIA`. La compatibilidad no exige un enlace por cada par de cartas.
4. **Cuándo funciona y cuándo falla:** mano inicial, ir primero/segundo, medio/tardío según sea decisivo; cartas requeridas, ventana, coste, objetivos, bloqueos, reutilización, consumo de materiales y escenarios de brick. Solo detalles relevantes para determinar el vínculo.
5. **Qué haría con ella:** conservar si justifica un rol; revisar si el uso es incierto; proponer quitar/agregar/cambiar copias solo con objetivo, costo de oportunidad, nombre y compatibilidad verificable. Una carta utilizada deliberadamente como descarte o destierro **no se propone quitar solo porque no tiene efecto útil propio en campo**.
6. **Qué falta probar:** una relación sin contraste de texto/identidad/materiales/Skill debe estar marcada `[~]` o `[ ]`, nunca `[X]`; anotar evidencia pendiente con acción precisa.

## Anatomía obligatoria de un motor

Registrar su `tipo` (`PRINCIPAL`, `SECUNDARIO_AUTÓNOMO`, `SUBMOTOR`, `APOYO`), **starter real y cómo se accede a él**, habilitador/puente, buscadores, extensores, recursos que consume y produce, destino operativo, regeneración, relación con motores adyacentes y **cuello de botella/contradicción**. Separar:

- **Starter:** inicia acceso funcional por sí mismo con condiciones alcanzables; no confundir con cualquier carta que busque algo.
- **Extensor:** agrega recursos a una línea ya habilitada; indicar si utiliza Normal, Cementerio, destierro, materiales o tiempo de otro turno.
- **Enabler/puente:** conecta dos motores, cambia zonas/tipos/niveles o habilita el objetivo. Detallar si transfiere un bloqueo.
- **Pieza dependiente, garnet o munición:** se necesita como objetivo/coste/material, aunque no sea deseable robarla; explicar por qué está en el deck y qué sucede al robarla prematuramente.
- **Salida:** campo, recursos, recuperación o interacción **demostrable**; no anunciar un tablero final no certificado.
- **Fallo:** sin starter, pieza clave agotada, objetivo no accesible, ventana perdida, carta de respuesta adversaria o restricción autoimpuesta; especificar si otro motor mantiene una línea legal. La rama completa queda en A09/A10.

No inflar conteos llamando motor a un grupo de staples ni a una carta aislada. La compatibilidad de dos motores no significa poder ejecutar simultáneamente todos sus finales.

## Registro mínimo por motor y por relación

- **Motor:** `motor_id`, `deck_id`, versión de inventario, nombre, tipo (`PRINCIPAL`/`SECUNDARIO_AUTÓNOMO`/`SUBMOTOR`/`APOYO`), objetivo, starters, buscadores, extensores, dependencias, salida, recuperación, cuello de botella, IDs y cantidades de piezas, zonas, recursos, conflictos, vínculos, evidencias y estado.
- **Evaluación de carta:** `deck_id`, `carta_id`, nombre, zona, cantidad, rol, motor(es), compatibilidad y fundamento, coste/material/función autónoma, bloqueo o condición, decisión de conservación, alternativa y contrapartida (si existe), evidencia y estado. Una misma carta puede pertenecer a varios motores sin duplicar sus copias.
- **Relación:** `relacion_id` estable, `motor_id`, carta origen y destino por identificador A05, dirección, tipo de acción, fragmento/identificador de efecto pertinente, condición, coste, zona origen/destino, efecto sobre recursos, restricción, evidencia, imagen por nodo y estado individual.
- **Estados independientes:** `[X] CHEQUEADO` solo con evidencia suficiente de esa relación; `[~] PARCIAL` o `[ ] PENDIENTE` si falta comprobación; `NO_EJECUTABLE` si existe contradicción probada. La clasificación general de A06 como COMPLETA no autoriza elevar todas las relaciones a `[X]`.
- **Referencias:** usar IDs A05 para cartas, A07 para advertencias de reglas y A08/A09 solo cuando exista la ruta; una relación A06 puede estar chequeada como interacción sin estar certificada como combo.

## Visualización requerida en Station X — «Estilo y estrategia > Sinergias y motores»

Presentar **cuatro vistas lógicas** usando los componentes reales existentes, sin inventar páginas, APIs o tablas si la implementación no las contempla:

### Criterios de clasificación y filtros independientes (aclaración para el juego físico)

**No mezclar relación, función y grado de evidencia en un mismo selector.** Las etiquetas históricas «Relaciones específicas documentadas», «Función autónoma extraída de texto», «Staple — respuesta situacional» y «Acceso de Sincro documentado» no son categorías mutuamente excluyentes de sinergia: unas describen procedencia, otras utilidad y otras una posibilidad de acceso. Si se mantienen en la interfaz, deben aparecer como información secundaria en su eje correspondiente, no como único diagnóstico.

Para cada identidad de Main, Extra, Side o Reserva evaluar **tres ejes distintos** (puede haber varias etiquetas compatibles por carta):

1. **Relación con el deck:** `ENGINE` (pieza constitutiva del motor y su salida), `DIRECTA/COMPLETA` (efecto o recurso que enlaza concretamente con otra pieza), `INDIRECTA` (material, coste, munición, objetivo o habilitador justificable), `CONDICIONAL` (exige recurso, ventana, otra carta o estado legal que no siempre existe), `CONFLICTO` (restricción o bloqueo demostrado) y `CERO_SINERGIA_DEMOSTRADA` (solo si, tras revisar todas las funciones y zonas disponibles, no existe función viable). En caso de evidencia incompleta elegir `SIN_EVIDENCIA_SUFICIENTE` y no declarar cero.
2. **Función táctica:** starter, buscador, extensor, protección, negación/interrupción, removal/board breaker, recuperación, finalizador, material, descarte, sacrificio, destierro, envío como recurso, objetivo de efecto o función autónoma/staple. No exigir que todas las cartas sean invocadas: las que se envían desde Extra, equipan, se usan como material, son descartadas o interrumpen pueden tener utilidad real sin invocación propia.
3. **Estado de evidencia:** `VALIDADO_LOGICO` con texto oficial y contexto comprobados, `DOCUMENTADO_CONDICIONAL` con sus supuestos precisos, `NO_VERIFICADO` cuando falta contraste, `INCOMPATIBLE` cuando hay impedimento cierto; la **prueba física** es responsabilidad del usuario, no una tarea de IA ni denominador de avance. Un rótulo de origen (`EXTRAÍDO_DE_TEXTO`) no es validación ni grado de sinergia.

**Regla de decisión individual:** (a) comprobar carta, copias, zona y formato; (b) identificar su efecto aplicable y la función concreta; (c) demostrar origen→destino/resultado, requisito, coste, ventana, restricción y otra carta presente cuando haga falta; (d) contrastar con A07 antes de considerar la relación ejecutable; (e) explicar un fallo o condición y conservar el grado de evidencia; (f) justificar `CERO_SINERGIA_DEMOSTRADA` solo con descarte fundado de invocación, envío, material, descarte, destierro, sacrificio, acceso al Extra y utilidad autónoma. La ausencia de ruta A09 por sí sola **no** demuestra sinergia cero. El porcentaje de cartas clasificadas mide cobertura documental, no sinergia, victorias ni jugabilidad probada.

**UI solicitada:** tres filtros combinables: «Tipo de relación», «Función en este deck» y «Estado de comprobación». La ficha visible explica con nombres y fotos reales **por qué** se asignó la etiqueta, qué permite hacer, qué necesita, cuándo conviene y qué limitación puede impedirlo. Si una vista o filtro no está implementado todavía, registrarlo como pendiente: esta especificación no acredita que la plataforma ya lo muestre.

1. **Motores y auditoría de cartas:** listado distinguible de principal, secundarios y apoyo, con starters, extensores, recursos, restricciones y **filtro de todas las cartas por zona, clasificación de compatibilidad y decisión**. Seleccionar una carta muestra su razón concreta de inclusión/no inclusión en el motor, no un simple porcentaje de afinidad.
2. **Mapa de sinergias:** grafo legible de cartas/habilidad y conexiones etiquetadas. Seleccionar un nodo enfoca sus conexiones; seleccionar una conexión abre la ficha de relación (acción, condición, coste, restricción, evidencia) y no un combo supuesto.
3. **Dependencias y restricciones:** condiciones necesarias, conflictos, límites, redundancias y avisos asociados a la relación seleccionada.
4. **Recuperación y Extra Deck:** vínculos de reciclaje y destinos reales del Extra con requisitos. Si no hay Extra, mostrar la causa de `NO_APLICA`; Skill Rush se presenta en el mapa y en sus conexiones, no como carta robable.

La navegación puede enlazar desde una relación chequeada hasta una **guía A09–A10 ya certificada**, si existe. No repetir dentro de A06 los pasos ni el tablero final. El mapa es fotográfico: usar imágenes reales del inventario y `FOTO_PENDIENTE` cuando falten; no sustituir por imágenes de otra carta.

## Política V58 de ingesta privada y publicación

A06 es contenido **principal** en «Cartas y sinergias», integrado dentro de
«Estilo y estrategia». Los motores, nodos y relaciones con `[~] PARCIAL` o
`CONDICIONAL` pueden conservarse **solo como borradores privados etiquetados**
si existe un destino nativo compatible y Miguel autoriza la escritura.
**Publicar al jugador** exige evidencia, identidad, versión, imagen y check
individual. Nunca reinterpretar una relación como combo legal sin ficha A09,
guía A10 y verificación A11–A13. Si falta destino nativo, pedir decisión en vez
de inventar estructura. Los estados internos nunca son títulos de la vista.

## Criterios de cierre del apartado

- Hay una fila evaluada por **cada** identidad en Main/Extra/Side/Reserva; se justifican explícitamente las independientes, recursos a descartar/desterrar y cartas sin sinergia demostrada. Se verifica la igualdad del conteo con A04/A05.
- La **única matriz canónica de trazabilidad en A06** cubre todas las identidades por zona, enlaza las fichas A05, jugadas A08 y combos/variantes A09 realmente acreditados, registra ausencias y estados y coteja enlaces en ambos sentidos; Side y Reserva jamás se convierten en cartas activas sin el escenario autorizado correspondiente.
- Todos los motores identificables del inventario tienen starters, objetivos, piezas, interacciones, salida, fallo y estado real; se explica por qué una pieza sin relación útil no aparece en el mapa. No se obliga a afirmar múltiples motores cuando solo hay uno funcional.
- Cada relación propuesta tiene ficha, dirección, rol, dependencias y estado individual; no existen aristas anónimas ni cartas ajenas al inventario activo (Side solo con cambio explícito entre duelos; Reserva solo como hipótesis no publicable).
- Las relaciones con Extra/Skill respetan zona, requisitos y disponibilidad real.
- Se identifican enlaces parciales y próximos pasos precisos de verificación, sin declarar combo certificado por clasificación editorial.
- Diagnóstico global de compatibilidad, candidatos concretos o `ALTERNATIVA_NO_DEMOSTRADA`, contrapartidas y propuestas **sin cambio automático** de listas; nunca se declara 100 % de sinergia por completar una tabla.
- La representación fotográfica y las cuatro vistas quedan especificadas, con enlaces válidos o `FOTO_PENDIENTE` sin afirmar finalización visual.


## Puerta obligatoria de checklist por deck — A06 (revisión 21-11-2026)

Este módulo se aplica **únicamente al deck identificado por `deck_id` + formato + inventario aprobado**, sin trasladar evidencia ni estado de otros decks. Se mantiene **una sola lista canónica por deck** dentro del archivo `DECK_*_CONTENIDO_CURADO.md` ya existente, bajo `CONTROL_DE_TAREAS_A01_A10` (o sección equivalente existente); no crear documentos/JSON de seguimiento por fase ni archivos de prueba por carta. Cada ejecución o reanálisis actualiza esa lista y devuelve el estado **de todas las tareas A01–A10A** para ese deck, incluyendo tareas terminadas con evidencia y pendientes concretas. A10B se muestra aparte como opcional; nunca se ejecuta implícitamente.

**Checklist A06 — obligatorio, chequeable y con evidencia:**
- [ ] **A06-T01** — Describir cada motor y su dependencia entre cartas/recursos. Evidencia: `PENDIENTE`.
- [ ] **A06-T02** — Verificar enlaces y bloqueos entre motores propios y Extra. Evidencia: `PENDIENTE`.
- [ ] **A06-T03** — Registrar plan primero/segundo, recuperación y alternativas desde el inventario real. Evidencia: `PENDIENTE`.

**Regla de cierre:** `[x]` únicamente si el entregable está realmente completo, con CID/IDs, fuente y prueba documental/estructural correspondientes; `[ ]` significa pendiente y debe enumerar el motivo, elemento afectado y acción necesaria. `NO_APLICA` solo con justificación verificable. No declarar una tarea o apartado `COMPLETA` si alguna de sus obligaciones está parcial o sin verificar. Si no hay medios para completar un ítem, mantener el apartado **ABIERTO/BLOQUEADO**, sin presentar un falso cierre. A01–A10A son **obligatorios** para la entrega normal; A10B **no bloquea** A10A ni la importación de guía. La evidencia de una guía no certifica calculadora. Al finalizar cualquier módulo, presentar siempre recuento de tareas cerradas, checklist del apartado y lista íntegra pendiente A01–A10A; si A10B fue solicitado, reportarlo por separado.

**Datos transversales de carta reutilizables:** A05–A09 documentan exhaustivamente todas las cartas y sus efectos (identidad, CID, zonas, procedimiento versus activación, condiciones, disparador, timing, coste, target, elección, resolución, restricciones, respuesta, once-per-name/turn, cadenas, estado antes/después, recursos, sinergias y evidencia oficial), útiles para guía, análisis físico y eventual calculadora. **Preparar estos datos no significa ejecutar, compilar, sincronizar ni probar la calculadora**: eso queda exclusivamente en A10B. El único paquete estructurado del deck sigue siendo `datos/stationx-deck.json` cuando corresponda; Markdown/HTML son representaciones, imágenes recursos.


## Checklist obligatorio por deck A06 — control de entrega

Para cada `deck_id` y formato, completar y marcar en `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente, nunca en informes ni ficheros adicionales:
- [ ] **A06-T1** Motores y relaciones dirigidas por CID; evidencia por ID/fuente: pendiente hasta verificar.
- [ ] **A06-T2** Sinergias, requisitos y restricciones verificables; evidencia por ID/fuente: pendiente hasta verificar.
- [ ] **A06-T3** Planes primero/segundo, medio/tardío y recuperación; evidencia por ID/fuente: pendiente hasta verificar.
- [ ] **A06-T4** Referencias entre cartas, campo y rutas sin inventar combos; evidencia por ID/fuente: pendiente hasta verificar.

Cada `[x]` exige resultado terminado y comprobado. No marcar `COMPLETA` con tarea parcial, omitida o sin evidencia. Si no se puede completar, registrar `[ ] BLOQUEADA` con causa y siguiente acción, sin falsear la conclusión. Cada ejecución y reanálisis devuelve **listado completo A01–A10A de ese deck**, tareas acabadas, pendientes, evidencias y totales; A10B se informa aparte únicamente si se solicitó. Mantener trazabilidad de datos exhaustivos de cada carta para guía, vista visual y posterior análisis físico. Ni A05 ni A07 ejecutan o compilan el motor: **implementación, importación de reglas, pruebas de efectos y calculadora son exclusivamente A10B opcional**.

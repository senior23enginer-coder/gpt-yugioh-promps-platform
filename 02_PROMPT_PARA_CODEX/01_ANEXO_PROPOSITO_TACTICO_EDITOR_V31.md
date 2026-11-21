# Anexo obligatorio — propósito táctico, sinergias y editor

## Aplicación vigente: ficha táctica desde el mismo lenguaje causal (21-11-2026)

Este anexo se aplica a A01–A10A; A10B es opcional y se activa exclusivamente con solicitud del usuario. **No escribir explicaciones tácticas que contradigan la especificación física causal A05/A07 ni crear otra semántica para el editor.** Toda recomendación «qué hacer / por qué / cuándo / con qué coste / qué puede fallar» enlaza `deck_id`, `card_id`/`cid`, `effect_id`, `route_id`/`step_id`, fuente y estado `DOCUMENTADO_CON_FUENTE` o `CASO_LOGICO_VERIFICADO`. Ningún control visual ejecuta reglas por mostrar una fotografía.

**Chequeos por deck, integrados en A01/A06/A08/A09/A10A:** [ ] no hay propósitos genéricos en ficha; [ ] cada consejo declara precondición física, coste, recursos, riesgo y límites; [ ] los enlaces del editor conducen al paso/effect_id correcto; [ ] respuestas a interrupciones sólo contienen consecuencias documentadas; [ ] las guías reproducen fielmente la matriz de casos lógicos preparada por GPT. Estos controles son criterios internos de las tareas canónicas de cada apartado: no abrir otro archivo de checklist, no marcar su éxito sin evidencia.

**A10B:** traduce y ejecuta las reglas admitidas por Platform desde la misma especificación; la mejora del motor jamás reemplaza ni altera silenciosamente el propósito documentado. Un operador faltante se registra aparte; no obliga a fabricar otra investigación de la carta.


Fuente: texto facilitado por el usuario el 15 de noviembre de 2026. Este contenido es un **contrato editorial y de interfaz**, no una certificación de combos ni una modificación de las listas físicas. Se aplica a los **16 decks documentados** y futuros cuando corresponda; los 11 originales constituyen un corte histórico. Su incorporación al prompt no realiza cambios en Station X ni en los datos de jugadas.

STATION X — PROPÓSITO TÁCTICO ESPECÍFICO DE CADA JUGADA
Fecha: 15 de noviembre de 2026
Instrucción complementaria para preparar información e integrarla en la plataforma.

1. OBJETIVO Y ALCANCE

Aplicar este requisito a TODAS las jugadas de TODOS los decks actuales y futuros:
combos completos, aperturas, extensiones, continuaciones, respuestas situacionales,
alternativas, recuperaciones y estrategias. Incluye las jugadas ya cargadas y las
creadas o editadas manualmente. Respetar las diferencias entre TCG, Rush y otros
formatos registrados, así como las Skills externas.

El jugador debe entender QUÉ pretende la jugada, CÓMO lo consigue, PARA QUÉ sirve,
POR QUÉ conviene elegirla y CUÁNDO tiene sentido. Enumerar las cartas finales o
decir «romper campo» no explica su propósito.

Este TXT establece un requisito editorial y de presentación. Su incorporación no
significa que los propósitos existentes ya se hayan reescrito o publicado. En una
ejecución posterior se deberá actualizar la fuente de cada ruta y su representación
en la plataforma, conservando el identificador original y las revisiones del editor.

2. ETIQUETA DE FILTRO Y EXPLICACIÓN SON COSAS DISTINTAS

Se pueden conservar etiquetas como «Romper campo», «Control», «Ofensiva», «Defensa»,
«Recuperación» o «Extensión» para filtrar. NUNCA serán toda la explicación.

No aceptar como propósito completo: «ganar ventaja», «poner negadores», «hacer daño»,
«preparar recursos», «invocar X», «controlar», «OTK» o «terminar en X» sin describir
el mecanismo, la amenaza o necesidad atendida, sus condiciones y el resultado útil.

3. CONTENIDO OBLIGATORIO POR JUGADA

A. Finalidad principal
   Qué problema resuelve o qué oportunidad aprovecha. Explicar la prioridad: quitar
   una amenaza, impedir una acción concreta, proteger un recurso, sobrevivir, preparar
   respuesta rival, habilitar ataques, recuperar el motor o continuar tras interrupción.

B. Orientación táctica
   Identificar si es ofensiva, defensiva, de preparación/control, de recuperación o
   mixta, y justificarlo con lo que realmente hace. Puede tener finalidad principal
   y secundaria distintas. Ser condicional es otro dato: indicar además la situación
   que habilita la línea, sin confundir «condicional» con «ofensiva» o «defensiva».

C. Cómo consigue el objetivo
   Nombrar las cartas y los efectos o procedimientos documentados que producen el
   resultado. Indicar sobre qué carta, recurso, zona o acción actúan y mediante qué
   operación: destruir, desterrar, devolver, tomar control, negar, proteger, buscar,
   Invocar, recuperar, modificar recursos o habilitar una continuación.
   Identificar el paso decisivo y enlazarlo con la secuencia existente.

D. Para qué sirve el resultado y por qué elegir esta línea
   Explicar la consecuencia práctica: qué amenaza deja de estorbar, qué acción rival
   puede responderse, qué ataques se habilitan, qué recurso se conserva o qué jugada
   posterior queda disponible. Si hay otra línea documentada, explicar la diferencia
   y el intercambio: mayor presión, protección, coste, flexibilidad o continuidad.
   Si no existe comparación suficiente, decirlo; no inventar una alternativa.

E. Condiciones y momento
   Mano y recursos necesarios, campo propio/rival relevante, turno y fase, disponibilidad
   de objetivos y materiales, efectos usados, restricciones y condición de Skill cuando
   aplique. Aclarar si busca ir primero, segundo, responder en turno rival o continuar
   en un turno posterior. No deducir esos datos solo del título de la ruta.

F. Resultado inmediato y utilidad posterior
   Separar qué ocurre al resolver la línea de qué podría ocurrir después. Describir
   monstruos, posiciones y materiales cuando consten, recursos restantes y respuestas
   realmente disponibles. Relacionar el tablero final con el propósito; una foto del
   campo no sustituye la explicación de su función.

G. Límites, coste y riesgo
   Qué consume, qué deja de poder hacerse, cuál es el punto vulnerable y qué pasa si
   no se cumple una condición o el rival responde. Ofrecer una desviación solo cuando
   exista una rama documentada con recursos reales. No llamar «alternativa ofensiva»
   o «protección» a una carta sin explicar la acción que la hace cumplir ese papel.

4. DIFERENCIAS MECÁNICAS QUE LA EXPLICACIÓN DEBE RESPETAR

- Retirar una carta no equivale a negar su efecto. Distinguir negar activación,
  negar efecto y negar Invocación cuando la ruta y la fuente lo permitan.
- Destruir, enviar al Cementerio, devolver, desterrar y tomar control son acciones
  diferentes; explicar la acción real y no intercambiarlas para embellecer el texto.
- Un monstruo presente no equivale a una negación o interrupción disponible: comprobar
  ventana, costes, materiales, límites por turno y estado relevante.
- Diferenciar respuesta preparada para el turno rival de una acción que ya resolvió.
- Presión ofensiva no equivale a daño garantizado. No prometer ataques, OTK, victoria
  o uso como material si no se demuestran las condiciones y restricciones necesarias.
- Recursos potenciales de Side/Reserva no son cartas disponibles en la mano actual.
  Una Skill externa no se roba ni se cuenta como carta del Main.
- Si falta información, concretar qué consecuencia no puede afirmarse todavía.
  Mantener la jugada visible con su estado real, sin rellenarla con frases genéricas.

5. FORMA DE REDACTAR Y MOSTRARLO

En la tarjeta de la jugada:
- Título humano específico: recurso inicial + acción decisiva + finalidad.
- «Propósito de la jugada»: dos o tres frases completas y legibles. Deben explicar
  mecanismo, beneficio y condición esencial, no repetir el título.
- Mostrar la orientación táctica como apoyo a la explicación.
- Conservar el campo final visual y enlazar «Ver cómo se consigue» al paso decisivo.
  Si la posición o un material no está documentado, no inventarlo para completar la foto.

En el detalle y el editor visual:
- Presentar los apartados Qué consigue / Cómo / Para qué y por qué / Cuándo / Resultado
  / Coste y riesgo. Los detalles extensos pueden ser desplegables; una condición que
  impide la línea debe quedar visible antes de que el jugador la interprete como viable.
- En cada paso explicar su contribución al objetivo general. Distinguir preparación,
  coste, acceso a piezas, respuesta rival y efecto decisivo; no repetir el mismo
  propósito genérico en todos los pasos.
- Cada alternativa o rama debe indicar qué cambió respecto a la principal y cuál es
  su nuevo propósito, resultado y condición. No heredar una finalidad que ya no cumple.
- Mantener el mismo significado en Guía de juego, Mis combos y estrategias, guía paso
  a paso del editor y opciones del calculador cuando esas pantallas muestren la ruta.
  Adaptar la longitud al contexto sin recortar el significado ni ocultar condiciones.

6. EJEMPLOS EDITORIALES, NO COMBOS NUEVOS NI LEGALIDAD CERTIFICADA

Insuficiente: «Romper campo».
Modelo a completar con datos de la ruta:
«Usar [carta y efecto documentados] para [operación exacta] sobre [amenaza y condición
de objetivo]. Esto permite [beneficio ofensivo, defensivo o de continuidad demostrado].
Elegir esta línea cuando [situación]; exige [recurso] y no resuelve [límite relevante]».
Los corchetes son instrucciones de trabajo: no se publican sin completar.

Para la tarjeta «Fenrir + Nacimiento: optar por Ojo Grande para tomar amenaza»:
la explicación debe identificar el efecto de la secuencia que toma el control, qué
amenaza rival cumple sus requisitos, por qué tomarla beneficia esta posición y qué
se puede hacer después según las restricciones documentadas. Aclarar si la utilidad
es quitar presión, preparar una ofensiva o disponer de un recurso. No convertirla
automáticamente en negación, ataque disponible o victoria; comprobarlo en la fuente.

Insuficiente: «Invocar Shangri-Ira y conservar Fenrir».
La revisión debe explicar qué función concreta cumple cada carta en ESA ruta, qué
acción queda disponible ahora y cuál depende de un evento futuro. Si la documentación
solo acredita la Invocación, conservar ese resultado y señalar que falta justificar
la utilidad posterior; no inventar un bloqueo o una respuesta por mera presencia.

Insuficiente: «Poner negadores».
La revisión debe identificar qué efecto puede negar qué clase de acción, en qué
ventana, con qué coste y límites. Contar únicamente las respuestas que el estado
documentado permite utilizar, explicando qué recurso deben conservar para hacerlo.

7. EJECUCIÓN Y ACEPTACIÓN PARA TODOS LOS DECKS

Cuando se solicite ejecutar este prompt:
1. Enumerar las rutas reales por deck e ID estable; incluir creaciones editadas y
   fuentes acumuladas. No limitarse al ejemplo Kashtira ni a un número fijo de jugadas.
2. Leer secuencia, requisitos, recursos, restricciones y campo final de cada ruta;
   contrastar las fuentes necesarias para sustentar su propósito específico.
3. Reescribir el propósito desde esos datos. No cambiar efectos, inventarios ni
   resultados para hacer que una etiqueta encaje. No evaluar listas de restricciones.
4. Guardar la revisión en la fuente que corresponde a la ruta y respetar las ediciones
   nativas vigentes. No basta con cambiar un texto del renderizador ni una etiqueta.
   Reutilizar campos existentes cuando permitan el significado; no inventar tablas
   o endpoints. Si hace falta ampliar el esquema, documentar el mapeo y compatibilidad.
5. Actualizar las representaciones afectadas cuando se autorice la integración.
   Conservar la versión anterior y los estados documentales; mejorar la explicación
   no convierte una ruta en certificada ni ejecuta una simulación.
6. Comprobar por ruta que se responden qué, cómo, para qué, por qué y cuándo; que el
   propósito coincide con los pasos y campo final; que la rama no promete un efecto
   ausente; y que el texto se lee completo en móvil y escritorio.
7. Entregar un listado por deck con ID, título, propósito anterior, propósito revisado,
   orientación, paso decisivo, condiciones y datos pendientes. Diferenciar revisado en
   fuente, integrado y comprobado en pantalla. No declarar toda la colección terminada
   por haber redactado tres ejemplos ni por repetir una plantilla genérica.

Regla de cierre: una categoría organiza la jugada; el propósito debe enseñar al
jugador qué decisión está tomando y qué beneficio concreto espera obtener de ella.

8. SEPARACIÓN DE COMPONENTES Y CONEXIONES EN EL EDITOR VISUAL

Requisito adicional solicitado mediante las capturas del editor: distribuir los
componentes con espacio suficiente para revisarlos individualmente y seguir sus
conexiones sin confundir filas, pasos o alternativas. Aplica a todos los decks,
jugadas importadas y creaciones nuevas.

- Separar Mano inicial, cada Paso, cada Decisión y cada Resultado. No apilar tarjetas
  borde contra borde ni colocar un resultado pegado al paso de la fila anterior.
- Calcular la distribución con el ancho y la altura reales de los nodos después de
  cargar fotografías, texto y escala. La distancia entre filas se mide desde el borde
  inferior del componente más alto hasta el siguiente, no desde coordenadas fijas
  que ignoren el contenido. Si un componente crece, reservar o reajustar su espacio.
- Mantener separación horizontal y vertical consistente, con un corredor adicional
  para flechas, sus puntas y etiquetas. Usar como referencia inicial al menos 48 px
  entre bordes a escala 100 %, ampliándolo cuando las conexiones o el texto lo exijan.
  Esa referencia no sustituye la comprobación de colisiones y legibilidad.
- Evitar que una flecha atraviese una tarjeta, sus fotografías, un botón o una
  etiqueta. Conectar desde puntos de entrada y salida identificables; la punta debe
  mostrar claramente a qué paso llega. El punto de conexión no debe tapar el título.
- Usar recorridos por los espacios libres del lienzo. Cuando una secuencia pase a
  otra fila, llevar la conexión por el margen o corredor reservado, sin recorrer
  el interior de los pasos intermedios. Minimizar cruces y retrocesos innecesarios.
- Separar visualmente las ramas de decisión y poner la condición cerca de su flecha,
  con espacio y contraste. No superponer «Continuar» o «Resultado» sobre otra línea.
  Distinguir la secuencia principal de alternativas y retornos con texto e indicadores,
  sin depender exclusivamente del color.
- Mantener el orden de lectura evidente mediante numeración y dirección de flechas.
  Si hay varias filas, indicar su continuidad; no obligar a adivinar si se leen en
  zigzag, de izquierda a derecha o de arriba abajo.
- Incorporar una acción explícita «Organizar diagrama» que distribuya nodos y rutas
  de conexiones. Aplicarla al convertir una jugada importada en un diagrama inicial.
  Respetar las posiciones manuales guardadas: no reorganizar una creación existente
  silenciosamente cada vez que se abra. La organización debe poder deshacerse.
- Arrastrar o editar un nodo debe actualizar sus conexiones sin alterar pasos,
  condiciones ni relaciones lógicas. Separar visualmente no significa cortar aristas,
  cambiar el orden del combo, duplicar cartas o crear movimientos nuevos.
- Conservar un zoom de lectura útil y permitir ajustar el diagrama a la vista.
  Encoger toda la creación a 65 % o menos no resuelve por sí solo la falta de espacio.
  El texto completo debe poder consultarse al seleccionar o ampliar un paso.
- En móvil, priorizar un recorrido vertical legible y mantener accesible la guía
  paso a paso. El lienzo puede permitir desplazamiento y zoom dentro de su contenedor;
  la página completa y los controles no deben desbordarse horizontalmente.

Comprobaciones al implementar esta conexión visual:
1. Revisar diagramas cortos, largos, con textos de distinta altura, varias filas y
   ramificaciones, incluidos los ejemplos de las capturas.
2. Comprobar que no se intersectan los rectángulos visibles de los nodos, que las
   conexiones no atraviesan componentes ajenos y que las etiquetas no se solapan.
3. Probar arrastre, edición, organización, deshacer, zoom y guardar/reabrir; verificar
   que se conservan posiciones manuales y las mismas relaciones de origen/destino.
4. Verificar en escritorio y móvil que se puede identificar cada paso y seguir una
   flecha desde su origen hasta su destino sin que otra tarjeta la oculte.
5. Registrar pendientes reales si una disposición no puede resolverse; no declarar
   el diagrama organizado porque todos los nodos existan dentro del lienzo.

Esta sección se ejecutará al implementar u organizar el editor. Añadirla al prompt
no equivale a haber modificado o desplegado la interfaz actual.

9. CATEGORÍAS COMPRENSIBLES DE CARTAS Y SINERGIAS

Separar «Conexión con el deck» de «Qué aporta a la jugada». No usar como explicación
única «Relaciones específicas documentadas» o «Función autónoma extraída de texto».
La primera describe el vínculo; la segunda debe explicar su utilidad concreta.

Conexiones: Sinergia directa; Apoyo indirecto o recurso; Sinergia condicionada;
Conflicto o incompatibilidad; Staple / respuesta independiente; Conexión por
documentar; Acceso no disponible con esta lista cuando falten materiales registrados.
Elegir según relaciones, restricciones y recursos documentados. Una carta puede
tener conexiones favorables con unas cartas y un conflicto con otras.

Mostrar con qué cartas conecta y abrir el mecanismo y sus condiciones en la ficha.
Las funciones deben poder filtrarse por utilidad: buscar/acceder al Deck, desarrollar
campo, preparar Cementerio, gestionar destierro, responder/interrumpir, equipamientos
y acceso a los materiales de cada tipo de Invocación. Son funciones descritas; no
afirman que una Invocación esté disponible en cualquier estado del duelo.

Una conexión por documentar no equivale a carta inútil ni prueba que no exista
sinergia. Una staple puede cumplir una función independiente sin pertenecer al
arquetipo. No presentar un conflicto como sinergia positiva ni usar una etiqueta de
documentación como certificado reglamentario. Mantener Side y Reserva separados.

10. FICHA DE CARTA Y PARTICIPACIÓN REAL EN JUGADAS

Explicar para qué sirve, sus acciones por separado, cómo usarla primero/segundo y
qué condiciones, costes, límites e interrupciones debe comprobar el jugador.
Desarrollar abreviaturas de lectura como GY y CL1/CL2 sin cambiar efectos. Mostrar
interacciones concretas con otras cartas del mismo deck desde las fuentes existentes.

Indexar TODOS los pasos y jugadas vigentes, incluidas extensiones y ediciones nativas.
Distinguir activación, carta buscada, objetivo, material, Invocación y presencia en
un estado. Un material de Xyz no es la carta Xyz Invocada; aparecer en una foto del
campo no acredita haber activado su efecto. Una referencia sin paso identificado
se presenta como referencia, no como una acción demostrada.

Cada enlace debe identificar el papel de la carta, el número de paso y su acción.
Al abrirlo, señalar el paso y la carta correspondiente, incluido el Paso 1, explicar
por qué se llegó allí y permitir volver a su ficha conservando la consulta.
Si una edición guardada quitó la carta, no conservar su participación por un enlace
histórico. No asignar relaciones por parecido de nombres o imágenes ambiguas.

11. BOTON VOLVER DEL CREADOR DE COMBOS Y ESTRATEGIAS

Mostrar en la cabecera del creador un boton claramente identificable como "Volver",
visible y utilizable en escritorio y movil. Debe regresar a la pantalla desde la que
se abrio el creador y conservar el contexto del deck cuando corresponda.

Respetar la navegacion interna de la plataforma: si esta reemplaza el historial,
no depender exclusivamente de history.back(). Registrar la pantalla de origen.
Si se entra mediante un enlace directo y no hay origen conocido, volver a una
pantalla interna valida; no enviar al usuario a un sitio externo inesperado.

Si hay cambios sin guardar, pedir confirmacion antes de salir. Cancelar mantiene
al usuario en el editor con su contenido. No guardar, descartar ni sobrescribir
una creacion silenciosamente al pulsar Volver. En una navegacion interna que
conserve el borrador, mantenerlo disponible sin afirmar que ya esta guardado.

Probar regreso a la ficha de un deck, ingreso directo al creador, cancelacion con
cambios sin guardar y uso en movil/escritorio. No confundir este boton de pantalla
con "Anterior" de la guia paso a paso ni con "Volver a la ficha" desde una jugada.

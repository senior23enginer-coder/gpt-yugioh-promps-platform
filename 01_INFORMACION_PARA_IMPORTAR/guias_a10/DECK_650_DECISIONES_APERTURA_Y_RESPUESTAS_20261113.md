# Elfnote — decisiones tácticas vinculadas a cartas reales (A05, A06, A07, A08, A09 y A10)

**Propósito:** conectar las fichas documentales del deck 650 con elecciones verificables. No altera inventario ni declara terminados los 29 casos de cobertura.

## Tabla de decisiones según la mano

| Estado observado | Elección prioritaria | Para qué sirve | Qué NO debe ofrecer la plataforma |
|---|---|---|---|
| Lucina (22116) y Medius (21419) en mano, campo vacío | Lucina al centro por Especial; Normal Medius lateral; buscar Power Patron (22119) a mano; si se desea interacción Link, usar ambos para S:P (19188) | Llegar a S:P sin quedar bloqueado por Patron en campo | Destierro de S:P al invocarla: sus materiales no son del Extra |
| Solo Medius en mano, campo vacío | Normal Medius; añadir Patron a mano **o** Invocarlo al campo según salida deseada | Buscar recurso o establecer un cuerpo | Prometer una segunda Normal de Patron; realizar Link tras poner Patron en campo |
| Harmonia (22533) en mano, rival activa efecto de monstruo controlado | Revelar Harmonia y número real de Sincros disponibles; escoger 2/4/6 cartas mostradas conforme al efecto | Interacción escalonada con cuerpo, envío y posible destrucción | Atribuir negación de CL1, destruir si no se mostró el umbral suficiente |
| Vidolium (22519) en mano, Patron disponible en mano/GY | Colocar Vidolium en Péndulo y elegir opción de destruirse/Invocar Patron | Recuperar una pieza específica | Invocar el propio monstruo Vidolium como si no exigiera sus tres tipos Extra |
| Nervedo (22520) y no hay Nerva en Extra cargado | Presentar **bloqueo de destino**, sin seguir la Fusión | Evitar combo inventado y proponer otra línea real | Dibujar Nerva Invocada o agregarla silenciosamente al Extra |
| Magnamhut (17762) en mano, objetivo LUZ/OSCURIDAD en GY | Desterrar objetivo válido para Invocar, si se cumplen ventana y condición del turno | Interferir con GY y crear un Dragón propio | Describirlo como negación del efecto rival o robo inmediato |

## Interrupciones: árbol de decisión operativo

1. **Rival activa Ash al efecto de Medius:** no añadir ni Invocar Patron del Deck. Si abriste Lucina + Medius, ambos monstruos pueden seguir permitiendo la Link a S:P; si solo abriste Medius, no presentar esa Link como ejecutable.
2. **Rival activa Impermanence sobre Lucina:** verificar si la Special desde mano ya ocurrió, distinguir Invocación realizada de efectos activados. Negar a Lucina no elimina automáticamente su cuerpo: evaluar si la Link sigue legal con los dos monstruos presentes.
3. **Se controla Elfnote Power Patron:** comprobar el bloqueo únicamente Sincro desde Extra **antes** de mostrar Link/Fusión/Xyz. El bloqueo existe por control del monstruo, no simplemente por tenerlo en mano.
4. **Rival usa Droll después de una incorporación desde Deck:** no permitir nuevas incorporaciones del Main Deck a mano durante ese turno; no cancelar retroactivamente la primera incorporación ni restringir acciones distintas que no añadan desde Deck a mano.
5. **Harmonia responde a efecto rival:** resolver cadena de atrás hacia adelante. Si Harmonia destruye un monstruo, **no asumir** que el efecto ya activado queda negado: revisar su fuente y condiciones al resolver.
6. **Rival retira objetivo de Magnamhut antes de resolver:** no presentar cuerpo Invocado por el efecto sin el destierro de objetivo requerido. Valorar pasar a una línea de centro Elfnote con la Normal si sigue disponible.

## Entrenamiento de situaciones ligado a las fichas A09: manos y resultados comparables

| Ejercicio | Mano inicial | Victoria técnica del ejercicio | Fracaso o bloqueo correcto |
|---|---|---|---|
| EF-01 | Lucina + Medius | S:P en campo y Patron en mano si resolvió búsqueda; materiales al GY | Usar destierro on-summon de S:P con dos materiales Main |
| EF-02 | Lucina + Medius | Misma S:P con búsqueda de Medius negada, sin Patron en mano | Añadir Patron pese a Ash |
| EF-03 | Medius únicamente | Medius propio y Patron en mano; Normal consumida | Invocar Normalmente Patron inmediatamente |
| EF-04 | Medius únicamente | Medius y Patron en campo, con bloqueo Sincro aplicable | Invocar Link desde Extra mientras se controla Patron |
| EF-05 | Harmonia + Extra con 5 Sincros revelables | Mostrar seis cartas incluyendo Harmonia; aplicar umbrales correspondientes | Destruir sin cumplir requisito o negar CL1 sin efecto negador |
| EF-06 | Nervedo, sin Nerva en Extra | Reportar el destino ausente y detener ruta | Agregar Nerva o mostrar una Fusión ficticia |

### Guía visual A10 y control de replay externo

- La imagen de cada carta procede de `imagenes/tcg/<CID>.jpg`; separar de imágenes Rush PNG.
- Cada panel tiene título de propósito, mano, zonas, pasos, coste o restricción, estado final y rama si rival responde. Mostrar **bloqueado** en vez de una carta inexistente.
- Calificación competitiva solo cuando existan muestras de manos y resultados de simulación, sin inventar porcentajes. Al finalizar cada ejercicio, indicar si fue `texto_oficial_cotejado`, `documental_condicional`, `replay_aprobado` o `replay_fallido`.

**Fuentes de efectos:** fichas oficiales CID [22116](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22116&ope=2&request_locale=en), [21419](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21419&ope=2&request_locale=en), [22119](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22119&ope=2&request_locale=en), [19188](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19188&ope=2&request_locale=en), [22533](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22533&ope=2&request_locale=en) y los CID adicionales ya listados en el dossier `DECK_650_LOTE_GRANDE_MAIN_20261113.md`.

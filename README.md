# Station X — Prompts y entregas de Yu-Gi-Oh

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
su inventario original, e incluye **346 variantes ejecutables acotadas
agrupadas en 55 IDs de efecto** dentro de `record.calculator`. Las distintas
variantes de un efecto comparten su límite de uso por turno. La plataforma debe
validar `station-x-calculator/1`, conservar definiciones de respaldo no
importadas y rechazar duplicados exactos o políticas incompatibles. Las
variantes se cotejaron con las reglas de respaldo verificadas en la rama
`base` de Station X; **no certifican todos los efectos ni la legalidad general de las cartas**. C01–C10 tienen replays acotados: C10 certifica Secuencia + Duque + Angbruja y Normal inmediata sin repetir la búsqueda; C09 certifica el procedimiento físico de Princesa Necroequipo sin robo gratuito; C08 requiere activación rival observada, sin resolver su efecto original; quedan 2 rutas sin replay certificado. La fotografía de los 69 pasos y los
12 tableros finales ilustrativos se mantiene enlazada por CID con el paquete,
sin afirmar ubicaciones físicas exactas (`spatial_verified=false`).

La variante adicional **Gran Fuga Moto Goblin** (CID 20533) implementa dos
ventanas de activación de su primer efecto: desde la mano propia o desde una
copia colocada en un turno anterior. Tributa un monstruo propio como coste,
Invoca un Goblin real del Deck y le impide atacar ese turno. Las pruebas
verifican el coste, el bloqueo de ataque, la negación y las ventanas temporales.
Su segundo efecto requiere un Xyz «Goblin» que no está en el Extra de este deck.
**30/39 identidades** tienen al menos una regla de actor; faltan 9 y siguen
2 replays A09 restantes por certificar; C01–C07, C09 y C10 cuentan con pruebas sin respuesta rival, C08 es condicional a activación rival observada.

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

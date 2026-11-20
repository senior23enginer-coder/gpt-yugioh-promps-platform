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
su inventario original, e incluye **233 variantes ejecutables acotadas
agrupadas en 42 IDs de efecto** dentro de `record.calculator`. Las distintas
variantes de un efecto comparten su límite de uso por turno. La plataforma debe
validar `station-x-calculator/1`, conservar definiciones de respaldo no
importadas y rechazar duplicados exactos o políticas incompatibles. Las
variantes se cotejaron con las reglas de respaldo verificadas en la rama
`base` de Station X; **no certifican todos los efectos de las cartas ni
las 12 rutas A09 completas**. Tampoco se alteraron imágenes ni campos finales.

### Guias y recursos por deck

Cada carpeta de deck conserva sus guias e infografias. El ZIP individual incluye los archivos del deck y el seguimiento permanece en el registro privado.

No incluir código de la tienda, credenciales, configuraciones privadas ni datos operativos de producción. No eliminar prompts protegidos ni crear informes paralelos por versión. Los cambios se controlan mediante commits de Git.

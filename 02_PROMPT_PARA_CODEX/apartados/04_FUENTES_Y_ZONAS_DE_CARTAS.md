# Apartado 04 — FUENTES Y ZONAS DE CARTAS

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_04`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

**Autocontención del ZIP por deck:** al preparar una entrega incremental, copiar a la **carpeta individual del deck** solo las imágenes, guías y datos que sus fichas realmente citen. Mantener referencias relativas internas verificables, cotejar el CID y evitar rutas absolutas, enlaces a otros decks o dependencias del ZIP completo. No copiar todas las imágenes generales por comodidad, no inventar archivos faltantes y no enviar instrucciones de control editorial en `01_INFORMACION_PARA_IMPORTAR`. Si falta un recurso necesario, dejar el A04 local en pendiente antes de declarar importable ese deck.

## Instrucción editorial específica

### Entregable A04 — biblioteca fotográfica real y mapa de zonas

Para **cada identidad** del inventario, registrar foto oficial/local por CID o \`FOTO_PENDIENTE\`; comprobar que el archivo abre, pertenece a la carta y vive dentro de la carpeta individual. Los campos \`record.cards[*].image\` y \`full_image\` apuntan a recursos locales permitidos que el importador de Station X pueda resolver, no a enlaces temporales de repositorios externos. No copiar fotos de Kashtira u otro deck por parecido del nombre. Definir el mapa de disponibilidad: Main (mano/Deck), Extra (procedimiento y materiales), Side (solo tras sustitución), Reserva (no jugable todavía), Skill Rush (recurso no robable).

Crear inventario de **zona de origen y destino** para futuras secuencias A09: mano, monstruos, magia/trampa, zona de campo, Cementerio, destierro, Extra y materiales Xyz cuando correspondan, con estado conocido/pendiente. Las imágenes no prueban por sí mismas que una carta empiece en mano ni que termine en campo. No presentar automáticamente todas las \`hand_photos\` como mano inicial.

**Prueba de aceptación A04:** 100 % de referencias de imágenes existentes y decodificables para las cartas marcadas \`FOTO_OK\`, vínculo exacto CID↔foto y separación estricta de zonas y disponibilidad. Si faltan fotos, el A04 o la cobertura visual queda PARCIAL; no falsificar un archivo para completar el ZIP.

- **Main Deck:** cartas activamente disponibles y cantidades reales.
- **Extra Deck:** monstruos de invocación permitida; un Extra vacío es válido si así consta.
- **Side Deck:** cartas que pueden incorporarse legalmente **entre duelos**, mediante un plan de sustitución concreto, no durante la partida principal por asumirlas disponibles.
- **Reserva:** propuestas o alternativas futuras, fuera del Main/Extra/Side actuales. Nunca simular una carta de Reserva como disponible sin cambio expresamente aprobado.
- **Skill/Habilidad Rush:** una entidad aparte, no robable, que no cuenta en Main/Extra/Side/Reserva, materiales ni probabilidades de mano. Para el flujo personalizado de los decks Rush de Miguel se requiere Skill recibida para declarar completo ese aspecto; Extra=0 no bloquea.

El inventario **vivo** de Station X es prioritario para cotejar ID real, formato y versión, pero **no sustituye automáticamente** las cartas y cantidades de la lista física aprobada por Miguel. Si difieren, registrar ambas fuentes y las diferencias por zona/cantidad, bloquear cambios de inventario y consultar al propietario; el catálogo histórico no es lectura de producción.

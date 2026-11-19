# Station X — Prompts y entregas de Yu-Gi-Oh

## Sincronización inicial desde Station X (decks creados por TXT)

La acción independiente **«Enviar al repositorio GPT»** de Station X crea la carpeta `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<id>_<nombre>/` solamente para decks nuevos que fueron creados mediante la plantilla TXT nativa. La operación aporta datos de identidad e inventario reales, **sin ejecutar A01–A10 ni importar contenidos a la aplicación**.

Archivos iniciales: `datos/stationx-origen.json` (huella e inventario fuente), `datos/stationx-deck.json` (contrato estructurado exportado por Station X) y `*_CONTENIDO_CURADO.md` (borrador vacío generado por la plataforma). No son estudios completados; la IA los desarrolla **manualmente** cuando el propietario lo ordena.

La sincronización se puede repetir sin duplicar archivos. Si existen estudios, guías, imágenes o `stationx-deck.json`, Station X **no los sobrescribe**. Cuando hay una discrepancia de inventario, se detiene y exige conciliación. Solo actualiza su propio archivo `stationx-origen.json` cuando el deck y la huella siguen siendo los mismos. No tocar directorios históricos de Memento (671) ni Crystron/Horus (677) en esta implementación.

La conexión GitHub usa un token de permisos mínimos del lado del servidor Station X, configurado como `STATIONX_GITHUB_TOKEN` (Contents: Read and write **solo** sobre este repositorio). Nunca publicar el token en JS, archivos de prompts, el ZIP o Git. El botón «Sincronizar listado» continúa funcionando localmente y no modifica GitHub.

Repositorio independiente del contenido de `torneos_yugioh/context/gpt/`. El código de la plataforma se mantiene en [platform-yugioh-md](https://github.com/senior23enginer-coder/platform-yugioh-md).

- `01_INFORMACION_PARA_IMPORTAR/`: entregas de decks, documentos curados, imágenes y guías.
- `02_PROMPT_PARA_CODEX/`: instrucciones generales y los 36 apartados protegidos.
- `03_COMPROBACIONES_NO_IMPORTAR/`: comprobaciones internas y registro único; no se publican como contenido de la plataforma.
- `01_INFORMACION_A_IMPORTAR/revisiones_editor/`: registro de sincronización de revisiones del editor, conservado en su ruta existente.

Este es el repositorio independiente y canónico de prompts y entregas. La plataforma **no contiene una carpeta `gpt`**, ni siquiera vacía. Sus herramientas de importación leen este clon hermano o la ubicación indicada por `YGO_PROMPTS_ROOT`. Los archivos originales se conservan sin cambios de contenido. Para importar desde la web se utiliza el ZIP individual del deck y su misma carpeta, generado por «Importar / exportar Data». No se necesita Codex para ese flujo.

Mantener separados los inventarios Main/Extra/Side/Reserva y las Skills; conservar IDs, referencias y estados documentales. La estructura de Kashtira es la referencia de organización, sin trasladar sus cartas ni sus combos a otros decks. Las instrucciones actuales excluyen las listas de cartas prohibidas/limitadas y exigen archivos importables mínimos.

### Guias y recursos por deck

Cada carpeta de deck conserva sus guias e infografias. El ZIP individual incluye los archivos del deck y el seguimiento permanece en el registro privado.

No incluir código de la tienda, credenciales, configuraciones privadas ni datos operativos de producción. No eliminar prompts protegidos ni crear informes paralelos por versión. Los cambios se controlan mediante commits de Git.

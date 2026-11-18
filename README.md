# Station X — Prompts y entregas de Yu-Gi-Oh

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

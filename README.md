# Station X — Prompts y entregas de Yu-Gi-Oh

Repositorio independiente del contenido de `torneos_yugioh/context/gpt/`. El código de la plataforma se mantiene en [platform-yugioh-md](https://github.com/senior23enginer-coder/platform-yugioh-md).

- `01_INFORMACION_PARA_IMPORTAR/`: entregas de decks, documentos curados, imágenes y guías.
- `02_PROMPT_PARA_CODEX/`: instrucciones generales y los 36 apartados protegidos.
- `03_COMPROBACIONES_NO_IMPORTAR/`: comprobaciones internas y registro único; no se publican como contenido de la plataforma.
- `01_INFORMACION_A_IMPORTAR/revisiones_editor/`: registro de sincronización de revisiones del editor, conservado en su ruta existente.

Este es el repositorio independiente y canónico de prompts y entregas. La plataforma **no contiene una carpeta `gpt`**, ni siquiera vacía. Sus herramientas de importación leen este clon hermano o la ubicación indicada por `YGO_PROMPTS_ROOT`. Los archivos originales se conservan sin cambios de contenido. Para importar desde la web se utiliza el ZIP individual del deck y su misma carpeta, generado por «Importar / exportar Data». No se necesita Codex para ese flujo.

Mantener separados los inventarios Main/Extra/Side/Reserva y las Skills; conservar IDs, referencias y estados documentales. La estructura de Kashtira es la referencia de organización, sin trasladar sus cartas ni sus combos a otros decks. Las instrucciones actuales excluyen las listas de cartas prohibidas/limitadas y exigen archivos importables mínimos.

### Guías A10 y copias por deck

Las guías Markdown de `01_INFORMACION_PARA_IMPORTAR/guias_a10/` son la **fuente editorial canónica**. Sus copias con el mismo nombre en `decks/*/guias/` se conservan para entregar cada deck de forma independiente y mantener las referencias del maestro. **Editar primero la guía compartida** y después sincronizar las copias locales; no usar enlaces simbólicos ni eliminar las guías locales.

Desde la raíz del repositorio:

```bash
python tools/sincronizar_guias_a10.py          # Comprueba diferencias, sin escribir
python tools/sincronizar_guias_a10.py --sync   # Propaga cambios a copias existentes
python tools/sincronizar_guias_a10.py          # Verifica de nuevo antes del commit/ZIP
```

La sincronización no crea guías faltantes ni toca las guías exclusivas de un deck. Si una copia local contiene cambios únicos, **revisarlos e integrarlos en la guía compartida antes de usar `--sync`**, porque ese modo sustituye el contenido local por el canónico. Los HTML, imágenes, inventarios, rutas y prompts quedan fuera de esta operación.

No incluir código de la tienda, credenciales, configuraciones privadas ni datos operativos de producción. No eliminar prompts protegidos ni crear informes paralelos por versión. Los cambios se controlan mediante commits de Git.

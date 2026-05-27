# Documentación publicable

El HTML publicable de este proyecto vive en:

`/Volumes/Disco SSD/Desarrollo/docs/fds/`

## Build de la documentacion Syntax

Para verificar que la app compila sin base path:

```bash
npm run build --prefix docs
```

Para generar la version publicable bajo `/fds`:

```bash
npm run build:fds --prefix docs
```

Ese comando aplica `NEXT_PUBLIC_DOCS_BASE_PATH=/fds`, por lo que el HTML
generado apunta a `/fds/_next/...` y los enlaces internos a `/fds/docs/...`.

Despues del build, sincronizar el contenido de `docs/out/` con la carpeta
publicable. No copiar la app Next dentro de una carpeta llamada `_next`: `_next`
debe contener solo los assets estaticos generados por Next.

**Regla:** cualquier cambio en este código que afecte a funcionalidad documentada,
precios, flujo o features debe reflejarse en ese doc en la misma sesión.

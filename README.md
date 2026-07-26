# Flowtitude Design System

Configuración fuente del Flowtitude Design System para Tailwind CSS 4 y WindPress.

Los archivos CSS de la raíz componen la configuración que se importa en WindPress y desde la que se genera el archivo instalable `.windpress`.

## Versión actual

`1.1.3`

Mantiene la misma API de clases y refuerza la compatibilidad de tipografía y espaciado fluidos con fallbacks estáticos. Los tokens que generan utilidades siguen declarados en `@theme`; los valores runtime viven en tokens internos `--ft-*`.

## Estructura

- `main.css`: entrada principal y orden de imports.
- `wizard.css`: configuración auxiliar.
- `theme/flowtitude.css`: tokens de diseño — colores, tipografía, spacing y configuración fluida.
- `base/`: reset, estilos base, enlaces, headings y `.prose`.
- `layouts/`: secciones y `content-flex`.
- `components/`: botones, cards, tipografía y componentes auxiliares.
- `utility/`: grids, flips y duraciones semánticas.
- `curso/`: lecciones del curso de FDS (versión corta y ampliada).
- `docs/`: sitio de documentación interactiva (build propio, no se publica desde aquí).
- `dist/`: paquetes `.windpress` publicados y sus checksums.

## Distribución

El archivo importable para WindPress se publica como material de release:

```txt
flowtitude-1.1.3.windpress
```

El alias habitual para cursos o instalaciones guiadas se mantiene como:

```txt
fds-core.windpress
```

## Ramas

- `main`: la fuente completa — CSS, curso y documentación.
- `windpress-dist`: histórico de la distribución WindPress, con el mismo CSS reorganizado bajo `src/windpress/`. Se conserva por trazabilidad; no se desarrolla ahí.

## Perímetro

El plugin FDS vive en su propio repositorio (`flowtitude-fds`). Este contiene la configuración fuente del sistema de diseño, el curso y la documentación.

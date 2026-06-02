# Flowtitude Design System

Configuración fuente de Flowtitude Design System para Tailwind CSS 4 y WindPress.

La fuente pública vive en `src/windpress/`. Estos archivos CSS componen la configuración que se importa en WindPress y desde la que se genera el archivo instalable `.windpress`.

## Versión actual

`1.1.3`

Esta versión mantiene la misma API de clases y refuerza la compatibilidad de tipografía y espaciado fluidos con fallbacks estáticos. Los tokens que generan utilidades siguen declarados en `@theme`, mientras que los valores runtime viven en tokens internos `--ft-*`.

## Estructura

- `src/windpress/main.css`: entrada principal y orden de imports.
- `src/windpress/wizard.css`: configuración auxiliar.
- `src/windpress/theme/flowtitude.css`: tokens de diseño, colores, tipografía, spacing y configuración fluida.
- `src/windpress/base/`: reset, estilos base, enlaces, headings y `.prose`.
- `src/windpress/layouts/`: secciones y `content-flex`.
- `src/windpress/components/`: botones, cards, tipografía y componentes auxiliares.
- `src/windpress/utility/`: grids, flips y duraciones semánticas.

## Distribución

El archivo importable para WindPress se genera fuera de este repositorio fuente y se publica como material de release:

```txt
flowtitude-1.1.3.windpress
```

El alias habitual para cursos o instalaciones guiadas puede mantenerse como:

```txt
fds-core.windpress
```

## Alcance del repositorio

Este repositorio contiene solo la configuración fuente de FDS. La documentación compilada, capturas, imágenes sociales, builds temporales y dependencias locales no forman parte del código fuente que se publica aquí.

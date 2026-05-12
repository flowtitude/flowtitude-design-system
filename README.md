# Flowtitude Design System

Este repositorio guarda la configuración fuente de Flowtitude para WindPress.

La fuente de verdad está en `src/windpress/`: esos CSS son los archivos que componen la configuración. El archivo importable `flowtitude-x.x.x.windpress` no se mantiene aquí como fuente principal; se debe generar bajo demanda en el flujo de publicación a partir de estos archivos, respetando el formato de exportación de WindPress.

## Estructura

- `src/windpress/main.css`: entrada principal y orden de imports.
- `src/windpress/base/`: base y tipografía.
- `src/windpress/theme/`: tokens y tema Flowtitude.
- `src/windpress/layouts/`: layouts reutilizables.
- `src/windpress/components/`: componentes.
- `src/windpress/utility/`: utilidades.
- `src/windpress/wizard.css`: configuración auxiliar.

## Flujo Esperado

1. Se modifican los CSS en el proyecto local `clientes/flowtitude/flowtitude-design-system`.
2. El flujo sincroniza esos archivos en `src/windpress/`.
3. El flujo genera `flowtitude-x.x.x.windpress` desde `src/windpress/` usando el formato WindPress SFS.
4. El flujo publica el archivo generado donde corresponda: descarga, noticia, comunidad y documentación.

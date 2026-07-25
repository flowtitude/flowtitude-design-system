---
proyecto: flowtitude-design-system
categoria: product
estado: active
rama: main
actualizado: 2026-07-25
proximo_paso: Renombrar components/custom.css (libera la capa `custom` como espacio del usuario) y partir la distribución en fds-core/ gestionado + fds-project.css del usuario. Después, retomar el fluid token refactor
---

# Estado — Flowtitude Design System (FDS)

> Estado vivo del proyecto. Se actualiza al cierre de cada sesión.
> Nota: el repo vive en `Desarrollo/clientes/flowtitude/flowtitude-design-system` (referenciado por symlink desde sa-workspace/projects/).

## Propósito

El sistema de diseño de Flowtitude. **Gratis, y es el lead magnet** (decisión 2026-07-25). Deja de significar "Tailwind": es un modelo de tokens con cuatro salidas — WindPress/Tailwind (la principal), Bricks nativo, Elementor y Gutenberg. Lo entrega y gestiona el **plugin FDS** (repo `projects/flowtitude-fds`), para que el usuario ya no importe el `.windpress` a mano.

**No hay versión Pro.**

## Estado actual

Rama `main`. En proceso de refactor a fluid tokens (`fee720a`, previo al refactor). La arquitectura de ~35 knobs → 50+ derivadas por `clamp()` es la que sostiene la decisión de producto: cubre ~95% de la personalización real editando un solo fichero.

## Cambios que exige la decisión del 2026-07-25

- **Renombrar `components/custom.css`.** Hoy `custom` es a la vez capa de FDS y última de la cascada. Tiene que significar sin ambigüedad **espacio del usuario**, o el primer update del plugin le borra su CSS.
- **Partir la distribución en dos zonas de propiedad**: `fds-core/` (del plugin, se reemplaza entero en cada update) y `fds-project.css` con los knobs (del usuario, nunca se reescribe). El `dist/fds-core.windpress` que ya se genera encaja sin cambio conceptual.
- **Documentar el límite de WindPress**: compila Tailwind en el navegador, no desde PHP. El plugin escribe los ficheros, pero recompilar exige que el usuario abra WindPress o el editor.
- **Curso**: el de 7 lecciones es Tailwind → pasa al track avanzado de pago. El curso gratis nuevo es "FDS con tu constructor".

## Bloqueos

- Sin README en el repo (conviene añadir uno). Ninguno funcional conocido.

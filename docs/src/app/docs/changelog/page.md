---
title: Registro de cambios
---

Historial de cambios del Flowtitude Design System.

---

## v1.1.3 — Fallbacks CSS math

### Compatibilidad
- Tipografia y spacing fluidos mantienen fallbacks estaticos cuando el navegador no soporta `clamp()`.
- El calculo fluido queda protegido dentro de `@supports` y se publica como formulas planas en tokens internos `--ft-text-*` / `--ft-spacing-*`; los tokens publicos `--text-*` y `--spacing-*` siguen dentro de `@theme`.
- La escala ya no encadena `2xl -> xl -> lg` ni `hero -> fluid-2xl -> fluid-xl`; cada token final tiene su propio `clamp()`.
- `sections.css` consume `--ft-padding-content-y-half` en lugar de calcular media seccion directamente.

### Migracion
- `layouts/section.css` puede reemplazarse completo.
- `theme/flowtitude.css` debe migrarse por bloques para no perder knobs personalizados.
- Guia paso a paso: [Migracion CSS math fallback](../migracion-fallback-css-math/).

---

## v1.0 — Version inicial

### Tokens
- Escala tipografica fluida (xs a 9xl) con `clamp()`
- Spacing fluido con 7 tokens semanticos (inner, content, stack, block, columns, section, hero)
- Fallbacks estaticos para tipografia y spacing cuando el navegador no soporta CSS math avanzado
- Paletas primary y secondary en OKLCH (11 pasos)
- ~35 knobs editables que generan 50+ tokens runtime

### Base
- Reset CSS con soporte para box-sizing, imagenes responsive
- Tipografia base (h1-h6) con font-display y tracking
- Estilos `.prose` completos (listas, tablas, blockquotes, links)
- Skip-link para accesibilidad

### Componentes
- Botones: base `.btn` con 6 variantes de color, 4 de tamano, 4 de forma
- Tipografia: 12 clases semanticas (display, heading, subheading, text)
- Cards: base con 5 tamanos y 2 estilos
- Otros: `.bg-image`, `.click-parent`, `.focus-from-child`, `.eyebrow`

### Layouts
- Secciones con spacing contextual inteligente
- Content-flex con posicionamiento en 9 puntos
- `.block-bleed` para elementos full-width

### Utilidades
- 30+ grids proporcionales (2 y 3 columnas)
- Auto-fill y auto-fit con 5 breakpoints de card
- Flip horizontal y vertical
- 6 duraciones semanticas de transicion

### Custom variants
- `parent`, `parent-hover`, `parent-focus-within`

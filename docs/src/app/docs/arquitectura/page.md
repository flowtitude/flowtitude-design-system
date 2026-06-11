---
title: Arquitectura
---

FDS se organiza en layers CSS con una separacion clara entre tokens editables (knobs) y tokens runtime generados.

---

## Layers CSS

FDS declara 6 layers en orden de cascada:

```css
@layer theme, base, layouts, components, utilities, custom;
```

| Layer | Contenido |
|---|---|
| `theme` | Tokens de diseno, colores, tipografia |
| `base` | Reset, estilos de body, tipografia HTML |
| `layouts` | Secciones, content-flex |
| `components` | Botones, cards, clases tipograficas |
| `utilities` | Grids, flips, duraciones |
| `custom` | Estilos especificos (eyebrow, etc.) |

---

## Estructura de archivos

```shell
flowtitude-design-system/
  main.css                    # Entry point
  wizard.css                  # Custom properties del wizard
  theme/
    flowtitude.css             # Knobs + tokens runtime planos
  base/
    base.css                   # Reset, body, skip-link
    typography.css             # h1-h6, links, .prose
  layouts/
    section.css                # Secciones con spacing inteligente
    content-flex.css           # Posicionamiento 9 puntos
  components/
    buttons.css                # .btn + variantes
    typography.css             # .display, .heading, .subheading, .text-*
    cards.css                  # .card + variantes
    components.css             # .bg-image, .click-parent, .focus-from-child
    custom.css                 # .eyebrow
  utility/
    core/utilities.css         # flip-w, flip-h
    layout/grid-basic.css      # Grids proporcionales + auto-fill/fit
    animations/durations.css   # Duraciones semanticas
```

---

## Knobs y tokens runtime

El patron central de FDS: variables "knob" que describen la configuracion y variables runtime que Tailwind/WindPress consumen para generar utilidades.

```css
/* KNOB - entrada de configuracion */
--ft-text-min: 1rem;
--ft-text-max: 1.125rem;

/* RUNTIME - formula plana generada */
--ft-text-base: clamp(1rem, calc(0.941092rem + 0.229885vw), 1.125rem);
--ft-text-lg: clamp(1.125rem, calc(1.018966rem + 0.413793vw), 1.35rem);
```

Esto evita que el navegador tenga que resolver cadenas largas de `var()` y `calc()`. Si cambia un knob, el generador o personalizador debe actualizar la instantanea plana de `--ft-text-*` y `--ft-spacing-*`. Antes de esas formulas, FDS declara fallbacks estaticos para que navegadores con soporte incompleto de CSS math mantengan tamanos y espacios validos. Los tokens publicos de utilidades (`--text-*`, `--spacing-*`) viven en `@theme`; las formulas runtime viven en internos `--ft-text-*` y `--ft-spacing-*`.

---

## Custom variants

FDS define 3 custom variants de Tailwind para acceder al elemento padre:

```css
@custom-variant parent (*:has(> &));
@custom-variant parent-hover (*:hover > &);
@custom-variant parent-focus-within (*:focus-within > &);
```

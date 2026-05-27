---
title: Arquitectura
---

FDS se organiza en layers CSS con una separacion clara entre tokens editables (knobs) y valores derivados.

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
    flowtitude.css             # Knobs + derived values
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

## Knobs y derivados

El patron central de FDS: variables "knob" que el usuario puede editar, y variables "derived" que se computan automaticamente.

```css
/* KNOB — el usuario edita esto */
--ft-text-min: 1rem;
--ft-text-max: 1.125rem;

/* DERIVED — se calcula solo */
--ft-text-base: calc(var(--ft-text-value) * var(--ft-text-factor));
--ft-text-lg: calc(var(--ft-text-base) * var(--ft-type-step));
```

Esto permite que un cambio en un knob propague a toda la escala tipografica o de spacing en navegadores modernos. Antes de esos derivados, FDS declara fallbacks estaticos para que navegadores con soporte incompleto de CSS math mantengan tamanos y espacios validos. Los tokens publicos de utilidades (`--text-*`, `--spacing-*`) viven en `@theme`; los calculos runtime viven en internos `--ft-text-*` y `--ft-spacing-*`.

---

## Custom variants

FDS define 3 custom variants de Tailwind para acceder al elemento padre:

```css
@custom-variant parent (*:has(> &));
@custom-variant parent-hover (*:hover > &);
@custom-variant parent-focus-within (*:focus-within > &);
```

---
title: Knobs y derivados
---

El sistema de tokens de FDS se divide en dos categorias: knobs (editables) y derived (computados automaticamente).

---

## Knobs de viewport

```css
--viewport-min: 410px;   /* Viewport minimo para interpolacion */
--viewport-max: 1280px;  /* Viewport maximo para interpolacion */
```

---

## Knobs de tipografia

```css
--ft-text-min: 1rem;
--ft-text-max: 1.125rem;
--ft-type-step-min: 1.125;
--ft-type-step-max: 1.2;
--ft-text-factor: 1;
```

---

## Knobs de spacing

```css
--ft-space-min: 0.5rem;
--ft-space-max: 1.5rem;
--ft-space-step-min: 1.3;
--ft-space-step-max: 1.5;
--ft-space-factor: 1;
```

---

## Knobs de layout

```css
--ft-container: 90%; /* fallback */
--ft-padding-content-x: 1rem;
--ft-padding-content-y: var(--spacing-section);
--ft-padding-content-y-half: 1.2675rem; /* fallback */
--ft-gap-content: var(--spacing-block);
```

En navegadores modernos, `--ft-container` se mejora dentro de `@supports` a `min(var(--container-7xl), 90%)`, y `--ft-padding-content-y-half` pasa a `calc(var(--ft-padding-content-y) / 2)`. Los derivados fluidos se recalculan en variables internas `--ft-text-*` y `--ft-spacing-*`; los tokens publicos `--text-*` y `--spacing-*` permanecen en `@theme`.

---

## Knobs de componentes

```css
/* Card widths */
--ft-card-xs: 12rem;
--ft-card-sm: 14rem;
--ft-card-md: 18rem;
--ft-card-lg: 24rem;
--ft-card-xl: 36rem;

/* Buttons */
--btn-py: 0.6em;
--btn-px: 1.75em;
--btn-primary-color: var(--color-neutral-100);
--btn-secondary-color: var(--color-neutral-100);
```

---

## Como funciona la derivacion

FDS declara primero valores estaticos seguros para tipografia y spacing. Despues, si el navegador supera el bloque `@supports`, activa los valores derivados fluidos internos.

El valor fluido intermedio (`--ft-fluid-t`) interpola linealmente entre 0 y 1:

```css
--ft-fluid-t: calc(
  (100vw - var(--viewport-min)) /
  (var(--viewport-max) - var(--viewport-min))
);
```

Cada token derivado usa `clamp()` para mantenerse dentro de sus limites:

```css
--ft-text-value: clamp(
  var(--ft-text-min),
  calc(var(--ft-text-min) + (var(--ft-text-max) - var(--ft-text-min)) * var(--ft-fluid-t)),
  var(--ft-text-max)
);
```

{% callout title="Editar solo los knobs" %}
Nunca modifiques las variables derivadas fluidas directamente. Cambia los knobs y el sistema recalcula todo automaticamente en navegadores modernos. Si cambias los defaults de los knobs, revisa tambien los fallbacks estaticos para navegadores sin CSS math completo.
{% /callout %}

---

## Que tocar segun el problema

| Problema visual | Primer knob a revisar | Segundo ajuste posible |
|---|---|---|
| Todo el sitio se ve pequeno | `--ft-text-factor` | `--ft-text-max` |
| Los titulos grandes rompen en mobile | `--ft-type-step-min` | Usar `.display-sm` en lugar de `.display` |
| Desktop necesita mas jerarquia editorial | `--ft-type-step-max` | `--ft-text-max` |
| La pagina se siente apretada | `--ft-space-factor` | `--ft-space-factor-section` |
| Solo las cards se ven apretadas | `--ft-space-factor-block` | `--radius-card` si visualmente pesa demasiado |
| Las secciones tienen demasiado aire | `--ft-space-factor-section` | `--ft-padding-content-y` |
| Los grids de cards hacen columnas muy estrechas | `--ft-card-md` o el tamano usado | Cambiar de `auto-fill` a `auto-fit` |
| Los botones parecen demasiado grandes | `--btn-py` y `--btn-px` | `--radius-button` |

El orden recomendado es ir de global a semantico: primero comprueba si falla toda la escala, despues si falla una familia concreta, y solo al final cambia clases en el markup.

---

## Recetas rapidas

### Interfaz mas compacta

```css
--ft-text-factor: 0.95;
--ft-space-factor: 0.9;
--ft-space-factor-section: 2.5;
```

Usalo para herramientas, dashboards, intranets o paginas donde prima la densidad.

### Landing mas editorial

```css
--ft-type-step-max: 1.24;
--ft-space-factor-section: 3.5;
--ft-space-factor-hero: 5;
```

Gana contraste en titulos y aire vertical. Revisa especialmente `.display` en mobile.

### Cards mas respiradas

```css
--ft-space-factor-block: 1.15;
--ft-card-md: 20rem;
```

Util si las cards contienen parrafos, imagenes o varios CTA.

---

## Checklist despues de cambiar knobs

1. Revisa un hero con `.display-*`.
2. Revisa una card con `.subheading-sm` y `.text-medium`.
3. Revisa un grid `grid-auto-fill-md`.
4. Revisa una seccion `.has-background`.
5. Revisa un bloque `.prose`.
6. Si cambiaste fallbacks, revisa tambien el bloque de migracion CSS math.

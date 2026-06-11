---
title: Knobs y runtime tokens
---

El sistema de tokens de FDS se divide en dos categorias: knobs (entradas editables) y tokens runtime generados. Los knobs describen la escala; los tokens runtime contienen los valores finales que consume Tailwind/WindPress.

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

En navegadores modernos, `--ft-container` se mejora dentro de `@supports` a `min(var(--container-7xl), 90%)`. `--ft-padding-content-y-half` pasa a una formula plana `clamp()`. Los tokens publicos `--text-*` y `--spacing-*` permanecen en `@theme`, pero apuntan a internos `--ft-text-*` y `--ft-spacing-*`.

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

## Como funciona la generacion

FDS declara primero valores estaticos seguros para tipografia y spacing. Despues, si el navegador supera el bloque `@supports`, activa formulas fluidas internas.

La regla nueva es que las formulas runtime estan aplanadas. En vez de exponer una cadena como `base -> lg -> xl -> 2xl`, cada token recibe su propia recta:

```css
--ft-text-xl: clamp(1.265625rem, calc(1.098621rem + 0.651724vw), 1.62rem);
```

Y lo mismo ocurre con spacing:

```css
--ft-spacing-section: clamp(2.535rem, calc(13.958621vw - 1.041897rem), 10.125rem);
```

{% callout title="Knobs como entrada de generacion" %}
Si editas los knobs manualmente dentro del CSS, debes regenerar tambien los tokens finales `--ft-text-*` y `--ft-spacing-*`. En FlowKit, el personalizador deberia tratar los knobs como entrada y escribir la instantanea plana completa.
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
6. Si cambiaste formulas planas o fallbacks, revisa tambien el bloque de migracion CSS math.

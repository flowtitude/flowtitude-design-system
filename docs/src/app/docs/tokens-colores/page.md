---
title: Colores
---

FDS define paletas de color en OKLCH con 11 pasos (50 a 950) para mejor uniformidad perceptual.

---

## Paletas

### Primary

La paleta primary usa un hue de 27.19 (naranja calido):

```css
--color-primary-50:  oklch(0.9700 0.0255 27.19);
--color-primary-100: oklch(0.9400 0.0428 27.19);
--color-primary-200: oklch(0.8700 0.0765 27.19);
--color-primary-300: oklch(0.8000 0.1056 27.19);
--color-primary-400: oklch(0.7000 0.1432 27.19);
--color-primary-500: oklch(0.5365 0.1984 27.19);
--color-primary-600: oklch(0.4963 0.1938 27.19);
--color-primary-700: oklch(0.4517 0.1884 27.19);
--color-primary-800: oklch(0.3916 0.1805 27.19);
--color-primary-900: oklch(0.3192 0.1698 27.19);
--color-primary-950: oklch(0.2505 0.1579 27.19);
```

### Secondary

La paleta secondary usa un hue de 18 (gris rosado):

```css
--color-secondary-50:  oklch(0.969 0.002 18.01);
--color-secondary-100: oklch(0.927 0.007 17.53);
/* ... 11 pasos hasta 950 */
```

---

## Por que OKLCH

OKLCH ofrece uniformidad perceptual: los pasos de lightness se perciben equidistantes, a diferencia de hex/RGB donde los saltos son desiguales. Esto produce paletas mas armoniosas.

---

## Colores base

```css
--ft-color-text: #000;
--ft-color-background: #f9ecec;
```

Estos se aplican al `body` en `base.css`.

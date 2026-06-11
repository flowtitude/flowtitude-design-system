---
title: FDS — Flowtitude Design System
---

Design system CSS gratuito sobre Tailwind CSS 4. Tokens fluidos, componentes y layouts sin media queries. {% .lead %}

{% quick-links %}

{% quick-link title="Instalacion" icon="installation" href="/docs/instalacion/" description="Importar FDS via WindPress en WordPress o incluir los CSS directamente." /%}

{% quick-link title="Arquitectura" icon="presets" href="/docs/arquitectura/" description="Layers CSS, knobs, tokens runtime y estructura de archivos." /%}

{% quick-link title="Tokens" icon="theming" href="/docs/tokens-knobs/" description="35 variables knob que generan tokens runtime planos con clamp()." /%}

{% quick-link title="Componentes" icon="plugins" href="/docs/componentes-botones/" description="Botones, tipografia, cards y utilidades CSS listas para usar." /%}

{% /quick-links %}

FDS extiende Tailwind CSS 4 con un sistema de tokens fluidos basado en `clamp()`. La tipografia y el spacing escalan proporcionalmente entre 410px y 1280px de viewport, sin media queries.

---

## Que incluye

### Tokens de diseno fluidos

El sistema usa ~35 variables "knob" como entrada de configuracion. A partir de ellas se generan tokens runtime planos con `clamp()` para transiciones fluidas entre viewport minimo y maximo.

```css
/* Un solo knob controla toda la escala */
--ft-text-min: 1rem;
--ft-text-max: 1.125rem;
--ft-type-step-min: 1.125;
--ft-type-step-max: 1.2;
```

### Componentes CSS

Botones con variantes de color, forma y tamano. Clases tipograficas semanticas desde `.display` hasta `.text-small`. Cards con tamanos y estilos.

### Layouts inteligentes

Secciones con spacing automatico que detectan contexto (`.has-background`, `.half-top`). Content-flex con posicionamiento en 9 puntos.

### Utilidades

Grids proporcionales (`grid-cols-1-2`, `grid-cols-2-3`), auto-fill/fit con tamanos de card, flips, duraciones semanticas y custom variants de Tailwind.

---

## Stack

| Componente | Tecnologia |
|---|---|
| CSS | Tailwind CSS v4 (`@theme`, `@layer`, `@utility`) |
| Distribucion | Archivo `.windpress` para WordPress |
| Tokens | CSS custom properties con `clamp()` |
| Colores | Paletas OKLCH (11 pasos: 50-950) |

---

## No es un framework

FDS no reemplaza Tailwind — lo extiende. Usa las mismas directivas (`@theme`, `@layer`, `@utility`, `@custom-variant`) y genera clases que conviven con las de Tailwind sin conflictos.

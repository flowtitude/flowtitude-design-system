---
title: Migracion CSS math fallback
---

Guia para actualizar FDS con fallbacks de tipografia y spacing sin perder cambios propios en los tokens. {% .lead %}

Esta migracion separa dos cosas que antes estaban mezcladas:

- Los knobs que cada proyecto puede personalizar: `--ft-text-*`, `--ft-space-*`, colores, botones, cards, container.
- Los tokens runtime que FDS genera desde esos knobs: `--ft-text-*`, `--ft-spacing-*` y sus alias publicos `--text-*`, `--spacing-*`.

La regla importante: no reemplaces todo `theme/flowtitude.css` si tu proyecto ya tiene tokens personalizados. Migra solo los bloques indicados.

---

## Resumen rapido

| Archivo | Como actualizar | Riesgo |
|---|---|---|
| `layouts/section.css` | Reemplazar archivo completo | Bajo |
| `theme/flowtitude.css` | Copiar bloques concretos | Medio si se reemplaza entero |

`layouts/section.css` puede reemplazarse entero porque no contiene knobs de marca. `theme/flowtitude.css` no deberia reemplazarse entero en instalaciones personalizadas: ahi suelen vivir colores, escalas, tamanos de card, botones y ajustes de spacing.

---

## Antes de empezar

Haz una copia del archivo actual:

```bash
cp theme/flowtitude.css theme/flowtitude.css.backup
cp layouts/section.css layouts/section.css.backup
```

Despues identifica si tu proyecto modifico alguno de estos knobs:

```css
--ft-text-min
--ft-text-max
--ft-type-step-min
--ft-type-step-max
--ft-text-factor

--ft-space-min
--ft-space-max
--ft-space-step-min
--ft-space-step-max
--ft-space-factor

--ft-space-factor-inner
--ft-space-factor-content
--ft-space-factor-stack
--ft-space-factor-block
--ft-space-factor-columns
--ft-space-factor-section
--ft-space-factor-hero
```

Si no tocaste esos knobs, puedes usar las formulas planas por defecto. Si los tocaste, conserva tus knobs y regenera tambien los tokens finales para que navegadores modernos y antiguos sigan la misma configuracion.

---

## Paso 1: reemplazar sections.css

Este archivo se puede reemplazar completo. El cambio clave es que ya no calcula media seccion dentro del layout:

```css
section {
  @apply @container w-full px-[var(--ft-padding-content-x)];
  padding-top: var(--ft-padding-content-y-half);
  padding-bottom: var(--ft-padding-content-y-half);
}
```

Y las clases semanticas tambien consumen el mismo token:

```css
section.half-top,
section.half-top:first-of-type:not(.has-background) {
  padding-top: var(--ft-padding-content-y-half);
}

section.half-bottom,
section.half-bottom:last-of-type:not(.has-background) {
  padding-bottom: var(--ft-padding-content-y-half);
}
```

Asi `sections.css` deja de depender de `calc(var(--ft-padding-content-y) / 2)`. El calculo vive en `theme/flowtitude.css`, donde puede tener fallback.

---

## Paso 2: no reemplazar tus knobs

En `theme/flowtitude.css`, conserva tu bloque de configuracion:

```css
@layer base {
  :root {
    /* RANGES / KNOBS */
    --viewport-min: 410px;
    --viewport-max: 1280px;

    --ft-text-min: 1rem;
    --ft-text-max: 1.125rem;
    --ft-type-step-min: 1.125;
    --ft-type-step-max: 1.2;
    --ft-text-factor: 1;

    --ft-space-min: 0.5rem;
    --ft-space-max: 1.5rem;
    --ft-space-step-min: 1.3;
    --ft-space-step-max: 1.5;
    --ft-space-factor: 1;
  }
}
```

No copies este bloque desde una version nueva si tu proyecto lo tiene personalizado. Esta es la parte que debe sobrevivir.

---

## Paso 3: ajustar layout defaults

Dentro del primer `:root`, cambia solo la zona de layout defaults.

Antes:

```css
--ft-container: min(var(--container-7xl), 90%);
--ft-padding-content-x: 1rem;
--ft-padding-content-y: var(--spacing-section);
--ft-gap-content: var(--spacing-block);
```

Despues:

```css
--ft-container: 90%;
--ft-padding-content-x: 1rem;
--ft-padding-content-y: var(--spacing-section);
--ft-padding-content-y-half: 1.2675rem;
--ft-gap-content: var(--spacing-block);
```

Por que cambia `--ft-container`: el fallback base evita `min()` para navegadores con CSS math limitado. La version moderna se reintroduce dentro de `@supports`.

Si tu proyecto tenia un container personalizado, separalo asi:

```css
/* Fallback sin min()/calc() */
--ft-container: 90%;
```

Y dentro del bloque `@supports`, usa tu valor moderno:

```css
--ft-container: min(var(--container-7xl), 90%);
```

---

## Paso 4: reemplazar derived values por fallbacks simples

En el primer `:root`, sustituye el bloque antiguo `DERIVED VALUES` por este:

```css
/* ============================================================
   2) RUNTIME TOKEN FALLBACKS (no calc/clamp required)
   ============================================================ */

--ft-text-xs: 0.75rem;
--ft-text-sm: 0.875rem;
--ft-text-base: 1rem;
--ft-text-lg: 1.125rem;
--ft-text-xl: 1.25rem;
--ft-text-2xl: 1.5rem;
--ft-text-3xl: 1.875rem;
--ft-text-4xl: 2.25rem;
--ft-text-5xl: 3rem;
--ft-text-6xl: 3.75rem;
--ft-text-7xl: 4.5rem;
--ft-text-8xl: 6rem;
--ft-text-9xl: 8rem;

--ft-spacing-fluid-md: 0.5rem;
--ft-spacing-fluid-sm: 0.384615rem;
--ft-spacing-fluid-xs: 0.295858rem;
--ft-spacing-fluid-lg: 0.65rem;
--ft-spacing-fluid-xl: 0.845rem;
--ft-spacing-fluid-2xl: 1.0985rem;

--ft-spacing-inner: 0.147929rem;
--ft-spacing-content: 0.288462rem;
--ft-spacing-stack: 0.384615rem;
--ft-spacing-block: 0.5rem;
--ft-spacing-columns: 0.75rem;
--ft-spacing-section: 2.535rem;
--ft-spacing-hero: 4.94325rem;
```

Esto permite que los navegadores que no entienden los calculos fluidos sigan teniendo valores validos. La tipografia cae a la escala estandar de Tailwind.

---

## Paso 5: reemplazar la zona de tipografia y spacing en @theme

Dentro de `@theme`, declara la escala publica `--text-*` como alias a los internos `--ft-text-*`. Esto es importante por dos motivos:

- Tailwind 4/WindPress necesita ver `--text-*` dentro de `@theme` para tratar la escala como tokens generativos.
- Si el navegador no soporta bien CSS math, los alias resuelven contra los fallbacks estaticos internos.

El spacing semantico tambien necesita tokens publicos en `@theme` porque clases como `p-section`, `gap-content` o `py-hero` solo existen si FDS declara esos nombres como `--spacing-*`.

La zona a reemplazar empieza aqui:

```css
/* Typography scale */
```

Y termina en:

```css
--spacing-hero: ...;
```

Nuevo bloque por defecto:

```css
/*
  Typography scale.
  These must live in @theme so Tailwind 4/WindPress generates text-* utilities.
  Runtime values resolve through --ft-text-* fallbacks/fluid tokens.
*/
--text-xs: var(--ft-text-xs);
--text-sm: var(--ft-text-sm);
--text-base: var(--ft-text-base);
--text-lg: var(--ft-text-lg);
--text-xl: var(--ft-text-xl);
--text-2xl: var(--ft-text-2xl);
--text-3xl: var(--ft-text-3xl);
--text-4xl: var(--ft-text-4xl);
--text-5xl: var(--ft-text-5xl);
--text-6xl: var(--ft-text-6xl);
--text-7xl: var(--ft-text-7xl);
--text-8xl: var(--ft-text-8xl);
--text-9xl: var(--ft-text-9xl);

/*
  Spacing scale.
  These must live in @theme so Tailwind 4/WindPress generates spacing utilities.
*/
--spacing: 0.25rem;

--spacing-fluid-md: var(--ft-spacing-fluid-md);
--spacing-fluid-sm: var(--ft-spacing-fluid-sm);
--spacing-fluid-xs: var(--ft-spacing-fluid-xs);
--spacing-fluid-lg: var(--ft-spacing-fluid-lg);
--spacing-fluid-xl: var(--ft-spacing-fluid-xl);
--spacing-fluid-2xl: var(--ft-spacing-fluid-2xl);

/* Semantic spacing */
--spacing-inner: var(--ft-spacing-inner);
--spacing-content: var(--ft-spacing-content);
--spacing-stack: var(--ft-spacing-stack);
--spacing-block: var(--ft-spacing-block);
--spacing-columns: var(--ft-spacing-columns);
--spacing-section: var(--ft-spacing-section);
--spacing-hero: var(--ft-spacing-hero);
```

Estos son los tokens publicos que generan utilidades. No los sobrescribas fuera de `@theme`: en navegadores modernos, el bloque `@supports` activa los internos `--ft-text-*` y `--ft-spacing-*` con formulas planas.

El personalizador o cualquier sistema de preservacion de tokens debe guardar knobs (`--ft-text-min`, `--ft-space-max`, etc.) y regenerar los internos `--ft-*`, pero no debe inyectar `--text-*` ni `--spacing-*` como valores calculados fuera de `@theme`.

---

## Paso 6: anadir desktop fallback y mejora fluida interna

Justo despues del primer bloque de fallbacks, anade esta estructura. El archivo real debe incluir todos los `--ft-text-*` y `--ft-spacing-*`; aqui se muestra el patron para no alargar la guia:

```css
@layer base {
  /* Static desktop spacing fallback for browsers with weak CSS math support. */
  @media (min-width: 1280px) {
    :root {
      --ft-spacing-fluid-md: 1.5rem;
      --ft-spacing-fluid-sm: 1rem;
      --ft-spacing-fluid-xs: 0.666667rem;
      --ft-spacing-fluid-lg: 2.25rem;
      --ft-spacing-fluid-xl: 3.375rem;
      --ft-spacing-fluid-2xl: 5.0625rem;

      --ft-spacing-inner: 0.333333rem;
      --ft-spacing-content: 0.75rem;
      --ft-spacing-stack: 1rem;
      --ft-spacing-block: 1.5rem;
      --ft-spacing-columns: 2.25rem;
      --ft-spacing-section: 10.125rem;
      --ft-spacing-hero: 22.78125rem;
      --ft-padding-content-y-half: 5.0625rem;
    }
  }

  /*
    Fluid enhancement.
    Public utility tokens stay in @theme; runtime values are flattened here.
  */
  @supports (font-size: clamp(1rem, calc(1rem + 1vw), 2rem)) {
    :root {
      --ft-text-base: clamp(1rem, calc(0.941092rem + 0.229885vw), 1.125rem);
      --ft-text-xl: clamp(1.265625rem, calc(1.098621rem + 0.651724vw), 1.62rem);
      --ft-text-2xl: clamp(1.423828rem, calc(1.17869rem + 0.956638vw), 1.944rem);

      --ft-spacing-fluid-md: clamp(0.5rem, calc(0.028736rem + 1.83908vw), 1.5rem);
      --ft-spacing-block: clamp(0.5rem, calc(0.028736rem + 1.83908vw), 1.5rem);
      --ft-spacing-section: clamp(2.535rem, calc(13.958621vw - 1.041897rem), 10.125rem);
      --ft-spacing-hero: clamp(4.94325rem, calc(32.805517vw - 3.463164rem), 22.78125rem);
      --ft-padding-content-y-half: clamp(1.2675rem, calc(6.97931vw - 0.520948rem), 5.0625rem);
    }
  }

  /* Re-enable the bounded container only where CSS min() is supported. */
  @supports (width: min(100%, 1rem)) {
    :root {
      --ft-container: min(var(--container-7xl), 90%);
    }
  }
}
```

Si personalizaste `--ft-container`, cambia solo esta linea dentro del bloque `@supports (width: min(...))`:

```css
--ft-container: min(var(--container-7xl), 90%);
```

---

## Si tus knobs son personalizados

Los knobs ya no se recalculan en cadena dentro del navegador. Son entradas de generacion. Si tu proyecto cambio `--ft-text-min`, `--ft-type-step-max`, `--ft-space-max` o cualquier multiplicador semantico, debes regenerar tambien:

- los fallbacks estaticos;
- las formulas planas `clamp()` de `--ft-text-*`;
- las formulas planas `clamp()` de `--ft-spacing-*`;
- `--ft-padding-content-y-half`.

Los navegadores con soporte limitado usaran los alias `--text-*` y `--spacing-*` declarados en `@theme`, resueltos contra los fallbacks internos. Los navegadores modernos usaran los mismos internos cuando el bloque `@supports` active las formulas planas.

### Formulas mobile/base para fallbacks

```text
spacing-fluid-md  = ft-space-min * ft-space-factor
spacing-fluid-sm  = spacing-fluid-md / ft-space-step-min
spacing-fluid-xs  = spacing-fluid-sm / ft-space-step-min
spacing-fluid-lg  = spacing-fluid-md * ft-space-step-min
spacing-fluid-xl  = spacing-fluid-lg * ft-space-step-min
spacing-fluid-2xl = spacing-fluid-xl * ft-space-step-min

spacing-inner   = spacing-fluid-xs * ft-space-factor-inner
spacing-content = spacing-fluid-sm * ft-space-factor-content
spacing-stack   = spacing-fluid-sm * ft-space-factor-stack
spacing-block   = spacing-fluid-md * ft-space-factor-block
spacing-columns = spacing-fluid-md * ft-space-factor-columns
spacing-section = spacing-fluid-xl * ft-space-factor-section
spacing-hero    = spacing-fluid-2xl * ft-space-factor-hero
padding-y-half  = spacing-section / 2
```

### Formulas desktop

Usa las mismas formulas, pero sustituyendo:

```text
ft-space-min      -> ft-space-max
ft-space-step-min -> ft-space-step-max
```

---

## Snippet para recalcular fallbacks

Puedes pegar esto en la consola del navegador o en Node para obtener los valores CSS. Cambia los knobs al principio.

```js
const knobs = {
  spaceMin: 0.5,
  spaceMax: 1.5,
  spaceStepMin: 1.3,
  spaceStepMax: 1.5,
  spaceFactor: 1,

  factorInner: 0.5,
  factorContent: 0.75,
  factorStack: 1,
  factorBlock: 1,
  factorColumns: 1.5,
  factorSection: 3,
  factorHero: 4.5,
}

function round(value) {
  return Number(value.toFixed(6))
}

function rem(value) {
  return `${round(value)}rem`
}

function scale(kind) {
  const isMax = kind === 'desktop'
  const spaceBase = (isMax ? knobs.spaceMax : knobs.spaceMin) * knobs.spaceFactor
  const spaceStep = isMax ? knobs.spaceStepMax : knobs.spaceStepMin

  const fluid = { md: spaceBase }
  fluid.sm = fluid.md / spaceStep
  fluid.xs = fluid.sm / spaceStep
  fluid.lg = fluid.md * spaceStep
  fluid.xl = fluid.lg * spaceStep
  fluid['2xl'] = fluid.xl * spaceStep

  const semantic = {
    inner: fluid.xs * knobs.factorInner,
    content: fluid.sm * knobs.factorContent,
    stack: fluid.sm * knobs.factorStack,
    block: fluid.md * knobs.factorBlock,
    columns: fluid.md * knobs.factorColumns,
    section: fluid.xl * knobs.factorSection,
    hero: fluid['2xl'] * knobs.factorHero,
  }

  return { fluid, semantic, half: semantic.section / 2 }
}

for (const [label, values] of Object.entries({ base: scale('base'), desktop: scale('desktop') })) {
  console.log(`/* ${label} */`)
  for (const [key, value] of Object.entries(values.fluid)) {
    console.log(`--spacing-fluid-${key}: ${rem(value)};`)
  }
  for (const [key, value] of Object.entries(values.semantic)) {
    console.log(`--spacing-${key}: ${rem(value)};`)
  }
  console.log(`--ft-padding-content-y-half: ${rem(values.half)};`)
}
```

Para generar las formulas planas `clamp()`, usa los valores mobile/base y desktop como extremos del rango `410px -> 1280px` y calcula una recta por token:

```text
token = clamp(min-rem, calc(intercept-rem + slope-vw), max-rem)
```

La parte importante es que cada token final tenga su propia formula. No vuelvas a generar `section` desde `fluid-xl` ni `2xl` desde `xl` en runtime.

---

## Checklist de verificacion

Despues de migrar:

```bash
npm run build --prefix docs
```

Y, si tienes Tailwind CLI instalado en el proyecto:

```bash
node_modules/.bin/tailwindcss -i main.css -o /tmp/fds-migration-check.css
```

Comprueba en navegador:

- `text-base`, `text-4xl`, `text-9xl` siguen existiendo.
- En el CSS compilado aparece `--text-base` dentro de la capa `@theme`.
- `p-section`, `py-section`, `gap-content`, `gap-block` siguen generandose.
- Las secciones normales tienen media seccion arriba y abajo.
- `.has-background` usa seccion completa.
- `.half-top` y `.half-bottom` vuelven a media seccion.

---

## Que no cambia

No cambian las clases publicas:

```text
text-*
p-*
py-section
gap-content
gap-block
gap-columns
section.has-background
section.half-top
section.half-bottom
```

La migracion cambia la arquitectura interna de tokens, no la API de clases.

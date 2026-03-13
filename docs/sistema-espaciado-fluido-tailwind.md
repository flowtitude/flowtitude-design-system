# Sistema de Espaciado Fluido para Tailwind CSS 4

## 📋 Índice

1. [Introducción](#introducción)
2. [Cómo Funciona el Sistema](#cómo-funciona-el-sistema)
3. [Cálculo Matemático del Espaciado](#cálculo-matemático-del-espaciado)
4. [Funciones de Cálculo Fluido](#funciones-de-cálculo-fluido)
5. [Implementación en Tailwind 4](#implementación-en-tailwind-4)
6. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Introducción

Este documento explica el sistema de espaciado fluido utilizado en AutomaticCSS y cómo implementarlo en Tailwind CSS 4 usando `@theme`. El sistema genera valores de espaciado que se adaptan fluidamente entre tamaños de viewport mínimo y máximo, proporcionando una experiencia visual consistente en todos los dispositivos.

---

## Cómo Funciona el Sistema

### Variables Base

El sistema parte de estas variables fundamentales:

```scss
$base-space: 3           // Espaciado base máximo (3rem)
$base-space-min: 2.4     // Espaciado base mínimo (2.4rem)
$space-scale: 1.5        // Escala para desktop (multiplicador/divisor)
$mob-space-scale: 1.3    // Escala para móvil (solo para valores grandes)
$vp-min: 36rem           // Viewport mínimo (576px)
$vp-max: 128rem          // Viewport máximo (2048px)
```

### Estructura de Escalas

El sistema genera 6 tamaños de espaciado:

- **xs** (extra pequeño)
- **s** (pequeño)
- **m** (medio) - **Este es el tamaño base**
- **l** (grande)
- **xl** (extra grande)
- **xxl** (extra extra grande)

### Tipos de Espaciado

Para cada tamaño, se generan tres variantes:

1. **`pure`**: Valores fijos en rem (fallback)
2. **`calc`**: Cálculo fluido usando `calc()`
3. **`clamp`**: Cálculo fluido usando `clamp()` (recomendado)

---

## Cálculo Matemático del Espaciado

### 1. Espaciado Base (space-m)

El tamaño **m** es el punto de partida:

```
space-m-min = $base-space-min = 2.4rem
space-m-max = $base-space = 3rem
```

### 2. Cálculo hacia Abajo (xs, s)

Para tamaños menores, se **divide** por `$space-scale` (1.5):

```
space-s-min = space-m-min / 1.5 = 2.4 / 1.5 = 1.6rem
space-s-max = space-m-max / 1.5 = 3 / 1.5 = 2rem

space-xs-min = space-s-min / 1.5 = 1.6 / 1.5 = 1.0667rem
space-xs-max = space-s-max / 1.5 = 2 / 1.5 = 1.3333rem
```

### 3. Cálculo hacia Arriba (l, xl, xxl)

Para tamaños mayores, se usa una lógica híbrida:

- **Mínimo**: multiplica por `$mob-space-scale` (1.3)
- **Máximo**: multiplica por `$space-scale` (1.5)

```
space-l-min = space-m-min * 1.3 = 2.4 * 1.3 = 3.12rem
space-l-max = space-m-max * 1.5 = 3 * 1.5 = 4.5rem

space-xl-min = space-l-min * 1.3 = 3.12 * 1.3 = 4.056rem
space-xl-max = space-l-max * 1.5 = 4.5 * 1.5 = 6.75rem

space-xxl-min = space-xl-min * 1.3 = 4.056 * 1.3 = 5.2728rem
space-xxl-max = space-xl-max * 1.5 = 6.75 * 1.5 = 10.125rem
```

### 4. Espaciado de Secciones

El espaciado de secciones multiplica los valores base:

```
Multiplicador desktop: $space-adjust-section = 4x
Multiplicador móvil: $mob-space-adjust-section = 3x

section-m-min = space-m-min * 3 = 2.4 * 3 = 7.2rem
section-m-max = space-m-max * 4 = 3 * 4 = 12rem

section-xs-min = space-xs-min * 3 = 1.0667 * 3 = 3.2rem
section-xs-max = space-xs-max * 4 = 1.3333 * 4 = 5.3333rem

// ... y así sucesivamente
```

### Valores Calculados Completos

#### Espaciado Base

| Tamaño | Mínimo (rem) | Máximo (rem) |
|--------|--------------|--------------|
| xs     | 1.0667       | 1.3333       |
| s      | 1.6          | 2.0          |
| m      | 2.4          | 3.0          |
| l      | 3.12         | 4.5          |
| xl     | 4.056        | 6.75         |
| xxl    | 5.2728       | 10.125       |

#### Espaciado de Secciones

| Tamaño | Mínimo (rem) | Máximo (rem) |
|--------|--------------|--------------|
| xs     | 3.2          | 5.3333       |
| s      | 4.8          | 8.0          |
| m      | 7.2          | 12.0         |
| l      | 9.36         | 18.0         |
| xl     | 12.168       | 27.0         |
| xxl    | 15.8184      | 40.5         |

---

## Funciones de Cálculo Fluido

### Función `fluidCalc()`

Genera un cálculo fluido usando `calc()`:

```scss
@function fluidCalc($text-min, $text-max) {
  $vp-delta: $vp-max - $vp-min;           // 128 - 36 = 92rem
  $text-delta: $text-max - $text-min;     // Diferencia entre min y max
  $vp-min-rem: $vp-min * 1rem;            // 36rem
  $text-min-rem: $text-min * 1rem;        // min en rem
  
  @return calc(
    #{$text-min-rem} + (#{$text-delta} * ((100vw - #{$vp-min-rem}) / #{$vp-delta}))
  );
}
```

**Fórmula resultante:**
```css
calc(2.4rem + (0.6 * ((100vw - 36rem) / 92)))
```

### Función `fluidClamp()`

Genera un cálculo fluido usando `clamp()` (recomendado):

```scss
@function fluidClamp($min, $max) {
  $slope: ($max - $min) / ($vp-max - $vp-min);    // Pendiente
  $intercept: ($min - $slope * $vp-min) * 1rem;   // Intercepto
  $slope-vw: $slope * 100;                         // Pendiente en vw
  $min-rem: $min * 1rem;
  $max-rem: $max * 1rem;
  
  @return clamp(#{$min-rem}, calc(#{$slope-vw}vw + #{$intercept}), #{$max-rem});
}
```

**Ejemplo para space-m (2.4rem - 3rem):**

```
slope = (3 - 2.4) / (128 - 36) = 0.6 / 92 = 0.0065217
intercept = (2.4 - 0.0065217 * 36) * 1rem = (2.4 - 0.2348) * 1rem = 2.1652rem
slope-vw = 0.0065217 * 100 = 0.65217vw
```

**CSS resultante:**
```css
clamp(2.4rem, calc(0.65217vw + 2.1652rem), 3rem)
```

### Ventajas de `clamp()`

- **Límites automáticos**: No puede exceder el mínimo o máximo
- **Mejor rendimiento**: Más eficiente que `calc()` complejo
- **Soporte moderno**: Compatible con todos los navegadores modernos

---

## Implementación en Tailwind 4

Tailwind CSS 4 introduce el sistema `@theme` que permite definir variables CSS nativas directamente. Aquí está la implementación completa:

### 1. Configuración Base (`theme.css` o en tu CSS principal)

```css
@import "tailwindcss";

@theme {
  /* Variables de Viewport */
  --vp-min: 36rem;  /* 576px */
  --vp-max: 128rem; /* 2048px */
  
  /* Variables Base */
  --base-space: 3rem;
  --base-space-min: 2.4rem;
  --space-scale: 1.5;
  --mob-space-scale: 1.3;
  --section-scale: 4;
  --section-scale-mob: 3;

  /* Función helper para calcular slope */
  --fluid-slope: calc((var(--max) - var(--min)) / (var(--vp-max) - var(--vp-min)));
  
  /* Función helper para calcular intercept */
  --fluid-intercept: calc((var(--min) - var(--fluid-slope) * var(--vp-min)) * 1rem);
  
  /* Función helper para slope en vw */
  --fluid-slope-vw: calc(var(--fluid-slope) * 100);

  /* Espaciado Base - Variante Clamp (Recomendado) */
  --space-xs: clamp(1.0667rem, calc(0.2898vw + 0.9624rem), 1.3333rem);
  --space-s: clamp(1.6000rem, calc(0.4348vw + 1.4435rem), 2.0000rem);
  --space-m: clamp(2.4000rem, calc(0.6522vw + 2.1652rem), 3.0000rem);
  --space-l: clamp(3.1200rem, calc(1.5000vw + 2.5800rem), 4.5000rem);
  --space-xl: clamp(4.0560rem, calc(2.9283vw + 3.0018rem), 6.7500rem);
  --space-xxl: clamp(5.2728rem, calc(5.2741vw + 3.3741rem), 10.1250rem);

  /* Espaciado de Secciones */
  --section-space-xs: clamp(3.2000rem, calc(2.3188vw + 2.3652rem), 5.3333rem);
  --section-space-s: clamp(4.8000rem, calc(3.4783vw + 3.5478rem), 8.0000rem);
  --section-space-m: clamp(7.2000rem, calc(5.2174vw + 5.3217rem), 12.0000rem);
  --section-space-l: clamp(9.3600rem, calc(9.3913vw + 5.9791rem), 18.0000rem);
  --section-space-xl: clamp(12.1680rem, calc(16.1217vw + 6.3642rem), 27.0000rem);
  --section-space-xxl: clamp(15.8184rem, calc(26.8278vw + 6.1604rem), 40.5000rem);

  /* Configuración de Tailwind - Espaciado Base */
  --spacing-xs: var(--space-xs);
  --spacing-s: var(--space-s);
  --spacing-m: var(--space-m);
  --spacing-l: var(--space-l);
  --spacing-xl: var(--space-xl);
  --spacing-xxl: var(--space-xxl);

  /* Configuración de Tailwind - Espaciado de Secciones */
  --spacing-section-xs: var(--section-space-xs);
  --spacing-section-s: var(--section-space-s);
  --spacing-section-m: var(--section-space-m);
  --spacing-section-l: var(--section-space-l);
  --spacing-section-xl: var(--section-space-xl);
  --spacing-section-xxl: var(--section-space-xxl);
}

/* Extensión del tema de Tailwind */
@theme {
  --spacing-xs: var(--space-xs);
  --spacing-s: var(--space-s);
  --spacing-m: var(--space-m);
  --spacing-l: var(--space-l);
  --spacing-xl: var(--space-xl);
  --spacing-xxl: var(--space-xxl);
  
  --spacing-section-xs: var(--section-space-xs);
  --spacing-section-s: var(--section-space-s);
  --spacing-section-m: var(--section-space-m);
  --spacing-section-l: var(--section-space-l);
  --spacing-section-xl: var(--section-space-xl);
  --spacing-section-xxl: var(--section-space-xxl);
}
```

### 2. Implementación con Función Helper (Alternativa Avanzada)

Si prefieres generar los valores dinámicamente usando JavaScript, puedes crear un script de generación:

```javascript
// generate-fluid-spacing.js
function calculateFluidClamp(min, max, vpMin = 36, vpMax = 128) {
  const slope = (max - min) / (vpMax - vpMin);
  const intercept = (min - slope * vpMin);
  const slopeVw = slope * 100;
  const minRem = `${min}rem`;
  const maxRem = `${max}rem`;
  
  return `clamp(${minRem}, calc(${slopeVw.toFixed(4)}vw + ${intercept.toFixed(4)}rem), ${maxRem})`;
}

// Valores base
const baseSpaceMin = 2.4;
const baseSpaceMax = 3;
const spaceScale = 1.5;
const mobSpaceScale = 1.3;
const sectionScale = 4;
const sectionScaleMob = 3;

// Calcular espaciado base
const spaces = {
  m: { min: baseSpaceMin, max: baseSpaceMax },
  s: { min: baseSpaceMin / spaceScale, max: baseSpaceMax / spaceScale },
  xs: { 
    min: (baseSpaceMin / spaceScale) / spaceScale, 
    max: (baseSpaceMax / spaceScale) / spaceScale 
  },
  l: { 
    min: baseSpaceMin * mobSpaceScale, 
    max: baseSpaceMax * spaceScale 
  },
  xl: {
    min: (baseSpaceMin * mobSpaceScale) * mobSpaceScale,
    max: (baseSpaceMax * spaceScale) * spaceScale
  },
  xxl: {
    min: ((baseSpaceMin * mobSpaceScale) * mobSpaceScale) * mobSpaceScale,
    max: ((baseSpaceMax * spaceScale) * spaceScale) * spaceScale
  }
};

console.log('Espaciado Base:');
Object.entries(spaces).forEach(([key, {min, max}]) => {
  console.log(`  --space-${key}: ${calculateFluidClamp(min, max)};`);
});

console.log('\nEspaciado de Secciones:');
Object.entries(spaces).forEach(([key, {min, max}]) => {
  console.log(`  --section-space-${key}: ${calculateFluidClamp(min * sectionScaleMob, max * sectionScale)};`);
});
```

### 3. Uso en Componentes

Una vez configurado, puedes usar los espaciados fluidos directamente:

```html
<!-- Espaciado base -->
<div class="p-m">Padding fluido medio</div>
<div class="m-xl">Margin fluido extra grande</div>
<div class="gap-s">Gap fluido pequeño</div>

<!-- Espaciado de secciones -->
<section class="py-section-m">Sección con espaciado fluido</section>
<div class="space-y-section-xl">Espaciado vertical entre hijos</div>
```

### 4. Uso Directo de Variables CSS

También puedes usar las variables CSS directamente:

```css
.mi-componente {
  padding: var(--space-m);
  margin-bottom: var(--section-space-l);
  gap: var(--space-s);
}
```

---

## Ejemplos de Uso

### Ejemplo 1: Card con Espaciado Fluido

```html
<div class="p-m space-y-s">
  <h2 class="mb-s">Título</h2>
  <p>Contenido con espaciado fluido</p>
</div>
```

### Ejemplo 2: Sección con Padding Fluido

```html
<section class="py-section-m px-section-s">
  <div class="container mx-auto">
    <h1 class="mb-section-s">Título Principal</h1>
    <p class="mb-section-m">Contenido</p>
  </div>
</section>
```

### Ejemplo 3: Grid con Gap Fluido

```html
<div class="grid grid-cols-3 gap-m">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Ejemplo 4: Espaciado Personalizado con Variables

```css
.mi-layout {
  --gap-personalizado: var(--space-l);
  display: flex;
  gap: var(--gap-personalizado);
}

@media (min-width: 768px) {
  .mi-layout {
    --gap-personalizado: var(--space-xl);
  }
}
```

---

## Fórmulas Matemáticas Resumidas

### Cálculo de Espaciado

**Base (m):**
```
min = 2.4rem
max = 3rem
```

**Hacia abajo (s, xs):**
```
min = anterior_min / 1.5
max = anterior_max / 1.5
```

**Hacia arriba (l, xl, xxl):**
```
min = anterior_min * 1.3
max = anterior_max * 1.5
```

### Cálculo de `clamp()`

```
slope = (max - min) / (vp-max - vp-min)
intercept = (min - slope * vp-min) * 1rem
slope-vw = slope * 100

clamp(min-rem, calc(slope-vw vw + intercept), max-rem)
```

### Espaciado de Secciones

```
section-min = space-min * 3
section-max = space-max * 4
```

---

## Ventajas del Sistema

1. **Responsive Automático**: Se adapta automáticamente sin media queries
2. **Consistencia Visual**: Mantiene proporciones correctas en todos los tamaños
3. **Performance**: Usa `clamp()` nativo del navegador
4. **Escalable**: Fácil de ajustar cambiando variables base
5. **Matemáticamente Consistente**: Escalas predecibles y coherentes

---

## Notas Finales

- El sistema usa `rem` como unidad base para respetar las preferencias de accesibilidad del usuario
- Los valores se calculan una vez en tiempo de compilación (no en runtime)
- `clamp()` es preferible sobre `calc()` por sus límites automáticos
- Puedes personalizar fácilmente ajustando las variables base en `@theme`

---

## Referencias

- [AutomaticCSS Spacing System](../../assets/scss/dashboard/_spacing-vars.scss)
- [Tailwind CSS 4 @theme Documentation](https://tailwindcss.com/docs/theme)
- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
---
title: Spacing fluido
---

El spacing de FDS convierte una pequena configuracion de variables en una escala fluida completa. El objetivo es que el ritmo vertical, los gaps, el padding de secciones y los espacios internos crezcan de forma proporcional entre mobile y desktop sin escribir media queries.

El sistema tiene 4 niveles:

1. Rango de viewport.
2. Knobs editables.
3. Escala fluida derivada.
4. Tokens semanticos para usar en clases Tailwind.

---

## Configuracion fluida

La interpolacion ocurre entre `--viewport-min` y `--viewport-max`, definidos en `theme/flowtitude.css`:

```css
--viewport-min: 410px;
--viewport-max: 1280px;
```

FDS calcula un progreso fluido (`--ft-fluid-t`) con el ancho real del viewport:

```css
--ft-fluid-t: calc(
  (100vw - var(--viewport-min)) /
  (var(--viewport-max) - var(--viewport-min))
);
```

Ese progreso alimenta los `clamp()` del espacio base y del ratio de escala:

```css
--ft-space-min: 0.5rem;      /* Espacio base en viewport minimo */
--ft-space-max: 1.5rem;      /* Espacio base en viewport maximo */
--ft-space-step-min: 1.3;    /* Ratio de escala minimo */
--ft-space-step-max: 1.5;    /* Ratio de escala maximo */
--ft-space-factor: 1;        /* Multiplicador global */
```

```css
--ft-space-value: clamp(
  var(--ft-space-min),
  calc(var(--ft-space-min) + (var(--ft-space-max) - var(--ft-space-min)) * var(--ft-fluid-t)),
  var(--ft-space-max)
);

--ft-space-step: clamp(
  var(--ft-space-step-min),
  calc(var(--ft-space-step-min) + (var(--ft-space-step-max) - var(--ft-space-step-min)) * var(--ft-fluid-t)),
  var(--ft-space-step-max)
);
```

Por debajo de `410px`, el sistema usa el minimo. Por encima de `1280px`, usa el maximo. Entre ambos, interpola de forma continua.

`clamp()` es la pieza importante: pone limite minimo, valor fluido intermedio y limite maximo en una sola declaracion. Por eso el sistema no necesita media queries para este comportamiento.

```css
clamp(valor-minimo, valor-fluido, valor-maximo)
```

---

## Fallback de compatibilidad

FDS no deja los tokens principales dependiendo solo de `calc()` o `clamp()`. La configuracion actual usa tres niveles:

| Nivel | Cuando se usa | Resultado |
|---|---|---|
| Fallback base | Navegadores con variables CSS pero sin CSS math fiable | Valores estaticos mobile |
| Fallback desktop | `@media (min-width: 1280px)` | Valores estaticos desktop |
| Mejora fluida | `@supports` confirma `clamp()`, `calc()`, multiplicacion y division | Tokens internos fluidos completos |

Esto significa que navegadores antiguos no obtienen interpolacion fluida, pero si mantienen una escala valida de spacing. Los tokens publicos `--spacing-*` viven en `@theme` para generar utilidades; los valores reales se resuelven mediante internos `--ft-spacing-*`, que son los que pasan de fallback a fluido.

```css
@supports (font-size: clamp(1rem, 2vw, 2rem)) and
  (font-size: calc(1rem * 1)) and
  (padding-top: calc(1rem / 2)) {
  :root {
    --ft-spacing-block: calc(var(--ft-spacing-fluid-md) * var(--ft-space-factor-block));
  }
}
```

---

## Escala de spacing

La escala `fluid-*` se deriva del espacio base (`--spacing-fluid-md`). Los pasos pequenos dividen por el ratio; los grandes multiplican por el ratio.

```css
--ft-spacing-fluid-md:  calc(var(--ft-space-value) * var(--ft-space-factor));
--ft-spacing-fluid-sm:  calc(var(--ft-spacing-fluid-md) / var(--ft-space-step));
--ft-spacing-fluid-xs:  calc(var(--ft-spacing-fluid-sm) / var(--ft-space-step));
--ft-spacing-fluid-lg:  calc(var(--ft-spacing-fluid-md) * var(--ft-space-step));
--ft-spacing-fluid-xl:  calc(var(--ft-spacing-fluid-lg) * var(--ft-space-step));
--ft-spacing-fluid-2xl: calc(var(--ft-spacing-fluid-xl) * var(--ft-space-step));
```

| Token | Relacion | Uso directo |
|---|---|---|
| `fluid-xs` | Muy pequeno | Ajustes finos, separaciones internas minimas |
| `fluid-sm` | Pequeno | Gaps discretos, grupos compactos |
| `fluid-md` | Base | Ritmo normal de UI |
| `fluid-lg` | Grande | Bloques internos amplios |
| `fluid-xl` | Muy grande | Separacion fuerte entre grupos |
| `fluid-2xl` | Extra grande | Base para heroes y espacios de alto impacto |

Los tokens `fluid-*` son utiles cuando necesitas precision tecnica. Para construir paginas y secciones, normalmente conviene usar los tokens semanticos.

{% callout title="Formula mental" %}
`fluid-md` es el punto medio del sistema. Hacia abajo, FDS divide por `--ft-space-step`; hacia arriba, multiplica por `--ft-space-step`. El propio step tambien es fluido, asi que la escala se comprime en mobile y se abre en desktop.
{% /callout %}

---

## Spacing semantico

Los tokens semanticos son una capa de lenguaje encima de la escala fluida. No dicen "cuanto mide" un espacio; dicen "para que sirve".

Los multiplicadores tambien son knobs editables:

```css
--ft-space-factor-inner: 0.5;
--ft-space-factor-content: 0.75;
--ft-space-factor-stack: 1;
--ft-space-factor-block: 1;
--ft-space-factor-columns: 1.5;
--ft-space-factor-section: 3;
--ft-space-factor-hero: 4.5;
```

Y generan los tokens finales:

```css
--ft-spacing-inner:   calc(var(--ft-spacing-fluid-xs) * var(--ft-space-factor-inner));
--ft-spacing-content: calc(var(--ft-spacing-fluid-sm) * var(--ft-space-factor-content));
--ft-spacing-stack:   calc(var(--ft-spacing-fluid-sm) * var(--ft-space-factor-stack));
--ft-spacing-block:   calc(var(--ft-spacing-fluid-md) * var(--ft-space-factor-block));
--ft-spacing-columns: calc(var(--ft-spacing-fluid-md) * var(--ft-space-factor-columns));
--ft-spacing-section: calc(var(--ft-spacing-fluid-xl) * var(--ft-space-factor-section));
--ft-spacing-hero:    calc(var(--ft-spacing-fluid-2xl) * var(--ft-space-factor-hero));
```

| Token | Factor inicial | Uso tipico |
|---|---|---|
| `inner` | `0.5` | Padding interno muy ajustado: badges, botones pequenos, chips |
| `content` | `0.75` | Gaps entre elementos de contenido cercano |
| `stack` | `1` | Separacion vertical repetida entre items |
| `block` | `1` | Distancia entre bloques dentro de una seccion |
| `columns` | `1.5` | Gaps entre columnas, cards o grupos paralelos |
| `section` | `3` | Padding vertical principal de secciones |
| `hero` | `4.5` | Espacio de heroes o pantallas de maxima presencia |

---

## Valores aproximados

Con la configuracion actual, estos son los rangos aproximados entre `410px` y `1280px`. No son valores que haya que memorizar; sirven para entender el orden de magnitud de cada token.

| Token | Mobile aprox. | Desktop aprox. | Uso |
|---|---|---|---|
| `inner` | `0.15rem` | `0.33rem` | Padding interno minimo |
| `content` | `0.29rem` | `0.75rem` | Gaps pequenos de contenido |
| `stack` | `0.38rem` | `1rem` | Apilar elementos |
| `block` | `0.5rem` | `1.5rem` | Bloques de contenido |
| `columns` | `0.75rem` | `2.25rem` | Columnas y grids |
| `section` | `2.54rem` | `10.13rem` | Padding vertical principal |
| `hero` | `4.94rem` | `22.78rem` | Heroes y pantallas especiales |

Si estos valores parecen demasiado comprimidos o demasiado amplios, normalmente se ajusta antes `--ft-space-min`, `--ft-space-max` o los multiplicadores semanticos que las clases en el markup.

---

## Uso en Tailwind

Como estos tokens se declaran en `@theme` con el prefijo `--spacing-*`, Tailwind v4 genera utilidades de spacing con esos nombres.

```html
<div class="grid gap-columns p-section">
  <article class="p-block">
    <h2 class="mb-content">Titulo</h2>
    <p>Contenido...</p>
  </article>

  <article class="space-y-stack">
    <p>Item 1</p>
    <p>Item 2</p>
  </article>
</div>
```

Puedes usar los mismos sufijos con las familias habituales de Tailwind:

| Familia | Ejemplos |
|---|---|
| Padding | `p-inner`, `px-content`, `py-section`, `pt-hero` |
| Margin | `m-block`, `mt-section`, `mb-content`, `mx-auto` |
| Gap | `gap-content`, `gap-block`, `gap-columns` |
| Space | `space-y-stack`, `space-x-content` |
| Size | `w-block`, `h-fluid-lg`, `size-inner` |

{% callout title="Preferencia de uso" %}
En layouts y componentes compartidos, usa nombres semanticos (`gap-content`, `p-block`, `py-section`). Reserva `fluid-xs` a `fluid-2xl` para casos donde necesitas expresar un paso tecnico de la escala.
{% /callout %}

---

## Uso directo en CSS

Tambien puedes usar las variables directamente cuando estas escribiendo un componente propio dentro de una layer:

```css
@layer components {
  .feature-card {
    padding: var(--spacing-block);
    gap: var(--spacing-content);
    border-radius: var(--radius-card);
  }

  .feature-card + .feature-card {
    margin-top: var(--spacing-stack);
  }
}
```

En markup de WordPress o Bricks suele ser mas comodo usar clases (`p-block`, `gap-content`). En CSS de componentes compartidos, usar `var(--spacing-*)` deja claro que el componente depende del sistema semantico.

---

## Que knob tocar

| Necesidad | Variable |
|---|---|
| Todo el spacing se siente pequeno o grande | `--ft-space-factor` |
| El mobile necesita mas o menos aire | `--ft-space-min` |
| El desktop necesita mas o menos aire | `--ft-space-max` |
| La escala entre pasos es demasiado plana o exagerada en mobile | `--ft-space-step-min` |
| La escala entre pasos es demasiado plana o exagerada en desktop | `--ft-space-step-max` |
| Solo un significado esta mal calibrado | `--ft-space-factor-inner` a `--ft-space-factor-hero` |
| Las secciones deben respirar mas o menos | `--ft-padding-content-y`, `--ft-padding-content-y-half` o `--ft-space-factor-section` |
| El gap interno del contenedor de seccion debe cambiar | `--ft-gap-content` |

{% callout title="Orden recomendado" %}
Primero ajusta los knobs globales si toda la escala esta desplazada. Despues ajusta multiplicadores semanticos si solo falla un tipo de espacio. Cambia clases en el markup solo cuando el problema es local de una composicion concreta.
{% /callout %}

---

## Andamiaje de secciones

Las secciones de FDS usan los tokens semanticos como configuracion por defecto:

```css
--ft-padding-content-y: var(--spacing-section);
--ft-padding-content-y-half: 1.2675rem; /* fallback; en moderno se calcula desde --ft-padding-content-y */
--ft-gap-content: var(--spacing-block);
```

`layouts/section.css` aplica esa configuracion al elemento `section` y a su hijo directo:

```css
section {
  @apply w-full px-[var(--ft-padding-content-x)];
  padding-top: var(--ft-padding-content-y-half);
  padding-bottom: var(--ft-padding-content-y-half);
}

section > div {
  @apply mx-auto w-full max-w-[var(--ft-container)] flex flex-col gap-[var(--ft-gap-content)];
}
```

En navegadores modernos, la media seccion exacta se activa dentro del mismo bloque de mejora fluida que exige `clamp()`, `calc()`, multiplicacion y division:

```css
@supports (font-size: clamp(1rem, 2vw, 2rem)) and
  (font-size: calc(1rem * 1)) and
  (padding-top: calc(1rem / 2)) {
  :root {
    --ft-padding-content-y-half: calc(var(--ft-padding-content-y) / 2);
  }
}
```

Esto significa que una seccion basica ya tiene:

| Elemento | Espacio aplicado |
|---|---|
| `section` | Padding horizontal global y medio padding vertical |
| `section > div` | Contenedor centrado, ancho maximo y `gap-block` via `--ft-gap-content` |
| `section.has-background` | Padding vertical completo |
| Primera/ultima seccion | Padding top/bottom completo para cerrar bien la pagina |
| `.half-top` / `.half-bottom` | Mitad del padding en el lado indicado |

---

## Prose y ritmo editorial

`.prose` pertenece a la capa `base` y define el ritmo de contenido editorial: titulos, parrafos, listas, citas y tablas dentro de un wrapper.

```html
<article class="prose">
  <h2>Titulo de contenido</h2>
  <p>Primer parrafo editorial.</p>
  <p>Segundo parrafo con ritmo automatico.</p>
  <ul>
    <li>Elemento de lista</li>
    <li>Elemento de lista</li>
  </ul>
</article>
```

El sistema de spacing semantico se usa sobre todo en layouts manuales (`gap-content`, `p-block`, `py-section`). `.prose` resuelve el ritmo interno del contenido largo con reglas base anidadas. Es una capa distinta: no necesitas poner `mb-content` en cada parrafo de un articulo.

---

## Pagina de auditoria copiable

Copia este bloque en una pagina de prueba con FDS activo. Sirve para revisar de un vistazo como cambian la escala fluida, los espacios semanticos, los gaps, los paddings y el ritmo de `.prose` cuando modificas variables en `theme/flowtitude.css`.

```html
<main>
  <section class="has-background bg-secondary-50 text-secondary-950">
    <div>
      <header class="content-flex top-left max-w-4xl">
        <span class="eyebrow">Auditoria FDS</span>
        <h1 class="display-sm">Mapa visual del spacing fluido</h1>
        <p class="text-large">
          Cambia los knobs de spacing y revisa como se recalculan las barras,
          paddings, gaps, secciones y contenido editorial.
        </p>
      </header>

      <div class="grid gap-columns lg:grid-cols-2">
        <article class="rounded-card border border-secondary-200 bg-white p-block">
          <h2 class="heading-sm mb-content">Escala fluid-*</h2>
          <div class="space-y-stack">
            <div class="grid grid-cols-[9rem_1fr] items-center gap-content">
              <code>h-fluid-xs</code>
              <div class="h-fluid-xs bg-primary-500"></div>
            </div>
            <div class="grid grid-cols-[9rem_1fr] items-center gap-content">
              <code>h-fluid-sm</code>
              <div class="h-fluid-sm bg-primary-500"></div>
            </div>
            <div class="grid grid-cols-[9rem_1fr] items-center gap-content">
              <code>h-fluid-md</code>
              <div class="h-fluid-md bg-primary-500"></div>
            </div>
            <div class="grid grid-cols-[9rem_1fr] items-center gap-content">
              <code>h-fluid-lg</code>
              <div class="h-fluid-lg bg-primary-500"></div>
            </div>
            <div class="grid grid-cols-[9rem_1fr] items-center gap-content">
              <code>h-fluid-xl</code>
              <div class="h-fluid-xl bg-primary-500"></div>
            </div>
            <div class="grid grid-cols-[9rem_1fr] items-center gap-content">
              <code>h-fluid-2xl</code>
              <div class="h-fluid-2xl bg-primary-500"></div>
            </div>
          </div>
        </article>

        <article class="rounded-card border border-secondary-200 bg-white p-block">
          <h2 class="heading-sm mb-content">Tokens semanticos</h2>
          <div class="space-y-stack">
            <div class="p-inner border border-secondary-200">
              <code>p-inner</code>
            </div>
            <div class="p-content border border-secondary-200">
              <code>p-content</code>
            </div>
            <div class="p-stack border border-secondary-200">
              <code>p-stack</code>
            </div>
            <div class="p-block border border-secondary-200">
              <code>p-block</code>
            </div>
            <div class="p-columns border border-secondary-200">
              <code>p-columns</code>
            </div>
          </div>
        </article>
      </div>

      <article class="rounded-card border border-secondary-200 bg-white p-block">
        <h2 class="heading-sm mb-content">Gaps comparados</h2>
        <div class="grid gap-columns md:grid-cols-3">
          <div>
            <h3 class="subheading-sm mb-content">gap-content</h3>
            <div class="grid gap-content">
              <div class="bg-secondary-100 p-content">Item</div>
              <div class="bg-secondary-100 p-content">Item</div>
              <div class="bg-secondary-100 p-content">Item</div>
            </div>
          </div>

          <div>
            <h3 class="subheading-sm mb-content">gap-block</h3>
            <div class="grid gap-block">
              <div class="bg-secondary-100 p-content">Item</div>
              <div class="bg-secondary-100 p-content">Item</div>
              <div class="bg-secondary-100 p-content">Item</div>
            </div>
          </div>

          <div>
            <h3 class="subheading-sm mb-content">gap-columns</h3>
            <div class="grid gap-columns">
              <div class="bg-secondary-100 p-content">Item</div>
              <div class="bg-secondary-100 p-content">Item</div>
              <div class="bg-secondary-100 p-content">Item</div>
            </div>
          </div>
        </div>
      </article>

      <article class="rounded-card border border-secondary-200 bg-white p-block">
        <h2 class="heading-sm mb-content">Padding de seccion</h2>
        <div class="space-y-stack">
          <div class="bg-secondary-100 px-content py-section">
            <code>py-section</code>
          </div>
          <div class="bg-secondary-200 px-content py-hero">
            <code>py-hero</code>
          </div>
        </div>
      </article>

      <div class="grid gap-columns lg:grid-cols-2">
        <article class="rounded-card border border-secondary-200 bg-white p-block">
          <h2 class="heading-sm mb-content">Ritmo manual</h2>
          <div class="space-y-stack">
            <p class="text-medium">
              Este bloque usa <code>space-y-stack</code> para separar items
              disenados a mano.
            </p>
            <p class="text-medium">
              Es el patron recomendado para composiciones controladas.
            </p>
            <a class="btn btn-primary" href="#">Boton con spacing interno</a>
          </div>
        </article>

        <article class="prose rounded-card border border-secondary-200 bg-white p-block">
          <h2>Ritmo prose</h2>
          <p>
            Este bloque usa <code>prose</code>. Los parrafos, enlaces, listas y
            titulos reciben ritmo editorial desde la capa base.
          </p>
          <p>
            No hace falta asignar <code>mb-content</code> a cada parrafo.
          </p>
          <ul>
            <li>Lista generada desde contenido largo.</li>
            <li>Segundo item con ritmo interno automatico.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</main>
```

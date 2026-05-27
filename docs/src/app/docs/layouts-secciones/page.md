---
title: Secciones
---

Las secciones de FDS resuelven el ritmo vertical de la pagina. Cada `<section>` recibe padding horizontal, padding vertical contextual y un contenedor interior centrado. El objetivo es que una pagina hecha con bloques repetidos mantenga aire consistente sin tener que decidir `py-*` en cada seccion.

---

## Estructura basica

El patron esperado es:

```html
<main>
  <section>
    <div>
      <div>Bloque 1</div>
      <div>Bloque 2</div>
    </div>
  </section>
</main>
```

FDS aplica estilos al `section` y a su hijo directo:

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

La mitad del padding se resuelve con `--ft-padding-content-y-half`. Tiene fallback estatico para navegadores con CSS math limitado y, en navegadores modernos, se calcula como `calc(var(--ft-padding-content-y) / 2)`.

---

## Spacing contextual

FDS no aplica siempre el mismo padding vertical. Mira el contexto:

| Situacion | Comportamiento |
|---|---|
| Primera seccion de `main` | Padding top completo |
| Ultima seccion de `main` | Padding bottom completo |
| `.has-background` | Padding vertical completo |
| Seccion antes de `.has-background` | Padding bottom completo |
| `.half-top` | Fuerza mitad del padding top |
| `.half-bottom` | Fuerza mitad del padding bottom |

{% fds-example name="sections-context" /%}

---

## Casos de uso

### Hero

Usa la primera seccion de `main`. El sistema ya le da padding superior completo:

```html
<main>
  <section>
    <div>
      <header class="content-flex top-left max-w-4xl">
        <span class="eyebrow">Flowtitude</span>
        <h1 class="display-sm">Design system fluido para WordPress</h1>
        <p class="text-large">Tokens, componentes y layouts sobre Tailwind CSS 4.</p>
      </header>
    </div>
  </section>
</main>
```

### Banda con fondo

Cuando una seccion tiene fondo propio, anade `.has-background` para que respire por arriba y por abajo:

```html
<section class="has-background bg-primary-500 text-white">
  <div>
    <div class="content-flex center max-w-3xl">
      <h2 class="heading">CTA destacado</h2>
      <p class="text-large">Una seccion con fondo necesita mas aire vertical.</p>
    </div>
  </div>
</section>
```

### Listado de cards

El contenedor interior ya tiene `gap-[var(--ft-gap-content)]`. Dentro puedes usar grids:

```html
<section>
  <div>
    <header class="content-flex top-left max-w-3xl">
      <h2 class="heading">Servicios</h2>
      <p class="text-large">Una introduccion breve antes del grid.</p>
    </header>

    <div class="grid grid-auto-fill-md gap-columns">
      <article class="card card-elevated">...</article>
      <article class="card card-elevated">...</article>
      <article class="card card-elevated">...</article>
    </div>
  </div>
</section>
```

---

## Block bleed

`.block-bleed` permite sacar un elemento del ancho del contenedor y llevarlo al ancho del viewport:

```html
<section>
  <div>
    <div class="block-bleed">
      <img src="..." class="w-full" alt="" />
    </div>
  </div>
</section>
```

Usalo para imagenes panoramicas, bandas visuales o mapas que deben romper el contenedor. No lo uses para texto largo: perderia legibilidad.

---

## Configuracion

| Necesitas | Variable a tocar |
|---|---|
| Cambiar ancho maximo del contenido | `--ft-container` |
| Cambiar padding horizontal de pagina | `--ft-padding-content-x` |
| Cambiar padding vertical de seccion | `--ft-padding-content-y` |
| Ajustar fallback de la mitad vertical | `--ft-padding-content-y-half` |
| Cambiar gap entre bloques internos | `--ft-gap-content` |

```css
--ft-container: 90%;
--ft-padding-content-x: 1rem;
--ft-padding-content-y: var(--spacing-section);
--ft-padding-content-y-half: 1.2675rem;
--ft-gap-content: var(--spacing-block);
```

En navegadores modernos, `--ft-container` se mejora a `min(var(--container-7xl), 90%)`. El fallback base evita depender de `min()` en navegadores con soporte limitado de CSS math.

---

## WordPress y Bricks

En Bricks, intenta respetar el patron `section > div > contenido`. Si el builder mete wrappers intermedios, aplica las clases de layout en el wrapper que actua como contenedor real.

En Gutenberg, revisa si el bloque final usa `.has-background`. Si Gutenberg anade fondo a un wrapper interno pero no al `<section>`, puede que FDS no detecte la seccion como banda con fondo. En ese caso, aplica `.has-background` manualmente en el contenedor que represente la seccion.

---

## Errores comunes

| Error | Mejor alternativa |
|---|---|
| Poner `py-section` manual en todas las secciones | Dejar que `section.css` gestione el ritmo |
| Meter varios contenedores max-width dentro del hijo directo | Usar un unico `section > div` y grids internos |
| Usar `.has-background` para pequenos detalles visuales | Reservarlo para bandas/secciones con fondo real |
| Usar `.block-bleed` para parrafos | Usarlo solo para media o piezas visuales amplias |
| Cambiar `section.css` para un caso puntual | Usar `.half-top`, `.half-bottom` o una utilidad local |


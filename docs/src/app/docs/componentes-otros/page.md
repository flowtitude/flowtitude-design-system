---
title: Otros componentes
---

Ademas de botones, tipografia y cards, FDS incluye pequenos componentes auxiliares. Son utilidades semanticas que resuelven patrones repetidos en paginas WordPress: imagenes de fondo, cards clicables, foco desde hijos y etiquetas eyebrow.

---

## Background image

`.bg-image` coloca una imagen como fondo absoluto del contenedor:

```css
.bg-image {
  @apply absolute inset-0 size-full object-cover -z-1;
}
```

Patron recomendado:

```html
<div class="relative overflow-hidden rounded-lg">
  <img class="bg-image" src="hero.jpg" alt="" />
  <div class="content-flex center relative z-10 min-h-[30rem] text-white">
    <h2 class="heading">Texto sobre imagen</h2>
  </div>
</div>
```

El contenedor padre debe ser `relative`; si no, la imagen absoluta puede posicionarse respecto a otro ancestro.

---

## Click parent

`.click-parent` amplia la zona clicable de un enlace hasta cubrir su contenedor padre mediante un pseudo-elemento. `.focus-from-child` se coloca en el padre para que el foco del enlace destaque toda la pieza.

```html
<article class="card card-elevated focus-from-child">
  <h3 class="subheading-sm">Titulo</h3>
  <p class="text-medium">Descripcion breve.</p>
  <a href="/..." class="btn btn-link click-parent">Leer mas</a>
</article>
```

{% fds-example name="other-click-parent" /%}

{% callout title="Accesibilidad" %}
El enlace sigue siendo el elemento interactivo real. No sustituyas este patron por un `div` con `onclick`, porque perderias semantica, teclado y comportamiento nativo.
{% /callout %}

---

## Focus from child

`.focus-from-child` aplica estilos al contenedor cuando algun hijo recibe foco. Es especialmente util con `.click-parent`, formularios dentro de cards o bloques donde el foco debe ser visible a escala de componente.

```html
<label class="card card-outline focus-from-child">
  <span class="subheading-sm">Email</span>
  <input class="mt-4 w-full rounded-md border px-4 py-3" type="email" />
</label>
```

---

## Eyebrow

`.eyebrow` crea una etiqueta pequena en uppercase:

```css
.eyebrow {
  @apply border rounded-md py-1 px-3 text-sm uppercase;
}
```

Uso habitual:

```html
<span class="eyebrow">Nuevo</span>
<h2 class="heading">Titulo de seccion</h2>
```

Sirve para categorias, estados, labels de seccion, pequenas llamadas visuales o metadatos. No debe sustituir a un badge funcional si necesitas estados complejos, colores semanticos o iconos.

---

## Casos de uso

| Necesitas | Componente |
|---|---|
| Imagen cubriendo todo un bloque | `.bg-image` |
| Card entera clicable con enlace semantico | `.click-parent` + `.focus-from-child` |
| Destacar una card al enfocar un enlace interno | `.focus-from-child` |
| Etiqueta previa a un titulo | `.eyebrow` |

---

## Errores comunes

| Error | Mejor alternativa |
|---|---|
| Usar `.bg-image` sin padre `relative` | Anadir `relative` al contenedor |
| Usar `.click-parent` en varios enlaces dentro de la misma card | Dejar un unico enlace principal |
| Ocultar el texto del enlace sin `aria-label` | Mantener texto visible o anadir nombre accesible |
| Usar `.eyebrow` para chips interactivos | Crear un componente especifico si hay interaccion |


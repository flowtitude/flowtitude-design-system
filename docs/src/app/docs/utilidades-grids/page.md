---
title: Grids proporcionales
---

Los grids proporcionales de FDS son utilidades `@utility` para crear columnas con relaciones tipo `1fr 2fr`, `2fr 1fr` o `1fr 2fr 1fr` sin escribir valores arbitrarios. Son utiles para layouts editoriales, sidebars, comparativas y composiciones donde una columna debe dominar.

---

## Dos columnas

| Clase | Proporcion | Uso habitual |
|---|---|---|
| `grid-cols-1-2` | 1fr 2fr | Sidebar pequena + contenido principal |
| `grid-cols-2-1` | 2fr 1fr | Contenido principal + aside |
| `grid-cols-1-3` | 1fr 3fr | Aside muy secundaria |
| `grid-cols-3-1` | 3fr 1fr | Contenido editorial amplio |
| `grid-cols-1-4` | 1fr 4fr | Navegacion lateral estrecha |
| `grid-cols-4-1` | 4fr 1fr | Ficha principal + metadata |
| `grid-cols-2-3` | 2fr 3fr | Dos columnas cercanas pero no iguales |
| `grid-cols-3-2` | 3fr 2fr | Variante inversa |

{% fds-example name="grids-proportional" /%}

---

## Tres columnas

| Clase | Proporcion |
|---|---|
| `grid-cols-1-2-1` | 1fr 2fr 1fr |
| `grid-cols-1-1-2` | 1fr 1fr 2fr |
| `grid-cols-2-1-1` | 2fr 1fr 1fr |
| `grid-cols-2-1-2` | 2fr 1fr 2fr |
| `grid-cols-1-2-2` | 1fr 2fr 2fr |
| `grid-cols-2-2-1` | 2fr 2fr 1fr |
| `grid-cols-1-3-1` | 1fr 3fr 1fr |
| `grid-cols-1-1-3` | 1fr 1fr 3fr |
| `grid-cols-3-1-1` | 3fr 1fr 1fr |
| `grid-cols-1-4-1` | 1fr 4fr 1fr |
| `grid-cols-1-1-4` | 1fr 1fr 4fr |
| `grid-cols-4-1-1` | 4fr 1fr 1fr |
| `grid-cols-1-3-2` | 1fr 3fr 2fr |
| `grid-cols-2-3-1` | 2fr 3fr 1fr |
| `grid-cols-1-2-3` | 1fr 2fr 3fr |
| `grid-cols-2-1-3` | 2fr 1fr 3fr |
| `grid-cols-3-2-1` | 3fr 2fr 1fr |
| `grid-cols-3-1-2` | 3fr 1fr 2fr |

---

## Casos de uso

### Sidebar y contenido

```html
<div class="grid grid-cols-1-3 gap-columns">
  <aside class="card card-outline">Indice</aside>
  <article class="prose">Contenido largo</article>
</div>
```

### Hero dividido

```html
<section>
  <div>
    <div class="grid grid-cols-1-2 gap-columns items-center">
      <div class="content-flex top-left">
        <h1 class="display-sm">Titulo</h1>
        <p class="text-large">Entradilla de la seccion.</p>
      </div>
      <img src="..." alt="" />
    </div>
  </div>
</section>
```

### Comparativa

```html
<div class="grid grid-cols-1-2-1 gap-columns">
  <div class="card card-outline">Basico</div>
  <div class="card card-elevated">Recomendado</div>
  <div class="card card-outline">Avanzado</div>
</div>
```

---

## Mobile y responsive

Las utilidades solo definen columnas. Para mobile, combinalas con prefijos responsive de Tailwind:

```html
<div class="grid gap-columns md:grid-cols-1-2">
  <aside>Sidebar</aside>
  <main>Contenido</main>
</div>
```

Asi el layout queda en una columna por defecto y pasa a proporcion en `md`.

Todas las columnas usan `minmax(0, Nfr)` para reducir el riesgo de overflow cuando hay texto largo, imagenes o contenido que de otro modo intentaria forzar el ancho.

---

## Cuando no usarlos

| Situacion | Mejor alternativa |
|---|---|
| Listado de cards repetibles | `grid-auto-fill-*` o `grid-auto-fit-*` |
| Columnas iguales simples | `grid-cols-2`, `grid-cols-3`, etc. |
| Layout que depende del numero de items | Auto-grid |
| Microalineaciones internas | Flex o utilidades locales |


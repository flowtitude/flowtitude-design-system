---
title: Auto Fill / Fit
---

Las utilidades `grid-auto-fill-*` y `grid-auto-fit-*` crean grids responsivos sin escribir media queries. Usan los tamanos semanticos de card como minimo de columna y dejan que el navegador calcule cuantas columnas caben.

---

## API

| Clase | Minimo de columna |
|---|---|
| `grid-auto-fill-xs` / `grid-auto-fit-xs` | `--ft-card-xs` |
| `grid-auto-fill-sm` / `grid-auto-fit-sm` | `--ft-card-sm` |
| `grid-auto-fill-md` / `grid-auto-fit-md` | `--ft-card-md` |
| `grid-auto-fill-lg` / `grid-auto-fit-lg` | `--ft-card-lg` |
| `grid-auto-fill-xl` / `grid-auto-fit-xl` | `--ft-card-xl` |

El CSS usa `min(var(--ft-card-*), 100%)` dentro del `minmax()` para que el minimo no pueda superar el ancho disponible del contenedor.

```css
grid-template-columns: repeat(
  auto-fill,
  minmax(min(var(--ft-card-md), 100%), 1fr)
);
```

---

## Fill vs fit

| Modo | Comportamiento | Uso recomendado |
|---|---|---|
| `auto-fill` | Mantiene tracks vacios aunque no haya item | Grids de catalogo, listados estables, filas que no deben estirarse demasiado |
| `auto-fit` | Colapsa tracks vacios y estira los ocupados | Bloques con pocos items, features, CTAs secundarios |

{% fds-example name="auto-grid-cards" /%}

---

## Patron con cards

```html
<div class="grid grid-auto-fill-md gap-columns">
  <article class="card card-elevated">...</article>
  <article class="card card-elevated">...</article>
  <article class="card card-elevated">...</article>
  <article class="card card-elevated">...</article>
</div>
```

Usa `gap-columns` para la separacion horizontal entre columnas. Si el contenido es muy denso o esta dentro de una card pequena, `gap-content` puede ser suficiente.

---

## Como elegir tamano

| Quieres | Clase probable |
|---|---|
| Muchas piezas pequenas | `grid-auto-fill-xs` o `grid-auto-fill-sm` |
| Features normales | `grid-auto-fill-md` |
| Cards editoriales o pricing | `grid-auto-fit-lg` |
| Bloques muy amplios | `grid-auto-fit-xl` |

Si tienes dudas, empieza por `grid-auto-fill-md`. Es el equilibrio mas seguro para cards de contenido general.

---

## Configuracion

Los minimos se ajustan en `theme/flowtitude.css`:

```css
--ft-card-xs: 12rem;
--ft-card-sm: 14rem;
--ft-card-md: 18rem;
--ft-card-lg: 24rem;
--ft-card-xl: 36rem;
```

| Necesitas | Ajuste recomendado |
|---|---|
| Que quepan mas columnas | Baja el `--ft-card-*` usado |
| Cards mas legibles con texto largo | Sube el `--ft-card-*` usado |
| Evitar columnas demasiado grandes con pocos items | Usa `auto-fill` |
| Que pocos items llenen la fila | Usa `auto-fit` |

---

## Errores comunes

| Error | Mejor alternativa |
|---|---|
| Usar `grid-auto-fit-xl` para cards pequenas | Usar `sm` o `md` |
| Cambiar el CSS del grid para un solo listado | Elegir otro tamano `xs-xl` |
| Quitar `min(..., 100%)` del `minmax()` | Mantenerlo para evitar overflow mobile |
| Usar auto-grid para layouts editoriales asimetricos | Usar grids proporcionales |


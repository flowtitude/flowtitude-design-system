---
title: Cards
---

Las cards de FDS son contenedores de contenido con padding, radio y ancho maximo opcional. Estan pensadas para features, pricing, entradas, servicios, metricas, testimonios o cualquier bloque repetible que deba convivir bien con grids.

El componente es deliberadamente pequeno: FDS no impone estructura interna. La jerarquia la construyes combinando `.card` con clases tipograficas, botones, grids y utilidades de spacing.

---

## Anatomia

```html
<article class="card card-elevated">
  <span class="eyebrow">Feature</span>
  <h3 class="subheading-sm">Tokens fluidos</h3>
  <p class="text-medium">Descripcion breve del beneficio.</p>
</article>
```

```css
.card {
  padding: var(--spacing-block);
  border-radius: var(--radius-card);
  background-color: var(--ft-color-background);
  width: 100%;
}
```

La card usa `--spacing-block`, por eso su aire interno sigue la escala semantica del sistema. Si compactas o abres el spacing global, las cards acompanaran el cambio.

---

## Variantes

| Clase | Efecto | Uso |
|---|---|---|
| `.card` | Base con padding, radio, fondo y ancho 100% | Cualquier bloque repetible |
| `.card-outline` | Borde solido y fondo transparente | Cards secundarias, listados, comparativas |
| `.card-elevated` | Sombra sutil | Cards destacadas o interactivas |

{% fds-example name="cards-basic" /%}

---

## Tamanos

Los tamanos de card controlan `max-width`, no el ancho obligatorio. Esto permite que la card ocupe el espacio disponible en mobile y quede limitada en layouts mas amplios.

| Clase | Max-width | Uso tipico |
|---|---|---|
| `.card-xs` | `--ft-card-xs` | Mini cards, badges grandes, KPIs compactos |
| `.card-sm` | `--ft-card-sm` | Cards pequenas en barras o dashboards |
| `.card-md` | `--ft-card-md` | Features, servicios, listados habituales |
| `.card-lg` | `--ft-card-lg` | Cards editoriales, pricing, previews ricos |
| `.card-xl` | `--ft-card-xl` | Bloques destacados o contenido largo |

Las mismas variables se usan como minimos de `grid-auto-fill-*` y `grid-auto-fit-*`. Esa relacion hace que card y grid hablen el mismo idioma.

```css
--ft-card-xs: 12rem;
--ft-card-sm: 14rem;
--ft-card-md: 18rem;
--ft-card-lg: 24rem;
--ft-card-xl: 36rem;
```

---

## Cards en grid

Para listados de servicios, features o entradas, usa `.card` dentro de `grid-auto-fill-*` o `grid-auto-fit-*`:

```html
<div class="grid grid-auto-fill-md gap-columns">
  <article class="card card-elevated">...</article>
  <article class="card card-elevated">...</article>
  <article class="card card-elevated">...</article>
</div>
```

`grid-auto-fill-md` usa `--ft-card-md` como minimo de columna y lo limita al 100% del contenedor. Si el minimo de card es mayor que el viewport movil, no deberia aparecer scroll horizontal.

{% fds-example name="cards-clickable-grid" /%}

---

## Card clicable

Cuando toda la card debe ser clicable, conserva un enlace real y aplica `.click-parent` al enlace. Aplica `.focus-from-child` al contenedor para que el focus del enlace pueda destacar la card completa.

```html
<article class="card card-elevated focus-from-child">
  <h3 class="subheading-sm">Titulo de la card</h3>
  <p class="text-medium">Descripcion breve.</p>
  <a class="btn btn-link click-parent" href="/servicio/">Leer mas</a>
</article>
```

Este patron mantiene la semantica: no convierte todo el `<article>` en enlace, pero amplia la zona clicable mediante el pseudo-elemento del enlace.

---

## Casos de uso

| Caso | Clases recomendadas |
|---|---|
| Feature card | `.card card-elevated` con `.subheading-sm` y `.text-medium` |
| Pricing simple | `.card card-lg card-elevated` y CTA `.btn btn-primary` |
| Entrada de blog | `.card card-outline` + media + `.click-parent` |
| KPI o metrica | `.card card-sm` + numero grande con `.heading-sm` |
| Comparativa secundaria | `.card card-outline` en `grid-auto-fit-md` |

---

## Configuracion

| Necesitas | Variable a tocar |
|---|---|
| Mas o menos padding interno | `--spacing-block` o `--ft-space-factor-block` |
| Radio mas suave o mas editorial | `--radius-card` |
| Cards mas estrechas o anchas en grids | `--ft-card-xs` a `--ft-card-xl` |
| Fondo general de card | `--ft-color-background` |
| Borde de outline | Color usado en `.card-outline` |

Si quieres hacer las cards mas compactas en todo el sistema, normalmente es mejor ajustar `--ft-space-factor-block` que cambiar `.card` directamente. Asi otros componentes que dependen del mismo espacio siguen en proporcion.

---

## Errores comunes

| Error | Mejor alternativa |
|---|---|
| Meter una card dentro de otra card | Usar `div` internos sin `.card` |
| Usar `.card-lg` para forzar columnas grandes | Ajustar el grid o `--ft-card-*` |
| Hacer toda la card un `<a>` con mucho contenido | Usar `.click-parent` en un enlace interno |
| Definir padding manual distinto en cada card | Ajustar `--spacing-block` o usar utilidades semanticas puntuales |
| Mezclar sombras fuertes en muchas cards | Reservar `.card-elevated` para jerarquia real |


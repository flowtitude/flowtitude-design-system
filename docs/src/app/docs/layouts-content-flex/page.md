---
title: Content Flex
---

`.content-flex` es un helper de posicionamiento para organizar contenido en 9 puntos dentro de un contenedor. Es util en heroes, overlays, cards visuales, bloques con imagen de fondo, CTAs y secciones donde no quieres escribir siempre la misma combinacion de `flex`, `justify-*`, `items-*` y `text-*`.

---

## Uso basico

Combina `.content-flex` con una clase de posicion:

```html
<div class="content-flex top-left">
  <span class="eyebrow">Sistema</span>
  <h2 class="heading">Titulo alineado arriba a la izquierda</h2>
  <p class="text-medium">Texto de apoyo.</p>
</div>
```

Sin clase de posicion, el default visual esperado es centrado.

---

## Posiciones disponibles

| Clase | Justify | Align | Text |
|---|---|---|---|
| `.top-left` | start | start | left |
| `.top` | start | center | center |
| `.top-right` | start | end | right |
| `.left` | center | start | left |
| `.center` | center | center | center |
| `.right` | center | end | right |
| `.bottom-left` | end | start | left |
| `.bottom` | end | center | center |
| `.bottom-right` | end | end | right |

{% fds-example name="content-flex-positions" /%}

---

## Casos de uso

### Cabecera de seccion

```html
<header class="content-flex top-left max-w-3xl">
  <span class="eyebrow">Servicios</span>
  <h2 class="heading">Soluciones para equipos que publican rapido</h2>
  <p class="text-large">Una descripcion breve antes de un grid de cards.</p>
</header>
```

### Hero centrado

```html
<section>
  <div>
    <div class="content-flex center min-h-[60vh] max-w-4xl">
      <h1 class="display-sm">Una portada equilibrada</h1>
      <p class="text-large">Contenido centrado con gap semantico.</p>
      <a class="btn btn-primary" href="#">Empezar</a>
    </div>
  </div>
</section>
```

### Overlay sobre imagen

```html
<div class="relative min-h-[28rem] overflow-hidden rounded-lg">
  <img class="bg-image" src="..." alt="" />
  <div class="content-flex bottom-left relative z-10 p-block text-white">
    <h2 class="heading-sm">Titulo sobre imagen</h2>
    <p class="text-medium">Texto anclado abajo a la izquierda.</p>
  </div>
</div>
```

---

## Spacing interno

`.content-flex` usa `gap-content`, el token semantico pensado para separar piezas de contenido relacionadas. Tambien resetea patrones tipo `space-y` para evitar dobles espaciados.

Si necesitas mas aire entre grupos, no cambies `.content-flex`; anade una estructura interna:

```html
<div class="content-flex top-left">
  <header class="grid gap-content">
    <span class="eyebrow">Guia</span>
    <h2 class="heading">Titulo</h2>
  </header>
  <p class="text-large">Texto de apoyo.</p>
</div>
```

---

## Configuracion

El gap viene de `--ft-gap-content`, definido normalmente como `var(--spacing-block)`:

```css
--ft-gap-content: var(--spacing-block);
```

| Necesitas | Ajuste recomendado |
|---|---|
| Todo el contenido interno mas compacto | Baja `--ft-gap-content` |
| Separacion global mas amplia entre bloques | Ajusta `--spacing-block` o su factor |
| Un caso concreto mas abierto | Usa `gap-block`, `gap-columns` o una utilidad local |

---

## Errores comunes

| Error | Mejor alternativa |
|---|---|
| Usar `.content-flex` para layouts de columnas | Usar `grid` o `flex` manual |
| Anidar muchas capas `.content-flex` | Reservarlo para el contenedor que posiciona |
| Forzar alineacion con utilidades que contradicen `.top-left` | Elegir la posicion correcta |
| Usarlo en contenido largo `.prose` | Aplicarlo a la cabecera, no al articulo entero |


---
title: Custom variants
---

FDS define 3 custom variants de Tailwind para responder al estado del padre o para aplicar estilos al padre desde un hijo directo. Son utiles en cards, enlaces ampliados, formularios compactos y patrones donde no quieres anadir clases auxiliares como `group` al contenedor.

---

## parent

`parent:*` aplica la utilidad al padre que contiene el elemento como hijo directo:

```css
@custom-variant parent (*:has(> &));
```

```html
<div>
  <span class="parent:bg-blue-100 parent:p-8">Hijo</span>
</div>
```

En este caso, el `div` recibe el fondo y el padding porque contiene un hijo con la variant.

---

## parent-hover

`parent-hover:*` aplica estilos al hijo cuando su padre recibe hover:

```css
@custom-variant parent-hover (*:hover > &);
```

```html
<article class="card card-outline">
  <h3 class="subheading-sm parent-hover:text-primary-500">
    Titulo que reacciona al hover de la card
  </h3>
</article>
```

---

## parent-focus-within

`parent-focus-within:*` responde cuando el padre contiene el foco:

```css
@custom-variant parent-focus-within (*:focus-within > &);
```

```html
<label class="card card-outline">
  <span class="parent-focus-within:text-primary-500">Email</span>
  <input class="parent-focus-within:border-blue-500" type="email" />
</label>
```

{% fds-example name="variants-parent" /%}

---

## Casos de uso

| Caso | Variant |
|---|---|
| Destacar un titulo cuando la card recibe hover | `parent-hover:text-primary-500` |
| Cambiar borde de input cuando el label/card contiene foco | `parent-focus-within:border-*` |
| Aplicar padding/fondo al padre desde un hijo marcador | `parent:bg-*`, `parent:p-*` |
| Microinteracciones en cards sin clase `group` | `parent-hover:*` |

---

## Diferencia con group

Las variants `group-*` de Tailwind requieren una clase `group` en el padre y seleccionan descendientes. Las variants de FDS se basan en `:has()` y trabajan con el hijo directo:

```html
<!-- Tailwind group -->
<article class="group">
  <h3 class="group-hover:text-primary-500">Titulo</h3>
</article>

<!-- FDS parent-hover -->
<article>
  <h3 class="parent-hover:text-primary-500">Titulo</h3>
</article>
```

Usa `group-*` si necesitas afectar descendientes profundos o compatibilidad mas amplia. Usa `parent-*` si quieres markup mas limpio y el elemento afectado es hijo directo.

---

## Compatibilidad

Estas variants dependen de `:has()`. Los navegadores modernos lo soportan, pero si necesitas compatibilidad con navegadores antiguos, deja una experiencia base valida sin depender exclusivamente de la variant.

{% callout title="Regla practica" %}
Usa estas variants para mejora progresiva: hover, focus, pequenas transiciones y estados visuales. No escondas informacion esencial detras de `:has()`.
{% /callout %}


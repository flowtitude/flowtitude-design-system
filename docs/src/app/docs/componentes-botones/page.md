---
title: Botones
---

El sistema de botones de FDS parte de una clase base, `.btn`, y la combina con variantes de color, tamano, forma y ancho. La idea no es crear una clase distinta para cada caso, sino componer una pequena API estable.

Usa botones para acciones. Si el elemento navega a otra pagina, puede ser un `<a>` con clase `.btn`. Si ejecuta una accion en la interfaz o envia un formulario, debe ser un `<button>`.

---

## Anatomia

```html
<a class="btn btn-primary" href="/contacto/">Contactar</a>
```

La clase `.btn` aporta layout, alineacion, transicion, gap interno y padding. La variante decide la jerarquia visual:

```css
.btn {
  @apply flex overflow-hidden relative items-center justify-center
         font-semibold rounded-button transition min-w-fit gap-2 duration-normal
         py-[var(--btn-py)] px-[var(--btn-px)];
}
```

El padding usa `em`, por eso las variantes de tamano escalan el boton completo al cambiar el `font-size`.

---

## Variantes de color

| Clase | Uso recomendado |
|---|---|
| `.btn-primary` | Accion principal de negocio: comprar, reservar, empezar, contactar |
| `.btn-secondary` | Accion complementaria con presencia parecida al primary |
| `.btn-outline` | Accion secundaria en grupos de CTA |
| `.btn-light` | Boton sobre fondos oscuros o piezas visuales intensas |
| `.btn-dark` | Boton neutro sobre fondos claros |
| `.btn-link` | Accion terciaria o enlace contextual dentro de una composicion. Hereda el color de su superficie, así que funciona igual sobre fondo claro que oscuro |

{% fds-example name="buttons-variants" /%}

{% callout title="Jerarquia practica" %}
En una misma zona visual intenta tener un unico `.btn-primary`. Si todo parece principal, nada parece principal.
{% /callout %}

---

## Tamanos y layout

| Clase | Efecto |
|---|---|
| `.btn-xs` | Reduce la escala para acciones auxiliares |
| `.btn-sm` | Botones compactos en barras, filtros o cards |
| Sin tamano | Tamano base para la mayoria de interfaces |
| `.btn-lg` | CTA con mas presencia |
| `.btn-xl` | Acciones hero o landings muy visuales |
| `.btn-wide` | Aumenta el padding horizontal |
| `.btn-block` | Ocupa todo el ancho disponible |
| `.btn-rounded` | Radio completamente redondeado |
| `.btn-circle` | Boton circular para iconos o acciones compactas |

{% fds-example name="buttons-sizes-layout" /%}

Para icon buttons, usa `.btn-circle` y anade un `aria-label` si no hay texto visible:

```html
<button class="btn btn-primary btn-circle" aria-label="Abrir menu">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## Casos de uso

### CTA principal

Patron habitual para heroes, cabeceras de seccion o bloques comerciales:

```html
<div class="grid grid-cols-1 gap-content sm:grid-cols-2">
  <a class="btn btn-primary btn-block" href="/registro/">Empezar ahora</a>
  <a class="btn btn-outline btn-block" href="/docs/">Ver documentacion</a>
</div>
```

### Formulario

FDS aplica estilo primary automaticamente a `button[type="submit"]`. Esto facilita formularios generados por Gutenberg, Bricks o plugins donde no siempre controlas todas las clases:

```html
<form>
  <button type="submit">Enviar</button>
</form>
```

### Accion dentro de una card

En cards o listados, `.btn-link` funciona bien cuando la accion no debe competir con el titulo:

```html
<article class="card card-elevated">
  <h3 class="subheading-sm">Servicio destacado</h3>
  <p class="text-medium">Descripcion breve del servicio.</p>
  <a class="btn btn-link" href="/servicios/">Leer mas</a>
</article>
```

{% fds-example name="buttons-use-cases" /%}

---

## Configuracion

Los botones dependen de variables declaradas en `theme/flowtitude.css`:

```css
--btn-py: 0.6em;
--btn-px: 1.75em;
--btn-primary-color: var(--color-neutral-100);
--btn-secondary-color: var(--color-neutral-100);
--btn-outline-bg: transparent;
--btn-outline-border: currentColor;
--btn-outline-color: var(--color-neutral-800);
--radius-button: var(--radius-sm);
```

| Necesitas | Variable a tocar |
|---|---|
| Botones mas altos o mas bajos | `--btn-py` |
| Botones mas anchos o mas estrechos | `--btn-px` |
| Botones mas redondeados | `--radius-button` |
| Texto del primary mas claro/oscuro | `--btn-primary-color` |
| Outline con color de marca | `--btn-outline-border` y `--btn-outline-color` |

Como `--btn-py` y `--btn-px` usan `em`, un cambio en `.btn-lg` o `.btn-sm` afecta tambien al padding resultante. Esto mantiene proporcion visual sin crear tokens de padding por cada tamano.

---

## WordPress y Bricks

En Bricks puedes aplicar `btn btn-primary`, `btn btn-outline` o cualquier combinacion directamente en el campo de clases. Para botones de formulario, si el markup final usa `button[type="submit"]`, FDS ya lo convierte en primary.

En Gutenberg conviene revisar si el bloque de botones anade clases propias. Si necesitas que un enlace de Gutenberg mantenga apariencia de boton, aplica las clases FDS al enlace final, no solo al wrapper.

---

## Errores comunes

| Error | Mejor alternativa |
|---|---|
| Usar `.btn-primary` en todas las acciones | Reservarlo para la accion principal |
| Usar `.btn-circle` con texto largo | Usarlo solo con icono o simbolo corto |
| Poner `.btn-block` en desktop sin necesidad | Combinarlo con clases responsive si solo hace falta en mobile |
| Usar `<a>` para enviar formularios | Usar `<button type="submit">` |
| Usar `.btn-link` como CTA principal | Usar `.btn-primary` u `.btn-outline` |

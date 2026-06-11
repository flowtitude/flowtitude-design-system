---
title: Tipografia (componentes)
---

FDS separa la semantica HTML de la apariencia visual. Los tags (`h1`, `h2`, `p`, `blockquote`, `ul`) siguen describiendo la estructura del contenido; las clases tipograficas (`.display`, `.heading`, `.subheading`, `.text-*`) deciden como se ve ese contenido dentro de una composicion.

Estas clases viven en `components/typography.css` y usan la escala fluida definida en `theme/flowtitude.css`. Si cambias los knobs de tipografia desde el generador/personalizador, todos los componentes reciben los nuevos tokens sin tocar el markup.

---

## Que encapsula una clase

Cada clase tipografica agrupa varias decisiones que normalmente se repetirian en Tailwind:

| Decision | Donde se aplica |
|---|---|
| `font-size` | Tokens fluidos `text-xl` a `text-9xl` |
| `font-family` | `font-display` para display, heading y subheading; `font-body` en `.text-medium` |
| `font-weight` | `font-medium` en display/heading, `font-semibold` en subheading |
| `line-height` | `leading-none`, `leading-tight`, `leading-snug`, `leading-normal`, `leading-relaxed` |
| `letter-spacing` | `tracking-tight` en display, headings y `.subheading-lg` |
| `text-wrap` | `text-balance` para titulos; `text-pretty` para textos mas largos |

La ventaja es que puedes escribir markup limpio y consistente sin recordar siempre la combinacion exacta de utilidades.

---

## Sintaxis base

Usa el tag correcto para accesibilidad y aplica la clase que necesite la composicion:

```html
<section>
  <div>
    <div class="content-flex top-left max-w-4xl">
      <span class="eyebrow">Sistema tipografico</span>
      <h1 class="display-sm">Un titulo heroico pero controlado</h1>
      <p class="text-large">
        Texto introductorio con mas presencia que el cuerpo normal.
      </p>
    </div>
  </div>
</section>
```

La clase no obliga al tag. Un `h2` puede usar `.display-sm` si visualmente abre una seccion importante, y un `h1` puede usar `.heading` si no es una pantalla hero.

{% fds-example name="typography-scale" /%}

---

## Aliases

Algunas clases tienen alias para que el markup sea mas natural:

| Alias | Equivale a | Comentario |
|---|---|---|
| `.display` | `.display-lg` | Atajo para el display de maximo impacto |
| `.display-single` | `.display-sm` | Atajo historico para display controlado |
| `.heading` | `.heading-md` | Opcion por defecto para titulos de seccion |
| `.subheading` | `.subheading-md` | Opcion por defecto para subtitulos |

```html
<h1 class="display">Display principal</h1>
<h2 class="heading">Titulo de seccion</h2>
<h3 class="subheading">Subtitulo de apoyo</h3>
```

---

## Display

Para textos hero y de maximo impacto visual:

| Clase | Token | Uso |
|---|---|---|
| `.display`, `.display-lg` | `text-9xl` | Impacto maximo: heroes, portadas, titulares de venta |
| `.display-md` | `text-8xl` | Display estandar: titulos grandes con algo mas de control |
| `.display-single`, `.display-sm` | `text-7xl` | Impacto controlado: heroes compactos o secciones destacadas |

Todas usan `font-display`, `font-medium`, `leading-none`, `tracking-tight` y `text-balance`.

---

## Heading

Para titulos y estructura de contenido:

| Clase | Token | Uso |
|---|---|---|
| `.heading-lg` | `text-6xl` | Titulos principales dentro de una pagina |
| `.heading`, `.heading-md` | `text-5xl` | Comodin para la mayoria de titulos de seccion |
| `.heading-sm` | `text-4xl` | Subdivisiones, bloques internos, cards grandes |

La diferencia principal con `.display` no es solo el tamano: `.heading` esta pensada para crear jerarquia repetible en una pagina, mientras que `.display` deberia reservarse para momentos de maxima atencion.

---

## Subheading

Puente entre heading y cuerpo:

| Clase | Token | Uso |
|---|---|---|
| `.subheading-lg` | `text-3xl` | Entradillas grandes o soporte de un heading |
| `.subheading`, `.subheading-md` | `text-2xl` | Subtitulos habituales, destacados, claims secundarios |
| `.subheading-sm` | `text-xl` | Microjerarquia dentro de cards, FAQs o listados |

Usan `font-semibold` en lugar de `font-medium`.

`text-pretty` es mas apropiado aqui que `text-balance` porque los subtitulos suelen tener mas palabras. Ayuda a evitar lineas huerfanas sin forzar una composicion tan simetrica como la de los titulos.

---

## Text

Para cuerpo de texto:

| Clase | Token | Uso |
|---|---|---|
| `.text-large` | `text-lg` | Texto destacado, entradillas, resumen de seccion |
| `.text-medium` | `text-base` | Contenido principal escrito a mano |
| `.text-small` | `text-sm` | Informacion de apoyo, notas, metadatos |

`.text-medium` aplica `font-body`, `leading-normal` y `text-pretty`. Es la clase mas segura para parrafos que forman parte de una composicion manual, por ejemplo una seccion de Bricks o Gutenberg construida bloque a bloque.

---

## Prose en la capa base

`.prose` vive en `base/typography.css`, no en la capa de componentes. Su funcion es distinta: sirve para contenido editorial donde el HTML ya viene dado por un editor, CMS o WYSIWYG.

```html
<article class="prose">
  <h1>Titulo del articulo</h1>
  <p>
    Un parrafo normal con <a href="#">un enlace</a> dentro del contenido.
  </p>
  <h2>Subtitulo</h2>
  <ul>
    <li>Elemento de lista</li>
    <li>Otro elemento de lista</li>
  </ul>
  <blockquote>Una cita destacada dentro del flujo editorial.</blockquote>
</article>
```

Dentro de `.prose`, FDS aplica estilos a los tags anidados:

| Selector | Que controla |
|---|---|
| `.prose h1` a `.prose h6` | Escala de titulos editorial, mas contenida que `.display` |
| `.prose p` y `p + p` | Ritmo vertical de parrafos |
| `.prose a` y `p > a:hover` | Color, decoracion y hover de enlaces |
| `.prose ul`, `.prose ol`, `.prose li` | Espaciado y bullets de listas |
| `.prose blockquote` | Borde, color e italica |
| `.prose table` | Ritmo, bordes y alineacion de tablas |

{% callout title="Regla practica" %}
Usa `.prose` para contenido largo que llega del editor. Usa `.display`, `.heading`, `.subheading` y `.text-*` para composiciones disenadas a mano. Mezclarlas solo tiene sentido en casos puntuales, por ejemplo una portada manual seguida de un articulo `.prose`.
{% /callout %}

{% fds-example name="typography-prose" /%}

---

## Casos de uso

| Caso | Combinacion recomendada |
|---|---|
| Hero principal | `.display` o `.display-sm` + `.text-large` |
| Cabecera de seccion | `.heading` + `.text-large` |
| Card o feature | `.subheading-sm` + `.text-medium` |
| Metadatos o notas | `.text-small` |
| Articulo, legal, blog | Contenedor `.prose` y HTML semantico dentro |
| Landing editorial | Cabecera manual con `.display-*` seguida de bloque `.prose` |

La pregunta clave es si estas disenando una composicion o dejando que un editor genere contenido. Para composicion, usa clases semanticas de componente. Para contenido largo, usa `.prose`.

---

## Configurar la escala

Las clases de tipografia no tienen tamanos fijos propios: dependen de los tokens `text-*`. Por eso se ajustan desde `theme/flowtitude.css`:

```css
--ft-text-min: 1rem;
--ft-text-max: 1.125rem;
--ft-type-step-min: 1.125;
--ft-type-step-max: 1.2;
--ft-text-factor: 1;
```

| Objetivo | Ajuste recomendado |
|---|---|
| Todo se ve pequeno | Sube `--ft-text-factor` ligeramente |
| El cuerpo esta bien pero los titulos son timidos | Sube `--ft-type-step-max` |
| Los titulos rompen demasiado en mobile | Baja `--ft-type-step-min` |
| Quieres una web mas editorial | Sube `--ft-type-step-max` y revisa `.display-*` |
| Quieres una interfaz mas compacta | Baja `--ft-text-factor` o reduce los steps |

Despues de tocar un knob, revisa al menos tres contextos: un hero con `.display`, una card con `.subheading-sm` y un articulo `.prose`. Asi compruebas impacto, microjerarquia y lectura larga.

---

## WordPress y Gutenberg

En una plantilla hecha a mano con Bricks, normalmente usaras clases como `.heading`, `.text-large` o `.subheading-sm` en los elementos concretos. En contenido que viene del editor de WordPress, lo mas estable es envolver el bloque en `.prose` y dejar que FDS estilice los tags.

FDS incluye ademas una regla fuera de `@layer` para neutralizar el subrayado global que Gutenberg aplica con `a:where(:not(.wp-element-button))`. Por eso los enlaces generales no quedan subrayados por defecto, mientras que `.prose p > a:hover` conserva el subrayado editorial al pasar el cursor.

---

## Referencia completa

| Clase | Alias | Token | Peso | Wrap | Uso recomendado |
|---|---|---|---|---|---|
| `.display-lg` | `.display` | `text-9xl` | `500` | `balance` | Hero principal, maximo impacto |
| `.display-md` | - | `text-8xl` | `500` | `balance` | Display estandar |
| `.display-sm` | `.display-single` | `text-7xl` | `500` | `balance` | Display compacto |
| `.heading-lg` | - | `text-6xl` | `500` | `balance` | Titulo principal de seccion |
| `.heading-md` | `.heading` | `text-5xl` | `500` | `balance` | Titulo de seccion habitual |
| `.heading-sm` | - | `text-4xl` | `500` | `balance` | Subdivision o bloque interno |
| `.subheading-lg` | - | `text-3xl` | `600` | `pretty` | Entradilla grande |
| `.subheading-md` | `.subheading` | `text-2xl` | `600` | `pretty` | Subtitulo habitual |
| `.subheading-sm` | - | `text-xl` | `600` | `pretty` | Card header o microjerarquia |
| `.text-large` | - | `text-lg` | Heredado | `pretty` | Lead, resumen, texto destacado |
| `.text-medium` | - | `text-base` | Heredado | `pretty` | Cuerpo manual principal |
| `.text-small` | - | `text-sm` | Heredado | Normal | Metadatos y apoyo |

---

## Ejemplo combinado

Este patron combina una cabecera disenada manualmente con un bloque editorial. La cabecera usa clases de componente; el contenido largo delega en `.prose`.

```html
<main>
  <section>
    <div>
      <header class="content-flex top-left max-w-4xl">
        <span class="eyebrow">Guia</span>
        <h1 class="display-sm">Como usar la tipografia de FDS</h1>
        <p class="text-large">
          Las clases semanticas controlan la jerarquia visual sin romper la
          estructura HTML.
        </p>
      </header>

      <article class="prose max-w-3xl">
        <h2>Contenido editorial</h2>
        <p>
          En un articulo, una entrada de blog o una pagina legal, la clase
          prose evita tener que asignar clases a cada parrafo, enlace o lista.
        </p>
        <p>
          Si cambias los tokens fluidos, los tamanos basados en
          <code>text-*</code> se actualizan en todo el sistema.
        </p>
      </article>
    </div>
  </section>
</main>
```

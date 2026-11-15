---
titulo: Tipografía semántica: separar lo que algo es de cómo se ve
leccion: 597
---

Esta es la parte del sistema que más cuesta entender y la que más resuelve. La idea de fondo es una sola: **lo que un elemento es en el documento y el tamaño con el que se ve son dos cosas distintas, y conviene poder decidirlas por separado.**

Un `h2` es un título de segundo nivel. Eso lo dice la estructura del documento, y de eso dependen el índice, el buscador y quien navega con lector de pantalla. Pero que ese `h2` se vea enorme o discreto es una decisión visual, y cambia según la página.

Si los mezclas, acabas poniendo un `h3` donde va un `h2` «porque se ve mejor». Y ahí has roto la estructura para arreglar el tamaño.

## Las dos capas

FDS resuelve esto con dos capas que trabajan juntas:

1. **El preflight semántico** (`base/typography.css`): da estilo a `h1`-`h6`, a los enlaces y al bloque `.prose`. Actúa sin que pongas ninguna clase.
2. **Las clases de estilo** (`components/typography.css`): `.display-`, `.heading-`, `.subheading-` y `.text-`. Las pones tú cuando quieres un tamaño concreto.

La primera hace que un documento sin clases ya se vea bien. La segunda te deja mandar cuando hace falta.

## El preflight: lo que pasa sin que hagas nada

`base/typography.css` estiliza los seis niveles de encabezado, los enlaces y `.prose`. Un `h1` suelto ya sale con su tamaño, su interlineado y su balanceo de línea.

Esto importa por un motivo práctico: **el contenido que no controlas también se ve bien**. Lo que escribe un cliente en el editor, lo que llega de una importación, lo que devuelve un plugin. No hay clases ahí, y aun así encaja.

## `.prose`: para bloques de texto largo

Cuando tienes un artículo entero —un post, una página legal, una descripción larga— envolverlo en `.prose` le da ritmo vertical: separación entre párrafos, tratamiento de citas, márgenes de los títulos dentro del texto.

```
<article class="prose">
  <h2>Un título dentro del artículo</h2>
  <p>Un párrafo…</p>
  <blockquote>Una cita destacada.</blockquote>
  <p>Y el texto sigue con el mismo ritmo.</p>
</article>
```

La gracia es que **dentro de `.prose` no pones ni una clase**. El ritmo lo pone el contenedor.

## Las cuatro familias

Aquí está la parte que de verdad hay que aprender. El sistema tiene cuatro familias de texto, y cada una tiene un trabajo distinto:

### Display — impacto

Para lo que tiene que entrar por los ojos: el titular de un hero, una cifra grande, una frase que ocupa la pantalla.

- `.display-lg`, `.display-md`, `.display-sm`
- Y `.display-single`, para cuando es una sola línea que no debe partirse.

Van con interlineado muy ajustado y el espaciado entre letras cerrado, que es lo que pide un tamaño grande.

### Heading — estructura

Para los títulos que organizan la página. Es lo que normalmente coincide con tus `h2` y `h3`, pero **la clase no obliga a usar esa etiqueta**: ahí está la gracia.

- `.heading-lg`, `.heading-md`, `.heading-sm`

### Subheading — el puente

Para lo que va entre un título y el cuerpo: antetítulos, etiquetas superiores, subtítulos de sección.

- `.subheading-lg`, `.subheading-md`, `.subheading-sm`

Llevan más peso y el interlineado algo más suelto que un heading, porque suelen ser líneas cortas que acompañan.

### Text — el cuerpo

Para las variantes del texto normal:

- `.text-large` — la entradilla de un artículo, algo más grande
- `.text-medium` — el cuerpo estándar
- `.text-small` — un pie de foto, una nota, la letra pequeña

## Para qué sirve todo esto, en una frase

Puedes escribir esto:

```
<h2 class="display-sm">Un título de segundo nivel que se ve enorme</h2>
<h1 class="heading-sm">Un h1 discreto, porque en esta página toca</h1>
```

El documento mantiene su estructura correcta —el `h2` sigue siendo un `h2` para Google y para un lector de pantalla— y tú decides el tamaño según lo que pida el diseño. **Sin tocar la etiqueta y sin romper nada.**

Esa es toda la idea. El resto son nombres.

## Dónde se configura

Nada de esto lleva tamaños escritos a mano: todo sale de `flowtitude.css`. Cada familia declara su fuente, su peso y su balanceo de línea; y cada tamaño, su medida, su interlineado y su espaciado entre letras.

```
--display-font / --display-weight / --display-wrap
--display-lg / --display-lg-leading / --display-lg-tracking
```

El motivo de que el tamaño, el interlineado y el tracking vayan por valor y no por familia es sencillo: **un display grande no respira igual que uno pequeño**. Si el interlineado fuera de la familia entera, el grande saldría suelto o el pequeño apretado.

## Comprueba que lo tienes

- Sabes poner un `h2` que se vea más grande que el `h1` de la misma página sin cambiar ninguna etiqueta.
- Sabes cuándo usar `.prose` y cuándo poner clases una a una.
- Puedes decir para qué sirve cada una de las cuatro familias sin mirar.
- Sabes dónde se cambia el tamaño de todos los `.heading-lg` del sitio. En un sitio.

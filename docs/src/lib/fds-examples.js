export const fdsExamples = {
  'buttons-variants': {
    title: 'Variantes de boton',
    height: 420,
    html: `<div class="grid gap-block">
  <div class="grid gap-content max-w-3xl">
    <span class="eyebrow w-fit">Sistema de botones</span>
    <h2 class="heading-sm">Una API pequena para muchas jerarquias</h2>
    <p class="text-medium">
      Combina la clase base con una variante de color segun la importancia de la accion.
    </p>
  </div>

  <div class="grid grid-cols-1 gap-block sm:grid-cols-2 max-w-3xl">
    <a class="btn btn-primary btn-block" href="#">Primary</a>
    <a class="btn btn-secondary btn-block" href="#">Secondary</a>
    <a class="btn btn-outline btn-block" href="#">Outline</a>
    <a class="btn btn-light btn-block" href="#">Light</a>
    <a class="btn btn-dark btn-block" href="#">Dark</a>
    <a class="btn btn-link w-fit" href="#">Link</a>
  </div>
</div>`,
  },
  'buttons-sizes-layout': {
    title: 'Tamanos, forma y ancho',
    height: 620,
    html: `<div class="grid gap-block">
  <div class="grid gap-content max-w-4xl">
    <span class="eyebrow w-fit">Botones responsivos</span>
    <h2 class="heading-sm">El padding escala con el tamano del texto</h2>
  </div>

  <div class="grid grid-cols-1 gap-block sm:grid-cols-2 max-w-3xl">
    <a class="btn btn-primary btn-xs btn-block" href="#">Extra small</a>
    <a class="btn btn-primary btn-sm btn-block" href="#">Small</a>
    <a class="btn btn-primary btn-block" href="#">Default</a>
    <a class="btn btn-primary btn-lg btn-block" href="#">Large</a>
    <a class="btn btn-primary btn-xl btn-block" href="#">Extra large</a>
  </div>

  <div class="grid grid-cols-1 gap-block sm:grid-cols-2 max-w-3xl">
    <a class="btn btn-outline btn-wide btn-block" href="#">Wide</a>
    <a class="btn btn-secondary btn-rounded btn-block" href="#">Rounded</a>
    <a class="btn btn-dark btn-block" href="#">Block</a>
    <a class="btn btn-primary btn-circle w-fit" href="#" aria-label="Abrir">+</a>
  </div>
</div>`,
  },
  'buttons-use-cases': {
    title: 'Patrones habituales',
    height: 560,
    html: `<div class="grid gap-block">
  <div class="card card-elevated grid gap-block">
    <span class="eyebrow w-fit">CTA principal</span>
    <h2 class="subheading-lg">Publica una landing con jerarquia clara</h2>
    <p class="text-medium">
      Usa primary para la accion de negocio y outline o link para rutas secundarias.
    </p>
    <div class="grid grid-cols-1 gap-content sm:grid-cols-2">
      <a class="btn btn-primary btn-block" href="#">Empezar ahora</a>
      <a class="btn btn-outline btn-block" href="#">Ver documentacion</a>
    </div>
  </div>

  <form class="card card-outline grid gap-block">
    <label class="text-small" for="email">Email</label>
    <input id="email" class="w-full rounded-md border border-neutral-300 px-4 py-3" type="email" placeholder="tu@email.com" />
    <button type="submit">Enviar formulario</button>
  </form>
</div>`,
  },
  'cards-basic': {
    title: 'Cards base y variantes',
    height: 420,
    html: `<div class="grid grid-auto-fit-md gap-columns">
  <article class="card">
    <span class="eyebrow">Base</span>
    <h3 class="subheading-sm">Card simple</h3>
    <p class="text-medium">
      Usa el padding semantico del sistema y ocupa todo el ancho disponible.
    </p>
  </article>

  <article class="card card-outline">
    <span class="eyebrow">Outline</span>
    <h3 class="subheading-sm">Menor peso visual</h3>
    <p class="text-medium">
      Buena para listados densos, comparativas y bloques secundarios.
    </p>
  </article>

  <article class="card card-elevated">
    <span class="eyebrow">Elevated</span>
    <h3 class="subheading-sm">Mas presencia</h3>
    <p class="text-medium">
      Util para destacar una opcion, un feature o una pieza interactiva.
    </p>
  </article>
</div>`,
  },
  'cards-clickable-grid': {
    title: 'Grid de cards clicables',
    height: 500,
    html: `<div class="grid grid-auto-fill-md gap-columns">
  <article class="card card-elevated focus-from-child">
    <span class="eyebrow">Feature</span>
    <h3 class="subheading-sm">Tokens fluidos</h3>
    <p class="text-medium">
      Tipografia y spacing escalan desde los knobs sin media queries manuales.
    </p>
    <a class="btn btn-link click-parent" href="#">Leer mas</a>
  </article>

  <article class="card card-outline focus-from-child">
    <span class="eyebrow">Layout</span>
    <h3 class="subheading-sm">Secciones inteligentes</h3>
    <p class="text-medium">
      El padding vertical se ajusta al contexto: inicio, cierre y fondos.
    </p>
    <a class="btn btn-link click-parent" href="#">Leer mas</a>
  </article>

  <article class="card card-elevated focus-from-child">
    <span class="eyebrow">Grids</span>
    <h3 class="subheading-sm">Auto-fill seguro</h3>
    <p class="text-medium">
      Los minimos de card se limitan al 100% para evitar overflow en mobile.
    </p>
    <a class="btn btn-link click-parent" href="#">Leer mas</a>
  </article>
</div>`,
  },
  'typography-scale': {
    title: 'Escala tipografica semantica',
    height: 560,
    html: `<div class="content-flex top-left">
  <span class="eyebrow">Escala visual</span>
  <h1 class="display-sm">Display para momentos de maximo impacto</h1>
  <h2 class="heading">Heading para estructurar secciones</h2>
  <h3 class="subheading">Subheading como puente entre titulo y cuerpo</h3>
  <p class="text-large">
    Text large funciona bien como entradilla, resumen o parrafo destacado.
  </p>
  <p class="text-medium">
    Text medium es el cuerpo principal para composiciones manuales en Bricks,
    Gutenberg o HTML escrito a mano.
  </p>
  <p class="text-small">
    Text small queda para notas, metadatos y texto auxiliar.
  </p>
</div>`,
  },
  'typography-prose': {
    title: 'Prose para contenido editorial',
    height: 560,
    html: `<article class="prose">
  <h1>Contenido largo del editor</h1>
  <p>
    La clase prose se aplica al contenedor, no a cada etiqueta. FDS estiliza
    titulos, parrafos, listas, enlaces, citas y tablas dentro de ese flujo.
  </p>
  <h2>Cuando usar prose</h2>
  <p>
    Usala en articulos, entradas de blog, paginas legales, documentacion larga
    o cualquier contenido que llegue desde un editor visual.
  </p>
  <ul>
    <li>Respeta la semantica HTML original.</li>
    <li>Mantiene ritmo vertical consistente.</li>
    <li>Permite enlaces con hover editorial.</li>
  </ul>
  <blockquote>Las clases semanticas son para composicion; prose es para lectura larga.</blockquote>
</article>`,
  },
  'sections-context': {
    title: 'Secciones con spacing contextual',
    height: 620,
    html: `<main>
  <section>
    <div>
      <header class="content-flex top-left max-w-3xl">
        <span class="eyebrow">Primera seccion</span>
        <h1 class="display-sm">Padding superior completo</h1>
        <p class="text-large">
          La primera seccion de main abre la pagina con mas aire vertical.
        </p>
      </header>
    </div>
  </section>

  <section class="has-background bg-primary-500 text-white">
    <div>
      <div class="content-flex center max-w-3xl">
        <span class="eyebrow">Con fondo</span>
        <h2 class="heading">Padding vertical completo</h2>
        <p class="text-large">
          Las secciones con fondo necesitan respirar por arriba y por abajo.
        </p>
      </div>
    </div>
  </section>
</main>`,
  },
  'content-flex-positions': {
    title: 'Nueve posiciones de content-flex',
    height: 520,
    html: `<div class="grid grid-cols-3 gap-content">
  <div class="card card-outline min-h-32 content-flex top-left"><span class="text-small">top-left</span></div>
  <div class="card card-outline min-h-32 content-flex top"><span class="text-small">top</span></div>
  <div class="card card-outline min-h-32 content-flex top-right"><span class="text-small">top-right</span></div>
  <div class="card card-outline min-h-32 content-flex left"><span class="text-small">left</span></div>
  <div class="card card-elevated min-h-32 content-flex center"><span class="text-small">center</span></div>
  <div class="card card-outline min-h-32 content-flex right"><span class="text-small">right</span></div>
  <div class="card card-outline min-h-32 content-flex bottom-left"><span class="text-small">bottom-left</span></div>
  <div class="card card-outline min-h-32 content-flex bottom"><span class="text-small">bottom</span></div>
  <div class="card card-outline min-h-32 content-flex bottom-right"><span class="text-small">bottom-right</span></div>
</div>`,
  },
  'grids-proportional': {
    title: 'Grid proporcional',
    height: 380,
    html: `<div class="grid gap-block">
  <div class="grid grid-cols-1-2 gap-columns">
    <aside class="card card-outline">
      <span class="eyebrow">1fr</span>
      <h3 class="subheading-sm">Apoyo</h3>
      <p class="text-small">Sidebar, indice o metadata.</p>
    </aside>
    <main class="card card-elevated">
      <span class="eyebrow">2fr</span>
      <h3 class="subheading-sm">Contenido principal</h3>
      <p class="text-medium">
        La columna dominante recibe mas ancho sin tener que definir porcentajes.
      </p>
    </main>
  </div>
</div>`,
  },
  'auto-grid-cards': {
    title: 'Auto fill y auto fit',
    height: 460,
    html: `<div class="grid gap-block">
  <div>
    <h3 class="subheading-sm">Auto-fill mantiene tracks vacios</h3>
    <div class="grid grid-auto-fill-sm gap-content">
      <div class="card card-outline">1</div>
      <div class="card card-outline">2</div>
      <div class="card card-outline">3</div>
    </div>
  </div>

  <div>
    <h3 class="subheading-sm">Auto-fit expande los ocupados</h3>
    <div class="grid grid-auto-fit-sm gap-content">
      <div class="card card-elevated">1</div>
      <div class="card card-elevated">2</div>
      <div class="card card-elevated">3</div>
    </div>
  </div>
</div>`,
  },
  'variants-parent': {
    title: 'Custom variants parent',
    height: 340,
    html: `<div class="grid grid-auto-fit-md gap-columns">
  <article class="card card-outline group">
    <h3 class="subheading-sm parent-hover:text-primary-500">
      Cambia al hacer hover sobre el padre
    </h3>
    <p class="text-medium">
      La variant parent-hover permite responder al estado del contenedor.
    </p>
  </article>

  <label class="card card-outline">
    <span class="subheading-sm parent-focus-within:text-primary-500">Campo con focus</span>
    <input class="mt-4 w-full rounded-md border border-neutral-300 px-4 py-3 parent-focus-within:border-blue-500" placeholder="Escribe aqui" />
  </label>
</div>`,
  },
  'other-click-parent': {
    title: 'Click parent en una card',
    height: 420,
    html: `<article class="card card-elevated focus-from-child max-w-xl">
  <div class="relative mb-6 aspect-landscape overflow-hidden rounded-lg bg-primary-500">
    <div class="content-flex center h-full text-white">
      <span class="heading-sm">Imagen o media</span>
    </div>
  </div>
  <span class="eyebrow">Componente auxiliar</span>
  <h3 class="subheading">Toda la card se puede clicar</h3>
  <p class="text-medium">
    El enlace mantiene la semantica, pero su pseudo-elemento cubre el padre.
  </p>
  <a class="btn btn-link click-parent" href="#">Leer mas</a>
</article>`,
  },
}

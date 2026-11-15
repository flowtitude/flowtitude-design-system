---
titulo: Instalación y arquitectura: qué hay dentro y en qué orden
leccion: 595
---

Instalar FDS son tres clics. Pero si solo aprendes los tres clics, el día que algo no se aplique no vas a saber por dónde empezar a mirar. Así que primero: qué estás metiendo en el sitio.

## Cómo se instala

FDS se instala con el **plugin de FDS**, que escribe los archivos donde WindPress los espera. El archivo `.windpress` para importar a mano sigue existiendo, pero solo como alternativa si el plugin no puede.

1. **Instala el plugin FDS** en el WordPress donde vayas a trabajar.
2. **Activa WindPress**, que es quien compila Tailwind.
3. **Comprueba que ha entrado**: abre cualquier página del sitio y mira si el cuerpo de texto ha cambiado de tamaño y si el fondo ya no es blanco puro. Si nada ha cambiado, no ha llegado.

Esa comprobación del punto 3 parece tonta y no lo es: es la diferencia entre «lo instalé» y «está funcionando».

> **WindPress compila en el navegador, no en el servidor.** Por eso, después de que el plugin escriba los archivos, hace falta que alguien abra WindPress o el editor para que se recompile. Si acabas de instalar y no ves nada, casi siempre es esto.

## Las capas, y por qué el orden importa

Todo el sistema empieza en `main.css`, y su primera línea es la más importante de todo el archivo:

```
@layer theme, base, layouts, components, utilities, custom;
```

Eso declara **seis capas y su orden de prioridad**. En CSS, cuando dos reglas compiten, gana la de la capa que va después — sin importar cuál sea más específica.

Esa frase es la que explica el 90 % de los «no se me aplica»:

| capa | qué contiene | ejemplo |
|---|---|---|
| `theme` | los tokens y las variables | `--ft-text-base`, `--ft-color-brand` |
| `base` | el reset y los elementos sin clase | `body`, `h1`, `a`, `.prose` |
| `layouts` | estructura de página | `.section`, `.container`, `.content-flex` |
| `components` | piezas con nombre | `.btn`, `.card`, `.display-lg` |
| `utilities` | las clases sueltas de Tailwind | `flex`, `p-4`, `gap-block` |
| `custom` | **lo tuyo** | lo que escribas tú |

De aquí salen dos consecuencias prácticas:

- **Una utilidad de Tailwind siempre gana a un componente.** Si pones `.btn` y encima `bg-red-500`, manda el rojo. Es lo que quieres: así se puede ajustar sin pelear.
- **Tu capa `custom` gana a todo lo demás.** Está la última a propósito: lo que tú escribas se impone al sistema, no al revés.

## Qué hay en cada carpeta

```
main.css                  → el índice: importa todo y define las capas
theme/flowtitude.css      → los tokens. El archivo que tocas
base/base.css             → reset, body, enlace de saltar al contenido
base/typography.css       → h1-h6, enlaces y .prose
layouts/primitives.css    → box, center, cluster, grid
layouts/section.css       → .section y .container
layouts/content-flex.css  → colocación en nueve posiciones
components/typography.css → .display-, .heading-, .subheading-, .text-
components/buttons.css    → .btn y sus variantes
components/cards.css      → .card y sus variantes
components/components.css → .bg-image, .click-parent y compañía
components/extras.css     → añadidos del sistema
utility/spacing.css       → gap-block, mt-section y demás
utility/layout/           → rejillas proporcionales
utility/animations/       → duraciones con nombre
```

Merece la pena abrirlos una vez, aunque sea por encima. Son archivos cortos y están comentados en castellano.

## Las tres variantes que añade el sistema

Al final de `main.css` hay tres cosas que no son CSS normal:

```
@custom-variant parent (*:has(> &));
@custom-variant parent-hover (*:hover > &);
@custom-variant parent-focus-within (*:focus-within > &);
```

Son variantes propias de Tailwind que añade FDS. Sirven para dar estilo a un elemento **según lo que le pase a su padre**, sin tener que poner una clase en el padre. Tienen su lección más adelante; por ahora basta con que sepas que existen y de dónde salen.

## Las tres zonas: quién manda en cada archivo

Esto es lo que evita perder trabajo en una actualización:

- **`fds-core/`** — del plugin. **Se reemplaza entero en cada actualización.** No escribas aquí: lo que pongas desaparece.
- **`fds-project.css`** — tuyo. Aquí van tus tokens, tus valores. **El plugin no lo reescribe nunca.**
- **La capa `custom`** — tuya también. El plugin la crea vacía y no la vuelve a tocar.

La regla es de una línea: **si es tuyo, va en tu zona; si viene del sistema, no lo edites, sobrescríbelo desde la tuya.**

## Comprueba que lo tienes

- Sabes decir, sin mirar, qué gana entre una clase de Tailwind y un componente del sistema, y por qué.
- Sabes en qué archivo se cambia un token, y en cuál no hay que escribir jamás.
- Si mañana actualizas el plugin, sabes qué se te va a sobrescribir y qué no.

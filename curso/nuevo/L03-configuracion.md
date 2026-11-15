---
titulo: La configuración: flowtitude.css, el único archivo que tocas
leccion: 596
---

Este es el archivo más importante del sistema y el único que vas a tocar en la mayoría de proyectos. Todo lo demás —los layouts, los componentes, las utilidades— lee de aquí.

La idea es sencilla de decir y difícil de sostener: **una decisión vive en un solo sitio**. El tamaño del texto, el ritmo del espaciado, el color de marca, el ancho del contenedor. Cuando el cliente pide otro azul, cambias una línea y cambia el sitio entero. Si has tenido que repasar plantilla por plantilla alguna vez, ya sabes por qué esto importa.

## Cómo está organizado el archivo

`flowtitude.css` tiene dos mitades, y la diferencia entre ellas explica casi todo el sistema:

1. **Los mandos** (*knobs*). Unas 35 variables que tú decides: el rango de pantalla, el tamaño base del texto, la proporción de la escala, el ritmo del espaciado.
2. **Los valores generados**. Más de cincuenta variables que salen de las anteriores: `--ft-text-xs` hasta `--ft-text-9xl`, `--spacing-inner` hasta `--spacing-hero`.

Tú tocas los mandos. El resto se recalcula solo.

> Los valores generados están escritos ya resueltos, no como una cadena de operaciones. Es a propósito: así el navegador no tiene que ir deshaciendo cálculos encadenados en cada pintado.

## 1 · El rango de pantalla

Antes que nada, el sistema necesita saber entre qué dos anchos tiene que crecer:

```
--viewport-min: 410px;   /* el móvil más pequeño que soportamos */
--viewport-max: 1280px;  /* donde el diseño deja de crecer */
```

Estos dos valores son la base de todo lo fluido. Entre 410 y 1280 píxeles, el texto y el espaciado crecen de forma continua. Por debajo se quedan en el mínimo; por encima, en el máximo.

**Esto es lo que sustituye a los puntos de ruptura.** No hay un salto en 768 y otro en 1024: hay una rampa. Por eso en el sistema casi no verás media queries para tamaños.

## 2 · La escala tipográfica

Cuatro mandos deciden toda la tipografía del sitio:

```
--ft-text-min: 1rem;        /* tamaño base en móvil */
--ft-text-max: 1.125rem;    /* tamaño base en escritorio */
--ft-type-step-min: 1.125;  /* proporción entre tamaños, en móvil */
--ft-type-step-max: 1.2;    /* proporción entre tamaños, en escritorio */
--ft-text-factor: 1;        /* multiplica la escala entera */
```

Los dos primeros son el cuerpo de texto. Los dos siguientes, **la proporción entre un tamaño y el siguiente**: con `1.2`, cada escalón es un 20 % mayor que el anterior. Eso es lo que genera `--ft-text-lg`, `--ft-text-xl`, `--ft-text-2xl` y así hasta `9xl`.

Que la proporción sea menor en móvil (1.125) y mayor en escritorio (1.2) no es un capricho: en una pantalla pequeña, un titular tres veces mayor que el cuerpo no cabe. En una grande, sí, y hace falta para que se note la jerarquía.

**Y `--ft-text-factor` es el mando que más se usa en un proyecto real.** No cambia las proporciones, multiplica la escala entera. Si el cliente lo quiere todo un poco más pequeño, no toques diez variables: baja el factor a `0.9`.

## 3 · El ritmo del espaciado

Funciona igual que la tipografía, con sus propios mandos:

```
--ft-space-min: 0.5rem;
--ft-space-max: 1.5rem;
--ft-space-step-min: 1.3;
--ft-space-step-max: 1.5;
--ft-space-factor: 1;
```

Pero aquí viene lo que de verdad diferencia a este sistema, y es lo que se explica peor en todas partes: **el espaciado no se elige por tamaño, se elige por para qué es**.

```
--ft-space-factor-inner: 0.5;     /* dentro de un elemento, muy ajustado */
--ft-space-factor-content: 0.75;  /* entre trozos de contenido */
--ft-space-factor-stack: 1;       /* apilar en vertical */
--ft-space-factor-block: 1;       /* entre bloques */
--ft-space-factor-columns: 1.5;   /* entre columnas */
--ft-space-factor-section: 3;     /* entre secciones */
--ft-space-factor-hero: 4.5;      /* respiro de un hero */
```

Cada uno multiplica el espaciado base. De ahí salen `--spacing-inner`, `--spacing-content`, `--spacing-stack`, `--spacing-block`, `--spacing-columns`, `--spacing-section` y `--spacing-hero`.

La diferencia práctica es esta. Cuando escribes `gap-block` en vez de `gap-6`, no estás diciendo «seis unidades»: estás diciendo «la separación que hay entre bloques en este sistema». El día que decidas que las secciones respiran poco, cambias `--ft-space-factor-section` de `3` a `3.5` y **respira el sitio entero, de forma coherente**. Con `gap-6` repartido por ahí, te toca buscarlos uno a uno.

## 4 · El color, por papeles

Aquí la regla es la misma: no se nombra el color, se nombra **para qué sirve**.

```
--ft-color-surface: var(--color-secondary-50);
--ft-color-text: var(--color-secondary-950);
--ft-color-muted: var(--color-secondary-600);
--ft-color-text-inverse: var(--color-secondary-50);
--ft-color-border: var(--color-secondary-200);

--ft-color-brand: var(--color-primary-500);
--ft-color-brand-hover: var(--color-primary-600);
--ft-color-brand-contrast: var(--color-white);
```

Fíjate en que ninguna dice de qué color es: dicen **qué papel cubre**. La superficie, el texto, el texto apagado, el borde, la marca. Un `--ft-color-brand` sobrevive a un rediseño; un `--azul-oscuro` se convierte en mentira el día que la marca pasa a verde.

Los papeles son seis: superficie, texto, borde, marca, acento y estado. Y los estados vienen resueltos:

```
--ft-color-info / --ft-color-info-bg
--ft-color-success / --ft-color-success-bg
--ft-color-warning / --ft-color-warning-bg
--ft-color-error / --ft-color-error-bg
```

Cada uno con su color y su fondo, porque un aviso necesita las dos cosas.

> **Todos los papeles tienen valor en los dos temas, claro y oscuro.** Un papel que solo existe en claro te obliga a resolverlo a mano en cada componente, y ahí se acabó el sistema.

## 5 · El contenedor y los márgenes

```
--ft-container: min(var(--container-7xl), 90%);
--ft-padding-content-x: 1rem;                    /* margen lateral en móvil */
--ft-padding-content-y: var(--spacing-section);  /* aire vertical de sección */
--ft-gap-content: var(--spacing-block);
```

El contenedor es el ancho máximo del contenido. Los `padding` son el aire de las secciones, y usan el espaciado semántico del punto anterior: cuando cambias el ritmo, las secciones acompañan.

## 6 · Lo que casi nadie sabe que puede tocar

Estas suelen pasar desapercibidas y resuelven muchas discusiones de proyecto:

**Anchos de tarjeta.** Las tarjetas no llevan anchos sueltos: leen de aquí.

```
--ft-card-xs: 12rem;   --ft-card-sm: 14rem;   --ft-card-md: 18rem;
--ft-card-lg: 24rem;   --ft-card-xl: 36rem;
```

**Botones.** El relleno y los colores del botón salen de cinco variables, no de tocar la clase:

```
--btn-py: 0.6em;   --btn-px: 1.75em;
--btn-primary-color / --btn-secondary-color / --btn-outline-*
```

Que estén en `em` y no en `rem` tiene su intención: el relleno crece con el tamaño de letra del botón, así que un `.btn-lg` queda proporcionado sin tocar nada.

**Radios y sombras, por papel:**

```
--radius-button: var(--radius-sm);
--radius-card: var(--radius-lg);
--radius-section: var(--radius-lg);
--shadow-card: var(--shadow-md);
--shadow-raised: var(--shadow-lg);
```

Otra vez lo mismo: `--radius-button` en vez de «4 píxeles». Si mañana la marca pide esquinas más redondas, cambias un papel y no repasas los botones del sitio.

> **Y un detalle que evita un susto.** Estos valores están declarados como variables normales, no solo dentro de `@theme`. Lo de `@theme` solo existe cuando Tailwind compila, y sirve para que aparezcan utilidades como `rounded-md`. Si el sitio se sirve sin esa compilación delante, las variables de aquí siguen valiendo y los botones conservan su radio. Por eso están las dos cosas.

## Lo que cambia en un proyecto real

En la práctica, empezar un proyecto con FDS es tocar cinco cosas:

1. El rango de pantalla, si el cliente tiene un público raro.
2. `--ft-text-min` y `--ft-text-max`, para el cuerpo de texto.
3. La paleta, generándola y enganchándola a los papeles de color.
4. `--ft-container`, si el diseño pide más o menos ancho.
5. `--ft-text-factor` o `--ft-space-factor` al final, para afinar el conjunto.

El resto del archivo son valores que ya están decididos con criterio. Puedes tocarlos, pero empieza por no hacerlo: casi siempre, cuando algo no encaja, el problema está en uno de esos cinco mandos y no en las cincuenta variables que salen de ellos.

## Comprueba que lo tienes

- Sabes distinguir un mando de un valor generado, y sabes cuál de los dos se toca.
- Puedes decir de memoria por qué se escribe `gap-block` y no `gap-6`.
- Sabes dónde cambiar el ancho del contenedor sin buscar en ningún otro archivo.
- Si el cliente dice «lo veo todo un poco grande», sabes qué variable tocar. Una.

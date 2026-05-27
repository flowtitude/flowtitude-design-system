---
title: Tipografia fluida
---

FDS genera una escala tipografica completa (xs a 9xl) a partir de 4 knobs, usando `clamp()` para transiciones fluidas.

---

## Modelo general

La tipografia fluida tiene dos piezas:

1. Un tamano base que cambia entre mobile y desktop.
2. Un `step ratio` que decide cuanto crece cada nivel de la escala.

En mobile, FDS usa una progresion mas contenida para que los displays no se disparen. En desktop, la escala se abre un poco mas para crear jerarquia visual.

---

## Fallback de compatibilidad

La tipografia fluida se activa solo cuando el navegador confirma soporte para `clamp()`, `calc()`, multiplicacion y division dentro de CSS math. En `@theme`, FDS declara siempre los tokens publicos `--text-*`, porque esos son los que Tailwind 4/WindPress usa para generar utilidades.

La diferencia es que `--text-*` no contiene directamente toda la formula: apunta a tokens internos `--ft-text-*`. Esos internos tienen fallback estatico y, en navegadores modernos, se recalculan desde los knobs.

| Nivel | Comportamiento |
|---|---|
| `@layer base` fallback | Declara `--ft-text-*` con valores estaticos seguros |
| `@theme` publico | Declara `--text-*` como alias a `--ft-text-*` y genera utilidades |
| `@supports` moderno | Recalcula `--ft-text-*` con la escala fluida derivada de los knobs FDS |

Los componentes (`.display`, `.heading`, `.text-*`) no necesitan cambiar: siguen usando `text-*`. La diferencia es que los navegadores modernos reciben la escala fluida y los navegadores con CSS math limitado caen en la escala segura de Tailwind.

---

## Knobs de tipografia

```css
--ft-text-min: 1rem;        /* Tamano base en viewport minimo */
--ft-text-max: 1.125rem;    /* Tamano base en viewport maximo */
--ft-type-step-min: 1.125;  /* Ratio de escala en viewport minimo */
--ft-type-step-max: 1.2;    /* Ratio de escala en viewport maximo */
--ft-text-factor: 1;        /* Multiplicador global */
```

---

## Escala generada

En `@theme`, los tokens publicos mantienen la API de Tailwind:

```css
--text-xs: var(--ft-text-xs);
--text-sm: var(--ft-text-sm);
--text-base: var(--ft-text-base);
--text-lg: var(--ft-text-lg);
--text-xl: var(--ft-text-xl);
--text-2xl: var(--ft-text-2xl);
--text-3xl: var(--ft-text-3xl);
--text-4xl: var(--ft-text-4xl);
--text-5xl: var(--ft-text-5xl);
--text-6xl: var(--ft-text-6xl);
--text-7xl: var(--ft-text-7xl);
--text-8xl: var(--ft-text-8xl);
--text-9xl: var(--ft-text-9xl);
```

En el bloque moderno, cada paso se calcula multiplicando el anterior por el step ratio:

```css
--ft-text-base: calc(var(--ft-text-value) * var(--ft-text-factor));
--ft-text-sm:   calc(var(--ft-text-base) / var(--ft-type-step));
--ft-text-xs:   calc(var(--ft-text-sm) / var(--ft-type-step));
--ft-text-lg:   calc(var(--ft-text-base) * var(--ft-type-step));
--ft-text-xl:   calc(var(--ft-text-lg) * var(--ft-type-step));
--ft-text-2xl:  calc(var(--ft-text-xl) * var(--ft-type-step));
--ft-text-3xl:  calc(var(--ft-text-2xl) * var(--ft-type-step));
--ft-text-4xl:  calc(var(--ft-text-3xl) * var(--ft-type-step));
--ft-text-5xl:  calc(var(--ft-text-4xl) * var(--ft-type-step));
--ft-text-6xl:  calc(var(--ft-text-5xl) * var(--ft-type-step));
--ft-text-7xl:  calc(var(--ft-text-6xl) * var(--ft-type-step));
--ft-text-8xl:  calc(var(--ft-text-7xl) * var(--ft-type-step));
--ft-text-9xl:  calc(var(--ft-text-8xl) * var(--ft-type-step));
```

| Token | Tamano aprox. (1280px) |
|---|---|
| `text-xs` | ~12px |
| `text-sm` | ~14px |
| `text-base` | ~18px |
| `text-lg` | ~21px |
| `text-xl` | ~24px |
| `text-2xl` | ~28px |
| `text-3xl` | ~32px |
| `text-4xl` | ~37px |
| `text-5xl` | ~43px |
| `text-6xl` | ~49px |
| `text-7xl` | ~56px |
| `text-8xl` | ~65px |
| `text-9xl` | ~75px |

---

## Efecto del step ratio

Cambiar `--ft-type-step-min` o `--ft-type-step-max` no cambia solo un tamano: recalcula toda la escala.

| Cambio | Resultado |
|---|---|
| Step mas bajo, por ejemplo `1.1` | Escala mas compacta, menos contraste entre niveles |
| Step mas alto, por ejemplo `1.25` | Escala mas expresiva, mas diferencia entre cuerpo y titulos |
| Subir solo `--ft-type-step-min` | Mobile gana jerarquia, pero puede apretar headings largos |
| Subir solo `--ft-type-step-max` | Desktop gana contraste, util en landings y paginas editoriales |
| Cambiar `--ft-text-factor` | Todo el sistema tipografico sube o baja en bloque |

{% callout title="Verificar ambos extremos" %}
Cuando cambies el step ratio, revisa mobile y desktop. Los titulos grandes son los primeros que revelan si la escala se ha abierto demasiado.
{% /callout %}

---

## Relacion con componentes

Los componentes tipograficos no tienen tamanos fijos. Usan los tokens de esta escala:

| Componente | Token |
|---|---|
| `.display`, `.display-lg` | `text-9xl` |
| `.display-md` | `text-8xl` |
| `.display-sm`, `.display-single` | `text-7xl` |
| `.heading-lg` | `text-6xl` |
| `.heading`, `.heading-md` | `text-5xl` |
| `.heading-sm` | `text-4xl` |
| `.subheading-lg` | `text-3xl` |
| `.subheading`, `.subheading-md` | `text-2xl` |
| `.subheading-sm` | `text-xl` |
| `.text-large` | `text-lg` |
| `.text-medium` | `text-base` |
| `.text-small` | `text-sm` |

Por eso un cambio en `--ft-text-min`, `--ft-text-max` o `--ft-type-step-*` afecta tambien a las clases semanticas de `components/typography.css`.

---

## Rango de viewport

La interpolacion ocurre entre `--viewport-min` (410px) y `--viewport-max` (1280px):

```css
--ft-fluid-t: calc(
  (100vw - var(--viewport-min)) /
  (var(--viewport-max) - var(--viewport-min))
);
```

Por debajo de 410px se usa el valor minimo. Por encima de 1280px, el maximo.

---

## Recetas de ajuste

### Marca mas sobria

Reduce ligeramente el contraste entre niveles:

```css
--ft-type-step-min: 1.1;
--ft-type-step-max: 1.16;
```

Esto hace que `.display`, `.heading` y `.subheading` esten mas cerca del cuerpo. Funciona bien en SaaS, herramientas internas y documentacion tecnica.

### Marca mas editorial

Abre la escala en desktop:

```css
--ft-type-step-min: 1.125;
--ft-type-step-max: 1.24;
```

El cuerpo se mantiene controlado, pero los titulos ganan presencia en pantallas grandes.

### Mobile mas contenido

Si los titulares largos rompen demasiado en telefono:

```css
--ft-type-step-min: 1.1;
```

Despues revisa los heroes. A veces el ajuste correcto no es bajar toda la escala, sino usar `.display-sm` en lugar de `.display`.

---

## Como validar un cambio

Despues de modificar knobs tipograficos, comprueba:

| Contexto | Que mirar |
|---|---|
| Hero con `.display` | Que no rompa en demasiadas lineas en mobile |
| Seccion con `.heading` | Que tenga jerarquia sin parecer hero |
| Card con `.subheading-sm` | Que el titulo no se coma el contenido |
| Texto `.text-medium` | Que el cuerpo siga siendo comodo de leer |
| `.prose` | Que titulos, parrafos y listas mantengan ritmo |

El cambio ideal se nota en el caracter de la marca, pero no obliga a reescribir clases en cada componente.

---
title: Tipografia fluida
---

FDS genera una escala tipografica completa (xs a 9xl) a partir de 4 knobs, usando `clamp()` para transiciones fluidas. Desde la migracion a formulas planas, cada token final tiene su propio `clamp()` y no depende del paso anterior.

---

## Modelo general

La tipografia fluida tiene dos piezas:

1. Un tamano base que cambia entre mobile y desktop.
2. Un `step ratio` que decide cuanto crece cada nivel de la escala.

En mobile, FDS usa una progresion mas contenida para que los displays no se disparen. En desktop, la escala se abre un poco mas para crear jerarquia visual.

---

## Fallback de compatibilidad

La tipografia fluida se activa solo cuando el navegador confirma soporte para `clamp()` con un `calc()` simple. En `@theme`, FDS declara siempre los tokens publicos `--text-*`, porque esos son los que Tailwind 4/WindPress usa para generar utilidades.

La diferencia es que `--text-*` no contiene directamente toda la formula: apunta a tokens internos `--ft-text-*`. Esos internos tienen fallback estatico y, en navegadores modernos, reciben una formula plana generada desde los knobs.

| Nivel | Comportamiento |
|---|---|
| `@layer base` fallback | Declara `--ft-text-*` con valores estaticos seguros |
| `@theme` publico | Declara `--text-*` como alias a `--ft-text-*` y genera utilidades |
| `@supports` moderno | Activa `--ft-text-*` con formulas `clamp()` independientes |

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

En el bloque moderno, cada token se declara como formula independiente:

```css
--ft-text-base: clamp(1rem, calc(0.941092rem + 0.229885vw), 1.125rem);
--ft-text-xl:   clamp(1.265625rem, calc(1.098621rem + 0.651724vw), 1.62rem);
--ft-text-2xl:  clamp(1.423828rem, calc(1.17869rem + 0.956638vw), 1.944rem);
```

La formula sigue naciendo de `--ft-text-min`, `--ft-text-max`, `--ft-type-step-min` y `--ft-type-step-max`, pero el navegador ya no resuelve esa multiplicacion en cadena. El generador o personalizador debe escribir los valores finales cuando cambian los knobs.

| Token | Tamano aprox. (1280px) |
|---|---|
| `text-xs` | ~12.5px |
| `text-sm` | ~15px |
| `text-base` | ~18px |
| `text-lg` | ~21.6px |
| `text-xl` | ~25.9px |
| `text-2xl` | ~31.1px |
| `text-3xl` | ~37.3px |
| `text-4xl` | ~44.8px |
| `text-5xl` | ~53.7px |
| `text-6xl` | ~64.5px |
| `text-7xl` | ~77.4px |
| `text-8xl` | ~92.9px |
| `text-9xl` | ~111.5px |

---

## Efecto del step ratio

Cambiar `--ft-type-step-min` o `--ft-type-step-max` no cambia solo un tamano: debe regenerar toda la escala. En FlowKit o en cualquier tooling de tokens, esos knobs son entradas; el CSS publicado contiene el resultado ya aplanado.

| Cambio | Resultado |
|---|---|
| Step mas bajo, por ejemplo `1.1` | Escala mas compacta, menos contraste entre niveles |
| Step mas alto, por ejemplo `1.25` | Escala mas expresiva, mas diferencia entre cuerpo y titulos |
| Subir solo `--ft-type-step-min` | Mobile gana jerarquia, pero puede apretar headings largos |
| Subir solo `--ft-type-step-max` | Desktop gana contraste, util en landings y paginas editoriales |
| Cambiar `--ft-text-factor` | El generador debe recalcular todos los `--ft-text-*` |

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

Por eso un cambio generado desde `--ft-text-min`, `--ft-text-max` o `--ft-type-step-*` afecta tambien a las clases semanticas de `components/typography.css`.

---

## Rango de viewport

La interpolacion se calcula para el rango entre `--viewport-min` (410px) y `--viewport-max` (1280px), pero el CSS runtime no conserva un token global de progreso fluido. Cada token final contiene su propia recta:

```css
clamp(valor-minimo, calc(intercepto + pendiente-vw), valor-maximo)
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

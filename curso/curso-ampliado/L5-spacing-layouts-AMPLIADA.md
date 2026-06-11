# Lección 5 (ampliada): Layout básico y estructural

## Qué vas a conseguir
Montar las secciones de tu landing (hero, bloques) con **el ritmo vertical correcto automático** y alinear contenido con **una sola clase**. *(Captura: dos secciones apiladas con el espaciado perfecto, una con fondo de color aislada sola.)*

## El concepto: el sistema te ahorra el 80% de los clics
Cada sección en Bricks normalmente exige: ajustar padding vertical + añadir contenedor + configurar flex. FDS lo automatiza con dos archivos: `section.css` y `content-flex.css`.

### 1. Sección inteligente (`section.css`)
Al usar la etiqueta `<section>`, el sistema aplica el ritmo según el contexto:
- **Por defecto** (fondo blanco sobre blanco): medio padding arriba/abajo. ¿Por qué? Si apilas dos, 0.5 + 0.5 = 1 unidad completa → ritmo perfecto sin duplicar espacios.
- **`.has-background`** (sección con color): se le pone padding completo **y** fuerza padding completo en la sección **anterior** y **siguiente**, para que el bloque de color quede aislado con el aire justo — **sin tocar las vecinas**.
- **Control manual:** `.half-top` / `.half-bottom` (forzar medio padding), `.block-bleed` (un hijo rompe el contenedor y ocupa el 100% del ancho, 100vw).

### 2. `.content-flex` — la navaja suiza (`content-flex.css`)
La utilidad que usarás el 90% del tiempo para tarjetas, cabeceras y bloques. La clase base apila (flex-col), centra (justify/items-center) y aplica `gap-content`. Y con modificadores mueves todo de golpe:

| Clase | Efecto |
|---|---|
| `content-flex center` | Centrado (default) |
| `content-flex left` / `right` | Izquierda / derecha |
| `content-flex top-left` / `bottom-right` | Esquinas |

Gestiona **tres cosas a la vez** con una clase: alineación flex (X/Y), alineación de texto y márgenes automáticos (`mx-auto`/`mr-auto`).

## Hazlo tú (laboratorio) — hero + sección de la landing

### Hero en 30 segundos
1. Añade una `<section>` (ya trae padding y contenedor).
2. Mete un div con `content-flex center`.
3. Dentro: el kicker, el `h1`/`display`, el `text-lead` y un botón (de la L4).
→ Todo centrado, espaciado y alineado **sin tocar un ajuste**.

### Segunda sección con fondo
1. Añade otra `<section>` debajo y ponle `.has-background` + un color de marca.
2. Observa: el bloque de color queda **aislado** con el aire correcto, y la sección anterior se ajustó sola.

## Errores comunes
- **"Uso un `<div>` en vez de `<section>`":** entonces no recibe el ritmo automático. Para secciones, usa `<section>`.
- **"Toco los controles de alineación de Bricks":** no hace falta y choca con `content-flex`. Usa las clases modificadoras.
- **"Pongo padding a mano en cada sección":** rompes el ritmo. Deja que el sistema lo gestione; usa `.half-*` solo si necesitas romperlo a propósito.

## Receta para copiar
**Sección "destacada":** `<section class="has-background">` con fondo `--color-primary-50`, dentro `content-flex center`, y un `.block-bleed` si quieres una imagen a todo ancho.

## Comprueba que…
- [ ] Dos `<section>` apiladas tienen el espaciado correcto sin que lo ajustes.
- [ ] Una sección con `.has-background` queda aislada con el aire justo.
- [ ] Un bloque con `content-flex center` queda centrado y bien espaciado.

## Capturas / GIFs
1. GIF: añadir `<section>` → aparece el padding/contenedor.
2. Antes/después de poner `.has-background` (cómo se ajustan las vecinas).
3. El hero montándose en 30 s.

---
*En la L6 montamos la sección de características en grid (auto-fit) y un bloque asimétrico.*

# Lección 6 (ampliada): Grids avanzados y la variante `parent`

## Qué vas a conseguir
Montar la **sección de características** de tu landing en una rejilla que se adapta sola, y un bloque **asimétrico** (texto + foto) sin calcular columnas. *(Captura: grid de 3 tarjetas que se reordena al estrechar + bloque 2/3–1/3.)*

## El concepto

### 1. Grids automáticos (`auto-fit` / `auto-fill`)
No decides "cuántas columnas", decides **cuánto mide como mínimo cada tarjeta**. La fórmula: `repeat(auto-fit, minmax(min(var(--ft-card-{size}),100%),1fr))`.

| Clase | Mín. tarjeta | Uso |
|---|---|---|
| `.grid-auto-fit-xs` | 12rem | iconos, stats |
| `.grid-auto-fit-sm` | 14rem | perfiles, listados densos |
| `.grid-auto-fit-md` | 18rem | **el estándar**: blog, productos |
| `.grid-auto-fit-lg` | 24rem | servicios destacados |
| `.grid-auto-fit-xl` | 36rem | 2 columnas grandes |

> Variante `auto-fill` (p. ej. `.grid-auto-fill-md`) si **no** quieres que las tarjetas se estiren cuando sobran huecos.

### 2. Grids asimétricos (layout de revista)
Defines la asimetría **en el padre**; los hijos se colocan solos (sin `col-span`):
- `.grid-cols-1-2` (1fr/2fr) → sidebar izq · `.grid-cols-2-1` → sidebar der.
- `.grid-cols-1-3` (25/75) · `.grid-cols-3-1` (75/25).
- `.grid-cols-1-2-1` (centrado óptico) · `.grid-cols-2-3` (40/60, orgánico).

> En móvil vuelve a 1 columna por defecto; usa `md:grid-cols-2-1` si quieres activarlo solo en tablet/PC.

### 3. La variante `parent` (estilos condicionales)
```css
@custom-variant parent (*:has(> &));
```
Estiliza un hijo según el estado del **padre directo**, sin poner clases al padre:
- `parent-hover:text-primary` → "si mi padre tiene hover, me pongo primario".
- `parent-focus-within:border-primary` → reacciona al foco de un input dentro del padre.
Más rápido que `group` (no hay que coordinar padre+hijo).

## Hazlo tú (laboratorio)

### A. Sección de características (grid auto-fit)
1. `<section>` + contenedor con `grid grid-auto-fit-md gap-block`.
2. Mete 3 (o 6) tarjetas. Se acomodan solas y se reordenan al estrechar. **Sin `col-span` ni porcentajes.**

### B. Bloque "Sobre nosotros" (asimétrico)
1. Contenedor con `grid grid-cols-2-1 gap-block` (activa `grid`).
2. Bloque 1 (texto) → 2/3 · Bloque 2 (foto) → 1/3, **automático**.
3. Cambia el padre a `grid-cols-1-2` y se invierten al instante.

## Errores comunes
- **"Pongo `col-span` en los hijos":** con FDS no hace falta; la proporción va en el padre.
- **"No veo columnas":** te falta activar `grid` y un `gap-*` en el contenedor.
- **"En móvil se ve apretado":** recuerda que por defecto cae a 1 columna; usa el prefijo `md:` si quieres forzar el grid antes.

## Receta para copiar
**Pricing/Features:** `grid grid-auto-fit-md gap-block` con tarjetas `content-flex center`. **Hero partido:** `grid grid-cols-2-3` (texto 40 / imagen 60).

## Comprueba que…
- [ ] Tu sección de características se reordena sola al cambiar el ancho.
- [ ] El bloque asimétrico funciona **sin `col-span`**.
- [ ] Cambiar la clase del padre invierte las proporciones.

## Capturas / GIFs
1. GIF: estrechar la ventana y ver el grid auto-fit reordenarse.
2. GIF: cambiar `grid-cols-2-1` ↔ `grid-cols-1-2` y ver la inversión.
3. `parent-hover` en acción.

---
*En la L7 cerramos: ajustamos defaults y creamos un componente propio (tarjeta de testimonio) integrado en el sistema.*

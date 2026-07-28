# Lección 7 (ampliada): Extendiendo el sistema

## Qué vas a conseguir
Personalizar FDS sin pelearte con él: ajustar defaults globales y **crear tu propio componente** (una tarjeta de testimonio) integrado en la arquitectura. Cierras la landing con algo **tuyo**. *(Captura: la tarjeta de testimonio funcionando en la landing + el autocompletado de la clase en Bricks.)*

## El concepto: "usa los defaults para ir rápido, personaliza para ser único"

### 1. Modificar los defaults (`flowtitude.css`)
No sobrescribas clases: ve a la fuente.
- **Escala global:** baja `--ft-space-factor` de `1` a `0.8` y **toda la web** se vuelve más compacta (todas las variables de espacio se reducen proporcionalmente).
- **Tipografía:** sube `--ft-text-min` si el texto base en móvil te parece pequeño.

### 2. Crear tus propios componentes (la forma correcta)
**Mala práctica:** CSS suelto en el panel "CSS Personalizado" de Bricks o en el ID del elemento → inmanejable.

**Buena práctica (arquitectura):**
1. Crea el archivo en `components/`, p. ej. `testimonial.css`.
2. Define la clase componiendo utilidades con `@apply`:
```css
/* components/testimonial.css */
.card-testimonial {
  @apply rounded-xl p-6 border transition-shadow hover:shadow-lg;
  background-color: var(--color-neutral-100);
}
```
3. Conéctalo al cerebro en `main.css` (sección componentes):
```css
@import './components/buttons.css';
@import './components/extras.css';
@import './components/testimonial.css'; /* <-- tu nuevo archivo */
```
Resultado: `.card-testimonial` aparece en el **autocompletado de Bricks** y se compila optimizada con el resto.

### 3. `custom.css` (el cajón de sastre ordenado)
Para clases pequeñas (`.tag`, `.badge`) que no merecen archivo propio, usa `components/extras.css`.

### 4. Actualizaciones sin miedo
Si sale una v1.2 del Core, puedes reemplazar `layout/grid-basic.css` (u otros) **sin perder lo tuyo**, porque tu configuración vive en `flowtitude.css` y tus estilos en `custom.css`/tus componentes.

## Hazlo tú (laboratorio) — la tarjeta de testimonio
1. Crea `components/testimonial.css` con `.card-testimonial` (arriba).
2. Impórtalo en `main.css`.
3. En la landing, añade una sección de testimonios con un `grid grid-auto-fit-md` (L6) y, en cada tarjeta, la clase `.card-testimonial` + `content-flex` (L5).
4. Dentro: una cita (`<blockquote>`, ya estilizada si va en `.prose`), nombre con `.heading-sm` y cargo con `.text-caption` (L4).
→ Componente propio, reutilizable y **dentro del sistema**.

## Errores comunes
- **"Escribo el CSS en el ID del elemento en Bricks":** se vuelve inmantenible. Crea un archivo de componente.
- **"Sobrescribo clases del Core con `!important`":** no luches contra el sistema; ajusta en `flowtitude.css`.
- **"Edito archivos del Core para mis cosas":** sepáralo en `custom.css`/tus componentes para poder actualizar sin perderlo.

## Receta para copiar
**Badge rápido** en `custom.css`:
```css
.badge { @apply inline-block text-xs font-bold uppercase tracking-wide px-2 py-1 rounded; background-color: var(--color-primary-50); color: var(--color-primary-800); }
```

## Comprueba que…
- [ ] `--ft-space-factor` cambia el aire de toda la web.
- [ ] Tu `.card-testimonial` aparece en el autocompletado de Bricks.
- [ ] La landing tiene una sección de testimonios con tu componente.
- [ ] Entiendes dónde va cada cosa para **actualizar sin romper** lo tuyo.

## Capturas / GIFs
1. Crear `testimonial.css` + importarlo + ver la clase en el autocompletado.
2. GIF: bajar `--ft-space-factor` y ver la web compactarse.
3. La landing final completa (cierre del curso).

---
*Fin del curso: tienes una landing real construida solo con FDS. En la guía (`guias.flowtitude.com/fds`) tienes la referencia para consultar cualquier detalle.*

# Backlog — Flowtitude Design System (FDS)

## Issues Activos

### Free Version

| ID | Estado | Titulo | Prioridad |
|---|---|---|---|
| FDS-001 | ✅ done | Mejorar preflight (reset mas robusto) | Alta |
| FDS-002 | ✅ done | Anadir componente cards (.card + variantes) | Alta |
| FDS-003 | ✅ done | Corregir typo: .eyebrown → .eyebrow (ya estaba correcto) | Media |
| FDS-004 | ✅ done | Revisar uso de @apply vs CSS directo en base | Media |
| FDS-005 | ✅ done | Documentar todos los componentes con ejemplos HTML | Media |
| FDS-009 | ✅ done | Redisenar docs HTML con estetica profesional y code blocks mejorados | Alta |
| FDS-006 | 🔵 open | Crear archivo .windpress exportable desde estado actual | Alta |
| FDS-007 | 🟡 in-progress | Corregir curso: errores criticos L3 y L4 — correcciones redactadas en Vault SA/Proyectos/Flowtitude/correcciones-curso-fds.md, pendiente pegar en plataforma | Alta |
| FDS-008 | 🟡 in-progress | Completar curso: contenido faltante en L2, L3 — contenido redactado en mismo archivo, pendiente pegar en plataforma | Media |
| FDS-010 | ✅ done | Mejorar shared.css de docs: hacer CSS reutilizable y pulir estetica dark mode | Alta |
| FDS-011 | ✅ done | Mejorar documentacion Syntax de tipografia y spacing fluido | Alta |

### Pro Version (futuro)

| ID | Estado | Titulo | Prioridad |
|---|---|---|---|
| FDS-P01 | 🔵 open | Anadir componente accordion | - |
| FDS-P02 | 🔵 open | Anadir componente forms (inputs estilizados) | - |
| FDS-P03 | 🔵 open | Anadir animaciones avanzadas (entrada, scroll) | - |
| FDS-P04 | 🔵 open | Anadir bento grid system | - |
| FDS-P05 | 🔵 open | Anadir mas utilidades (content-visibility, etc) | - |

---

## Session Log

### Sesion 5 — 2026-05-10
- **Tiempo**: 0.75h
- **What**: Mejorada la documentacion principal basada en Syntax/Next para tipografia, tokens tipograficos y spacing fluido. Se asimilo contenido util de la documentacion HTML antigua sin mantener dos fuentes en paralelo.
- **Why**: La doc Syntax estaba demasiado resumida para explicar bien el componente tipografico, la configuracion fluida, el andamiaje de espacios semanticos, el papel de `.prose` y la forma de auditar visualmente cambios en variables.
- **Where**:
  - `docs/src/app/docs/componentes-tipografia/page.md` — aliases, referencia completa, `text-wrap`, relacion clase visual vs tag HTML, uso de `.prose` y ejemplo combinado.
  - `docs/src/app/docs/tokens-spacing/page.md` — formula fluida, multiplicadores semanticos, valores aproximados, familias de clases Tailwind, uso directo con variables, que knob tocar, andamiaje de secciones, `.prose` y pagina de auditoria copiable.
  - `docs/src/app/docs/tokens-tipografia/page.md` — modelo mental del step ratio y relacion directa con componentes.
- **Verify**: `npm run build --prefix docs` compila correctamente.
- **Learned**:
  - La documentacion canonica actual es `docs/src` (plantilla Syntax/Next); los HTML antiguos quedan como fuente secundaria de contenido.
  - La doc antigua tenia buenas explicaciones de aliases, `text-wrap`, `clamp()`, step ratio y uso directo de variables, pero algunos valores demo no coinciden con el CSS real actual y no se deben copiar literalmente.
  - Para cambios de documentacion sin tocar CSS no aplica sincronizar WindPress; si se lleva al curso, las lecciones relacionadas son L4 (tipografia) y L5 (spacing).

### Sesion 4 — 2026-03-19
- **What**: Fix de links subrayados por regla Gutenberg. Añadido override fuera de `@layer` en `base/typography.css` para contrarrestar `a:where(:not(.wp-element-button)) { text-decoration: underline }` de WP core.
- **Why**: La regla de Gutenberg vive fuera de cualquier CSS layer, por lo que siempre ganaba a la regla `a { no-underline }` dentro de `@layer base`. Los enlaces aparecían subrayados en todos los sitios WP con FDS.
- **Where**: `base/typography.css` — añadido bloque fuera de `@layer base` (líneas 3-5)
- **Learned**: Las reglas CSS fuera de `@layer` siempre ganan a las que están dentro de cualquier capa, sin importar especificidad. Para contrarrestar estilos de WP/Gutenberg que no usan layers, el override debe estar también fuera de `@layer`.

### Sesion 3 — 2026-03-17

**What:** Mejoras iterativas a los docs HTML del FDS en múltiples rondas: barras de spacing a ancho fijo (200px, no proporcional), contraste light mode completo (badges, alerts, tips, text-secondary/tertiary), alineación del toggle dark mode con max-width 90rem, búsqueda ampliada a 28rem, fix de inline `style=""` que no podían ser sobreescritos por CSS, integración del logo SVG de Flowtitude en header y hero de los 6 HTMLs, creación de logo-icon.svg standalone, paleta amber actualizada al naranja de marca #ff9700 con variantes WCAG-AA para modo claro.

**Why:** Los docs tenían problemas de contraste en light mode (amber-400 sobre crema ≈ 2:1), el toggle salía del área de 90rem, y los "FDS" text en el header no representaban la marca. El objetivo era que los docs fueran production-quality con identidad visual real.

**Where:**
- `docs/shared.css` — Paleta amber→#ff9700, max-width header, search width, light mode overrides completas, logo CSS classes, footer padding/width
- `docs/tokens.html` — Barras spacing a 200px fijo, inline style→class="link-accent"
- `docs/index.html` — Logo en header y hero, h1 reemplazado por logo, light mode local overrides
- `docs/buttons.html`, `docs/typography.html`, `docs/layouts.html`, `docs/utilities.html` — Logo en header de cada uno, light mode overrides para labels/demo cells
- `docs/logo-dark.svg` — Logo completo para fondos oscuros (texto blanco) [nuevo]
- `docs/logo-light.svg` — Logo completo para fondos claros (texto oscuro) [nuevo]
- `docs/logo-icon.svg` — Icono de marca standalone (cuadrado naranja con F) [nuevo]

**Learned:**
- Inline `style="color: var(--amber-400);"` tiene especificidad 1000 y NO puede ser sobreescrito por ningún selector CSS (ni `[data-theme="light"] a`). La única solución es reemplazar el inline style por una clase.
- El naranja de marca #ff9700 tiene ratio ≈2:1 sobre fondos claros crema — inaceptable. Para WCAG AA se necesita amber-700 (#9a5200, 5.1:1) o amber-800 (#7a3f00, 6.9:1) en light mode.
- El enfoque dos-SVG (dark-bg/light-bg) + toggle CSS `display: none/block` via `[data-theme="light"]` es la solución más limpia para logos adaptativos sin JS adicional.
- Un layout con sidebar+content (ej. 16rem + 74rem = 90rem) necesita aplicar el `max-width: 90rem` a header, main Y footer simultáneamente para que queden alineados.

### Sesion 2 — 2026-03-13

**What:** Rediseno completo de los 8 docs HTML con estetica profesional unificada. Creado sistema compartido (shared.css + shared.js) con syntax highlighting, code groups con copy button, navegacion sticky con breadcrumbs, color swatches, spacing visualizations. Creados AGENTS.md symlinks en templates base/ y wordpress/.

**Why:** Los docs originales eran funcionales pero basicos — no servian como referencia publica del curso. El rediseno unifica la estetica con flowtitude.com/usal.flowtitude.com y mejora significativamente los code blocks (JetBrains Mono, syntax highlighting Tokyo Night, code-group con header/lang/filename/copy).

**Where:**
- `docs/shared.css` — 400+ lineas de CSS compartido (nuevo): nav, code-groups, tables, cards, alerts, swatches, badges
- `docs/shared.js` — Syntax highlighter CSS/HTML, copy to clipboard, tab system, nav highlight (nuevo)
- `docs/index.html` — Hero con stats, card grid, architecture block
- `docs/tokens.html` — Colores con swatches, spacing visual, knobs reference con syntax highlighting
- `docs/buttons.html` — Ejemplos vivos + code con syntax highlight
- `docs/typography.html` — Demos vivos de cada clase + tabla referencia + CSS implementation
- `docs/layouts.html` — 9-point flex demo, grid proporcionales con demo cells
- `docs/utilities.html` — Duration bars interactivas, flip demo, custom variants
- `docs/curso/index.html` — 7 lecciones con issue banners preservados, code-groups con highlighting
- `docs/curso/audit.html` — Summary cards, lesson audits, cross-reference table con doc-table
- `templates/base/AGENTS.md` — Symlink a CLAUDE.md (nuevo)
- `templates/wordpress/AGENTS.md` — Symlink a CLAUDE.md (nuevo)

**Learned:**
- Inter + JetBrains Mono via Google Fonts dan estetica developer profesional sin dependencias
- El patron code-group (header + block) es mucho mas usable que code blocks planos
- Las clases syn-* (keyword, string, comment, property, value, tag, attr) cubren el 95% del highlighting necesario
- La navegacion con backdrop-filter: blur da sensacion de app moderna sin JS
- Los AGENTS.md symlinks deben crearse en los templates, no solo en proyectos finales

### Sesion 1 — 2026-03-13

**What:** Auditoria completa del curso (7 lecciones) contra el codigo fuente real de FDS. Creados docs HTML interactivos: contenido del curso con alertas inline + auditoria con mapa de referencia cruzada archivo→leccion. Integrado en CLAUDE.md como regla de sesion.

**Why:** El curso en fluencommunity tiene errores criticos (nombres de clases incorrectos, valores CSS erroneos, descripciones que no coinciden con el codigo) que confunden a los alumnos. Necesita correccion urgente.

**Where:**
- `docs/curso/index.html` — Contenido de las 7 lecciones con alertas de errores inline
- `docs/curso/audit.html` — Auditoria completa: 3 errores criticos, 5 faltantes, 4 menores
- `docs/index.html` — Card del curso anadida al indice
- `CLAUDE.md` — Mapa curso↔codigo + regla de sesion para avisar al cambiar CSS
- `.claude/backlog.md` — FDS-007 y FDS-008 creados

**Learned:**
- L3 dice `--ft-color-background: #fff` pero real es `#f9ecec`
- L4 usa nombres de clases inventados (.text-lead, .text-caption, .text-body) — reales son .text-large, .text-medium, .text-small
- L4 describe subheadings con uppercase y tracking amplio pero el codigo real no los tiene
- L2 omite el layer custom, components/typography.css y wizard.css del listado de imports
- L3 omite completamente los knobs de spacing (la mitad del archivo de configuracion)

### Sesion 0 — 2026-03-13

**What:** Creacion del proyecto FDS como repo independiente. Fuente canonica: archivos de dev-descubre-tailwind/wp-content/uploads/windpress/data/. CLAUDE.md, backlog, estructura de proyecto.

**Why:** Los archivos del design system vivian solo dentro de una instalacion WordPress de testing. Al crear un proyecto independiente se puede versionar, mejorar y distribuir de forma limpia.

**Where:** `/Volumes/Disco SSD/Desarrollo/flowtitude-design-system/`

**Learned:**
- La fuente real de FDS es windpress/data/ (NO el viejo repo flowtitude-lite)
- flowtitude-lite, flowtitude-variables y flowtitude-pro son legacy
- FDS se distribuye via archivo .windpress (no npm)
- El tema flowtitude-child con TDSM es un consumidor de FDS, no parte de el

# Flowtitude Design System (FDS)

> Tipo: sistema de diseño con cuatro salidas — WindPress/Tailwind (principal), Bricks nativo, Elementor, Gutenberg
> Layers: fluent-boards
> Version: **gratuita, sin version Pro**
> Distribucion: **plugin FDS** (repo `projects/flowtitude-fds`). El `.windpress` manual queda como fallback
> Ultima actualizacion: 2026-07-25 (decision `vault/decisiones/flowtitude/2026-07-25-fds-plugin-perimetro-y-nombres.md`)

## Que es FDS

Design system CSS gratuito construido sobre Tailwind CSS 4. Proporciona:
- **Tokens de diseno** fluidos (tipografia + spacing responsive sin media queries)
- **Componentes** CSS (buttons, badges, typography classes)
- **Layouts** inteligentes (secciones con spacing automatico, content-flex 9 puntos)
- **Utilidades** (grids proporcionales, auto-fill/fit, animaciones, flip)
- **Custom variants** de Tailwind (parent, parent-hover, parent-focus-within)

**NO es un framework** — extiende Tailwind, no lo reemplaza.

### Scope de uso
- **Frontend WordPress (Bricks, Gutenberg, page builders)**: FDS se usa completo via WindPress para crear paginas y secciones.
- **IA del tema hijo**: La IA en flowtitude-child debe conocer FDS para recomendar clases y crear estructura HTML.
- **Todo lo demas (plugins WP, tema hijo, webapps, Vite)**: Usan Tailwind propio con el master `input.css` (en `claude-workflow/templates/layers/tailwind/`) que comparte tokens de FDS para consistencia visual.
- **Curso**: Hay un curso en fluencommunity/flowtitude.com — revisar contenido al hacer cambios en FDS.

## Stack

- **CSS**: Tailwind CSS v4 (sintaxis `@theme`, `@layer`, `@utility`)
- **Distribucion**: Archivo `.windpress` para WordPress (via plugin WindPress)
- **Tokens**: CSS custom properties con `clamp()` para fluid design
- **Colores**: Paletas en OKLCH (11 pasos: 50-950)

## File Structure

```
flowtitude-design-system/
  main.css                    # Entry point — importa todo, define layers y variants
  wizard.css                  # Custom properties del wizard (vacio de momento)
  theme/
    flowtitude.css             # Design tokens (knobs + derived values)
  base/
    base.css                   # Reset, body, skip-link, figure
    typography.css             # h1-h6, links, .prose
  layouts/
    section.css                # Secciones con spacing inteligente
    content-flex.css           # Posicionamiento 9 puntos
  components/
    buttons.css                # .btn + variantes
    typography.css             # .display, .heading, .subheading, .text-*
    components.css             # .bg-image, .click-parent, .focus-from-child
    custom.css                 # .eyebrow, estilos especificos
  utility/
    core/utilities.css         # flip-w, flip-h
    layout/grid-basic.css      # Grids proporcionales + auto-fill/fit
    animations/durations.css   # Duraciones semanticas de transicion
  docs/
    sistema-espaciado-fluido-tailwind.md  # Documentacion del sistema de spacing
    index.html                 # Docs interactivos — indice principal
    tokens.html                # Visualizacion de design tokens
    buttons.html               # Ejemplos de botones
    typography.html            # Ejemplos de tipografia
    layouts.html               # Ejemplos de layouts y grids
    utilities.html             # Ejemplos de utilidades
  .claude/
    backlog.md                 # Issues y session log
```

## Arquitectura CSS

### Layers (orden de cascada)
```css
@layer theme, base, layouts, components, utilities, custom;
```

### Tokens: Knobs + Derived
El sistema usa ~35 variables "knob" (editables) que generan 50+ variables derivadas:
- **Knobs**: viewport range, text min/max, space min/max, step ratios, factors
- **Derived**: escala tipografica (text-xs a text-9xl), spacing semantico (inner a hero)
- **Formula**: Todo via `clamp()` — fluido entre 410px y 1280px viewport

### Spacing semantico
```
--spacing-inner    → 0.5x  (padding interno muy ajustado)
--spacing-content  → 0.75x (gaps de contenido)
--spacing-stack    → 1x    (apilar vertical)
--spacing-block    → 1x    (entre bloques)
--spacing-columns  → 1.5x  (gaps de columnas)
--spacing-section  → 3x    (entre secciones)
--spacing-hero     → 4.5x  (heroes)
```

## Versiones

**No hay version Pro** (decision 2026-07-25). FDS es gratis entero y es el lead magnet.

## Integracion con WordPress

- Se instala via el **plugin FDS**, que escribe los ficheros en el volumen de WindPress. La importacion manual del `.windpress` queda como fallback.
- **El sistema es ABIERTO en Tailwind**, y no por preferencia: WindPress compila en el navegador, no desde PHP, y las utilities exigen compilar desde fuente. El plugin escribe los ficheros; recompilar exige que el usuario abra WindPress o el editor.
- **Tres zonas de propiedad** — `fds-core/` (del plugin, se reemplaza en cada update), `fds-project.css` con los knobs (del usuario, nunca se reescribe), capa `custom` (del usuario).
- ⚠️ **`components/custom.css` hay que renombrarlo.** Hoy `custom` es a la vez capa de FDS y ultima de la cascada; tiene que significar solo "espacio del usuario" o el primer update borra el CSS del usuario.
- La gestion de tokens sale del tema `flowtitude-child` (TDSM) y pasa al plugin. Del tema **solo sale el FDS**: AI Copilot, WooCommerce, capas CSS, elementos y seguridad se quedan alli.
- El archivo `theme/flowtitude.css` es la fuente de verdad (file-based, no DB). En el target Tailwind manda **el fichero**, no un `model.json` del plugin.

## Testing

- Proyecto de testing: `dev-descubre-tailwind` (instalacion MAMP)
- Sincronizar cambios: copiar archivos a `/wp-content/uploads/windpress/data/`
- Verificar en browser con WindPress activo

## Business Context

Este proyecto produce el design system para los streams de Flowtitude y Soluciones Abiertas.
Consultar siempre `~/.claude/business-context.md` antes de proponer cambios de arquitectura o nuevos componentes.
El design system de referencia es FDS (este proyecto). Cualquier cambio visual que afecte a otros proyectos debe validarse aqui primero.

## Project-Specific Rules

1. **Documentacion**: Al modificar CSS que afecte tokens, componentes, layouts o utilidades, actualizar la pagina correspondiente en `docs/src/app/docs/`. Ejecutar `npm run build --prefix docs` para verificar que compila.
2. **Tailwind v4 syntax**: Usar `@theme`, `@layer`, `@utility`, `@custom-variant`
3. **No @apply en utilities**: Solo en components y base (donde tiene sentido semantico)
4. **OKLCH para colores**: Mejor uniformidad perceptual que hex/RGB
5. **clamp() para fluid**: Sin media queries para tipografia y spacing
6. **Naming**: `.btn-*`, `.badge-*`, `.card-*` (prefijo por componente)
7. **Custom properties con prefijo**: `--ft-*` para knobs, `--spacing-*` para semantico
8. **Al modificar CSS**: Revisar mapa curso↔codigo y avisar que lecciones hay que actualizar
9. Sincronizar cambios a dev-descubre-tailwind si aplica

## Curso (fluencommunity/flowtitude.com)

Hay un curso de 7 lecciones. Los docs de referencia cruzada estan en `docs/curso/`:
- `docs/curso/index.html` — Contenido de las lecciones con alertas de discrepancias
- `docs/curso/audit.html` — Auditoria completa + mapa archivo→lecciones

### Mapa rapido: al cambiar un archivo, revisar estas lecciones

| Archivo FDS | Lecciones |
|---|---|
| `main.css` | L2 (imports), L6 (variants), L7 (extension) |
| `theme/flowtitude.css` | L3 (knobs), L4 (escala), L5 (spacing), L6 (cards) |
| `base/base.css` | L2 (verificacion), L3 (color fondo) |
| `base/typography.css` | L4 (preflight, prose) |
| `components/typography.css` | L4 (display, heading, subheading, text) |
| `components/buttons.css` | L3 (button variables) |
| `layouts/section.css` | L5 (secciones) |
| `layouts/content-flex.css` | L5 (content-flex) |
| `utility/layout/grid-basic.css` | L6 (grids) |

<!-- KOMANDESK:AGENT_KIT:START version=2026-06-11.v0 hash=a921cba651bb734ae66c5854fd5edc94a0c5e906cae3ffa3bea422e2eeeb9dcc -->
## Komandesk Agent Kit

- Version: 2026-06-11.v0
- Project: Flowtitude Design System
- Type: design-system
- Source of truth: Komandesk (https://ops.solucionesabiertas.net).
- Read first: `docs/komandesk-agent-kit.md`, `state.md` si existe.
- Local kit role: bootstrap instructions, commands, skills, credentials references and project context.
- Credentials: references only; never print or commit secret values.
- Before closing: read `GET /api/tasks/:id/agent-work`.
<!-- KOMANDESK:AGENT_KIT:END -->

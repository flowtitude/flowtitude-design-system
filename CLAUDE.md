# Flowtitude Design System (FDS)

> Tipo: CSS Design System sobre Tailwind CSS 4
> Layers: fluent-boards
> Version: Free (gratuita)
> Distribucion: Archivo .windpress (importar/exportar via WindPress)
> Ultima actualizacion: 2026-03-15

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

| Version | Contenido | Estado |
|---|---|---|
| **Free** | Tokens + base + layouts + buttons + typography + grids + utilities | Activa |
| **Pro** | Free + cards + accordion + forms + animations avanzadas + mas componentes | Futuro |

## Integracion con WordPress

- Se instala via **WindPress** (plugin WP que compila Tailwind)
- Importar/exportar como archivo `.windpress` unico
- El tema `flowtitude-child` tiene **TDSM** (panel admin visual para editar tokens)
- El archivo `theme/flowtitude.css` es la fuente de verdad (file-based, no DB)

## Testing

- Proyecto de testing: `dev-descubre-tailwind` (instalacion MAMP)
- Sincronizar cambios: copiar archivos a `/wp-content/uploads/windpress/data/`
- Verificar en browser con WindPress activo

## Business Context

Este proyecto produce el design system para los streams de Flowtitude y Soluciones Abiertas.
Consultar siempre `~/.claude/business-context.md` antes de proponer cambios de arquitectura o nuevos componentes.
El design system de referencia es FDS (este proyecto). Cualquier cambio visual que afecte a otros proyectos debe validarse aqui primero.

## Project-Specific Rules

1. **Tailwind v4 syntax**: Usar `@theme`, `@layer`, `@utility`, `@custom-variant`
2. **No @apply en utilities**: Solo en components y base (donde tiene sentido semantico)
3. **OKLCH para colores**: Mejor uniformidad perceptual que hex/RGB
4. **clamp() para fluid**: Sin media queries para tipografia y spacing
5. **Naming**: `.btn-*`, `.badge-*`, `.card-*` (prefijo por componente)
6. **Custom properties con prefijo**: `--ft-*` para knobs, `--spacing-*` para semantico
7. **Al modificar CSS**: Revisar mapa curso↔codigo y avisar que lecciones hay que actualizar
8. Sincronizar cambios a dev-descubre-tailwind si aplica

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

# Flowtitude Design System (FDS)

> Tipo: CSS Design System sobre Tailwind CSS 4
> Version: Free (gratuita)
> Distribucion: Archivo .windpress (importar/exportar via WindPress)
> Ultima actualizacion: 2026-03-13

## Al Iniciar Sesion

1. Lee `.claude/backlog.md` para conocer issues/features pendientes.
2. Carga patterns relevantes de `~/.claude/patterns/`:
   - `flowtitude.md` (este design system)
   - `tailwind.md` (Tailwind CSS v4)
   - `wordpress.md` (si se trabaja en integracion WP)
3. Si el usuario no especifica que hacer, ofrece retomar el item de mayor prioridad.

## Que es FDS

Design system CSS gratuito construido sobre Tailwind CSS 4. Proporciona:
- **Tokens de diseno** fluidos (tipografia + spacing responsive sin media queries)
- **Componentes** CSS (buttons, badges, typography classes)
- **Layouts** inteligentes (secciones con spacing automatico, content-flex 9 puntos)
- **Utilidades** (grids proporcionales, auto-fill/fit, animaciones, flip)
- **Custom variants** de Tailwind (parent, parent-hover, parent-focus-within)

**NO es un framework** — extiende Tailwind, no lo reemplaza.

## Stack

- **CSS**: Tailwind CSS v4 (sintaxis `@theme`, `@layer`, `@utility`)
- **Distribucion**: Archivo `.windpress` para WordPress (via plugin WindPress)
- **Tokens**: CSS custom properties con `clamp()` para fluid design
- **Colores**: Paletas en OKLCH (11 pasos: 50-950)

## Estructura del Proyecto

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

## Reglas de Desarrollo

1. **Tailwind v4 syntax**: Usar `@theme`, `@layer`, `@utility`, `@custom-variant`
2. **No @apply en utilities**: Solo en components y base (donde tiene sentido semantico)
3. **OKLCH para colores**: Mejor uniformidad perceptual que hex/RGB
4. **clamp() para fluid**: Sin media queries para tipografia y spacing
5. **Naming**: `.btn-*`, `.badge-*`, `.card-*` (prefijo por componente)
6. **Custom properties con prefijo**: `--ft-*` para knobs, `--spacing-*` para semantico

## Al Finalizar Sesion

1. Actualizar `.claude/backlog.md` con What/Why/Where/Learned
2. Si se descubrio algo global → proponer a `~/.claude/patterns/flowtitude.md`
3. Sincronizar cambios a dev-descubre-tailwind si aplica

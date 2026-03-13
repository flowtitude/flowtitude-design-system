# Backlog — Flowtitude Design System (FDS)

## Issues Activos

### Free Version

| ID | Estado | Titulo | Prioridad |
|---|---|---|---|
| FDS-001 | 🔵 open | Mejorar preflight (reset mas robusto) | Alta |
| FDS-002 | 🔵 open | Anadir componente cards (.card + variantes) | Alta |
| FDS-003 | 🔵 open | Corregir typo: .eyebrown → .eyebrow | Media |
| FDS-004 | 🔵 open | Revisar uso de @apply vs CSS directo en base | Media |
| FDS-005 | 🔵 open | Documentar todos los componentes con ejemplos HTML | Media |
| FDS-006 | 🔵 open | Crear archivo .windpress exportable desde estado actual | Alta |

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

### Sesion 0 — 2026-03-13

**What:** Creacion del proyecto FDS como repo independiente. Fuente canonica: archivos de dev-descubre-tailwind/wp-content/uploads/windpress/data/. CLAUDE.md, backlog, estructura de proyecto.

**Why:** Los archivos del design system vivian solo dentro de una instalacion WordPress de testing. Al crear un proyecto independiente se puede versionar, mejorar y distribuir de forma limpia.

**Where:** `/Volumes/Disco SSD/Desarrollo/flowtitude-design-system/`

**Learned:**
- La fuente real de FDS es windpress/data/ (NO el viejo repo flowtitude-lite)
- flowtitude-lite, flowtitude-variables y flowtitude-pro son legacy
- FDS se distribuye via archivo .windpress (no npm)
- El tema flowtitude-child con TDSM es un consumidor de FDS, no parte de el

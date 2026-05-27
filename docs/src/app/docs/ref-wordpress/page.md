---
title: Integracion WordPress
---

FDS se distribuye como archivo `.windpress` para WordPress, compatible con Bricks Builder y Gutenberg.

---

## WindPress

WindPress es el plugin que compila Tailwind CSS directamente en WordPress. FDS se importa como un paquete unico.

### Importar FDS

1. Ve a **WindPress > Settings > Import/Export**
2. Sube el archivo `.windpress`
3. WindPress cargara todos los archivos CSS de FDS en su directorio de datos

### Estructura en servidor

```shell
wp-content/uploads/windpress/data/
  main.css
  theme/flowtitude.css
  base/base.css
  base/typography.css
  layouts/section.css
  layouts/content-flex.css
  components/buttons.css
  components/typography.css
  components/cards.css
  components/components.css
  components/custom.css
  utility/core/utilities.css
  utility/layout/grid-basic.css
  utility/animations/durations.css
```

---

## TDSM (Theme Design System Manager)

El tema `flowtitude-child` incluye un panel admin visual para editar los knobs de FDS sin tocar CSS. Los cambios se reflejan en tiempo real.

---

## Bricks Builder

Las clases de FDS estan disponibles directamente en Bricks como clases CSS. Los tokens semanticos (`gap-block`, `p-section`) funcionan como cualquier clase de Tailwind.

---

## Fuente de verdad

El archivo `theme/flowtitude.css` es la fuente de verdad de los tokens. Los cambios via TDSM se guardan en este archivo (file-based, no DB).

---

## Testing

- Proyecto de testing: `dev-descubre-tailwind` (instalacion MAMP)
- Sincronizar cambios: copiar archivos a `/wp-content/uploads/windpress/data/`
- Verificar en browser con WindPress activo

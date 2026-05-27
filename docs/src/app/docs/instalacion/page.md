---
title: Instalacion
---

Como instalar FDS en tu proyecto WordPress o en cualquier proyecto con Tailwind CSS 4.

---

## WordPress con WindPress

La forma principal de usar FDS es a traves de WindPress, el plugin que compila Tailwind CSS directamente en WordPress.

1. Instala y activa WindPress en tu sitio WordPress
2. Descarga el archivo `.windpress` de FDS
3. En WindPress, usa la opcion **Importar** para cargar el archivo
4. WindPress compilara automaticamente las clases de FDS junto con las de Tailwind

```shell
wp-content/uploads/windpress/data/
  main.css          # Entry point de FDS
  theme/            # Tokens
  base/             # Reset y tipografia base
  layouts/          # Secciones y content-flex
  components/       # Botones, cards, tipografia
  utility/          # Grids, flips, duraciones
```

---

## Proyecto standalone

Si usas FDS fuera de WordPress, importa `main.css` como entry point:

```css
@import './path/to/fds/main.css';
```

FDS declara sus propios layers CSS en orden:

```css
@layer theme, base, layouts, components, utilities, custom;
```

---

## Requisitos

- **Tailwind CSS 4** con soporte para `@theme`, `@layer`, `@utility`
- **WindPress** (para WordPress) o cualquier build tool con PostCSS
- Navegador con soporte para CSS custom properties
- Recomendado: soporte moderno de `clamp()`, `calc()` y `min()` para activar la escala fluida completa

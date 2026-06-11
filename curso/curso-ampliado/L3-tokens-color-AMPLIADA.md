# Lección 3 (ampliada): El archivo de control `flowtitude.css`

## Qué vas a conseguir
Darle **la marca a tu landing** editando un solo archivo: color, lienzo fluido y contenedor. Al final, cambiarás el color primario y verás **toda la web** cambiar. *(Captura: antes/después al cambiar `--color-primary`.)*

## El concepto: KNOBS (controles)
`theme/flowtitude.css` es el centro de mando. **Solo tocas la sección KNOBS** del principio; el resto son cálculos automáticos.

### 1. El lienzo (viewport) y el texto base
```css
--viewport-min: 410px;   /* el móvil más pequeño que soportamos */
--viewport-max: 1280px;  /* donde el diseño deja de crecer */
--ft-text-min: 1rem;     /* texto base en móvil */
--ft-text-max: 1.125rem; /* texto base en escritorio */
--ft-type-step-min: 1.125; /* escala en móvil */
--ft-type-step-max: 1.2;   /* escala en escritorio */
```
Con esos números el sistema **interpola todo de forma fluida** (sin media queries).

### 2. Fondo y texto global (una vez para toda la web)
```css
--ft-color-text: #0f172a;       /* no uses negro puro */
--ft-color-background: #f8fafc;  /* ni blanco puro: cansa menos y se ve premium */
```

### 3. Color: semántica + OKLCH
Defines dos roles maestros que usarás el 90% del tiempo:
- `--color-primary` (marca) · `--color-secondary` (acento), en **OKLCH** (tonos vivos y accesibles).
- No inventes la paleta: genérala en **[tints.dev](https://tints.dev)**, exporta en formato Tailwind y pégala en `@theme`.

| Tono | Uso | Variable |
|---|---|---|
| 50-100 | Fondos sutiles | `--color-primary-50` |
| 500 | Principal (botones, iconos) | `--color-primary` |
| 600 | Hover | `--color-primary-600` |
| 800 | Texto oscuro de marca | `--color-primary-800` |

### 4. Contenedor y "gutter"
```css
--ft-container: min(var(--container-7xl), 90%); /* ancho máx; nunca toca los bordes */
--ft-padding-content-x: 1rem;                   /* margen lateral de seguridad (móvil) */
--ft-padding-content-y: var(--spacing-section); /* padding vertical fluido */
```

## Hazlo tú (laboratorio) — la marca de la landing
1. Abre `theme/flowtitude.css`.
2. En tints.dev, elige el color de tu agencia ficticia → exporta y pega la escala en `--color-primary-*`.
3. Mapea `--color-primary` al tono **500** y `--color-primary-600` al hover.
4. Ajusta `--ft-color-background` a un tono casi-blanco y `--ft-color-text` a un casi-negro.
5. Guarda y mira la página: **el fondo y los acentos ya son tu marca.**

## Errores comunes
- **"Uso #000 y #fff":** evítalo (fatiga visual, look barato). Usa tonos apagados.
- **"Mezclo HEX, RGB y OKLCH":** vale, pero para que las interpolaciones de color sean perfectas, **mantén todo en OKLCH**.
- **"Toco variables fuera de KNOBS":** no hace falta y puedes romper cálculos. Quédate en KNOBS.

## Receta para copiar
¿Marca compacta y seria? Primario azul OKLCH 500, fondo `#f8fafc`, texto `#0f172a`, contenedor `container-6xl`. Pégalo, cambia el primario y prueba el efecto dominó.

## Comprueba que…
- [ ] Cambiar `--color-primary` cambia botones/acentos de toda la web.
- [ ] El fondo y el texto no son blanco/negro puros.
- [ ] El contenido respira (no toca los bordes en móvil).

## Capturas / GIFs
1. tints.dev → exportar → pegar en `flowtitude.css`.
2. GIF: cambiar `--color-primary` y ver la web entera cambiar.

---
*En la L4 damos voz a la landing: titulares y texto con el sistema tipográfico.*

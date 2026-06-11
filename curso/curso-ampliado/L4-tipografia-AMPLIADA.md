# Lección 4 (ampliada): El sistema tipográfico integral

## Qué vas a conseguir
Que los textos de tu landing se vean **profesionales sin esfuerzo** y aprender a **separar el estilo de la semántica** (un párrafo que parece titular, un H1 pequeño…). *(Captura: hero con `display`, lead y caption bien jerarquizados.)*

## El concepto: 3 capas
El sistema separa **qué etiqueta usas** (semántica) de **cómo se ve** (estética).

### 1. Preflight semántico (`base/typography.css`)
Estiliza las etiquetas nativas automáticamente:
```css
h1,h2,h3,h4,h5,h6 { @apply break-words font-display font-bold text-balance tracking-tight; }
```
- **font-display:** pone tu fuente de titulares en todos los encabezados.
- **text-balance:** el navegador equilibra las líneas del título → no quedan palabras "huérfanas".
- Escala visual: `h1` ≈ `text-5xl leading-none` … `h6` ≈ `text-lg`.
→ Arrastras un Heading en Bricks, eliges H1/H2 y **ya se ve bien, sin clases**.

### 2. El componente `.prose` (para contenido rico)
¿Un artículo o un campo de Texto Enriquecido que llega plano desde WordPress? Envuélvelo en un `<div class="prose">` y se estiliza **todo lo de dentro**:
```css
.prose p { @apply my-4; }
.prose blockquote { @apply border-l-4 border-secondary-500 pl-4 italic; }
```
- Gestiona el **ritmo vertical** (márgenes entre párrafos).
- **Adyacencia inteligente:** un H2 seguido de H3 se agrupan (menos margen).
- Listas, citas y tablas toman los **colores de tu marca** solas.

### 3. Clases que desacoplan estilo y semántica (`components/typography.css`)
Cuatro familias:
- **`.display-*`** (lg/md/sm): textos gigantes de impacto (hero, números de stats).
- **`.heading-*`** (lg≈H2, md≈H3, sm≈H4): estética de título en forma de clase (p. ej. un testimonio que es `<p>` pero quieres que parezca título).
- **`.subheading-*`** (lg/sm): ante-títulos/kickers (uppercase, tracking amplio, color de acento).
- **`.text-*`**: `.text-lead` (intro grande), `.text-caption` (pie pequeño), `.text-body` (estándar).

## Hazlo tú (laboratorio) — el hero de la landing
1. Título del hero: un `<h1>` (ya se ve bien) **o** un `<p class="display-lg">` si quieres impacto sin que cuente como H1.
2. Encima, un **kicker**: `<span class="subheading-sm">` (p. ej. "AGENCIA WORDPRESS").
3. Debajo, la intro: `<p class="text-lead">`.
4. Un pie/nota: `<p class="text-caption">`.
→ Jerarquía clara **sin tocar tamaños a mano**.

## Errores comunes
- **"Uso un H2 solo porque quiero que se vea como un título":** rompe el SEO/semántica. Usa `.heading-md` en un elemento correcto.
- **"Estilo párrafo a párrafo un texto de WordPress":** no: envuélvelo en `.prose`.
- **"Pongo varios H1":** uno por página; para el resto de "títulos visuales", clases `.heading-*`.

## Receta para copiar
**Hero estándar:** `subheading-sm` (kicker) → `h1` o `display-lg` (titular) → `text-lead` (promesa) → botón. Cuatro líneas y queda profesional.

## Comprueba que…
- [ ] Tus encabezados se ven bien **sin añadir clases**.
- [ ] Un bloque de texto rico va dentro de `.prose`.
- [ ] Sabes cuándo usar `.heading-*` (estilo) en vez de cambiar la etiqueta (semántica).

## Capturas / GIFs
1. Heading en Bricks → cambiar etiqueta H1→H3 y ver el tamaño cambiar solo.
2. Antes/después de envolver texto plano en `.prose`.

---
*En la L5 montamos las secciones de la landing con `section` y `content-flex`.*

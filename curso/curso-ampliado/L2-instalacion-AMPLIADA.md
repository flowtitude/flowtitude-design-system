# Lección 2 (ampliada): Descarga e instalación en WindPress

> Patrón del nuevo estándar de lección (objetivo → concepto → laboratorio → errores → receta → comprobación → capturas).

## Qué vas a conseguir
Tener **FDS funcionando** en tu WordPress en unos minutos y **arrancar el proyecto del curso** (una landing de una página que construiremos juntos). *(Captura: una Sección de Bricks ya con el padding y el fondo de FDS aplicados.)*

## Antes de empezar: requisitos
- **WordPress** con **Bricks Builder** (o el editor; el curso usa Bricks).
- El plugin **WindPress** instalado y activo (es quien compila Tailwind dentro de WordPress, sin Node ni servidores externos).
- 5 minutos.

## Concepto: qué vas a instalar (arquitectura modular)
No es un CSS gigante de 5.000 líneas. FDS es **modular**: `main.css` no tiene estilos, solo **importa las piezas en orden** (configuración → cimientos → estructura → componentes → utilidades).

```css
/* main.css — el índice del sistema */
@layer theme, base, layouts, components, utilities;
@import './theme/flowtitude.css';   /* TU centro de control (lo único que tocas) */
@import './base/base.css';
@import './base/typography.css';
@import './layouts/section.css';
@import './layouts/content-flex.css';
@import './components/buttons.css';
/* …utilidades y grids */
```
**La idea clave:** separas *configuración* (`theme/`) de *lógica* (el resto). Tú solo tocas `flowtitude.css`; lo demás funciona solo y no se rompe.

## Hazlo tú (laboratorio)

### Paso 0 — Consigue el paquete (gratis)
El paquete `fds-core.windpress` se descarga **uniéndote gratis a la comunidad**:
1. Entra en **https://flowtitude.com/comunidad/space/fds-lite/home**.
2. **Regístrate** (es gratis, un minuto). Con eso ya eres miembro y tienes acceso al espacio FDS.
3. Descarga el archivo **`fds-core.windpress`**.

### Paso 1 — Importa en WindPress (un clic)
1. WordPress → **WindPress**.
2. Opción **Importar** (icono de subida / "Import Structure").
3. Selecciona `fds-core.windpress` → **Importar**.

> ⚠️ **Importante:** esto **recrea toda la estructura CSS** en WindPress.
> - **Web nueva:** perfecto, es lo más rápido.
> - **Web con configuración previa:** **EXPORTA primero tu configuración actual** (copia de seguridad); la importación la sobrescribe.

### Paso 2 — Verifica que está vivo
Abre cualquier página con Bricks y añade una **Sección**. Si ves **padding generoso automático** y el fondo **no es blanco puro** (lo aplica `base.css`), FDS está funcionando. ✅

### Paso 3 — Arranca el proyecto del curso
Crea una página nueva llamada **"Landing FDS"** y ábrela en Bricks. Será nuestro lienzo durante todo el curso. No añadas nada aún: en la L3 le daremos la marca.

## Errores comunes (troubleshooting)
- **"No veo cambios al añadir una Sección"** → revisa que **WindPress esté activo** y que la importación terminó sin error. Recarga el editor de Bricks (a veces cachea).
- **"Importé y se borró mi config anterior"** → la importación sobrescribe; restaura desde tu **export** previo (por eso el aviso del Paso 1).
- **"El fondo sigue siendo blanco puro"** → no se cargó `base.css`; vuelve a importar el paquete completo (no piezas sueltas).
- **"Uso el editor de bloques, no Bricks"** → FDS funciona igual; las clases se aplican en el campo de clases del bloque. El curso muestra Bricks, pero el sistema es el mismo.

## Receta para copiar
¿Quieres comprobar que las utilidades responden? En cualquier elemento, prueba la clase `content-flex center` dentro de una `<section>` con un H1 + párrafo: debería quedar centrado y bien espaciado **sin tocar ajustes**. (Lo veremos a fondo en la L5.)

## Comprueba que… (checklist)
- [ ] WindPress activo y el paquete importado sin errores.
- [ ] Una Sección nueva muestra padding y fondo de FDS.
- [ ] Tienes la página **"Landing FDS"** creada para el proyecto.
- [ ] Hiciste copia (export) si tenías configuración previa.

## Capturas / GIFs para el vídeo
1. El espacio `fds-lite` y el botón de descarga (tras registro).
2. La pantalla de **Importar** de WindPress con el archivo seleccionado.
3. **Antes/después**: Sección sin FDS (blanca, sin padding) vs con FDS.
4. GIF corto: añadir Sección → aparece el padding/fondo solo.

---
*En la L3 tomamos el control: definimos la marca de la landing (color, lienzo, contenedor) desde `flowtitude.css`.*

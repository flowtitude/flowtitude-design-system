# Plan de ampliación del curso FDS

> Objetivo: convertir las 7 lecciones (buenas pero cortas, ~500 palabras y sin práctica consistente) en un curso con **profundidad + práctica + un proyecto real**, que sirva además de guion para la serie de YouTube.

## Diagnóstico (de la revisión)
- Contenido bueno y bien explicado, pero **corto y desigual**: solo L5 tiene laboratorio; componentes (L6) y extensión (L7) flojos.
- **Sin proyecto hilo**: lecciones sueltas; el alumno no acaba con nada suyo.
- **Sin visuales**: grave para un sistema de diseño.
- **Curso vs guía** (`guias.flowtitude.com/fds`) se solapan y confunden.

## Decisiones
1. **Cada lección sigue la misma plantilla** (abajo).
2. **Hay UN proyecto que se construye a lo largo del curso** (abajo).
3. **Guía = referencia** (consultar algo puntual) · **Curso/YouTube = aprendizaje guiado** (construir el proyecto). Se enlazan, no se duplican.
4. Cada lección lista las **capturas/GIFs** necesarias (AJ las graba al hacer el vídeo).

## Plantilla de lección (nuevo estándar)
1. **Qué vas a conseguir** (1 frase + captura del resultado).
2. **El concepto** (lo que ya hay, mejorado).
3. **Hazlo tú (laboratorio)** — pasos prácticos sobre el proyecto hilo.
4. **Errores comunes / troubleshooting** (lo que falla y cómo se arregla).
5. **Recetas** — 1-2 snippets listos para copiar relacionados.
6. **Comprueba que…** — checklist de "lo has hecho bien si…".
7. **Capturas/GIFs necesarios** (para el vídeo).

## Proyecto hilo: "monta una landing con FDS"
A lo largo de las 7 lecciones se construye **una landing real de una página** (sirve una agencia/producto ficticio), sin escribir CSS. Cada lección añade una capa:

| Lección | Aporta al proyecto |
|---|---|
| L1 Filosofía | Mentalidad (sin construir todavía) |
| L2 Instalación | Instalar FDS + crear la página base del proyecto |
| L3 Tokens | Definir la marca de la landing (color OKLCH, lienzo, contenedor) |
| L4 Tipografía | Titulares y cuerpo con la escala fluida |
| L5 Layouts | Montar hero + secciones con `section` + `content-flex` |
| L6 Grid | Sección de características/precios en grid |
| L7 Extensión | Un componente propio (p. ej. tarjeta de testimonio) |

**Resultado final:** una landing completa hecha solo con FDS → el alumno acaba con algo suyo y con la prueba de que el sistema funciona.

## Orden de entrega (yo)
1. **L2 ampliada** (incluida aquí como patrón — es la conversión-crítica: descarga + instalación).
2. L3 y L5 (ya son las más sólidas → ampliación ligera + laboratorio sobre el proyecto).
3. L1, L4, L6, L7 (más trabajo: profundizar + práctica + recetas).
4. Lista global de capturas/GIFs.

> Nota importante sobre la descarga: el paquete `fds-core.windpress` se obtiene **registrándose gratis** en el espacio `fds-lite` de la comunidad (`/comunidad/space/fds-lite/home`). El registro = alta de miembro (es el evento de captación del embudo). La L2 lo refleja.

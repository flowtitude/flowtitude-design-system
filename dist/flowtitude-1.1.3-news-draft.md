# Flowtitude Design System 1.1.3

Ya está lista una nueva exportación de Flowtitude Design System para WindPress.

Esta versión mantiene la misma «API de clases», pero refuerza la arquitectura interna de la tipografía y del espaciado fluido para que el sistema sea más fiable en navegadores modernos y tenga una degradación controlada en navegadores con soporte limitado de cálculo CSS.

- Los tokens públicos que generan utilidades de Tailwind siguen definidos dentro de `@theme`.
- La tipografía fluida y el espaciado fluido usan tokens internos `--ft-*` con fórmulas planas, sin cadenas largas de `var()` y `calc()`.
- Los valores de reserva («fallbacks») de tipografía vuelven a los tamaños estándar de Tailwind cuando el navegador no puede resolver las fórmulas fluidas.
- El espaciado fluido conserva valores estáticos válidos y añade valores para escritorio mediante media query en navegadores con cálculo CSS limitado.
- El bloque `@theme` queda al final del archivo como «contrato público» del sistema para Tailwind 4 y WindPress.
- La documentación de migración explica qué partes reemplazar sin perder cambios propios en los tokens.

Si ya tenías cambios propios en tokens, revisa especialmente `theme/flowtitude.css` antes de reemplazarlo completo. Las clases no cambian: `text-base`, `py-section`, `gap-content`, `p-fluid-md` y el resto de utilidades siguen funcionando igual.

Documentación:
https://flowtitude.com/docs/migracion-fallback-css-math/

Archivo WindPress:
`flowtitude-1.1.3.windpress`

SHA-256:
`767a0f1edf1db2d179c509b3b6eea978def68b90d86a7f02d19fceea541eed8c`

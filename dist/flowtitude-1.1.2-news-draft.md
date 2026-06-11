# Flowtitude Design System 1.1.2

Ya esta lista una nueva exportacion de Flowtitude Design System para WindPress.

Esta version mantiene la misma API de clases, pero ordena mejor la arquitectura interna de los tokens fluidos para que sea mas facil revisar, mantener y personalizar el sistema:

- Los tokens publicos que generan utilidades de Tailwind siguen definidos dentro de `@theme`.
- La tipografia fluida y el espaciado fluido recalculan valores internos `--ft-*`, sin pisar `--text-*` ni `--spacing-*`.
- Los fallbacks de tipografia vuelven a los tamanos estandar de Tailwind cuando el navegador no puede resolver las formulas fluidas.
- El bloque `@theme` queda al final del archivo como export publico del sistema.
- FlowKit tambien queda alineado para que el personalizador no regenere una estructura antigua al guardar.

Si ya tenias cambios propios en tokens, revisa especialmente `theme/flowtitude.css` antes de reemplazarlo completo. Las clases no cambian: `text-base`, `py-section`, `gap-content`, `p-fluid-md` y el resto de utilidades siguen funcionando igual.

Documentacion:
https://flowtitude.com/docs/migracion-fallback-css-math/

Archivo WindPress:
`flowtitude-1.1.2.windpress`

SHA-256:
`fcf8ec05b36521b3016971c565d55b2729a2f66e1d04146c2a11435f3f42d7e1`

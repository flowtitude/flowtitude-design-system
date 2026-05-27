---
title: Flip y animaciones
---

Utilidades de transformacion y duraciones semanticas de transicion.

Estas utilidades son pequenas, pero ayudan a que los patrones visuales sean consistentes entre componentes. No sustituyen a una libreria de animacion; cubren microinteracciones habituales.

---

## Flip

Transformaciones de espejo registradas como `@utility`:

```css
@utility flip-w { transform: scaleX(-1); }
@utility flip-h { transform: scaleY(-1); }
```

```html
<img src="arrow.svg" class="flip-w" />  <!-- Espejo horizontal -->
<img src="arrow.svg" class="flip-h" />  <!-- Espejo vertical -->
```

Casos tipicos:

| Necesitas | Clase |
|---|---|
| Reutilizar una flecha hacia la izquierda a partir de una flecha derecha | `flip-w` |
| Invertir un icono verticalmente | `flip-h` |
| Adaptar un detalle decorativo sin duplicar asset | `flip-w` o `flip-h` |

---

## Duraciones semanticas

Reemplazan las duraciones numericas de Tailwind con nombres significativos:

| Clase | Duracion |
|---|---|
| `duration-none` | 0ms |
| `duration-faster` | 100ms |
| `duration-fast` | 200ms |
| `duration-normal` | 300ms |
| `duration-slow` | 400ms |
| `duration-slower` | 500ms |

```html
<button class="btn btn-primary transition duration-normal">
  Hover me
</button>
```

| Uso | Duracion recomendada |
|---|---|
| Feedback inmediato, toggles, iconos pequenos | `duration-fast` |
| Hover de botones y cards | `duration-normal` |
| Sombras, fondos y estados de contenedor | `duration-slow` |
| Transiciones expresivas pero aun discretas | `duration-slower` |

{% callout title="Consistencia" %}
Usa siempre las duraciones semanticas en lugar de valores numericos para mantener consistencia en las animaciones del proyecto.
{% /callout %}

---

## Errores comunes

| Error | Mejor alternativa |
|---|---|
| Usar `duration-700` o valores sueltos en cada componente | Elegir una duracion semantica |
| Animar muchas propiedades con duraciones lentas | Limitar la transicion a color, transform, shadow u opacity |
| Usar flip para corregir un icono mal exportado | Corregir el asset si es la direccion principal |

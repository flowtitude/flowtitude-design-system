---
titulo: Qué es FDS y qué problema resuelve
leccion: 594
---

Antes de instalar nada, conviene saber qué estás instalando y, sobre todo, qué problema viene a quitarte de encima. Porque FDS no es una librería de componentes bonitos: es un conjunto de decisiones ya tomadas.

## El problema: decidir lo mismo en cada proyecto

Empiezas una web. ¿Qué tamaño tiene el titular? ¿Y el de segundo nivel? ¿Cuánto separa una sección de la siguiente? ¿El botón lleva 12 o 16 píxeles de relleno? ¿Este gris es el mismo gris que el de la otra página?

Ninguna de esas preguntas es difícil. El problema es que **son cuarenta, se repiten en cada proyecto y hay que contestarlas todas antes de poder trabajar**. Y como se contestan sobre la marcha, cada respuesta es un poco distinta de la anterior.

Eso tiene tres consecuencias, y las tres cuestan dinero:

- **Se va el tiempo en lo que no diferencia.** Nadie contrata por el interlineado. Pero el interlineado hay que decidirlo igual.
- **El resultado sale desigual.** Siete separaciones distintas donde debería haber tres. No parece roto: parece descuidado, y nadie sabe decir por qué.
- **Mantenerlo sale caro.** Seis meses después, cambiar el color de marca obliga a recorrer plantillas una por una.

## Qué hace FDS

FDS toma esas decisiones una vez y las deja escritas en un sitio. Lo que aporta:

- **Tipografía y espaciado fluidos**, que crecen solos con la pantalla. Sin puntos de ruptura para los tamaños.
- **Espaciado semántico**: no eliges «24 píxeles», eliges «la separación entre bloques».
- **Componentes** ya resueltos: botones, tarjetas, tipografía.
- **Layouts inteligentes**: secciones que ya saben cuánto aire llevan, y un sistema de colocación que evita reinventar el mismo flex cada vez.
- **Utilidades** para rejillas proporcionales y para lo que Tailwind no trae.

Y sobre todo: **una sola fuente para cada decisión**. Cambias una línea, cambia el sitio entero.

## Lo que FDS no es

**No es un framework y no sustituye a Tailwind: lo extiende.** Sigues escribiendo Tailwind, sigues teniendo todas sus utilidades. FDS añade encima los tokens, los componentes y los layouts, y te da nombres con significado para lo que en Tailwind son números.

Tampoco es una plantilla ni un tema. No te da páginas hechas: te da las piezas y las reglas para que las páginas que hagas se parezcan entre ellas sin que tengas que vigilarlo.

Y no es un sistema cerrado. Todo está en CSS abierto, tú lo lees, tú lo cambias. Hay una lección entera sobre extenderlo.

## La ventaja de verdad

Se nota en dos momentos concretos.

**Al empezar.** No arrancas de una hoja en blanco. Los tamaños, el ritmo y los componentes ya están; lo que decides es lo que hace distinto a ese proyecto, que es lo que te pagan.

**A los seis meses.** Llega un cambio —otro color de marca, un patrocinio, «lo veo todo un poco grande»— y se resuelve tocando una variable. Ese día es cuando se ve si tenías un sistema o un sitio bien pintado. Se parecen mucho el día de la entrega; no se parecen nada medio año después.

## Qué necesitas saber para seguir el curso

Este curso **no enseña Tailwind**. Da por hecho que sabes qué es una clase de utilidad y que has escrito CSS antes. Si es así, con eso basta: lo demás se explica aquí.

Lo que sí vas a aprender es cómo está montado FDS por dentro, qué se puede tocar, dónde se toca y qué pasa cuando lo tocas.

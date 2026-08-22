'use client';

import { useEffect, useRef } from 'react';

/*
 * Ajustes del efecto. Están arriba y con nombre para poder calibrarlo sin
 * bucear en el bucle de dibujo.
 */
const AJUSTES = {
  /** Un nodo por cada N píxeles cuadrados. Más alto = más disperso. */
  densidad: 26000,
  /** Tope de nodos: en el pie de página, que es alto, evita saturar. */
  maxNodos: 48,
  minNodos: 12,
  /** Distancia a la que dos nodos se unen con una línea. */
  radioEnlace: 150,
  /** Distancia a la que el cursor engancha nodos. */
  radioCursor: 190,
  /** Velocidad de deriva, en píxeles por fotograma. */
  velocidad: 0.13,
  radioNodo: 1.6,
  /** Opacidades máximas. Bajas a propósito: el efecto acompaña, no compite. */
  opacidadLinea: 0.17,
  opacidadLineaCursor: 0.4,
  opacidadNodo: 0.42,
  opacidadNodoCercano: 0.9,
} as const;

const AZUL = '1, 103, 243';

type Nodo = { x: number; y: number; vx: number; vy: number };

/**
 * Red de nodos que se conectan entre sí y reaccionan al cursor.
 *
 * Se dibuja en un canvas y no con elementos del DOM porque son decenas de
 * líneas redibujándose cada fotograma: hacerlo con divs obligaría al
 * navegador a recalcular el diseño constantemente y se notaría el tirón.
 *
 * Decisiones que importan para que se sienta premium y no cargado:
 * - La densidad es baja y con tope. Una malla saturada parece un salvapantallas
 *   de los noventa; unos pocos nodos con líneas tenues, un sistema vivo.
 * - Las líneas se desvanecen con la distancia, así la red respira en vez de
 *   parpadear cuando dos nodos cruzan el umbral.
 * - Los nodos cercanos al cursor se iluminan y se enlazan a él, que es lo que
 *   hace que la superficie se sienta viva sin llenarse de movimiento.
 *
 * Se detiene solo cuando la sección sale de pantalla o la pestaña pasa a
 * segundo plano: no tiene sentido gastar batería animando algo que nadie ve.
 */
export function RedDeNodos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const contenedor = canvas?.parentElement;
    if (!canvas || !contenedor) return;

    // Quien pidió menos movimiento no ve nada animado.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodos: Nodo[] = [];
    let ancho = 0;
    let alto = 0;
    let animacion = 0;
    let visible = true;
    const cursor = { x: -9999, y: -9999, activo: false };

    const medir = (pintar = true) => {
      const caja = contenedor.getBoundingClientRect();
      ancho = caja.width;
      alto = caja.height;
      if (ancho === 0 || alto === 0) return;

      // Se dibuja a la resolución real de la pantalla; si no, en retina se
      // ven las líneas borrosas.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      canvas.style.width = `${ancho}px`;
      canvas.style.height = `${alto}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cuantos = Math.min(
        AJUSTES.maxNodos,
        Math.max(AJUSTES.minNodos, Math.round((ancho * alto) / AJUSTES.densidad)),
      );

      nodos = Array.from({ length: cuantos }, () => {
        const angulo = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * ancho,
          y: Math.random() * alto,
          vx: Math.cos(angulo) * AJUSTES.velocidad,
          vy: Math.sin(angulo) * AJUSTES.velocidad,
        };
      });

      // Un fotograma inmediato: la red aparece ya dibujada al cargar y al
      // cambiar de tamaño, sin el parpadeo de esperar a la animación.
      if (pintar) pintarFrame();
    };

    /**
     * Dibuja un fotograma. Separado del bucle a propósito: así se puede
     * pintar el primero nada más montar, sin esperar a la animación.
     *
     * Importa porque `requestAnimationFrame` no corre cuando la pestaña está
     * en segundo plano ni en navegadores que no componen fotogramas. Sin
     * esto, en esos casos la superficie se quedaría completamente vacía en
     * lugar de mostrar la red quieta.
     */
    const pintarFrame = () => {
      ctx.clearRect(0, 0, ancho, alto);

      for (const nodo of nodos) {
        nodo.x += nodo.vx;
        nodo.y += nodo.vy;

        // Rebote en los bordes: mantiene la densidad estable sin tener que
        // reponer nodos que se escapan.
        if (nodo.x <= 0 || nodo.x >= ancho) nodo.vx *= -1;
        if (nodo.y <= 0 || nodo.y >= alto) nodo.vy *= -1;
        nodo.x = Math.max(0, Math.min(ancho, nodo.x));
        nodo.y = Math.max(0, Math.min(alto, nodo.y));
      }

      // Enlaces entre nodos. El bucle empieza en i+1 para no comprobar cada
      // par dos veces.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
          const dx = nodos[i].x - nodos[j].x;
          const dy = nodos[i].y - nodos[j].y;
          const distancia = Math.hypot(dx, dy);
          if (distancia > AJUSTES.radioEnlace) continue;

          const fuerza = 1 - distancia / AJUSTES.radioEnlace;
          ctx.strokeStyle = `rgba(${AZUL}, ${fuerza * AJUSTES.opacidadLinea})`;
          ctx.beginPath();
          ctx.moveTo(nodos[i].x, nodos[i].y);
          ctx.lineTo(nodos[j].x, nodos[j].y);
          ctx.stroke();
        }
      }

      // Enlaces al cursor y nodos iluminados.
      for (const nodo of nodos) {
        let opacidad = AJUSTES.opacidadNodo;

        if (cursor.activo) {
          const distancia = Math.hypot(nodo.x - cursor.x, nodo.y - cursor.y);
          if (distancia < AJUSTES.radioCursor) {
            const fuerza = 1 - distancia / AJUSTES.radioCursor;
            opacidad =
              AJUSTES.opacidadNodo +
              fuerza * (AJUSTES.opacidadNodoCercano - AJUSTES.opacidadNodo);

            ctx.strokeStyle = `rgba(${AZUL}, ${fuerza * AJUSTES.opacidadLineaCursor})`;
            ctx.beginPath();
            ctx.moveTo(nodo.x, nodo.y);
            ctx.lineTo(cursor.x, cursor.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${AZUL}, ${opacidad})`;
        ctx.beginPath();
        ctx.arc(nodo.x, nodo.y, AJUSTES.radioNodo, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const dibujar = () => {
      pintarFrame();
      animacion = requestAnimationFrame(dibujar);
    };

    const arrancar = () => {
      if (animacion) return;
      animacion = requestAnimationFrame(dibujar);
    };

    const detener = () => {
      if (!animacion) return;
      cancelAnimationFrame(animacion);
      animacion = 0;
    };

    const alMover = (evento: MouseEvent) => {
      const caja = contenedor.getBoundingClientRect();
      cursor.x = evento.clientX - caja.left;
      cursor.y = evento.clientY - caja.top;
      cursor.activo = true;
    };

    const alSalir = () => {
      cursor.activo = false;
    };

    const alCambiarVisibilidad = () => {
      if (document.hidden || !visible) detener();
      else arrancar();
    };

    medir();

    const observador = new IntersectionObserver(
      ([entrada]) => {
        visible = entrada.isIntersecting;
        alCambiarVisibilidad();
      },
      { rootMargin: '120px' },
    );
    observador.observe(contenedor);

    // Se envuelve en una función: ResizeObserver pasa las entradas como
    // primer argumento y se colarían en el parámetro `pintar` de medir().
    const observadorTamano = new ResizeObserver(() => medir());
    observadorTamano.observe(contenedor);

    contenedor.addEventListener('mousemove', alMover);
    contenedor.addEventListener('mouseleave', alSalir);
    document.addEventListener('visibilitychange', alCambiarVisibilidad);

    return () => {
      detener();
      observador.disconnect();
      observadorTamano.disconnect();
      contenedor.removeEventListener('mousemove', alMover);
      contenedor.removeEventListener('mouseleave', alSalir);
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

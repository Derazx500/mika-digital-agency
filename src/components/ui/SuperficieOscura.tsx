'use client';

import { useRef, type ReactNode } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * Superficie oscura con un foco de luz que sigue al cursor.
 *
 * El efecto es deliberadamente contenido: un halo suave en azul de marca que
 * aparece al entrar el puntero y se apaga al salir. Se nota que la superficie
 * responde, sin convertirse en un truco que distrae de lo que dice el texto.
 *
 * Cómo está hecho y por qué:
 * - La posición se pasa como dos variables CSS y el degradado vive en el
 *   `::before`. Al mover el ratón solo se reescriben dos números; no se
 *   recalcula el diseño de la página, que es lo que haría que se sintiera
 *   pesado.
 * - Se lee `getBoundingClientRect` en cada movimiento a propósito: guardarlo
 *   en memoria se desincroniza en cuanto la página hace scroll, y el halo
 *   aparecería desplazado del cursor.
 * - En pantallas táctiles no hay puntero que seguir, así que no ocurre nada
 *   y la superficie se ve igual que antes.
 */
export function SuperficieOscura({
  children,
  className,
  as: Etiqueta = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'footer';
}) {
  const ref = useRef<HTMLElement>(null);

  const alMover = (evento: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const caja = el.getBoundingClientRect();
    el.style.setProperty('--foco-x', `${evento.clientX - caja.left}px`);
    el.style.setProperty('--foco-y', `${evento.clientY - caja.top}px`);
  };

  const alEntrar = () => {
    ref.current?.style.setProperty('--foco-opacidad', '1');
  };

  const alSalir = () => {
    ref.current?.style.setProperty('--foco-opacidad', '0');
  };

  return (
    <Etiqueta
      // @ts-expect-error -- el ref vale para las tres etiquetas permitidas
      ref={ref}
      onMouseMove={alMover}
      onMouseEnter={alEntrar}
      onMouseLeave={alSalir}
      className={clsx('superficie-oscura', className)}
    >
      {children}
    </Etiqueta>
  );
}

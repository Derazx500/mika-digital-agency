'use client';

import { useRef, type ReactNode } from 'react';

import { clsx } from '@/lib/clsx';
import { RedDeNodos } from '@/components/ui/RedDeNodos';

/**
 * Superficie oscura con red de nodos y un halo que sigue al cursor.
 *
 * Van los dos efectos juntos a propósito y cada uno hace una cosa distinta:
 * los nodos dan movimiento constante —la superficie está viva aunque nadie
 * la toque— y el halo responde al puntero. Solos, el primero se ignora
 * pronto y el segundo se siente plano.
 *
 * El halo se dibuja con CSS y los nodos en un canvas. Al mover el ratón solo
 * se reescriben dos variables CSS, así que el navegador no recalcula el
 * diseño de la página en ningún momento.
 *
 * Se lee `getBoundingClientRect` en cada movimiento a propósito: guardarlo en
 * memoria se desincroniza en cuanto la página hace scroll, y el halo
 * aparecería desplazado del cursor.
 */
export function SuperficieOscura({
  children,
  className,
  as: Etiqueta = 'div',
  /** Los bloques pequeños se ven cargados con nodos; ahí basta el halo. */
  conNodos = true,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'footer';
  conNodos?: boolean;
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
      {conNodos && <RedDeNodos />}
      {children}
    </Etiqueta>
  );
}

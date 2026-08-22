import type { ReactNode } from 'react';

import { clsx } from '@/lib/clsx';
import { RedDeNodos } from '@/components/ui/RedDeNodos';

/**
 * Superficie oscura con red de nodos.
 *
 * Toda la reacción al cursor vive dentro del canvas de [RedDeNodos]: los nodos
 * cercanos crecen, se enlazan al puntero y el puntero mismo se dibuja como un
 * nodo brillante. Antes había además un halo azul de CSS siguiendo al ratón,
 * y se quitó porque era una capa aparte flotando sobre la red — leía como un
 * foco encima del diseño en vez de como parte de él.
 *
 * Al no tener ya estado ni eventos, esto es un componente de servidor: no
 * manda nada de JavaScript al navegador salvo el propio canvas.
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
  return (
    <Etiqueta className={clsx('superficie-oscura', className)}>
      <RedDeNodos />
      {children}
    </Etiqueta>
  );
}

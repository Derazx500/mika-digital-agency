'use client';

import { Moon, Sun } from 'lucide-react';

import { alternarTema } from '@/lib/tema';
import { clsx } from '@/lib/clsx';

/**
 * Botón para cambiar entre tema claro y oscuro.
 *
 * Los dos iconos están siempre en el HTML y es el CSS quien enseña el que
 * toca, con la variante `dark:`. No hay estado de React detrás, y esa es la
 * gracia: el servidor no sabe qué tema tiene el visitante, así que si el
 * icono dependiera de un estado, el HTML llegaría con el icono equivocado y
 * saltaría al hidratar. Resuelto con CSS, sale bien desde el primer píxel.
 *
 * El `aria-label` sí es fijo —"Cambiar tema"— en vez de decir a cuál cambia,
 * por el mismo motivo: describir el destino exigiría saber el tema actual.
 */
export function BotonTema({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={alternarTema}
      aria-label="Cambiar entre tema claro y oscuro"
      title="Cambiar tema"
      className={clsx(
        'grid h-9 w-9 place-items-center rounded-full text-texto-suave transition-colors duration-300 hover:bg-superficie-sutil hover:text-texto',
        className,
      )}
    >
      <Sun size={17} aria-hidden="true" className="dark:hidden" />
      <Moon size={17} aria-hidden="true" className="hidden dark:block" />
    </button>
  );
}

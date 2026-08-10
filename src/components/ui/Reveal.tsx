'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * Aparición suave al entrar en pantalla, con IntersectionObserver.
 *
 * Es deliberadamente ligero: nada de librerías de animación, que suelen pesar
 * más que el resto de la página junta y castigan el Core Web Vitals.
 * El contenido siempre está en el HTML, así que Google lo indexa igual.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error -- el ref es válido para todas las etiquetas permitidas
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx(
        'transition-all duration-700 ease-roll motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

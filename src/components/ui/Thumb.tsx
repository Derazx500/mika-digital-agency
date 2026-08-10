'use client';

import { useState } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * Imagen con degradado de respaldo.
 *
 * Mientras no tengamos las capturas reales de cada proyecto, esto evita el
 * icono de imagen rota: si el archivo no existe, se dibuja un degradado con la
 * inicial del proyecto. Cuando subas las imágenes a /public/images/portafolio/
 * empiezan a mostrarse solas, sin tocar código.
 *
 * Se usa <img> nativo en vez de next/image porque el sitio compila a export
 * estático y el optimizador de Next no corre en HostGator.
 */
export function Thumb({
  src,
  alt,
  label,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  /** Texto del respaldo. Normalmente el nombre del proyecto. */
  label: string;
  className?: string;
  /** true en la primera imagen visible: evita el lazy-load y mejora el LCP. */
  priority?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className={clsx(
          'flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-ink',
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <span className="px-6 text-center text-[15px] font-medium tracking-tight text-white/90">
          {label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setBroken(true)}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // fetchPriority alta solo en la imagen que domina la primera pantalla.
      fetchPriority={priority ? 'high' : 'auto'}
      className={clsx('h-full w-full object-cover', className)}
    />
  );
}

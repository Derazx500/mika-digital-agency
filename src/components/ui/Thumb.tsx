'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * Imagen con degradado de respaldo.
 *
 * Mientras falten las imágenes reales, esto evita el icono de imagen rota: si
 * el archivo no existe, se dibuja un degradado con el título encima. Cuando
 * subas la imagen empieza a mostrarse sola, sin tocar código.
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
  const imgRef = useRef<HTMLImageElement>(null);

  /*
   * El `onError` de abajo no basta.
   *
   * El HTML llega ya renderizado desde el servidor, así que el navegador pide
   * la imagen mucho antes de que React llegue a enganchar sus eventos. Si el
   * archivo no existe, el fallo ocurre en ese hueco: cuando React se activa,
   * el error ya pasó y nadie lo escuchó — el respaldo no se mostraba nunca y
   * quedaba el icono de imagen rota.
   *
   * Al montar se comprueba el estado real de la imagen. `complete` con
   * `naturalWidth` en cero solo puede significar una cosa: la descarga terminó
   * y no había imagen. Es la forma fiable de detectar el fallo que nos
   * perdimos.
   */
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setBroken(true);
  }, [src]);

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
      ref={imgRef}
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

import { Thumb } from '@/components/ui/Thumb';
import { clsx } from '@/lib/clsx';

/**
 * Imagen dentro de un artículo, con pie de foto opcional.
 *
 * Se usa directamente en los .mdx:
 *   <Figure src="/images/blog/mi-foto.webp" alt="..." caption="..." />
 *
 * `wide` la saca de la columna de texto para que respire (hasta 56rem).
 */
export function Figure({
  src,
  alt,
  caption,
  wide = false,
  ratio = '16/9',
}: {
  src: string;
  /** Describe lo que se ve. Cuenta para SEO y para lectores de pantalla. */
  alt: string;
  caption?: string;
  wide?: boolean;
  ratio?: '16/9' | '4/3' | '1/1' | '3/2';
}) {
  return (
    <figure className={clsx('my-10', wide && 'lg:-mx-20 xl:-mx-28')}>
      <div className="overflow-hidden rounded-2xl bg-gray-100">
        <div style={{ aspectRatio: ratio.replace('/', ' / ') }}>
          <Thumb src={src} alt={alt} label={caption ?? alt} />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[13px] leading-[1.5] text-gray-500 sm:text-[14px]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

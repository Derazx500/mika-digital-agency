import { clsx } from '@/lib/clsx';
import { IMAGENES } from '@/lib/ajustes';

/**
 * Logotipo de Mika.
 *
 * Se cambia desde el panel, en Ajustes del sitio → Imágenes, y desde ahí se
 * actualiza en los tres sitios donde aparece: navbar, menú móvil y pie.
 *
 * Junto al archivo se piden sus medidas, y no es un capricho: la altura la
 * fija el diseño y el ancho se calcula con esa proporción. Si las medidas no
 * corresponden al archivo, el logo sale estirado o aplastado. Un SVG es la
 * mejor opción —nítido a cualquier tamaño y más ligero—, y también lleva
 * medidas propias.
 */
const SRC = IMAGENES.logo;

/** Proporción real del archivo, para reservar el espacio y evitar saltos. */
const RATIO = IMAGENES.logoAncho / IMAGENES.logoAlto;

export function Logo({
  className,
  /**
   * En fondos oscuros el wordmark gris no contrasta, así que se coloca sobre
   * una pastilla blanca. Conserva el azul de la marca, cosa que un filtro
   * de inversión destruiría.
   */
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const img = (
    <img
      src={SRC}
      alt="Mika Digital Agency"
      width={IMAGENES.logoAncho}
      height={IMAGENES.logoAlto}
      // La altura la fija quien lo usa (className); el ancho se calcula solo.
      className={clsx('w-auto', className)}
      style={{ aspectRatio: RATIO }}
      // El logo del navbar está siempre en la primera pantalla: sin lazy-load.
      loading="eager"
      decoding="sync"
    />
  );

  if (onDark) {
    return (
      <span className="inline-flex items-center rounded-lg bg-white px-3 py-2">
        {img}
      </span>
    );
  }

  return img;
}

import { clsx } from '@/lib/clsx';

/**
 * Logotipo de Mika.
 *
 * Hoy usa `public/logo/mika-logo.png` (356 × 78 px), recuperado del sitio
 * anterior. A 32 px de alto da una densidad de 2.4x, así que se ve nítido
 * incluso en pantallas retina.
 *
 * PARA MEJORARLO: deja tu logo vectorial en `public/logo/mika-logo.svg` y
 * cambia la constante SRC de abajo. Un SVG es nítido a cualquier tamaño y
 * pesa menos. Es el único cambio necesario: el logo se usa en el navbar, el
 * menú móvil y el pie de página desde este mismo componente.
 */
const SRC = '/logo/mika-logo.png';

/** Proporción real del archivo, para reservar el espacio y evitar saltos. */
const RATIO = 356 / 78;

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
      width={356}
      height={78}
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

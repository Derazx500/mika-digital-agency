import { clsx } from '@/lib/clsx';
import { IMAGENES } from '@/lib/ajustes';

/**
 * Logotipo de Mika, en sus dos versiones.
 *
 * Se cambian desde el panel, en Ajustes del sitio → Imágenes. Junto a cada
 * archivo se piden sus medidas, y no es un capricho: la altura la fija el
 * diseño y el ancho se calcula con esa proporción. Si las medidas no
 * corresponden al archivo, el logo sale estirado o aplastado.
 *
 * Las dos versiones van siempre en el HTML y es el CSS quien enseña la que
 * toca, con la variante `dark:`. Se hace así y no con JavaScript porque el
 * servidor no sabe en qué tema está el visitante: con estado, el logo llegaría
 * en la versión equivocada y saltaría a la buena al hidratar, justo en la
 * pieza que más se mira de la cabecera. Son 14 KB entre las dos y solo se
 * pinta una.
 */

/** Proporción real de cada archivo, para reservar el hueco y evitar saltos. */
const RATIO_COLOR = IMAGENES.logoAncho / IMAGENES.logoAlto;
const RATIO_BLANCO = IMAGENES.logoBlancoAncho / IMAGENES.logoBlancoAlto;

const COMUN = 'w-auto';

export function Logo({
  className,
  /**
   * `true` cuando el logo va sobre un panel que es oscuro en los dos temas
   * —el pie, la franja de CTA—. Ahí siempre toca la versión blanca, sin
   * importar el tema de la página.
   */
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const blanco = (
    <img
      src={IMAGENES.logoBlanco}
      alt="Mika Digital Agency"
      width={IMAGENES.logoBlancoAncho}
      height={IMAGENES.logoBlancoAlto}
      className={clsx(COMUN, className, !onDark && 'hidden dark:block')}
      style={{ aspectRatio: RATIO_BLANCO }}
      loading="eager"
      decoding="sync"
    />
  );

  // Sobre un panel oscuro no hay nada que alternar: siempre el blanco.
  if (onDark) return blanco;

  return (
    <>
      <img
        src={IMAGENES.logo}
        alt="Mika Digital Agency"
        width={IMAGENES.logoAncho}
        height={IMAGENES.logoAlto}
        // La altura la fija quien lo usa (className); el ancho se calcula solo.
        className={clsx(COMUN, className, 'dark:hidden')}
        style={{ aspectRatio: RATIO_COLOR }}
        // El logo del navbar está siempre en la primera pantalla: sin lazy-load.
        loading="eager"
        decoding="sync"
      />
      {blanco}
    </>
  );
}

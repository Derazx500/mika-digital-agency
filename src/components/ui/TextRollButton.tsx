import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clsx } from '@/lib/clsx';

type Variant = 'brand' | 'dark' | 'light';

type Props = {
  href: string;
  children: string;
  variant?: Variant;
  /** Los enlaces a WhatsApp o redes deben abrir en pestaña nueva. */
  external?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  'aria-label'?: string;
};

const VARIANTS: Record<Variant, { shell: string; circle: string; arrow: string }> = {
  brand: {
    shell: 'bg-brand-500 text-white hover:bg-brand-600',
    circle: 'bg-white',
    arrow: 'text-brand-500',
  },
  dark: {
    shell: 'bg-ink text-white hover:bg-ink-soft',
    circle: 'bg-white',
    arrow: 'text-ink',
  },
  light: {
    shell: 'bg-white text-ink border border-gray-200 hover:border-gray-300',
    circle: 'bg-ink',
    arrow: 'text-white',
  },
};

/**
 * Botón con animación "text roll": el texto está duplicado dentro de un
 * contenedor con overflow oculto y en hover sube 50%, de modo que la copia
 * inferior entra desde abajo. La flecha rota -45° al mismo tiempo.
 *
 * El texto duplicado se marca aria-hidden para que los lectores de pantalla
 * no lo lean dos veces.
 */
export function TextRollButton({
  href,
  children,
  variant = 'brand',
  external = false,
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: Props) {
  const v = VARIANTS[variant];
  const isSmall = size === 'sm';

  const content = (
    <>
      <span
        className={clsx(
          'flex flex-col overflow-hidden',
          isSmall ? 'h-[18px]' : 'h-[20px]',
        )}
      >
        <span className="transition-transform duration-500 ease-roll group-hover:-translate-y-1/2">
          <span className="block">{children}</span>
          <span className="block" aria-hidden="true">
            {children}
          </span>
        </span>
      </span>

      <span
        className={clsx(
          'grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-roll group-hover:-rotate-45',
          v.circle,
          isSmall ? 'h-7 w-7' : 'h-7 w-7 sm:h-8 sm:w-8',
        )}
      >
        <ArrowRight className={v.arrow} size={isSmall ? 13 : 15} aria-hidden="true" />
      </span>
    </>
  );

  const classes = clsx(
    'group inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 font-medium transition-colors duration-300 sm:pl-6',
    isSmall ? 'text-[13px]' : 'text-[13px] sm:text-[14px]',
    v.shell,
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

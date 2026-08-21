/**
 * Iconos de redes sociales.
 *
 * Van dibujados a mano y no importados de lucide-react porque esa librería
 * retiró los iconos de marca en la versión 1 —por temas de marca
 * registrada—, así que ya no existen ahí.
 *
 * Todos comparten el mismo lienzo de 24×24 y usan `fill="currentColor"`,
 * de modo que heredan el color del contenedor y se pueden animar con las
 * mismas clases que el resto del sitio.
 */

type Props = { className?: string };

export function InstagramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.44c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07Z" />
      <path d="M12 15.34a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68Zm0-8.48a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28Z" />
      <circle cx="17.34" cy="6.66" r="1.2" />
    </svg>
  );
}

export function FacebookIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function BehanceIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7.44 5.5c.7 0 1.34.06 1.92.19.57.12 1.06.32 1.47.6.4.28.72.65.94 1.11.22.46.33 1.04.33 1.72 0 .74-.17 1.35-.5 1.84-.34.49-.84.89-1.5 1.2.9.26 1.58.72 2.02 1.37.44.66.67 1.45.67 2.37 0 .75-.15 1.4-.44 1.94-.29.55-.68 1-1.17 1.34-.49.35-1.05.6-1.68.77-.63.16-1.28.25-1.94.25H0V5.5h7.44ZM7 11.2c.58 0 1.05-.14 1.42-.41.37-.28.55-.72.55-1.34 0-.34-.06-.62-.18-.84a1.3 1.3 0 0 0-.5-.51 2.1 2.1 0 0 0-.71-.26 4.6 4.6 0 0 0-.84-.07H3.28v3.43H7Zm.2 5.98c.32 0 .63-.03.92-.1.29-.06.55-.16.77-.31.22-.15.4-.36.53-.62.13-.26.2-.6.2-1 0-.79-.22-1.35-.66-1.69-.44-.34-1.03-.5-1.75-.5H3.28v4.22H7.2ZM17.3 17.2c.44.43 1.08.65 1.91.65.6 0 1.11-.15 1.54-.45.43-.3.7-.62.79-.95h2.32c-.37 1.16-.94 1.99-1.71 2.49-.77.5-1.7.75-2.79.75-.76 0-1.44-.12-2.05-.36a4.25 4.25 0 0 1-1.55-1.04 4.6 4.6 0 0 1-.98-1.6 5.9 5.9 0 0 1-.34-2.04c0-.73.12-1.4.35-2.02a4.7 4.7 0 0 1 1-1.61c.44-.45.96-.81 1.56-1.07a5.1 5.1 0 0 1 2.01-.39c.83 0 1.56.16 2.18.48.62.32 1.13.75 1.53 1.29.4.54.68 1.16.86 1.85.17.7.23 1.43.18 2.19h-6.99c0 .84.24 1.4.68 1.83Zm3.33-4.98c-.35-.38-.88-.58-1.6-.58-.46 0-.85.08-1.16.24-.31.16-.55.35-.74.58-.18.23-.31.48-.38.74-.07.26-.11.49-.13.7h4.33c-.13-.68-.35-1.29-.32-1.68ZM15.4 6.53h5.42v1.32H15.4V6.53Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Z" />
    </svg>
  );
}

export function DribbbleIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm7.93 5.53a10.16 10.16 0 0 1 2.3 6.36c-.34-.07-3.7-.75-7.1-.32-.07-.17-.14-.34-.22-.52-.2-.48-.43-.97-.66-1.44 3.75-1.53 5.46-3.73 5.68-4.08ZM12 1.78c2.6 0 4.98.98 6.78 2.58-.18.26-1.72 2.32-5.34 3.68A54.2 54.2 0 0 0 9.6 2.1 10.3 10.3 0 0 1 12 1.78Zm-4.35.99a63.9 63.9 0 0 1 3.8 5.85c-4.8 1.28-9.03 1.25-9.49 1.25a10.3 10.3 0 0 1 5.69-7.1ZM1.78 12v-.31c.44.01 5.42.08 10.54-1.46.3.57.57 1.15.83 1.73l-.4.12c-5.29 1.7-8.1 6.37-8.34 6.76A10.2 10.2 0 0 1 1.78 12ZM12 22.24c-2.35 0-4.5-.8-6.22-2.13.18-.38 2.28-4.4 8.07-6.42l.07-.02c1.44 3.74 2.03 6.87 2.19 7.77A10.2 10.2 0 0 1 12 22.24Zm5.84-1.76c-.1-.63-.65-3.63-1.99-7.31 3.2-.51 6 .32 6.35.43a10.24 10.24 0 0 1-4.36 6.88Z" />
    </svg>
  );
}

export function TiktokIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.68 5.68 0 0 0-.77-.05A5.68 5.68 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

/** Reserva para cualquier red que no tenga icono propio. */
export function SitioWebIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

/** Registro por clave, para recorrer las redes configuradas. */
export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  behance: BehanceIcon,
  whatsapp: WhatsAppIcon,
  dribbble: DribbbleIcon,
  tiktok: TiktokIcon,
  web: SitioWebIcon,
} as const;

export type SocialKey = keyof typeof SOCIAL_ICONS;

/**
 * Devuelve el icono de una red por su nombre.
 *
 * Tolera lo que se escriba en el panel: mayúsculas, espacios o un nombre que
 * no tengamos. Si no reconoce la red, devuelve el icono de sitio web en vez
 * de dejar el hueco vacío.
 */
export function iconoDeRed(red: string) {
  const clave = red.trim().toLowerCase() as SocialKey;
  return SOCIAL_ICONS[clave] ?? SitioWebIcon;
}

/** Nombre presentable de una red, para el aria-label. */
export function nombreDeRed(red: string): string {
  const clave = red.trim().toLowerCase();
  const nombres: Record<string, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    behance: 'Behance',
    whatsapp: 'WhatsApp',
    dribbble: 'Dribbble',
    tiktok: 'TikTok',
    web: 'Sitio web',
  };
  return nombres[clave] ?? red;
}

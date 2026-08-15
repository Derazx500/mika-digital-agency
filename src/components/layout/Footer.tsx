import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { NAV_LINKS, SERVICES, SITE, waLink } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { TextRollButton } from '@/components/ui/TextRollButton';
import { SOCIAL_ICONS, type SocialKey } from '@/components/ui/SocialIcons';

/**
 * Redes del pie de página.
 *
 * WhatsApp va aquí a propósito aunque no sea una red social: para un negocio
 * en México es el canal por el que más gente escribe, y quien busca el
 * contacto lo busca entre los iconos.
 */
const REDES: { clave: SocialKey; nombre: string; url: string }[] = [
  { clave: 'whatsapp', nombre: 'WhatsApp', url: waLink() },
  { clave: 'instagram', nombre: 'Instagram', url: SITE.social.instagram },
  { clave: 'facebook', nombre: 'Facebook', url: SITE.social.facebook },
  { clave: 'linkedin', nombre: 'LinkedIn', url: SITE.social.linkedin },
  { clave: 'behance', nombre: 'Behance', url: SITE.social.behance },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="container-mika py-16 sm:py-20 lg:py-24">
        {/* Llamada final a la acción */}
        <div className="mb-16 border-b border-white/10 pb-16">
          <h2 className="h-section max-w-3xl text-white">
            ¿Listo para que tu marca se vea como lo que realmente vale?
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.6] text-white/60 sm:text-[16px]">
            Cuéntanos qué necesitas por WhatsApp. Te respondemos con una
            propuesta clara, un plazo real y un precio cerrado.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <TextRollButton href={waLink()} external variant="brand">
              Escríbenos por WhatsApp
            </TextRollButton>
            <a
              href={`mailto:${SITE.email}`}
              className="text-[14px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              o escribe a {SITE.email}
            </a>
          </div>
        </div>

        {/* Columnas */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-7" onDark />
            <p className="mt-4 max-w-xs text-[14px] leading-[1.6] text-white/50">
              Agencia digital en {SITE.address.city}. Diseño web, posicionamiento
              SEO y branding para marcas que quieren crecer en serio. Desde{' '}
              {SITE.founded}.
            </p>
          </div>

          <nav aria-label="Servicios">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white/40">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}/`}
                    className="text-[14px] text-white/70 transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/servicios/"
                  className="text-[14px] text-white/70 transition-colors hover:text-white"
                >
                  Ver todos los servicios
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Sitio">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white/40">
              Sitio
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contacto/"
                  className="text-[14px] text-white/70 transition-colors hover:text-white"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white/40">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-[14px] text-white/70">
              <li>
                <a
                  href={`tel:+${SITE.phoneRaw}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone size={15} aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail size={15} aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} aria-hidden="true" />
                {SITE.address.city}, {SITE.address.countryName}
              </li>
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {REDES.map((red) => {
                const Icono = SOCIAL_ICONS[red.clave];
                return (
                  <li key={red.clave}>
                    <a
                      href={red.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      // El nombre va en aria-label porque el icono es solo
                      // una forma: sin esto, un lector de pantalla anuncia
                      // "enlace" y ya.
                      aria-label={red.nombre}
                      title={red.nombre}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <Icono className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <p>
            <Link href="/aviso-de-privacidad/" className="transition-colors hover:text-white/70">
              Aviso de privacidad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

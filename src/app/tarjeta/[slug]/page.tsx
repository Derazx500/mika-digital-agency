import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, Mail, Phone, UserPlus } from 'lucide-react';

import { getMiembro, getMiembros } from '@/lib/team';
import { SITE } from '@/lib/site';
import { buildMetadata, recortarDescripcion } from '@/lib/seo';

import { CabeceraTarjeta } from '@/components/tarjeta/CabeceraTarjeta';
import { CompartirTarjeta } from '@/components/tarjeta/CompartirTarjeta';
import { Logo } from '@/components/ui/Logo';
import { WhatsAppIcon, iconoDeRed, nombreDeRed } from '@/components/ui/SocialIcons';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return getMiembros().map((m) => ({ slug: m.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const miembro = getMiembro(slug);
  if (!miembro) return {};

  return buildMetadata({
    title: `${miembro.name} — ${miembro.role} | Mika`,
    description: recortarDescripcion(
      `Tarjeta de presentación digital de ${miembro.name}, ${miembro.role} en ${SITE.name}. Guarda su contacto o escríbele por WhatsApp.`,
    ),
    path: `/tarjeta/${miembro.slug}/`,
    image: miembro.photo,
    /*
     * Fuera del índice a propósito.
     *
     * El perfil completo vive en /equipo/[slug]/ y es el que debe posicionar
     * por el nombre de la persona: tiene su historia, sus proyectos y su
     * reseña. Esta tarjeta habla de lo mismo con mucho menos contenido, así
     * que si las dos compiten por la misma búsqueda Google elige una —casi
     * nunca la que queremos— y la otra queda muerta.
     *
     * No indexarla no le quita nada: a una tarjeta se llega por su QR o por
     * su enlace, nunca buscándola.
     */
    noIndex: true,
  });
}

export default async function TarjetaPage({ params }: Props) {
  const { slug } = await params;
  const miembro = getMiembro(slug);
  if (!miembro) notFound();

  const url = `${SITE.url}/tarjeta/${miembro.slug}/`;

  // Mensaje con el nombre de la persona: quien escanea sabe a quién escribe,
  // y quien recibe sabe que el contacto vino de su tarjeta y no de la web.
  const mensaje = `Hola ${miembro.name.split(' ')[0]}, vi tu tarjeta digital y me gustaría contactarte.`;
  const whatsapp = `https://wa.me/${miembro.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-[#EFEFEF] px-4 py-8 sm:px-6 sm:py-12">
      <article className="w-full max-w-[26rem] overflow-hidden rounded-[26px] bg-white shadow-[0_18px_60px_rgba(10,10,10,0.12)]">
        <CabeceraTarjeta foto={miembro.photo} nombre={miembro.name} />

        {/* El padding superior deja sitio a la foto, que se sale de la cabecera. */}
        <div className="px-6 pb-8 pt-[68px] text-center sm:px-8">
          <h1 className="text-[26px] font-medium leading-[1.15] tracking-tight text-gray-900 sm:text-[30px]">
            {miembro.name}
          </h1>
          <p className="mt-1.5 text-[15px] text-brand-500">{miembro.role}</p>
          <p className="mt-0.5 text-[13px] text-gray-500">
            {SITE.name} · {SITE.address.city}
          </p>

          <p className="mt-5 text-[15px] leading-[1.6] text-gray-600">
            {miembro.shortBio}
          </p>

          {miembro.specialties.length > 0 && (
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {miembro.specialties.slice(0, 4).map((especialidad) => (
                <li
                  key={especialidad}
                  className="rounded-full bg-gray-100 px-3 py-1 text-[12px] text-gray-600"
                >
                  {especialidad}
                </li>
              ))}
            </ul>
          )}

          {/* Acción principal: es la que casi todo el mundo va a pulsar. */}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-500 px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-brand-600"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            Escríbeme por WhatsApp
          </a>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={`tel:+${miembro.whatsapp}`}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-gray-900 transition-colors duration-300 hover:border-gray-300 hover:bg-gray-50"
            >
              <Phone size={16} aria-hidden="true" />
              Llamar
            </a>
            <a
              href={`mailto:${miembro.email}`}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-gray-900 transition-colors duration-300 hover:border-gray-300 hover:bg-gray-50"
            >
              <Mail size={16} aria-hidden="true" />
              Correo
            </a>
          </div>

          {/*
            Guardar el contacto es el objetivo real de una tarjeta: que los
            datos acaben en la agenda y no en una pestaña que se cierra. Por
            eso va destacado y no escondido entre los enlaces.
          */}
          <a
            // Con la barra final: el sitio usa `trailingSlash`, y sin ella
            // la descarga pasaría antes por una redirección 308.
            href={`/tarjeta/${miembro.slug}/vcard/`}
            className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-gray-800"
          >
            <UserPlus size={17} aria-hidden="true" />
            Guardar contacto
          </a>

          <div className="mt-3">
            <CompartirTarjeta url={url} nombre={`${miembro.name} — ${miembro.role}`} />
          </div>

          {miembro.socials.length > 0 && (
            <div className="mt-7 border-t border-gray-100 pt-6">
              <ul className="flex flex-wrap justify-center gap-2.5">
                {miembro.socials.map((red) => {
                  const Icono = iconoDeRed(red.red);
                  return (
                    <li key={red.url}>
                      <a
                        href={red.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={nombreDeRed(red.red)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-300 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-500"
                      >
                        <Icono className="h-[18px] w-[18px]" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <Link
            href={`/equipo/${miembro.slug}/`}
            className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-500 underline-offset-4 hover:underline"
          >
            Ver mi trabajo
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/60 px-6 py-4">
          <Link
            href="/"
            className="flex items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100"
            aria-label={`Ir al sitio de ${SITE.name}`}
          >
            <Logo className="h-[22px]" />
          </Link>
        </div>
      </article>

      <p className="mt-6 text-center text-[12px] text-gray-400">
        ¿Quieres una tarjeta digital como esta?{' '}
        <Link
          href="/servicios/tarjetas-de-presentacion-digitales/"
          className="text-gray-500 underline underline-offset-4 hover:text-brand-500"
        >
          Te la hacemos
        </Link>
      </p>

      {/*
        Los datos de la persona en el formato que leen los buscadores y los
        asistentes. Aunque la página no se indexe, quien comparta el enlace
        —o una IA que lo lea— obtiene el contacto estructurado.
      */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: miembro.name,
          jobTitle: miembro.role,
          description: miembro.shortBio,
          image: `${SITE.url}${miembro.photo}`,
          telephone: `+${miembro.whatsapp}`,
          email: miembro.email,
          url: `${SITE.url}/equipo/${miembro.slug}/`,
          worksFor: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          sameAs: miembro.socials.map((s) => s.url),
        }}
      />
    </div>
  );
}

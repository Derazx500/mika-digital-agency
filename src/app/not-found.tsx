import Link from 'next/link';
import { TextRollButton } from '@/components/ui/TextRollButton';
import { NAV_LINKS } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-white pt-28">
      <div className="container-mika">
        <p className="text-[13px] tracking-wide text-brand-500">Error 404</p>

        <h1 className="h-display mt-4 max-w-[16ch] text-gray-900">
          Esta página no existe.
        </h1>

        <p className="mt-6 max-w-lg text-[16px] leading-[1.65] text-gray-600">
          Puede que el enlace esté mal escrito o que la página haya cambiado de
          lugar. Desde aquí puedes seguir a cualquier otra parte del sitio.
        </p>

        <div className="mt-8">
          <TextRollButton href="/" variant="brand">
            Volver al inicio
          </TextRollButton>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-200 pt-8 text-[14px]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-600 underline-offset-4 transition-colors hover:text-brand-500 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contacto/"
              className="text-gray-600 underline-offset-4 transition-colors hover:text-brand-500 hover:underline"
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

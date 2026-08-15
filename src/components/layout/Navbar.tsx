'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Clock, Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE, waLink } from '@/lib/site';
import { clsx } from '@/lib/clsx';
import { Logo } from '@/components/ui/Logo';

/** Reloj en vivo de CDMX. Refuerza que la agencia está operando ahora mismo. */
function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: SITE.timezone,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  // null en el primer render del servidor: evita un error de hidratación,
  // porque la hora del servidor y la del navegador nunca coinciden.
  return time;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const time = useLocalTime();

  // Cierra el menú al navegar a otra página.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Cierra con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto w-full max-w-[1440px] p-2 sm:p-3">
          {/*
            El navbar flota sobre el shader del hero, que es justo donde un
            cristal tiene sentido: se ve el color en movimiento a través de
            él. En el resto de páginas el fondo es blanco y queda como una
            píldora blanca normal, sin llamar la atención.
          */}
          <nav
            className="liquid-glass flex items-center justify-between rounded-full p-[13px]"
            aria-label="Navegación principal"
          >
            {/* Izquierda: logo + enlaces */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                aria-label={`${SITE.name} — Inicio`}
                className="ml-2 block shrink-0"
              >
                <Logo className="h-6 sm:h-7" />
              </Link>

              <ul className="hidden items-center gap-6 md:flex">
                {NAV_LINKS.map((link) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={clsx(
                          'text-[14px] transition-colors duration-300 hover:text-gray-500',
                          active ? 'text-brand-500' : 'text-gray-900',
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Derecha: disponibilidad, reloj y CTA */}
            <div className="hidden items-center gap-5 md:flex">
              <span className="hidden text-[13px] text-gray-600 lg:inline">
                Agenda abierta para nuevos proyectos
              </span>

              <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
                <Clock size={14} aria-hidden="true" />
                {/* suppressHydrationWarning: la hora solo existe en el cliente. */}
                <span suppressHydrationWarning>
                  {time ? `${time} en ${SITE.timezoneLabel}` : `— en ${SITE.timezoneLabel}`}
                </span>
              </span>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-ink-soft"
              >
                <span className="flex h-[20px] flex-col overflow-hidden">
                  <span className="transition-transform duration-500 ease-roll group-hover:-translate-y-1/2">
                    <span className="block">Cotizar por WhatsApp</span>
                    <span className="block" aria-hidden="true">
                      Cotizar por WhatsApp
                    </span>
                  </span>
                </span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white transition-transform duration-500 ease-roll group-hover:-rotate-45">
                  <ArrowRight className="text-ink" size={13} aria-hidden="true" />
                </span>
              </a>
            </div>

            {/* Móvil: toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white md:hidden"
            >
              {open ? (
                <X size={15} aria-hidden="true" />
              ) : (
                <Menu size={15} aria-hidden="true" />
              )}
              {open ? 'Cerrar' : 'Menú'}
            </button>
          </nav>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} time={time} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  time,
}: {
  open: boolean;
  onClose: () => void;
  time: string | null;
}) {
  return (
    <div
      id="menu-movil"
      className={clsx(
        'fixed inset-0 z-50 md:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      {/* Fondo oscuro */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Cerrar menú"
        onClick={onClose}
        className={clsx(
          'absolute inset-0 bg-black/60 transition-opacity duration-500',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Hoja inferior */}
      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-5 transition-transform duration-500 ease-sheet',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-[12px] text-gray-600">
          <Clock size={13} aria-hidden="true" />
          <span suppressHydrationWarning>
            {time ? `${time} en ${SITE.timezoneLabel}` : SITE.timezoneLabel}
          </span>
        </div>

        <ul className="mb-8 space-y-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
                className="block py-1 text-[28px] font-medium leading-tight tracking-[-0.02em] text-gray-900"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contacto/"
              tabIndex={open ? 0 : -1}
              onClick={onClose}
              className="block py-1 text-[28px] font-medium leading-tight tracking-[-0.02em] text-gray-900"
            >
              Contacto
            </Link>
          </li>
        </ul>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          className="flex items-center justify-between rounded-full bg-brand-500 py-2 pl-6 pr-2 text-[14px] font-medium text-white"
        >
          Iniciar un proyecto
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white">
            <ArrowRight className="text-brand-500" size={15} aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  );
}

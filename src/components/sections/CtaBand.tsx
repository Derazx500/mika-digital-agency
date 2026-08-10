import { waLink } from '@/lib/site';
import { TextRollButton } from '@/components/ui/TextRollButton';

/** Franja de conversión que cierra las páginas internas. */
export function CtaBand({
  title = '¿Empezamos?',
  body = 'Cuéntanos qué necesitas por WhatsApp y te respondemos con una propuesta clara, un plazo real y un precio cerrado.',
  message,
}: {
  title?: string;
  body?: string;
  /** Mensaje precargado de WhatsApp, específico de cada página. */
  message?: string;
}) {
  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-28">
      <div className="container-mika">
        <div className="rounded-2xl bg-ink px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <h2 className="h-section max-w-2xl text-white">{title}</h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.6] text-white/60 sm:text-[16px]">
            {body}
          </p>
          <div className="mt-8">
            <TextRollButton href={waLink(message)} external variant="brand">
              Escríbenos por WhatsApp
            </TextRollButton>
          </div>
        </div>
      </div>
    </section>
  );
}

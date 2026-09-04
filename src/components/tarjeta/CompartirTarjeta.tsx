'use client';

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

/**
 * Botón de compartir la tarjeta.
 *
 * Usa el menú nativo de compartir del teléfono cuando existe, que es el
 * camino corto: abre WhatsApp, correo o AirDrop con el enlace ya puesto. En
 * escritorio ese menú no suele estar, así que cae a copiar el enlace al
 * portapapeles y lo confirma en el propio botón.
 *
 * La confirmación importa: copiar al portapapeles no produce ninguna señal
 * visible por sí solo, y sin respuesta la gente vuelve a pulsar creyendo que
 * no funcionó.
 */
export function CompartirTarjeta({
  url,
  nombre,
}: {
  url: string;
  nombre: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const compartir = async () => {
    // El menú nativo puede fallar por dos motivos que no son un error real:
    // el usuario lo cierra sin elegir, o el navegador lo bloquea. En ambos
    // casos se cae a copiar en vez de dejar el botón muerto.
    if (navigator.share) {
      try {
        await navigator.share({ title: nombre, url });
        return;
      } catch {
        /* cancelado o no disponible: seguimos al portapapeles */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin permiso de portapapeles: no hay nada mejor que hacer aquí */
    }
  };

  return (
    <button
      type="button"
      onClick={compartir}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-[14px] font-medium text-gray-900 transition-colors duration-300 hover:border-gray-300 hover:bg-gray-50"
    >
      {copiado ? (
        <>
          <Check size={16} className="text-brand-500" aria-hidden="true" />
          Enlace copiado
        </>
      ) : (
        <>
          <Share2 size={16} aria-hidden="true" />
          Compartir
        </>
      )}
    </button>
  );
}

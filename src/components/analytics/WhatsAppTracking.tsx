'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/**
 * Registra en Analytics cada clic a WhatsApp.
 *
 * Es LA métrica del sitio: las visitas están bien, pero lo que dice si el
 * sitio funciona es cuánta gente acaba escribiendo. En los informes aparece
 * como el evento `contacto_whatsapp`.
 *
 * Escucha un solo clic a nivel de documento en vez de poner un manejador en
 * cada botón. Así cubre los más de 40 enlaces a WhatsApp que hay repartidos
 * por el sitio —y los que se añadan después— sin tocar ni un componente.
 */
export function WhatsAppTracking() {
  useEffect(() => {
    function alHacerClic(evento: MouseEvent) {
      const destino = evento.target as HTMLElement | null;
      const enlace = destino?.closest?.('a[href*="wa.me"]');
      if (!enlace) return;

      // Si Analytics no cargó (bloqueador de anuncios, por ejemplo), no
      // hacemos nada: el enlace sigue funcionando igual.
      if (typeof window.gtag !== 'function') return;

      window.gtag('event', 'contacto_whatsapp', {
        // Desde qué página se escribió: revela qué contenido convierte.
        pagina: window.location.pathname,
        // Texto del botón, para distinguir el flotante del CTA del hero.
        boton: enlace.textContent?.trim().slice(0, 60) ?? 'sin texto',
      });
    }

    document.addEventListener('click', alHacerClic);
    return () => document.removeEventListener('click', alHacerClic);
  }, []);

  return null;
}

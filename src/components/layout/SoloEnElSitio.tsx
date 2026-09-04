'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Rutas que se presentan solas, sin el marco del sitio. */
const SIN_MARCO = ['/tarjeta/'];

/**
 * Oculta el menú, el pie y el botón flotante en las páginas que deben verse
 * como una pieza suelta.
 *
 * Las tarjetas digitales se abren escaneando un QR en una feria o pinchando un
 * enlace en WhatsApp. Quien llega ahí no viene a recorrer el sitio: viene a
 * guardar un contacto. El menú y el pie ahí no ayudan, distraen del único
 * botón que importa.
 *
 * Se resuelve con `usePathname` y no moviendo medio proyecto a un grupo de
 * rutas porque estas páginas se generan en el build: en ese momento la ruta ya
 * se conoce, así que el HTML sale sin el marco desde el principio. No hay
 * parpadeo ni salto al hidratar.
 *
 * El hijo puede ser un componente de servidor: pasa por aquí como `children` y
 * se sigue renderizando en el servidor.
 */
export function SoloEnElSitio({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const suelta = SIN_MARCO.some((ruta) => pathname?.startsWith(ruta));

  if (suelta) return null;
  return <>{children}</>;
}

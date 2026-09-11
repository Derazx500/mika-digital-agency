'use client';

import { useSyncExternalStore } from 'react';

import { CLAVE_TEMA } from '@/lib/tema-clave';

/**
 * Estado del tema, leído directamente del DOM.
 *
 * La fuente de verdad es la clase `dark` en <html>, no una variable de React.
 * Y tiene que ser así: el tema se aplica con un script que corre antes de que
 * React exista (ver layout.tsx), para que no haya un fogonazo blanco al
 * cargar en oscuro. Si React guardara su propio estado, habría dos verdades
 * que se contradirían durante el primer render.
 *
 * `useSyncExternalStore` está hecho exactamente para esto: suscribirse a algo
 * que vive fuera de React y que React no controla.
 */

function suscribir(alCambiar: () => void) {
  const observador = new MutationObserver(alCambiar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observador.disconnect();
}

function leer(): boolean {
  return document.documentElement.classList.contains('dark');
}

/**
 * Devuelve `true` si el tema oscuro está activo, y vuelve a renderizar cuando
 * cambia. Se usa donde el color no lo puede resolver el CSS: el shader del
 * hero, que recibe sus colores como propiedades de JavaScript.
 */
export function useTemaOscuro(): boolean {
  return useSyncExternalStore(
    suscribir,
    leer,
    // En el servidor no hay DOM. Se asume claro, que es el tema por defecto;
    // si el visitante tenía oscuro, el script lo corrige antes de pintar.
    () => false,
  );
}

/** Cambia de tema y recuerda la elección. */
export function alternarTema(): void {
  const raiz = document.documentElement;
  const seraOscuro = !raiz.classList.contains('dark');

  raiz.classList.toggle('dark', seraOscuro);
  // Afecta a las barras de scroll y a los controles nativos de formulario,
  // que el navegador pinta por su cuenta y no leen nuestras variables.
  raiz.style.colorScheme = seraOscuro ? 'dark' : 'light';

  try {
    localStorage.setItem(CLAVE_TEMA, seraOscuro ? 'oscuro' : 'claro');
  } catch {
    // Modo privado o almacenamiento bloqueado: el tema funciona igual, solo
    // que no se recuerda al recargar. No es motivo para romper el botón.
  }
}

'use client';

import { useState } from 'react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';
import { clsx } from '@/lib/clsx';
import { useTemaOscuro } from '@/lib/tema';

/**
 * Fondo animado del hero.
 *
 * Es una pila de cuatro shaders WebGL: un remolino de base, un flujo de color
 * azul de marca, un vidrio estriado que lo refracta y grano de película para
 * quitarle el aspecto "digital limpio".
 *
 * Detalles importantes:
 * - Se carga con `next/dynamic` y `ssr: false` desde Hero.tsx, para que no
 *   bloquee el primer render ni el LCP.
 * - `onUnavailable` se dispara si la GPU o el navegador no pueden con WebGL.
 *   En ese caso mostramos un degradado CSS equivalente, en lugar de dejar un
 *   rectángulo transparente.
 * - `pointer-events-none` para que el fondo nunca robe clics a los botones.
 */
/*
 * Los colores del shader por tema.
 *
 * El azul de marca no cambia: es el mismo pigmento en los dos, y sobre fondo
 * oscuro además gana, porque un azul saturado brilla más cuanto menos luz
 * tiene alrededor. Lo que sí cambia es la base sobre la que fluye — de blanco
 * a un azul casi negro— para que el hero acompañe al resto de la página en
 * vez de quedarse como un rectángulo luminoso en mitad de una web oscura.
 */
const PALETA = {
  claro: { base: '#ffffff', remolino: '#eaf0f8' },
  oscuro: { base: '#0b0e13', remolino: '#141c2b' },
} as const;

export function ShaderBackground() {
  const [failed, setFailed] = useState(false);
  const oscuro = useTemaOscuro();
  const paleta = oscuro ? PALETA.oscuro : PALETA.claro;

  if (failed) {
    return <ShaderFallback />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      <Shader
        // Al cambiar de tema se rehace el shader entero en vez de reusarlo.
        // Estos componentes compilan sus colores al crearse, así que sin esto
        // el fondo se quedaba con la paleta anterior hasta recargar.
        key={oscuro ? 'oscuro' : 'claro'}
        className="h-full w-full"
        onUnavailable={() => setFailed(true)}
      >
        <Swirl colorA={paleta.base} colorB={paleta.remolino} detail={1.7} />
        <ChromaFlow
          baseColor={paleta.base}
          downColor="#0167f3"
          leftColor="#0167f3"
          rightColor="#0167f3"
          upColor="#0167f3"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  );
}

/**
 * Degradado estático que imita la paleta del shader. Se usa cuando WebGL no
 * está disponible (GPU bloqueada, navegador viejo, modo ahorro de batería) y
 * también como relleno mientras el shader se descarga.
 *
 * Los colores salen de variables CSS y no de valores fijos: así el respaldo
 * cambia de tema igual que todo lo demás, sin necesitar JavaScript. Están
 * definidas en globals.css.
 */
export function ShaderFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute inset-0 z-10 bg-respaldo-shader',
        className,
      )}
    />
  );
}

'use client';

import { useState } from 'react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';
import { clsx } from '@/lib/clsx';

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
export function ShaderBackground() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ShaderFallback />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      <Shader
        className="h-full w-full"
        onUnavailable={() => setFailed(true)}
      >
        <Swirl colorA="#ffffff" colorB="#eaf0f8" detail={1.7} />
        <ChromaFlow
          baseColor="#ffffff"
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
 * está disponible (GPU bloqueada, navegador viejo, modo ahorro de batería).
 */
export function ShaderFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none absolute inset-0 z-10', className)}
      style={{
        background:
          'radial-gradient(120% 90% at 15% 20%, rgba(1,103,243,0.16) 0%, rgba(1,103,243,0) 55%), radial-gradient(100% 80% at 85% 75%, rgba(1,103,243,0.12) 0%, rgba(255,255,255,0) 60%), linear-gradient(160deg, #ffffff 0%, #eef3fb 55%, #e6ecf6 100%)',
      }}
    />
  );
}

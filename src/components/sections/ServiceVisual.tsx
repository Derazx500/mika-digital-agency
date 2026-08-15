/**
 * Ilustración de cabecera de cada landing de servicio.
 *
 * Son SVG dibujados a mano, no fotos, por tres razones:
 * pesan unos pocos KB frente a los cientos de una foto —y la velocidad es
 * factor de posicionamiento—, se ven nítidos en cualquier pantalla, y usan
 * el azul de la marca en vez de una foto de stock que podría estar también
 * en la web de la competencia.
 *
 * Cada composición representa lo que hace el servicio, no un adorno
 * genérico. Comparten paleta y trazo con los gráficos del blog para que
 * todo el sitio se lea como una sola pieza.
 *
 * Si algún día hay fotos reales de un servicio, basta con sustituir el caso
 * correspondiente por una etiqueta <img>.
 */

const AZUL = '#0167f3';
const TINTA = '#0a0a0a';

/** Envoltorio común: proporción, fondo y borde redondeado iguales en todas. */
function Lienzo({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 800 450"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
    >
      <rect width="800" height="450" fill="#f2f6fc" />
      {children}
    </svg>
  );
}

function TiendaEnLinea() {
  return (
    <Lienzo>
      {/* Retícula de productos */}
      {[0, 1, 2].map((columna) =>
        [0, 1].map((fila) => (
          <g key={`${columna}-${fila}`}>
            <rect
              x={70 + columna * 160}
              y={80 + fila * 160}
              width={130}
              height={130}
              rx="14"
              fill="#fff"
              stroke="#dde6f5"
              strokeWidth="2"
            />
            <rect
              x={88 + columna * 160}
              y={98 + fila * 160}
              width={94}
              height={62}
              rx="8"
              fill={AZUL}
              opacity={0.12 + columna * 0.14}
            />
            <rect x={88 + columna * 160} y={172 + fila * 160} width={62} height={8} rx="4" fill="#c8d6ec" />
            <rect x={88 + columna * 160} y={188 + fila * 160} width={38} height={8} rx="4" fill="#dde6f5" />
          </g>
        )),
      )}
      {/* Carrito */}
      <circle cx="640" cy="220" r="96" fill={AZUL} opacity="0.08" />
      <g transform="translate(590 172)" fill="none" stroke={AZUL} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16l14 54h48l14-38H30" />
        <circle cx="42" cy="80" r="8" fill={AZUL} stroke="none" />
        <circle cx="82" cy="80" r="8" fill={AZUL} stroke="none" />
      </g>
      {/* Insignia de compra */}
      <rect x="596" y="290" width="128" height="40" rx="20" fill={AZUL} />
      <rect x="620" y="306" width="80" height="8" rx="4" fill="#fff" opacity="0.9" />
    </Lienzo>
  );
}

function DesarrolloSoftware() {
  return (
    <Lienzo>
      {/* Ventana de código */}
      <rect x="60" y="70" width="420" height="310" rx="16" fill={TINTA} />
      <circle cx="92" cy="102" r="7" fill="#ff5f57" />
      <circle cx="116" cy="102" r="7" fill="#febc2e" />
      <circle cx="140" cy="102" r="7" fill="#28c840" />
      {[
        [90, 150, 150], [130, 150, 220], [130, 190, 110], [130, 230, 170],
        [90, 270, 200], [130, 310, 130], [90, 340, 90],
      ].map(([x, y, w], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height="12"
          rx="6"
          fill={i % 3 === 0 ? AZUL : '#ffffff'}
          opacity={i % 3 === 0 ? 0.9 : 0.22}
        />
      ))}
      {/* Nodos conectados: las integraciones */}
      <g stroke={AZUL} strokeWidth="3" opacity="0.5" fill="none">
        <path d="M540 150 L640 110" />
        <path d="M540 225 L660 225" />
        <path d="M540 300 L640 340" />
      </g>
      <circle cx="530" cy="225" r="30" fill={AZUL} />
      <circle cx="660" cy="110" r="22" fill="#fff" stroke={AZUL} strokeWidth="4" />
      <circle cx="682" cy="225" r="22" fill="#fff" stroke={AZUL} strokeWidth="4" />
      <circle cx="660" cy="340" r="22" fill="#fff" stroke={AZUL} strokeWidth="4" />
    </Lienzo>
  );
}

function ProduccionVideo() {
  return (
    <Lienzo>
      {/* Marco de reproducción */}
      <rect x="90" y="70" width="500" height="282" rx="16" fill={TINTA} />
      <circle cx="340" cy="211" r="54" fill="#fff" opacity="0.95" />
      <path d="M324 185 L372 211 L324 237 Z" fill={AZUL} />
      {/* Línea de tiempo */}
      <rect x="90" y="378" width="500" height="14" rx="7" fill="#dde6f5" />
      <rect x="90" y="378" width="290" height="14" rx="7" fill={AZUL} />
      <circle cx="380" cy="385" r="13" fill={AZUL} stroke="#fff" strokeWidth="4" />
      {/* Fotogramas laterales */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="628"
          y={70 + i * 100}
          width="112"
          height="82"
          rx="10"
          fill="#fff"
          stroke="#dde6f5"
          strokeWidth="2"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`f${i}`} x="644" y={86 + i * 100} width="80" height="50" rx="6" fill={AZUL} opacity={0.4 - i * 0.1} />
      ))}
    </Lienzo>
  );
}

function ProduccionPodcast() {
  return (
    <Lienzo>
      {/* Micrófono */}
      <circle cx="220" cy="200" r="110" fill={AZUL} opacity="0.08" />
      <rect x="188" y="118" width="64" height="112" rx="32" fill={TINTA} />
      <rect x="204" y="140" width="32" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <rect x="204" y="158" width="32" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <rect x="204" y="176" width="32" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <path d="M156 214a64 64 0 0 0 128 0" fill="none" stroke={TINTA} strokeWidth="10" strokeLinecap="round" />
      <rect x="212" y="278" width="16" height="46" rx="8" fill={TINTA} />
      <rect x="176" y="318" width="88" height="14" rx="7" fill={TINTA} />
      {/* Onda de audio */}
      {[52, 88, 130, 170, 148, 96, 132, 176, 120, 74, 110, 154, 88, 46].map((alto, i) => (
        <rect
          key={i}
          x={396 + i * 28}
          y={225 - alto / 2}
          width="13"
          height={alto}
          rx="6.5"
          fill={AZUL}
          opacity={0.35 + (i % 4) * 0.2}
        />
      ))}
    </Lienzo>
  );
}

function Fotografia() {
  return (
    <Lienzo>
      {/* Cuerpo de cámara */}
      <rect x="150" y="120" width="380" height="250" rx="24" fill={TINTA} />
      <rect x="250" y="94" width="120" height="34" rx="12" fill={TINTA} />
      {/* Objetivo */}
      <circle cx="340" cy="245" r="92" fill="#1c1c1c" />
      <circle cx="340" cy="245" r="72" fill={AZUL} opacity="0.22" />
      <circle cx="340" cy="245" r="50" fill={AZUL} opacity="0.5" />
      <circle cx="340" cy="245" r="26" fill="#fff" opacity="0.9" />
      <circle cx="322" cy="228" r="9" fill="#fff" />
      <circle cx="492" cy="158" r="12" fill={AZUL} />
      {/* Fotos resultantes */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${586} ${104 + i * 92}) rotate(${i % 2 === 0 ? -4 : 4} 60 40)`}>
          <rect width="128" height="80" rx="10" fill="#fff" stroke="#dde6f5" strokeWidth="2" />
          <rect x="10" y="10" width="108" height="46" rx="6" fill={AZUL} opacity={0.45 - i * 0.12} />
          <rect x="10" y="64" width="52" height="7" rx="3.5" fill="#dde6f5" />
        </g>
      ))}
    </Lienzo>
  );
}

function SocialMedia() {
  return (
    <Lienzo>
      {/* Publicación */}
      <rect x="90" y="66" width="300" height="320" rx="20" fill="#fff" stroke="#dde6f5" strokeWidth="2" />
      <circle cx="130" cy="106" r="20" fill={AZUL} opacity="0.25" />
      <rect x="162" y="96" width="110" height="10" rx="5" fill="#c8d6ec" />
      <rect x="162" y="114" width="70" height="8" rx="4" fill="#dde6f5" />
      <rect x="112" y="146" width="256" height="150" rx="12" fill={AZUL} opacity="0.16" />
      <g fill={AZUL}>
        <path d="M126 330a12 12 0 0 1 20-9 12 12 0 0 1 20 9c0 10-20 22-20 22s-20-12-20-22Z" />
      </g>
      <rect x="180" y="336" width="60" height="9" rx="4.5" fill="#dde6f5" />
      <rect x="112" y="360" width="150" height="8" rx="4" fill="#e8eef8" />
      {/* Métricas subiendo */}
      <g stroke={AZUL} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M450 320 L530 250 L590 288 L710 150" />
      </g>
      <circle cx="710" cy="150" r="13" fill={AZUL} />
      {[[450, 340, 44], [520, 340, 74], [590, 340, 104], [660, 340, 140]].map(([x, y, alto], i) => (
        <rect key={i} x={x - 18} y={y - alto + 40} width="38" height={alto} rx="8" fill={AZUL} opacity={0.14 + i * 0.09} />
      ))}
    </Lienzo>
  );
}

function TarjetasNfc() {
  return (
    <Lienzo>
      {/* Tarjeta */}
      <g transform="rotate(-8 300 230)">
        <rect x="120" y="140" width="330" height="200" rx="20" fill={TINTA} />
        <rect x="152" y="176" width="92" height="12" rx="6" fill="#fff" opacity="0.85" />
        <rect x="152" y="200" width="140" height="9" rx="4.5" fill="#fff" opacity="0.35" />
        <rect x="152" y="286" width="110" height="9" rx="4.5" fill={AZUL} />
        {/* Chip */}
        <rect x="352" y="176" width="58" height="44" rx="8" fill={AZUL} opacity="0.9" />
        <g stroke="#0a0a0a" strokeWidth="3" opacity="0.5">
          <path d="M352 190h58M352 206h58M375 176v44M389 176v44" />
        </g>
      </g>
      {/* Ondas NFC */}
      <g fill="none" stroke={AZUL} strokeWidth="8" strokeLinecap="round">
        <path d="M508 190a70 70 0 0 1 0 100" opacity="0.9" />
        <path d="M546 162a118 118 0 0 1 0 156" opacity="0.55" />
        <path d="M584 134a166 166 0 0 1 0 212" opacity="0.25" />
      </g>
      {/* Teléfono */}
      <rect x="628" y="128" width="112" height="200" rx="20" fill="#fff" stroke={TINTA} strokeWidth="6" />
      <rect x="664" y="140" width="40" height="7" rx="3.5" fill={TINTA} opacity="0.35" />
      <circle cx="684" cy="196" r="24" fill={AZUL} opacity="0.2" />
      <rect x="650" y="238" width="68" height="9" rx="4.5" fill="#dde6f5" />
      <rect x="650" y="258" width="46" height="9" rx="4.5" fill="#e8eef8" />
      <rect x="650" y="288" width="68" height="24" rx="12" fill={AZUL} />
    </Lienzo>
  );
}

const COMPOSICIONES: Record<string, () => React.JSX.Element> = {
  'tienda-en-linea': TiendaEnLinea,
  'desarrollo-de-software': DesarrolloSoftware,
  'produccion-de-video': ProduccionVideo,
  'produccion-de-podcast': ProduccionPodcast,
  'fotografia-profesional': Fotografia,
  'social-media': SocialMedia,
  'tarjetas-digitales-nfc': TarjetasNfc,
};

/**
 * Devuelve la ilustración del servicio, o nada si ese servicio todavía no
 * tiene una. Las landings que no la tengan simplemente no muestran cabecera
 * gráfica, sin romperse.
 */
export function ServiceVisual({ slug }: { slug: string }) {
  const Composicion = COMPOSICIONES[slug];
  if (!Composicion) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200">
      <div className="aspect-[16/9]">
        <Composicion />
      </div>
    </div>
  );
}

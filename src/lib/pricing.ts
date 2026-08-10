/**
 * Paquetes y precios "desde".
 *
 * AJUSTA ESTAS CIFRAS antes de publicar: son una estructura de referencia
 * basada en el mercado mexicano de agencias, no en tus costos reales. Lo que
 * importa que se mantenga es el formato "desde $X" — filtra a quien no tiene
 * presupuesto sin cerrarte la puerta a cotizar cada proyecto.
 *
 * Además, "cuánto cuesta una página web en México" es una de las búsquedas con
 * más intención de compra del sector: publicar rangos te posiciona en ella.
 */

export type Plan = {
  name: string;
  /** A quién le sirve. Ayuda al visitante a auto-clasificarse. */
  audience: string;
  priceFrom: number;
  /** Unidad: proyecto único o mensualidad. */
  unit: 'proyecto' | 'mes';
  timeline: string;
  features: string[];
  /** Resalta visualmente el plan que más quieres vender. */
  highlighted?: boolean;
};

export const WEB_PLANS: Plan[] = [
  {
    name: 'Landing Page',
    audience:
      'Para campañas, lanzamientos o validar una idea antes de invertir más.',
    priceFrom: 9500,
    unit: 'proyecto',
    timeline: '1 a 2 semanas',
    features: [
      'Una página de alto impacto',
      'Diseño a la medida (sin plantillas)',
      'Optimizada para convertir',
      'Formulario y botón de WhatsApp',
      'SEO básico y Analytics',
      'Responsiva en todos los dispositivos',
    ],
  },
  {
    name: 'Sitio Corporativo',
    audience:
      'Para empresas que necesitan presencia sólida y aparecer en Google.',
    priceFrom: 18000,
    unit: 'proyecto',
    timeline: '3 a 5 semanas',
    features: [
      'Hasta 8 páginas internas',
      'Diseño UX/UI a la medida',
      'Blog administrable',
      'SEO técnico completo',
      'Datos estructurados y sitemap',
      'Panel para editar tu contenido',
      'Capacitación en video',
      '30 días de soporte incluidos',
    ],
    highlighted: true,
  },
  {
    name: 'Tienda en Línea',
    audience: 'Para vender en línea con catálogo, pagos y envíos.',
    priceFrom: 35000,
    unit: 'proyecto',
    timeline: '5 a 8 semanas',
    features: [
      'Catálogo y carrito completos',
      'Pasarela de pago y envíos',
      'Gestión de inventario',
      'Cupones y promociones',
      'SEO para fichas de producto',
      'Capacitación para tu equipo',
      '30 días de soporte incluidos',
    ],
  },
];

export const RETAINER_PLANS: Plan[] = [
  {
    name: 'SEO Esencial',
    audience: 'Para negocios locales que quieren aparecer en su ciudad.',
    priceFrom: 8500,
    unit: 'mes',
    timeline: 'Mínimo 4 meses',
    features: [
      'Auditoría técnica inicial',
      'Optimización on-page continua',
      'Google Business Profile',
      'SEO local y citas',
      '2 contenidos al mes',
      'Reporte mensual de posiciones',
    ],
  },
  {
    name: 'SEO Crecimiento',
    audience: 'Para marcas que compiten a nivel nacional.',
    priceFrom: 16500,
    unit: 'mes',
    timeline: 'Mínimo 6 meses',
    features: [
      'Todo lo de SEO Esencial',
      'Estrategia de contenidos ampliada',
      '4 contenidos al mes',
      'Construcción de enlaces',
      'Optimización de conversión',
      'Junta mensual de estrategia',
    ],
    highlighted: true,
  },
];

export const BRANDING_PLANS: Plan[] = [
  {
    name: 'Logotipo',
    audience: 'Para quien arranca y necesita una marca bien resuelta.',
    priceFrom: 12000,
    unit: 'proyecto',
    timeline: '2 a 3 semanas',
    features: [
      '3 propuestas de logotipo',
      '3 rondas de ajuste',
      'Paleta de color y tipografías',
      'Manual básico en PDF',
      'Archivos en todos los formatos',
      'Cesión total de derechos',
    ],
  },
  {
    name: 'Identidad Completa',
    audience: 'Para marcas que quieren un sistema visual sólido y coherente.',
    priceFrom: 28000,
    unit: 'proyecto',
    timeline: '4 a 6 semanas',
    features: [
      'Todo lo del paquete Logotipo',
      'Diagnóstico y territorio de marca',
      'Sistema visual completo',
      'Papelería corporativa',
      'Plantillas para redes sociales',
      'Manual de identidad extendido',
    ],
    highlighted: true,
  },
];

/** Formatea un precio en pesos mexicanos, sin decimales. */
export function mxn(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value);
}

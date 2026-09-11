import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  /*
   * El tema oscuro se activa con la clase `dark` en <html>, no con la
   * preferencia del sistema.
   *
   * Es lo que permite que el botón del menú mande: quien tiene el sistema en
   * oscuro pero quiere ver el sitio en claro puede hacerlo, y su elección se
   * recuerda. La preferencia del sistema se sigue respetando, pero solo como
   * valor de partida la primera vez (ver el script de layout.tsx).
   */
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Azul de marca Mika, tomado del CSS del sitio actual (--blue-logo).
        brand: {
          50: '#eaf2ff',
          100: '#d5e5ff',
          200: '#abcaff',
          300: '#7aabff',
          400: '#3f88fb',
          500: '#0167f3',
          600: '#0053c9',
          700: '#00419d',
          800: '#003076',
          900: '#00214f',
        },
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#171717',
        },

        /*
         * Colores semánticos del tema.
         *
         * Cada uno apunta a una variable CSS que cambia de valor con la clase
         * `dark` (ver globals.css). Se nombran por su papel —superficie,
         * texto, borde— y no por su color, porque en oscuro "blanco" ya no es
         * blanco: lo que se mantiene es la jerarquía, no el tono.
         *
         * El azul de marca y los grises de Tailwind siguen existiendo para
         * donde el color sí es literal: un botón azul es azul en los dos
         * temas.
         */
        superficie: {
          // Fondo base de páginas y tarjetas. Antes: bg-white.
          DEFAULT: 'var(--superficie)',
          // Secciones que alternan para marcar ritmo. Antes: bg-[#F5F5F5].
          alt: 'var(--superficie-alt)',
          // Rellenos suaves: etiquetas, huecos de imagen. Antes: bg-gray-100.
          sutil: 'var(--superficie-sutil)',
          // Paneles oscuros: pie y franjas de CTA. Antes: bg-ink.
          panel: 'var(--superficie-panel)',
          /*
           * El hover de los botones oscuros. Tiene que ser un token y no
           * `ink-soft`: en el tema oscuro el panel ya es claro, así que el
           * hover fijo lo oscurecía y el botón se apagaba al pasar el ratón,
           * justo al revés de lo que debe hacer.
           */
          'panel-hover': 'var(--superficie-panel-hover)',
        },
        texto: {
          // Titulares y texto fuerte. Antes: text-gray-900.
          DEFAULT: 'var(--texto)',
          // Cuerpo de texto. Antes: text-gray-600 / text-gray-700.
          suave: 'var(--texto-suave)',
          // Metadatos y apoyos. Antes: text-gray-500 / text-gray-400.
          tenue: 'var(--texto-tenue)',
        },
        // Separadores y contornos. Antes: border-gray-200 / 100 / 300.
        borde: {
          DEFAULT: 'var(--borde)',
          fuerte: 'var(--borde-fuerte)',
        },
        /*
         * El gris sobre el que se pinta el shader: el hero y el fondo de las
         * tarjetas digitales. Va aparte de `superficie` porque no es una
         * superficie de contenido, es el lienzo que queda detrás del efecto.
         */
        lienzo: 'var(--lienzo)',

        /*
         * Fondos teñidos de color: las pastillas de categoría, los iconos en
         * círculo y las cajas destacadas del blog.
         *
         * Son el caso más traicionero del tema oscuro. Un `bg-brand-50` es un
         * azul casi blanco: sobre página blanca apenas se nota, pero sobre una
         * página oscura se convierte en un recuadro luminoso con el texto
         * claro encima, es decir, ilegible. En oscuro pasan a ser el mismo
         * azul pero translúcido, que tiñe sin iluminar.
         */
        acento: {
          DEFAULT: 'var(--acento)',
          borde: 'var(--acento-borde)',
          texto: 'var(--acento-texto)',
        },
        aviso: {
          DEFAULT: 'var(--aviso)',
          borde: 'var(--aviso-borde)',
          texto: 'var(--aviso-texto)',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        // La curva que usan todas las animaciones del sitio.
        roll: 'cubic-bezier(0.25,0.1,0.25,1)',
        sheet: 'cubic-bezier(0.32,0.72,0,1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.25,0.1,0.25,1) both',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
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

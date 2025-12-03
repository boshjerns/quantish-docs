import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quantish: {
          blue: '#4F6EF7',
          'blue-hover': '#3D5BD9',
          green: '#22C55E',
          red: '#EF4444',
          coral: '#F87171',
          black: '#0A0A0A',
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'isometric-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 L50 25 L100 50 L50 75 Z' fill='none' stroke='%23E5E5E5' stroke-width='0.5'/%3E%3Cpath d='M50 25 L50 0 M50 75 L50 100 M0 50 L25 37.5 M100 50 L75 37.5' fill='none' stroke='%23E5E5E5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
};

export default config;


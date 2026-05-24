import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#f7f7f7',
          100: '#ececec',
          200: '#d1d1d1',
          300: '#aaaaaa',
          400: '#7f7f7f',
          500: '#4a4a4a',
          600: '#343434',
          700: '#262626',
          800: '#171717',
          900: '#0f0f0f',
          950: '#050505'
        }
      },
      boxShadow: {
        soft: '0 22px 60px rgba(0, 0, 0, 0.34)'
      },
      backgroundImage: {
        'mesh-dark': 'radial-gradient(circle at top left, rgba(91, 125, 255, 0.14), transparent 30%), radial-gradient(circle at top right, rgba(15, 34, 72, 0.75), transparent 25%), linear-gradient(180deg, #07101f 0%, #030712 60%, #02050c 100%)'
      }
    }
  },
  plugins: []
};

export default config;
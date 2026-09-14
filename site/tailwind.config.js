/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0b0a09',
          900: '#11100E',
          850: '#15130F',
          800: '#1B1916',
          700: '#25221D',
          600: '#3a352d',
          500: '#5b544a',
          400: '#7c7468',
          300: '#a39a8b',
          200: '#c8c0b1',
          100: '#e7e1d3',
          50: '#F7F4ED',
        },
        amber: {
          50: '#fdf3e7',
          100: '#f7d9b1',
          200: '#eebd7c',
          300: '#df9a4d',
          400: '#D67829',
          500: '#b85c1c',
          600: '#A14A14',
          700: '#7a350f',
          800: '#55240a',
          900: '#331705',
        },
        accent: {
          DEFAULT: '#D67829',
          soft: 'rgba(214, 120, 41, 0.12)',
          line: 'rgba(214, 120, 41, 0.28)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Instrument Serif',
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.035em',
        tight: '-0.022em',
        wide: '0.06em',
        wider: '0.12em',
        widest: '0.22em',
      },
      fontSize: {
        'display-xl': ['clamp(3.25rem, 7vw, 6.5rem)', { lineHeight: '0.96', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'eyebrow': ['0.72rem', { lineHeight: '1.4', letterSpacing: '0.22em' }],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 0.9s ease-out both',
        'marquee': 'marquee 60s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'orbit': 'orbit 22s linear infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow-amber': '0 0 60px -10px rgba(214, 120, 41, 0.35)',
        'card': '0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.6)',
        'soft': '0 12px 40px -20px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06  0 0 0 0 0.06  0 0 0 0 0.05  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};
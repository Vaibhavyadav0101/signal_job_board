import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1320px' } },
    extend: {
      colors: {
        canvas: 'hsl(var(--base))',
        surface: 'hsl(var(--surface))',
        'surface-2': 'hsl(var(--surface-2))',
        ink: 'hsl(var(--ink))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
        signal: {
          DEFAULT: 'hsl(var(--signal))',
          foreground: 'hsl(var(--signal-foreground))',
        },
        pulse: {
          DEFAULT: 'hsl(var(--pulse))',
          foreground: 'hsl(var(--pulse-foreground))',
        },
        amber: 'hsl(var(--amber))',
        danger: 'hsl(var(--danger))',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        'signal-rise': {
          '0%': { transform: 'scaleY(0.2)', opacity: '0.4' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'signal-rise': 'signal-rise 0.6s cubic-bezier(.2,.8,.2,1) both',
        'fade-up': 'fade-up 0.5s cubic-bezier(.2,.8,.2,1) both',
        shimmer: 'shimmer 1.6s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;

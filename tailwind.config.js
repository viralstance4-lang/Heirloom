/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#5a2e3b', light: '#7a3e50', dark: '#3d1f28' },
        gold:    { DEFAULT: '#c9a84c', light: '#e0c878', dark: '#a8893c' },
        cream:   { DEFAULT: '#faf7f2', dark: '#f0ebe0', deeper: '#e8e0d0' },
        luxury:  { DEFAULT: '#1c1c1c', soft: '#2d2d2d', muted: '#6b6b6b' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        serif:   ['"Playfair Display"',   'serif'],
        sans:    ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.25em',
        ultra:  '0.4em',
      },
      boxShadow: {
        luxury: '0 8px 40px -8px rgba(90,46,59,0.15)',
        gold:   '0 4px 20px -4px rgba(201,168,76,0.35)',
        card:   '0 2px 20px rgba(0,0,0,0.08)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25,0.46,0.45,0.94)',
      },
      animation: {
        'marquee':           'marquee 30s linear infinite',
        'fade-in-up':        'fadeInUp 0.8s ease forwards',
        'fade-in':           'fadeIn 0.6s ease forwards',
        'shimmer':           'shimmer 2s linear infinite',
        'scroll-down':       'scrollDown 1.5s ease-in-out infinite',
        'float':             'float 3s ease-in-out infinite',
        'banner-progress':   'bannerProgress linear 1 forwards',
      },
      keyframes: {
        bannerProgress: {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':      { transform: 'translateY(8px)', opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#1c1b19',
          100: '#2a2823',
          200: '#3d3a33',
          300: '#5c5849',
          400: '#8a8576',
          500: '#a8a394',
          600: '#c4c0b3',
          700: '#d8d4c8',
          800: '#ebe7dc',
          900: '#f4f1e8',
          950: '#f9f6f0',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0cc',
          200: '#f4df95',
          300: '#eec85d',
          400: '#e9b236',
          500: '#d9961f',
          600: '#bc7516',
          700: '#965516',
          800: '#7b431a',
          900: '#68391b',
          950: '#3c1e0c',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 0 1px rgba(217,150,31,0.25), 0 20px 40px -20px rgba(217,150,31,0.35)',
        'soft': '0 2px 12px -2px rgba(28,27,25,0.08)',
        'card': '0 4px 24px -4px rgba(28,27,25,0.10)',
      },
    },
  },
  plugins: [],
};

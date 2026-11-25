/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Luxury Lite Theme Color System
        paper: {
          DEFAULT: '#FFFFFF',
          50: '#FDFBF7',
          100: '#F8F5F0',
          200: '#F2ECE4',
          300: '#E6DED4',
          400: '#D5C9BC',
        },
        ink: {
          950: '#141210',
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
          600: '#57534E',
          500: '#78716C',
          400: '#A8A29E',
          300: '#D6D3D1',
          200: '#E7E5E4',
          100: '#F5F5F4',
        },
        gold: {
          50: '#FDFCF7',
          100: '#FBF6E9',
          200: '#F5E8C8',
          300: '#EBD49F',
          400: '#DEBD6F',
          500: '#C59B46',
          600: '#A97E33',
          700: '#8A6224',
          800: '#6B4A19',
          900: '#4E340F',
        },
        champagne: '#EEDCBA',
        cream: '#FAF6EE',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'aurora': 'aurora 15s ease infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'lux-sm': '0 2px 8px -2px rgba(28, 25, 23, 0.05), 0 1px 4px -1px rgba(197, 155, 70, 0.08)',
        'lux': '0 10px 25px -5px rgba(28, 25, 23, 0.06), 0 8px 10px -6px rgba(197, 155, 70, 0.06)',
        'lux-lg': '0 20px 40px -10px rgba(28, 25, 23, 0.08), 0 12px 18px -6px rgba(197, 155, 70, 0.1)',
      }
    },
  },
  plugins: [],
}

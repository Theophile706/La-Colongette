/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8F1',
          100: '#F5EDD9',
          200: '#EAD9AF',
          300: '#DDC482',
          400: '#D2B36A',
          500: '#F1C40F', // primary gold
          600: '#B8984F',
          700: '#96793D',
          800: '#725B2E',
          900: '#4D3D1F',
        },
        cream: '#F5F5F0',
        charcoal: '#2C2C2C',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F1C40F 0%, #B8984F 100%)',
      },
      boxShadow: {
        'soft-lg': '0 20px 60px -10px rgba(0,0,0,0.25)',
        card: '0 8px 30px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

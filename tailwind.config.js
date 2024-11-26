/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['"Press Start 2P"', 'system-ui', '-apple-system', 'sans-serif'],
    },
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        faint: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' },
        },
        'damage-glow': {
          '0%': { filter: 'brightness(1)', transform: 'scale(1)' },
          '50%': { filter: 'brightness(1.5) sepia(1) hue-rotate(-20deg)', transform: 'scale(1.05)' },
          '100%': { filter: 'brightness(1)', transform: 'scale(1)' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(100px)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-left': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'shake': 'shake 0.3s ease-in-out',
        'faint': 'faint 0.5s ease-in-out forwards',
        'damage-glow': 'damage-glow 0.5s ease-in-out',
        'slide-right': 'slide-right 0.8s ease-in-out',
        'slide-left': 'slide-left 0.8s ease-in-out'
      }
    }
  },
  plugins: [],
}

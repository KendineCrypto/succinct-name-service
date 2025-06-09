/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4C9B',
          light: '#FFC9E3',
        },
        accent: '#C8FF52',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #FF4C9B, #FFC9E3)',
      },
      animation: {
        'mint-glow': 'mintGlow 2s infinite ease-in-out',
        glow: 'glowPulse 2s infinite',
      },
      keyframes: {
        mintGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(236, 72, 153, 1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #ec4899' },
          '50%': { boxShadow: '0 0 20px #ec4899' },
        },
      },
    },
  },
  plugins: [],
} 
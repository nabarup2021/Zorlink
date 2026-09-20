/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        azelia: {
          bg: '#0e0c15',
          card: '#161324',
          cardHover: '#1c1830',
          surface: '#221d3b',
          border: 'rgba(255, 255, 255, 0.06)',
          accent: '#7F00FF',
          accentLight: '#9B4DFF',
          accentGlow: 'rgba(127, 0, 255, 0.30)',
          gold: '#FFE279',
          muted: '#8e8a9f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

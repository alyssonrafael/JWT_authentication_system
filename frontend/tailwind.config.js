/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaria': '#348E91',
        'secundaria': '#1C5052',
        'terciaria': '#0F2A2B',
        'textow': '#F2F2F2',
        'textod': '#0A0C0D'
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


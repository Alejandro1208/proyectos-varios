/** @type {import('tailwindcss').Config} */
export default {
  // Habilita el modo oscuro basado en una clase en el HTML
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
}
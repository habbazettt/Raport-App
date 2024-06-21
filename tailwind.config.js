/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0C629E',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'times': ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
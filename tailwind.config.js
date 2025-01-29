/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        honk: ['Honk', 'cursive'],
      },
      colors: {
        brand: {
          beige: '#bcabae',
          dark: '#2f2f2f',
          primary: '#ffd23f',
          secondary: '#74a57f',
        },
      },
    },
  },
  plugins: [],
}
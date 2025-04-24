/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        secondary: '#253858',
        background: '#F4F5F7',
        surface: '#FFFFFF',
      }
    },
  },
  plugins: [],
}
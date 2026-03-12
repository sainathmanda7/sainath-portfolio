/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a', // Deep black for the premium dark mode
        primary: '#3b82f6', // A vibrant, tech-focused blue
        accent: '#8b5cf6', // Deep purple for stunning gradients
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
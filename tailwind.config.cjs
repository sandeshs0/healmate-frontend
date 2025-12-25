/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E335F", // Deep Indigo
          dark: "#1e2440",
          light: "#4a500",
        },
        secondary: "#9B6FA6", // Muted Violet
        accent: "#5FA6A0", // Calm Teal
        background: "#FFFFFF", // Soft White
        text: "#1F937", // Charcoal
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
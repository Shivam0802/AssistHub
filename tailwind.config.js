/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "comfortaa": ["Tenali Ramakrishna", "sans-serif"]
      },
      fontWeight: {
        "light": 300,
        "normal": 500,
        "medium": 600,
        "semibold": 700,
      },
    },
  },
  plugins: [],
}
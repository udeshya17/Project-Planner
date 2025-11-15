/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f6ff",
          100: "#e4e7ff",
          200: "#c2c5ff",
          300: "#9fa0ff",
          400: "#7c7bff",
          500: "#5c5aff",
          600: "#4643db",
          700: "#3432aa",
          800: "#232277",
          900: "#151446",
        },
      },
    },
  },
  plugins: [],
};

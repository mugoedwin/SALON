/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        rose: {
          50: "#FBF3F2",
          100: "#F7DDE4",
          200: "#F3B4C4",
          300: "#EE85A0",
          400: "#E9517B",
          500: "#E11D48",
          600: "#4A0E17",
          700: "#E11D48",
          800: "#BE123C",
          900: "#881337",
        },
        maroon: {
          deep: "#30070C",
          dark: "#4A0E17",
        },
        gold: {
          light: "#E6C387",
          muted: "#C5A46E",
        },
        cashmere: "#FBF9F6",
      },
    },
  },
  plugins: [],
};

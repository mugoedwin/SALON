/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

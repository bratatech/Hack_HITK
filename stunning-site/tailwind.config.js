/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9FF5DE",   // Mint
        secondary: "#CAEBFF", // Pale Sky
        accent: "#FFE7E7",    // Blush
        navy: "#0E4981",      // Deep Navy
        ivory: "#FDFAEC",     // Warm Ivory
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
        glowMint: "0 0 20px rgba(159, 245, 222, 0.6)",
      },
    },
  },
  plugins: [],
};

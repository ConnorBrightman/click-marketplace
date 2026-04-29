import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#eceef6",
          100: "#c5cadf",
          400: "#2c3575",
          500: "#19215b",
          600: "#141a47",
          700: "#0f1335",
          800: "#090d22",
          900: "#040611",
        },
        // ClickMarket brand — buyer-facing accent
        teal: {
          50:  "#f0f4ff",
          100: "#dde5f7",
          200: "#b8c8ee",
          300: "#7a9ad4",
          400: "#3b5fad",
          500: "#1e3a8a",
          600: "#182f72",
          700: "#12245a",
        },
        // ClickDealer brand — dealer-facing accent only
        dealer: {
          50:  "#fff4ee",
          100: "#fddcc8",
          200: "#fbbf96",
          300: "#f89e63",
          400: "#e0620e",
          500: "#c95810",
          600: "#a84610",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

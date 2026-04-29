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
          50:  "#f0fdf9",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
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

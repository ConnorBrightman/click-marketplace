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
          50: "#e8edf3",
          100: "#c5d0df",
          500: "#0A2540",
          600: "#081e33",
          700: "#061626",
          800: "#040f1a",
          900: "#02080d",
        },
        teal: {
          400: "#00D4AA",
          500: "#00bc97",
          600: "#00a484",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

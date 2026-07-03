import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF9E6",
          200: "#F0D78C",
          400: "#D4AF37",
          500: "#C9A84C",
          600: "#B8960C",
        },
      },
    },
  },
  plugins: [],
};
export default config;

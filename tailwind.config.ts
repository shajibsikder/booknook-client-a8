import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#c2a396',
          600: '#b08b7d',
          700: '#946d5f',
          800: '#7a574b',
          900: '#64473d',
        },
        brand: {
          amber: '#d97706',
          clay: '#c2410c',
          navy: '#0f172a',
          slate: '#334155',
          sand: '#fbfaf8',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;

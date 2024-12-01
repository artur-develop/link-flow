import type { Config } from "tailwindcss";

const darkGray = "#f3f3f3"
const lightGray = "#F7F8F9FF"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'pl-4', 'pl-8', 'pl-12', 'pl-16',
    'pl-20', 'pl-24', 'pl-28',
    'pl-32', 'pl-36', 'pl-40'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkGray: darkGray,
        lightGray: lightGray,
      },
    },
  },
  plugins: [],
} satisfies Config;

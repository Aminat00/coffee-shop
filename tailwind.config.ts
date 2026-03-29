import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#334fb4",
          dark: "#1a2a6c",
          deeper: "#0f1b4d",
          light: "#4a6ad4",
          pale: "#e8ecf7",
        },
        cream: "#faf8f5",
        "warm-white": "#fefdfb",
        "warm-gray": "#f5f3f0",
        "text-dark": "#1a1a2e",
        "text-mid": "#555566",
        "text-light": "#888899",
        gold: {
          DEFAULT: "#c4a265",
          light: "#e8d5b0",
        },
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        logo: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
      },
    },
  },
  plugins: [],
};
export default config;

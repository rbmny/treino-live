import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Dynamic gradients from src/lib/data.ts (live + VOD cards)
    { pattern: /^(from|via|to)-(rose|orange|amber|violet|fuchsia|pink|sky|indigo|red|emerald|teal|cyan|blue|lime|green|purple)-(400|500|600|700|800)$/ },
    { pattern: /^bg-gradient-to-(br|t|b|r)$/ },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      maxWidth: {
        md: "430px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;

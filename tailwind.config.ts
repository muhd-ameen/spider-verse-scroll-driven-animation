import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#f4f1e9",
        spider: "#e5121f",
        electric: "#1b3cff",
        web: "#f5d90a",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        brutal: "6px 6px 0 0 #0a0a0a",
        "brutal-sm": "4px 4px 0 0 #0a0a0a",
        "brutal-lg": "10px 10px 0 0 #0a0a0a",
      },
    },
  },
  plugins: [],
};

export default config;

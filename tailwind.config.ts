import type { Config } from "tailwindcss";

/**
 * Every colour resolves through a CSS variable so MultiverseShift can retint
 * the entire page by writing five custom properties on :root. The
 * `<alpha-value>` placeholder keeps Tailwind's opacity modifiers (text-paper/70)
 * working against the variables.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        spider: "rgb(var(--spider) / <alpha-value>)",
        electric: "rgb(var(--electric) / <alpha-value>)",
        web: "rgb(var(--web) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        brutal: "6px 6px 0 0 rgb(var(--ink))",
        "brutal-sm": "4px 4px 0 0 rgb(var(--ink))",
        "brutal-lg": "10px 10px 0 0 rgb(var(--ink))",
      },
    },
  },
  plugins: [],
};

export default config;

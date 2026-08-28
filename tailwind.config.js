/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 0 0% 14.9%))",
        input: "hsl(var(--input, 0 0% 14.9%))",
        ring: "hsl(var(--ring, 0 84.2% 60.2%))",
        background: "hsl(var(--background, 20 14.3% 4.1%))",
        foreground: "hsl(var(--foreground, 0 0% 98%))",
        smack: {
          red: "#E11D48",
          darkred: "#9F1239",
          gold: "#F59E0B",
          yellow: "#FBBF24",
          dark: "#0C0A09",
          card: "#171311",
        }
      },
    },
  },
  plugins: [],
}

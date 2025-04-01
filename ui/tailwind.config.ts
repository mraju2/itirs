import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // White and blue-gray shades
        slate: {
          950: "#ffffff",   // Pure white
          900: "#0f172a",   // Dark navy blue
          800: "#1e293b",    // Dark slate blue
          700: "#334155",    // Medium slate blue
          400: "#94a3b8",    // Light blue-gray
          300: "#cbd5e1",    // Very light blue-gray
        },
        // Blue accent colors
        blue: {
          400: "#60a5fa",    // Sky blue
          600: "#2563eb",    // Royal blue
          700: "#1d4ed8",    // Navy blue
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
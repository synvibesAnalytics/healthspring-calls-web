import { type Config } from "tailwindcss"

export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2F855A", // Forest green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#C4A484", // Wooden brown
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#6B7280",
        },
      },
    },
  },
} satisfies Config


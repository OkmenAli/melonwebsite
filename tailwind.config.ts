import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        melon: {
          50: "#f3faf4",
          100: "#e4f5e7",
          200: "#c9ebd0",
          300: "#9fdcae",
          400: "#66bf7b",
          500: "#45a85d",
          600: "#24723d",
          700: "#1d5b32",
          800: "#18492a",
          900: "#133d23"
        },
        ink: "#111b15",
        fog: "#f7fbf6"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 27, 21, 0.10)",
        card: "0 12px 34px rgba(17, 27, 21, 0.08)",
        phone: "0 30px 80px rgba(17, 27, 21, 0.22)"
      },
      borderRadius: {
        card: "28px",
        soft: "22px"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

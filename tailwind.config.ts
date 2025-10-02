import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          light: "#8b5cf6",
          dark: "#4f46e5",
        },
        secondary: {
          DEFAULT: "#fb7185",
          light: "#fda4af",
          dark: "#f43f5e",
        },
        success: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "warm-gradient": "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
      },
      scale: {
        "102": "1.02",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

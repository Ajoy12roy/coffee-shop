import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B2C",
          light: "#FF8C55",
          dark: "#E55A1C",
        },
        coffee: {
          dark: "#1A0A00",
          medium: "#2D1600",
          light: "#3D2000",
          cream: "#FFF8F0",
          mocha: "#6B3A2A",
        },
        accent: {
          orange: "#FF6B2C",
          yellow: "#FFD700",
          green: "#4CAF50",
          purple: "#9C27B0",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

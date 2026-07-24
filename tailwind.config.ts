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
        primary: "#31543A",
        secondary: "#F7F2E8",
        accent: "#C89B63",
        text: "#1D1D1D",
        dark: "#111111",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        floatDelayed: "float 4s ease-in-out 1s infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        imgReveal: "imgReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200, 155, 99, 0.2)" },
          "50%": { boxShadow: "0 0 0 12px rgba(200, 155, 99, 0)" },
        },
        imgReveal: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      transitionDuration: {
        "1500": "1500ms",
        "2000": "2000ms",
      },
    },
  },
  plugins: [],
};

export default config;
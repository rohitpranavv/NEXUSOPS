import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#081224",
        cyan: "#3ee7d8",
        gold: "#f5c96a",
        mist: "#e8f1ff"
      }
    }
  },
  plugins: []
} satisfies Config;


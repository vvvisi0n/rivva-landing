/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulseSlow 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 9s ease-in-out infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.75" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        popUp: {
          "0%, 100%": { transform: "translateY(100%)", opacity: "0" },
          "10%, 90%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        popUp: "popUp 5s ease-in-out forwards",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

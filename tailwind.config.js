/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Plus_Jakarta_Sans: ["Plus Jakarta Sans"],
      display: ["Plus Jakarta Sans"],
      body: ['"Plus Jakarta Sans"'],
      html: ['"Plus Jakarta Sans"'],
    },
    colors: {
      neutral: "#72768F",
      "neutral-50": "#F4F4F7",
      "neutral-100": "#E9E9F0",
      "neutral-200": "#D2D4E1",
      "neutral-300": "#BCBED1",
      "neutral-400": "#A5A9C2",
      "neutral-500": "#8F93B3",
      "neutral-600": "#72768F",
      "neutral-700": "#56586B",
      "neutral-800": "#393B48",
      "neutral-900": "#1D1D24",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        1440: "1440px",
        440: "440px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
});

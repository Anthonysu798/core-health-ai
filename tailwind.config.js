/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#8B5CF6",
          dark: "#7C3AED",
        },
        secondary: {
          DEFAULT: "#4B5563",
          dark: "#374151",
        },
      },
    },
  },
  plugins: [],
};

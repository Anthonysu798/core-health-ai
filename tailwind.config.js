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
          DEFAULT: "#6B46C1",
          dark: "#553C9A",
        },
        secondary: {
          DEFAULT: "#4B5563",
          dark: "#374151",
        },
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#3b0764', // Added darker purple
        },
      },
    },
  },
  plugins: [],
};

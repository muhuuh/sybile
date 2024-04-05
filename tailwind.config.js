/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkBgGray: "#202123",
        lightBgGray: "#343541",
        türkisDarker: "#0F6D82",
        indogoDye: "#00487C",
        argentinianBlue: "4BB3FD",
        honoluluBlue: "027BCE",
        salmon: "#eeab94",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

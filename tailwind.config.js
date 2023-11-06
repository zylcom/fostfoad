/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bleached-silk": "#f3f3f3",
        "blood-moon": "#d83535",
        "charolais-cattle": "#efeaea",
        "chilled-chilly": "#ea4335",
        "chocobo-feather": "#fbbc05",
        "cloud-break": "#f3f3fe",
        "dark-tone-ink": "#121212",
        "explosive-grey": "#c4c4c4",
        "heirloom-hydrangea": "#2a7dd2",
        mercury: "#ebebeb",
        "mint-jelly": "#41d195",
        "prunus-avium": "#e04699",
        "seljuk-blue": "#4285f4",
        "spandex-green": "#34a853",
        "thamar-black": "#181818",
        "torii-red": "#de3905",
        "venetian-nights": "#7b61ff",
        "zhen-zhu-bai-pearl": "#f8f8f8",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};

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
        "blood-moon": "#D83535",
        "charolais-cattle": "#EFEAEA",
        "chilled-chilly": "#EA4335",
        "chocobo-feather": "#FBBC05",
        "dark-tone-ink": "#121212",
        "explosive-grey": "#C4C4C4",
        "heirloom-hydrangea": "#2A7DD2",
        mercury: "#EBEBEB",
        "prunus-avium": "#E04699",
        "seljuk-blue": "#4285F4",
        "spandex-green": "#34A853",
        "thamar-black": "#181818",
        "torii-red": "#DE3905",
        "venetian-nights": "#7B61FF",
        "zhen-zhu-bai-pearl": "#F8F8F8",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};

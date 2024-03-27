/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#28B67E",
        greenLight: "#42D098",
        greenSupLight: "#5be9b1",
        darkGrayishBlue: "#404654",
        veryDarkBlue: "#0D1321",
        veryLightGray: "#EEEEEE",
        offWhite: "#ECE9E9",
      },
    },
  },
  plugins: [],
};

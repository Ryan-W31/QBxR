const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-primary": "#0C0C0C",
        "dark-secondary": "#252825",
        "light-primary": "#EEEEEE",
        "light-secondary": "#AAAAAA",
        "green-primary": "#1FB622",
        "green-secondary": "#1C6000",
      },
      fontFamily: {
        Audiowide: ["Audiowide", "sans-serif"],
      },
    },
  },
  plugins: [],
});

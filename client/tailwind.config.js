import withMT from "@material-tailwind/html/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#3FCC7C",
        },
      },
      fontFamily: {
        playfairMD: ["PlayfairDisplay-Medium", "sans-serif"],
        playfairRegular: ["PlayfairDisplay-Regular", "sans-serif"],
        playfairSM: ["PlayfairDisplay-SemiBold", "sans-serif"],
        playfairEB: ["PlayfairDisplay-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E1E1E",
          light: "#848484",
          dark: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#A3E635",
        },
      },
      fontFamily: {
        interRegular: ["Inter_18pt-Regular", "sans-serif"],
        interMedium: ["Inter_18pt-Medium", "sans-serif"],
        interBold: ["Inter_18pt-Bold", "sans-serif"],
        interThin: ["Inter_18pt-Thin", "sans-serif"],
        interExtraBold: ["Inter_18pt-ExtraBold", "sans-serif"],
        interSemiBold: ["Inter_18pt-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

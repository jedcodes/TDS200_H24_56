/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FCFCFC",
          dark: "#21302F",
        },
        secondary: {
          DEFAULT: "#25C0B7",
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

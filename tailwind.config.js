const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: colors.blue,
      indigo: colors.indigo,
      gray: colors.coolGray,
      purple: colors.purple,
      red: colors.red,
      pink: colors.pink,
      green: colors.green,
      orange: '#F37325',
      white: colors.white,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

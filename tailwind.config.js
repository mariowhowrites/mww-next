const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './something/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Agrandir', ...defaultTheme.fontFamily.sans],
        body: ['Telegraf', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}


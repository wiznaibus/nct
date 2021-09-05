module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'nctu':'#B1DC11',
        'nct127':'#F25892',
        'nctdream':'#F2E658',
        'wayv':'#484848',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

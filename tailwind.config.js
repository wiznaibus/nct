module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [
        'text-light',
        'text-nctu',
        'text-nct127',
        'text-nctdream',
        'text-wayv',
        'bg-nctu',
        'bg-nct127',
        'bg-nctdream',
        'bg-wayv',
        'border-nctu',
        'border-nct127',
        'border-nctdream',
        'border-wayv',
        'hover:text-light',
        'hover:bg-nctu',
        'hover:bg-nct127',
        'hover:bg-nctdream',
        'hover:bg-wayv',
        'hover:border-nctu',
        'hover:border-nct127',
        'hover:border-nctdream',
        'hover:border-wayv',
      ],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    /* customForms: theme => ({
      default: {
        input: {
          borderRadius: theme('borderRadius.lg'),
          backgroundColor: theme('colors.gray.200'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
          }
        },
        select: {
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.DEFAULT'),
        },
        checkbox: {
          backgroundColor: theme(),
          width: theme('spacing.6'),
          height: theme('spacing.6'),
        },
      },
    }), */
    extend: {
      colors: {
        nctu: '#B1DC11',
        nct127: '#F25892',
        nctdream: '#F2E658',
        wayv: '#484848',
        light: '#F8F8F8'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
}

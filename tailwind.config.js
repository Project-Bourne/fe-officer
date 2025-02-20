/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        sirp: {
          primary: "#4582C4",
          primaryLess2: "#E8F8FD",
          secondary: "#ffee88",
          lightGrey: "#F3F5F6",
          greyShadow: "#F7E9EB",
          secondary1: "#FFEE88",
          secondary2: "#F9F9F9",
          dashbordb: "#DFCF6D",
          dashbordb3: "#D17D86",
          dashbordb1: "#E8EAEC",
          primary1: "#4AC7ED",
          primaryBlue: "#1293BA",
          primaryLess1: "#B2CBE6",
          grey: "#545C62",
          grey1: "#383E42",
          dashbordb3a: "#B22735",
          dashboardcola: "#4AC7ED",
          keynotebg: "#A2E2F6",
          hoverbg: "#D1F1FA",
          counterbg: "#ECF2F9",
          listBg: "#F9FBFE",
          confidence: "#6497CE",
        },
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#545C62', // sirp-grey
            a: {
              color: '#4582C4', // sirp-primary
              '&:hover': {
                color: '#1293BA', // sirp-primaryBlue
              },
            },
            h1: {
              color: '#383E42', // sirp-grey1
            },
            h2: {
              color: '#383E42', // sirp-grey1
            },
            h3: {
              color: '#383E42', // sirp-grey1
            },
            h4: {
              color: '#383E42', // sirp-grey1
            },
            code: {
              color: '#4582C4', // sirp-primary
              backgroundColor: '#F3F5F6', // sirp-lightGrey
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#F3F5F6', // sirp-lightGrey
              code: {
                backgroundColor: 'transparent',
                padding: '0',
              },
            },
            blockquote: {
              borderLeftColor: '#4582C4', // sirp-primary
              color: '#545C62', // sirp-grey
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

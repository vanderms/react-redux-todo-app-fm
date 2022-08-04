/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '22rem',
      md: '45rem'
    },

    colors: {
      "primary": "var(--clr-primary)",
      "white": "var(--clr-white)",
      "neutral-100": "var(--clr-neutral-100)",
      "neutral-200": "var(--clr-neutral-200)",
      "neutral-300": "var(--clr-neutral-300)",
      "neutral-500": "var(--clr-neutral-500)",
      "neutral-800": "var(--clr-neutral-800)",
      "transparent": "transparent",
    },

    extend: {
      backgroundImage: {
        "gradient": "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)"
      }
    },
  },
  plugins: [],
}
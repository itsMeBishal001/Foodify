/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)',
      },
      colors: {
        primary: '#43A047',
        secondary: '#F7931B',
      },
    },
  },
  plugins: [],
}


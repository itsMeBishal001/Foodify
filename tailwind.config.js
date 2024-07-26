/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)',
      },
      colors: {
        primary: '#43A047', // Green, typically used for success or primary actions
        secondary: '#F7931B', // Orange, suitable for highlights or call-to-actions
        accent: '#FF5722', // A bright orange-red for attention-grabbing elements
        info: '#2196F3', // Blue, good for informational messages
        warning: '#FFC107', // Amber, for warnings or attention
        error: '#F44336', // Red, for errors
        success: '#4CAF50', // Another green, slightly different from primary for variety
        black: '#000000', // Standard black
        white: '#FFFFFF', // Standard white
        gray: {
          light: '#F5F5F5', // Light gray, good for backgrounds
          DEFAULT: '#9E9E9E', // Default gray, often used for text
          dark: '#616161', // Darker gray, good for less prominent text
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

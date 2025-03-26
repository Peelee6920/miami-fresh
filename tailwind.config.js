/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'miami-orange': '#FF6B35',
        'miami-blue': '#004E89',
        'miami-teal': '#2AB7CA',
        'miami-yellow': '#FED766',
        'miami-gray': '#4F5D75',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 
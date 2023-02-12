/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,tsx,ts}"
  ],
  theme: {
    extend: {
      transitionProperty:{
        width:"width",
      }
    },
    
  },
  plugins: [ require('tailwind-scrollbar-hide')],
}
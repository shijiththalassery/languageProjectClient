/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#97bd2f',
        customsolidBlur:'#2e3054',
        cardBackGround:'#e6e7f0'
      },
      toast: {
        'custom-success': 'bg-yellow-500 text-black', // Customize the background and text color
      },
    },
  },
  plugins: [
    require('tailwindcss-gradient'),
    require("daisyui")],
}


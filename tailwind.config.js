/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      background: '#343964',
      button:'#393F6E',
      white: '#E2E4F3',
      gray: '#8B8EAB',
      
    },
    backgroundImage: {
      'gradient': 'linear-gradient(#E65895, #BC6BE8)',
    },
    extend: {},
  },
  plugins: [],
}
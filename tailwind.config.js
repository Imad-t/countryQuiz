/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    colors: {
      background: '#343964',
      button:'#393F6E',
      white: '#E2E4F3',
      gray: '#8B8EAB',
      
    },
    backgroundImage: {
      'gradient': 'linear-gradient(#E65895, #BC6BE8)',
    },
    fontFamily: {
      body: ['Be Vietnam Pro', 'sans-serif']
    },

    extend: {},
  },
  plugins: [],
}
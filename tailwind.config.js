const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js, mjs}',
    flowbite.content(),
  
  ],
  theme: {
    extend: {},
    colors: {
      'primary-color-theme': '#272727',
      'secondary-color-theme': '#ABF600',
      'background-color-theme': '#212121',
      'outline-color-theme': '#404040',
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  darkMode: 'selector',

}


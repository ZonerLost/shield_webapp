/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['var(--font-dm-sans)'],
        'sans': ['var(--font-dm-sans)'],
      },
      colors: {
        'blue-primary': '#1e293b',
        'dark-blue': '#0D1B2A',
        'text-gray': '#475569',
        'light-gray': '#FCFCFC',
        'placeholder-gray': '#94a3b8',
        'error-red': '#EB1111',
        'success-green': '#22C4FE',
        'white': '#ffffff',
        'black': '#000000',
        'icons-bg': '#E7E7E7',
        'badge-bg': '#080808',
        'coffee-bg': '#5D5D5D',
        'chat-bg': '#F6F6F6',
        'dark-gray': '#454545',
        'light-blue': '#316993',
      },
    },
  },
  plugins: [],
}


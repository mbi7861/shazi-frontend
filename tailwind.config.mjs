/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // 'shazi-black': '#0a0a0a',
        'shazi-gold': '#c5a059',
      },
      fontFamily: {
        "display": ["Playfair Display", "serif"],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [],
};

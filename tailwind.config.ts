import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pokemon: {
          yellow: '#FFCB05',
          blue: '#3466AF',
          red: '#E21C25',
          white: '#FFFFFF'
        },
      },
      backgroundImage: {
        pokemon: "url('/images/pokemon.svg')"
      },
      screens: {
        xs: '500px'
      }
    },
  },
  plugins: [],
} satisfies Config;

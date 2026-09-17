/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        heading: ["'Outfit'", "system-ui", "sans-serif"]
      },
      colors: {
        theme: {
          dark: '#070C18',
          card: '#0F172A',
          emerald: '#10B981',
          gold: '#F59E0B',
          teal: '#14B8A6'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite'
      }
    }
  },
  plugins: []
}

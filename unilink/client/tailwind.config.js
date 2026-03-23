/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        mint: {
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
        },
        peach: {
          100: '#ffe4d6',
          400: '#fb923c',
          500: '#f97316',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Syne"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(99, 102, 241, 0.12)',
        'soft-lg': '0 8px 40px rgba(99, 102, 241, 0.18)',
        'card': '0 2px 16px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}

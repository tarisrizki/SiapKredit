/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          500: '#1B4D8E',
          600: '#1E3A8A',
          700: '#1e3a8a',
        },
        success: {
          50:  '#F0FDF4',
          500: '#28A745',
          600: '#16A34A',
        },
        warning: {
          50:  '#FFFBEB',
          500: '#F59E0B',
        },
        danger: {
          50:  '#FFF1F2',
          500: '#DC2626',
        }
      }
    },
  },
  plugins: [],
}

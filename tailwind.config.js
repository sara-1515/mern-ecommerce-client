/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Your unique color palette
        primary: '#2e7d32',   // A deep green
        secondary: '#f5f5f5', // A light gray
        accent: '#ff9800',    // An amber/orange for highlights
        neutral: {
          100: '#f9f9f9',
          200: '#e0e0e0',
          700: '#616161',
          900: '#212121',
        },
        // You can add more specific colors as needed
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffc107',
        info: '#2196f3',
      },
      fontFamily: {
        // Unique font choices (make sure these are available or imported)
        'display': ['"Montserrat"', 'sans-serif'],
        'body': ['"Open Sans"', 'sans-serif'],
        // You can add more font families
      },
      spacing: {
        // Custom spacing units beyond the defaults
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        // You can define your own spacing scale
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0, 0, 0, 0.08)',
        'custom-medium': '0 4px 15px rgba(0, 0, 0, 0.12)',
        // Define your own shadow styles
      },
    },
  },
  plugins: [],
}
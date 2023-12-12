/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        '128': '28rem',
      },
      backgroundImage:{
        bgBack : "url('./src/assets/icons/bground.jpg')"
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': "#ffffff",
      'login-card': '#F2F2F2',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'navigation' : "#1C2536",
      'navigation1' : "#1C2590",
      'card1': "#D1E9FC",
      "card2": "#D0F2FE",
      "text1": "#6E7479",
      'fade': "#F7F7F7",
      "background" :"#E3E3E3",
      "text-link": "rgb(59 130 246)",
      "alert": "rgb(220 38 38)"

  }},
  plugins: [],
}


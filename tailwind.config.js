/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",   // 모바일 가로
        md: "768px",   // 태블릿
        lg: "1024px",  // 태블릿 가로 / 작은 PC
        xl: "1280px",  // PC
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      /* 색상: common.css 변수와 연동 (라이트/다크 전환은 CSS에서 처리) */
      colors: {
        point: "var(--point)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        emphasis: "var(--text-emphasis)",
      },
      /* 폰트 크기 스케일 (공용) */
      fontSize: {
        "body-xs": ["12px", { lineHeight: "1.5" }],
        "body-sm": ["13px", { lineHeight: "1.5" }],
        body: ["14px", { lineHeight: "1.6" }],
        "body-md": ["16px", { lineHeight: "1.6" }],
        "body-lg": ["18px", { lineHeight: "1.5" }],
        title: ["20px", { lineHeight: "1.3" }],
        "title-md": ["22px", { lineHeight: "1.3" }],
        "title-lg": ["24px", { lineHeight: "1.3" }],
        heading: ["26px", { lineHeight: "1.25" }],
        "heading-md": ["28px", { lineHeight: "1.25" }],
        display: ["clamp(28px,5vw,52px)", { lineHeight: "1.2" }],
      },
      /* 폰트 굵기 (의미별) */
      fontWeight: {
        body: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },
  plugins: [],
};

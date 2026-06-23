// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:  "#6B4423",  // 檜木深棕 — header、主背景
          red:   "#A63F24",  // 磚紅棕   — active、強調
          gold:  "#E8A818",  // 地瓜球金 — logo DFW、CTA 按鈕
          latte: "#C49A6C",  // 珍奶米棕 — 輔色、border
          cream: "#FBF5EE",  // 淺奶白   — 頁面底色
        },
      },
    },
  },
  plugins: [],
};

export default config;

import daisyui from "daisyui";

export default {
  darkMode: "class",  // এটা ঠিক আছে
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],  // DaisyUI থিম দুইটা ব্যবহার কর
  },
};

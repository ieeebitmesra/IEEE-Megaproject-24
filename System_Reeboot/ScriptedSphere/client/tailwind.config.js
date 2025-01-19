/** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");

import { content , plugin } from "flowbite-react/tailwind";
import scrollbar from "tailwind-scrollbar";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin({
      charts:true,
    }),
    scrollbar,
    scrollbarHide,
  ],
}


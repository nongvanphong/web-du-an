const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "ct-orange": "#F9DBB1",
        "ct-white": "#ffffff",
        "gray-ct": "#F7F5FA",
        "orage-100-ct": "#FFAD3A",
        "orage-70-ct": "#F4C17B",
        "blude-30-ct": "#E8F3F2",
        "green-80-ct": "#7CF900",
        "yellow-80-ct": "#F9EF00",
        "red-80-ct": "#FF3D00",
        "blue-ct": "#4B68FF",
        "main-ct": "#F1F3F5",
      },
      padding: {
        "ct-50": "3.125rem",
      },
      maxWidth: {
        "ct-w-max-500": "500px", // Tùy chỉnh giới hạn chiều rộng tối đa
      },
      width: {
        "500-ct": "31.25rem",
      },
      // fontFamily: {
      //   Nunito: ["Nunito-Black"],
      // },
      height: {
        "400-ct": "25rem",
      },
      borderColor: {
        "orage-100-ct": "#FFAD3A",
      },
    },

    plugins: [],
  },
});

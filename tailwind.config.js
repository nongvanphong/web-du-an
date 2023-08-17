/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ct-orange": "#F9DBB1",
        "ct-white": "#ffffff",
        "gray-ct": "#F7F5FA",
        "orage-100-ct": "#FFAD3A",
        "orage-70-ct": "#F4C17B",
        "blude-30-ct": "#E8F3F2",
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
};

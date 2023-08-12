/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ct-orange": "#F9DBB1",
        "ct-white": "#ffffff",
        "gray-ct": "#F7F5FA",
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
    },

    plugins: [],
  },
};

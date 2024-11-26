/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'bounce-up-down': {
          '0%, 100%': { transform: 'translateY(10px)' }, // Початкова та кінцева позиція
          '50%': { transform: 'translateY(-10px)' }, // Рух вгору
        },
      },
      animation: {
        'bounce-up-down': 'bounce-up-down 2s ease-in-out infinite', // Анімація з постійним повторенням
      },
      colors: {
        orange: "rgba(196, 96, 52, 1)",
        mainBg: 'rgba(255, 242, 235, 1)',
        green: "rgba(112, 131, 96, 1)",
        bText: "rgba(242, 204, 174, 1)",
        bgGreen: 'rgba(82, 123, 47, 0.5)',
      },
      boxShadow: {
        'add-button': '0px 8px 4px 0px #00000040',

        'custom-inset': '0px 6px 4px 0px rgba(0, 0, 0, 0.25) inset',
      },
    },
  },
  plugins: [],
};

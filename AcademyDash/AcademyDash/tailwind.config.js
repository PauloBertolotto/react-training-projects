// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        motionblur: {
          "0%": {
            filter: "blur(6px)",
            transform: "translateX(-12px)",
            opacity: 0.7,
          },
          "100%": {
            filter: "blur(0px)",
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        motionblur: "motionblur 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

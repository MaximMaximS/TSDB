module.exports = {
  endOfLine: "lf",
  tabWidth: 2,
  semi: true,
  arrowParens: "always",
  bracketSameLine: true,
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.js",
};

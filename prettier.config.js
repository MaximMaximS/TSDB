module.exports = {
  endOfLine: "lf",
  tabWidth: 2,
  semi: true,
  arrowParens: "always",
  bracketSameLine: true,
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@trivago/prettier-plugin-sort-imports"),
  ],
  tailwindConfig: "./tailwind.config.js",
  importOrder: [
    "server-only",
    "<THIRD_PARTY_MODULES>",
    "^@lib/server/(.*)$",
    "^@lib/(.*)$",
    "^@components/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

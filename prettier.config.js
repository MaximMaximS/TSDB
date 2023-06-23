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
    "^@lib/server/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@lib/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

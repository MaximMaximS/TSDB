const path = require("path");

/**
 * @param {string[]} filenames
 * @returns {string}
 */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*": ["prettier --write --ignore-unknown"],
};

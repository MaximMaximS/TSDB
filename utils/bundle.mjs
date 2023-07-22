// @ts-check
import fs from "fs-extra";

fs.removeSync("./dist");

// Check if ./public exists
if (fs.existsSync("./public")) {
  fs.copySync("./public", "./dist/public");
}
fs.copySync("./.next/standalone", "./dist");
fs.copySync("./.next/static", "./dist/.next/static");

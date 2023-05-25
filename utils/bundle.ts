import fs from "fs-extra";
import { execSync } from "node:child_process";

fs.removeSync("./dist");

execSync("pnpm run generate");
execSync("pnpm run build", { stdio: "ignore" });

fs.copySync("./public", "./dist/public");
fs.copySync("./.next/standalone", "./dist");
fs.copySync("./.next/static", "./dist/.next/static");

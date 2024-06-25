const dotenvFlow = require("dotenv-flow");
const typescript = require("@rollup/plugin-typescript");
const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const replace = require("@rollup/plugin-replace");
const htmlTemplate = require("rollup-plugin-generate-html-template");

dotenvFlow.config();

module.exports = {
  input: "src/main.mts",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    htmlTemplate({
      template: "src/index.html",
      target: "index.html",
    }),
    typescript(),
    nodeResolve(),
    commonjs(),
    replace({
      "process.env.TELEGRAM_BOT_NAME": JSON.stringify(
        process.env.TELEGRAM_BOT_NAME,
      ),
      preventAssignment: true,
    }),
  ],
};

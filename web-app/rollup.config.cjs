const typescript = require("@rollup/plugin-typescript");
const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const htmlTemplate = require("rollup-plugin-generate-html-template");

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
  ],
};

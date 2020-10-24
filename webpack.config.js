const path = require("path");

module.exports = {
  entry:[
    "./js/game.js",
    "./js/util.js",
    "./js/backend.js",
    "./js/dialog.js",
    "./js/move.js",
    "./js/colorize.js",
    "./js/render.js",
    "./js/wizard.js",
    "./js/debounce.js",
    "./js/setup.js",
    "./js/validation.js",
    "./js/stat.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

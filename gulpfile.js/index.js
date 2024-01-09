//Packages
const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

//Configuration
const path = require("./config/path.js");
const app = require("./config/app.js");

//Tasks
// const html = require("./task/html.js");
// const css = require("./task/css.js");
const clear = require("./task/clear.js");
const pug = require("./task/pug.js");
const scss = require("./task/scss.js");
const js = require("./task/js.js");
const img = require("./task/img.js");
const font = require("./task/font.js");

//Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

//Watcher
const watcher = () => {
  //watch(path.html.watch, html).on("all", browserSync.reload);
  //watch(path.css.watch, css).on("all", browserSync.reload);
  watch(path.pug.watch, pug).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
  watch(path.font.watch, font).on("all", browserSync.reload);
};

const build = series(clear, parallel(pug, scss, js, img, font));

const dev = series(build, parallel(server, watcher));

//Task export
// exports.html = html;
// exports.css = css;
exports.pug = pug;
exports.watch = watcher;
exports.clear = clear;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

exports.default = app.isProd ? build : dev;

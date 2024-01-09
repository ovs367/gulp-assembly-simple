//Configuration
const path = require("../config/path.js");

//Plugins
const del = require("del");

//Deleting the public directory
const clear = () => {
  return del(path.root);
};

module.exports = clear;

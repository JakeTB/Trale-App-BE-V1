const ENV = "test";
console.log(ENV);
const test = require("./test-data/");

const development = require("./development-data");

const data = { test, development, production: development };

module.exports = data[ENV];

if (process.env.NODE_END === "production") {
  // We are in prouction - return the prod set of keys
  module.exports = require("./prod");
} else {
  // We are in development - return dev keys
  module.exports = require("./dev");
  // Pull the dev keys in and export it right away
}
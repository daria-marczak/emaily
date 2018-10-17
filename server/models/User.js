const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

mongoose.model("users", userSchema);
// We create a collection named "users" with the schema specified. When mongoose boots up, if there already is a collection named "users", mongoose will not delete this a create new one
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  displayName: { type: String, default: "" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateRegistered: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", UserSchema);

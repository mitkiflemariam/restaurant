const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  role: {
    type: String,
    required: false,
    unique: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

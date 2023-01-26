const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  phone: Number,
  email: String,
  password: String,
});

const User = mongoose.model("users", usersSchema);

module.exports = User;

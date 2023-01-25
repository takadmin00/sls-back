const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: Number,
  email: String,
  password: String,
});

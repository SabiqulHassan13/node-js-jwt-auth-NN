const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  //   username: {
  //     type: String,
  //     required: true,
  //   },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an email"],
    minLength: [6, "Minimam password length is 6 characters"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

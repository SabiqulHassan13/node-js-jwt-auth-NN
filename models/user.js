const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("created a new user", doc);
  next();
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  // console.log("about to create a new user", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

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
    required: [true, "Please enter a password"],
    minLength: [6, "Minimam length is 6 characters"],
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

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      // console.log(user);
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;

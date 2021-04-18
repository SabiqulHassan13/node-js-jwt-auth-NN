const User = require("../models/user");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.showLogin = (req, res) => {
  return res.render("auth/login", { title: "Login" });
};

module.exports.showRegister = (req, res) => {
  return res.render("auth/register", { title: "Register" });
};

module.exports.processLogin = async (req, res) => {
  // console.log(req.body);
  return res.send("Process Login");
};

module.exports.processRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.processLogout = (req, res) => {
  return res.send("Process Logout");
};

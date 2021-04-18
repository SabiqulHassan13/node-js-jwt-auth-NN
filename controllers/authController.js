const User = require("../models/user");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "Email is already registered";
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

// jwt token create
const MAX_AGE_JWT = 1000 * 60 * 60 * 24;
const createJwtToken = (id) => {
  return jwt.sign({ id }, "JWT secrect", {
    expiresIn: MAX_AGE_JWT,
  });
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
    const token = createJwtToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE_JWT });

    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

module.exports.processLogout = (req, res) => {
  return res.send("Process Logout");
};

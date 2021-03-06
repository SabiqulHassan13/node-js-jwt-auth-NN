const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check and verify jwt token
  if (token) {
    jwt.verify(token, "JWT secrect", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/auth/login");
  }
};

// check currentUser
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // check and verify jwt token
  if (token) {
    jwt.verify(token, "JWT secrect", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.currentUser = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.currentUser = user;
        next();
      }
    });
  } else {
    res.locals.currentUser = null;
    next();
  }
};

module.exports = { checkAuth, checkUser };

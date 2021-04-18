const jwt = require("jsonwebtoken");

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

module.exports = checkAuth;

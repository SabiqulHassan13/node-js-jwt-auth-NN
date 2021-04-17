module.exports = {
  showLogin: function (req, res) {
    return res.render("auth/login", { title: "Login" });
  },
  showRegister: function (req, res) {
    return res.render("auth/register", { title: "Register" });
  },
  processLogin: function (req, res) {
    console.log(req.body);
    return res.send("Process Login");
  },
  processRegister: function (req, res) {
    return res.send("Process Register");
  },
  processLogout: function (req, res) {
    return res.send("Process Logout");
  },
};

const express = require("express");

// app initialize
const app = express();
const port = 8000;
const db = require("./config/mongoose");

// app middlewares
app.use(express.static("public"));

// app view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// app routes
app.get("/", (req, res) => {
  //   res.send("<h1>JWT Auth</h1>");
  return res.render("home", {
    title: "Home",
  });
});
app.get("/dashboard", (req, res) => {
  //   res.send("<h1>Account Dashboard</h1>");
  return res.render("dashboard", {
    title: "Dashboard",
  });
});

app.get("/auth/login", (req, res) => {
  return res.render("auth/login", {
    title: "Login",
  });
});

// app server listen
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

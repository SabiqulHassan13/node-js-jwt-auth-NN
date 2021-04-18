const express = require("express");
const cookieParser = require("cookie-parser");

// app initialize
const app = express();
const port = 8000;
const db = require("./config/mongoose");

// app middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// app view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// app routes list
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

// auth routes
app.use("/auth", require("./routes/auth"));

// cookie routes
app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("you got the cookie");
});

app.get("/read-cookies", (req, res) => {
  //
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);
});

// app server listen
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

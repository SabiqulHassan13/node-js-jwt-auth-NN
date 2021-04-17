const express = require("express");

const app = express();
const port = 8000;
const db = require("./config/mongoose");

// app middlewares
app.use(express.static("public"));

// app view engine
app.set("view engine", "ejs");
app.set("view", "views");

// app routes
app.get("/", (req, res) => {
  res.end("<h1>JWT Auth</h1>");
});
app.get("/dashboard", (req, res) => {
  res.end("<h1>Account Dashboard</h1>");
});

// app server listen
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

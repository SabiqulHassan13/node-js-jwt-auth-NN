const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/node_jwt_auth";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("db connected sucessfully");
});

module.exports = db;

const express = require("express");
const app = express();

const port = 8001;

app.get("/", (req, res) => {
  return res.send("Home Page");
});

const admin = (req, res) => {
  return res.send("This is Admin Dashboard");
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin running");
  next();
};

app.get("/admin", isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("You are visiting Login route");
});

app.get("/signup", (req, res) => {
  return res.send("You are visiting Signup route");
});

app.listen(port, () => console.log("Server is up and running on port:", port));

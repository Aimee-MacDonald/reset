const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));

app.listen(process.env.PORT || 8080);

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
});

app.get("/admin", (req, res) => {
  res.redirect("/admin/register");
});

app.get("/admin/register", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/admin-register.html");
});

app.get("/admin/login", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/admin-login.html");
});

app.get("/admin/pages", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/admin-pages.html");
});

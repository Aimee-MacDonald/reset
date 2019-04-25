const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || 8080);

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/admin", (req, res) => {
  res.redirect("/admin/register");
});

app.get("/admin/register", (req, res) => {
  res.status(200).render("admin-register");
});

app.post("/admin/auth/register", (req, res) => {
  res.status(200).send("<h1>" + req.body.name + "</h1>");
});

app.get("/admin/login", (req, res) => {
  res.status(200).render("admin-login");
});

app.post("/admin/auth/login", (req, res) => {
  res.status(200).send("<h1>" + req.body.email + "</h1>");
});

app.get("/admin/pages", (req, res) => {
  res.status(200).render("admin-pages");
});

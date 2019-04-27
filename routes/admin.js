const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/admin/login");
});

router.get("/pages", (req, res) => {
  res.status(200).render("admin-pages");
});

router.get("/register", (req, res) => {
  res.status(200).render("admin-register");
});

router.get("/login", (req, res) => {
  res.status(200).render("admin-login");
});

router.post("/auth/register", (req, res) => {
  res.status(200).send("<h1>" + req.body.name + "</h1>");
});

router.post("/auth/login", (req, res) => {
  res.status(200).send("<h1>" + req.body.email + "</h1>");
});

module.exports = router;

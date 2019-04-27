const express = require("express");
const router = express.Router();
const path = require("path");

const siteAdmin = require(path.join(__dirname, "../dbmodels/siteAdmin"));

router.get("/", (req, res) => {
  if(req.isAuthenticated()){
    res.redirect("/admin/pages");
  } else {
    res.redirect("/admin/login");
  }
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
  var siteadmin = new siteAdmin({
    'username': req.body.name,
    'email': req.body.email,
    'password': req.body.password,
    'homepage': "www.reset-live.com"
  });

  siteadmin.save(err => {
    if(err) throw err;
    req.login(siteadmin._id, err => {
      if(err) throw err;
    });

    res.redirect("/admin");
  });
});

router.post("/auth/login", (req, res) => {
  res.status(200).send("<h1>" + req.body.email + "</h1>");
});

module.exports = router;

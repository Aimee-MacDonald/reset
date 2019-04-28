const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");

const siteAdmin = require(path.join(__dirname, "../dbmodels/siteAdmin"));

router.get("/", (req, res) => {
  if(req.isAuthenticated()){
    res.status(200).render("admin");
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/pages", (req, res) => {
  if(req.isAuthenticated()){
    res.status(200).render("admin-pages");
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/register", (req, res) => {
  res.status(200).render("admin-register", {csrfToken: req.csrfToken()});
});

router.get("/login", (req, res) => {
  res.status(200).render("admin-login", {csrfToken: req.csrfToken()});
});

router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/workshops", (req, res) => {
  if(req.isAuthenticated()){
    res.status(200).render("admin-workshops");
  } else {
    res.redirect("/admin/login");
  }
});

router.post("/auth/register", (req, res) => {
  var siteadmin = new siteAdmin({
    'username': req.body.name,
    'email': req.body.email,
    'password': req.body.password,
    'homepage': process.env.HOMEPAGE
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
  siteAdmin.find({email: req.body.email}, function(err, docs){
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.password, docs[0].password, function(err, resp){
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, function(err){
            if(err) throw err;
          });
          res.redirect("/admin");
        } else {
          res.redirect("/admin/login");
        }
      });
    } else {
      res.redirect("/admin");
    }
  });
});

module.exports = router;

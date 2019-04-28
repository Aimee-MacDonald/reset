const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const csurf = require("csurf");

const siteAdmin = require(path.join(__dirname, "/dbmodels/siteAdmin"));

const admin = require(path.join(__dirname, "/routes/admin"));

mongoose.connect(process.env.ADMINDB);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(csurf());

app.use("/admin", admin);

app.listen(process.env.PORT || 8080);

app.get("/", (req, res) => {
  res.status(200).render("index");
});


passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});

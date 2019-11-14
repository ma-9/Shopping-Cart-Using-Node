var router = require("express").Router();
var Product = require("../models/products");
var csrf = require("csurf");
var passport = require("passport");
var Orders = require("../models/orders");
var Cart = require("../models/cart");
const nodemailer = require("nodemailer");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, (req, res, next) => {
  Orders.find({ user: req.user }, (err, orders) => {
    if (err) {
      return console.log(err);
    }
    var cart;
    var userName = req.user.name || req.user.email;
    orders.forEach(order => {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render("users/profile", { title: "My Orders", orders, userName });
  });
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logOut();
  res.redirect("/");
});

router.use("/", notLoggedIn, (req, res, next) => {
  next();
});

router.get("/signup", (req, res, next) => {
  var messages = req.flash("error");
  res.render("users/signup", {
    title: "Sign Up",
    csrfToken: req.csrfToken(),
    hasError: messages.length > 0,
    messages: messages,
  });
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    failureRedirect: "/users/signup",
    failureFlash: true
  }),
  (req, res, next) => {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/users/profile");
    }

    const output = `
        <h2 align="center">${req.body.name} -  Your Account is Successfully Activated.</h2></br>
        <center><a href="https://ma9shoppingcart.herokuapp.com/"><img src="https://firebasestorage.googleapis.com/v0/b/mydocs-9999.appspot.com/o/mailBody%20JPEGFILE.jpg?alt=media&token=73e78909-8fa7-421d-b677-fb87055dca47"></a></center>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "dreamworld.bpccs@gmail.com", // DreamWorld Email ID
        pass: "LaW6rXvEguCHB2V" // DreamWorld Password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: `dreamworld.bpccs@gmail.com`, // sender address
      to: req.body.email, // list of receivers
      subject: `Welcome to Dreamworld ${req.body.name}, Buy Products with ❤`, // Subject line
      html: output // html body
    });
  }
);

router.get("/signin", (req, res, next) => {
  var messages = req.flash("error");
  res.render("users/signin", {
    title: "Sign In",
    csrfToken: req.csrfToken(),
    messages: messages,
    hasError: messages.length > 0
  });
});

router.post(
  "/signin",
  passport.authenticate("local-signin", {
    failureRedirect: "/users/signin",
    failureFlash: true
  }),
  (req, res, next) => {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/users/profile");
    }
  }
);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

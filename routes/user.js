var router = require('express').Router();
var Product = require('../models/products');
var csrf = require('csurf');
var passport = require('passport');


var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile',isLoggedIn,(req,res,next)=>{
    res.render('users/profile')
});

router.get('/logout', isLoggedIn, (req,res,next)=>{
    req.logOut();
    res.redirect('/');
});

router.use('/',notLoggedIn,(req,res,next)=>{
    next();
});

router.get('/signup',(req,res,next)=>{
    var messages = req.flash('error');
    res.render('users/signup',{
        title: 'Sign Up', 
        csrfToken: req.csrfToken(),
        messages: messages,
        hasError: messages.length>0
    })
});

router.post('/signup',passport.authenticate('local-signup',{
    failureRedirect: '/users/signup',
    failureFlash: true
}),(req,res,next)=>{
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else {
        res.redirect('/users/profile');
    }
});

router.get('/signin',(req,res,next)=>{
    var messages = req.flash('error');
    res.render('users/signin',{
        title: 'Sign Up', 
        csrfToken: req.csrfToken(),
        messages: messages,
        hasError: messages.length>0
    })
});

router.post('/signin',passport.authenticate('local-signin',{
    failureRedirect: '/users/signin',
    failureFlash: true
}),(req,res,next)=>{
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else {
        res.redirect('/users/profile');
    }
});

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
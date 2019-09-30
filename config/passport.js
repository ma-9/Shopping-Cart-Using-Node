var passport = require('passport');
var User = require('../models/users');

// Making Local Strategy of Passport Authentication
var Localstrategy = require('passport-local').Strategy;

// Serialize and Deserialize user
passport.serializeUser((user,done)=>{
    done(null, user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id, (err, user)=>{
        done(err,user);
    })
})


// Creating new User (sign up)
passport.use('local-signup', new Localstrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,email,password,done)=>{
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:6});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach((err)=>{
            messages.push(err.msg);
        })
        return done(null,false,req.flash('error',messages));
    }
    User.findOne({'email': email}, (err,user)=>{
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'User is already exists'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, result)=>{
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
    })
}))

// Fetching User (Sign in)
passport.use('local-signin',new Localstrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req,email,password,done){
    req.checkBody('email','Invalid Email').notEmpty();
    req.checkBody('password','Invalid Password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach((err)=>{
            messages.push(err.msg);
        })
        return done(null,false,req.flash('error',messages));
    }

    User.findOne({'email': email}, (err,user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'User Not Found !'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong Password !'});
        }
       
        return done(null, user);
    })
}))
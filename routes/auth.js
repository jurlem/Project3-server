const express = require ('express');
const passport = require ('passport');
const router = express.Router ();
const User = require ('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require ('bcrypt');
const bcryptSalt = 10;

router.get ('/login', (req, res, next) => {
  res.render ('auth/login', {message: req.flash ('error')});
});

// router.post (
//   '/login',
//   passport.authenticate ('local', {
//     successRedirect: '/',
//     failureRedirect: '/auth/login',
//     failureFlash: true,
//     passReqToCallback: true,
//   })
// );

router.post ('/login', (req, res, next) => {
  console.log ('login rout is hit');
  passport.authenticate ('local', (err, theUser, info) => {
    if (err) {
      res.status (500).json ({message: err});
      return;
    }
    if (!theUser) {
      res.status (401).json (info);
      return;
    }

    req.login (theUser, err => {
      if (err) {
        res.status (500).json ({message: err});
        return;
      }
      res.status (200).json (theUser);
    });
  }) (req, res, next);
});

router.get ('/signup', (req, res, next) => {
  res.render ('auth/signup');
});

router.post ('/signup', (req, res, next) => {
  const first_name = req.body.first_name;
  const email_address = req.body.email_address;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const premium = req.body.premium;
  console.log ('signup rout is hit', req.body);

  if (email_address === '' || password === '' || phone_number === '') {
    res.status (400).json ({
      message: "email_address, password or phone number can't be empty",
    });
    //  res.render ('auth/signup', {message: 'Indicate email_address and password'});
    return;
  }

  User.findOne ({email_address}, 'email_address', (err, user) => {
    console.log (
      'signup rout is hit, this is the email address: ',
      email_address
    );

    if (user !== null) {
      res.status (400).json ({message: 'The email_address already exists'});
      //res.render ('auth/signup', {message: 'The email_address already exists'});
      return;
    }

    const salt = bcrypt.genSaltSync (bcryptSalt);
    const hashPass = bcrypt.hashSync (password, salt);

    const newUser = new User ({
      first_name,
      email_address,
      password: hashPass,
      phone_number,
      premium,
    });

    newUser
      .save ()
      .then (() => {
        res.status (200).json (newUser);
        //res.redirect ('/');
      })
      .catch (err => {
        res.status (500).json ({message: 'Something went wrong'});
        //res.render ('auth/signup', {message: 'Something went wrong'});
      });
  });
});

router.get ('/logout', (req, res) => {
  req.logout ();
  res.status (200).json ({message: 'User logged out successfully'});
});

router.get ('/currentuser', (req, res, next) => {
  if (req.isAuthenticated ()) {
    res.status (200).json (req.user);
    return;
  }
  res.status (403).json ({message: 'unauthorized'});
});

module.exports = router;

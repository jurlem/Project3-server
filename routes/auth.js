const express = require ('express');
const passport = require ('passport');
const router = express.Router ();
const User = require ('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require ('bcrypt');
const bcryptSalt = 10;

// signup
// router.get ('/signup', (req, res, next) => {
//   res.render ('auth/signup');
// });

router.post ('/signup', (req, res, next) => {
  const {
    first_name,
    email_address,
    password,
    phone_number,
    premium,
    typeOfUser,
  } = req.body;

  if (
    email_address === '' ||
    password === '' ||
    phone_number === '' ||
    first_name === ''
  ) {
    res.status (400).json ({
      message: "email address, password or phone number can't be empty",
    });
    return;
  }

  User.findOne ({email_address})
    .then (foundEmail_address => {
      if (foundEmail_address !== null) {
        res.status (400).json ({message: 'The email address already exists'});
        return;
      }
      const salt = bcrypt.genSaltSync (bcryptSalt);
      const hashPass = bcrypt.hashSync (password, salt);

      User.create ({
        first_name,
        email_address,
        password: hashPass,
        phone_number,
        premium,
        typeOfUser,
      })
        .then (newUser => {
          console.log (newUser);
          // login user afrer successful signup automatically
          req.login (newUser, () => {
            newUser.hashPass = undefined;
            res.json ({newUser});
          });
        })
        .catch (err => next (err));
    })
    .catch (err => next (err));
});

// login

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
      //JSON.stringify
    });
  }) (req, res, next);
});

router.get ('/logout', (req, res) => {
  req.logout ();
  //send an empty theUser on logout, removing user from session
  res.status (200).json ({theUser: null});
});

router.get ('/checkuser', (req, res, next) => {
  if (req.user) {
    // hide "hashPass" before sending the JSON (it's a security risk)
    req.user.hashPass = undefined;
    res.json ({theUser: req.user});
  } else {
    res.json ({theUser: null});
  }
});

router.get ('/currentuser', (req, res, next) => {
  if (req.isAuthenticated ()) {
    res.status (200).json (req.user);
    return;
  }
  res.status (403).json ({message: 'unauthorized'});
});

module.exports = router;

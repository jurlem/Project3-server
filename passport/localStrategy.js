const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require ('../models/User');
const bcrypt = require ('bcrypt');

passport.use (
  new LocalStrategy (
    {
      usernameField: 'email_address',
      passwordField: 'password',
    },
    (email_address, password, done) => {
      User.findOne ({email_address})
        .then (foundUser => {
          if (!foundUser) {
            done (null, false, {message: 'Incorrect email_address'});
            return;
          }

          if (!bcrypt.compareSync (password, foundUser.password)) {
            done (null, false, {message: 'Incorrect password'});
            return;
          }

          done (null, foundUser);
        })
        .catch (err => done (err));
    }
  )
);

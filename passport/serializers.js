const passport = require ('passport');
const User = require ('../models/User');

passport.serializeUser ((loggedInUser, cb) => {
  cb (null, loggedInUser._id);
});

passport.deserializeUser ((userIdFromSession, cb) => {
  User.findById (userIdFromSession)
    .then (userDocument => {
      cb (null, userDocument);
    })
    .catch (err => {
      cb (err);
    });
});

function passportBasicSetup (theApp) {
  // passport super power is here:
  theApp.use (passport.initialize ()); // <== 'fires' the passport package
  theApp.use (passport.session ()); // <== connects passport to the session
}

module.exports = passportBasicSetup;

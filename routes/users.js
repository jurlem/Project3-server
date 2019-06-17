const express = require ('express');
const router = express.Router ();
const User = require ('../models/User');

// GET a user from the DB based on emailaddrss to get first_name  //userId: req.query.id, date: new Date ()
router.get ('/get', (req, res, next) => {
  console.log ('LOGGING:router.users/get route');
  User.findOne ({email: req.params.email_address})
    .then (receivedInfo => {
      console.log ('Console logging users/get', receivedInfo);
      res.json (receivedInfo);
      // res.render('fileuploads/documents-view', {id: req.query.id})
    })
    .catch (err => {
      console.log (err);
    });
});

module.exports = router;

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

// Users is updating his own details:
router.post ('/profileedit', (req, res, next) => {
  const {first_name, email_address, password, phone_number} = req.body;
  console.log ('LOGGING:router.profileedit route', req.body);
  User.findOneAndUpdate (
    {_id: req.body._id},
    {
      $set: {
        first_name: req.body.first_name,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
      },
    },
    {new: true}
  )
    .then (receivedInfo => {
      console.log ('Console logging profileedit', receivedInfo);
      res.json (receivedInfo);
      // res.render('fileuploads/documents-view', {id: req.query.id})
    })
    .catch (err => {
      console.log (err);
    });
});

module.exports = router;

const express = require ('express');
const router = express.Router ();
const Reminders = require ('../models/Reminders');

/* GET home page */
router.get ('/', (req, res, next) => {
  res.render ('index');
});

router.post ('/test', (req, res) => {
  console.log ('the test route is hit!');
});

router.post ('/create', (req, res, next) => {
  Reminders.create (req.body)
    .then (insertedInfo => {
      console.log ('testing CREATE path ' + insertedInfo);
      //kirjutab DB
    })
    .catch (err => {
      console.log (err);
    });
});

module.exports = router;

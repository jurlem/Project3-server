const express = require ('express');
const router = express.Router ();
const Reminders = require ('../models/Reminders');

/* GET home page */
router.get ('/', (req, res, next) => {
  res.render ('index');
});

// **** IDEAALIS ALLOLEVAD ROUTED VÕIKS OLLA ROUTES/REMINDERS ALL. ANDIS ERROROT APP.JS'S LISADEST

//  create new reminder:
router.post ('/create', (req, res, next) => {
  Reminders.create (req.body)
    .then (insertedInfo => {
      console.log ('testing CREATE path ' + insertedInfo); //kirjutab DB
    })
    .catch (err => {
      console.log (err);
    });
});

// GET reminders from the DB for REMINDER view: //userId: req.query.id, date: new Date ()
router.get ('/get', (req, res, next) => {
  console.log ('LOGGING: just /get route');
  Reminders.find ({})
    .then (receivedInfo => {
      console.log (receivedInfo);
      res.json (receivedInfo);
    })
    .catch (err => {
      console.log (err);
    });
});

module.exports = router;

const express = require ('express');
const router = express.Router ();

const Reminders = require ('../models/Reminders');

// THIS ROUTE FOLDER DOESNT WORK. WHY?

// POST: /reminders/create
router.post ('/create', (req, res, next) => {
  Reminders.create (req.body)
    .then (insertedInfo => {
      console.log (insertedInfo);
      //kirjutab DB
    })
    .catch (err => {
      console.log (err);
    });
});

// GET reminders from the DB for REMINDER view: //userId: req.query.id, date: new Date ()
router.get ('/get', (req, res, next) => {
  console.log ('LOGGING: reminders/get route');

  // Reminders.find ({})
  //   .then (receivedInfo => {
  //     console.log (receivedInfo);
  //   })
  //   .catch (err => {
  //     console.log (err);
  //   });
});

router.get ('/', (req, res) => {
  console.log ('the test route is /REMINDERS/ !');
});

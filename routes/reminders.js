const express = require ('express');
const router = express.Router ();
const Reminders = require ('../models/Reminders');

// router.get ('/', (req, res) => {
//   console.log ('the test route is /REMINDERS/ !');
// });

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
      res.json (receivedInfo); // ???
    })
    .catch (err => {
      console.log (err);
    });
});

//DELETE
router.get ('/delete', (req, res) => {
  console.log ('Loggigng delete route', {_id: req.query.id});

  Reminders.findByIdAndDelete ({_id: req.query.id})
    .then (deletedData => {
      console.log ('Im deleting this: ', deletedData);
      res.send ({message: `succesfully deleted ${deletedData}`});
    })
    .catch (err => {
      console.log (err);
    });
});

module.exports = router;

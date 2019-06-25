const express = require ('express');
const router = express.Router ();
const Reminders = require ('../models/Reminders');
const moment = require ('moment');
moment ().format ();

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

// GET reminders from the DB for REMINDER view STARTING from today: //userId: req.query.id, date: new Date ()
router.get ('/get', (req, res, next) => {
  // console.log ('LOGGING: req /get route', req.query.id);
  Reminders.find ({
    $and: [
      {userId: req.query.id},
      // {date: {$gte: today.toDate ()}} ERROR - today is not defined
    ],
  })
    .sort ({date: 1})
    .then (receivedInfo => {
      console.log (receivedInfo);
      res.json (receivedInfo); // ???
    })
    .catch (err => {
      console.log (err);
    });
});

//
router.get ('/statistics', (req, res, next) => {
  // console.log ('LOGGING: req /statistics route', req.query);
  Reminders.count ({userId: req.query.userId})
    .then (remindersCount => {
      res.json (remindersCount);
    })
    .catch (err => {
      console.log (err);
    });
});

//GET SELECTED DAY reminders per user:
// router.get ('/selectedday', (req, res, next) => {
//   console.log ('LOGGING: req /selectedday req.query', req.query);
//   debugger;
//   Reminders.find ({
//     $and: [{userId: req.query.id}, {date: req.query.date}],
//     // {userId: req.query.id},
//   })
//     .sort ({date: 1})
//     .then (receivedInfo => {
//       console.log ('logging /selectedday:', receivedInfo);
//       res.json (receivedInfo);
//     })
//     .catch (err => {
//       console.log (err);
//     });
// });

//GET SELECTED DAY reminders per user:
router.get ('/selectedday', (req, res, next) => {
  console.log ('LOGGING: req /selectedday req.query', req.body);

  let date = new Date (req.body.date);
  // req.body.date.moment ().format ('Do MMM YYYY');
  // new Date("2016-05-18T16:00:00Z")

  Reminders.find ({
    $and: [{userId: req.body.id}, {date: date}],
  })
    .then (receivedInfo => {
      console.log ('logging /selectedday:', receivedInfo);
      res.json (receivedInfo);
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

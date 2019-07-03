const express = require ('express');
const router = express.Router ();
const Reminders = require ('../models/Reminders');
const moment = require ('moment');

//  create new reminder:
router.post ('/create', (req, res, next) => {
  Reminders.create (req.body)
    .then (insertedInfo => {
      console.log ('logging CREATE path ' + insertedInfo);
      res.json (insertedInfo);
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
router.get ('/selectedday', (req, res, next) => {
  console.log ('LOGGING: req /selectedday req.query', req.body);

  let date = new Date (req.body.date);
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

// EDIT
// Users is updating reminder details:
router.post ('/remindersedit', (req, res, next) => {
  const {first_name, email_address, password, phone_number} = req.body;
  console.log ('LOGGING:router.profileedit route', req.body);
  Reminders.findOneAndUpdate (
    {_id: req.body._id},
    {
      $set: {
        id: req.body.id,
        date: req.body.date,
        remindMe: req.body.remindMe,
        text: req.body.text,
        gridRadios: req.body.gridRadios,
        userId: req.body.userId,
      },
    }
    // {new: true}
  )
    .then (receivedInfo => {
      console.log ('Console logging profileedit', receivedInfo);
      res.json (receivedInfo);
    })
    .catch (err => {
      console.log (err);
    });
});

module.exports = router;

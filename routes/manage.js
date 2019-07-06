const express = require ('express');
const router = express.Router ();
const Reminders = require ('../models/Reminders');
const User = require ('../models/User');

// manage
router.get ('/', (req, res, next) => {
  User.find ({})
    .sort ({first_name: 1})
    .then (all => {
      console.log (all);
      res.json (all);
    })
    .catch (err => {
      console.log (err);
    });
});

// Upgrade to Premium: premium = 'Yes'
router.get ('/upgrade', (req, res, next) => {
  User.updateOne ({_id: req.query.id}, {$set: {premium: 'Yes'}})
    .then (all => {
      console.log (all);
      res.json (all);
    })
    .catch (err => {
      console.log (err);
    });
});

module.exports = router;

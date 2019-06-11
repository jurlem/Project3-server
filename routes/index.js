const express = require ('express');
const router = express.Router ();
const Reminders = require ('../models/Reminders');

/* GET home page */
router.get ('/', (req, res, next) => {
  res.render ('index');
});

module.exports = router;

const express = require ('express');
const router = express.Router ();

/* GET home page */
router.get ('/', (req, res, next) => {
  res.render ('index');
});

router.post ('/test', function (req, res) {
  console.log ('the test route is hit!');
});

module.exports = router;

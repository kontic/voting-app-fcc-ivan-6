var express = require('express')
  , Poll = require('../models/poll')
  , router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  Poll.find({}, 'user_name poll_name link_code', function(err, polls){
    if (err) throw err;
    res.render('index', { 
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      polls: polls
    });
  });
  
});

module.exports = router;


var express = require('express')
  , router = express.Router();

//render login page
router.get('/', function(req, res, next) {
  res.render('show_link_to_poll', { 
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    new_url: req.protocol + '://' + req.get('host') + '/' + req.query.new_url
  });
});

module.exports = router;
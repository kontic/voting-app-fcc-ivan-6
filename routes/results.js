var express = require('express')
  , Poll = require('../models/poll')
  , router = express.Router();

/* show poll results */
router.get('/', function(req, res, next) {
  var url = (req.originalUrl).substr(7);
  var link_code = url.substr(url.length - 20);

  Poll.findOne({link_code: link_code}, function(err, poll){
    if (err) throw err;
    var poll_name = poll.poll_name;
    var options = poll.options;
    var poll_owner = poll.user_name;

    res.render('results', { 
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      poll_owner: poll_owner,
      poll_name: poll_name,
      options: options,
      link_code: link_code
    });

  });
  
});

module.exports = router;



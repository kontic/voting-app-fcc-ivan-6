var express = require('express')
  , Poll = require('../models/poll')
  , router = express.Router();

/* my polls */
router.get('/', function(req, res, next) {
  
  if(req.isAuthenticated()){
    
    Poll.find({user_name: req.user.name}, 'poll_name link_code', function(err, polls){
      if (err) throw err;
      res.render('my_polls', { 
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        polls: polls
      });
    });
  }else{
    res.redirect('/login');
  }
    
});

/* delete one of my polls */
router.post('/', function(req, res, next) {

  Poll.remove({ link_code: req.body.for_delete }, function (err) {
    if (err) throw err;
    // removed!
    res.redirect('/my_polls');
  });

});


module.exports = router;

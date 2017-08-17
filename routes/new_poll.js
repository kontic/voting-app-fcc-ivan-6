var express = require('express')
  , Poll = require('../models/poll')
  , random_string = require('./random_string')
  , router = express.Router();

/* new poll */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('new_poll', { 
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  }else{
    res.redirect('/login');
  }
  
});

//responds to validation from singup frontend page (if user exists => 'ok' else =>'not ok')
router.post('/', function(req, res){
  var options_temp = [];
  var index = 1;
  while(req.body.hasOwnProperty('options_' + index)){
    options_temp.push({option_name: req.body['options_' + index]});
    index++;
  }
  var random_part = random_string(20);
  var poll = new Poll({
    user_name: req.user.name,
    poll_name: req.body.poll_name,
    options: options_temp,
    link_code: random_part
  });
  
  poll.save(function (err) {
    if (err) return console.error(err);
    // saved!
  });
  
  //-------proba-----------
  
  poll.options.push({option_name: 'Heloooooooooo', option_value: 1});
  poll.save(function (err) {
    if (err) return console.error(err);
    // saved!
  });
  
  //-----------------------
  
  res.redirect('/show_link_to_poll/?new_url=polls/' + req.user.name + '/' + random_part);
});

module.exports = router;

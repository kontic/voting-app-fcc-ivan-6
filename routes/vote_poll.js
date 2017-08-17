var express = require('express')
  , Poll = require('../models/poll')
  , router = express.Router();

/* vote poll */
/*
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
*/

//responds to validation from singup frontend page (if user exists => 'ok' else =>'not ok')
router.post('/', function(req, res){
  if(req.body.hasOwnProperty('options_1')){
    Poll.findOne({link_code: req.body.link_code}, function(err, poll){
      if (err) throw err;
      poll.options.push({option_name: req.body.options_1, option_value: 1});
      poll.save(function (err) {
        if (err) return console.error(err);
        // saved!
      });
    });
  }else{
    Poll.findOne({link_code: req.body.link_code}, function(err, poll){
      if (err) throw err;
      for(var i = 0; i < poll.options.length; i++){
        if(poll.options[i]._id.equals(req.body.radio_poll)){
          poll.options[i].option_value = poll.options[i].option_value + 1;
          poll.save(function (err) {
            if (err) return console.error(err);
            // saved!
          });
          break;
        }
      }
    });
  }
  res.end();
  
    /*
    
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
  
  */
  
});

module.exports = router;

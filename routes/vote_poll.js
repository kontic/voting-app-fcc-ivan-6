var express = require('express')
  , Poll = require('../models/poll')
  , router = express.Router();


//voting (registered user can add option which she wish)
router.post('/', function(req, res){
  var poll_owner = "";
  if(req.body.hasOwnProperty('options_1')){
    Poll.findOne({link_code: req.body.link_code}, function(err, poll){
      if (err) throw err;
      poll_owner = poll.user_name;
      poll.options.push({option_name: req.body.options_1, option_value: 1});
      poll.save(function (err) {
        if (err) return console.error(err);
        // saved!
        res.redirect('/results/' + poll_owner + '/' + req.body.link_code);
      });
    });
  }else{
    Poll.findOne({link_code: req.body.link_code}, function(err, poll){
      if (err) throw err;
      for(var i = 0; i < poll.options.length; i++){
        if(poll.options[i]._id.equals(req.body.radio_poll)){
          poll_owner = poll.user_name;
          poll.options[i].option_value = poll.options[i].option_value + 1;
          poll.save(function (err) {
            if (err) return console.error(err);
            // saved!
            res.redirect('/results/' + poll_owner + '/' + req.body.link_code);
          });
          break;
        }
      }
    });
  }
  
  
});

module.exports = router;

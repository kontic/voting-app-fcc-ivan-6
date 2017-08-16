var express = require('express');
var router = express.Router();

/* GET home page. */
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
  var index = 1;
  while(req.body.hasOwnProperty('options_' + index)){
    console.log(req.body['options_' + index]);
    index++;
  }
  res.redirect('/');
});

module.exports = router;




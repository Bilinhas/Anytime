var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.redirect("/users/signup")
  res.render('login', {
    title: 'Enter your user data:', 
    user: 'Username: ',
    pass: 'Password: ',
    btn: 'SUBMIT',
    bg: '/stylesheets/imagens/synth.PNG'
  });
  console.log("Página 'login' acessada em ("+req.requestTime+").")
});

module.exports = router;

var express = require('express');
var router = express.Router();
var bookshelf = require("../db/bookshelf");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var jwtSecret = "asdfkladsfasdfsd";

var Users = bookshelf.Model.extend({
  tableName: 'users'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  Users.where('email',email ).fetch().then(function(usr) {
    user = usr.toJSON();
    var hshed_pwd =user.password;
    bcrypt.compare(password, hshed_pwd, function(err, response) {
      if (response){
        var user_bundle = {email: user.email }
        var token  = jwt.sign({user_bundle}, jwtSecret);
        res.json({username: user.name, token: token});
        console.log("success logging in a user");
      }else{
        console.log("bad password");
        res.json({logged_in: false});
      }
      console.log("log in status  "+logged_in);
      res.json({logged_in: false});
    });

  }).catch(function(err) {
    console.error(err);
    console.log("error logging in a user");
    res.json({logged_in: false});
  });
});

module.exports = router;

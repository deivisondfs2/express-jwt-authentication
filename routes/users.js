var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../config/auth'); 

import jwt from "jwt-simple";
import cfg from '../config/env';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(
    { 
      msg : 'respond with a resource'
    }
  );
});

/* GET users listing. */
router.post('/create', function(req, res, next) {
  var User = mongoose.model('User');
  var User = new User(req.body);
  User.save()
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
    
});


router.post('/token', (req, res, next) => {
    if(req.body.username && req.body.password){
        const userName = req.body.username;
        const password = req.body.password;
        User.findOne({username : userName})
            .then(user => {              
                if(user.isPassword(user.password, password)){
                    const payload = {id : user.id};
                    res.json({ 
                        token : jwt.encode(payload, cfg.jwtSecret)
                    });
                }else{
                    res.sendStatus(401);
                }
            })
            .catch(error => res.sendStatus(401));

    }else{
        res.sendStatus(401);
    }
});

router.get("/profile", auth().authenticate(), function(req, res, next) {  
    res.json({msg : req.user});
    // console.log(req);
    // res.json(User[req.user.id]);    
});

module.exports = router;

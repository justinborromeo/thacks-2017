var User = require('../models/user');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');


exports.token = function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    console.log(username + password);
    User.find({username:username, password: password}, function(err,user){
        if(err){
            console.log(err);
            response.status(502).send();
        }else if(typeof(user)==="undefined" || user.length==0){
            response.status(401).send();
        }else{
            var token = jwt.sign({expiresIn: "1d", sub:username}, config.hmacsecret);
            var result={};
            result.access_token=token;
            result.expires_in="86400";
            result.token_type="Bearer";
            response.status(200).send(result);
        }
    });
};
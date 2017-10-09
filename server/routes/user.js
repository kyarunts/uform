var mongoose = require( 'mongoose' );
var User = require('../models/user');
var jwt = require('jsonwebtoken'); 
var config = require('../config');
var Form = require('../models/form');



exports.signup = function(req, res, next){
    console.log(req.body);
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullName || !email || !password) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

        if (existingUser) {
            return res.status(201).json({
                success: false,
		message: 'Email already exists.'
            });
        }

        let  newUser = new User({
            fullName: fullName,
            email: email,
            password: password
        });

        newUser.save(function(err, newUser) {
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
            var token = jwt.sign(newUser, config.secret, {
                expiresIn: config.tokenexp
            });
            res.status(201).json({
                success: true,
                message: {'userid': newUser._id, 'username': newUser.username, 'firstname': newUser.firstname},
                token: token
            });
        });
    });
}

exports.login = function(req, res, next){
    User.findOne({ email: req.body.email }, function(err, user) {
		if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

		if (!user) {
			res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
		}else if (user) {
			user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user, config.secret, {
			            expiresIn: config.tokenexp
		            });
                        res.status(201).json({
                            success: true,
                            message: {'userid': user._id, 'username': user.username, 'firstname': user.firstname},
                            token: token
                        });
                } else {
                    res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
                }
            });	
		}
	});
}

exports.authenticate = function(req, res, next){
    console.log('authenticate');
	var token = req.body.token || req.query.token || req.headers['authorization'];
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {			
			if (err) {
				return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });		
			} else {
				req.decoded = decoded;	
				next();
			}
		});
	} else {
		return res.status(201).json({ 
			success: false, 
			message: 'Fatal error, Authenticate token not available.',
            		errcode: 'no-token'
		});
	}
}

exports.getuserDetails = function(req, res, next){
    User.find({_id:req.params.id}).exec(function(err, user){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
        res.status(201).json({
		success: true, 
		data: user
	});
    });
}

exports.updateUser = function(req, res, next){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
	const userid = req.params.id;

    if (!firstname || !lastname || !email || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {
	User.findById(userid).exec(function(err, user){
		if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
			
		if(user){
			user.firstname = firstname;
			user.lastname = lastname;
			user.email = email;
		}
		user.save(function(err){
			if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
			res.status(201).json({
				success: true,
				message: 'User details updated successfully'
			});
		});
	});
   }
}

exports.updatePassword = function(req, res, next){
    const userid = req.params.id;
    const oldpassword = req.body.oldpassword;
    const password = req.body.password;

    if (!oldpassword || !password || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {
        
	User.findOne({ _id: userid }, function(err, user) {
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
            if (user) {
                user.comparePassword(oldpassword, function (err, isMatch) {
                    if (isMatch && !err) {
                        
                        user.password = password;

                        user.save(function(err) {
                            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

                            res.status(201).json({
                                success: true,
                                message: 'Password updated successfully'
                            });
                        });
                    } else {
                        res.status(201).json({ success: false, message: 'Incorrect old password.' });
                    }
                });	
            }
        });
    }
}
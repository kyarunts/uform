var jwt = require('jsonwebtoken'); 
var config = require('../config');
var Form = require('../models/form');

exports.updateform = function(req, res, next) {
    Form.findById(req.params.id).exec(function(err, form) {
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        if(form) {
            form.form = req.body.form;
            form.save(function(err){
                if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
                res.status(201).json({
                    success: true,
                    message: 'Form details updated successfully'
                });
            });
        }
    })
}


exports.deleteform = function(req, res, next) {
    Form.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error deleting form '}); }
        res.status(201).json({
		    success: true,
		    message: 'Form deleted successfully'
	    });
    });
}

exports.getforms = function(req, res, next) {
    let token = req.headers['authorization'];
    jwt.verify(token, config.secret, function(err, decoded) {
        Form.find({ 'creator.id': decoded._doc._id }).exec(function(err, forms) {
            if (err) {
                return res.status(201).json({ success: false, message: 'Error on request', });		
            }
            if(forms) {
                res.json(forms);
            } else {
                res.json({message: 'Requested form not found'})
            }
        })
    })
}

exports.getform = function(req, res, next) {
    Form.find({ _id: req.params.id }).select('-creator.id').exec(function(err, form) {
        if (err) {
            return res.status(201).json({ success: false, message: 'Error on request'});		
        }
        if(form.length > 0) {
            res.json(form[0]);
        } else {
            res.json({message: 'Requested form not found'})
        }
    })
}


exports.formsave = function(req, res, next) {
    let token = req.headers['authorization'];
    jwt.verify(token, config.secret, function(err, decoded) {			
        if (err) {
            return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });		
        } else {
            console.log(decoded);
            let newForm = new Form();
            let creator = {
                id : decoded._doc._id,
                fullName: decoded._doc.fullName,
                email : decoded._doc.email
            };
            newForm.creator = creator;
            newForm.form = req.body.form;
            newForm.save(function(err, form) {
                if(err) {
                    return res.status(201).json({ success: false, message: 'Can\'t save form'});
                }
                else {
                    return res.status(201).json({ success: true, message: 'Form saved'})
                }
            })
        }
    });

}
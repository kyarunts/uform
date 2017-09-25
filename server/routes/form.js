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
        if(err){ res.status(400).json({ success: false, message: 'Error deleting form '+ err }); }
        res.status(201).json({
		    success: true,
		    message: 'Form deleted successfully'
	    });
    });
}

exports.getforms = function(req, res, next) {
    let token = req.headers['authorization'];
    jwt.verify(token, config.secret, function(err, decoded) {
        Form.find({ creator: decoded._doc._id }).exec(function(err, forms) {
            res.json(forms.map);
        })
    })
}

exports.getform = function(req, res, next) {
    Form.find({ _id: req.params.id }).exec(function(err, form) {
        res.json(form);
    })
}


exports.formsave = function(req, res, next) {
    let token = req.headers['authorization'];
    jwt.verify(token, config.secret, function(err, decoded) {			
        if (err) {
            return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });		
        } else {
            let newForm = new Form();
            newForm.creator = decoded._doc._id;
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
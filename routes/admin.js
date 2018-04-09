var express = require('express');
var router = express.Router();
var helper = require('./../helpers/helper');
var keyConfig = require('./../config');

router.get('/', function (req, res, next) {
	console.log(req.JWTData);
	if (req.JWTData.userType == 'admin') {
		res.render('admin', {
			JWTData: req.JWTData
		});
	} else {
		res.redirect('/login');
	}
});

router.get('/login', function (req, res, next) {
	if (req.JWTData.userType == 'admin') {
		res.redirect('/admin');
	} else {
		res.render('login', {
			JWTData: req.JWTData
		});
	}
});

router.get('/logout', function (req, res, next) {
	res.clearCookie('token');
	res.redirect('/');
});

router.post('/login', function (req, res, next) {
	req.app.db.models.Admin.findOne({
		'login_id': req.body.login_id
	}, function (err, data) {
		if (err) {
			console.log(err);
			return res.send(err);
		}
		if (data.password == req.body.password) {
			var payload = {
				userType: 'admin',
				firstName: 'Admin'
			};
			var token = req.app.jwt.sign(payload, req.app.jwtSecret);
			// add token to cookie
			res.cookie('token', token);
			
			res.redirect('/admin');
		} else {
			res.redirect('/login');
		}
	});
});

router.get('/fetchvoters', function (req, res, next) {
    
	req.app.db.models.Voter.find({}, function (err, data) {
		if (err) {
			console.log(err);
			return res.send(err);
		}
		res.send(data);
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var helper = require('./../helpers/helper');
var keyConfig = require('./../config');

router.get('/', function (req, res, next) {
	if (req.JWTData.userType == 'admin') {
		req.app.db.models.Voter.find({}, {
			"image": false
		}, function (err, data) {
			if (err) {
				console.log(err);
				return next(err);
			}

			req.app.db.models.Candidate.find({}, function (err, candidates) {
				if (err) {
					console.log(err);
					return next(err);
				}

				return res.render('admin', {
					JWTData: req.JWTData,
					voters: data,
					candidates: candidates
				});
			});
		});
	} else {
		return res.redirect('/admin/login');
	}
});

router.get('/login', function (req, res, next) {
	if (req.JWTData.userType == 'admin') {
		return res.redirect('/admin');
	} else {
		return res.render('login', {
			JWTData: req.JWTData
		});
	}
});

router.get('/verifyvoter/:id', function (req, res, next) {
	if (req.JWTData.userType == 'admin') {

		req.app.db.models.Voter.findById(req.params.id, function (err, data) {
			if (err) {
				console.log(err);
				return next(err);
			}
			data.isValid = true;

			data.save();

			return res.redirect('/admin');
		});
	} else {
		return res.redirect('/admin/login');
	}
});

router.get('/logout', function (req, res, next) {
	res.clearCookie('token');
	return res.redirect('/');
});

router.post('/login', function (req, res, next) {
	console.log('Entered post /login');

	req.app.db.models.Admin.findOne({
		'login_id': req.body.login_id
	}, function (err, data) {
		if (err) {
			console.log(err);
			return next(err);
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
			res.redirect('/admin/login');
		}
	});
});

router.get('/fetchvoters', function (req, res, next) {

	req.app.db.models.Voter.find({}, function (err, data) {
		if (err) {
			console.log(err);
			return next(err);
		}
		res.send(data);
	});
});

router.post('/addcandidate', function (req, res, next) {
	var candidate ={
		name: req.body.cand_name,
		constituency: req.body.cand_constituency
	}

	req.app.db.models.Candidate.create(candidate, function (err, data) {
		if (err) {
			console.log(err);
			return next(err);
		}
		return res.redirect('/admin');
	});
});

module.exports = router;
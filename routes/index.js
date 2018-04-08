var express = require('express');
var router = express.Router();
var multer = require('multer');
var QRCode = require('qrcode');
var helper = require('./../helpers/helper');
var keyConfig = require('./../config');
var QrCode = require('qrcode-reader');
var Jimp = require("jimp");

var upload = multer({
	dest: 'uploads/'
});


router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/vote', function (req, res, next) {
	res.render('vote');
});

router.get('/register', function (req, res, next) {
	res.render('register');
});

router.get('/results', function (req, res, next) {
	res.render('results');
});

router.get('/admin', function (req, res, next) {
	console.log(req.JWTData);
	if (req.JWTData.userType == 'admin') {
		res.render('admin');
	} else {
		res.redirect('/login');
	}
});

router.get('/login', function (req, res, next) {
	if (req.JWTData.userType == 'admin') {
		res.redirect('/admin');
	} else {
		res.render('login');
	}
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
				userType: 'admin'
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

router.get('/test', function (req, res, next) {
	helper.test(5, function (data) {
		res.send(data.toString());
	});
});

router.post('/register', upload.single('avatar'), function (req, res, next) {
	console.log("entered /register");

	var voterDetails = {
		name: req.body.name,
		aadhaar: req.body.aadhaar,
		image: req.body.avatar,
		hasVoted: false,
		isValid: false,
		constituency: req.body.constituency
	}

	console.log(voterDetails);

	req.app.db.models.Voter.create(voterDetails, function (err, data) {
		if (err) {
			console.log(err);
			return res.send(err);
		}

		var voterID = JSON.stringify(data._id);

		QRCode.toDataURL(voterID, function (err, url) {
			console.log(url);
			var im = url.split(",")[1];
			var img = new Buffer(im, 'base64');

			res.writeHead(200, {
				'Content-Type': 'image/png',
				'Content-Length': img.length,
				'Content-Disposition': 'attachment; filename="Voter_QR.png"'
			});
			res.end(img);
		})
	});
});

router.post('/verifyvoter', upload.any(), function (req, res, next) {

	var qr_uri = req.body.qrdata;
	var avatar_uri = req.body.avatar;
	var qr = new QrCode();
	var face1, face2;

	var buffer = new Buffer(qr_uri.split(",")[1], 'base64');

	console.log("entered");

	Jimp.read(buffer, function (err, image) {
		if (err) {
			console.error(err);
			// TODO handle error
		}

		qr.callback = function (err, value) {
			if (err) {
				console.error(err);
				// TODO handle error
			}

			var id = value.result.substr(1).slice(0, -1);

			req.app.db.models.Voter.findById(id, function (err, data) {
				if (err) {
					console.log(err);
				}
				// if (data.hasVoted == true || data.isValid == false) {
				if (false) {
					return res.send('You are not allowed to Vote.');
				} else {
					console.log('Entered here');
					console.log(data.image);

					helper.sendImageToMicrosoftDetectEndPoint(data.image, function (responseA) {
						console.log(responseA);
						responseA = JSON.parse(responseA);
						console.log(responseA[0].faceId);

						face1 = responseA[0].faceId;

						helper.sendImageToMicrosoftDetectEndPoint(avatar_uri, function (responseB) {
							console.log(responseB);
							responseB = JSON.parse(responseB);
							face2 = responseB[0].faceId;

							var payload = JSON.stringify({
								faceId1: face1,
								faceId2: face2
							});

							helper.sendImageToMicrosoftVerifyEndPoint(payload, function (response) {
								console.log(response);
								return res.send(response);
							});
						});
					});
				}
			});
		};
		qr.decode(image.bitmap);
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var multer = require('multer');
var QRCode = require('qrcode');

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

router.post('/register', upload.single('avatar'), function (req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log("reached 1");
	var voterDetails = {
		name: req.body.name,
		aadhaar: req.body.aadhaar,
		image: req.body.avatar,
		hasVoted: false,
		isValid: false,
		constituency: req.body.constituency
	}

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
	})
});

module.exports = router;
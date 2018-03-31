var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});
var QRCode = require('qrcode');


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
  res.render('admin');
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
  console.log("reached 2");

  req.app.db.models.Voter.create(voterDetails, function (err, data) {
    console.log("reached 3");

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

    // res.send(data);
  })
});

module.exports = router;
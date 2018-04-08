var keyConfig = require('./../config');
var request = require('request');

var dataURItoBuffer = function (dataURL, callback) {
	var buff = new Buffer(dataURL.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
	callback(buff);
};

var sendImageToMicrosoftDetectEndPoint = function (imageData, callback) {
	console.log('Entered helper');
	dataURItoBuffer(imageData, function (buff) {
		request.post({
			url: keyConfig.microsoftDetectURL + "?returnFaceId=true",
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': keyConfig.microsoftApiKey
			},
			body: buff,
			// encoding: null
		}, function (err, httpResponse, body) {
			callback(body);
		});
	});
}

var sendImageToMicrosoftVerifyEndPoint = function (imageObj, callback) {
	console.log('Entered helper');
	console.log(imageObj)

	request.post({
		url: keyConfig.microsoftVerifyURL,
		headers: {
			'Content-Type': 'application/json',
			'Ocp-Apim-Subscription-Key': keyConfig.microsoftApiKey
		},
		body: imageObj,
	}, function (err, httpResponse, body) {
		callback(body);
	});
}

exports.test = function (arg, callback) {
	console.log("#################### TEST ######################");
	console.log(arg);
	var val = arg + 5;
	callback(val);
}

exports.dataURItoBuffer = dataURItoBuffer;
exports.sendImageToMicrosoftDetectEndPoint = sendImageToMicrosoftDetectEndPoint;
exports.sendImageToMicrosoftVerifyEndPoint = sendImageToMicrosoftVerifyEndPoint;
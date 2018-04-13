var unless = require('express-unless');

module.exports.makeAuthHappen = function (options) {
    var middleware = function (req, res, next) {

        //check if cookie exists

        if (!req.cookies || !req.cookies.token) {
            //if it does not exist create token

            var payload = {
                userType: 'guest',
                firstName: 'Guest'
            };

            var token = req.app.jwt.sign(payload, req.app.jwtSecret);

            // add token to cookie
            res.cookie('token', token);

            req.JWTData = payload;

            next();
            return;
        }

        // if cookie exists, decode and store
        var decoded = req.app.jwt.decode(req.cookies.token);
        req.JWTData = decoded;

        next();
    };

    middleware.unless = unless;

    return middleware;

};
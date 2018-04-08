var unless = require('express-unless');

module.exports.makeAuthHappen = function(options) {
    var middleware = function (req, res, next) {

        //check if cookie exists

        if(!req.cookies || !req.cookies.token){
            //if it does not exist create token

            var payload = {
                userType : 'guest',
                firstName : 'Guest',
                id : uuidV4()
            };
            
            var token = req.app.jwt.sign(payload, req.app.config.jwtSecret);

            // add token to cookie
            res.cookie('token', token);
            res.cookie('site_settings', JSON.stringify(req.app.config.siteSettings));

            req.JWTData = payload;
            req.siteSettings = req.app.config.siteSettings;

            next();
            return;
        }

        // if cookie exists, decode and store
        var decoded = req.app.jwt.decode(req.cookies.token);
        req.JWTData = decoded;
        if(req.cookies.site_settings){
            req.siteSettings = JSON.parse(req.cookies.site_settings);

        }
        else{
            req.siteSettings = req.app.config.siteSettings;

        }
        console.log('############ DECODED####');
        next();

    };

    middleware.unless = unless;

    return middleware;

};

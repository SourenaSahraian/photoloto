const routes = require('express').Router();
const passport = require('passport');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

/**
 *  TODO Starting with session storage - swap with JWT
 */
routes.get('/login', (req, res) => {
    res.send('hi from the login page');
});

routes.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// exchange security code with profileinfo
routes.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

  //  console.log('hey object after ', req.user.toJSON())
    const jwtUser = jwt.sign(req.user.toJSON(), keys.jwtSignatureKey);
    //anything on req.session will be automatically placed in cookie by cookie-session lib
    req.session.jwt = jwtUser
    res.send('redirect intercepted' + JSON.stringify(req.session.jwt));
});

module.exports = routes;



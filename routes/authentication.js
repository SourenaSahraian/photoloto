const routes = require('express').Router();
const passport = require('passport');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

routes.get('/api/user/test', currentUser, requireAuth, (req, res) => {
    res.send('test was successful ');
})


routes.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// exchange security code with profileinfo
routes.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

    const jwtUser = jwt.sign(req.user.toJSON(), keys.jwtSignatureKey);
    //anything on req.session will be automatically placed in cookie by cookie-session lib
    req.session.jwt = jwtUser
    res.send('redirect intercepted' + JSON.stringify(req.session.jwt));
});

//TOOD should really be a post, not sure about doing oAuth through postman
routes.get('/api/user/signout', (req, res) => {
    req.session = null;
    res.send({});
})

module.exports = routes;



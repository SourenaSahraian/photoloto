const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

/**
 * This middlware will be used by all services , the purpose of it being, extracing
 * and decoding user's info encoded in the JWT.
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
const currentUser = (req, res, next) => {

    if (!req.session?.jwt) {
        req.currentUser = null;
    }
    try {
        const payload = jwt.verify(req.session.jwt, keys.jwtSignatureKey);
        req.currentUser = payload;

        next();
    } catch (ex) {
        console.error('JWT token not valid !', ex);
    }

    next();

}
module.exports = currentUser;
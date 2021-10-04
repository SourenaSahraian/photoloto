const UnAuthorizedError = require('../erros/UnAuthorizedError');

const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new UnAuthorizedError();
    }
    next();
}

module.exports = requireAuth;
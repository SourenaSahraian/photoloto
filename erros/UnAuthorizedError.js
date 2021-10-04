const CustomError = require('./CustomError');

class UnAuthorizedError extends CustomError {

    constructor() {
        super('403', 'unauthorized user denid');
    }

}

module.exports = UnAuthorizedError;

const CustomError = require('./CustomError')
/**
 *  interceopted by the express in case of an error
 * @param {*} error 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const genericErrorHandler = (error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.getStausCode()).send(error.getMessage());
    }

}

module.exports = genericErrorHandler;
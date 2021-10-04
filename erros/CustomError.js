class CustomError extends Error {

    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    getStausCode() {
        return this.statusCode;
    }
    getMessage() {
        return this.message;
    }

}

module.exports = CustomError;
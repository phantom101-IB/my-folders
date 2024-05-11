const CustomeAPIError = require("./custome-error")
const { StatusCodes } = require("http-status-codes")

class NotFound extends CustomeAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound

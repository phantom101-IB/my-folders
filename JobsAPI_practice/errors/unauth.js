const CustomeAPIError = require("./custome-error")
const { StatusCodes } = require("http-status-codes")

class UnAuth extends CustomeAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuth

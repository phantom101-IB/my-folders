const badRequestError = require("./bad-request")
const CustomeAPIError = require("./custome-error")
const notFoundError = require("./not-found")
const unAuthError = require("./unauth")

module.exports = {
    badRequestError,
    CustomeAPIError,
    notFoundError,
    unAuthError,
}

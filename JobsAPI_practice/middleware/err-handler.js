const { CustomeAPIError } = require("../errors")
const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = async (err, req, res, next) => {
    // console.log(err)
    let CustomeError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong",
    }

    if (err.code && err.code === 11000) {
        CustomeError.statusCode = StatusCodes.BAD_REQUEST
        CustomeError.msg = `User with email: ${err.keyValue["email"]} already exist`
    }

    if (err.name === "ValidationError") {
        CustomeError.statusCode = StatusCodes.BAD_REQUEST
        CustomeError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",")
    }

    if (err.name === "CastError") {
        CustomeError.statusCode = StatusCodes.BAD_REQUEST
        CustomeError.msg = `Cannot Find job with ${err.value._id}`
    }

    if (err instanceof CustomeAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    // return res
    //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
    //     .send("Something went wrong, try again later")
    return res.status(CustomeError.statusCode).json(CustomeError.msg)
    next()
}

module.exports = errorHandlerMiddleware

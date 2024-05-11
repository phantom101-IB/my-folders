const User = require("../model/userModel")
const { StatusCodes } = require("http-status-codes")
const { badRequestError, notFoundError } = require("../errors")

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).json({ name: user.name, token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new badRequestError("Please provide email and password")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new notFoundError(`No user found for ${email}`)
    }

    const correctPassword = await user.comparePassword(password)

    if (!correctPassword) {
        throw new badRequestError("Incorrect Password")
    }
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ name: user.name, token })
}

module.exports = {
    register,
    login,
}

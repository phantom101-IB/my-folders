const { unAuthError } = require("../errors")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new unAuthError("No Headers available")
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { userId, name } = payload
        req.user = { userId, name }
        next()
    } catch (error) {
        throw new unAuthError("Invalid token, Access Denied")
    }
}

module.exports = authMiddleware

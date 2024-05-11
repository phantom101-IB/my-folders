const mongoose = require("mongoose")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: 30,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6,
    },
})

UserSchema.pre("save", async function (next) {
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

UserSchema.methods.comparePassword = async function (providedPassword) {
    const isMatch = await bycrypt.compare(providedPassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)

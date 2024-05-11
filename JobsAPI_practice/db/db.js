const mongoose = require("mongoose")

const connectDB = (url) => {
    return mongoose.connect(url, {
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        // useNewUrlParser: true,
    })
}

module.exports = connectDB

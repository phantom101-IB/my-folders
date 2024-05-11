require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()
// connect to database
const connectDB = require("./db/db")
// middleware
const notFoundMiddleware = require("./middleware/not-foundmiddleware")
const authMiddleware = require("./middleware/authorization")
const errHandler = require("./middleware/err-handler")

// Routes
const userRouter = require("./routes/user-route")
const jobRouter = require("./routes/job-route")

app.use(express.json())

app.use("/api/v1/auth", userRouter)
app.use("/api/v1/jobs", authMiddleware, jobRouter)

app.use(errHandler)
app.use(notFoundMiddleware)
const PORT = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Port ${PORT} is live...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

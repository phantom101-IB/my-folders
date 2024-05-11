const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Provide company"],
            maxlength: 30,
        },
        position: {
            type: String,
            required: [true, "Provide position"],
            mexlength: 30,
        },
        status: {
            type: String,
            enum: ["pending", "interview", "declined"],
            default: "pending",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Creator Required"],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Job", JobSchema)

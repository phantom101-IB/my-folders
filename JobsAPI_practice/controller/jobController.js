const { notFoundError } = require("../errors")
const Job = require("../model/jobModel")
const { StatusCodes } = require("http-status-codes")

const getAllJobs = async (req, res) => {
    const { userId, name } = req.user
    const job = await Job.find({ createdBy: userId }).sort("createdAt")
    res.status(StatusCodes.CREATED).json({ job, count: job.length })
}

const getJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req
    const job = await Job.findById({ _id: jobId, createdBy: userId })
    if (!job) {
        throw new notFoundError(`No job found for Id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!job) {
        throw new notFoundError(`No job found for Id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId })
    if (!job) {
        throw new notFoundError(`No job found for Id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ msg: "Job deleted successful" })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}

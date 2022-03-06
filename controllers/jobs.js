const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  console.log(req.user.userId);
  const jobs = await Job.find({ created_by: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId } } = req;

  const job = await Job.findOne({
    _id: jobId,
    created_by: userId,
  })

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
  req.body.created_by = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId }
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be epmty');
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, created_by: userId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({job});

}

const deleteJob = async (req, res) => {
  res.send('delete job');
}



module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
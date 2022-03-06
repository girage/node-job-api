const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFound } = require('../errors');

const getAllJobs = async (req, res) => {
  console.log(req.user.userId);
  const jobs = await Job.find({ created_by: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}
const getJob = async (req, res) => {
  res.send('get job');
}
const createJob = async (req, res) => {
  req.body.created_by = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
}
const updateJob = async (req, res) => {
  res.send('update job');
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
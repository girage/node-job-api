const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const NotFound = require('./not-found');

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFound,
}
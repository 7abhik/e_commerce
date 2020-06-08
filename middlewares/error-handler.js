const { handleError } = require('../helpers/error')
const { ErrorHandler } = require('../helpers/error')


exports.errorHandler = (err, req, res, next) => {
  handleError(err, res);
}
exports.pageNotAvailable = ('*', (req, res, next) => {
  next(new ErrorHandler(404, 'Page does not exists','Error:may be Controller file not included in server.js file'))
})
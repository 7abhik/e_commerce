const { handleError } = require('../helpers/error')
const { ErrorHandler } = require('../helpers/error')


exports.errorHandler = (err, req, res, next) => {
  handleError(err, res);
}
exports.pageNotAvailable = ('*', (req, res, next) => {
  next(new ErrorHandler(404, 'Page does not exists',error))
})
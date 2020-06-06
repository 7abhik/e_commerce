class ErrorHandler extends Error {
  constructor(statusCode, message,actualError) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.actualError = actualError;
  }
}
const handleError = (err, res) => {
  const { statusCode, message } = err;
  cl(err)
  res.status(statusCode||501).render('error/error',{
    status: "error",
    statusCode,
    message
  });
};
module.exports = {
  ErrorHandler,
  handleError
};

module.exports = (message = 'Internal Server Error', status = 500) => {
  const error = new Error(message);
  error.statusCode = status;
  return error;
};

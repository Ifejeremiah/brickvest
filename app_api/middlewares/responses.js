module.exports = {
  successResponse,
  errorResponse
}


function successResponse(res, message = 'Done successfully', data = null, statusCode = null) {
  const body = {
    status: 'success',
    message,
    data,
  }

  return res.status(statusCode | 200).json(body);
}


function errorResponse(res, message = 'Sorry, there is an error', statusCode, data = null) {
  const body = {
    status: 'error',
    message,
    data,
  }

  return res.status(statusCode | 400).json(body);
}

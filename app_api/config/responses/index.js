const successResponse = (res, message, data = null, statusCode = null) => {
  const response = {
    status: 'success',
    message,
    data
  }

  return res.status(statusCode | 200).json(response)
}


const errorResponse = (res, message = 'Sorry, There\'s an error', statusCode = null, data = null,) => {
  const response = {
    status: 'error',
    message,
    data
  }
  return res.status(statusCode | 400).json(response)
}


module.exports = { successResponse, errorResponse }
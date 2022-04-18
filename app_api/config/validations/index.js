module.exports = (schema) => (req, res, next) => {

  const { error } = schema.validate(req.body);


  if (error) {
    const response = {
      status: 'error',
      message: error.message,
      data: null
    }

    return res.status(400).json(response);
  } else {
    return next();
  }
}
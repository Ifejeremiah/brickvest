module.exports = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  } else if (!value.match(/\d/) && !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least a letter and a number');
  }

  return value;
};
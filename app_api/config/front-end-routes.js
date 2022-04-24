module.exports = { routes, response }

function routes() {
  return /(\/login)|(\/register)|(\/overview)|(\/explore)|(\/co-own)|(\/requests)|(\/profile)|(\/verify-account)|(\/recover-account)|(\/update-password)|(\/delete-account)|(\/location\/[a-z0-9]{24})/
}

function response(req, res, next) {
  return (req, res, next) => {
    res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
    next()
  }
}
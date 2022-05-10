const { Role } = require('../config')
const { Response } = require('../middlewares')


module.exports = function checkUser(req, res, id, forAdmin = false) {
  const roles = [ Role.Facilitator ];

  forAdmin ? roles.push(Role.Admin) : null;

  if (id !== req.user.id && !roles.includes(req.user.role)) {
    return Response.errorResponse(res, 'Unauthorized', 401);
  }
}
const { Role } = require('../config')
const { Response } = require('../middlewares')


module.exports = function checkUser(req, res, id, isAdmin = false) {
  // regular users can get their own record and admins can get any record

  const roles = [Role.Facilitator];

  isAdmin ? roles.push(Role.Admin) : null;

  if (id !== req.user.id && !roles.includes(req.user.role)) {
    return Response.errorResponse(res, 'Unauthorized', 401);
  }
}
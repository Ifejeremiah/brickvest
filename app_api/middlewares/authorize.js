const jwt = require('express-jwt');
const secret = process.env.JWT_SECRET;
const { db } = require('../config');

const { errorResponse } = require('./responses');

module.exports = function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret, algorithms: ['HS256'] }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await db.User.findById(req.user.id);

      if (!user || (roles.length && !roles.includes(user.role))) {
        // user no longer exists or role not authorized
        return errorResponse(res, 'Unauthorized', 401);
      }

      // authentication and authorization successful
      req.user.role = user.role;
      next();
    }
  ];
}

const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const requestRoute = require('./requests.route');
const dashboardRoute = require('./dashboard.route');


const routes = [
  {
    path: '/',
    route: authRoute
  },
  {
    path: '/users/requests',
    route: requestRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/',
    route: dashboardRoute
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
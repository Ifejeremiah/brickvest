const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const requestRoute = require('./requests.route');
const dashboardRoute = require('./dashboard.route');
const transactionRoute = require('./transaction.route')
const propertyRoute = require('./property.route')
const notifyRoute = require('./notify.route')


const routes = [
  {
    path: '/',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/requests',
    route: requestRoute
  },
  {
    path: '/',
    route: dashboardRoute
  },
  {
    path: '/transactions',
    route: transactionRoute
  },
  {
    path: '/properties',
    route: propertyRoute
  },
  {
    path: '/notifications',
    route: notifyRoute
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
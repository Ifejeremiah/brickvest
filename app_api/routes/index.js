const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const dashboardRoute = require('./dashboard.route');



const routes = [
  {
    path: '/',
    route: authRoute
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
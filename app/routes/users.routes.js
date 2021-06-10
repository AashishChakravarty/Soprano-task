const router = require('express').Router();

module.exports = function () {
  const users = require('../controllers/users');

  router.post('/', users.registration);

  router.post('/login', users.login);

  return router;
};

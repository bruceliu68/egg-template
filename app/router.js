'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/token', controller.token.index);
  router.post('/register', controller.register.create);
  router.post('/login', controller.login.index);
  router.get('/getUsers', app.jwt, controller.users.index);
};

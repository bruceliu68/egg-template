'use strict';

// had enabled by egg
// exports.static = true;
exports.security = {
  enable: false,
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

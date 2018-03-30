'use strict';

module.exports = appInfo => {
  // const config = exports = {};

  const config = {
    mysql: {
      client: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'lb123',
        database: 'egg_test',
      },
      app: true,
      agent: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520565593737_5229';

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ];
  // 只对 / 前缀的 url 路径生效
  config.errorHandler = {
    match: '/',
  };
  config.jwt = {
    secret: '123456',
  };

  return config;
};

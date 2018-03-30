'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  /**
   * author liubo
   * method: GET
   * url: /getUsers
   * description: 获取全部用户信息
   */
  async index() {
    const { ctx } = this;
    const res = await ctx.service.users.query();
    ctx.body = ctx.helper.responseCode(true, 'success', res);
  }

}

module.exports = UsersController;

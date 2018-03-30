'use strict';

const Controller = require('egg').Controller;
// 定义创建接口的请求参数规则
const indexRule = {
  mobile: 'string',
};

class TokenController extends Controller {
  /**
   * author liubo
   * method: GET
   * url: /token
   * description: 获取用户token
   */
  async index() {
    const { ctx, app } = this;
    ctx.validate(indexRule);
    const params = ctx.request.body;
    const token = app.jwt.sign({ mobile: params.mobile }, app.config.jwt.secret, { expiresIn: 5 * 60 });
    ctx.body = ctx.helper.responseCode(true, 'success', token);
  }

}

module.exports = TokenController;

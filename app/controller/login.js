'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const indexRule = {
  mobile: 'string',
  pwd: 'string',
  status: 'number',
};

class LoginController extends Controller {
  /**
   * author liubo
   * method: POST
   * url: /login
   * params: mobile|string pwd|string status|number
   */
  async index() {
    const { ctx, app } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(indexRule);
    const params = ctx.request.body;
    // 检测用户是否已注册
    const checkRes = await ctx.service.register.checkUser(params);
    if (checkRes) {
      if (params.pwd === checkRes.Pwd) {
        // 生成token，并返回给客户端,status:0 不记住信息 token保存2小时
        let token = '';
        if (params.status === 0) {
          token = app.jwt.sign({ mobile: params.mobile }, app.config.jwt.secret, { expiresIn: '2h' });
        } else {
          token = app.jwt.sign({ mobile: params.mobile }, app.config.jwt.secret, { expiresIn: '240h' });
        }
        ctx.body = ctx.helper.responseCode(true, '登录成功', token);
      } else {
        ctx.body = ctx.helper.responseCode(false, '密码错误');
      }
    } else {
      ctx.body = ctx.helper.responseCode(false, '账号未注册');
    }
  }

}

module.exports = LoginController;

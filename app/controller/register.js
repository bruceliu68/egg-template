'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  mobile: { type: 'string' },
  name: { type: 'string' },
  pwd: { type: 'string' },
  prepwd: { type: 'string' },
};

class RegisterController extends Controller {
  /**
   * author liubo
   * method: POST
   * url: /register
   * params: mobile|string name|string pwd|string prepwd|string
   */
  async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule);
    const params = ctx.request.body;
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(params.mobile)) { // 校验手机号
      ctx.body = ctx.helper.responseCode(false, '请输入正确手机格式');
    } else if (params.pwd !== params.prepwd) { // 校验密码是否一致
      ctx.body = ctx.helper.responseCode(false, '密码不一致');
    } else if (params.pwd.length < 6) { // 密码必须大于等于6个字符以上
      ctx.body = ctx.helper.responseCode(false, '密码必须大于等于6个字符以上');
    } else {
      // 检测用户是否已注册
      const checkRes = await ctx.service.register.checkUser(params);
      if (checkRes) {
        ctx.body = ctx.helper.responseCode(false, '账号已被注册');
      } else {
        // 调用service 创建一个账号
        const res = await ctx.service.register.create(params);
        if (res.affectedRows === 1) {
          ctx.body = ctx.helper.responseCode(true, '注册成功');
        } else {
          ctx.body = ctx.helper.responseCode(false, '注册失败');
        }
      }
    }
  }
}

module.exports = RegisterController;

'use strict';

const Service = require('egg').Service;

class RegisterService extends Service {
  /**
   * @description 插入用户注册信息
   * @param {obj} params mobile|string name|string pwd|string prepwd|string
   * @return {*} 返回数据库信息
   */
  async create(params) {
    const res = await this.app.mysql.insert('users', {
      Mobile: params.mobile,
      UserName: params.name,
      Pwd: params.pwd,
      Prepwd: params.prepwd,
    });
    return res;
  }

  /**
   * @description 查询账号是否存在
   * @param {obj} params mobile|string
   * @return {*} 返回数据库信息
   */
  async checkUser(params) {
    const res = await this.app.mysql.get('users', { Mobile: params.mobile });
    return res;
  }

}

module.exports = RegisterService;

'use strict';

const Service = require('egg').Service;

class UsersService extends Service {
  /**
   * @description 查询所有用户信息
   * @return {*} 返回数据库信息
   */
  async query() {
    const res = await this.app.mysql.select('users');
    const filterData = [];
    res.forEach(item => {
      filterData.push({
        mobile: item.Mobile,
        userName: item.UserName,
      });
    });
    return filterData;
  }

}

module.exports = UsersService;

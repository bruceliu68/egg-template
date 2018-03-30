'use strict';

module.exports = {
  /**
   * @param {boolean} flag 接口成功还是失败
   * @param {string} msg 返回信息
   * @param {*} data 返回数据
   * @return {obj} 统一封装返回格式
   */
  responseCode(flag, msg, data) {
    const obj = {
      success: flag,
      data,
      message: msg,
    };
    return obj;
  },
};

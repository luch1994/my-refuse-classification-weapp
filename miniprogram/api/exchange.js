const regeneratorRuntime = require('../utils/runtime.js');
const db = wx.cloud.database();

const getExchangeList = async(openid) => {
  let exchangeList = await getDbExchangeList(openid);
  return exchangeList;
}

const getDbExchangeList = async(openid) => {
  let exchangeRes = await db.collection('exchanges').where({
    _openid: openid
  }).get();
  let exchangeList = exchangeRes.data;
  return exchangeList;
}

module.exports = {
  getExchangeList,
  getDbExchangeList
}
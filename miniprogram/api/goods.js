const regeneratorRuntime = require('../utils/runtime.js');
const db = wx.cloud.database();

const getGoodsList = async() => {
  let goodsList = await new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'goodsList',
      success: function(res) {
        resolve(res.data);
      },
      fail: async function(res) {
        resolve(false);
      }
    });
  });
  if (!goodsList) {
    goodsList = await getDbGoodsList();
  }
  return goodsList;
}

const getDbGoodsList = async() => {
  let res = await db.collection('goods').limit(100).get();
  wx.setStorage({
    key: 'goodsList',
    data: res.data,
  });
  return res.data;
}
// cloud://cloud-refuse-rorp9.636c-cloud-refuse-rorp9-1259571119
const getGoodsById = async(id) => {
  let goodsList = await getGoodsList();
  let curGoods = goodsList.filter(goods => goods._id === id);
  return curGoods[0];
}

module.exports = {
  getGoodsList,
  getGoodsById
}
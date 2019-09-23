const regeneratorRuntime = require('../utils/runtime.js');
const db = wx.cloud.database();

const getConfig = async () => {
  let res = await db.collection('configs').limit(1).get();
  if (res.data.length > 0) {
    return res.data[0];
  } else {
    return null;
  }
}

module.exports = {
  getConfig
}
const regeneratorRuntime = require('../utils/runtime.js');
const db = wx.cloud.database();


const getScoreList = async (openid) => {
  let scoreList = null;
  if (!scoreList) {
    scoreList = await getDbScoreList(openid);
  }
  return scoreList;
}

const getDbScoreList = async (openid) => {
  let scoreRes = await db.collection('scores').where({
    _openid: openid
  }).get();
  let scoreList = scoreRes.data;
  scoreList.reverse();
  return scoreList;
}


module.exports = {
  getScoreList,
  getDbScoreList
}

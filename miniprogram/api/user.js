const regeneratorRuntime = require('../utils/runtime.js');
const db = wx.cloud.database();
const _ = db.command;
const app = getApp();

const {
  callFunction
} = require('../utils/util.js');

const getUser = async () => {
  if (app.globalData.user) {
    return app.globalData.user;
  }
  let wxLoginRes = await callFunction('login');
  let openid = wxLoginRes.result.openid;
  let userRes = await db.collection('users').where({
    _openid: openid
  }).get();
  let user = null;
  if (userRes.data.length === 0) {
    let now = new Date().getTime();
    let addRes = await db.collection('users').add({
      data: {
        nickName: '', //微信昵称
        headImg: '',//微信头像
        answeredTotalCount: 0,//总答题数
        correctTotalCount: 0,//总正确数
        createdAt: now,//创建时间
        lastAnswerTime: 0,//最后答题时间
        todayAnswerCount: 0 //今日答题数
      }
    });
    let getOneRes = await db.collection('users').doc(addRes._id).get();
    user = getOneRes.data;
  } else {
    user = userRes.data[0];
  }
  app.globalData.user = user;
  return user;
}

const updateWXInfo = (id, headImg, nickName) => {
  app.globalData.user.nickName = nickName;
  app.globalData.user.headImg = headImg;
  return db.collection('users').doc(id).update({
    data: {
      nickName,
      headImg
    }
  });
}

const updateCountInfo = (id, answerCount, correctCount) => {
  let now = new Date().getTime();

  app.globalData.user.answeredTotalCount += answerCount;
  app.globalData.user.correctTotalCount += correctCount;
  app.globalData.user.todayAnswerCount += 1;
  app.globalData.user.lastAnswerTime = now;
  return db.collection('users').doc(id).update({
    data: {
      answeredTotalCount: _.inc(answerCount),
      correctTotalCount: _.inc(correctCount),
      todayAnswerCount: _.inc(1),
      lastAnswerTime: now
    }
  });
}

module.exports = {
  getUser,
  updateWXInfo,
  updateCountInfo
}
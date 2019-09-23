const regeneratorRuntime = require('../utils/runtime.js');
const db = wx.cloud.database();
const _ = db.command;

const {
  callFunction
} = require('../utils/util.js');

/**
 * 获取用户信息，相当于登录
 */
const getUser = async(upper_id) => {
  let wxLoginRes = await callFunction('login');
  let openid = wxLoginRes.result.openid;
  let userRes = await db.collection('users').where({
    _openid: openid
  }).get();
  let user = null;
  if (userRes.data.length === 0) {
    let addRes = await db.collection('users').add({
      data: {
        score: 0, // 总积分
        usedScore: 0, // 已使用积分
        answeredTotalCount: 0, // 总答题数
        correctTotalCount: 0, // 总正确数
        createdAt: new Date(), // 创建时间
        energy: 100, //体力
        exchangedGoodsCount: 0, // 已兑换的商品数量
        lastSignTime: new Date('2000-01-01 00:00:00'), // 最后签到时间
        upperId: upper_id
      }
    });
    let getOneRes = await db.collection('users').doc(addRes._id).get();
    // 调用云函数计算邀请人积分
    await callFunction('share-score-calc', {
      upper_id
    });
    user = getOneRes.data;
  } else {
    user = userRes.data[0];
  }
  return user;
}

/**
 * 答题
 */
const updateCountInfo = (answerCount, correctCount, score) => {
  const app = getApp();

  let user = app.globalData.user;
  user.answeredTotalCount += answerCount;
  user.correctTotalCount += correctCount;
  user.score += score;
  user.energy -= 10;

  return db.collection('users').doc(user._id).update({
    data: {
      answeredTotalCount: _.inc(answerCount),
      correctTotalCount: _.inc(correctCount),
      score: _.inc(score),
      energy: _.inc(-10)
    }
  });
}

/**
 * 兑换商品
 */
const exchangeGoods = async(goods, count, address, payTotal, remark) => {
  const app = getApp();
  let user = app.globalData.user;
  const now = new Date();
  // 新增兑换记录
  let exchangeObj = {
    goods,
    count,
    address,
    remark,
    isSend: false, // 是否已发货
    logisticNumber: '', // 物流公司
    createdAt: now
  };
  let addExchangeRes = await db.collection('exchanges').add({
    data: exchangeObj
  });
  if (app.globalData.exchangeList) {
    app.globalData.exchangeList.push(exchangeObj);
  }
  // 新增积分记录
  let addScoreRes = await db.collection('scores').add({
    data: {
      content: '兑换商品',
      score: -payTotal,
      createdAt: now
    }
  });
  // 修改用户积分
  let updateRes = await db.collection('users').doc(user._id).update({
    data: {
      usedScore: _.inc(payTotal),
      exchangedGoodsCount: _.inc(count)
    }
  });
  user.usedScore += payTotal;
  user.exchangedGoodsCount += count;
  return true;
}

/**
 * 每日签到
 */
const addDailySign = async(user, score, is_watch_add, is_share) => {
  let now = new Date();
  /**
   * 新增签到记录
   */
  let addSignRes = await db.collection('signs').add({
    data: {
      time: now,
      score,
      is_watch_add,
      is_share
    }
  });

  /**
   * 新增积分记录
   */
  let addScoreRes = await db.collection('scores').add({
    data: {
      content: '签到',
      score,
      createdAt: now
    }
  });

  /**
   * 修改用户积分
   */
  let updateUserRes = await db.collection('users').doc(user._id).update({
    data: {
      score: _.inc(score),
      lastSignTime: now
    }
  });
  user.score += score;
  user.lastSignTime = now;

  return true;
}

module.exports = {
  getUser,
  updateCountInfo,
  exchangeGoods,
  addDailySign
}
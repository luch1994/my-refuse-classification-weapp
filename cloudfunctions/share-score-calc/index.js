// 分享赚积分功能
const SCORE = 50; // 分享一次可赚取50积分

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  // const { OPENID } = cloud.getWXContext();

  const db = cloud.database();
  const _ = db.command;

  console.log(event);

  const UPPER_ID = event.upper_id;

  try {
    // 更新上级的积分
    await db.collection('users').where({
      _openid: UPPER_ID
    }).update({
      data: {
        score: _.inc(SCORE)
      }
    });
  } catch (e) {
    console.log('更新上级的积分失败');
    console.log(e);
    return 1;
  }

  try {
    // 新增上级的积分记录
    await db.collection('scores').add({
      data: {
        _openid: UPPER_ID,
        content: '邀请新用户',
        score: SCORE,
        createdAt: new Date()
      }
    });
  } catch (e) {
    console.log('新增积分记录失败');
    console.log(e);
    return 2;
  }

  return 0;
}
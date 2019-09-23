// pages/score/list.js
const regeneratorRuntime = require('../../utils/runtime.js');
const {
  getScoreList
} = require('../../api/score.js');
const {
  formatTime
} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftScore: 0,
    scoreList: [],
    user: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.myEvent.sub('onGetUser', this.onGetUser);
  },

  async onGetUser(user) {
    this.data.user = user;
    let leftScore = user.score - user.usedScore;
    this.setData({
      leftScore
    });
    const app = getApp();
    let list = null;
    if (app.globalData.scoreList) {
      list = app.globalData.scoreList;
    } else {
      list = await getScoreList(user._openid);
      app.globalData.scoreList = list;
    }
    let scoreList = list.map(item => {
      // let time = null;
      // if (typeof item.createdAt === 'string') {
      //   time = new Date(item.createdAt);
      // } else if (item.createdAt.constructor.name === 'Date') {
      //   time = item.createdAt;
      // } else {
      //   time = new Date();
      // }
      return {
        _id: item._id,
        score: item.score,
        time: formatTime(item.createdAt),
        remark: item.content
      };
    });
    this.setData({
      scoreList
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.myEvent.remove('onGetUser', this.onGetUser);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})
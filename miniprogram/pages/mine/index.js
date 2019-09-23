// pages/mine/index.js
import {
  getGoodsList
} from '../../api/goods.js';

import {
  addDailySign
} from '../../api/user.js';

import {
  isTheSameDay,
  toast
} from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    isShowSignBox: false, // 是否显示签到弹窗
    canDailySign: false, // 是否可以签到
    hasDailySign: false, // 是否已经签到
    isDailySign: false // 用于记录是否点了分享按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getGoodsList().then(res => {
      this.setData({
        goodsList: res
      })
    });

    wx.myEvent.sub('onGetUser', user => {
      let t = user.lastSignTime;
      let now = new Date();
      let canDailySign = false;
      let hasDailySign = false;

      // 比较时间判断是否可以日签
      if (!t) {
        canDailySign = true;
      }
      if (!isTheSameDay(t, now)) {
        // 不是同一天，可以日签
        canDailySign = true;
      } else {
        hasDailySign = true;
      }

      this.data.canDailySign = canDailySign;

      this.setData({
        user,
        hasDailySign
      });
    })
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
    if (this.data.isDailySign) {
      this.data.isDailySign = false;
      if (this.data.canDailySign && !this.data.hasDailySign) {
        this._addDailySign(false, true);
      }
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    let isDailySign = false;
    if (options.target) {
      if (options.target.dataset.isDailySign) {
        isDailySign = true;
      }
    }
    if (isDailySign) {
      this.data.isDailySign = true;
    }
    let app = getApp();
    let upper_id = app.globalData.user._openid || '';
    return {
      title: `免费兑换`,
      path: `/pages/mine/index?upper_id=${upper_id}`
    };
  },

  async _addDailySign(is_watch_add, is_share) {
    if (!this.data.canDailySign || this.data.hasDailySign) {
      return;
    }
    this.data.canDailySign = false;
    let score = 10;
    if (is_share || is_watch_add) {
      score = score * 2;
    }
    await addDailySign(this.data.user, score, is_watch_add, is_share);
    toast('签到成功');
    this.setData({
      hasDailySign: true,
      isShowSignBox: false
    });
  },

  onSignTap() {
    this._addDailySign(false, false);
  },

  onSelectGoods(e) {
    let goods = e.detail;
    let goodsStr = encodeURIComponent(JSON.stringify(goods));
    wx.navigateTo({
      url: `/pages/goods/detail?goods=${goodsStr}`,
    });
  },

  /**
   * 显示签到弹窗按钮
   */
  onSign() {
    if (!this.data.user) {
      return;
    }
    if (!this.data.canDailySign) {
      return;
    }
    this.setData({
      isShowSignBox: true
    });
  },

  onSignBoxClose() {
    if (this.data.isShowSignBox) {
      this.setData({
        isShowSignBox: false
      });
    }
  }
})
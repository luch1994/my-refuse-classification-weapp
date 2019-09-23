// miniprogram/pages/mall/goods/detail.js
const {
  toast
} = require('../../utils/util.js');

const {
  cloudFolder
} = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAction: false,
    goods: null,
    specIndex: 0,
    user: null,
    maxCanExchangeCount: 0, // 根据当前金币余额和当前商品所需金币，计算可兑换量
    choosedCount: 1
  },

  onGetUser: function(user) {
    this.data.user = user;
    this.calcMaxCanExchangeCount();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    wx.myEvent.sub('onGetUser', this.onGetUser);

    let goods = null;
    if (options.goods) {
      goods = JSON.parse(decodeURIComponent(options.goods));
    } else if (options.id) {
      const {
        getGoodsById
      } = require('../../../api/goods.js');
      goods = await getGoodsById(options.id);
    }

    let detailImgs = [];
    let relativePath = goods._id.replace(/-/, '/');
    for (let i = 1; i <= goods.goods_detail; i++) {
      detailImgs.push(`${cloudFolder}${relativePath}/0${i}.jpg`);
    }

    let bannerImgs = detailImgs.slice(0, goods.banner_imgs);

    this.setData({
      goods,
      bannerImgs,
      detailImgs
    });
    this.calcMaxCanExchangeCount();

  },

  calcMaxCanExchangeCount() {
    if (!this.data.goods) {
      return;
    }
    if (!this.data.user) {
      return;
    }
    let price = this.data.goods.price;
    let user = this.data.user;
    let leftScore = user.score - user.usedScore;
    let maxCanExchangeCount = Math.floor(leftScore / price) || 0;
    this.setData({
      maxCanExchangeCount
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let app = getApp();
    let upper_id = app.globalData.user._openid || '';

    return {
      title: `免费领取|${this.data.goods.name}`,
      path: `/pages/goods/detail?id=${this.data.goods._id}&upper_id=${upper_id}`,
      imgUrl: `${this.data.bannerImgs[0]}`
    }
  },

  showAction: function() {
    if (this.data.maxCanExchangeCount >= 1) {
      this.setData({
        isShowAction: true
      });
    }
  },

  hideAction: function() {
    this.setData({
      isShowAction: false
    });
  },

  specTap: function(e) {
    let index = e.currentTarget.dataset.index;
    if (index === this.data.specIndex) {
      return;
    } else {
      this.setData({
        specIndex: index
      });
    }
  },

  onCountChange: function(e) {
    this.data.choosedCount = e.detail;
  },

  onConfirm: function(e) {
    let count = this.data.choosedCount;
    if (count < 1 || count > this.data.maxCanExchangeCount) {
      toast('数量不正确');
      return;
    }
    let goods = this.data.goods;
    let data = {
      goods: {
        id: goods._id,
        img: this.data.bannerImgs[0],
        name: goods.name,
        price: goods.price,
        spec: goods.specs[this.data.specIndex]
      },
      count
    };
    let dataStr = decodeURIComponent(JSON.stringify(data));
    wx.navigateTo({
      url: `../trade/confirm?data=${dataStr}`,
    });
  }
})
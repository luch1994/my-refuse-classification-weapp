// pages/exchange/detail.js
const {
  formatTime
} = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    exchange: null,
    goods: null,
    statusTxt: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let exchange = JSON.parse(decodeURIComponent(options.exchange));
    let goods = {
      _id: exchange.goods_id,
      name: exchange.goods_name,
      spec: exchange.goods_spec,
      img: exchange.goods_img,
      price: exchange.goods_price
    };
    let statusTxt = '待发放';
    if (exchange.is_send) {
      statusTxt = '已发放';
    }
    this.setData({
      exchange,
      goods,
      created_time: formatTime(new Date(exchange.created_time)),
      statusTxt
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

  copy() {
    wx.setClipboardData({
      data: this.data.exchange.logistic_number
    });
  }
})
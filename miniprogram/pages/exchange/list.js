// pages/exchange/list.js
const regeneratorRuntime = require('../../utils/runtime.js');

const {
  getExchangeList
} = require('../../api/exchange.js');
const {
  formatTime
} = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    wx.myEvent.sub('onGetUser', this.onGetUser);
  },

  async onGetUser(user) {
    const app = getApp();
    let data = null;
    if (app.globalData.exchangeList) {
      data = app.globalData.exchangeList;
    } else {
      data = await getExchangeList(user._openid);
      app.globalData.exchangeList = data;
    }

    let exchangeList = data.map(item => {
      let obj = {
        _id: item._id,
        goods_id: item.goods.id,
        goods_name: item.goods.name,
        goods_spec: item.goods.spec,
        goods_img: item.goods.img,
        goods_price: item.goods.price,
        is_send: item.isSend || false,
        count: item.count,
        logistic_number: item.logisticNumber,
        created_time: formatTime(item.createdAt),
        address: item.address,
        remark: item.remark
      };
      return obj;
    }).reverse();

    this.setData({
      exchangeList
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

  },

  onSelect(e) {
    let exchange = e.detail;
    let exchangeStr = encodeURIComponent(JSON.stringify(exchange));
    wx.navigateTo({
      url: `./detail?exchange=${exchangeStr}`
    });
  }
})
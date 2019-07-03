// pages/home/index/index.js
const {
  trashData
} = require('../../data/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trashData: null,
    curIndex: 0,
    listHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      trashData
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let query = wx.createSelectorQuery();
    query.select('#tabContent').boundingClientRect(res => {
      console.log(res);
      this.setData({
        listHeight: res.height
      })
    }).exec();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onSwiperChange: function(e) {
    // console.log(e);
    let index = 0;
    if (e.type == 'tap') {
      index = e.currentTarget.dataset.index;
    } else {
      index = e.detail.current;
    }
    if (index === this.data.curIndex) {
      return;
    }
    this.setData({
      curIndex: index
    });
  },

  onViewMore: function(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../trash/index?index=${index}`
    });
  },

  onSearch() {
    wx.navigateTo({
      url: '../search/index',
    })
  }
})
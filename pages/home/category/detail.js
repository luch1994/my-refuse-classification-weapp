// pages/home/category/detail.js
const {
  rabishData
} = require('../../../data/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let index = parseInt(options.index);
    this.data.index = index;
    let item = rabishData[index];
    let r = parseInt(item.color.substr(1, 2), 16);
    let g = parseInt(item.color.substr(3, 2), 16);
    let b = parseInt(item.color.substr(5, 2), 16);
    let a = 0.2;
    let bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;

    this.setData({
      rabish: item,
      bgColor
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let r = this.data.rabish;
    return {
      title: `查看所有${r.name}`,
      path: `/pages/home/category/detail?index=${this.data.index}`
    }
  }
})
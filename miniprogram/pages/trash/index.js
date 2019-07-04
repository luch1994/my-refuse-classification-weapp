// pages/trash/index.js
const regeneratorRuntime = require('../../utils/runtime.js');
const {
  getSimpleTrashData,
  getTrashListData
} = require('../../api/data.js');
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
    let id = options.id;
    console.log(options);
    this.data.id = id;
    let simpleTrashData = await getSimpleTrashData();
    let arr = simpleTrashData.filter(item => item._id == id);
    let trash = arr[0];
    let r = parseInt(trash.color.substr(1, 2), 16);
    let g = parseInt(trash.color.substr(3, 2), 16);
    let b = parseInt(trash.color.substr(5, 2), 16);
    let a = 0.2;
    let bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    let img = `/images/icon-${trash.enName}-waste.png`;
    this.setData({
      trash: trash,
      bgColor,
      img
    });
    wx.setNavigationBarTitle({
      title: trash.name,
    });

    let data = await getTrashListData(id);
    this.setData({
      'trash.data': data
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
    let r = this.data.trash;
    return {
      title: `查看所有${r.name}`,
      path: `/pages/home/category/detail?id=${this.data.id}`
    }
  }
})
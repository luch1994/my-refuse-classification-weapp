// pages/home/search/index.js
const {
  getAllTrashCategory,
  getAllTrashListData
} = require('../../api/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: 0,
    categories: [],
    trashList: [],
    resultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getAllTrashCategory().then(categories => {
      this.data.categories = categories;
    });
    getAllTrashListData().then(trashList => {
      this.data.trashList = trashList;
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let query = wx.createSelectorQuery();
    query.select('#list').boundingClientRect(res => {
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

  back() {
    wx.navigateBack({});
  },

  onInput(e) {
    let value = e.detail.value;
    if (!value) {
      if (this.data.resultList.length != 0) {
        this.setData({
          resultList: []
        })
      }
      return;
    }
    let res1 = this.data.trashList.filter(item => {
      return item.n.indexOf(value) >= 0 || item.i.indexOf(value) >= 0;
    });
    let categories = this.data.categories;
    let resultList = res1.map(item => {
      let c = parseInt(item.c) - 1;
      let str = `${item.n}【${categories[c]}】`;
      return str;
    });
    this.setData({
      resultList
    });

  }
})
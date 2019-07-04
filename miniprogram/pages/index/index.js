// pages/home/index/index.js
const {
  getSimpleTrashData,
  getTrashListData
} = require('../../api/data.js');
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
    getSimpleTrashData().then(simpleTrashData => {
      this.setData({
        trashData: simpleTrashData
      });
      for (let i = 0; i < simpleTrashData.length; i++) {
        ((i) => {
          getTrashListData(simpleTrashData[i]._id).then(data => {
            let key = `trashData[${i}].data`;
            let obj = {};
            obj[key] = data;
            this.setData(obj);
            // this.data.trashData[i].data = data;
            // this.setData({
            //   trashData: this.data.trashData
            // });
          })
        })(i);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let query = wx.createSelectorQuery();
    query.select('#tabContent').boundingClientRect(res => {
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
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../trash/index?id=${id}`
    });
  },

  onSearch() {
    wx.navigateTo({
      url: '../search/index',
    })
  }
})
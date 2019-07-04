// pages/exercise/index.js
const {
  getSimpleTrashData,
  getFourTrashListData
} = require('../../api/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    list: [],
    topics: [],
    optionlist: [],
    canSelect: true
  },

  getTenRandom: function(max) {
    let arr = [];
    let a = parseInt(Math.random() * max);
    arr.push(a);
    for (let i = 0; i < 9; i++) {
      a = parseInt(Math.random() * max);
      while (arr.includes(a)) {
        a = parseInt(Math.random() * max);
      }
      arr.push(a);
    }
    return arr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Promise.all([getSimpleTrashData(), getFourTrashListData()]).then(res => {
      console.log(res);
      let optionlist = res[0].map(item => {
        let obj = {
          name: item.name,
          icon: `/images/icon-${item.enName}-waste-s.png`,
          color: item.color
        }
        return obj;
      });
      this.setData({
        optionlist
      });
      this.data.list = res[1];
      this.loadTopic();
    });
  },

  loadTopic: function() {
    let list = this.data.list;
    let arr = this.getTenRandom(list.length);
    let topics = [];
    for (let a of arr) {
      topics.push(list[a]);
    }
    topics = topics.map(item => {
      item.selected = 0;
      return item;
    });
    this.setData({
      topics
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

  },
  onSelect: function(e) {
    if (!this.data.canSelect) {
      return;
    }
    this.data.canSelect = false;
    let index = e.currentTarget.dataset.index;
    let obj = {};
    let key = `topics[${this.data.curIndex}].selected`;
    obj[key] = index;
    this.setData(obj);
    setTimeout(() => {
      this.setData({
        curIndex: this.data.curIndex + 1
      });
      this.data.canSelect = true;
    }, 600);
  }
})
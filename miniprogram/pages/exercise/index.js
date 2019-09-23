// pages/exercise/index.js
const {
  getSimpleTrashData,
  getFourTrashListData
} = require('../../api/data.js');

const {
  getTenRandom
} = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    list: [],
    topics: [],
    optionlist: [],
    canSelect: true,
    totalScore: 0,
    isShowResult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Promise.all([getSimpleTrashData(), getFourTrashListData()]).then(res => {
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
    let arr = getTenRandom(list.length);
    let topics = [];
    for (let a of arr) {
      topics.push(list[a]);
    }
    topics = topics.map(item => {
      item.selected = 0;
      return item;
    });
    this.setData({
      topics,
      curIndex: 0,
      totalScore: 0
    });
    this.data.canSelect = true;
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
    let app = getApp();
    let upper_id = '';
    if (app.globalData.user) {
      upper_id = app.globalData.user._id;
    }
    return {
      title: `测试垃圾分类你能得几分`,
      path: `/pages/exercise/index?upper_id=${upper_id}`
    };
  },

  onSelect: function(e) {
    if (!this.data.canSelect) {
      return;
    }
    this.data.canSelect = false;
    let selected = parseInt(e.currentTarget.dataset.index);
    let obj = {};
    let curIndex = this.data.curIndex;
    let key = `topics[${curIndex}].selected`;
    obj[key] = selected;
    this.setData(obj);
    if (this.data.topics[curIndex].c == selected) {
      this.data.totalScore += 10;
    }
    setTimeout(() => {
      let newIndex = this.data.curIndex + 1;
      if (newIndex >= 10) {
        this.setData({
          isShowResult: true,
          totalScore: this.data.totalScore
        });
      } else {
        this.setData({
          curIndex: newIndex
        });
        this.data.canSelect = true;
      }
    }, 500);
  },

  onRestart: function() {
    this.setData({
      isShowResult: false
    })
    this.loadTopic();
  }
})
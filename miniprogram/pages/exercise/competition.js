// pages/exercise/Competition.js
const regeneratorRuntime = require('../../utils/runtime.js');
const {
  getUser,
  updateWXInfo,
  updateCountInfo
} = require('../../api/user.js');

const {
  getSimpleTrashData,
  getFourTrashListData
} = require('../../api/data.js');

const {
  getTenRandom
} = require('../../utils/util.js');

const MAX_COUNT = 2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    hasUserInfo: false,
    leftCount: 0,
    rankingIndex: '',
    isShowMyInfo: true,
    canStart: true,
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
  onLoad: async function(options) {
    let user = await getUser();
    let hasUserInfo = false;
    if (user.headImg && user.nickName) {
      hasUserInfo = true;
    }
    let leftCount = MAX_COUNT - user.todayAnswerCount;
    this.setData({
      user,
      hasUserInfo,
      leftCount
    });

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

  onGetUserInfo: async function(e) {
    console.log(e);
    let {
      avatarUrl,
      nickName
    } = e.detail.userInfo;
    let updateRes = await updateWXInfo(this.data.user._id, avatarUrl, nickName);
    this.setData({
      'user.headImg': avatarUrl,
      'user.nickName': nickName,
      hasUserInfo: true
    });
  },

  onStart: function(e) {
    if (!this.data.canStart) {
      return;
    }
    if (this.data.leftCount <= 0) {
      return;
    }
    if (!this.data.list || this.data.list.length == 0) {
      return;
    }
    this.data.canStart = false;
    this._loadTopic();
    if (this.data.isShowMyInfo) {
      this.setData({
        isShowMyInfo: false
      });
    }
    this.data.canStart = true;
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
        let user = this.data.user;
        // user.answeredTotalCount += 10;
        // user.correctTotalCount += this.data.totalScore / 10;
        // user.todayAnswerCount += 1;
        // user.lastAnswerTime = new Date().getTime();
        updateCountInfo(user._id, 10, this.data.totalScore / 10);
        this.setData({
          isShowResult: true,
          totalScore: this.data.totalScore,
          user,
          leftCount: this.data.leftCount - 1
        });
      } else {
        this.setData({
          curIndex: newIndex
        });
      }
      this.data.canSelect = true;
    }, 500);

  },
  _loadTopic: function() {
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
  },
  onRestart: function() {
    this.setData({
      isShowMyInfo: true,
      isShowResult: false
    })
  }
})
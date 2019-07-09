// pages/share/index.js
const {
  checkAuth,
  toast,
  downLoadFile
} = require('../../utils/util.js');
const regeneratorRuntime = require('../../utils/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcs: ['https://636c-cloud-refuse-rorp9-1259571119.tcb.qcloud.la/A4-2100%C3%972850-code.png?sign=a6d545b037e8dda559619967a9c35ca0&t=1562639389']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    return {
      title: `常用垃圾分类对照表`
    }
  },

  showLargeImg: function(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    let src = this.data.srcs[index];
    wx.previewImage({
      urls: [src],
    })
  },

  async onSave(e) {
    let res = await checkAuth('scope.writePhotosAlbum');
    if (res) {
      let index = parseInt(e.currentTarget.dataset.index);
      let src = this.data.srcs[index];
      let filePath = await downLoadFile(src);
      wx.saveImageToPhotosAlbum({
        filePath: filePath,
        success: res => {
          toast('保存成功');
        },
        fail: rese => {
          toast('保存失败');
        }
      })
    } else {
      toast('保存失败，未授权');
    }
  }
})
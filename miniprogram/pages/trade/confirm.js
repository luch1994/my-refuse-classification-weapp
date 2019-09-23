// miniprogram/pages/mall/trade/confirm.js
const regeneratorRuntime = require('../../utils/runtime.js');
const {
  toast,
  checkAuth
} = require('../../utils/util.js');
const {
  exchangeGoods
} = require('../../api/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    goods: null,
    goodsCount: 0,
    payTotal: 0,
    canConfirm: true,
    remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let app = getApp();
    let user = app.globalData.user;
    this.data.user = user;

    if (options.data) {
      let data = JSON.parse(decodeURIComponent(options.data));
      let payTotal = data.goods.price * data.count;
      this.setData({
        goods: data.goods,
        goodsCount: data.count,
        payTotal
      });
    }
  },

  onChooseAddress: async function() {
    let auth = await checkAuth('scope.address');
    if (auth) {
      let address = await new Promise((resolve, reject) => {
        wx.chooseAddress({
          success: res => {
            let address = {
              province: res.provinceName,
              city: res.cityName,
              district: res.countyName,
              detail: res.detailInfo,
              name: res.userName,
              tel: res.telNumber
            };
            resolve(address);
          },
          fail: res => {
            resolve(false);
          }
        });
      });
      if (address) {
        this.setData({
          address
        })
      }

    }
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

  onConfirm: async function(e) {
    if (!this.data.address) {
      toast('请选择地址');
      return;
    }
    if (!this.data.canConfirm) {
      return;
    }
    this.data.canConfirm = false;
    let res = await exchangeGoods(this.data.goods, this.data.goodsCount, this.data.address, this.data.payTotal, this.data.remark);
    if (res) {
      toast('兑换成功');
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/mine/index',
        });
      }, 600);
    } else {
      toast('兑换失败');
    }
    this.data.canConfirm = true;
  },

  remarkInput(e) {
    let remark = e.detail.value;
    this.data.remark = remark;
  }

})
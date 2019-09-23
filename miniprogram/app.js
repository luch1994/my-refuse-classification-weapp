//app.js
const regeneratorRuntime = require('./utils/runtime.js');
App({
  onLaunch: async function(options) {
    const myEvent = require('./utils/my-event.js');
    wx.myEvent = myEvent;

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      });

      let upper_id = '';
      if (options.query && options.query.upper_id) {
        upper_id = options.query.upper_id;
      }

      const {
        getUser
      } = require('./api/user.js');

      const {
        getConfig
      } = require('./api/config.js');

      let [user, config] = await Promise.all([getUser(upper_id), getConfig()]);
      this.globalData.user = user;
      this.globalData.config = config;
      let storageConfig = wx.getStorageSync('config');
      if (!storageConfig || storageConfig.version !== config.version) {
        wx.clearStorageSync();
      }
      wx.setStorageSync('config', config);

      wx.myEvent.pub('onGetConfig', config);
      wx.myEvent.pub('onGetUser', user);

      // 监听积分变化
      const db = wx.cloud.database();
      const doc = db.collection('users').doc(user._id);
      if (doc.watch) {
        const watcher = doc.watch({
          onChange: res => {
            if (res.docs[0]) {
              user = res.docs[0];
              this.globalData.user = user;
              this.globalData.scoreList = null;
              this.globalData.exchangeList = null;
              wx.myEvent.pub('onGetUser', user);
            }
          },
          onError: res => {

          }
        });
      }
    }
  },
  globalData: {
    exchangeList: null,
    user: null,
    scoreList: null
  }
})
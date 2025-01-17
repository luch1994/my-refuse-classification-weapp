const callFunction = (name, data = {}) => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data,
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    })
  })
}

/**
 * 确认是否授权，如果未授权，则发起授权，返回授权结果
 * @param {String} 权限名称
 * @returns {Boolean} 授权结果
 */
const checkAuth = scope_name => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        if (res[scope_name]) {
          resolve(true);
        } else {
          wx.authorize({
            scope: scope_name,
            success: res => {
              resolve(true);
            },
            fail: res => {
              resolve(false);
            }
          })
        }
      }
    })
  })
}

/**
 * 通用消息提示
 * @params {String} message 需要提示的消息
 */
const toast = (message) => {
  wx.showToast({
    title: message,
    duration: 1200,
    mask: true,
    icon: "none"
  });
}

const formatTime = (datetime, fmt = 'yyyy-MM-dd HH:mm:ss') => {
  var o = {
    "M+": datetime.getMonth() + 1, //月份   
    "d+": datetime.getDate(), //日   
    "H+": datetime.getHours(), //小时   
    "m+": datetime.getMinutes(), //分   
    "s+": datetime.getSeconds(), //秒   
    "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度   
    "S": datetime.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

const downLoadFile = (url) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          resolve(false);
        }
      },
      fail: function(res) {
        console.log(res);
        resolve(false);
      }
    })
  });
}

const getTenRandom = function(max) {
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
}

/**
 * 比较两个时间是否是同一天
 */
const isTheSameDay = (t1, t2) => {
  if (!t1 || !t2 || t1.constructor.name !== 'Date' || t2.constructor.name !== 'Date') {
    return false;
  }
  return t1.getFullYear() === t2.getFullYear() && t1.getMonth() === t2.getMonth() && t1.getDate() === t2.getDate();
}

module.exports = {
  callFunction,
  checkAuth,
  toast,
  formatTime,
  downLoadFile,
  getTenRandom,
  isTheSameDay
}
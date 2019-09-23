const myEvent = (function() {
  // 声明方法
  var pub, sub, remove;

  // 订阅缓存记录
  var subCache = {};
  // 发布缓存记录
  var pubCache = {};
  // 参数缓存
  var paramCache = {};

  // 订阅事件
  sub = function(key, fn) {
    if (!subCache[key]) {
      subCache[key] = [];
    }
    // 添加到订阅缓存中

    subCache[key].push(fn);
    // 如果有发布记录，则直接执行函数
    if (pubCache[key]) {
      if (paramCache[key]) {
        fn.apply(null, paramCache[key]);
      } else {
        fn.apply(null);
      }
      // 如果把参数和发布缓存清除的话，就是只允许单次执行
      // paramCache[key] = [];
      // pubCache[key] = undefined;
    }
  };
  pub = function() {
    var key = Array.prototype.shift.call(arguments);
    var fns = subCache[key];
    var args = Array.prototype.slice.call(arguments, 0);
    pubCache[key] = true;
    paramCache[key] = args;
    if (!fns || fns.length === 0) {
      return;
    }
    // 有订阅记录，则直接执行
    for (let fn of fns) {
      fn.apply(null, args);
    }
  };
  remove = function(key, fn) {
    if (subCache[key]) {
      if (fn) {
        for(let i = 0, len = subCache[key].length; i < len; i++) {
          if (fn == subCache[key][i]) {
            subCache[key].splice(i, 1);
            break;
          }
        }
      } else {
        // 把所有的缓存全部清除
        subCache[key] = undefined;
        pubCache[key] = undefined;
        paramCache[key] = undefined;
      }
    }
  };
  return {
    pub: pub,
    sub: sub,
    remove: remove
  };
})();

module.exports = myEvent;
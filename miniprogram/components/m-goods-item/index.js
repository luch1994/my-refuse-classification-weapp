// components/m-goods-item/index.js
const {
  cloudFolder
} = require('../../config.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: null,
      observer(newVal) {
        if (newVal) {
          let relativePath = newVal._id.replace(/-/, '/');
          this.setData({
            src: `${cloudFolder}${relativePath}/01.jpg`
          });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    src: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('select', this.data.goods);
    }
  }
})
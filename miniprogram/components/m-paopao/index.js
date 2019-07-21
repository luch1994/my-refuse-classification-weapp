// pages/components/paopao/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: Number,
      value: 100,
      observer(newVal) {
        let fontSize = newVal / 3;
        this.setData({
          fontSize
        });
      }
    },
    left: {
      type: Number,
      value: 0
    },
    top: {
      type: Number,
      value: 0
    },
    customStyle: {
      type: String,
      value: ''
    },
    text: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fontSize: 33.333,
    d: 4
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSubmit(e) {
      this.triggerEvent('select', {});
    }
  },

  lifetimes: {
    attached: function() {
      let r = (Math.random() * 3 + 2);
      this.setData({
        d: r
      })
    }
  }
})
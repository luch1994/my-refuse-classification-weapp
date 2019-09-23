// components/m-exchange/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exchange: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect() {
      this.triggerEvent('select', this.data.exchange);
    }
  }
})

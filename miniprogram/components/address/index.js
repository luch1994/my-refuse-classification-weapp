// pages/components/address-info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: Object,
      value: null
    },
    isShowEdit: {
      type: Boolean,
      value: false
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
    onEdit(e) {
      this.triggerEvent('edit', this.data.address);
    },
    onSelect(e) {
      this.triggerEvent('select', this.data.address);
    }
  }
})

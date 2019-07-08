// pages/components/m-search/m-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: ""
    },
    readOnly: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    val: "",
    isShowDelete: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(e) {
      this.triggerEvent('search', {
        value: this.data.val
      });
    },
    inputing(e) {
      let val = e.detail.value;
      this.data.val = val;
      this.triggerEvent('input', {
        value: val
      });
      if (val && !this.data.isShowDelete) {
        this.setData({
          isShowDelete: true
        });
      } else if (!val && this.data.isShowDelete) {
        this.setData({
          isShowDelete: false
        });
      }
    },
    onTap: function() {
      this.triggerEvent('select');
    },
    clear() {
      this.setData({
        val: '',
        isShowDelete: false
      });
      this.triggerEvent('input', {
        value: ''
      });
      this.triggerEvent('search', {
        value: ''
      });
    }
  }
})
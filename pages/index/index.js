//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShow: false,
    inputValue: "",
    items: [
      { name: 'male', value: '男', checked: 'true' },
      { name: 'female', value: '女'}
    ]
  },
  onShow(){
    // 重新赋值
    app.globalData.textName = "";
    app.globalData.sexValue = "male";
    this.setData({
      isShow: false,
      inputValue: "",
      items: [
        { name: 'male', value: '男', checked: 'true' },
        { name: 'female', value: '女' }
      ]
    })
  },
  //事件处理函数
  showWrap: function () {
    this.setData({
      isShow: true
    })
  },
  setName: function (e) {
    let string ="";
    var regEN = new RegExp("^[a-zA-Z]+$"); 
    if (regEN.test(e.detail.value)){
      string = e.detail.value
    } else {
      string = e.detail.value.substring(0, 3)
    }
    this.setData({
      inputValue: string
    })
    app.globalData.textName = string;
  },
  bindViewTap: function() {
    if (!app.globalData.textName){
      wx.showToast({
        title: '请输入名字!',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }else{
      wx.navigateTo({
        url: '../item/item'
      })
    }
  },
  radioChange: function (e) {
    app.globalData.sexValue = e.detail.value;
    //console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  
})

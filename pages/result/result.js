const app = getApp()
Page({
  data: {
    imgUrl: ""
  },
  onLoad(){
    this.setData({
      imgUrl: app.globalData.resultUrl
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '属于你的“创业时代”来了，我看好你能C位出道！',
      imageUrl: this.data.imgUrl,
      path: 'pages/index/index'
    }
  },
  toAnather(){
    wx.navigateToMiniProgram({
      appId: 'wx4fa4d574e2b2064e',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  previewImg(){
    const that = this;
    wx.previewImage({
      current: that.data.imgUrl, // 当前显示图片的http链接
      urls: [that.data.imgUrl] // 需要预览的图片http链接列表
    })
  }
})
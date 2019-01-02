const app = getApp();

Page({
  data: {
    isUpload: false,
    photoUrl: "",
    isLoading: false
  },
  onShow() {
    this.setData({
      isUpload: false
    })
  },
  gotoPhoto(){
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
       var tempFilePaths = res.tempFilePaths;
       that.setData({
         photoUrl: tempFilePaths[0]
       })
        
      }
    })

  },
  uploadPhoto(){
    const that = this;
    if (!that.data.photoUrl){
      wx.showToast({
        title: "请先上传您的正脸照片！",
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }else{
      that.setData({
        isLoading: true
      })
      wx.uploadFile({
        //url: app.globalData.baseUrl + '/entrepreneurial/img',
        url: app.globalData.baseUrl + '/RAnswer',
        filePath: that.data.photoUrl,
        name: 'img',
        method: 'POST',
        header: {
          "Content-Type": "multipart/form-data",
          "accept": "application/json"
        },
        formData: {
          secret: "67955ab7be58fae4cfaedfd8039f71f3",
          answer: app.globalData.answers.join(''),
          name: app.globalData.textName,
          sex: app.globalData.sexValue
        }, 
        success: function (res) {
          //console.log(88,res)
          that.setData({
            isLoading: false
          })
          let data = JSON.parse(res.data);
          if (data.code == 0) {
            app.globalData.resultUrl = data.data.url
            that.setData({
              isUpload: true
            })
          } else {
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }

        }
      })
    }
    
  },
  toResult(){
    wx.navigateTo({
      url: '../result/result'
    })
  }
})
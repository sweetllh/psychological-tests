const app = getApp();
var animation = wx.createAnimation({});
var i = 1;  
Page({
  data: {
      questionList: [], //题目
      itemNum: 1, // 第几题
      answer: [],
      animationData1: null,
      animationData2: null,
      animationData3: null,
  },
  onShow() {
    this.setData({
      itemNum: 1,
      answer: [],
    })
    i = 1;
    this.sliderightshow();
  },
  onLoad: function () {
    this.getQquestion();
  },
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  //获取题目
  getQquestion: function () {
    const that = this;
    wx.request({
      //url: app.globalData.baseUrl +'/entrepreneurial/question', 
      url: app.globalData.baseUrl + '/RQuestion',
      method: 'POST',
      data: {
        'secret': '67955ab7be58fae4cfaedfd8039f71f3'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code==0){
          that.setData({
            questionList: res.data.data,
          })
        }
        
      }
    })
  },
  
  //选择答案
  choosed(event){
    //console.log(event)
    const that = this;
    let id = event.currentTarget.dataset.id;
    //app.globalData.answers.push(id);
    that.data.answer[that.data.itemNum - 1] = id
    that.setData({
      answer: that.data.answer
    })
    let hanlder = setTimeout(function () {
      app.globalData.answers[that.data.itemNum - 1] = id;
      if (that.data.itemNum < 9) {
        that.setData({
          itemNum: that.data.itemNum + 1
        })
        that.back();//设回原来的位置
        i = 1;  //全局变量重设
        that.sliderightshow();
      } else if (that.data.itemNum == 9) {
        wx.navigateTo({
          url: '../photo/photo'
        })
      }
    }, 350);
    
    //console.log(app.globalData.answers)
  },
  //动画
  sliderightshow: function () {
    const that = this;
    setTimeout(function(){
      animation.translateX(500).step()
      this.setData({
        ["animationData" + i]: animation.export({ duration: 400, timingFunction:"ease-out"})
      })
      i++;
    }.bind(this),500)
    if(i < 3) {
      setTimeout(function () {
        this.sliderightshow()
      }.bind(this), 800)
    } 

  },
  // 折回
  back(){
    for(let i=0;i<3;i++){
      animation.translateX(-500).step()
      let num = i + 1;
      this.setData({
        ["animationData" + num]: animation.export({ duration: 100})
      })
    }
    
    
  }

})
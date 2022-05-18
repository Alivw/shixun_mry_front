// pages/login/login.js
Page({

  /**
   * Page initial data
   */
  data: {
    httpUrl: "http://127.0.0.1/"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  //点击登录 调用的方法 
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value.phone)
    //password //wx.login方式是微信小程序给我们提供的方法，它可以为我们获取登录凭证 //只有拥有登录凭证才能发送网络请求给后台服务器，并且该凭证还要传递给后台换取openid等信息 //详情请见官方文档 
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 res.code需要的登录凭证 5分钟 
          wx.request({
            url: that.data.httpUrl + 'user/userLogin',
            method: "post",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code,
              phone: e.detail.value.phone,
              password: e.detail.value.password
            },
            success: function (result) {
              console.log(result.data) 
              if (result.data.code == 200) {
                wx.setStorage({
                  key:"token",
                  data: result.data.data
                })
              } else {
                //显示错误信息 
                wx.showToast({
                  title: result.data.msg,
                  icon: 'error',
                  duration: 2000
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
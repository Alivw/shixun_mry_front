// pages/register/register.js
Page({

  /**
   * Page initial data
   */
  data: {
    httpUrl: "http://127.0.0.1/"
  },
  // 跳转登录页面 
  toLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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

  },
  //提交表单

  formSubmit: function (e) {
    var that = this;
    //e.detail.value为获取用户输入的所有数据 
    console.log(e.detail.value);
    //1.获取本地缓存的user信息 
    wx.getStorage({
      key: 'userInfo',
      success(res) {

        //res.data用户信息 
        //2.发起请求 注册 post请求 
        wx.request({
          url: that.data.httpUrl + 'user/userRegister',
          //仅为示例，并非真实的接口地址
          method: "post",
          data: {
            nickname: res.data.nickName,
            imageurl: res.data.avatarUrl,
            username: e.detail.value.username,
            password: e.detail.value.password,
            phone: e.detail.value.phone
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            //res.data返回的值 console.log(res.data) 
            if (res.data.code == 0) {
              //表示成功 
            } else {
              //失败 显示提示信息 
              wx.showToast()
              wx.showToast({
                title: res.data.msg, //消息 
                icon: 'error', //图标 
                duration: 2000 //延迟时间 
              })
            }
          }
        })
      }
    })
  },
})
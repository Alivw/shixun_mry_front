// pages/mine/mine.js
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {} //存储获取的用户信息
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    //1.获取本地缓存的用户信息 
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log("我的页面获取的用户信息：", res.data)
        //把获取的用户信息存储在userInfo中进行传递 
        that.setData({
          userInfo: res.data
        })
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

  },
  //点击注册时，跳转到注册页面 
  toRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
})
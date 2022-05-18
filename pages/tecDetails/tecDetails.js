// pages/tecDetails/tecDetails.js
Page({

  /**
   * Page initial data
   */
  data: {
    httpUrl: "http://127.0.0.1/",
    httpUrlImage: "http://127.0.0.1/img/",
    tecInfo: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    console.log("获取的技师id为", options.id) //发起请求 获取该id对应的技师信息

    wx.request({
      url: that.data.httpUrl + 'technician/getTecInfoById',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json'
        // 默认值 
      },
      success(res) {
        //获取查询到的所有技术信息。赋值到tecInfo中 console.log(res.data); 
        that.setData({
          tecInfo: res.data.data
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

  }
})
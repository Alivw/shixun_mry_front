// pages/proDetails/proDetails.js
Page({

  /**
   * Page initial data
   */
  data: {
    httpUrl: "http://127.0.0.1/",
    httpImageUrl: "",
    proInfo: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    console.log("项目详情页面获取id未：", options.id);
    //根据id获取该页面需要的数据 分析：imageurl、项目名称、项目价格、项目描述、项目步骤 
    wx.request({
      url: that.data.httpUrl + 'project/getProInfoById',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值 
      },
      success(res) {
        console.log("获取的项目信息为：", res.data);
        that.setData({
          proInfo: res.data.data
        })
      }
    })
  },
  toOrder: function (e) { //通过,e.currentTarget.dataset.id取出传递的参数id console.log("点击立即悦动",e.currentTarget.dataset.id) 
    //跳转到项目的详情页面，发送项目id
    wx.navigateTo({
      url: '/pages/order/order?id=' + e.currentTarget.dataset.id,
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
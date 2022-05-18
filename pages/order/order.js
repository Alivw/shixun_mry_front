// pages/order/order.js
Page({

  /**
   * Page initial data
   */
  data: {
    httpUrl: "http://127.0.0.1/",
    httpImageUrl: "",
    busInfo: {}, //初始日期和时间方便后续使用传递 
    date: "2021-10-15",
    time: "9:00"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    console.log("订单页面获取项目id为", options.id);
    //发起请求，获取订单页面需要的数据
    wx.request({
      url: that.data.httpUrl + 'business/getBusInfoByProId',
      //发送请求
      data: {
        id: options.id
        //携带id 
      },
      header: {
        'content-type': 'application/json'
        // 默认值 
      },
      success(res) {
        console.log("获取商家信息", res.data);
        that.setData({
          //res.data 代表后台返回给前端的数据(responseData对象) //还需要调用其中的data属性才是代表商家对象信息
          busInfo: res.data.data
        })
      }
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value); //获取表单中的三个数据 //应该去判断是否已经登录 
    wx.getStorage({
      key: 'token', //当缓存中存储token说明已经登录，发送对应请求进行预定
      success(res) {
        console.log(res.data); //token信息
        //发起请求 
        wx.request({
          url: that.data.httpUrl + 'order/createOrder',
          method: "post",
          data: {
            token: res.data,
            proname: that.data.busInfo.project.proname,
            makedate: that.data.date + " " + that.data.time,
            username: e.detail.value.username,
            usertell: e.detail.value.usertell,
            information: e.detail.value.information,
            busid: that.data.busInfo.id,
            proid: that.data.busInfo.project.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            console.log(res.data)
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      },
      //当缓存没有token说明没有登录，则需要跳转到登录页面 
      fail: function () { //跳转到登录页面
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  bindTimeChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      time: e.detail.value
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
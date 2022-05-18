// pages/technician/technician.js
Page({

  /**
   * Page initial data
   */
  data: {
    httpUrl: "http://localhost/",
    httpUrlImage: "http://121.4.11.244/cdsf/img/",
    page: 1,
    tecData: [],
    isData: true
  },
  toTecDetails: function (e) {
    console.log(e.currentTarget.dataset.id); //转发到详情页面，卸载要显示的技师id 
    wx.navigateTo({
      url: "/pages/tecDetails/tecDetails?id=" + e.currentTarget.dataset.id
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this; //1.发起请求，获取第一页的数据 
    wx.request({
      url: that.data.httpUrl + 'technician/getTecInfos',
      //仅为示例，并非真实的接口地址 
      data: {
        page: that.data.page,
        limit: 5
      },
      header: {
        'content-type': 'application/json'
        // 默认值 
      },
      success(res) {
        console.log("获取的技师信息：", res.data);
        that.setData({
          tecData: res.data.data
        })

      }
    })
  },
  toTecDetails: function (e) {
    console.log(e.currentTarget.dataset.id); //转发 页面 
    wx.navigateTo({
      url: "/pages/tecDetails/tecDetails?id=" + e.currentTarget.dataset.id
    })
  },
  lower: function () {
    var that = this;
    if (that.data.isData) { //发起请求 
      that.data.page++;
      wx.request({
        url: that.data.httpUrl + 'technician/getTecInfos',
        //仅为示例，并非真实的接口地址
        data: {
          page: that.data.page,
          limit: 5
        },
        header: {
          'content-type': 'application/json' // 默认值 
        },
        success(res) {
          console.log("获取的技师信息：", res.data);
          var tecList = [...that.data.tecData, ...res.data.data];
          if (tecList.length >= res.data.count) {
            that.setData({
              isData: isData
            })
          }
          that.setData({
            tecData: tecList,
          })
        }
      })
    }
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
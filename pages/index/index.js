// pages/index/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    //轮播图片容器
    bannerData: [],
    //在data中添加专门用于存储导航图片的容器  navData:[]
    navData:[],
    proData:[],
    //后台图片路径
    httpImageUrl: "http://127.0.0.1/img/",
    //后台请求路径
    httpUrl: "http://127.0.0.1/"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    //1.发送请求，获取轮播图信息
    wx.request({
      url: that.data.httpUrl + 'image/type/banner', //发送请求
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {  //说明请求成功，把返回的数据，
          that.setData({
            //设置给data中的bannerData
            bannerData: res.data.data
          })
        } else {  //失败  提示   失败原因

        }

      }
    })

    wx.request({
      url: that.data.httpUrl + 'image/type/nav', //发送请求
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {  //说明请求成功，把返回的数据，
          that.setData({
            //设置给data中的bannerData
            navData: res.data.data
          })
        } else {  //失败  提示   失败原因

        }

      }
    })

    //3.发送请求，获取项目信息
    wx.request({
      url: that.data.httpUrl+'project/', //发送请求
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("获取项目信息",res.data)
        if(res.data.code==200){  //说明请求成功，把返回的数据，设置给data
          that.setData({
            proData:res.data.data
          })
        }else{  //失败  提示   失败原因

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
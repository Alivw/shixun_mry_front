// pages/index/index.js
let currentPage = 1 // 当前第几页,0代表第一页 
let pageSize = 10 //每页显示多少数据 
Page({

  /**
   * Page initial data
   */
  data: {
    //轮播图片容器
    bannerData: [],
    //在data中添加专门用于存储导航图片的容器  navData:[]
    navData: [],
    proData: [],
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏  
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
        if (res.data.code == 200) { //说明请求成功，把返回的数据，
          that.setData({
            //设置给data中的bannerData
            bannerData: res.data.data
          })
        } else { //失败  提示   失败原因

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
        if (res.data.code == 200) { //说明请求成功，把返回的数据，
          that.setData({
            //设置给data中的bannerData
            navData: res.data.data
          })
        } else { //失败  提示   失败原因

        }

      }
    })

    //3.发送请求，获取项目信息
    // wx.request({
    //   url: that.data.httpUrl + 'project/', //发送请求

    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log("获取项目信息", res.data)
    //     if (res.data.code == 200) { //说明请求成功，把返回的数据，设置给data
    //       that.setData({
    //         proData: res.data.data
    //       })
    //     } else { //失败  提示   失败原因

    //     }

    //   }
    // })

    this.getData()
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
    console.log("上拉触底事件")
    let that = this
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });

      //加载更多，这里做下延时加载
      setTimeout(function () {
        that.getData()
      }, 2000)
    }

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  //访问网络,请求数据  
  getData() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }

    wx.request({
      url: that.data.httpUrl + 'project/fatch', //发送请求
      data: {
        "pageNo": currentPage,
        "pageSize": pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("获取项目信息", res.data)
        if (res.data.code == 200) { //说明请求成功，把返回的数据，设置给data

          if (res.data.data && res.data.data.length > 0) {
            console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到dataList里  
            let list = that.data.proData.concat(res.data.data)
            that.setData({
              proData: list, //获取数据数组    
              loadMore: false //把"上拉加载"的变量设为false，显示  
            });
            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }
          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
        } else { //失败  提示   失败原因

        }

      }
    })
  },
  toProDetails: function (e) { //console.log(e) 
    //console.log(e.currentTarget.dataset.id) 
    //跳转到项目的详情页面。并携带当前项目的id 
    wx.navigateTo({
      url: '/pages/proDetails/proDetails?id=' + e.currentTarget.dataset.id,
    })
  }
})
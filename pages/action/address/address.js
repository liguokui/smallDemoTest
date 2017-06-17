// address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map:{
      longitude:"113.551841",
      latitude:"34.80758"
    },
    markers:[{
      iconPath: "/image/location.png",
      id: 0,
      longitude: "113.551841",
      latitude: "34.80758",
      width: 50,
      height: 50
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        wx.setStorageSync("longitude", res.longitude),
        wx.setStorageSync("latitude", res.latitude)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    this.setData({
      "map.latitude": wx.getStorageSync("latitude"),
      "map.longitude": wx.getStorageSync("longitude"),
      "markers[0].latitude": wx.getStorageSync("latitude"),
      "markers[0].longitude": wx.getStorageSync("longitude")
    } )
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
var app=getApp()
Page({
 
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    wx.makePhoneCall({
      phoneNumber: app.tel,
      success: function () {
        console.log("打电话成功"); 
      },
      fail: function () {
        console.log("打电话失败");
      },
      complete: function () {
       var pages= getCurrentPages();
        console.log("complete");
        wx.navigateBack({
          delta: 3
        })
      }
    })
  },

  call:function(e){
   wx.makePhoneCall({
     phoneNumber: '15638289787',
   })

  }
})
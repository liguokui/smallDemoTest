// test.js
var app=getApp();
var QHWdistrict = require("../../utils/district.js");
Page({ 
  data: {  
     inputvalue: "Mz67Zr",//"vaaAnq",
     item:{id:0}, 
     date: new Date().toLocaleDateString().replace(new RegExp("/","g"),"-"),
     array: [{ com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }, { com: 0 }]
    
     //************省市区三级地址列表组件 变量***************//
    ,QHWdistrictData: QHWdistrict.QHWdistrict
    ,provinceData: {}
    ,cityData: {}
    ,areaData: {}
    ,defaultvalue: [0, 0, 0]
    ,addressName: " 河南省 郑州市 中原区",//仅前台展示地址时使用
    addIndex: "10001,10013,10018"// input隐藏域使用,修改表单提交时 picker-view的value 值为省市区js文件存储的值
  }, 
  
  //下拉菜单 触发事件
  pickerHanlder: function (e) {
    var curentIndex = e.currentTarget.dataset.index
    var curentValue = e.detail.value
    this.data.array[curentIndex].com = curentValue
    this.setData({
      array: this.data.array
    })
  },
  //必填字段校验
  datacheck:function(e){
    var title = e.currentTarget.dataset.title
    if (e.currentTarget.dataset.required==true && e.detail.value==""){
       wx.showModal({
         title: '提示信息',
         content: title+" 值无效,请重新输入数据!!! ",
       }) 
    }
  },
  //form表单提交触发事件
  formsubmit:function(e){ 
    var that = this; 
    wx.request({
      url: 'https://www.yssfkj.cn/Home/SubmitForm',
      method: "POST",
      data: e.detail.value,
      header: {
        //  'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //  "{"return_code":0,"msg":"msg","data":""}"
        console.log(res);
        if (res.data.return_code == 0) {
          wx.showModal({
            title: '提示信息',
            content: '提交成功',
          })
        }
      }
    })
  },
  //form表单重置
  formreset:function(e){
    console.log(e);
  },
  //************省市区三级地址列表组件  事件/方法***************//
  //初始化省市区数据
  initData: function () {
    var provinceData = {}
    var cityData = {}
    var areaData = {}
    provinceData = this.data.QHWdistrictData.provinceData
    cityData = this.data.QHWdistrictData.cityData["10001"]
    areaData = this.data.QHWdistrictData.areaData["10013"]

    this.setData({
      provinceData: provinceData,
      cityData: cityData,
      areaData: areaData,
      defaultvalue: [0, 0, 0], 
    })
  },
  //动态列表展示
  QHWdistrictChange: function (e) {
    var curentValue = e.detail.value;
    var defultV = this.data.defaultvalue
    var addIndex = ""
    var pindex = 0
    var cindex = 0
    var aindex = 0
    var addressName = this.data.addressName 
    if (defultV[0] != curentValue[0])//切换的省份
    {
      var defaultvalue = [curentValue[0], 0, 0]
      var cityData = {}
      var areaData = {} 
      for (var pitem in this.data.provinceData) {
        if (pindex == curentValue[0])//当前省份索引等于省份列表索引,取身份编号，例如“10001”
        {
          cityData = this.data.QHWdistrictData.cityData[pitem]
          break
        }
        pindex++
      }
      for (var citem in cityData) {
        areaData = this.data.QHWdistrictData.areaData[citem] 
        break
      }
      for (var aitem in areaData) {
        addIndex += pitem + "," + citem + "," + aitem
        break
      } 
      addressName = this.data.provinceData[pitem] + "  " + cityData[citem] + "  " + areaData[aitem]
      this.setData({
        cityData: cityData,
        areaData: areaData,
        defaultvalue: defaultvalue,
        addIndex:addIndex,
        addressName: addressName
      })
    }
    else if (defultV[1] != curentValue[1])//划动市级列表,动态绑定第三列区县
    {
      var defaultvalue = [curentValue[0], curentValue[1], 0]
      var areaData = {} 
      for (var pitem in this.data.provinceData) {
        if (pindex == curentValue[0])//当前省份索引等于省份列表索引,取身份编号，例如“10001”
        { 
          break
        }
        pindex++
      }
      for (var citem in this.data.cityData) {
        if (cindex == curentValue[1]) {
          areaData = this.data.QHWdistrictData.areaData[citem]
          break
        }
        cindex++
      } 
      for (var aitem in areaData) {
        addIndex += pitem + "," + citem + "," + aitem  
        break
      }
      addressName = this.data.provinceData[pitem] + "  " + this.data.cityData[citem] + "  " + areaData[aitem]
      this.setData({
        areaData: areaData,
        defaultvalue: defaultvalue,
        addIndex: addIndex,
        addressName: addressName
      })
    }
    else if (defultV[2] != curentValue[2]) {
      var defaultvalue = curentValue 
      for (var pitem in this.data.provinceData) {
        if (pindex == curentValue[0])//当前省份索引等于省份列表索引,取身份编号，例如“10001”
        {
          break
        }
        pindex++
      }
      for (var citem in this.data.cityData) {
        if (cindex == curentValue[1]) {
          areaData = this.data.QHWdistrictData.areaData[citem]
          break
        }
        cindex++
      } 
      for (var aitem in areaData) {
        if (aindex == curentValue[2]) { 
          addIndex += pitem + "," + citem + "," + aitem
          break
        }
        aindex++  
      } 
      addressName = this.data.provinceData[pitem] + "  " + this.data.cityData[citem] + "  " + this.data.areaData[aitem]
      this.setData({
        defaultvalue: defaultvalue,
        addIndex: addIndex,
        addressName: addressName
      })
    } 
  },
  //弹出省市区遮罩层
  addselect: function () {
    this.setData({
      isShow: true
    })
  },
  //点击遮罩层透明处隐藏
  hideMask: function () {
    this.setData({
      isShow: false
    })
  },
  //选择地址遮罩层确认
  confirm: function () {
    this.setData({
      addressName: this.data.addressName
    })
    this.hideMask();
  },
    //************省市区三级地址列表组件  事件/方法***************//
  //页面初始化事件
  onLoad: function () {
    //this.initData()
  },
  //
  dateChange:function(e){
   this.setData({
     date: e.detail.value
   })
  },
  inputvalue: function (e) {
    this.setData({
      inputvalue: e.detail.value
    })
  },
  requestTab: function (e) {
    var shorturl = this.data.inputvalue;
    var that = this;
    wx.request({
      url: 'https://www.yssfkj.cn/Home/RenderFormByShortUrl',
      data: {
        shorturl: shorturl
      },
      //method:"POST",
      header: {
        'content-type': 'application/json'
        //'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        console.log(res);
        that.setData({
          form: res.data,
        })
      }
    })
    this.initData();
  },
  sendTab: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.yssfkj.cn/Home/SubmitForm',
      method: "POST",
      data: {
        shorturl: "vaaAnq",
        com1: "单行文本框0610",
        com2: "QQ2",
        com3: "选项1"
      },
      header: {
        //  'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //  "{"return_code":0,"msg":"msg","data":""}"
        console.log(res);
        if (res.data.return_code == 0) {
          wx.showModal({
            title: '提示信息',
            content: '提交成功',
          })
        }
      }
    })
  },


})

 

 
var QHWdistrict=require("district.js");
var order = ['demo1', 'demo2', 'demo3']
Page({
  data: {
    QHWdistrictData: QHWdistrict.QHWdistrict,
    provinceData:{},
    cityData:{},
    areaData:{} ,
    defaultvalue: [0, 0, 0] 
    ,isShow:false
    ,defaultAddress:""
  },
  
  //************省市区三级地址列表组件  事件/方法***************//
  //初始化列表数据
   initData:function(){
    var provinceData= {}
    var cityData = {}
    var areaData = {}
    provinceData=this.data.QHWdistrictData.provinceData
    cityData = this.data.QHWdistrictData.cityData["10001"]
    areaData = this.data.QHWdistrictData.areaData["10013"]
    
    this.setData({
       provinceData: provinceData,
       cityData: cityData,
       areaData: areaData,
       defaultvalue:[0,0,0],
       defaultAddress:"河南省 郑州市 中原区"
    })
  },
 //动态列表展示
  QHWdistrictChange: function (e) {
     var curentValue = e.detail.value;
     //var qhwdistrict = this.data.QHWdistrictData
     let defultV = this.data.defaultvalue
     if(defultV[0]!=curentValue[0])//切换的省份
     {
         var defaultvalue= [curentValue[0],0,0]
         var cityData = {}
         var areaData = {}
         var pindex = 0
         for(var pitem in this.data.provinceData)
         {
           if(pindex==curentValue[0])//当前省份索引等于省份列表索引,取身份编号，例如“10001”
           {
             cityData = this.data.QHWdistrictData.cityData[pitem]
             for(var citem in cityData){
               areaData = this.data.QHWdistrictData.areaData[citem]
               break
             }
             break
           }
           pindex++
         }
         this.setData({
           cityData:cityData,
           areaData: areaData,
           defaultvalue: defaultvalue
         })
     }
     else if (defultV[1] != curentValue[1])//划动市级列表,动态绑定第三列区县
     {
       var defaultvalue = [curentValue[0], curentValue[1], 0]
       var areaData = {}
       var cindex=0
       for (var citem in this.data.cityData)
       {
          if(cindex==curentValue[1])
          {
            areaData = this.data.QHWdistrictData.areaData[citem]
            break
          }
          cindex++
       }
       this.setData({
         areaData: areaData,
         defaultvalue: defaultvalue
       })
     }
     else if (defultV[2] != curentValue[2])
     {
       var defaultvalue = curentValue
       this.setData({
         defaultvalue: defaultvalue
       })
     } 
  },
    //************省市区三级地址列表组件  事件/方法***************//
 
  onLoad:function(){
    this.initData()
  },
  //弹出省市区遮罩层
  addselect: function () {
    this.setData({
      isShow: true
    })
  },
  //点击遮罩层透明处隐藏
  hideMask:function(){
    this.setData({
      isShow:false
    })
  },
  //选择地址遮罩层确认
  confirm:function(){ 
    this.setData({
      defaultAddress:""
    })
    this.hideMask();
  }
})  
 
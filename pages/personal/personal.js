var util = require('../../utils/util.js');
var Bmob = util.Bmob;
var app = getApp()
Page({
  data: {
    userInfo: {},
    complete:false,
    result:{}
  },
  onLoad: function (options) {
    var that = this
    var currentId = options.currentId;
    console.log(currentId)
    util.getPersonalData(currentId).then(res =>{
      that.setData({
        result: res.data,
        complete:res.ret
      });
    });



    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

  },
  personalData: function (event) {
    var that = this;
    var contact = event.detail.value.contact;
    var content = event.detail.value.content;

    if (!contact) {
      common.showTip("标题不能为空", "loading");
      return false;
    }
    else if (!content) {
      common.showTip("内容不能为空", "loading");
      return false;
    }
    else {
      that.setData({
        loading: true
      })
      util.addPersonalData()
    }

  },

})
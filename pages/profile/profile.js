// profile.js
var util = require('../../utils/util.js');


var Bmob = util.Bmob;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    myproject: [],
    join_in_porject: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var currentUser = Bmob.User.current();
    console.log(currentUser);
    var that = this
    var Project = Bmob.Object.extend("project");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(Project);
    query.equalTo("user", currentUser);
    query.find({
      success: function (results) {
        console.log("发布：共查询到 " + results.length + " 条记录");
        that.setData({
          myproject: results
        })
        // 循环处理查询到的数据
        /*
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));
        }*/
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var Project2 = Bmob.Object.extend("project");
    var query2 = new Bmob.Query(Project2);
    query2.equalTo("people", currentUser.id);
    query2.find({
      success: function (results) {
        console.log("参加：共查询到 " + results.length + " 条记录");
        that.setData({
          join_in_porject: results
        })
        // 循环处理查询到的数据
        /*
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));
        }*/
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  listAction: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("点击" + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
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
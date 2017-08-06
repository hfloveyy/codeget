// profile.js
var util = require('../../utils/util.js');
var common = require('../../utils/common.js');

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
    join_in_porject: [],
    currentId: 0,
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
    //console.log(currentUser);
    var that = this
    that.setData({
      currentId: currentUser.id
    });
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
    var Project_User = Bmob.Object.extend("project_user");
    var Project2 = Bmob.Object.extend("project");
    var query2 = new Bmob.Query(Project_User);
    var proQuery = new Bmob.Query(Project2);
    query2.equalTo("user_id", currentUser.id);
    proQuery.matchesKeyInQuery("objectId", "pro_id", query2);
    proQuery.find({
      success: function (results) {
        console.log("参加：共查询到 " + results.length + " 条记录");
        that.setData({
          join_in_porject: results
        })
        // 循环处理查询到的数据

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));

        }
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  publish_action: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("点击" + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&op=' + 'publish',
    })
  },
  joinin_action: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("点击" + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&op=' + 'joinin',
    })
  },


  about: function (e) {
    common.showModal('码赚是一个搭建客户<-->开发者项目供需平台！');
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
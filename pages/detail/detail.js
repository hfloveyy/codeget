// detail.js
var util = require('../../utils/util.js');
var Bmob = util.Bmob;
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    hidden: true,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this;
    util.getDetail(id).then(res => {
      that.setData({
        result: res.data,
        hidden: true
      });
    })
    console.log(this.data.result)
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

  },
  joinin: function () {
    var currentUser = Bmob.User.current();
    var Project = Bmob.Object.extend("project");
    var query = new Bmob.Query(Project);
    query.equalTo("objectId", this.data.result.id);

    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    query.find({
      success: function (results) {
        console.log("detail:共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        var object = results[0];
        object.addUnique("people", currentUser.id);
        object.save()
        wx.showToast({
          title: '参加项目成功!',
        });
        wx.switchTab({
          url: '../profile/profile'
        });
      },
      error: function (error) {
        console.log("detail:查询失败: " + error.code + " " + error.message);
      }
    });
  }
})
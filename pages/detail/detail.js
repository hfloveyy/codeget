// detail.js
var util = require('../../utils/util.js');
var Bmob = util.Bmob;
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    hidden: false,
    userInfo: {},
    people: {},
    isJoinin: false,
    own: {},
    ownerid: null,
    proid: null,
    pro_own:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentUser = Bmob.User.current();
    var pro_owner = new Bmob.User()
    var id = options.id
    var op = options.op
    var that = this;
    that.setData({
      ownerid: currentUser.id,
      proid: id
    });
    util.getDetail(id).then(res => {

      that.setData({
        result: res.data,
        pro_owner: res.user
      });
    });
    util.getProjectStatus(id).then(res => {
      that.setData({
        pro_own: res.data,
      });
    });
    util.getPeople(id).then(res => {

      that.setData({
        people: res.data,
      });
    });
    util.isJoinin(id, currentUser.id).then(res => {
      that.setData({
        isJoinin: res.data,
      });
    });
    //console.log(that.data.isJoinin);


    /**
        for (var i = 0; i < array.length; i++) {
          var object = array[i];
          console.log(object.id + ' - ' + object.get('title'));
        }*/

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
    var that = this
    var currentUser = Bmob.User.current();
    var Project_User = Bmob.Object.extend("project_user");
    var puQuery = new Bmob.Query(Project_User);
    puQuery.equalTo("user_id", currentUser.id);
    puQuery.find({
      success: function (results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.get('pro_id'))
          if (object.get('pro_id') == that.data.result.id) {
            that.setData({
              hidden: true
            });
            return
          }
        }
        var pro_user = new Project_User();
        pro_user.set("user_id", currentUser.id)
        pro_user.set("pro_id", that.data.result.id)
        pro_user.save().then(function (object) {
          wx.showToast({
            title: '参加项目成功!',
          });
          wx.switchTab({
            url: '../profile/profile'
          });
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    })
  },


  userDetail: function (e) {
    var developerid = e.target.dataset.developerid;
    wx.navigateTo({
      url: '../userDetail/userDetail?developerid=' + developerid + "&proid=" + this.data.proid
    })
  },
})
// userDetail.js
var util = require('../../utils/util.js');
var common = require('../../utils/common.js');

var Bmob = util.Bmob;
var app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    result: {},
    selected: false,
    proid: null,
    developerid: null,
    pro_own: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentUser = Bmob.User.current()
    var User = Bmob.Object.extend("_User");
    var query = new Bmob.Query(User);
    var that = this;
    var developerid = options.developerid;
    var proid = options.proid;
    that.setData({
      developerid: options.developerid,
      proid: options.proid
    });
    query.get(developerid, {
      success: function (result) {
        // 查询成功，调用get方法获取对应属性的值
        that.setData({
          userInfo: result
        });
      },
      error: function (object, error) {
        // 查询失败
      }
    });

    util.getPersonalData(developerid).then(res => {
      that.setData({
        result: res.data
      });
    });

    util.getProjectStatus(proid, developerid, currentUser.id).then(res => {
      that.setData({
        pro_own: res.data
      });
    });
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
  //选择开发者
  select: function (e) {
    var that = this
    var currentUser = Bmob.User.current()
    var proid = this.data.proid
    var developerid = this.data.developerid
    util.addOrder(proid, developerid, currentUser.id).then(res => {
      that.setData({
        selected: res.data
      });
      
    });
    util.updateProjectStatus(proid, "开发中").then(res => {
      that.setData({
        pro_own: res.data
      });
    });

    var fId = e.detail.formId;
    console.log(fId)
    var temp = {
      "touser": currentUser.get("openid"),
      "template_id": "fczEzaxPxcLRINlLk8VxYifX6cXAyRSz0m9p37CtSGM",
      "page": "",
      "form_id": fId,
      "data": {
        "keyword1": {
          "value": "SDK测试内容",
          "color": "#173177"
        },
        "keyword2": {
          "value": "199.00"
        },
        "keyword3": {
          "value": "123456789"
        }
      },
      "emphasis_keyword": "keyword1.DATA"
    }
    Bmob.sendMessage(temp).then(function (obj) {
      console.log('发送成功')
    },
      function (err) {
        console.log(err)
        common.showTip('失败' + err)
      });
  },

  complete: function (e) {
    var that = this;
    var proid = this.data.proid;
    util.updateProjectStatus(proid, "完成").then(res => {
      that.setData({
        pro_own: res.data
      });
    });
  },

  chatroom: function (e) {
    var currentUser = Bmob.User.current()
    wx.navigateTo({
      url: '../chatroom/chatroom?ownerid=' + currentUser.id + "&developerid=" + this.data.developerid
    })
  },

  

})
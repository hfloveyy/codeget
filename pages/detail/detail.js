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
    people: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var op = options.op
    console.log(op)
    var that = this;
    util.getDetail(id).then(res => {

      that.setData({
        result: res.data,
      });
    });
    util.getPeople(id).then(res => {

      that.setData({
        people: res.data,
      });
    });



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

    /*
    var Project = Bmob.Object.extend("project");
    var query = new Bmob.Query(Project);
    //query.equalTo("objectId", this.data.result.id);

    var that = this
    query.get(this.data.result.id, {
      success: function (result) {
        console.log("detail:" + result);
        // 循环处理查询到的数据
        var object = result
        if (object.get('people') == null) {
          var people = new Set()
          console.log("1" + people)

        } else {
          people = object.get('people')
          console.log("2" + people)
          var people_set = new Set(people)
        }
        console.log("3" + people)
        people_set.add(currentUser)
        let array = Array.from(people_set)
        object.set("people", array);
        object.save().then(function (object) {
          wx.showToast({
            title: '参加项目成功!',
          });
          wx.switchTab({
            url: '../profile/profile'
          });
        })

      },
      error: function (error) {
        console.log("detail:查询失败: " + error.code + " " + error.message);
      }
    });
    */
  }
})
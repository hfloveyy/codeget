// pages/post/post.js

var util = require('../../utils/util.js');


var Bmob = util.Bmob;
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hidden: true,
    num: 0,
    index: 0,
    budget: ['100-1000', '1000-5000', '5000-10000', '1万-3万', '3万-5万', '5万-10万', '10万以上', '待商议']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  //上传视频
  bindUpVideo: function (e) {
    var that = this;
    that.setData({
      hidden: false
    });
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        var tempFilePath = Array(res.tempFilePath);
        if (tempFilePath.length > 0) {
          var date = new Date
          var name = e.detail.value.title+".mp4";//上传的图片的别名，建议可以用日期命名
          var file = new Bmob.File(name, tempFilePath);
          file.save().then(function (res) {
            util.addPost(name,String(res.url())).then(res =>{
              console.log(res);
              wx.showToast({
                title: '上传视频成功',
              });
              wx.switchTab({
                url: '../index/index'
              });
              that.setData({
                hidden: true
              });
            })
          }, function (error) {
            console.log(error);
            that.setData({
              hidden: true
            });
          })
        }

      }
    })
    
  },
  //上传文件
  bindUpFile: function () {
    wx.chooseImage({
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        var tempFilePath = res.tempFilePaths;
        if (tempFilePath.length > 0) {
          var date = new Date
          var name = date +".jpg";//上传的图片的别名，建议可以用日期命名
          var file = new Bmob.File(name, tempFilePath);
          file.save().then(function (res) {
            console.log(res.url());
          }, function (error) {
            console.log(error);
          })
        }

      }
    })
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindInput : function (e) {
    this.setData({
      num: e.detail.value.length
    })
  },
  bindPublish: function (e) {
    this.setData({
        hidden: false
    });
    var that = this
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    let title = e.detail.value.title
    let index = e.detail.value.picker
    let days = e.detail.value.days
    let content = e.detail.value.content
    let budget = this.data.budget[index]
    let yourname = that.userInfo
    let telnum = e.detail.value.telnum




    util.addPost(title,budget,days,content,yourname,telnum).then(res => {
      var that = this
      console.log(res);
      wx.showToast({
        title: '发布项目成功',
      });
      wx.switchTab({
        url: '../index/index'
      });
      that.setData({
        hidden: true
      });
    })
  }
})
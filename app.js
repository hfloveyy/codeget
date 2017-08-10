var Bmob = require('utils/bmob.js')
var common = require('utils/common.js');
var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
Bmob.initialize("e536d63e102ea0664339f1fb98280579", "8a27ba47a9536e60293e647b28053f5e");

BmobSocketIo.initialize("e536d63e102ea0664339f1fb98280579");



App({
  onLaunch: function () {
    var user = new Bmob.User();//开始注册用户
    var newOpenid = wx.getStorageSync('openid')
    if (!newOpenid) {
      common.showModal('码赚是一个软件外包供需信息提供平台！平台本身不参与项目交易过程，如遇纠纷，与本平台无关！', "免责声明");

      wx.login({
        success: function (res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);
            wx.setStorageSync('openid', openid)
            if (user.get("nickName")) {
              // 第二次访问
              console.log(user.get("nickName"), 'res.get("nickName")');


            } else {

              //保存用户其他信息
              /*
              wx.getUserInfo({
                success: function (result) {

                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;

                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号

                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.save();

                    }
                  });

                }
              });
              */

            }

          }, function (err) {
            console.log('here');
            console.log(err, 'errr');
          });

        }
      });
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      });
    }



  },
  globalData: {
    userInfo: null
  }
})
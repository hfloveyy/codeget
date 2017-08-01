var Bmob = require('bmob.js');
var common = require('common.js');





function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//添加一条数据
function addPost(title, budget, days, content, yourname, telnum) {
  var Project = Bmob.Object.extend("project");
  var project = new Project();
  project.set("title", title);
  project.set("budget", budget);
  project.set("days", days);
  project.set("content", content);
  project.set("yourname", yourname);
  project.set("telnum", telnum);

  return new Promise((resolve, reject) => {
    //添加数据，第一个入口参数是null
    project.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建成功, objectId:" + result.id);
        resolve(result)
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建失败');
        resolve(error)
      }
    });
  });
}


//news详细页面
function getDetail(objectId) {
  var Project = Bmob.Object.extend("project");
  //创建查询对象，入口参数是对象类的实例
  var query = new Bmob.Query(Project);
  var promise = new Promise(function (resolve, reject) {
  //查询单条数据，第一个参数是这条数据的objectId值
  query.get(objectId, {
    success: function (result) {
      // 查询成功，调用get方法获取对应属性的值
      resolve({
        data: result
      })
    },
    error: function (object, error) {
      // 查询失败
      reject(error)
    }
  })
  });
  return promise
}

//得到news列表
function getList() {
  var Project = Bmob.Object.extend("project");
  var query = new Bmob.Query(Project);
  query.limit(10);
  query.descending('updatedAt')
  var results = []
  //var list = [{title:"failed"}];
  var promise = new Promise(function(resolve,reject){
    query.find({
      success: function (results) {
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          //console.log(object.id + ' - ' + object.get('title'));

        }
        resolve({
          data: results
        })
      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
        reject(error)
      }
    })
  });
  // 查询所有数据
  return promise;
  //return list;
}



module.exports = {
  formatTime: formatTime,
  addPost: addPost,
  getList: getList,
  getDetail: getDetail,
  Bmob: Bmob
}

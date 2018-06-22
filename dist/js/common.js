$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  // 恢复页面中a标签的跳转行为
  // 设置跳转 跳转到a标签的原本的网页
  $('body').on('tap', 'a', function () {
    var flag = $(this).attr('needLogin');
    var that = $(this);
    // console.log(flag);
    if (flag == 1) {
      // 需要登录
      // console.log('请登录');
      axios.get('/user/queryUserMessage')
        .then(function (data) {
          if (data.error) {
            location.href = 'login.html';
          }else{
            location.href = that.attr('href');
          }
        })
    } else {
      // 不需要登录
      location.href = $(this).attr('href');
    }
  });

})

// 配置基础路径
// axios.defaults.baseURL = 'http://fullstack.net.cn:3000';
axios.defaults.baseURL = 'http://localhost:3000';


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response.data);
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// `withCredentials` 表示跨域请求时是否需要使用凭证
// axios.defaults.withCredentials: true;// default
axios.defaults.withCredentials = true;


// $.fn 对象方法
// $.each 工具方法
// 将表单数据以json形式返回
$.fn.serializeToJson = function () {
  // serializeArray 这是一个方法
  var formAry = this.serializeArray();
  // console.log(formAry);

  var result = {};

  formAry.forEach(function (item) {
    result[item.name] = item.value;
  })

  // console.log(result);
  return result;
}


// 设置catch 返回值
function AjaxError(error) {
  mui.toast(error);
}


//  封装获取地址栏中的信息 -- 在编辑地址的页面中用来判断是否是编辑 取决于是否有id
function getUrl (name) {
  var search = location.search.slice(1);
  var ary1 = search.split('&');

  for(var i = 0; i < ary1.length; i++) {
    var ary2 = ary1[i].split('=');
    if(ary2[0] == name) {
      return ary2[1];
    }
  }
  return -1;
}

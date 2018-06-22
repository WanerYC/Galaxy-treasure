$(function () {
    // alert(1);
    // 发送ajax请求
    uesrAjax().then(userInfo);

    // 点击退出按钮 退出登录
    $('#loginoutBtn').on('tap', function() {
        // alert(1);
        // 发送ajax请求
        axios.get('/user/logout')
            .then(function(data) {
                console.log(data);
                if(data.success) {
                    mui.toast('成功退出');
                    location.href='index.html';
                }else {
                    alert('失败');
                }
            });
    });

})

// 发送ajax请求获取登录的用户信息
function uesrAjax () {
    return axios.get('/user/queryUserMessage');
}

// 将用户信息渲染到页面上
function userInfo (data) {
    return new Promise(function (resolve, reject) {
        // console.log(data);
        var html = template('userTpl', data);
        $('#uesrinfo').html(html);
        resolve();
    })
}

// 退出登录 发送ajax请求
 
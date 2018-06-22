// 入口函数
$(function() {
    $('#loginBtn').on('click', function () {
        // alert(1);
        var result = $('#loginForm').serializeToJson();
        console.log(1);
        validate(result)
            .then(validateAjax)
            .then(validateRet)
            .catch(validateError);
    })

    
})

// 表单验证 -- 用户名 密码
function validate (result) {
    return new Promise (function(resolve, reject) {
        // console.log(result);
        // 判断用户名是否为空
        if (!$.trim(result.username)) {
            // mui.toast('请输入用户名');
            reject('请输入用户名');
        } 
        // console.log(result.username);
        if (!$.trim(result.password) || result.password.length < 6) {
            // mui.toast('请输入密码');
            reject('请输入密码');
        }

        resolve(result);
    })
}

// 发送ajax请求
function validateAjax (result) {
    return axios.post('/user/login',result);
}

// 返回结果处理
function validateRet (data) {
    return new Promise(function(resolve, reject) {
        // console.log(data);
        // 判断返回的结果
        if(data.success) {
            mui.toast('登录成功,2秒后调整到个人中心页面');
            // 定时器 2s后跳转
            setTimeout(function(){
                location.href = 'user.html';
            }),2000;
            resolve();

        }else {
            // 登录失败
            mui.toast(data.message)
            reject('登录失败');
        }
    });
}

function validateError (error) {
    return mui.toast(error);
}

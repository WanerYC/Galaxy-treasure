$(function() {
    // alert(1);

    // 获取验证码
    $('#validateBtn').on('tap', function () {
        // console.log('aaaa');
        validateAjax()
            .then(validateResult);
    });

    $('#modifyBtn').on('tap', function () {
        // alert('a');
        // 获取数据
        // var result = $('#modifyFrom').serializeToJson();
        // console.log(result);
        validateFrom()
            // 发送ajax请求
            .then(modifyAjax)
            // 处理返回数据
            .then(modifyResult)
            .catch(AjaxError)
    });

});

// 获取验证码 发送ajax请求
function validateAjax () {
    return axios.get('/user/vCodeForUpdatePassword');
}

// 获取验证的ajax数据处理
function validateResult (data) {
    console.log(data);
}

// 判断表单数据
function validateFrom () {
    return new Promise (function(resolve, reject) {
        var result = $('#modifyFrom').serializeToJson();
        // 判断是否填写了原密码
        if ($.trim(result.oldPassword).length == 0) {
            reject('请输入原密码');
        }

        // 判断新密码是否填写 同时长度是否>6
        if($.trim(result.newPassword).length < 6) {
            reject('请输入新密码');
        }
        // 判断新密码和确认密码是否正确
        if (result.newPassword != result.confirmpassword) {
            reject('两次密码输入不一致');
        }

        // 判断所天的认证码是否为6位数
        if ($.trim(result.vCode).length != 6) {
            reject('请输入完整的验证码');
        }
        resolve(result);

    })
}

// 发送ajax请求
function modifyAjax (result) {
    return axios.post('/user/updatePassword',result);
}

// 处理返回结果
function modifyResult (data) {
    return new Promise(function(resolve, reject) {
        if(data.success) {
            mui.toast('修改成功,2秒后跳转到登录页面');
            // 跳转
            setTimeout(function(){
                location.href = 'login.html';
            }, 2000);
            resolve(data);
        }else {
            reject(data.message);
        }
    })
}a






















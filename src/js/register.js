$(function(){
    // alert(1);
    // 获取验证码
    $('#registercode').on('tap', function() {
        // alert(1);
        valiidateMobile()
            .then(valiidate)
            .then(valiidatePrinte)
            .catch(AjaxError);
        
    });


    // 注册事件
    $('#registerBtn').on('tap', function() {
        // console.log(1);
        // var result = $('#registerForm').serializeToJson();
        // console.log(result);
        // console.log(result.vCode);
        
        // 验证表单信息
        valiidateFrom()
            // 发送aja请求
            .then(valiidateAjax)
            // 处理ajax请求的结果
            .then(resultAjax)
            // 返回结果
            .catch(ajaxErro);
    });
});

function valiidateMobile () {
    return new Promise (function(resolve, reject) {
        // 先判断手机号是否填写
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        // registerForm
        var result = $('#registerForm').serializeToJson();
        // console.log(result);
        reg.test(result.mobile)
        if(!reg.test(result.mobile)) {
            // alert('请输入正确的手机号码');
            reject('请输入正确的手机号码');
        }
        resolve();
    })
}

// 验证码ajax请求
function valiidate () {
    return axios.get('/user/vCode');
}

function valiidatePrinte (data) {
    console.log(data);
}

// 验证表单
function valiidateFrom () {
    return new Promise(function(resolve, reject) {
        var result = $('#registerForm').serializeToJson();
        console.log(result.vCode);
        // 先判断手机号是否填写
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        // registerForm
        var result = $('#registerForm').serializeToJson();
        // console.log(result);
        reg.test(result.mobile)
        if(!reg.test(result.mobile)) {
            // mui.toast('请输入正确的手机号码');
            reject('请输入正确的手机号码');
        }
    
        // 判断用户名是否填入
        if(!$.trim(result.username)){
            // mui.toast('请输入用户名');
            reject('请输入用户名');
        }
    

        if ($.trim(result.password).length < 6) {
            // mui.toast('您输入的密码不符合要求');
            reject('您输入的密码不符合要求');
        }

        if(result.password != result.confirmpwd) {
            // mui.toast('您两次输入的密码不一致');
            reject('您两次输入的密码不一致');
        }

        // 判断输入的验证码是否为6为
        /* if (result.vCode.length != 6) {
			reject('请输入6位验证码');
		} */

        resolve(result);
    })
}

// 发送ajax请求 post
function valiidateAjax (result) {
    return axios.post('/user/register',result);
}

// 处理ajax请求
function resultAjax (data) {
    return new Promise (function(resolve, reject) {
        if (data.success) {
            mui.toast('恭喜您,注册成功,2s后跳转到登录页面');
            // 两秒后跳转到登录页面
            setTimeout(function(){
                location.href = 'login.html';
            },2000);
            resolve();
        }else {
            reject(data.message);
        }
    })
}

function ajaxErro (error) {
    mui.toast(error);
}






























































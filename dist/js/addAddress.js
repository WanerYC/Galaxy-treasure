// 入口函数
$(function () {

    thirdSelect();
    var id = getUrl('id');
    console.log(id);

    // 修改
    if (id != -1) {
        $('#addrBtn').html('修改收货地址');
        // 发送ajax 查询地址信息
        axios.get('/address/queryAddress')
            .then(function(data) {
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if(data[i].id == id) {
                        console.log(data[i]);
                        var html = template('addrTlp', data[i]);
                        $('#addAddrform').html(html);
                        thirdSelect();
                    }
                }
            });

        
    }
    // 点击确认按钮发送ajax请求
    $('#addAddressBtn').on('tap', function() {
        // alert(1231);
        var result = $('#addAddrform').serializeToJson();
        if (id != -1) {
            // 修改
            result.id = id;
            addAddrRequest('/address/updateAddress', result)
                    .then(resultAjax)
        }else {
            addAddrRequest('/address/addAddress', result)
                    .then(resultAjax)
                    .catch(AjaxError);
            /* console.log(result);
            validate()
                .then(requestAjax)
                .then(resultAjax) */
        }
    
      
        
    })
});

// 发送添加收货地址的请求
function addAddrRequest (url,result) {
	return axios.post(url, result);
}


// 发送ajax请求
function requestAjax (result) {
    return axios.post('/address/addAddress', result);
}

// 判断表单信息
function validate () {
    return new Promise (function(resolve, reject) {
        var result = $('#addAddrform').serializeToJson();
        if (!$.trim(result.recipients)) {
            reject('请输入收货人姓名');
        }
        if (!$.trim(result.postcode)) {
            reject('请输入邮编');
        }
        if (!$.trim(result.address)) {
            reject('请选择地址');
        }
        if (!$.trim(result.addressDetail)) {
            reject('请选择详细地址');
        }
        resolve(result);

    })
}

// 处理返回结果
function resultAjax (data) {
    return new Promise (function(resolve, reject) {

        if(data.success) {
            mui.toast('添加成功,2s后跳转到地址页面');
            // 定时器 懒得写了
            location.href = 'address.html';
            resolve();
            console.log(data);
        }

    });
}


// 三级联动的
function thirdSelect () {
     // alert(1);
     var cityPicker = new mui.PopPicker({layer:3});
     cityPicker.setData(cityData);
 
     var showCityPickerButton = document.getElementById('showCityPicker');
     
     showCityPickerButton.addEventListener('tap', function(event) {
 
         cityPicker.show(function(items) {
             // console.log( "你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text)
             $(showCityPickerButton).val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
         });
     }, false);
}
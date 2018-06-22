// 入口函数
$(function() {
    // alert(1);
    requestAddr()
        .then(rendAddr)
        .catch(AjaxError)
        

    $('#addressBox').on('tap', '.delBtn', function() {
        // alert(1);
        var id = $(this).attr('data-id');
        window.euem = $(this).closest('li')[0];
        console.log(euem);

        delAjax()
            .then(function(data) {
                mui.toast('删除成功');
            })

        mui.confirm('确定删除此地址么?', function(data) {
            // console.log(data); 删除-> 1  取消 -> 0
            if (data.index == 0) {

            }else {
               euem.remove(); 
            }
        });

        

        
    });
})

// 获取数据 发送ajax请求
function requestAddr () {
    return axios.get('/address/queryAddress');
}
// 将返回的页面渲染到页面中
function rendAddr (data) {
    return new Promise(function(resolve, reject) {
        if (data.length > 0) {
            // console.log(data);
            var html = template('addressTlp', {
                list: data
            });
            $('#addressBox').html(html);
            resolve(data);
        }else {
            reject('请添加收货地址');
        }

    })
}

// 删除地址发送ajax请求
function delAjax (id) {
    return axios.post('/address/deleteAddress', {id:id});
}

// 删除事件
function delComfirm (data) {
    return new Promise (function(resolve, reject) {
        mui.confirm('确定删除地址?', function() {
            alert(1);
        })

    }) 
}

// 处理删除地址返回的ajax结果
function resultAjax (data) {
    
}
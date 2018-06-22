// 入口函数 
$(function() {
    // alert(2);
    /* 发送ajax请求 从后台第一级标题
    axios.get('/category/queryTopCategory')
        .then(function(data) {
            console.log(data);
            var html = template('categoryt', data);
            $('#catagorytitle').html(html);
        }); */

    axios.get('/category/queryTopCategory')
        .then(categoryTitle)
        .then(categoryAjaxSe)
        .then(catagoryCont)
        .catch(function(error) {
            console.log(error);
            mui.toast(error);
        });

    // 点击一级菜单请求二级页面
    $('#catagorytitle').on('click', 'a', function() {
        // alert(1);
        var id = $(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        /* console.log(id);
        发送ajax请求 要求 把当前点击的id传到后台
        axios.get('/category/querySecondCategory', {
            params: {
                id:id
            }
        })
            .then(catagoryCont); */
        categoryAjaxSe(id).then(catagoryCont)
                .catch(function (error) {
                    mui.toast("当前一级分类中没有二级分类");
                });

        // console.log(this);


        
    });
}); 

// 渲染一级菜单的页面函数
function categoryTitle (data) {
    return new Promise(function(resolve, reject) {
        var html = template('categoryt', data);
        $('#catagorytitle').html(html);
    
        if (data.rows.length > 0) {
            var id = data.rows[0].id;
            resolve(id);
        } 
    })
    /* console.log(data);
    var html = template('categoryt', data);
    $('#catagorytitle').html(html); */

    /* if (data.rows.length > 0) {
        var id = data.rows[0].id;
        // console.log(id);
        categoryAjaxSe(id).then(catagoryCont);
    } */
}

// 二级页面请求 发送ajax请求
function categoryAjaxSe (id) {
    return axios.get('/category/querySecondCategory', {
        params: {
            id:id
        }
    })
}

// 渲染二级菜单的页面
function catagoryCont (data) {
    return new Promise(function (resolve, reject) {
        console.log(data);
        var html = template('categoryc', {
            list:data,
            api: axios.defaults.baseURL
        });
        $('#catagorycont').html(html);
    
        if(data.rows.length == 0) {
            reject('当前一级分类中没有二级分类');
        }else {
            resolve();
        }

    })
}

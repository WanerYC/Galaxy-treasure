var keyword = getUrl('keyword');
console.log(keyword);
var page = 1;
var pagesize = 10;

$(function() {
    // alert(1);
    if (keyword == -1) {
        mui.toast('请输入关键词');
    }

    // 发送ajax请求
    axios.get('/product/queryProduct', {
        params: {
            proName: keyword,
            page: page,
            pageSize: pagesize
        }
    })
    .then(function(data){
        console.log(data);
        var html = template('categorylTlp',{
			list:data,
			api:axios.defaults.baseURL
		});
        $('#categorylBox').html(html);
    });

});
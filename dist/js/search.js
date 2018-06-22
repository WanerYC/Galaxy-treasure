$(function () {
    // alert(1);
    
    $('#searchs').on('tap', function() {
        var keyword = $('#keyword').val();
        // console.log(keyword);

        if (keyword) {
            location.href = 'search-list.html?keyword=' + keyword;
        }else {
            mui.toast('请输入搜索关键字');
        }

    })
})
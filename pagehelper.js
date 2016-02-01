;(function($){
    
    var defaults = {
        'obj' : null, // 数据要添加那个地方的jquery对象
        'url' : null, // 请求数据的url地址
        'params' : {}, // 请求数据时所需要的参数，不需要传递pageNum
        'buildHtml' : function(){} // 生成html数据的方法
    };
    
    var page = {
        'pageNum' : 1, // 当前页数
        'pages' : null // 总页数
    };
    
    // 加载标识
    var loadComplete = true;
    
    $.pagehelper = function(options) {
        defaults = $.extend(defaults, options);
        return {
            'startPage' : startPage,
            'resetPage' : resetPage,
            'setPage' : setPage
        };
    }
    
    // 设置pageNum 与 pages
    function setPage(pageNum, pages) {
        page.pageNum = pageNum;
        page.pages = pages;
    }
    
    function resetPage() {
        var $obj = defaults.obj;
        $obj.empty();
        setPage(1);
        startPage();
    }
    
    // 请求数据
    function startPage() {
        var url = defaults.url;
        var data = defaults.params;
        data.pageNum = page.pageNum; // 获取pageNum
        var buildHtml = defaults.buildHtml;
        var $obj = defaults.obj;
        $.post(url, data, function(json){
            if(Object.prototype.toString.call(json) === '[object Object]') {
                if (json.body) {
                    page.pages = json.body.pages;
                    page.pageNum = json.body.pageNum;
                    if (json.body.list.length > 0) {
                        // 如果页面有#bb-nocontent 则移除
                        if ( $('#bb-nocontent') ) {
                        	$('#bb-nocontent').remove();
                        }
                        var html = buildHtml(json);
                        $obj.append(html);
                    } else {
                        if(page.pageNum === 1) {
                            var html='<div id="bb-nocontent" class="">\
                                 <div style="margin-top:40%; text-align: center; ">\
                                       <img src="data:image/png;base64,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">\
                                 </div>\
                              </div>';
                            $obj.html(html);
                        }
                    }
                } else {
                    var html = $('<div style="width: 100%; position: fixed; z-index:999; left: 0; top: 0; background: red; text-align: center; color: #fff; ">服务器错误</div>');
                    $('body').append(html);
                    setTimeout(function(){
                        html.remove();
                    }, 1000);
                }
            }
            // 加载完成
            loadComplete = true;
            // 加载完毕 清楚提示
            setTimeout(function(){
                if ( $('#bb-loadmore') ) {
                    $('#bb-loadmore').remove();
                }
            }, 500);
        }, 'json');
    };
    
    // 加载更多
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            
            if (!loadComplete) {
                return ;
            }
            
            loadComplete = false;
            
            var loadtext = '数据加载中';
            var loadhtml = '<div id="bb-loadmore" style="width: 100%; line-height: 1.5rem; font-size:.5em; text-align:center; margin-top:1.5rem; ">'
                + '<img style="position: relative; top:.25rem; " src="data:image/gif;base64,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">'
                + '<span style="margin-left: .25rem;">' + loadtext + '</span>' 
                + '</div>';
            defaults.obj.parent().append(loadhtml);
            
            page.pageNum = parseInt(page.pageNum) + 1;
            startPage();
        }
    });

})(window.jQuery || window.Zepto);

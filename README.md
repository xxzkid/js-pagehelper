# js-pagehelper
  js-pagehelper 是一个javascript的分页插件，用户listview这种形式的加载数据，支持上拉加载数据<br/>
  有待优化！<br/>
  有bug请提issues，感谢<br/>
  
-----------------------
  使用例子：
    先引入jQuery 或者 Zepto
    然后引入pagehelper.js
    
    列表加载方式一：
    进入页面就开始加载数据：
    
    var data = getParams(); 
  	$.pagehelper({ 
      obj : $('.list-box > ul'), 
      url : "/user/userlist", 
      params : data, 
      buildHtml : buildHtml 
  	}).startPage(); 
  	
  	function getParams() { 
  	  // ...... 获取请求需要的参数 
  	}
  	
  	function buildHtml(json) {
  	  var resultHtml = ''; 
  	  // ...... 生成所需要的html 
  	  return resultHtml; 
  	} 
  	
  	列表加载方式二：
    进入页面有第一页的数据：
    var data = getParams(); 
  	$.pagehelper({ 
      obj : $('.list-box > ul'), 
      url : "/user/userlist", 
      params : data, 
      buildHtml : buildHtml 
  	}).setPage(1, 100);
  	
  	setPage(pageNum, pages)是设置pageNum 和 pages pageNum的意思是当前页数，pages的意思是总页数
  	
  	列表加载方式三：
    有搜索条件时，点击搜索确定时调用：
    var data = getParams(); 
  	$.pagehelper({ 
      obj : $('.list-box > ul'), 
      url : "/user/userlist", 
      params : data, 
      buildHtml : buildHtml 
  	}).resetPage();
  	
  	
  	PS:服务器返回的数据内容：
  	{
  	  // 其他属性...
  	  'body':{
  	    'pageNum':1, // 当前页数
  	    'pages':100, // 总页数
  	    'list':[] // 内容对象集合
  	    // 其他属性...
  	  }
  	}
	
	
  
  

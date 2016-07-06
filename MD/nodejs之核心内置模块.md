#nodejs核心模块
- [URL模块](#url_module)
- [Query String模块](#querystring_module)
- [HTTP模块](#http_module)

##<span id='url_module'>URL模块</span>
###引用

	const url = require('url');
###url组成
例：

	http://user:pass@host.com:8080/p/a/t/h?query=string#hash
	
图解：	

![](../images/nodejs之url组成.png)

解析成对象及说明：

	{
	    protocol: 'http:', //请求协议，小写
	    slashes: true, //协议的“：”号后是否有“/”
	    auth: 'user:pass', //URL中的认证信息
	    host: 'host.com:8080', //URL主机名，包括端口信息，小写
	    port: '8080', //主机的端口号
	    hostname: 'host.com', //主机名，小写
	    hash: '#hash', //锚点部分（即：“#”及其后的部分）
	    search: '?query=string', //查询对象，即：queryString，包括之前的问号“?”
	    query: 'query=string', //查询字符串中的参数部分（问号后面部分字符串），或者使用 querystring.parse() 解析后返回的对象 例如: 'query=string' or {'query':'string'}
	    pathname: '/p/a/t/h', //URL中路径
	    path: '/p/a/t/h?query=string', //pathname 和 search的合集
	    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' //解析前的完整原始 URL，协议名和主机名已转为小写
	}
	
###方法
- url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
- url.format(urlObject)
- url.resolve(from, to)

####url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
将URL字符串转换为对象
#####参数说明

- urlString <string> 要解析的url字符串.
- parseQueryString <boolean> 如果为true， 属性query将调用模块的parse()方法转换成json对象，默认为false.
- slashesDenoteHost <boolean> 如果为true, 比如 //foo/bar 这样的URL解析为 { host: 'foo', pathname: '/bar' } 而不是 { pathname: '//foo/bar' }。 默认为 false。

#####例1

	url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
	
输出：

	Url {
	  protocol: 'http:',
	  slashes: true,
	  auth: 'user:pass',
	  host: 'host.com:8080',
	  port: '8080',
	  hostname: 'host.com',
	  hash: '#hash',
	  search: '?query=string',
	  query: 'query=string',
	  pathname: '/p/a/t/h',
	  path: '/p/a/t/h?query=string',
	  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
	  
#####例2 parseQueryString=true

	url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash',true);
	
输出：

	Url {
	  protocol: 'http:',
	  slashes: true,
	  auth: 'user:pass',
	  host: 'host.com:8080',
	  port: '8080',
	  hostname: 'host.com',
	  hash: '#hash',
	  search: '?query=string',
	  query: { query: 'string' },
	  pathname: '/p/a/t/h',
	  path: '/p/a/t/h?query=string',
	  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
	  
注意：例1和例2输出中的query属性的不同

#####例3 slashesDenoteHost=false

	url.parse('//foo/bar');
	
输出：

	Url {
	  protocol: null,
	  slashes: null,
	  auth: null,
	  host: null,
	  port: null,
	  hostname: null,
	  hash: null,
	  search: null,
	  query: null,
	  pathname: '//foo/bar',
	  path: '//foo/bar',
	  href: '//foo/bar' }
	  
#####例4 slashesDenoteHost=true

	url.parse('//foo/bar',false,true);
	
输出：

	Url {
	  protocol: null,
	  slashes: true,
	  auth: null,
	  host: 'foo',
	  port: null,
	  hostname: 'foo',
	  hash: null,
	  search: null,
	  query: null,
	  pathname: '/bar',
	  path: '/bar',
	  href: '//foo/bar' }

####url.format(urlObject)
将对象格式化为URL字符串
#####例：
	url.format({
	    protocol: 'http:',
	    slashes: true,
	    auth: 'user:pass',
	    host: 'host.com:8080',
	    port: '8080',
	    hostname: 'host.com',
	    hash: '#hash',
	    search: '?query=string',
	    query: { query: 'string' },
	    pathname: '/p/a/t/h',
	    path: '/p/a/t/h?query=string',
	    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
	});
	
输出：

	http://user:pass@host.com:8080/p/a/t/h?query=string#hash

####url.resolve(from, to)
URL路径处理

#####例

	url.resolve('/one/two/three', 'four'); // '/one/two/four'
	url.resolve('/one/two/three', './four'); // '/one/two/four'
	url.resolve('/one/two/three', '../four'); // '/one/four'
	url.resolve('/one/two/three', '../../four'); // '/four'
	url.resolve('http://example.com/', '/one'); // 'http://example.com/one'	
	url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
	url.resolve('http://example.com/one/two/three', '../four'); // 'http://example.com/one/four'
	url.resolve('http://example.com/', 'http://other.com'); 
	// 'http://other.com/'


##<span id='querystring_module'>Query String模块</span>
querystring模块提供了解析和格式化URL查询字符串的作用。
###引用

	const querystring = require('querystring');
	
###方法

- querystring.parse(str[, sep[, eq[, options]]])
- querystring.stringify(obj[, sep[, eq[, options]]])
- querystring.escape(str)
- querystring.unescape(str)

####querystring.parse(str[, sep[, eq[, options]]])

将url字符串解析成json对象

#####参数说明：

str \<string> 需要解析的url查询字符串 必填

sep \<string> 设置分隔符，默认为 '&' 选填 

eq \<string> 设置赋值符，默认为 '=' 选填

options \<object> 需要解析的url查询字符串 选填

- decodeURIComponent \<Function> URL百分比编码处理，默认 querystring.unescape()。
- maxKeys <number> 允许解析最大key的个数 默认1000。 设置为0即没有限制。

#####例1：
命令行执行node回车，输入下面代码：

	querystring.parse('foo=bar&abc=xyz&abc=123&name=zhang');
	
输出：

	{ foo: 'bar', abc: [ 'xyz', '123' ], name: 'zhang' }
	
#####例2 sep参数：
命令行执行node回车，输入下面代码：

	querystring.parse('foo=bar-abc=xyz-abc=123-name=zhang','-');
	
输出：

	{ foo: 'bar', abc: [ 'xyz', '123' ], name: 'zhang' }

#####例3 eq参数：
命令行执行node回车，输入下面代码：

	querystring.parse('foo|bar-abc|xyz-abc|123-name|zhang','-','|');
	
输出：

	{ foo: 'bar', abc: [ 'xyz', '123' ], name: 'zhang' }
	
#####例4 options参数maxKeys属性：
命令行执行node回车，输入下面代码：
	
	querystring.parse('foo=bar&abc=xyz&abc=123&name=zhang','','',{maxKeys:2});
	
输出：

	{ foo: 'bar', abc: 'xyz' }
	
#####例5 options参数decodeURIComponent属性：
命令行执行node回车，输入下面代码：
	
	querystring.parse('foo=bar&abc=xyz&abc=123&name=张', null, null, {
    decodeURIComponent: function (value) {
        return querystring.escape(value);
    }
});
	
输出：

	{ foo: 'bar', abc: [ 'xyz', '123' ], name: '%E5%BC%A0' }

####querystring.stringify(obj[, sep[, eq[, options]]])

将JSON对象格式化为查询字符串格式的字符串

#####参数说明：

obj \<object> 需要格式化为查询字符串的json对象 必填

sep \<string> 设置分隔符，默认为 '&' 选填 

eq \<string> 设置赋值符，默认为 '=' 选填

options \<object> 选填

- encodeURIComponent \<Function> URL百分比编码处理，默认 querystring.escape()。

#####例
命令行执行node回车，输入下面代码：

	querystring.stringify({ foo: 'bar', baz: ['qux', '中文'], corge: '' })
	
输出：

	'foo=bar&baz=qux&baz=%E4%B8%AD%E6%96%87&corge='

#### querystring.escape(str)和querystring.unescape(str)
这两个内置方法，分别在上述两个方法的内置使用，如果有需要分别格式化和解码URL字符串。

例1 querystring.escape(str)：

	querystring.escape('中文');
输出：

	'%E4%B8%AD%E6%96%87'
例2 querystring.unescape(str)：

	querystring.unescape('%E4%B8%AD%E6%96%87');
输出：

	'中文


##<span id='http_module'>HTTP模块</span>
###HTTP知识
- http客户端发起请求，创建端口
- http服务器在端口监听客户端请求
- http服务器向客户端返回状态和内容

http请求过程：

1. 浏览器搜索自身的DNS缓存
	例：查看chrome浏览器缓存，在chrome地址栏输入：
		
		chrome://net-internals/#dns
		
2. 搜索操作系统自身的DNS缓存（浏览器没有找到缓存或缓存已经失效）
3. 读取本地的HOST文件
4. 浏览器发起一个DNS的一个系统调用
	1. 宽带运营商服务器查看本身缓存
	2. 运营商服务器发起一个迭代DNS解析的请求
		- 运营商服务器把结果返回操作系统内核同时缓存起来
		- 操作系统内核把结果返回浏览器
		- 最终浏览器拿到了url对应的IP地址
5. 浏览器获得域名对应的IP地址后，发起HTTP "三次握手"
6. TCP/IP连接建立起来后，浏览器就可以向服务器发送HTTP请求了，使用了比如说，用HTTP的GET方法请求一个根域的一个域名，协议可以采用HTTP 1.0的一个协议
7. 服务器端接受到了这个请求，根据路径参数，经过后端的一些处理之后，把处理后的一个结果的数据返回给浏览器。
8. 浏览器拿到了网页的html代码，在解析和渲染这个页面的时候，里面的JS、CSS、图片静态资源，他们同样也是一个个HTTP请求都需要经过上面的主要的七个步骤。
9. 浏览器根据拿到的资源对页面进行渲染，最终把一个完整的页面呈现给了用户。

状态码：

- 1xx:请求建立连接
- 2xx:请求成功
- 3xx:重定向
- 4xx:客户端错误
- 5xx:服务器端错误

HTTP概念：

- 什么是回调
- 什么是同步/异步
- 什么是I/O
- 什么是单线程/多线程
- 什么是阻塞/非阻塞
- 什么是事件
- 什么是事件驱动
- 什么是基于事件驱动的回调
- 什么是事件循环

概念：
   
- 什么是作用域？   
- 什么是上下文？



http.createServer方法返回了一个http.server对象。

	var http=require("http");
	
	http.createServer(function(req,res){
	    res.writeHead(200,{
	        "content-type":"text/plain"
	    });
	    res.write("hello nodejs");
	    res.end();
	}).listen(3000);

以上代码等同于以下代码

	var http=require("http");
	var server=new http.Server();
	
	server.on("request",function(req,res){
	    res.writeHead(200,{
	        "content-type":"text/plain"
	    });
	    res.write("hello nodejs");
	    res.end();
	});
	server.listen(3000);
	
nodejs中的http模块中封装了一个HTTP服务器和一个简易的HTTP客户端，`http.Server`是一个基于事件的http服务器，`http.request`则是一个http客户端工具，用于向http服务器发起请求。而上面的createServer方法中的参数函数中的两个参数req和res则是分别代表了请求对象和响应对象。其中`req是http.IncomingMessage的实例`，`res是http.ServerResponse的实例`。

##http.Server的事件
http.Server是一个基于事件的服务器，继承自EventEmitter。

http.Server提供的事件如下：

- request：当客户端请求到来时，该事件被触发，提供两个参数req和res，表示请求和响应信息，是最常用的事件
- connection：当TCP连接建立时，该事件被触发，提供一个参数socket，是net.Socket的实例
- close：当服务器关闭时，触发事件（注意不是在用户断开连接时）
- 
###http.IncomingMessage
http.IncomingMessage提供了3个事件，如下

- data：当请求体数据到来时，该事件被触发，该事件提供一个参数chunk，表示接受的数据，如果该事件没有被监听，则请求体会被抛弃，该事件可能会被调用多次（这与nodejs是异步的有关系）
- end：当请求体数据传输完毕时，该事件会被触发，此后不会再有数据
- close：用户当前请求结束时，该事件被触发，不同于end，如果用户强制终止了传输，也是用close

http.IncomingMessage的属性：

![http.IncomingMessage属性](../images/nodejs之http.IncomingMessage属性.png)

###http.ServerResponse

http.ServerResponse有三个重要的成员函数，用于返回响应头、响应内容以及结束请求

- res.writeHead(statusCode,[heasers])：向请求的客户端发送响应头，该函数在一个请求中最多调用一次，如果不调用，则会自动生成一个响应头
- res.write(data,[encoding])：想请求的客户端发送相应内容，data是一个buffer或者字符串，如果data是字符串，则需要制定编码方式，默认为utf-8，在res.end调用之前可以多次调用
- res.end([data],[encoding])：结束响应，告知客户端所有发送已经结束，当所有要返回的内容发送完毕时，该函数必需被调用一次，两个可选参数与res.write()相同。如果不调用这个函数，客户端将用于处于等待状态。

##http客户端
http模块提供了两个函数http.request和http.get，功能是作为客户端向http服务器发起请求。

options是一个类似关联数组的对象，表示请求的参数，callback作为回调函数，需要传递一个参数，为http.ClientResponse的实例，http.request返回一个http.ClientRequest的实例。

options常用的参数有host、port（默认为80）、method（默认为GET）、path（请求的相对于根的路径，默认是“/”，其中querystring应该包含在其中，例如/search?query=byvoid）、headers（请求头内容）
如下示例代码：

	var http=require("http");
	
	var options={
	    hostname:"cn.bing.com",
	    port:80
	}
	
	var req=http.request(options,function(res){
	    res.setEncoding("utf-8");
	    res.on("data",function(chunk){
	        console.log(chunk.toString())
	    });
	    console.log(res.statusCode);
	});
	req.on("error",function(err){
	    console.log(err.message);
	});
	req.end();
	
我们运行这段代码我们在控制台可以发现，必应首页的html代码已经呈现出来了。

接下来我们来做一个关于POST请求的代码。

	var http=require("http");
	var querystring=require("querystring");
	
	var postData=querystring.stringify({
	    "content":"我真的只是测试一下",
	    "mid":8837
	});
	
	var options={
	    hostname:"www.imooc.com",
	    port:80,
	    path:"/course/document",
	    method:"POST",
	    headers:{
	        "Accept":"application/json, text/javascript, */*; q=0.01",
	        "Accept-Encoding":"gzip, deflate",
	        "Accept-Language":"zh-CN,zh;q=0.8",
	        "Connection":"keep-alive",
	        "Content-Length":postData.length,
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Cookie":"imooc_uuid=6cc9e8d5-424a-4861-9f7d-9cbcfbe4c6ae; imooc_isnew_ct=1460873157; loginstate=1; apsid=IzZDJiMGU0OTMyNTE0ZGFhZDAzZDNhZTAyZDg2ZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjkyOTk0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGNmNmFhMmVhMTYwNzRmMjczNjdmZWUyNDg1ZTZkMGM1BwhXVwcIV1c%3DMD; PHPSESSID=thh4bfrl1t7qre9tr56m32tbv0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1467635471,1467653719,1467654690,1467654957; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1467655022; imooc_isnew=2; cvde=577a9e57ce250-34",
	        "Host":"www.imooc.com",
	        "Origin":"http://www.imooc.com",
	        "Referer":"http://www.imooc.com/video/8837",
	        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2763.0 Safari/537.36",
	        "X-Requested-With":"XMLHttpRequest",
	    }
	}
	
	var req=http.request(options,function(res){
	    res.on("data",function(chunk){
	        console.log(chunk);
	    });
	    res.on("end",function(){
	        console.log("评论完毕！");
	    });
	    console.log(res.statusCode);
	});
	
	req.on("error",function(err){
	    console.log(err.message);
	})
	req.write(postData);
	req.end();


参考：
[浅析nodejs的http模块](http://www.jianshu.com/p/ab2741f78858)

[node.js之fs模块](http://www.jianshu.com/p/5683c8a93511)




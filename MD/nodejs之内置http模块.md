#HTTP模块
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




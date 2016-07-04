#Nodejs之web程序
Node的核心是一个强大的流式HTTP解析器，大概由1500行经过优化的C代码组成。这个解析器跟Node开放给javascript的底层TCP API相结合，为你提供了一个非常底层，但也非常灵活的HTTP服务器。

##http模块
使用http模块

	var http=require('http');
	
创建HTTP服务使用以下函数：

 	http.createService(callback(req, res){
 		//code
 	});
 	
createService函数只有一个参数，是一个`回调函数`，服务器每次收到HTTP请求后都会调用这个回调函数。这个请求回调会收到两个参数，`请求`和`响应`对象。 

	var http=require('http');
	http.createServer(function(req,res){
		//处理请求
	});
	
res.write()方法，将响应数据写到socket中
res.end()方法结束响应
res.write()和res.end()可以缩写成一条语句，res.end('响应数据');

服务器每收到一条HTTP请求，都会用新的req和res对象触发请求回调函数，   
在触发回调函数之前，Node会解析请求的http头，并将它们作为req对象的一部分提供给请求回调。    
但node不会在请求回调函数被触发之前开始对请求体的解析，    
node不会自动往客户端写任何响应。在调用完请求回调函数之后，就要由你负责用res.end()方法结束响应。如果没能结束响应，请求会挂起，知道客户端超时，或者它会一直处于打开状态。

修改http响应头的方法：

	res.setHeader(field,value);
	res.getHeader(field);
	res.removeHeader(field);
	
添加和移除响应头的顺序可以随意，但一定要在调用res.write()或res.end()之前。在响应主体的第一部分写入之后，node会刷新已经设定好的http头。

设定http响应状态码：

	res.statusCode=302/200/404等状态码
	
在程序响应期间可以随时给这个属性赋值，只要是在第一次调用res.write()或res.end()之前就行。

node中，通过检查`req.method`属性查看用的是哪个http方法

当node的http解析器读入并解析请求数据时，它会将数据做成data事件的形式，把解析好的数据块放入其中，等待程序处理。默认情况下，data事件会提供Buffer对象，这是Node版的字节数组。

通过调用`req.setEncoding(encoding)`方法设置编码

为了提高响应速度，如果可能的话，应该在`响应`中带Content-Length域一起发送。Content-Length的值应该是字节长度，不是字符长度，Node提供了一个Buffer.byteLength()方法。

__dirname是该文件所在目录的路径。

在Node中，所有继承了EventEmitter的类都可能会发出error事件。

##Node的REPL
Node跟很多其他语言一样，提供了一个REPL(读取-计算-输出-循环)环境，在命令行中不带任何参数运行node就可以进入这个环境。用REPL可以编写代码片段，每条语句写好并执行后马上就能得到结果。对于学习编程语言、运行简单的测试、甚至是调试都很有帮助。 

例：通过url模板的.parse()函数，解析url.

	node
	> require('url').parse('http://localhost:3000/1?api-key=foobar')
	Url {
	  protocol: 'http:',
	  slashes: true,
	  auth: null,
	  host: 'localhost:3000',
	  port: '3000',
	  hostname: 'localhost',
	  hash: null,
	  search: '?api-key=foobar',
	  query: 'api-key=foobar',
	  pathname: '/1',
	  path: '/1?api-key=foobar',
	  href: 'http://localhost:3000/1?api-key=foobar' }
	>

##利用crul构建RESTful web服务
cURL是一个强大的命令行HTTP客户端，可以用来向目标服务器发送请求。

创建文件index.js,代码如下：

	var http = require('http');
	var items = [];
	http.createServer(function (req, res) {
	    var item = "";
	    switch (req.method) {
	        case 'POST':
	            req.on('data', function (chunk) {
	                item += chunk;
	                console.log("OK");
	            });
	            req.on('end', function () {
	                items.push(item);
	                console.log("Done");
	                res.end();
	            });
	            break;
	        case 'GET':
	            items.forEach(function (item, i) {
	                res.write(i + ") " + item + "\n");
	            });
	            res.end();
	            break;
	    }
	}).listen(3000);
	
命令行执行(命令行1)：

	node index.js
	
再新打开一个命令行执行(命令行2)：

	curl -d 'hello' http://localhost:3000
	
此时命令行1显示：

	OK
	Done
	
命令行2继续执行：

	curl -d 'world!' http://localhost:3000
	
此时命令行1显示：

	OK
	Done
	OK
	Done
命令行2继续执行：

	curl http://localhost:3000
	
此时命令行2显示：

	0) hello
	1) world!
	
##静态文件服务
因为传输的文件是静态的，所以我们可以用stat()系统调用获取文件的相关信息，比如修改时间、字节数或得到错误码等。如果文件不存在，fs.stat()会在err.code中放入ENOENT作为响应。

##处理表单输入
表单提交请求带的Content-Type值通常有两种：
application/x-www-form-urlencoded:这是HTML表单的默认值；
multipart/from-data:表单中含有文件或非ASCII或二进制数据时使用。


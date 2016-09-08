#nodejs之文件系统
fs是filesystem的缩写，该模块提供本地文件的读写能力，基本上是POSIX文件操作命令的简单包装。但是，这个模块几乎对所有操作提供异步和同步两种操作方式，供开发者选择.

异步方法最后一个参数都是回调函数，这个回调的参数取决于方法，不过第一个参数一般都是异常。如果操作成功，那么第一个参数就是 null 或 undefined。

当使用一个同步操作的时候，任意的异常都立即抛出，可以用 try/catch 来处理异常，使得程序正常运行。

例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()。

例：

	var fs = require("fs");
	
	// 异步读取
	fs.readFile('input.txt', function (err, data) {
	    if (err) {
	        return console.error(err);
	    }
	    console.log("异步读取: " + data.toString());
	});
	
	// 同步读取
	try {
	    var data = fs.readFileSync('input.txt');
	    console.log("同步读取: " + data.toString());
	} catch (err) {
	    console.error(err);
	}
	
	console.log("程序执行完毕。");
	
使用相对路径时，路径是相对 `process.cwd()` 来说的。

大部分 fs 函数会忽略回调参数，如果忽略，将会用默认函数抛出异常。如果想得到原调用点的堆栈信息，需要设置环境变量 `NODE_DEBUG`。

例，创建文件fsomitcallback.js，代码如下：

	require('fs').readFile('/');
	
命令行运行：

	node fsomitcallback.js

输出：

	fs.js:95
      throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      ^
	
	Error: EISDIR: illegal operation on a directory, read
	    at Error (native)
	    
此时无法看错异常的根源，命令行再运行：

	env NODE_DEBUG=fs node fsomitcallback.js
	
输出：

	fs.js:88
	        throw backtrace;
	        ^
	
	Error: EISDIR: illegal operation on a directory, read
	    at rethrow (fs.js:83:21)
	    at maybeCallback (fs.js:101:42)
	    at Object.fs.readFile (fs.js:266:18)
	    at Object.<anonymous> (/opt/lunachi_git/blog/code/nodejs/fsomitcallback.js:1:77)
	    at Module._compile (module.js:541:32)
	    at Object.Module._extensions..js (module.js:550:10)
	    at Module.load (module.js:456:32)
	    at tryModuleLoad (module.js:415:12)
	    at Function.Module._load (module.js:407:3)
	    at Function.Module.runMain (module.js:575:10)

##导入文件系统模块(fs)
	
	const fs = require('fs');
	
##文件系统(fs)方法
- [open 打开文件](#open)
- [stat 获取文件信息](#stat)
- [writeFile 写入文件](#writeFile)
- [read 读取文件](#read)
- [close 关闭文件](#close)
- [ftruncate 截取文件](#ftruncate)
- [unlink 删除文件](#unlink)
- [mkdir 创建目录](#mkdir)
- [readdir 读取目录](#readdir)
- [rmdir 删除目录](#rmdir)

###<span id='open'>open 打开文件</span>
####语法：

	fs.open(path, flags[, mode], callback)
	
####参数说明：

- path 文件的路径。
- flags 文件打开的行为。
- mode 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
- callback 回调函数，带有两个参数如：callback(err, fd)。

flags取值说明：

<table>
    <tbody>
    <tr>
        <th>Flag</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>r</td>
        <td>以读取模式打开文件。如果文件不存在抛出异常。</td>
    </tr>
    <tr>
        <td>r+</td>
        <td> 以读写模式打开文件。如果文件不存在抛出异常。</td>
    </tr>
    <tr>
        <td>rs</td>
        <td>以同步的方式读取文件。</td>
    </tr>
    <tr>
        <td>rs+</td>
        <td>以同步的方式读取和写入文件。</td>
    </tr>
    <tr>
        <td>w</td>
        <td>以写入模式打开文件，如果文件不存在则创建。</td>
    </tr>
    <tr>
        <td>wx</td>
        <td>类似 'w'，但是如果文件路径存在，则文件写入失败。</td>
    </tr>
    <tr>
        <td>w+</td>
        <td>以读写模式打开文件，如果文件不存在则创建。</td>
    </tr>
    <tr>
        <td>wx+</td>
        <td>类似 'w+'， 但是如果文件路径存在，则文件读写失败。</td>
    </tr>
    <tr>
        <td>a</td>
        <td>以追加模式打开文件，如果文件不存在则创建。</td>
    </tr>
    <tr>
        <td>ax</td>
        <td>类似 'a'， 但是如果文件路径存在，则文件追加失败。</td>
    </tr>
    <tr>
        <td>a+</td>
        <td>以读取追加模式打开文件，如果文件不存在则创建。</td>
    </tr>
    <tr>
        <td>ax+</td>
        <td>类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。</td>
    </tr>
    </tbody>
</table>

####示例：
创建 file.js 文件，并打开 input.txt 文件进行读写

	var fs = require("fs");
	
	// 异步打开文件
	fs.open('input.txt', 'r+', function(err, fd) {
		if (err) {
			return console.error(err);
		}
		console.log("文件打开成功！");     
	});



###<span id='stat'>stat 获取文件信息</span>
####语法：

	fs.stat(path, callback)
	
####参数说明：

- path - 文件路径。
- callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。

fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：

	var fs = require('fs');
	
	fs.stat('input.txt', function (err, stats) {
	    console.log(stats.isFile());
	})
	
stats类中的方法有：

<table>
    <tbody>
    <tr>
        <th>方法</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>stats.isFile()</td>
        <td>如果是文件返回 true，否则返回 false。</td>
    </tr>
    <tr>
        <td>stats.isDirectory()</td>
        <td>如果是目录返回 true，否则返回 false。</td>
    </tr>
    <tr>
        <td>stats.isBlockDevice()</td>
        <td>如果是块设备返回 true，否则返回 false。</td>
    </tr>
    <tr>
        <td>stats.isCharacterDevice()</td>
        <td>如果是字符设备返回 true，否则返回 false。</td>
    </tr>
    <tr>
        <td>stats.isSymbolicLink()</td>
        <td>如果是软链接返回 true，否则返回 false。</td>
    </tr>
    <tr>
        <td>stats.isFIFO()</td>
        <td>如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。</td>
    </tr>
    <tr>
        <td>stats.isSocket()</td>
        <td>如果是 Socket 返回 true，否则返回 false。</td>
    </tr>
    </tbody>
</table>

####示例：

	var fs = require("fs");
	
	console.log("准备打开文件！");
	fs.stat('input.txt', function (err, stats) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log(stats);
	   console.log("读取文件信息成功！");
	   
	   // 检测文件类型
	   console.log("是否为文件(isFile) ? " + stats.isFile());
	   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
	});

###<span id='writeFile'>writeFile 写入文件</span>
####语法：

	fs.writeFile(filename, data[, options], callback)
	
如果文件存在，该方法写入的内容会覆盖旧的文件内容。

####参数说明：

- path - 文件路径。
- data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
- options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
- callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
 
####示例：

	var fs = require("fs");
	
	console.log("准备写入文件");
	fs.writeFile('input.txt', '我是通过写入的文件内容！',  function(err) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("数据写入成功！");
	   console.log("读取写入的数据！");
	   fs.readFile('input.txt', function (err, data) {
	      if (err) {
	         return console.error(err);
	      }
	      console.log("异步读取文件数据: " + data.toString());
	   });
	});

###<span id='read'>read 读取文件</span>
####语法：

	fs.read(fd, buffer, offset, length, position, callback)
	
####参数说明：

- fd - 通过 fs.open() 方法返回的文件描述符。
- buffer - 数据写入的缓冲区。
- offset - 缓冲区写入的写入偏移量。
- length - 要从文件中读取的字节数。
- position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
- callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。

####示例：

	var fs = require("fs");
	var buf = new Buffer(1024);
	
	console.log("准备打开已存在的文件！");
	fs.open('input.txt', 'r+', function(err, fd) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("文件打开成功！");
	   console.log("准备读取文件：");
	   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
	      if (err){
	         console.log(err);
	      }
	      console.log(bytes + "  字节被读取");
	      // 仅输出读取的字节
	      if(bytes > 0){
	         console.log(buf.slice(0, bytes).toString());
	      }
	   });
	});

###<span id='close'>close 关闭文件</span>
####语法：

	fs.close(fd, callback)
	
####参数说明：

- fd - 通过 fs.open() 方法返回的文件描述符。
- callback - 回调函数，没有参数。

####示例：

	var fs = require("fs");
	var buf = new Buffer(1024);
	
	console.log("准备打开文件！");
	fs.open('input.txt', 'r+', function(err, fd) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("文件打开成功！");
	   console.log("准备读取文件！");
	   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
	      if (err){
	         console.log(err);
	      }
	
	      // 仅输出读取的字节
	      if(bytes > 0){
	         console.log(buf.slice(0, bytes).toString());
	      }
	
	      // 关闭文件
	      fs.close(fd, function(err){
	         if (err){
	            console.log(err);
	         } 
	         console.log("文件关闭成功");
	      });
	   });
	});

###<span id='ftruncate'>ftruncate 截取文件</span>
####语法：

	fs.ftruncate(fd, len, callback)
	
####参数说明：

- fd - 通过 fs.open() 方法返回的文件描述符。
- len - 文件内容截取的长度。
- callback - 回调函数，没有参数。

####示例：

	var fs = require("fs");
	var buf = new Buffer(1024);
	
	console.log("准备打开文件！");
	fs.open('input.txt', 'r+', function(err, fd) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("文件打开成功！");
	   console.log("截取10字节后的文件内容。");
	   
	   // 截取文件
	   fs.ftruncate(fd, 10, function(err){
	      if (err){
	         console.log(err);
	      } 
	      console.log("文件截取成功。");
	      console.log("读取相同的文件"); 
	      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
	         if (err){
	            console.log(err);
	         }
	
	         // 仅输出读取的字节
	         if(bytes > 0){
	            console.log(buf.slice(0, bytes).toString());
	         }
	
	         // 关闭文件
	         fs.close(fd, function(err){
	            if (err){
	               console.log(err);
	            } 
	            console.log("文件关闭成功！");
	         });
	      });
	   });
	});

###<span id='unlink'>unlink 删除文件</span>
####语法：

	fs.unlink(path, callback)
	
####参数说明：

- path - 文件路径。
- callback - 回调函数，没有参数。

####示例：

	var fs = require("fs");
	
	console.log("准备删除文件！");
	fs.unlink('input.txt', function(err) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("文件删除成功！");
	});

###<span id='mkdir'>mkdir 创建目录</span>
####语法：
	
	fs.mkdir(path[, mode], callback)
	
####参数说明：

- path - 文件路径。
- mode - 设置目录权限，默认为 0777。
- callback - 回调函数，没有参数。

####示例：

	var fs = require("fs");
	
	console.log("创建目录 /tmp/test/");
	fs.mkdir("/tmp/test/",function(err){
	   if (err) {
	       return console.error(err);
	   }
	   console.log("目录创建成功。");
	});

###<span id='readdir'>readdir 读取目录</span>
####语法：

	fs.readdir(path, callback)
	
####参数说明：
- path - 文件路径。
- callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。

####示例：

	var fs = require("fs");
	
	console.log("查看 /tmp 目录");
	fs.readdir("/tmp/",function(err, files){
	   if (err) {
	       return console.error(err);
	   }
	   files.forEach( function (file){
	       console.log( file );
	   });
	});

###<span id='rmdir'>rmdir 删除目录</span>
####语法：

	fs.rmdir(path, callback)
	
####参数说明：

- path - 文件路径。
- callback - 回调函数，没有参数。

####示例：

	var fs = require("fs");
	
	console.log("准备删除目录 /tmp/test");
	fs.rmdir("/tmp/test",function(err){
	   if (err) {
	       return console.error(err);
	   }
	   console.log("读取 /tmp 目录");
	   fs.readdir("/tmp/",function(err, files){
	      if (err) {
	          return console.error(err);
	      }
	      files.forEach( function (file){
	          console.log( file );
	      });
	   });
	});

<br>
参考：   
[http://www.runoob.com/nodejs/nodejs-fs.html](http://www.runoob.com/nodejs/nodejs-fs.html)



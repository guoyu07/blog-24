#nodejs之REPL
REPL “读取-求值-输出”循环（英语：Read-Eval-Print Loop，简称REPL）是一个简单的，交互式的编程环境。

##执行REPL
命令行中输入node然后回车，即可进入REPL界面，其中>开头的行是手工输入并按回车的代码，其他部分为REPL的输出结果。

	$ node
	> 

因为REPL环境内部使用eval函数来评估该表达式的执行结果，所以有些东西我们可以直接这样写，如对象：

	> {a:1,b:2}
	{ a: 1, b: 2 }

###下划线 _
使用_可以指代上一次的操作执行后的值，比如

对象：

	> {a:1,b:2,c:3}
	{ a: 1, b: 2, c: 3 }
	
	> for(var key in _){
	..... console.log('key : ' + key + ',value : ' + _[key]);
	..... }
	
	key : a,value : 1
	key : b,value : 2
	key : c,value : 3
	//这里的_指代的是上一次执行操作后的对象
	
###内置REPL方法
通过键入.help可以看到：

	> .help
	break	Sometimes you get stuck, this gets you out
	clear	Alias for .break
	exit	Exit the repl
	help	Show repl options
	load	Load JS from a file into the REPL session
	save	Save all evaluated commands in this REPL session to a file

####.break & .clear
作用：中断当前的出入。
你想退出你当前的输入环境，使用.break 或者 .clear ，快捷键ctrl + c

	> function show(){
	... console.log('');
	... .clear           //.clear 或 .break
	> 

####.exit
作用：退出REPL ；快捷键：ctrl + d

直接退出REPL，回到命令行。

	> .exit
	
####.save
将当前REPL中所有会话保存到文件中

	> function sum(a,b){
	... return a + b;
	... }
	undefined
	
	> function substract(a,b){
	... return a - b;
	... }
	undefined
	
	> .save calculator.js
	Session saved to:calculator.js

####.load
加载文件进入到当前的REPL会话。

	> .load calculator.js
	
	> function sum(a,b){
	... return a + b;
	... }
	undefined
	
	> function substract(a,b){
	... return a - b;
	... }
	undefined
	
	> sum(3,5)
	8
	
	> substract(8,2)
	6

###REPL快捷键

- ctrl + c - 退出当前终端。
- ctrl + c 按下两次 - 退出 Node REPL。
- ctrl + d - 退出 Node REPL.
- 向上/向下 键 - 查看输入的历史命令
- tab 键 - 列出当前命令

> 一门语言在运行的时候，需要一个环境，叫做宿主环境。对于JavaScript，宿主环境最常见的是web浏览器。

所以这时的this通常指代的时window。

而在node的REPL中，this指代的是global

	> this
	{ DTRACE_NET_SERVER_CONNECTION: [Function],
	  DTRACE_NET_STREAM_END: [Function],
	...
	
	> this === global
	true

REPL的优势在于：

- 可以debugging
- 做一些testing
- 快速的实践执行操作

##定制repl
###例1
创建文件repl.js，代码如下：

	const repl = require('repl');
	var msg = 'message';
	
	repl.start('> ').context.m = msg;

命令行运行：
	
	node repl.js
	
输出：
	
	>
	
然后输入m 输出如下:

	> m
	'message'
	>
但此时m并不是一个只读的属性，可随时修改m的赋值，如下代码所示：

	> m
	'message'
	> m="重新赋值m"
	'重新赋值m'
	> m
	'重新赋值m'
	>
	
以上代码并不是我们想看到的，所以通过Object.defineProperty()将m设置为只读：

	const repl = require('repl');
	var msg = 'message';
	
	const r = repl.start('> ');
	const c = r.context;
	
	Object.defineProperty(c, 'm', {
	    configurable: false,
	    enumerable: true,
	    value: msg
	});
	
命令行运行：
	
	node repl.js
	
输出：

	> m
	'message'
	> m="重新赋值m"
	'重新赋值m'
	> m
	'message'
	>

###例2
通过nodejs命令行和REPL来测试模块代码

创建文件repl_module_test.js，代码如下：

	var initNum = 100;
	function add(a, b) {
	    var sum = initNum + a + b;
	    console.log(initNum + " + " + a + " + " + b + " = " + sum);
	    return sum;
	}
	exports.add = add;
	
创建文件repl_test.js，代码如下：

	#!/usr/bin/env node
	
	//引入核心模块repl
	var repl = require('repl');
	//创建一个REPL
	var r = repl.start('> ');
	//context即为REPL中的上下文环境
	var c = r.context;
	
	//测试repl_module_test.js模块代码
	var replModuleTest = require("./repl_module_test");
	c.rma = replModuleTest.add;
	
文件第一行的#!/usr/bin/env node表示这是一个脚本文件，使用node命令来执行它，所以还要给这个文件加上可执行权限：

	chmod +x repl_test.js
	
命令行执行：

	./repl_test.js
	
在输出> 后面输入rma(2,4);回车，代码如下：

	> rma(2,4);
	100 + 2 + 4 = 106
	106
	
之后每次更改了代码，只要按两下ctrl+d来退出当前REPL，再执行./repl_test.js来启动程序，然后输入rma(2,4);就可以看到效果了。

但每次修改了模块代码都要重启REPL很麻烦，是否可以重新加载一次这个模块？

从[Node.js的模块系统文档](https://nodejs.org/api/modules.html#modules_caching)可知，在使用require()来加载模块后，相关的文件内容会被缓存到require.cache[filename]中，当再次require()此文件的时候并不会重新加载。所以要想在不重启进程的情况下重新加载模块，我们就要清理这个模块相关的所有缓存。

把repl_test.js文件改成以下代码：

	#!/usr/bin/env node
	
	var fs = require('fs');
	var path = require('path');
	
	//引入核心模块repl
	var repl = require('repl');
	//创建一个REPL
	var r = repl.start('> ');
	//context即为REPL中的上下文环境
	var c = r.context;
	
	c._load = function () {
	    //测试repl_module_test.js模块代码
	    var replModuleTest = require("./repl_module_test");
	    c.rma = replModuleTest.add;
	};
	
	// 在REPL中执行reload()可重新加载模块
	c.reload = function () {
	    var t = Date.now();
	    // 清空当前项目根目录下所有文件的缓存
	    var dir = path.resolve(__dirname) + path.sep;
	    for (var i in require.cache) {
	        if (i.indexOf(dir) === 0) {
	            delete require.cache[i];
	        }
	    }
	    // 重新执行初始化
	    c._load();
	    console.log('OK. (spent %sms)', Date.now() - t);
	};
	
	c._load();

命令行执行：

	./repl_test.js
	
输入rma(2,4);回车，代码如下：

	> rma(2,4);
	100 + 2 + 4 = 106
	106
	
将repl_module_test.js中的initNum由100改为200后，只要在REPL中执行reload()函数就能重新载入最新的代码了：

	> rma(2,4);
	100 + 2 + 4 = 106
	106
	> reload();
	OK. (spent 9ms)
	undefined
	> rma(2,4);
	200 + 2 + 4 = 206
	206
	
##repl.start([options])
repl.start()方法创建和开始一个repl.REPLServer实例。
参数：

options \<Object>

- prompt \<String> 输入提示，默认 > 
- input \<Readable> 输入流，默认process.stdin.
- output <Writable> 输出流，默认process.stdout.
- terminal \<boolean> 
- eval \<Function> 对每行的输入求值. 默认JavaScript eval()
- useColors <boolean> 
- useGlobal <boolean> 如果设定为true，那么repl就会使用global对象而不是在一个独立环境里运行脚本。默认为false。
- ignoreUndefined <boolean> 如果设定为true，那么repl将不会输出未定义命令的返回值。默认为false。
- writer <Function> 每一个命令被求值时都会调用此函数，而该函数会返回显示的格式（包括颜色）。默认为util.inspect.
- replMode :
	- repl.REPL_MODE_SLOPPY - sloppy mode.
	- repl.REPL_MODE_STRICT - strict mode. 
	- repl.REPL_MODE_MAGIC - default mode.
	- breakEvalOnSigint
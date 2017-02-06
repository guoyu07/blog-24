#JS中的模块规范(CommonJS,AMD,CMD)
这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。目前这些规范的实现都能达成浏览器端模块化开发的目的。

##CommonJS
CommonJS是node.js项目引入的模块化规范，用于服务器环境（服务器端模块）。

在CommonJS中，有一个全局性方法require()，用于加载模块。

假定有一个数学模块math.js，就可以像下面这样加载。

	var math = require('math');
然后，就可以调用模块提供的方法：

	var math = require('math');
	math.add(2,3); // 5
	
有了服务器端模块以后，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。

但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。

第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。
	
CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}

- require()用来引入外部模块；
- exports对象用于导出当前模块的方法或变量，唯一的导出口；
- module对象就代表模块本身。

##AMD(异步模块定义规范)
服务器端的JS

- 相同的代码需要多次执行
- CPU和内存资源是瓶颈
- 加载时从磁盘中加载

浏览器端的JS

- 代码需要从一个服务器端分发到多个客户端执行
- 带宽是瓶颈
- 加载时需要通过网络加载

AMD主要为前端(浏览器)JS的表现制定的规范。

AMD就只有一个接口：define(id?,dependencies?,factory);

它要在声明模块的时候制定所有的依赖(dep)，并且还要当做形参传到factory中，像这样：

	define(['dep1','dep2'],function(dep1,dep2){...});
	
要是没什么依赖，就定义简单的模块：

	define(function(){
		var exports = {};
		exports.method = function(){...};
		return exports;
	});

它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：

	require([module], callback);
第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：

	require(['math'], function (math) {
		math.add(2, 3);
	});
	
math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。

[AMD的WIKI中文版](https://github.com/amdjs/amdjs-api/wiki/AMD-\(%E4%B8%AD%E6%96%87%E7%89%88\) "")

AMD就是这样一种对模块的定义，使模块和它的依赖可以被异步的加载，但又按照正确的顺序。
RequireJS是一个Javascript 文件和模块框架,
它支持浏览器和像node.js之类的服务器环境。使用RequireJS,你可以顺序读取仅需要相关依赖模块。

RequireJS所做的是，在你使用script标签加载你所定义的依赖时，将这些依赖通过head.appendChild()函数来加载他们。当依赖加载以后，RequireJS计算出模块定义的顺序，并按正确的顺序进行调用。这意味着你需要做的仅仅是使用一个“根”来读取你需要的所有功能，然后剩下的事情只需要交给RequireJS就行了。为了正确的使用这些功能，你定义的所有模块都需要使用RequireJS的API，否者它不会像期望的那样工作。

RequireJS API 存在于RequireJS载入时创建的命名空间requirejs下。其主要API主要是下面三个函数:
define– 该函数用户创建模块。每个模块拥有一个唯一的模块ID，它被用于RequireJS的运行时函数，define函数是一个全局函数，不需要使用requirejs命名空间.
require– 该函数用于读取依赖。同样它是一个全局函数，不需要使用requirejs命名空间.
config– 该函数用于配置RequireJS.

####data-main属性
当你下载RequireJS之后，你要做的第一件事情就是理解RequireJS是怎么开始工作的。当RequireJS被加载的时候，它会使用data-main属性去搜寻一个脚本文件（它应该是与使用src加载RequireJS是相同的脚本）。data-main需要给所有的脚本文件设置一个根路径。根据这个根路径，RequireJS将会去加载所有相关的模块。下面的脚本是一个使用data-main例子：

	<script src="scripts/require.js" data-main="scripts/app.js"></script>
	
####配置函数
如果你想改变RequireJS的默认配置来使用自己的配置，你可以使用require.config函数。config函数需要传入一个可选参数对象，这个可选参数对象包括了许多的配置参数选项。下面是一些你可以使用的配置：

- baseUrl——用于加载模块的根路径。
- paths——用于映射不存在根路径下面的模块路径。
- shims——配置在脚本/模块外面并没有使用RequireJS的函数依赖并且初始化函数。假设underscore并没有使用  RequireJS定义，但是你还是想通过RequireJS来使用它，那么你就需要在配置中把它定义为一个shim。
- deps——加载依赖关系数组

####用RequireJS定义模块
模块是进行了内部实现封装、暴露接口和合理限制范围的对象。ReuqireJS提供了define函数用于定义模块。按章惯例每个Javascript文件只应该定义一个模块。define函数接受一个依赖数组和一个包含模块定义的函数。通常模块定义函数会把前面的数组中的依赖模块按顺序做为参数接收。
####使用require函数
在RequireJS中另外一个非常有用的函数是require函数。require函数用于加载模块依赖但并不会创建一个模块。例如：下面就是使用require定义了能够使用jQuery的一个函数。

	require(['jquery'], function ($) {
	    //jQuery was loaded and can be used now
	});


###require.js
RequireJS就是实现了AMD规范。

require.js解决了两个问题：

1. 实现js文件的异步加载，避免网页失去响应；
2. 管理模块之间的依赖性，便于代码的编写和维护。

require.js要求，每个模块是一个单独的js文件。这样的话，如果加载多个模块，就会发出多次HTTP请求，会影响网页的加载速度。因此，require.js提供了一个优化工具r.js，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少HTTP请求数。

##CMD
	define(function(require,exports,module){...});
[seajs官方doc](http://seajs.org/docs/#docs) "")

##AMD 和 CMD 的异同
###相同点
RequireJS 和 Sea.js 都是模块加载器，倡导模块化开发理念，核心价值是让 JavaScript 的模块化开发变得简单自然。
###不同点：
1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）
2. CMD 推崇依赖就近，AMD 推崇依赖前置。	
	
		// CMD
		define(function(require, exports, module) {
		   var a = require('./a');
		   a.doSomething();
		   // 此处略去 100 行   
		   var b = require('./b');
		   // 依赖可以就近书写   
		   b.doSomething();
		   // ... 
		})
		
		// AMD 默认推荐的是
		define(['./a', './b'], function(a, b) {
			// 依赖必须一开始就写好    
			a.doSomething();
			// 此处略去 100 行
			b.doSomething();
			//...
		})
3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。



##AMD规范API说明：
###define() 函数
本规范只定义了一个函数 "define"，它是全局变量。函数的描述为：

	define(id?, dependencies?, factory);

###id
####名字
第一个参数，id，是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。
####模块名的格式
模块名用来唯一标识定义中模块，它们同样在依赖数组中使用。AMD的模块名规范是CommonJS模块名规范的超集。引用如下：

- 模块名是由一个或多个单词以正斜杠为分隔符拼接成的字符串
- 单词须为驼峰形式，或者"."，".."
- 模块名不允许文件扩展名的形式，如".js"
- 模块名可以为 "相对的" 或 "顶级的"。如果首字符为"."或".."则为"相对的"模块名
- 顶级的模块名从根命名空间的概念模块解析
- 相对的模块名从 "require" 书写和调用的模块解析

上文引用的CommonJS模块id属性常被用于JavaScript模块。

相对模块名解析示例：

- 如果模块 "a/b/c" 请求 "../d", 则解析为"a/d"
- 如果模块 "a/b/c" 请求 "./e", 则解析为"a/b/e"

如果AMD的实现支持加载器插件(Loader-Plugins),则"!"符号用于分隔加载器插件模块名和插件资源名。由于插件资源名可以非常自由地命名，大多数字符都允许在插件资源名使用。 

###依赖
第二个参数，dependencies，是个定义中模块所依赖模块的数组。依赖模块必须根据模块的工厂方法优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。

依赖的模块名如果是相对的，应该解析为相对定义中的模块。换句话来说，相对名解析为相对于模块的名字，并非相对于寻找该模块的名字的路径。

本规范定义了三种特殊的依赖关键字。如果"require","exports", 或 "module"出现在依赖列表中，参数应该按照CommonJS模块规范自由变量去解析。

依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的形参个数小于3，加载器会选择以函数指定的参数个数调用工厂方法。

###工厂方法
第三个参数，factory，为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

如果工厂方法返回一个值（对象，函数，或任意强制类型转换为true的值），应该为设置为模块的输出值。

###简单的 CommonJS 转换
如果依赖性参数被忽略，模块加载器可以选择扫描工厂方法中的require语句以获得依赖性（字面量形为require("module-id")）。第一个参数必须字面量为require从而使此机制正常工作。

在某些情况下，因为脚本大小的限制或函数不支持toString方法（Opera Mobile是已知的不支持函数的toString方法），模块加载器可以选择扫描不扫描依赖性。

如果有依赖参数，模块加载器不应该在工厂方法中扫描依赖性。

###define.amd 属性
为了清晰的标识全局函数（为浏览器加载script必须的）遵从AMD编程接口，任何全局函数应该有一个"amd"的属性，它的值为一个对象。这样可以防止与现有的定义了define函数但不遵从AMD编程接口的代码相冲突。

当前，define.amd对象的属性没有包含在本规范中。实现本规范的作者，可以用它通知超出本规范编程接口基本实现的额外能力。

define.amd的存在表明函数遵循本规范。如果有另外一个版本的编程接口，那么应该定义另外一个属性，如define.amd2，表明实现只遵循该版本的编程接口。

一个如何定义同一个环境中允许多次加载同一个版本的模块的实现：

    define.amd = {
      multiversion: true
    };
最简短的定义：

    define.amd = {};
    
###一次输出多个模块
在一个脚本中可以使用多次define调用。这些define调用的顺序不应该是重要的。早一些的模块定义中所指定的依赖，可以在同一脚本中晚一些定义。模块加载器负责延迟加载未解决的依赖，直到全部脚本加载完毕，防止没必要的请求。

###例子
####使用 require 和 exports
创建一个名为"alpha"的模块，使用了require，exports，和名为"beta"的模块:

	define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
		exports.verb = function() {
			return beta.verb();
			//Or:
			//return require("beta").verb();
		}
	});
	
一个返回对象的匿名模块：

	define(["alpha"], function (alpha) {
		return {
			verb: function(){
				return alpha.verb() + 2;
			}
		};
	});
	
一个没有依赖性的模块可以直接定义对象：

	define({
		add: function(x, y){
			return x + y;
		}
	});
   
一个使用了简单CommonJS转换的模块定义：

	define(function (require, exports, module) {
		var a = require('a'),
			b = require('b');
		exports.action = function () {};
	});
	
###全局变量
本规范保留全局变量"define"以用来实现本规范。包额外信息异步定义编程接口是为将来的CommonJS API保留的。模块加载器不应在此函数添加额外的方法或属性。

本规范保留全局变量"require"被模块加载器使用。模块加载器可以在合适的情况下自由地使用该全局变量。它可以使用这个变量或添加任何属性以完成模块加载器的特定功能。它同样也可以选择完全不使用"require"。

###使用注意
为了使静态分析工具（如build工具）可以正常工作，推荐使用字面上形如的'define(...)'。

###与CommonJS的关系
一个关于本API的wiki开始在CommonJS wiki中创建了，作为中转的格式，模块中转。但是为了包含模块定义接口，随着时间而不断改变。在CommonJS列表中关于推荐本API作为模块定义API尚未达成一致。本API被转移到它自己的wiki和讨论组中。

AMD可以作为CommonJS模块一个中转的版本只要CommonJS没有被用来同步的require调用。使用同步require调用的CommonJS代码可以被转换为使用回调风格的AMD模块加载器。

参考文档：
http://www.oschina.net/translate/getting-started-with-the-requirejs-library

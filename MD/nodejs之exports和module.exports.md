#nodejs整理
###模块及模块的查找
　　nodejs模块既可以是一个`文件`，也可能是包含一个或多个文件的`目录`。

nodejs模块的同步查找规则：    
node中有一个独特的模块引用机制，可以不必知道模块在文件系统中的具体位置。这个机制就是使用node_modules目录。　　

###module.exports 与 exports
　　node模块允许从被引入文件中选择要暴露给程序的函数和变量，这是就需要用到module.exports与exports。

(注：目录结构lunachi_git/blog/code/demo1)

创建module1.js

	function sayHello(){
	    console.log("say hello!");
	}
	module.exports=sayHello;

创建module2.js

	var name="luna";
	function sayHello(){
	    console.log(name+" say hello!");
	}
	module.exports.name=name;
	module.exports.sayHello=sayHello;
	
创建module3.js

	var name="luna";
	function sayHello(){
	    console.log(name+" say hello!");
	}
	exports.name=name;
	exports.sayHello=sayHello;
	
创建module4.js

	var name = "luna";
	function sayHello() {
	    console.log("say hello!");
	}
	module.exports.name = name;
	exports.sayHello = sayHello;
	
创建index.js 
 
	var module1 = require("./module1.js");
	var module2 = require("./module2.js");
	var module3 = require("./module3.js");
	var module4 = require("./module4.js");
	
	console.log("module1");
	module1();
	
	console.log("module2");
	console.log(module2.name);
	module2.sayHello();
	
	console.log("module3");
	console.log(module3.name);
	module3.sayHello();
	
	console.log("module4");
	console.log(module4.name);
	module4.sayHello();
	
首先明确两点：

1. exports一开始是指向module.exports的；
- 通过require得到的是module.exports中的内容，而不是exports的内容；

《Nodejs实战》中说：如果模块返回的`函数或变量不止一个`，通过设置`exports对象`的属性来指明它们。如果模块只返回`一个函数或变量`。则可以设定`module.exports属性`。
注：exports只是对module.exports的一个全局引用，最初被定义为一个可以添加属性的空对象，如果把exports设定为别的，就打破了module.exports和exports之间的引用关系。

exports只是module.exports的辅助方法。你的模块最终返回module.exports给调用者，而不是exports。exports所做的事情是收集属性，如果module.exports当前没有任何属性的话，exports会把这些属性赋予module.exports。如果module.exports已经存在一些属性的话，那么exports中所用的东西都会被忽略。

下面我们通过代码来分析：

exports和module这两个对象是所有Node.js类型的文件中都默认隐式存在的，比如我们新建一个index.js文件：(注：目录结构lunachi_git/blog/code/demo2)

	console.log(exports);
	console.log(module);

在终端运行:

	node index.js

终端输出：

	{}
	Module {
	  id: '.',
	  exports: {},
	  parent: null,
	  filename: '/opt/lunachi_git/blog/code/demo2/index.js',
	  loaded: false,
	  children: [],
	  paths:
	   [ '/opt/lunachi_git/blog/code/demo2/node_modules',
	     '/opt/lunachi_git/blog/code/node_modules',
	     '/opt/lunachi_git/blog/node_modules',
	     '/opt/lunachi_git/node_modules',
	     '/opt/node_modules' ] }
	     
exports、module.exports、module三者之间的引用关系图如下：

![exports与module.exports引用关系1](../images/exports与module.exports引用关系1.png =250x)

**例子** (注：目录结构lunachi_git/blog/code/demo3/)

举个例子，创建如下的my_module.js文件：

	exports.sayHello = function() {
	    console.log('sayHello method!');
	}
再在同一个目录下创建demo2/index.js文件：

	myModule = require('./my_module');
	myModule.sayHello()
	
在终端运行demo2/index.js输出:

	sayHello method!
	
**分析**

在index.js文件中使用require语句从my_module.js模块中得到了module.exports。

在my_module.js文件中我们在exports的基础上为它添加了一个属性sayHello，这个属性的值是一个函数，并且因为初始时，exports指向的是module.exports，他俩共享同一块内存，所以这个操作后，module.exports变成了这样：

![exports与module.exports引用关系2](../images/exports与module.exports引用关系2.png =300x)

所以，index.js文件中的myModule变量的值为：

	{
	    sayHello: function() {console.log('Hello world');}
	}

**例子** (注：目录结构lunachi_git/blog/code/demo4/)

我们将my_module.js文件修改为如下内容：

	exports = {
	    sayHello: function () {
	        console.log("sayHello method!");
	    }
	};
	
然后将index.js文件修改为如下内容：

	var myModule = require('./my_module');
	
	console.log('module.exports:');
	console.log(module.exports);
	
	myModule.sayHello();
	
然后一样在终端运行：

	module.exports:
	{}
	/opt/lunachi_git/blog/code/demo4/index.js:6
	myModule.sayHello();
	         ^
	
	TypeError: myModule.sayHello is not a function
	    at Object.<anonymous> (/opt/lunachi_git/blog/code/demo4/index.js:6:10)
	    at Module._compile (module.js:541:32)
	    at Object.Module._extensions..js (module.js:550:10)
	    at Module.load (module.js:456:32)
	    at tryModuleLoad (module.js:415:12)
	    at Function.Module._load (module.js:407:3)
	    at Function.Module.runMain (module.js:575:10)
	    at startup (node.js:159:18)
	    at node.js:444:3	 
	       
**分析**

my_module.js文件中将exports重新赋值为一个新的对象，这个时候exports将会自己分配一块新的内存，而不再指向module.exports了，所以这个时候exports和module.exports彻底断绝关系，无论你怎么操作exports对象，都与module.exports无关了。

![exports与module.exports引用关系3](../images/exports与module.exports引用关系3.png =400x)

如果创建了一个`既有exports又有module.exports`的模块，那它会返回module.exports，而export会被忽略。

**例：** (目录结构lunachi_git/blog/code/demo5/)

创建如下的my_module.js文件：

	var name="luna";
	function sayHello(){
	    console.log("say hello!");
	}
	module.exports.name=name;
	exports.sayHello=sayHello;
	
再在同一个目录下创建index.js文件：

	var myModule = require('./my_module');

	console.log(myModule);
	
在终端运行index.js输出:

	sayHello method!



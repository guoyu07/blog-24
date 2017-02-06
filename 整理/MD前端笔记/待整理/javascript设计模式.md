#JavaScript设计模式
##构造器模式
在面向对象编程中，构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数。在JavaScript中几乎所有的东西都是对象。

创建对象的三种基本方式:

	var newObject = {};
	// or
	var newObject = Object.create( null );
	// or
	var newObject = new Object();
	
最后一个例子中"Object"构造器创建了一个针对特殊值的对象包装，只不过这里没有传值给它，所以它将会返回一个空对象。

将一个键值对赋给一个对象 四种方式:

	// ECMAScript 3 兼容形式
	// 1. “点号”法
	// 设置属性
	newObject.someKey = "Hello World";
	// 获取属性
	var key = newObject.someKey;
	
	// 2. “方括号”法
	// 设置属性
	newObject["someKey"] = "Hello World";
	// 获取属性
	var key = newObject["someKey"];
	
	// ECMAScript 5 仅兼容性形式
	// For more information see: http://kangax.github.com/es5-compat-table/
	// 3. Object.defineProperty方式
	// 设置属性
	Object.defineProperty( newObject, "someKey", {
	    value: "for more control of the property's behavior",
	    writable: true,
	    enumerable: true,
	    configurable: true
	});
	
	// 如果上面的方式你感到难以阅读，可以简短的写成下面这样：
	var defineProp = function ( obj, key, value ){
	  config.value = value;
	  Object.defineProperty( obj, key, config );
	};
	// 为了使用它，我们要创建一个“person”对象
	var person = Object.create( null );
	// 用属性构造对象
	defineProp( person, "car",  "Delorean" );
	defineProp( person, "dateOfBirth", "1981" );
	defineProp( person, "hasBeard", false );
	
	// 4. Object.defineProperties方式
	// 设置属性
	Object.defineProperties( newObject, {
	  "someKey": { 
	    value: "Hello World", 
	    writable: true 
	  },
	  "anotherKey": { 
	    value: "Foo bar", 
	    writable: false 
	  } 
	});	
	// 3和4中的读取属行可用1和2中的任意一种
	
`Javascript不支持类的概念，但它有一种与对象一起工作的构造器函数。使用new关键字来调用该函数，我们可以告诉Javascript把这个函数当做一个构造器来用,它可以用自己所定义的成员来初始化一个对象。在这个构造器内部，关键字this引用到刚被创建的对象。`

##模块化模式
模块的特点是有助于保持应用项目的代码单元既能清晰地分离又有组织。

在JavaScript中，实现模块有几个选项，他们包括：

- 模块化模式
- 对象表示法
- AMD模块
- CommonJS 模块
- ECMAScript Harmony 模块


**对象字面**：使用对象字面值可以`协助封装和组织你的代码`。

###模块化模式
**模块化模式**：用来进一步模拟类的概念，通过这样一种方式，可以在一个单一的对象中包含公共/私有的方法和变量，从而从全局范围中屏蔽特定的部分。减少函数名称与在页面中其他脚本区域定义的函数名称冲突的可能性。

####私有信息
模块模式使用闭包的方式来将"私有信息",状态和组织结构封装起来。提供了一种将公有和私有方法，变量封装混合在一起的方式，这种方式防止内部信息泄露到全局中，从而避免了和其它开发者接口发生冲图的可能性。在这种模式下只有公有的API会返回，其它将全部保留在闭包的私有空间中。

这种方法提供了一个比较清晰的解决方案，在只暴露一个接口供其它部分使用的情况下，将执行繁重任务的逻辑保护起来。这个模式非常类似于立即调用函数式表达式，但是这种模式返回的是对象，而立即调用函数表达式返回的是一个函数。

javascript没有访问修饰符。从技术上讲，变量不能被声明为公有的或者私有的，因此我们使用函数域的方式去模拟这个概念。在模块模式中，因为闭包的缘故，声明的变量或者方法只在模块内部有效。在返回对象中定义的变量或者方法可以供任何人使用。

有以下的优势：

- 可以创建只能被我们模块访问的私有函数。这些函数没有暴露出来（只有一些API是暴露出来的），它们被认为是完全私有的。
- 当我们在一个调试器中，需要发现哪个函数抛出异常的时候，可以很容易的看到调用栈，因为这些函数是正常声明的并且是命名的函数。
- 这种模式同样可以让我们在不同的情况下返回不同的函数。我见过有开发者使用这种技巧用于执行UA（尿检，抽样检查）测试，目的是为了在他们的模块里面针对IE专门提供一条代码路径，但是现在我们也可以简单的使用特征检测达到相同的目的。

####模块模式的变体
#####Import mixins(导入混合)
这个变体展示了如何将全局（例如 jQuery, Underscore）作为一个参数传入模块的匿名函数。这种方式允许我们导入全局，并且按照我们的想法在本地为这些全局起一个别名。

优势:

- 从javascript语言上来讲，模块模式相对于真正的封装概念更清晰。
- 其次，模块模式支持私有数据-因此，在模块模式中，公共部分代码可以访问私有数据，但是在模块外部，不能访问类的私有部分.

缺点:

- 模块模式的缺点是因为我们采用不同的方式访问公有和私有成员，因此当我们想要改变这些成员的可见性的时候，我们不得不在所有使用这些成员的地方修改代码。
- 我们也不能在对象之后添加的方法里面访问这些私有变量。也就是说，很多情况下，模块模式很有用，并且当使用正确的时候，潜在地可以改善我们代码的结构。
- 其它缺点包括不能为私有成员创建自动化的单元测试，以及在紧急修复bug时所带来的额外的复杂性。根本没有可能可以对私有成员打补丁。相反地，我们必须覆盖所有的使用存在bug私有成员的公共方法。开发者不能简单的扩展私有成员，因此我们需要记得，私有成员并非它们表面上看上去那么具有扩展性。

##单例模式
单例模式之所以这么叫，是因为它限制一个类只能有一个实例化对象。经典的实现方式是，创建一个类，这个类包含一个方法，这个方法在没有对象存在的情况下，将会创建一个新的实例对象。如果对象存在，这个方法只是返回这个对象的引用。

	var mySingleton = (function () {
		// Instance stores a reference to the Singleton
		var instance;
	
		function init() {
	    	// 单例
	    	// 私有方法和变量
	    	function privateMethod(){
	        	console.log( "私有方法" );
	    	}
	    	var privateVariable = "私有变量";
	    	return {
	      		// 共有方法和变量
	      		publicMethod: function () {
	        		console.log( "公共方法" );
	      		},
	      		publicProperty: "公共变量"
	    	};
		};
	  
		return {
	    	// 如果存在获取此单例实例，如果不存在创建一个单例实例
	    	getInstance: function () {
	      		if ( !instance ) {
	        		instance = init();
	      		}
	      		return instance;
	    	}
		};
		
	})();

##观察者模式

<br>
参考文档：      
学用 JavaScript 设计模式：    
http://wiki.jikexueyuan.com/project/javascript-design-patterns/classification.html

http://blog.jobbole.com/29454/
<hr>
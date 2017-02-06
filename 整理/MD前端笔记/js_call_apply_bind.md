##call、apply、bind
###apply、call 
在javascript中，call和 apply都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部this的指向。**绑定后会立即执行函数**。

`JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。`

####call
call() 方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法.
#####语法

	fun.call(thisArg[, arg1[, arg2[, ...]]])
	
- 参数

	- thisArg：在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
	- arg1, arg2, ...：指定的参数列表。
	
- 返回值

	返回结果包括指定的this值和参数。
	
#####描述
可以让call()中的对象调用当前对象所拥有的function。可以使用call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

#####示例
######使用call方法调用父构造函数
在一个子构造函数中，通过调用父构造函数的 call 方法来实现继承。下例中，使用 Food 和 Toy 构造函数创建的对象实例都会拥有在 Product 构造函数中添加的 name 属性和 price 属性,但 category 属性是在各自的构造函数中定义的。

	function Product(name, price) {
	  this.name = name;
	  this.price = price;
	}
	
	function Food(name, price) {
	  Product.call(this, name, price); 
	  this.category = 'food';
	}
	
	//等同于
	function Food(name, price) { 
	    this.name = name;
	    this.price = price;
	    this.category = 'food'; 
	}
	
	//function Toy 同上
	function Toy(name, price) {
	  Product.call(this, name, price);
	  this.category = 'toy';
	}
	
	var cheese = new Food('feta', 5);
	var fun = new Toy('robot', 40);

######使用call方法调用匿名函数
在下例中的for循环体内，我们创建了一个匿名函数，然后通过调用该函数的call方法，将每个数组元素作为指定的this值执行了那个匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个print方法，这个print方法可以打印出各元素在数组中的正确索引号。

	var animals = [
	  {species: 'Lion', name: 'King'},
	  {species: 'Whale', name: 'Fail'}
	];
	
	for (var i = 0; i < animals.length; i++) {
	  (function (i) { 
	    this.print = function () { 
	      console.log('#' + i  + ' ' + this.species + ': ' + this.name); 
	    } 
	    this.print();
	  }).call(animals[i], i);
	}
	
######使用call方法调用函数并且指定上下文的'this'
在下面的例子中，当调用 greet 方法的时候，该方法的 this 值会绑定到 i 对象。

	function greet() {
	  var reply = [this.person, 'Is An Awesome', this.role].join(' ');
	  console.log(reply);
	}
	
	var i = {
	  person: 'Douglas Crockford', role: 'Javascript Developer'
	};
	
	greet.call(i); // Douglas Crockford Is An Awesome Javascript Developer 

####apply
apply()方法与call()方法的语法几乎完全相同，唯一的区别在于call()方法接受的是一个`参数列表`，而apply()方法接受的是一个包含多个参数的`数组`（或类数组对象）。

#####语法

	fun.apply(thisArg[, argsArray])
	
- 参数
	- thisArg：与call()相同
	- argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。
	
`你也可以使用 arguments  对象作为 argsArray 参数。 arguments 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。 你可以使用arguments来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。`
	
###bind
bind()方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的 this, 之后的一序列参数将会在传递的实参前传入作为它的参数。**bind绑定后不会立即执行**
####语法
	fun.bind(thisArg[, arg1[, arg2[, ...]]])
- 参数
	- thisArg：当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。`当使用new 操作符调用绑定函数时，该参数无效。`
	- arg1, arg2, ...：当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
- 返回值  
	返回由指定的this值和初始化参数改造的原函数拷贝
	
####描述
bind() 函数会创建一个新函数（称为`绑定函数`），新函数与被调函数（绑定函数的`目标函数`）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。`一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。`

####示例
#####创建绑定函数	
`bind()最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的this值.`JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 this 是原来的对象。（比如在回调中传入这个方法。）如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：

	this.x = 9; 
	var module = {
	  x: 81,
	  getX: function() { return this.x; }
	};
	
	module.getX(); // 返回 81
	
	var retrieveX = module.getX;
	retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域
	
	// 创建一个新函数，将"this"绑定到module对象
	// 新手可能会被全局的x变量和module里的属性x所迷惑
	var boundGetX = retrieveX.bind(module);
	boundGetX(); // 返回 81	
#####偏函数（Partial Functions）
bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。`这些参数（如果有的话）作为bind()的第二个参数跟在this（或其他对象）后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。`

	function list() {
	  return Array.prototype.slice.call(arguments);
	}
	
	var list1 = list(1, 2, 3); // [1, 2, 3]
	
	// Create a function with a preset leading argument
	var leadingThirtysevenList = list.bind(undefined, 37);
	
	var list2 = leadingThirtysevenList(); // [37]
	var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
	
#####多次bind()是无效的

	var bar = function(){
        console.log(this.x);
    };
    var foo = {
        x:3
    };
    var sed = {
        x:4
    };
    var func = bar.bind(foo).bind(sed);
    func(); //3

    var fiv = {
        x:5
    };
    var func = bar.bind(foo).bind(sed).bind(fiv);
    func(); //3
	
###深入理解运用apply、call
定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：

	function log(msg)　{
	  console.log(msg);
	}
	log(1);    //1
	log(1,2);    //1
	
上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 apply 或者 call，注意这里传入多少个参数是不确定的，所以使用apply是最好的，方法如下：

	function log(){
	  console.log.apply(console, arguments);
	};
	log(1);    //1
	log(1,2);    //1 2
接下来的要求是给每一个 log 消息添加一个"(app)"的前辍，比如：

	log("hello world");    //(app)hello world

该怎么做比较优雅呢?这个时候需要想到arguments参数是个伪数组，通过 Array.prototype.slice.call 转化为标准数组，再使用数组方法unshift，像这样：

	function log(){
	  var args = Array.prototype.slice.call(arguments);
	  args.unshift('(app)');
	  
	  console.log.apply(console, args);
	};
	
###apply、call、bind比较
当希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

- apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
- apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
- apply 、 call 、bind 三者都可以利用后续参数传参；
- bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用。

参考：<br>
[Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

[深入浅出 妙用Javascript中apply、call、bind ](http://www.admin10000.com/document/6711.html)

[如何面试前端工程师：GitHub 很重要](https://segmentfault.com/a/1190000000375138?page=1)

[MDN Web API 接口](https://developer.mozilla.org/zh-CN/docs/Web/API)

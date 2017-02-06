###你真的懂javascript吗
####1
	if (!("a" in window)) {
    	var a = 1;
	}
	alert(a);
答案：alert的结果是undefined

知识点：

1. 所有的全局变量都是window的属性，语句 var a = 1;等价于window.a = 1; 你可以用如下方式来检测全局变量是否声明：`"变量名称" in window`
- 所有的变量声明都在范围作用域的顶部，看一下相似的例子：

		alert("a" in window);
		var a;

	此时，尽管声明是在alert之后，alert弹出的依然是true，这是因为JavaScript引擎首先会扫墓所有的变量声明，然后将这些变量声明移动到顶部，最终的代码效果是这样的：

		var a;
		alert("a" in window);
- 你需要理解该题目的意思是，变量声明被提前了，但变量赋值没有，因为这行代码包括了变量声明和变量赋值。你可以将语句拆分为如下代码：

		var a;    //声明
		a = 1;    //初始化赋值

	当变量声明和赋值在一起用的时候，JavaScript引擎会自动将它分为两部以便将变量声明提前，不将赋值的步骤提前是因为他有可能影响代码执行出不可预期的结果。所以，知道了这些概念以后，重新回头看一下题目的代码，其实就等价于：

		var a;
		if (!("a" in window)) { //false
    		a = 1;
		}
		alert(a);

####2

	var a = 1,
    b = function a(x) {
        x && a(--x);
    };
	alert(a);
答案：alert的结果是1

知识点：

1. 变量声明在进入执行上下文就完成了；函数声明也是提前的，所有的函数声明都在执行代码之前都已经完成了声明，和变量声明一样。澄清一下，函数声明是如下这样的代码：

		function functionName(arg1, arg2){
    		//函数体
		}
	如下不是函数，而是`函数表达式，相当于变量赋值`：

		var functionName = function(arg1, arg2){
    		//函数体
		};
	澄清一下，函数表达式没有提前，就相当于平时的变量赋值。
- `函数声明会覆盖变量声明，但不会覆盖变量赋值`，为了解释这个，我们来看一个例子：
	
		function value(){
    		return 1;
		}
		var value;
		alert(typeof value);    //"function"
	尽管变量声明在下面定义，但是变量value依然是function，也就是说这种情况下，**函数声明的优先级高于变量声明的优先级**，但如果该变量value赋值了，那结果就完全不一样了：
		
		function value(){
    		return 1;
		}
		var value = 1;
		alert(typeof value);    //"number"
	该value赋值以后，变量赋值初始化就覆盖了函数声明。
- 重新回到题目，这个函数其实是一个有名函数表达式，函数表达式不像函数声明一样可以覆盖变量声明，但你可以注意到，变量b是包含了该函数表达式，而该函数表达式的名字是a；不同的浏览器对a这个名词处理有点不一样，在IE里，会将a认为函数声明，所以它被变量初始化覆盖了，就是说如果调用a(--x)的话就会出错，而其它浏览器在允许在函数内部调用a(--x)，因为这时候a在函数外面依然是数字。基本上，IE里调用b(2)的时候会出错，但其它浏览器则返回undefined。   
理解上述内容之后，该题目换成一个更准确和更容易理解的代码应该像这样：

		var a = 1,
    	b = function(x) {
        	x && b(--x);
    	};
		alert(a);
	这样的话，就很清晰地知道为什么alert的总是1了.

####3
	
	function b(x, y, a) {
    	arguments[2] = 10;
    	alert(a);
	}
	b(1, 2, 3);
答案：alert的结果是10

知识点：

1. 活动对象是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。arguments属性的值是Arguments对象。   
	Arguments对象是活动对象的一个属性，它包括如下属性：

    * callee — 指向当前函数的引用
    * length — 真正传递的参数个数
    * properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。 properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是共享的。  
    **这个共享其实不是真正的共享一个内存地址，而是2个不同的内存地址，使用JavaScript引擎来保证2个值是随时一样的，当然这也有一个前提，那就是这个索引值要小于你传入的参数个数，也就是说如果你只传入2个参数，而还继续使用arguments[2]赋值的话，就会不一致**，例如：
    
    		function b(x, y, a) {
    			arguments[2] = 10;
    			alert(a);
			}
			b(1, 2);
	这时候因为没传递第三个参数a，所以赋值10以后，alert(a)的结果依然是undefined，而不是10，但如下代码弹出的结果依然是10，因为和a没有关系。
	
			function b(x, y, a) {
    			arguments[2] = 10;
    			alert(arguments[2]);
			}
			b(1, 2);
			
####4

	function a() {
    	alert(this);
	}
	a.call(null);
	
答案：alert的结果是[object Window]

知识点：

1. this值是如何定义的，当一个方法在对象上调用的时候，this就指向到了该对象上，例如：

		var object = {
    		method: function() {
        		alert(this === object);    //true
    		}
		}
		object.method(); 
	上面的代码，调用method()的时候this被指向到调用它的object对象上，但在全局作用域里，this是等价于window（浏览器中，非浏览器里等价于global）
2. 一个function的定义不是属于一个对象属性的时候（也就是单独定义的函数），函数内部的this也是等价于window的，例如：

		function method() {
    		alert(this === window);    //true
		}
		method(); 
3. call()是做什么的，call方法作为一个function执行代表该方法可以让另外一个对象作为调用者来调用，call方法的第一个参数是对象调用者，随后的其它参数是要传给调用method的参数（如果声明了的话），例如：
		

		function method() {
    		alert(this === window);
		}
		method();    //true
		method.call(document);   //false
	第一个依然是true没什么好说的，第二个传入的调用对象是document，自然不会等于window，所以弹出了false。
4. ECMAScript262规范规定：如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象（也就是window）作为this的值。所以，不管你什么时候传入null，其this都是全局对象window，所以该题目可以理解成如下代码：

		function a() {
    		alert(this);
		}
		a.call(window);
> 找出数字数组中最大的元素（使用Match.max函数）   
  转化一个数字数组为function数组（每个function都弹出相应的数字）   
  给object数组进行排序（排序条件是每个元素对象的属性个数）   
  利用JavaScript打印出Fibonacci数（不使用全局变量）   
  实现如下语法的功能：var a = (5).plus(3).minus(6); //2   
  实现如下语法的功能：var a = add(2)(3)(4); //9
  
###JavaScript专业八级测试

1. ["1", "2", "3"].map(parseInt)
	a. ["1", "2", "3"]
	b. [1, 2, 3]	
	c. [0, 1, 2]	
	d. other
	
	答案：d   
	知识点：  
	你实际上得到的应该是 [1, NaN, NaN] 因为 parseInt 需要两个参数 (val, radix) 但 map 传了 3 个 (element, index, array)
- [typeof null, null instanceof Object]
	a. ["object", false]	
	b. [null, false]	
	c. ["object", true]	
	d. other
	
	答案：a   
	知识点： 
	typeof 对原生非可调用对象会始终返回 "object"
- [ [3,2,1].reduce(Math.pow), [].reduce(Math.pow)] ]
	a. an error	
	b. [9, 0]	
	c. [9, NaN]	
	d. [9, undefined]
	
	答案：a   
	知识点：     
	根据规范： 在一个空数组上应用reduce会抛初始化错误的异常 TypeError
- What is the result of this expression? (or multiple ones)

		var val = 'smtg';
		console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');
		
	a. Value is Something	
	b. Value is Nothing
	c. NaN	
	d. other
	
	答案：d   
	知识点:   
	它实际上会打印 'Something' 这个 + 操作符的优先级实际上比三元操作符要高.
- What is the result of this expression? (or multiple ones)

    	var name = 'World!';
    	(function () {
      		if (typeof name === 'undefined') {
        		var name = 'Jack';
        		console.log('Goodbye ' + name);
      		} else {
        		console.log('Hello ' + name);
      		}
    	})();
    a. Goodbye Jack	
    b. Hello Jack	
    c. Hello undefined	
    d. Hello World
    
    答案：a   
	知识点：    
	var 声明的作用域在整个 function 中, 但并没有初始化
- What is the result of this expression? (or multiple ones)
	
		var END = Math.pow(2, 53);
    	var START = END - 100;
    	var count = 0;
    	for (var i = START; i <= END; i++) {
      		count++;
    	}
    	console.log(count);
    a. 0	
    b. 100	
    c. 101	
    d. other
    
    答案：d   
	知识点：    
	这段代码会进入死循环, 2^53 是javascript中最大的数字, 2^53+1 与 2^53 等同, 因此 i 永远也不会比这个数大
- What is the result of this expression? (or multiple ones)

		var ary = [0,1,2];
    	ary[10] = 10;
    	ary.filter(function(x) { return x === undefined;});
    a. [undefined * 7]	
    b. [0, 1, 2, 10]	
    c. []	
    d. [undefined]
    
	答案：c   
	知识点：    
	Array.prototype.filter 不会应用到缺少的元素上
- What is the result of this expression? (or multiple ones)

		var two   = 0.2
    	var one   = 0.1
    	var eight = 0.8
    	var six   = 0.6
    	[two - one == one, eight - six == two]
    a. [true, true]	
    b. [false, false]	
    c. [true, false]	
    d. other

	答案：c   
	知识点：    
	JavaScript 没有精确的数字, 即便它看上去有时侯能正常工作
- What is the result of this expression? (or multiple ones)

		function showCase(value) {
      		switch(value) {
        		case 'A':
          			console.log('Case A');
          			break;
        		case 'B':
          			console.log('Case B');
          			break;
        		case undefined:
          			console.log('undefined');
          			break;
        		default:
          			console.log('Do not know!');
      		}
    	}
    	showCase(new String('A'));
    a. Case A	
    b. Case B	
    c. Do not know!
    d. undefined
    
    答案：c   
	知识点：    
	switch 使用 === 来枚举，并且 new String(x) !== x
- What is the result of this expression? (or multiple ones)

		function showCase2(value) {
      		switch(value) {
      		case 'A':
        		console.log('Case A');
        		break;
      		case 'B':
        		console.log('Case B');
        		break;
      		case undefined:
        		console.log('undefined');
        		break;
      		default:
        		console.log('Do not know!');
      		}
    	}
    	showCase2(String('A'));
    a. Case A	
    b. Case B	
    c. Do not know!	
    d. undefined
    
    答案：a   
	知识点：    
	String(x) 不会返回一个 object 但会返回一个 string, 例如 typeof String(1) === "string"
- What is the result of this expression? (or multiple ones)

		function isOdd(num) {
      		return num % 2 == 1;
    	}
    	function isEven(num) {
      		return num % 2 == 0;
    	}
    	function isSane(num) {
      		return isEven(num) || isOdd(num);
    	}
    	var values = [7, 4, '13', -9, Infinity];
    	values.map(isSane);
    a. [true, true, true, true, true]	
    b. [true, true, true, true, false]	
    c. [true, true, true, false, false]	
    d. [true, true, false, false, false]
    
	答案：c   
	知识点：    
	Infinity % 2 返回 NaN, -9 % 2 返回 -1
- What is the result of this expression? (or multiple ones)

		parseInt(3, 8)
    	parseInt(3, 2)
    	parseInt(3, 0)
    a. 3, 3, 3	
    b. 3, 3, NaN	
    c. 3, NaN, NaN	
    d. other
    
    答案：d   
	知识点：  
    3在2进制中不存在, 很显然结果是NaN, parseInt(2, 2)同理, 结果也是NaN, 但0呢? parseInt 猜测你的意思是10, 所有返回是3.
- Array.isArray( Array.prototype )
	a. true	
	b. false	
	c. error	
	d. other
	
	答案：a   
	知识点：Array.prototype 是一个 Array.
-  What is the result of this expression? (or multiple ones)
	
		var a = [0];
    	if ([0]) { 
      		console.log(a == true);
    	} else { 
      		console.log("wut");
    	}
    a. true	
    b. false	
    c. "wut"	
    d. other

	答案：b   
	知识点：[0] 被认为是真的，但跟 true 又不等同  
- []==[]
	a. true	
	b. false	
	c. error	
	d. other
	
	答案：b  
	知识点：== 很邪恶,[]===[]也为false
- 题

		'5' + 3  
    	'5' - 3
    a. 53, 2	
    b. 8, 2	
    c. error	
    d. other
    
	答案：a  
	知识点：Strings 知道怎么用+, 但是遇到-会被转化为数字
- 题
	
	 	var ary = Array(3);
    	ary[0]=2
    	ary.map(function(elem) { return '1'; });
    
    a. [2, 1, 1]	
    b. ["1", "1", "1"]	
    c. [2, "1", "1"]	
    d. other
    
    答案：d  
	知识点：结果是["1", undefined * 2], 因为map 只能被初始化过的数组成员调用
- 题
	
		function sidEffecting(ary) { 
      		ary[0] = ary[2];
    	}
    	function bar(a,b,c) { 
      		c = 10
      		sidEffecting(arguments);
      		return a + b + c;
    	}
    	bar(1,1,1)
    a. 3	
    b. 12	
    c. error	
    d. other
    
    答案：d  
	知识点：   
	结果是 21, 在javascript中变量中 arguments 是个对象，所以arguments 和局部变量所引用的内容是一样的。 注* 使用 use strict 可避免这种情况.
- Number.MIN_VALUE > 0
	a. false	
	b. true	
	c. error	
	d. other
	
	答案：b  
	知识点：Number.MIN_VALUE 是最小的比0大的数, -Number.MAX_VALUE 可能会返回给你一个最大的负整数
- 2 == [[[2]]]
	a. true	
	b. false	
	c. undefined	
	d. other
	
	答案：a 
	知识点：每一个对象都被转换成了string，最终成了 "2"
- 题

		3.toString()
    	3..toString()
    	3...toString()
    a. "3", error, error	
    b. "3", "3.0", error	
    c. error, "3", error	
    d. other
    
    答案：c   
	知识点：3.x "3" 带上尾数xtoString是合法的, 但空字符串不是
- 题

		(function(){
      		var x = y = 1;
    	})();
    	console.log(y);
    	console.log(x);
    a. 1, 1	
    b. error, error	
    c. 1, error	
    d. other
    
    答案：c   
	知识点：y自动被声明成全局变量, 不在function的域里面.
- 题
		
		var a = /123/, b = /123/;
    	a == b
    	a === b
    
    a. true, true	
    b. true, false	
    c. false, false	
    d. other
    
    答案：c   
	知识点：根据规范：正则表达式不能比较，因为每个正则都是唯一的。
	
- 题
	
		var a = [1, 2, 3],
        b = [1, 2, 3],
        c = [1, 2, 4]
    	a ==  b
    	a === b
    	a > c
    	a < c
    a. false, false, false, true	
    b. false, false, false, false	
    c. true, true, false, true	
    d. other

	答案：a  
	知识点：数组通过>和<会安顺序比较, 但==和===不会;
- 题
	
		var a = {}, 
		b = Object.prototype;
    	[a.prototype === b, Object.getPrototypeOf(a) === b]
    	
    a. [false, true]	
    b. [true, true]	
    c. [false, false]	
    d. other
    
    答案：a  
	知识点：   
	Functions 有一个 prototype 属性，但是其它对象没有，所以 a.prototype 是 undefined. 
每个 Object 有一个内部的属性可通过Object.getPrototypeOf 访问.
- 题
	
		function f() {}
    	var a = f.prototype, b = Object.getPrototypeOf(f);
    	a === b
    	
    a. true	
    b. false	
    c. null	
    d. other
    
    答案：b 
	知识点：  
	f.prototype 是任何被创建出来对象的父对象， 但 new f 会返回 Object.getPrototypeOf 继承的父对象
- 题

		function foo() { }
    	var oldName = foo.name;
    	foo.name = "bar";
    	[oldName, foo.name]
    
    a. error	
    b. ["", ""]	
    c. ["foo", "foo"]	
    d. ["foo", "bar"]
    
    答案：c   
	知识点：name 只读属性. 但是赋值时为什么不会报错呢？我不知道。
- "1 2 3".replace(/\d/g, parseInt)
	a. "1 2 3"	
	b. "0 1 2"	
	c. "NaN 2 3"	
	d. "1 NaN 3"
	
	答案：d  
	知识点：String.prototype.replace 实现上每组传入的参数为 1, 0, 2, 2, 3, 4.
- 题
	
		function f() {}
    	var parent = Object.getPrototypeOf(f);
    	f.name // ?
    	parent.name // ?
    	typeof eval(f.name) // ?
    	typeof eval(parent.name) //  ?
    	
    a. "f", "Empty", "function", "function"	
    b. "f", undefined, "function", error	
    c. "f", "Empty", "function", error	
    d. other
    
    答案：c 
	知识点：function 原型对象被定义在其它地方, 有名字, 可以被执行, 但不在当前的作用域中
	
- 题

		var lowerCaseOnly =  /^[a-z]+$/;
    	[lowerCaseOnly.test(null), lowerCaseOnly.test()]
    a. [true, false]	
    b. error	
    c. [true, true]	
    d. [false, true]
    
    答案：c  
	知识点：参数被会转换成字符, 因此参数为 "null" 和 "undefined".
	
- [,,,].join(", ")
	a. ", , , "	
	b. "undefined, undefined, undefined, undefined"	c. ", , "	
	d. ""
	
	答案：c  
	知识点：JavaScript在数组中允许最后一个为逗号，所以原来的那个数组定义了3个 undefined
	
- 题
	
		var a = {class: "Animal", name: 'Fido'};
    	a.class
    a. "Animal"	
    b. Object	
    c. an error	
    d. other
    
	答案：d  
	知识点：   
	输出需要看是什么浏览器 class 是保留字, 在chrome Firefox 和 Opera中可作为属性名, 但IE不行. 另一方面他们都可以接受其他保留字 (例如 int, private, throws) 作为变量，但class不行.
	
###javascript自定义事件
####事件阶段(Event Phases) 
当一个DOM事件被触发的时候，它并不只是在它的起源对象上触发一次，而是会经历三个不同的阶段。简而言之：事件一开始从文档的根节点流向目标对象（捕获阶段），然后在目标对向上被触发（目标阶段），之后再回溯到文档的根节点（冒泡阶段）。
![事件阶段](./image/event_phases.png "事件阶段")   

* **事件捕获阶段（Capture Phase）**  
	事件的第一个阶段是捕获阶段。事件从文档的根节点出发，随着DOM树的结构向事件的目标节点流去。途中经过各个层次的DOM节点，并在各节点上触发捕获事件，直到到达事件的目标节点。捕获阶段的主要任务是建立传播路径，在冒泡阶段，事件会通过这个路径回溯到文档跟节点。
* **事件捕获阶段（Capture Phase）**    
	当事件到达目标节点的，事件就进入了目标阶段。事件在目标节点上被触发，然后会逆向回流，直到传播至最外层的文档节点。    
	对于多层嵌套的节点，鼠标和指针事件经常会被定位到最里层的元素上。假设，你在一个<div>元素上设置了click事件的监听函数，而用户点击在了这个<div>元素内部的<p>元素上，那么<p>元素就是这个事件的目标元素。事件冒泡让我们可以在这个<div>（或者更上层的）元素上监听click事件，并且事件传播过程中触发回调函数。
* **冒泡阶段（Bubble Phase）**    
	事件在目标元素上触发后，并不在这个元素上终止。它会随着DOM树一层层向上冒泡，直到到达最外层的根节点。也就是说，同一个事件会依次在目标节点的父节点，父节点的父节点。。。直到最外层的节点上被触发。   
	冒泡过程非常有用。它将我们从对特定元素的事件监听中释放出来，相反，我们可以监听DOM树上更上层的元素，等待事件冒泡的到达。如果没有事件冒泡，在某些情况下，我们需要监听很多不同的元素来确保捕获到想要的事件。
* **停止传播（Stopping Propagation）**    	
	可以通过调用事件对象的stopPropagation方法，在任何阶段（捕获阶段或者冒泡阶段）中断事件的传播。此后，事件不会在后面传播过程中的经过的节点上调用任何的监听函数。
	
		child.addEventListener('click', function(event) {
 			event.stopPropagation();
		});
 
		parent.addEventListener('click', function(event) {
			// If the child element is clicked
			// this callback will not fire
		});

	
	调用event.stopPropagation()不会阻止当前节点上此事件其他的监听函数被调用。如果你希望阻止当前节点上的其他回调函数被调用的话，你可以使用更激进的event.stopImmediatePropagation()方法。
	
		child.addEventListener('click', function(event) {
 			event.stopImmediatePropagation();
		});
		child.addEventListener('click', function(event) {
			// If the child element is clicked
			// this callback will not fire
		});
* **阻止浏览器默认行为**    	
	当特定事件发生的时候，浏览器会有一些默认的行为作为反应。最常见的事件不过于link被点击。当一个click事件在一个\<a>元素上被触发时，它会向上冒泡直到DOM结构的最外层document，浏览器会解释href属性，并且在窗口中加载新地址的内容。
	在web应用中，开发人员经常希望能够自行管理导航（navigation）信息，而不是通过刷新页面。为了实现这个目的，我们需要阻止浏览器针对点击事件的默认行为，而使用我们自己的处理方式。这时，我们就需要调用event.preventDefault().
	
		anchor.addEventListener('click', function(event) {
  			event.preventDefault();
			// Do our own thing
		});
	我们可以阻止浏览器的很多其他默认行为。比如，我们可以在HTML5游戏中阻止敲击空格时的页面滚动行为，或者阻止文本选择框的点击行为。
	调用event.stopPropagation()只会阻止传播链中后续的回调函数被触发。它不会阻止浏览器的自身的行为。
* **代理事件监听**   
	我们不去监听所有的子元素的click事件，相反，我们监听他们的父元素\<ul>。当一个\<li>元素被点击的时候，这个事件会向上冒泡至\<ul>，触发回调函数。我们可以通过检查事件的event.target属性来判断具体是哪一个\<li>被点击了.
		
		var list = document.querySelector('ul');
		list.addEventListener('click', function(event) {
  			var target = event.target;
  			while (target.tagName !== 'LI') {
    			target = target.parentNode;
    			if (target === list) return;
  			}
			// Do stuff here
		});
	这样就好多了，我们仅仅使用了一个上层的事件监听器，并且我们不需要在为添加元素而考虑它的事件监听问题。这个概念很简单，但是非常有用。
* **一些有用的事件**   
	- load事件可以在任何资源（包括被依赖的资源）被加载完成时被触发，这些资源可以是图片，css，脚本，视频，音频等文件，也可以是document或者window。
	
			image.addEventListener('load', function(event) {
  				image.classList.add('has-loaded');
			});
 	- window.onbeforeunload让开发人员可以在想用户离开一个页面的时候进行确认。这个在有些应用中非常有用，比如用户不小心关闭浏览器的tab，我们可以要求用户保存他的修改和数据，否则将会丢失他这次的操作。

			window.onbeforeunload = function() {
  				if (textarea.value != textarea.defaultValue) {
    				return 'Do you want to leave the page and discard changes?';
  				}
			};
		需要注意的是，对页面添加onbeforeunload处理会导致浏览器不对页面进行缓存?，这样会影响页面的访问响应时间。 同时，onbeforeunload的处理函数必须是同步的（synchronous）。
		
###DOM编程	
DOM编程的两点优化：

1. 尽量减少DOM的访问，而把运算放在ECMASript这一端。
2. 尽量缓存局部变量。
    
浏览器下载完页面中的所有组件--HTML标记、Javascript、CSS、图片之后会解析生成两个内部数据结构：`DOM树`,`渲染树`。

`DOM树`表示页面结构，`渲染树`表示DOM节点如何显示，DOM树中的每一个需要显示的节点在渲染树中至少存在一个对应的节点（隐藏的DOM元素display值为none在渲染树中没有对应的节点），渲染树中的节点被称为**帧**或**盒**，一旦DOM树和渲染树构建完成，浏览器就开始显示页面元素。

当DOM的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构建渲染树，这个过程为重排。完成重排后，浏览器会重新绘制受影响的部分到屏幕，该过程称为重绘。由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。但table及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性，通常需要3倍于同等元素的时间。这也是为什么我们需要避免使用table做布局的一个原因。并不是所有的DOM变化都会影响几何属性，比如改变一个元素的背景色并不会影响元素的宽和高，这种情况下只会发生重绘。

每次重排必然会导致重绘，那么重排会在哪些情况发生？

1. 添加或删除可见的DOM元素
2. 元素位置改变
3. 元素尺寸改变
4. 元素内容改变（例如：一个文本被另一个不同尺寸的图片代替）
5. 页面渲染初始化（这个无法避免）
6. 浏览器窗口尺寸改变
	
获取布局信息的操作会导致队列刷新，比如：

1. offsetTop、offsetLeft、offsetWidth、offsetHeight
2. scrollTop、scrollLeft、scrollWidth、scrollHeight
3. clientTop、clientLeft、clientWidth、clientHeight
4. getComputedStyle() (currentStyle in IE)

文档片段`fragment`元素的应用

例：

	<ul id="fruit">
		<li>苹果</li>
	</ul>
	
	var fragment=document.createDocumentFragment();
	
	var li=document.createElement("li");
	li.innerHTML="西柚";
	fragment.appendChild(li);
	
	var li=document.createElement('li');
	li.innerHTML="橙子";
	fragment.appendChild(li);
	
	document.getElementById("fruit").appendChild(fragment);
文档片段是个轻量级的document对象，它的设计初衷就是为了完成这类任务--更新和移动节点。文档片段的一个便利的语法特性是当你附加一个片段到节点时，实际上被添加的时该片段的子节点，而不是片段本身。只触发了一次重排，而且只访问了一次实时的DOM。

使用以下步骤可以避免页面中的大部分重排：

1. 使用绝对位置定位页面上的动画元素，将其脱离文档流。
2. 让元素动起来。当他扩大时，会临时覆盖部分页面。但这只是页面一个区域的重绘过程，不会产生重排并重绘页面的大部分内容。
3. 当动画结束时恢复定位，从而只会下移一次文档的其他元素。

**平时涉及DOM编程时可以参考以下几点：**

1. 尽量不要再布局信息改变时做查询（会导致渲染队列强制刷新）
2. 同一个DOM的多个属性改变可以写在一起（减少DOM访问，同时把强制渲染队列刷新的风险降为0）
3. 如果要批量添加DOM，可以先让元素脱离文档流，操作完后再代入文档流，这样只会触发一次重排（fragment的应用）
4. 将需要多次重排的元素，position属性设置为absolute或fixed,这样此元素就脱离了文档流，它的变化不会影响到其他元素（有动画效果的元素就最好设置为绝对定位）



	

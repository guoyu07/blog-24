##let和const命令

- ES5只有两种声明变量的方法：var命令、function命令。
- ES6一共有6种声明变量的方法：var命令、function命令、let命令、const命令、import命令、class命令。

###let
1. let `块级作用域`，let声明的变量只在它所在的`代码块`内有效。
- let `不存在变量提升`，它所声明的变量一定要在声明后使用，否则报错。
- let `暂时性死区`，只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。（typeof不安全）
- let `不允许重复声明`，let不允许在相同作用域内，重复声明同一个变量。也不能在函数内部重新声明参数。(包括用其他方法声明的同名变量)

注意：

- for循环中的let，`for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。`
- typeof不安全


>暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

###const
const声明一个`只读的常量`。一旦声明，常量的值就不能改变。  
const的作用域与let命令相同：只在声明所在的`块级作用域`内有效。 

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

如果真的想将对象冻结，应该使用`Object.freeze`方法。

	const foo = Object.freeze({});
	// 常规模式时，下面一行不起作用；
	// 严格模式时，该行会报错
	foo.prop = 123;

除了将对象本身冻结，对象的属性也应该冻结。下面是一个`将对象彻底冻结的函数`。

	var constantize = (obj) => {
	  Object.freeze(obj);
	  Object.keys(obj).forEach( (key, value) => {
	    if ( typeof obj[key] === 'object' ) {
	      constantize( obj[key] );
	    }
	  });
	};

	
###块级作用域
1. 外层作用域无法读取内层作用域的变量。   
- 内层作用域可以**定义**外层作用域的同名变量。   
- 本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。   

`ES6引入了块级作用域，明确允许在块级作用域之中声明函数。块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。`

##变量的解构
ES6 允许按照一定模式，从`数组`和`对象`中提取值（只要数据结构具有Iterator接口），对变量进行赋值，这被称为解构（Destructuring）。

解构在本质上，这种写法属于`“模式匹配”`。

- 完全解构：只要等号两边的模式相同，左边的变量就会被赋予对应的值。
- 不完全解构：等号左边的模式，只匹配一部分的等号右边的数组。
- 如果解构不成功，变量的值就等于undefined。

>解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。


###数组的解构赋值
> 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

**从数组中提取值，按照对应位置，对变量赋值。**

	let [a, b, c] = [1, 2, 3];
	
等同于：
	
	let a = 1;
	let b = 2;
	let c = 3;

**默认值**

解构赋值允许指定默认值。(如果一个数组成员不严格等于undefined，默认值是不会生效的。)

	let [foo = true] = []; // foo=true
	let [x, y = 'b'] = ['a']; // x='a', y='b'
	let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
	let [x = 1] = [null]; // x=null
	
- `默认值是表达式`，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
- `默认值引用解构赋值的其他变量`，但该变量必须已经声明。

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

	let arr = [1, 2, 3];
	let {0 : first, [arr.length - 1] : last} = arr;
	first // 1
	last // 3

###对象的解构赋值
>对象的解构与数组有一个重要的不同。数组的`元素是按次序排列`的，变量的取值由它的位置决定；而对象的属性没有次序，`变量必须与属性同名`，才能取到正确的值。

- 变量名与属性名一致

		let { bar, foo } = { foo: "aaa", bar: "bbb" };
		foo // "aaa"
		bar // "bbb"
		
- 变量名与属性名不一致

		let { first: f, last: l } = { first: 'hello', last: 'world' };
		f // 'hello'
		l // 'world'
		
- 如果`解构模式是嵌套的对象`，而且子对象所在的父属性不存在，那么将会报错。

		// 报错
		let {foo: {bar}} = {baz: 'baz'};

	等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。因为foo这时等于undefined，再取子属性就会报错，请看下面的代码。

		let _tmp = {baz: 'baz'};
		_tmp.foo.bar // 报错

- **默认值**，默认值生效的条件是，对象的属性值严格等于undefined。
		
		var {x, y = 5} = {x: 1};
		x // 1
		y // 5
		
		var {x:y = 3} = {};
		y // 3
		
- 如果**解构失败**，变量的值等于undefined。
- 如果要**将一个已经声明的变量用于解构赋值**，必须非常小心。

		// 错误的写法
		let x;
		{x} = {x: 1};
		// SyntaxError: syntax error

		// 正确的写法
		({x} = {x: 1});

		
`对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者(变量)，而不是前者(模式)。`

注意，`采用这种写法时，变量的声明和赋值是一体的`。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。**解构赋值的变量都会重新声明**

	let foo;
	let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"
	
###字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

	const [a, b, c, d, e] = 'hello';
	a // "h"
	b // "e"
	c // "l"
	d // "l"
	e // "o"

类似数组的对象都有一个`length属性`，因此还可以对这个属性解构赋值。

	let {length : len} = 'hello';
	len // 5
	
###数值和布尔值的解构赋值
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

	let {toString: s} = 123;
	s === Number.prototype.toString // true
	
	let {toString: s} = true;
	s === Boolean.prototype.toString // true

###函数参数的解构赋值

###圆括号问题

###解构的用途
1. 交互变量的值

		let a = 1;
		let b = 2;
		[a, b] = [b, a];
		//a:2 b:1

- 从函数返回多个值

		function multReturn() {
		    return [1, 2, 3]
		}
		let [a,b,c] = multReturn();
		//a:1 b:2 c:3

- 函数参数的定义
	
		function fArr([x,y]) {
		    console.log("x:" + x, "y:" + y);
		}
		fArr([1, 2]); //x:1 y:2

- 函数参数的默认值

		function fArr([x=0,y=0]=[-1, -1]) {
		    console.log("x:" + x, "y:" + y);
		}
		fArr(); //x:-1 y:-1
		fArr([]); //x:0 y:0
		fArr([1]); //x:1 y:0
		fArr([1, 2]); //x:1 y:2

- 提取JSON数据

		let person = {
		    name: '姓名',
		    age: '年龄',
		    sex: '性别'
		};
		let {name,age,sex:gender}=person;
		console.log(name, age, gender);//姓名 年龄 性别
		
- 遍历Map结构

		let map = new Map();
		map.set("key1", "value1");
		map.set("key2", "value2");
		
		for (let [key,value] of map){
		    console.log(key, value);
		}
		
		for (let [key] of map){
		    console.log("key:" + key);
		}
		
		for (let [,value] of map){
		    console.log("value:" + value);
		}

- 输入模块的指定方法

		const { SourceMapConsumer, SourceNode } = require("source-map");










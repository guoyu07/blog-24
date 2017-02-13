##let和const命令
###let
let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
####使用var
	var a = [];
	for (var i = 0; i < 10; i++) {
	  a[i] = function () {
	    console.log(i);
	  };
	}
	a[6](); // 10

变量i是var声明的，`在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。`

####使用let，声明的变量仅在块级作用域内有效

	var a = [];
	for (let i = 0; i < 10; i++) {
	  a[i] = function () {
	    console.log(i);
	  };
	}
	a[6](); // 6

变量i是let声明的，`当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量`。

####for循环
>`for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。`

	for (let i = 0; i < 3; i++) {
	  let i = 'abc';
	  console.log(i);
	}
	// abc
	// abc
	// abc

上面代码输出了3次abc，这表明函数内部的变量i和外部的变量i是分离的。

####不存在变量提升
var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。

let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

####暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

	var tmp = 123;
	
	if (true) {
	  tmp = 'abc'; // ReferenceError
	  let tmp;
	}

上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

`ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。`

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

>总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

####暂时性死区 typeof
“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

	typeof x; // ReferenceError
	let x;

上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。

作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。

	typeof undeclared_variable // "undefined"

上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。

####不允许重复声明
let不允许在相同作用域内，重复声明同一个变量。

	// 报错
	function () {
	  let a = 10;
	  var a = 1;
	}
	
	// 报错
	function () {
	  let a = 10;
	  let a = 1;
	}

因此，不能在函数内部重新声明参数。

	function func(arg) {
	  let arg; // 报错
	}
	
	function func(arg) {
	  {
	    let arg; // 不报错
	  }
	}


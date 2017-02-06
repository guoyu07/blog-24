const 声明一个只读的常量。一旦声明，常量的值就不能改变。

使用Object.freeze方法冻结const定义的对象，使其添加、修改其属相不起作用，例：

	const foo = Object.freeze({});
	// 常规模式时，下面一行不起作用；
	// 严格模式时，该行会报错
	foo.prop = 123;
	
ES5只有两种声明变量的方法：var命令和function命令。   
ES6除了添加let和const命令，另外两种声明变量的方法：import命令和class命令。   
所以，ES6一共有6种声明变量的方法。   

解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
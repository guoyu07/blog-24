#javascript编程技巧
##用匿名函数保留全局变量的值
代码1
	
	function asyncFun(callback) {
	    setTimeout(callback, 200);
	}
	var color = 'blue';
	asyncFun(function () {
	    console.log('The color is ' + color);
	});
	color = 'green';
	
如果此段代码是同步执行的，输出应该是：The color is blue，但是这段代码是异步的，在console.log执行之前color的值变为green，此时的输出为：The color is green。

在不改变代码顺序的前提下，如何输出：The color is blue？就要用javascript闭包“冻结”color的值。**对asyncFun的调用封装到一个以color为参数的匿名函数里，并马上执行这个匿名函数。**

代码2

	function asyncFun(callback) {
	    setTimeout(callback, 200);
	}
	var color = 'blue';
	(function (color) {
	    asyncFun(function () {
	        console.log('The color is' + color);
	    })
	})(color);
	color = 'green';
	
`考察知识点`：闭包、匿名函数、函数自执行、变量(color)作用域、怎么用闭包控制程序的状态。
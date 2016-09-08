代码片段：

	expr && doSomething();
	
	// Instead of:
	if (expr) {
	   doSomething();
	}
	
代码片段：

	function doSomething () {
	   return { foo: "bar" };
	}
	var expr = true;
	var res = expr && doSomething();
	res && console.log(res);
	// → { foo: "bar" }	
	
类型转换 代码片段：

	// From anything to a number
	
	var foo = "42";
	var myNumber = +foo; // shortcut for Number(foo)
	// → 42
	
	// Tip: you can convert it directly into a negative number
	var negativeFoo = -foo; // or -Number(foo)
	// → -42
	
	// From object to array
	// Tip: `arguments` is an object and in general you want to use it as array
	var args = { 0: "foo", 1: "bar", length: 2 };
	Array.prototype.slice.call(args)
	// → [ 'foo', 'bar' ]
	
	// Anything to boolean
	/// Non non p is a boolean p
	var t = 1;
	var f = 0;
	!!t
	// → true
	!!f
	// → false
	
	/// And non-p is a boolean non-p
	!t
	// → false
	!f
	// → true
	
	// Anything to string
	var foo = 42;
	"" + foo // shortcut for String(foo)
	// → "42"
	
	foo = { hello: "world" };
	JSON.stringify(foo);
	// → '{ "hello":"world" }'
	
	JSON.stringify(foo, null, 4); // beautify the things
	// →
	// '{
	//    "hello": "world"
	// }'
	
	// Note you cannot JSON.stringify circular structures
	JSON.stringify(window);
	// ⚠ TypeError: JSON.stringify cannot serialize cyclic structures.

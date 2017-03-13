##Object.create()
指定原型对象和属性来创建一个新的对象。

	Object.create(proto, [ propertiesObject ])
	
参数说明：

- proto：一个对象，作为新创建对象的原型。或者为 null。
- propertiesObject 可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。

###使用Object.create实现类式继承

    function Shape(x, y) {
      console.log("Shape");
      this.x = x;
      this.y = y;
    }
    Shape.prototype.toMove = function (x, y) {
      this.x = this.x + x;
      this.y = this.y + y;
      console.log("Shape toMove", this.x, this.y)
    };

    function Reactangle() {
      console.log("Reactangle");
      Shape.apply(this, arguments);
    }
    Reactangle.prototype = Object.create(Shape.prototype);
    Reactangle.prototype.constructor = Reactangle;

    var reactangle = new Reactangle(1, 2);
    reactangle.toMove(2, 2);
    
其中：

    Reactangle.prototype = Object.create(Shape.prototype);
    Reactangle.prototype.constructor = Reactangle;
    
等价于:

    function create(_prototype) {
      function F() {};
      F.prototype = _prototype;
      F.prototype.constructor = F;
      return new F();
    }
    Reactangle.prototype = create(Shape.prototype);
    
##Object.defineProperty()
修改对象属性默认的特性（IE8+）

	object.defineProperty(object, attribute, descriptors)
	
参数说明：

- object：属性所在的对象
- attribute：属性的名字
- descriptors：描述符对象， 该对象的属性必须是：configurable、enumerable、writable和value.设置其中的一或多个值，可以修改对应的特性值。

例：configurable、writable特性

    var person = {};
    Object.defineProperty(person, 'name', {
      configurable: false,//属性是否可用delete删除,
      writable: false,//是否可写
      value: '姓名'
    });
    console.log(person.name);//姓名
    person.name = "重赋值name";//重新赋值不起作用,因为name属性为只读,不可写
    console.log(person.name);//姓名
    delete person.name; //非严格模式下也不会发生,严格模式下会导致错误
    console.log(person.name);//姓名
    
注：可通过Object.defineProperties(object, descriptors)定义多个属性


##Object.getOwnPropertyNames()
返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。

参数说明：

- obj：一个对象，其自身的可枚举和不可枚举属性的名称被返回。

例：

	var obj = { 0: "a", 1: "b", 2: "c"};
    console.log(Object.getOwnPropertyNames(obj).jo);//0,1,2

##Object.keys()
返回一个数组，包含指定对象的所有自有可遍历属性的名称。

参数说明：

- obj：要返回其枚举自身属性的对象。

例：

	var arr = ["a", "b", "c"];
	alert(Object.keys(arr)); 
	// 弹出"0,1,2"
	
	/* 类数组对象 */ 
	var obj = { 0 : "a", 1 : "b", 2 : "c"};
	alert(Object.keys(obj)); 
	// 弹出"0,1,2"
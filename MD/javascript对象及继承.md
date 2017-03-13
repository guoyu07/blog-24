##javascript对象
###创建对象的方式
####一、创建Object实例

    var person = new Object();
    person.name = "姓名";
    person.sayName = function () {
      console.log("name:" + this.name);
    }
    person.sayName();
    
 **缺点：使用同一个接口创建很多对象，会产生大量的重复代码。**

####二、对象字面量方式
    var person = {
      name: '姓名',
      sayName: function () {
        console.log("name:" + this.name);
      }
    };
    person.sayName();
    
  **缺点：使用同一个接口创建很多对象，会产生大量的重复代码。**
  
####三、工厂模式
用函数来封装以特定的接口创建对象的细节

	function createPersonFactory(name) {
      var person = new Object();
      person.name = name;
      person.sayName = function () {
        console.log("name:" + this.name);
      };
      return person;
    }

    var person1 = createPersonFactory('李雷');
    person1.sayName();
    var person2 = createPersonFactory('韩梅梅');
    person2.sayName();
    
 **缺点：工厂模式虽然解决了创建多个相识对象的问题，但却没有解决对象识别的问题。**
 
####四、构造函数模式

    function Person(name) {
      this.name = name;
      this.sayName = function () {
        console.log("name:" + this.name);
      }
    }
    var person1 = new Person('李雷');
    person1.sayName();
    var person2 = new Person('韩梅梅');
    person2.sayName();
    
    console.log(person1.sayName == person2.sayName);//false
    
**缺点：每个方法都要在每个实例上重新创建一遍。**   
    
 **构造函数模式与工厂方法模式不同之处：**
 
 - 没有显示的创建对象； 
 - 直接将属性和方法赋给了this对象；
 - 没有return语句
 
 **要创建Person的新实例，必须使用new操作符。**
 
 以这种方式调用构造函数实际上经历以下4个步骤：
 
 1. 创建一个新对象；
 - 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
 - 执行构造函数中的代码（为这个新对象添加属性）；
 - 返回新对象。
 
 **创建自定义的构造函数可以将它的实例标识为一种特定的类型，这点胜过工厂模式。**
 
 注：对象的constructor属性最初是用来标识对象类型的。instanceof检查对象类型。
 
####五、原型模式
**每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。**

	function Person() {
    }
    Person.prototype.name="姓名";
    Person.prototype.sayName=function () {
      console.log("name:" + this.name);
    };
    var person1 = new Person();
    person1.sayName();//姓名
    var person2 = new Person();
    person2.sayName();//姓名

	console.log(person1.name == person2.name);//true
    console.log(person1.sayName == person2.sayName);//true

####六、组合使用构造函数模式和原型模式(创建自定义类型的最常见方式)
**构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数。**

    function Person(name) {
      this.name = name;
    }
    Person.prototype.sayName = function () {
      console.log("name:" + this.name);
    };
    var person1 = new Person('李雷');
    person1.sayName();//李雷
    var person2 = new Person('韩梅梅');
    person2.sayName();//韩梅梅

    console.log(person1.name == person2.name);//false
    console.log(person1.sayName == person2.sayName);//true
    
    

<br>
参考：
[30 分钟学会 JS 继承](https://zhuanlan.zhihu.com/p/25578222)

##javascript继承方式
###一、原型链继承
	function Parent(name) { 
	    this.name = name;
	}
	Parent.prototype.sayName = function() {
	    console.log('parent name:', this.name);
	}
	function Child(name) {
	    this.name = name;
	}
	
	Child.prototype = new Parent('father');
	Child.prototype.constructor = Child;
	
	Child.prototype.sayName = function() {
	    console.log('child name:', this.name);
	}
	
	var child = new Child('son');
	child.sayName();    // child name: son
	
只要是原型链中出现过的原型，都可以说是该原型链派生的实例的原型。
	
这种方法存在两个缺点：

- 子类型无法给超类型传递参数，在面向对象的继承中，我们总希望通过 var child = new Child('son', 'father'); 让子类去调用父类的构造器来完成继承。而不是通过像这样 new Parent('father') 去调用父类。
- Child.prototype.sayName 必须写在 Child.prototype = new Parent('father'); 之后，不然就会被覆盖掉。

###二、类式继承
	function Parent(name) { 
	    this.name = name;
	}
	Parent.prototype.sayName = function() {
	    console.log('parent name:', this.name);
	}
	Parent.prototype.doSomthing = function() {
	    console.log('parent do something!');
	}
	function Child(name, parentName) {
	    Parent.call(this, parentName);
	    this.name = name;
	}
	
	Child.prototype.sayName = function() {
	    console.log('child name:', this.name);
	}
	
	var child = new Child('son');
	child.sayName();      // child name: son
	child.doSomthing();   // TypeError: child.doSomthing is not a function
	
相当于 Parent 这个函数在 Child 函数中执行了一遍，并且将所有与 this 绑定的变量都切换到了 Child 上，这样就克服了第一种方式带来的问题。

缺点：

- 没有原型，每次创建一个 Child 实例对象时候都需要执行一遍 Parent 函数，无法复用一些公用函数。

###三、组合式继承：前两种方式的结合
	function Parent(name) { 
	    this.name = name;
	}
	
	Parent.prototype.sayName = function() {
	    console.log('parent name:', this.name);
	}
	Parent.prototype.doSomething = function() {
	    console.log('parent do something!');
	}
	function Child(name, parentName) {
	    Parent.call(this, parentName);
	    this.name = name;
	}
	
	Child.prototype.sayName = function() {
	    console.log('child name:', this.name);
	}
	
	Child.prototype = new Parent();      
	Child.prototype.construtor = Child;
	
	var child = new Child('son');
	child.sayName();       // child name: son
	child.doSomething();   // parent do something!

组合式继承是比较常用的一种继承方法，其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

>组合式继承是 JS 最常用的继承模式，但组合继承使用过程中会被调用两次：一次是创建子类型的时候，另一次是在子类型构造函数的内部。

	function Parent(name) { 
	    this.name = name;
	}
	Parent.prototype.sayName = function() {
	    console.log('parent name:', this.name);
	}
	Parent.prototype.doSomething = function() {
	    console.log('parent do something!');
	}
	function Child(name, parentName) {
	    Parent.call(this, parentName);      // 第二次调用
	    this.name = name;
	}
	
	Child.prototype.sayName = function() {
	    console.log('child name:', this.name);
	}
	
	Child.prototype = new Parent();         // 第一次调用
	Child.prototype.construtor = Child;
	
	var child = new Child('son');
	child.sayName();      
	child.doSomething();   
	
显然从上述的代码中可以看出，第一次调用构造函数显然是没有必要的，因为第一次调用构造函数时候不需要函数内部的那些实例属性，这么写只是想获得其原型上的方法罢了，所以这时候你可能会这样写：

Child.prototype = Parent.prototype;

这样写显然是不对的：

- 首先，你这样写的话相当于是子类和父类都指向同一个对象，这时候如果你添加了新的方法给 Child 但实际上 Parent 并不需要，相当于强行给 Parent 添加了一个未知的方法。
- 其次，仔细想想，这样体现不出继承的多态性，比如此时子类想要重写父类的 getName 的方法，那么父类的方法也就会随之修改，这显然违背了多态性。

也就是说我们第一次调用构造函数的时候，其实是不管构造函数里面的内容，所以我们何不 new 一个空函数，将其 prototype 指向 Parent.prototype，代码如下：

###四、寄生组合式继承：

	function Parent(name) {
	    this.name = name;
	}
	Parent.prototype.sayName = function() {
	    console.log('parent name:', this.name);
	}
	
	function Child(name, parentName) {
	    Parent.call(this, parentName);  
	    this.name = name;    
	}
	
	function create(proto) {
	    function F(){}
	    F.prototype = proto;
	    F.prototype.construtor = F;
	    return new F();
	}
	
	Child.prototype = create(Parent.prototype);
	Child.prototype.sayName = function() {
	    console.log('child name:', this.name);
	}
	Child.prototype.construtor = Child;
	
	var parent = new Parent('father');
	parent.sayName();    // parent name: father
	
	
	var child = new Child('son', 'father');
	child.sayName();     // child name: son

这就是所谓的寄生组合式继承方式，跟组合式继承的区别在于，他不需要在一次实例中调用两次父类的构造函数，假如说父类的构造器代码很多，还需要调用两次的话对系统肯定会有影响，寄生组合式继承的思想在于：用一个 F 空的构造函数去取代执行了 Parent 这个构造函数。

在上面的代码中，我们手动创建了一个 create 函数，但是其实是存在于 Object 对象中，不需要我们手动去创建，所以上面的代码可以改为：

	function Parent(name) {
	    this.name = name;
	}
	Parent.prototype.sayName = function() {
	    console.log('parent name:', this.name);
	}
	
	function Child(name, parentName) {
	    Parent.call(this, parentName);  
	    this.name = name;    
	}
	
	function inheritPrototype(Parent, Child) {
	    Child.prototype = Object.create(Parent.prototype);   //修改
	    Child.prototype.construtor = Child;
	}
	
	inheritPrototype(Parent, Child);
	
	Child.prototype.sayName = function() {
	    console.log('child name:', this.name);
	}
	
	var parent = new Parent('father');
	parent.sayName();      // parent name: father
	
	var child = new Child('son', 'father');
	child.sayName();       // child name: son

###五、ES6继承

当然，如果你学习过 ES6，那么写继承关系就会特别简单，如果你学过 Java 就会发现，ES6 中的继承跟 Java 太像了，上述的代码可改为：

	class Parent {
	    constructor(name) {
		this.name = name;
	    }
	    doSomething() {
		console.log('parent do something!');
	    }
	    sayName() {
		console.log('parent name:', this.name);
	    }
	}
	
	class Child extends Parent {
	    constructor(name, parentName) {
		super(parentName);
		this.name = name;
	    }
	    sayName() {
	 	console.log('child name:', this.name);
	    }
	}
	
	const child = new Child('son', 'father');
	child.sayName();            // child name: son
	child.doSomething();        // parent do something!
	
	const parent = new Parent('father');
	parent.sayName();           // parent name: father


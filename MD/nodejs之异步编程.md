#nodejs之异步编程
Node中两种相应逻辑管理方式：回调和事件监听。

- 回调通常用来定义一次性响应的逻辑。   
	回调是一个函数，它被当做参数传给异步函数，它描述了异步操作完成之后要做什么。   
	Node的异步回调惯例：node中的大多数内置模块在使用回调时都会带两个参数：第一个是用来放可能会发生的错误（常被缩写为er或err），第二个是放结构的
- 事件监听器，本质上也是一个回调，不同的是，它跟一个概念实体(事件)相关联。  
	用事件发射器处理重复性事件。       
	事件是通过监听器进行处理的，监听器是跟事件相关联的，带有一个事件出现时就会被触发的回调函数。   
	on方法监听的事件可持续不断地相应事件，once方法响应单次事件。   

自定义事件发射器

创建代码demo7/index.js
 
	var EventEmitter = require('events').EventEmitter;
	var channel = new EventEmitter();
	
	/*//或写成
	var events = require('events');
	var channel = new events.EventEmitter();*/
	
	
	//用on方法给事件发射器添加监听器
	channel.on('join', function () {
	    console.log("自定义事件发射器");
	});
	
	//用emit函数发射这个事件
	channel.emit('join');
	
命令行执行：

	node demo7/index.js
	
命令行输出：

	自定义事件发射器
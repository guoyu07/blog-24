#JavaScript异步编程及Promise模式

##Javascript异步编程
Javascript语言将任务的执行模式分成两种：同步（Synchronous）和异步（Asynchronous）。

"同步模式"就是上一段的模式，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；   
"异步模式"则完全不同，每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。

"异步模式"非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是Ajax操作。
###"异步模式"编程的4种方法

####一、回调函数    
这是异步编程最基本的方法。   
假定有两个函数f1和f2，后者等待前者的执行结果。

	f1();
	f2();
	
如果f1是一个很耗时的任务，可以考虑改写f1，把f2写成f1的回调函数。
	
	function f1(callback){
		setTimeout(function () {
			// f1的任务代码
			callback();
		}, 1000);
	}
	
执行代码就变成下面这样：

	f1(f2);
	
采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。

回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。

####二、事件监听
另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的jQuery的写法）。
	
	f1.on('done', f2);
	
上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：

	function f1(){
		setTimeout(function () {
			// f1的任务代码
			f1.trigger('done');
		}, 1000);
	}
	
f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

####三、发布/订阅
我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

这个模式有多种[实现](https://msdn.microsoft.com/en-us/magazine/hh201955.aspx)，下面采用的是Ben Alman的[Tiny Pub/Sub](https://gist.github.com/cowboy/661855)，这是jQuery的一个插件。

首先，f2向"信号中心"jQuery订阅"done"信号。

	jQuery.subscribe("done", f2);
	
然后，f1进行如下改写：

	function f1(){
		setTimeout(function () {
			// f1的任务代码
			jQuery.publish("done");
		}, 1000);
	}
	
jQuery.publish("done")的意思是，f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行。

此外，f2完成执行后，也可以取消订阅（unsubscribe）。

	jQuery.unsubscribe("done", f2);
	
这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

####Promises对象
Promises对象是CommonJS工作组提出的一种规范，目的是为异步编程提供[统一接口](http://wiki.commonjs.org/wiki/Promises/A)。

简单说，它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。比如，f1的回调函数f2,可以写成：

	f1().then(f2);
	
f1要进行如下改写（这里使用的是jQuery的[实现](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)）：

	function f1(){
		var dfd = $.Deferred();
		setTimeout(function () {
			// f1的任务代码
			dfd.resolve();
		}, 500);
		return dfd.promise;
	}
	
这样写的优点在于，回调函数变成了链式写法，程序的流程可以看得很清楚，而且有一整套的[配套方法](http://api.jquery.com/category/deferred-object/)，可以实现许多强大的功能。

比如，指定多个回调函数：

	f1().then(f2).then(f3);
	
再比如，指定发生错误时的回调函数：

	f1().then(f2).fail(f3);
	
而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。这种方法的缺点就是编写和理解，都相对比较难。

###Jquery中的异步编程模式--deferred对象
jQuery 从 1.5 版本引入了 deferred 对象，这是一个基于 CommonJS Promises/A 的设计。

####一、什么是deferred对象？
开发网站的过程中，我们经常遇到某些耗时很长的javascript操作。其中，既有异步的操作（比如ajax读取服务器数据），也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。
通常的做法是，为它们指定回调函数（callback）。即事先规定，一旦它们运行结束，应该调用哪些函数。
但是，在回调函数方面，jQuery的功能非常弱。为了改变这一点，jQuery开发团队就设计了deferred对象。
简单说，deferred对象就是jQuery的回调函数解决方案。在英语中，defer的意思是"延迟"，所以deferred对象的含义就是"延迟"到未来某个点再执行。

####二、ajax操作的链式写法

	$.ajax({
		url: "test.html",
		success: function(){
			alert("哈哈，成功了！");
		},
		error:function(){
			alert("出错啦！");
		}
	});
	
在上面的代码中，$.ajax()接受一个对象参数，这个对象包含两个方法：success方法指定操作成功后的回调函数，error方法指定操作失败后的回调函数。

$.ajax()操作完成后，如果使用的是低于1.5.0版本的jQuery，返回的是XHR对象，你没法进行链式操作；如果高于1.5.0版本，返回的是deferred对象，可以进行链式操作。

现在，新的写法是这样的：
	
	$.ajax("test.html")
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	
可以看到，done()相当于success方法，fail()相当于error方法。采用链式写法以后，代码的可读性大大提高。

####三、指定同一操作的多个回调函数
deferred对象的一大好处，就是它允许你自由添加多个回调函数。  
还是以上面的代码为例，如果ajax操作成功后，除了原来的回调函数，我还想再运行一个回调函数，怎么办？    
很简单，直接把它加在后面就行了。

	$.ajax("test.html")
	.done(function(){ alert("哈哈，成功了！");} )
	.fail(function(){ alert("出错啦！"); } )
	.done(function(){ alert("第二个回调函数！");} );
	
回调函数可以添加任意多个，它们按照添加顺序执行。

####四、为多个操作指定回调函数
deferred对象的另一大好处，就是它允许你为多个事件指定一个回调函数，这是传统写法做不到的。    
请看下面的代码，它用到了一个新的方法$.when()：

	$.when($.ajax("test1.html"), $.ajax("test2.html"))
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });

这段代码的意思是，先执行两个操作$.ajax("test1.html")和$.ajax("test2.html")，如果都成功了，就运行done()指定的回调函数；如果有一个失败或都失败了，就执行fail()指定的回调函数。

####五、普通操作的回调函数接口（上）
deferred对象的最大优点，就是它把这一套回调函数接口，从ajax操作扩展到了所有操作。也就是说，任何一个操作----不管是ajax操作还是本地操作，也不管是异步操作还是同步操作----都可以使用deferred对象的各种方法，指定回调函数。

我们来看一个具体的例子。假定有一个很耗时的操作wait：

	var wait = function(){
		var tasks = function(){
			alert("执行完毕！");
		};
		setTimeout(tasks,5000);
	};
	
我们为它指定回调函数，应该怎么做呢？   
很自然的，你会想到，可以使用$.when()：

	$.when(wait())
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	
但是，这样写的话，done()方法会立即执行，起不到回调函数的作用。原因在于$.when()的参数只能是deferred对象，所以必须对wait()进行改写：

	var dtd = $.Deferred(); // 新建一个deferred对象
	var wait = function(dtd){
		var tasks = function(){
			alert("执行完毕！");
			dtd.resolve(); // 改变deferred对象的执行状态
		};
		setTimeout(tasks,5000);
		return dtd;
	};
	
现在，wait()函数返回的是deferred对象，这就可以加上链式操作了。
	
	$.when(wait(dtd))
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	
wait()函数运行完，就会自动运行done()方法指定的回调函数。

####六、deferred.resolve()方法和deferred.reject()方法
jQuery规定，deferred对象有三种执行状态----未完成，已完成和已失败。如果执行状态是"已完成"（resolved）,deferred对象立刻调用done()方法指定的回调函数；如果执行状态是"已失败"，调用fail()方法指定的回调函数；如果执行状态是"未完成"，则继续等待，或者调用progress()方法指定的回调函数（jQuery1.7版本添加）。

前面部分的ajax操作时，deferred对象会根据返回结果，自动改变自身的执行状态；但是，在wait()函数中，这个执行状态必须由程序员手动指定。dtd.resolve()的意思是，将dtd对象的执行状态从"未完成"改为"已完成"，从而触发done()方法。

类似的，还存在一个deferred.reject()方法，作用是将dtd对象的执行状态从"未完成"改为"已失败"，从而触发fail()方法。

	var dtd = $.Deferred(); // 新建一个Deferred对象
	var wait = function(dtd){
		var tasks = function(){
			alert("执行完毕！");
			dtd.reject(); // 改变Deferred对象的执行状态
		};
		setTimeout(tasks,5000);
		return dtd;
	};
	$.when(wait(dtd))
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	
####七、deferred.promise()方法
上面这种写法，还是有问题。那就是dtd是一个全局对象，所以它的执行状态可以从外部改变。   
请看下面的代码：

	var dtd = $.Deferred(); // 新建一个Deferred对象
	var wait = function(dtd){
		var tasks = function(){
			alert("执行完毕！");
			dtd.resolve(); // 改变Deferred对象的执行状态
		};
		setTimeout(tasks,5000);
		return dtd;
	};
	$.when(wait(dtd))
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	dtd.resolve();
	
我在代码的尾部加了一行dtd.resolve()，这就改变了dtd对象的执行状态，因此导致done()方法立刻执行，跳出"哈哈，成功了！"的提示框，等5秒之后再跳出"执行完毕！"的提示框。

为了避免这种情况，jQuery提供了deferred.promise()方法。它的作用是，在原来的deferred对象上返回另一个deferred对象，后者只开放与改变执行状态无关的方法（比如done()方法和fail()方法），屏蔽与改变执行状态有关的方法（比如resolve()方法和reject()方法），从而使得执行状态不能被改变。

请看下面的代码：

	var dtd = $.Deferred(); // 新建一个Deferred对象
	var wait = function(dtd){
		var tasks = function(){
			alert("执行完毕！");
			dtd.resolve(); // 改变Deferred对象的执行状态
		};
		setTimeout(tasks,5000);
		return dtd.promise(); // 返回promise对象
	};
	var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作
	$.when(d)
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	d.resolve(); // 此时，这个语句是无效的
	
在上面的这段代码中，wait()函数返回的是promise对象。然后，我们把回调函数绑定在这个对象上面，而不是原来的deferred对象上面。这样的好处是，无法改变这个对象的执行状态，要想改变执行状态，只能操作原来的deferred对象。 

这里有两个地方需要注意。   
首先，wait最后一行不能直接返回dtd，必须返回dtd.promise()。原因是jQuery规定，任意一个deferred对象有三种执行状态—-未完成，已完成和已失败。如果直接返回dtd，$.when()的默认执行状态为”已完成”，立即触发后面的done()方法，这就失去回调函数的作用了。dtd.promise()的目的，就是保证目前的执行状态—-也就是”未完成”—-不变，从而确保只有操作完成后，才会触发回调函数。
也就是说，deferred.promise() 只是阻止其他代码来改变这个 deferred 对象的状态。可以理解成，通过 deferred.promise() 方法返回的 deferred promise 对象，是没有 resolve ,reject, progress , resolveWith, rejectWith , progressWith 这些可以改变状态的方法，你只能使用 done, then ,fail 等方法添加 handler 或者判断状态。   
deferred.promise() 改变不了 deferred 对象的状态，作用也不是保证目前的状态不变，它只是保证你不能通过 deferred.promise() 返回的 deferred promise 对象改变 deferred 对象的状态。如果我们这个地方直接返回 dtd，也是可以工作的，.done 的处理函数还是会等到 dtd.resolve() 之后才会执行.  
我们把代码改成如下的形式：

	var dtd = $.Deferred(); // 新建一个deferred对象
	var wait = function(dtd){
    	var tasks = function(){
        	alert("执行完毕！");
        	dtd.resolve(); // 改变deferred对象的执行状态
    	};
    	setTimeout(tasks,5000);
    	return dtd;
	};
	$.when(wait(dtd))
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	
这样的执行结果和先前返回 dtd.promise 的结果是一样的。   
差别在什么地方呢？如果我们把 $.when 的这块的代码改成这样的：
		
	var d = wait(dtd);
	$.when(d)
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	d.resolve();
  
不过，更好的写法是allenm所指出的，将dtd对象变成wait(）函数的内部对象。   
	
	var wait = function(dtd){
		var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
		var tasks = function(){
			alert("执行完毕！");
			dtd.resolve(); // 改变Deferred对象的执行状态
		};
		setTimeout(tasks,5000);
		return dtd.promise(); // 返回promise对象
	};
	$.when(wait())
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });

我们会发现 alert(“哈哈，成功了！”) 会立即执行，“执行完毕”却需要5秒后才弹出来。    
但是如果我们 wait 函数最后是 return dtd.promise() 这里 d.resolve() 就会报错了，因为对象 d 不存在 resolve() 方法。  
同样如果我们把代码改成:

	var dtd = $.Deferred(); // 新建一个deferred对象
	var wait = function(dtd){
		var tasks = function(){
			alert("执行完毕！");
			dtd.resolve(); // 改变deferred对象的执行状态
		};
		setTimeout(tasks,5000);
		return dtd.promise();
	};
	dtd.resolve();
	$.when( wait(dtd))
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });

我们也可以发现 alert(“哈哈，成功了！”) 会立即执行，因为 dtd 这个 deferred 对象在被传入 wait 之前，已经被 resolve() 了，而 deferred 对象一旦被 resolve 或者 reject 之后，状态是不会改变的。   
然后我们再把 $.wait 这块的代码改成:

	$.when( wait(dtd))
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	dtd.resolve();
	
我们也会发现 alert(“哈哈，成功了！”); 被立即执行，虽然 wait(dtd) 执行的时候， dtd 还没有被 resolve，而且 wait 方法返回的是 dtd.promise(), 但是 dtd 这个原始的 deferred 对象是暴露在外面的，我们还是可以从外面改变它的状态。   
于是，如果我们真的不想让其他代码能改变 wait 方法内部的 deferred 对象的状态，那我们应该写成这样：

	var wait = function(){
    	var dtd = $.Deferred(); // 新建一个deferred对象
    	var tasks = function(){
        	alert("执行完毕！");
			dtd.resolve(); // 改变deferred对象的执行状态
		};
		setTimeout(tasks,5000);
		return dtd.promise();
	};
	$.when( wait())
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	
也就是不要把 deferred 直接暴露出来，最后返回 deferred.promise() ，让其他地方的代码只能添加 handler 。
	
####八、普通操作的回调函数接口（中）
另一种防止执行状态被外部改变的方法，是使用deferred对象的建构函数$.Deferred()。   
这时，wait函数还是保持不变，我们直接把它传入$.Deferred()： 

	$.Deferred(wait)
	.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });

jQuery规定，$.Deferred()可以接受一个函数名（注意，是函数名）作为参数，$.Deferred()所生成的deferred对象将作为这个函数的默认参数。   

####九、普通操作的回调函数接口（下）
除了上面两种方法以外，我们还可以直接在wait对象上部署deferred接口。
	
	var dtd = $.Deferred(); // 生成Deferred对象
	var wait = function(dtd){
		var tasks = function(){
			alert("执行完毕！");
			dtd.resolve(); // 改变Deferred对象的执行状态
		};
		setTimeout(tasks,5000);
	};
	dtd.promise(wait);
	wait.done(function(){ alert("哈哈，成功了！"); })
	.fail(function(){ alert("出错啦！"); });
	wait(dtd);
	
这里的关键是dtd.promise(wait)这一行，它的作用就是在wait对象上部署Deferred接口。正是因为有了这一行，后面才能直接在wait上面调用done()和fail()。

####十、小结：deferred对象的方法
前面已经讲到了deferred对象的多种方法，下面做一个总结：　

1. $.Deferred() 生成一个deferred对象。
2. deferred.done() 指定操作成功时的回调函数
3. deferred.fail() 指定操作失败时的回调函数
4. deferred.promise() 没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变；接受参数时，作用为在参数对象上部署deferred接口。
5. deferred.resolve() 手动改变deferred对象的运行状态为"已完成"，从而立即触发done()方法。
6. deferred.reject() 这个方法与deferred.resolve()正好相反，调用后将deferred对象的运行状态变为"已失败"，从而立即触发fail()方法。
7. $.when() 为多个操作指定回调函数。   
除了这些方法以外，deferred对象还有二个重要方法，上面的教程中没有涉及到。   
8. deferred.then() 有时为了省事，可以把done()和fail()合在一起写，这就是then()方法。

		$.when($.ajax( "/main.php" ))
		.then(successFunc, failureFunc );　
		
	如果then()有两个参数，那么第一个参数是done()方法的回调函数，第二个参数是fail()方法的回调方法。如果then()只有一个参数，那么等同于done()。
9. deferred.always() 这个方法也是用来指定回调函数的，它的作用是，不管调用的是deferred.resolve()还是deferred.reject()，最后总是执行。

		$.ajax( "test.html" )
		.always( function() { alert("已执行！");} );
		 
　　
###promise模式
promise模式，它代表了一种可能会长时间运行而且不一定必须完整的操作的结果。这种模式不会阻塞和等待长时间的操作完成，而是返回一个代表了承诺的（promised）结果的对象。   

promise模式通常会实现一种称为then的方法，用来注册状态变化时对应的回调函数。   

promise模式在任何时刻都处于以下三种状态之一：未完成（unfulfilled）、已完成（resolved）和拒绝（rejected）。
####从零开始构建一个promise模式的框架
首先需要一些对象来存储promise

	var Promise = function () {
        /* initialize promise */
    };
    
接下来，定义then方法，接受两个参数用于处理完成和拒绝状态。

	Promise.prototype.then = function (onResolved, onRejected) {
     	/* invoke handlers based upon state transition */
 	};
 	
同时还需要两个方法来执行从未完成到已完成和从未完成到拒绝的状态转变。

	Promise.prototype.resolve = function (value) {
     	/* move from unfulfilled to resolved */
 	};
 
 	Promise.prototype.reject = function (error) {
     	/* move from unfulfilled to rejected */
 	};
 	
创建一个方法来发送Ajax请求并将其封装在promise中。这个promise对象分别在xhr.onload和xhr.onerror中指定了完成和拒绝状态的转变过程，请注意searchTwitter函数返回的正是promise对象。然后，在loadTweets中，使用then方法设置完成和拒绝状态对应的回调函数。

	function searchTwitter(term) {

    	var url, xhr, results, promise;
    	url = 'http://search.twitter.com/search.json?rpp=100&q=' + term;
    	promise = new Promise();
    	xhr = new XMLHttpRequest();
    	xhr.open('GET', url, true);

    	xhr.onload = function (e) {
        	if (this.status === 200) {
            	results = JSON.parse(this.responseText);
            	promise.resolve(results);
        	}
    	};

    	xhr.onerror = function (e) {
        	promise.reject(e);
    	};

    	xhr.send();
    	return promise;
	}
	
	function handleError(error) {
    	/* handle the error */
 	}
 
 	function concatResults() {
    	/* order tweets by date */
 	}

	function loadTweets() {
    	var container = document.getElementById('container');
    	searchTwitter('#IE10').then(function (data) {
        	data.results.forEach(function (tweet) {
            	var el = document.createElement('li');
            	el.innerText = tweet.text;
            	container.appendChild(el);
        	});
    	}, handleError);
	}
	
到目前为止，我们可以把promise模式应用于单个Ajax请求，似乎还体现不出promise的优势来。下面来看看多个Ajax请求的并发协作。此时，我们需要另一个方法when来存储准备调用的promise对象。一旦某个promise从未完成状态转化为完成或者拒绝状态，then方法里对应的处理函数就会被调用。when方法在需要等待所有操作都完成的时候至关重要。

	Promise.when = function () {
    	/* handle promises arguments and queue each */
	};
	
以获取IE10和IE9两块内容的场景为例，我们可以这样来写代码：

	var container, promise1, promise2;
	container = document.getElementById('container');
	promise1 = searchTwitter('#IE10');
	promise2 = searchTwitter('#IE9');
	Promise.when(promise1, promise2).then(function (data1, data2) {
    	/* Reshuffle due to date */
    	var totalResults = concatResults(data1.results, data2.results);
    	totalResults.forEach(function (tweet) {
        	var el = document.createElement('li');
        	el.innerText = tweet.text;
        	container.appendChild(el);
    	});
	}, handleError);

###ES6 javascript promise
例：男神向女神求婚，需要经过女神的爸爸、大伯以及大姑的意思，他们全部都认了，女神再考虑考虑。 

男神求婚历程的传统JS实现

	// 男神的各项参数
	var NanShen = {
    	"身高": 180,
    	"体重": 80,
    	"年薪": "200K",
    	request: function(obj) {
        	// 成功与否随机决定
        	// 执行成功的概率为80%
        	if (Math.random() > 0.2) {
            	obj.success();
        	} else {
            	obj.error();
        	}
    	}
	};

	var Request = function(names, success) {
	    var index = 0, first = 0;
	    var request = function() {
	        if (names[index]) {
	            NanShen.request({
	                name: names[index],
	                success: function() {
	                    first = 0;
	                    console.log("成功拿下" + names[index]);
	                    index++;
	                    request();
	                },
	                error: function() {
	                    if (first == 1) {
	                        console.log("依旧没能拿下" + names[index] + "，求婚失败");    
	                        return;
	                    } else {
	                        console.log("没能拿下" + names[index] + "，再试一次");    
	                    }
	                    first = 1;
	                    request();    
	                }
	            });    
	        } else {
	            success();
	        }
	    };    
	    
	    request();
	};
	
	Request(["岳父", "大伯", "大姑"], function() {
	    NanShen.request({
	        name: "女神",
	        success: function() {
	            console.log("女神同意，求婚成功！");
	        },
	        error: function() {
	            console.log("女神不同意，求婚失败！");
	        }
	    });
	});

男神求婚历程的Promise实现

	// 男神的各项参数
	var NanShen = {
	    "身高": 180,
	    "体重": 80,
	    "年薪": "200K",
	    request: function(obj) {
	        // 成功与否随机决定
	        // 执行成功的概率为80%
	        if (Math.random() > 0.2) {
	            obj.success();
	        } else {
	            obj.error();
	        }
	    }
	};
	
	var Request = function(name) {
	    return new Promise(function(resolve, reject) {
	        var failed = 0, request = function() {            
	            NanShen.request({
	                name: name,
	                success: function() {
	                    console.log(name + "攻略成功！");
	                    failed = 0;
	                    resolve();
	                },
	                error: function() {
	                    if (failed == 0) {
	                        console.log("第一次攻略" + name + "失败，重试一次！");
	                        failed = 1;
	                        // 重新攻略一次
	                        request();                       
	                    } else {
	                        console.log("依然没有拿下" + name + "，求婚失败！");
	                        reject();
	                    }
	                }
	            });
	        };
			
	        request();
	    });
	};
	
	Request("岳父")                                // 搞定岳父，然后...
	.then(function() { return Request("大伯"); })  // 搞定大伯，然后...
	.then(function() { return Request("大姑"); })  // 搞定大姑，然后...
	.then(function() {                            // 长辈们全部KO后，攻略女神
	    NanShen.request({
	        name: "女神",
	        success: function() {
	            console.log("女神同意，求婚成功！");
	        },
	        error: function() {
	            console.log("女神不同意，求婚失败！");
	        }
	    });
	});




参考文档：    
JavaScript异步编程的Promise模式   
http://www.infoq.com/cn/news/2011/09/js-promise/    
NodeJS的异步编程风格    
http://www.infoq.com/cn/news/2011/09/nodejs-async-code    
Javascript异步编程的4种方法    
http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html    
jQuery的deferred对象详解   
http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
jQuery deferred 对象的 promise 方法   
http://blog.allenm.me/2012/01/jquery_deferred_promise_method/  
ES6 JavaScript Promise的感性认知   
http://www.zhangxinxu.com/wordpress/2014/02/es6-javascript-promise-%E6%84%9F%E6%80%A7%E8%AE%A4%E7%9F%A5/     

The Evolution of Asynchronous JavaScript       
https://blog.risingstack.com/asynchronous-javascript/   
Understanding the Publish/Subscribe Pattern for Greater JavaScript Scalability     
https://msdn.microsoft.com/en-us/magazine/hh201955.aspx    
http://api.jquery.com/category/deferred-object/    

<hr>
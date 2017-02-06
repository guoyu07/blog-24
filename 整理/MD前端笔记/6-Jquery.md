#jQuery

##jQuery设计思想
###一、选择网页元素
jQuery的基本设计思想和主要用法，就是"选择某个网页元素，然后对其进行某种操作"。这是它区别于其他Javascript库的根本特点。

使用jQuery的第一步，往往就是将一个选择表达式，放进构造函数jQuery()（简写为$），然后得到被选中的元素。

选择表达式可以是CSS选择器：

	$(document) //选择整个文档对象
	$('#myId') //选择ID为myId的网页元素
	$('div.myClass') // 选择class为myClass的div元素
	$('input[name=first]') // 选择name属性等于first的input元素
	
也可以是jQuery特有的表达式：

	$('a:first') //选择网页中第一个a元素
	$('tr:odd') //选择表格的奇数行
	$('#myForm :input') // 选择表单中的input元素
	$('div:visible') //选择可见的div元素
	$('div:gt(2)') // 选择所有的div元素，除了前三个
	$('div:animated') // 选择当前处于动画状态的div元素

###二、改变结果集
jQuery设计思想之二，就是提供各种强大的过滤器，对结果集进行筛选，缩小选择结果。

	$('div').has('p'); // 选择包含p元素的div元素
	$('div').not('.myClass'); //选择class不等于myClass的div元素
	$('div').filter('.myClass'); //选择class等于myClass的div元素
	$('div').first(); //选择第1个div元素
	$('div').eq(5); //选择第6个div元素
	
有时候，我们需要从结果集出发，移动到附近的相关元素，jQuery也提供了在DOM树上的移动方法：

	$('div').next('p'); //选择div元素后面的第一个p元素
	$('div').parent(); //选择div元素的父元素
	$('div').closest('form'); //选择离div最近的那个form父元素
	$('div').children(); //选择div的所有子元素
	$('div').siblings(); //选择div的同级元素

###三、链式操作
jQuery设计思想之三，就是最终选中网页元素以后，可以对它进行一系列操作，并且所有操作可以连接在一起，以链条的形式写出来，比如：

	$('div').find('h3').eq(2).html('Hello');
	
分解开来，就是下面这样：

	$('div') //找到div元素
	.find('h3') //选择其中的h3元素
	.eq(2) //选择第3个h3元素
	.html('Hello'); //将它的内容改为Hello
	
这是jQuery最令人称道、最方便的特点。它的原理在于每一步的jQuery操作，返回的都是一个jQuery对象，所以不同操作可以连在一起。

jQuery还提供了.end()方法，使得结果集可以后退一步：

	$('div')
	.find('h3')
	.eq(2)
	.html('Hello')
	.end() //退回到选中所有的h3元素的那一步
	.eq(0) //选中第一个h3元素
	.html('World'); //将它的内容改为World
	
###四、元素的操作：取值和赋值
操作网页元素，最常见的需求是取得它们的值，或者对它们进行赋值。

jQuery设计思想之四，就是使用同一个函数，来完成取值（getter）和赋值（setter），即"取值器"与"赋值器"合一。到底是取值还是赋值，由函数的参数决定。

	$('h1').html(); //html()没有参数，表示取出h1的值
	$('h1').html('Hello'); //html()有参数Hello，表示对h1进行赋值

常见的取值和赋值函数如下：

	.html() 取出或设置html内容
	.text() 取出或设置text内容
	.attr() 取出或设置某个属性的值
	.width() 取出或设置某个元素的宽度
	.height() 取出或设置某个元素的高度
	.val() 取出某个表单元素的值

`需要注意的是，如果结果集包含多个元素，那么赋值的时候，将对其中所有的元素赋值；取值的时候，则是只取出第一个元素的值.`

###五、元素的操作：移动
jQuery设计思想之五，就是提供两组方法，来操作元素在网页中的位置移动。一组方法是直接移动该元素，另一组方法是移动其他元素，使得目标元素达到我们想要的位置。

假定我们选中了一个div元素，需要把它移动到p元素后面。

第一种方法是使用.insertAfter()，把div元素移动p元素后面：
	
	$('div').insertAfter($('p'));
	
第二种方法是使用.after()，把p元素加到div元素前面：

	$('p').after($('div'));

表面上看，这两种方法的效果是一样的，唯一的不同似乎只是操作视角的不同。但是实际上，它们有一个重大差别，那就是返回的元素不一样。第一种方法返回div元素，第二种方法返回p元素。你可以根据需要，选择到底使用哪一种方法。

使用这种模式的操作方法，一共有四对：

	.insertAfter()和.after()：在现存元素的外部，从后面插入元素
	.insertBefore()和.before()：在现存元素的外部，从前面插入元素
	.appendTo()和.append()：在现存元素的内部，从后面插入元素
	.prependTo()和.prepend()：在现存元素的内部，从前面插入元素
	
###六、元素的操作：复制、删除和创建
除了元素的位置移动之外，jQuery还提供其他几种操作元素的重要方法。    
复制元素使用.clone()。    
删除元素使用.remove()和.detach()。两者的区别在于，前者不保留被删除元素的事件，后者保留，有利于重新插入文档时使用。   
清空元素内容（但是不删除该元素）使用.empty()。   
创建新元素的方法非常简单，只要把新元素直接传入jQuery的构造函数就行了：

	$('<p>Hello</p>');
	$('<li class="new">new list item</li>');
	$('ul').append('<li>list item</li>');

###七、工具方法
jQuery设计思想之六：除了对选中的元素进行操作以外，还提供一些与元素无关的工具方法（utility）。不必选中元素，就可以直接使用这些方法。

如果你懂得Javascript语言的继承原理，那么就能理解工具方法的实质。它是定义在jQuery构造函数上的方法，即jQuery.method()，所以可以直接使用。而那些操作元素的方法，是定义在构造函数的prototype对象上的方法，即jQuery.prototype.method()，所以必须生成实例（即选中元素）后使用。如果不理解这种区别，问题也不大，只要把工具方法理解成，是像javascript原生函数那样，可以直接使用的方法就行了。

常用的工具方法有以下几种：

	$.trim() 去除字符串两端的空格。
	$.each() 遍历一个数组或对象。
	$.inArray() 返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。
	$.grep() 返回数组中符合某种标准的元素。
	$.extend() 将多个对象，合并到第一个对象。
	$.makeArray() 将对象转化为数组。
	$.type() 判断对象的类别（函数对象、日期对象、数组对象、正则对象等等）。
	$.isArray() 判断某个参数是否为数组。
	$.isEmptyObject() 判断某个对象是否为空（不含有任何属性）。
	$.isFunction() 判断某个参数是否为函数。
	$.isPlainObject() 判断某个参数是否为用"{}"或"new Object"建立的对象。
	$.support() 判断浏览器是否支持某个特性。

###八、事件操作
jQuery设计思想之七，就是把事件直接绑定在网页元素之上。

	$('p').click(function(){
		alert('Hello');
	});

目前，jQuery主要支持以下事件：

	.blur() 表单元素失去焦点。
	.change() 表单元素的值发生变化
	.click() 鼠标单击
	.dblclick() 鼠标双击
	.focus() 表单元素获得焦点
	.focusin() 子元素获得焦点
	.focusout() 子元素失去焦点
	.hover() 同时为mouseenter和mouseleave事件指定处理函数
	.keydown() 按下键盘（长时间按键，只返回一个事件）
	.keypress() 按下键盘（长时间按键，将返回多个事件）
	.keyup() 松开键盘
	.load() 元素加载完毕
	.mousedown() 按下鼠标
	.mouseenter() 鼠标进入（进入子元素不触发）
	.mouseleave() 鼠标离开（离开子元素不触发）
	.mousemove() 鼠标在元素内部移动
	.mouseout() 鼠标离开（离开子元素也触发）
	.mouseover() 鼠标进入（进入子元素也触发）
	.mouseup() 松开鼠标
	.ready() DOM加载完成
	.resize() 浏览器窗口的大小发生改变
	.scroll() 滚动条的位置发生变化
	.select() 用户选中文本框中的内容
	.submit() 用户递交表单
	.toggle() 根据鼠标点击的次数，依次运行多个函数
	.unload() 用户离开页面
	
以上这些事件在jQuery内部，都是.bind()的便捷方式。使用.bind()可以更灵活地控制事件，比如为多个事件绑定同一个函数：

	$('input').bind(
		'click change', //同时绑定click和change事件
		function() {
			alert('Hello');
		}
	);
	
有时，你只想让事件运行一次，这时可以使用.one()方法。

	$("p").one("click", function() {
		alert("Hello"); //只运行一次，以后的点击不会运行
	});	

.unbind()用来解除事件绑定。

	$('p').unbind('click');

所有的事件处理函数，都可以接受一个事件对象（event object）作为参数，比如下面例子中的e：
	
	$("p").click(function(e) {
		alert(e.type); // "click"
	});
	
这个事件对象有一些很有用的属性和方法：

	event.pageX 事件发生时，鼠标距离网页左上角的水平距离
	event.pageY 事件发生时，鼠标距离网页左上角的垂直距离
	event.type 事件的类型（比如click）
	event.which 按下了哪一个键
	event.data 在事件对象上绑定数据，然后传入事件处理函数
	event.target 事件针对的网页元素
	event.preventDefault() 阻止事件的默认行为（比如点击链接，会自动打开新页面）
	event.stopPropagation() 停止事件向上层元素冒泡

在事件处理函数中，可以用this关键字，返回事件针对的DOM元素：

	$('a').click(function(e) {
		if ($(this).attr('href').match('evil')) { //如果确认为有害链接
			e.preventDefault(); //阻止打开
			$(this).addClass('evil'); //加上表示有害的class
		}
	});

有两种方法，可以自动触发一个事件。一种是直接使用事件函数，另一种是使用.trigger()或.triggerHandler()。
	
	$('a').click();
	$('a').trigger('click');
	
###九、特殊效果
最后，jQuery允许对象呈现某些特殊效果。

	$('h1').show(); //展现一个h1标题

常用的特殊效果如下：

	.fadeIn() 淡入
	.fadeOut() 淡出
	.fadeTo() 调整透明度
	.hide() 隐藏元素
	.show() 显示元素
	.slideDown() 向下展开
	.slideUp() 向上卷起
	.slideToggle() 依次展开或卷起某个元素
	.toggle() 依次展示或隐藏某个元素

除了.show()和.hide()，所有其他特效的默认执行时间都是400ms（毫秒），但是你可以改变这个设置。

	$('h1').fadeIn(300); // 300毫秒内淡入
	$('h1').fadeOut('slow'); // 缓慢地淡出

在特效结束后，可以指定执行某个函数。

	$('p').fadeOut(300, function() { $(this).remove(); });

更复杂的特效，可以用.animate()自定义。

	$('div').animate(
		{
			left : "+=50", //不断右移
			opacity : 0.25 //指定透明度

		},
		300, // 持续时间
		function() { alert('done!'); } //回调函数
	);

.stop()和.delay()用来停止或延缓特效的执行。   
$.fx.off如果设置为true，则关闭所有网页特效。


##jQuery最佳实践
###1. 使用最新版本的jQuery
新版本会改进性能，还有很多新功能。
###2. 用对选择器
在jQuery中，你可以用多种选择器，选择同一个网页元素。每种选择器的性能是不一样的，你应该了解它们的性能差异。

1. 最快的选择器：id选择器和元素标签选择器
 
	举例来说，下面的语句性能最佳：

		$('#id')
		$('form')
		$('input')

	遇到这些选择器的时候，jQuery内部会自动调用浏览器的原生方法（比如getElementById()），所以它们的执行速度快。

2. 较慢的选择器：class选择器

	$('.className')的性能，取决于不同的浏览器。    
	
	Firefox、Safari、Chrome、Opera浏览器，都有原生方法getElementByClassName()，所以速度并不慢。但是，IE5-IE8都没有部署这个方法，所以这个选择器在IE中会相当慢。

3. 最慢的选择器：伪类选择器和属性选择器

	先来看例子。找出网页中所有的隐藏元素，就要用到伪类选择器：

		$(':hidden')

	属性选择器的例子则是：

		$('[attribute=value]')

	这两种语句是最慢的，因为浏览器没有针对它们的原生方法。但是，一些浏览器的新版本，增加了querySelector()和querySelectorAll()方法，因此会使这类选择器的性能有大幅提高。
	
	最后是不同选择器的性能比较图。
	
	![](./image/jQuery选择器性能对比.png =320x180 "")
	
	可以看到，ID选择器遥遥领先，然后是标签选择器，第三是Class选择器，其他选择器都非常慢。
	
###3. 理解子元素和父元素的关系
下面六个选择器，都是从父元素中选择子元素。你知道哪个速度最快，哪个速度最慢吗？
	
	$('.child', $parent)
	$parent.find('.child')
	$parent.children('.child')
	$('#parent > .child')
	$('#parent .child')
	$('.child', $('#parent'))	

我们一句句来看。

1. $('.child', $parent)

	这条语句的意思是，给定一个DOM对象，然后从中选择一个子元素。jQuery会自动把这条语句转成$.parent.find('child')，这会导致一定的性能损失。它比最快的形式慢了5%-10%。

2. $parent.find('.child')

	这条是最快的语句。.find()方法会调用浏览器的原生方法（getElementById，getElementByName，getElementByTagName等等），所以速度较快。

3. $parent.children('.child')

	这条语句在jQuery内部，会使用$.sibling()和javascript的nextSibling()方法，一个个遍历节点。它比最快的形式大约慢50%。

4. $('#parent > .child')

	jQuery内部使用Sizzle引擎，处理各种选择器。Sizzle引擎的选择顺序是从右到左，所以这条语句是先选.child，然后再一个个过滤出父元素#parent，这导致它比最快的形式大约慢70%。

5. $('#parent .child')

	这条语句与上一条是同样的情况。但是，上一条只选择直接的子元素，这一条可以于选择多级子元素，所以它的速度更慢，大概比最快的形式慢了77%。

6. $('.child', $('#parent'))

	jQuery内部会将这条语句转成$('#parent').find('.child')，比最快的形式慢了23%。

所以，最佳选择是$parent.find('.child')。而且，由于$parent往往在前面的操作已经生成，jQuery会进行缓存，所以进一步加快了执行速度。

###4. 不要过度使用jQuery
jQuery速度再快，也无法与原生的javascript方法相比。所以有原生方法可以使用的场合，尽量避免使用jQuery。

以最简单的选择器为例，document.getElementById("foo")要比$("#foo")快10多倍。

再来看一个例子，为a元素绑定一个处理点击事件的函数：

	$('a').click(function(){
		alert($(this).attr('id'));
	});

这段代码的意思是，点击a元素后，弹出该元素的id属性。为了获取这个属性，必须连续两次调用jQuery，第一次是$(this)，第二次是attr('id')。

事实上，这种处理完全不必要。更正确的写法是，直接采用javascript原生方法，调用this.id：

	$('a').click(function(){
		alert(this.id);
	});

根据测试，this.id的速度比$(this).attr('id')快了20多倍。

###5. 做好缓存
选中某一个网页元素，是开销很大的步骤。所以，使用选择器的次数应该越少越好，并且尽可能缓存选中的结果，便于以后反复使用。

比如，下面这样的写法就是糟糕的写法：

	jQuery('#top').find('p.classA');
	jQuery('#top').find('p.classB');

更好的写法是：

	var cached = jQuery('#top');
	cached.find('p.classA');
	cached.find('p.classB');

根据测试，缓存比不缓存，快了2-3倍。

###6. 使用链式写法
jQuery的一大特点，就是允许使用链式写法。

	$('div').find('h3').eq(2).html('Hello');

采用链式写法时，jQuery自动缓存每一步的结果，因此比非链式写法要快。根据测试，链式写法比（不使用缓存的）非链式写法，大约快了25%。

###7. 事件的委托处理（Event Delegation）

javascript的事件模型，采用"冒泡"模式，也就是说，子元素的事件会逐级向上"冒泡"，成为父元素的事件。

利用这一点，可以大大简化事件的绑定。比如，有一个表格（table元素），里面有100个格子（td元素），现在要求在每个格子上面绑定一个点击事件（click），请问是否需要将下面的命令执行100次？

	$("td").on("click", function(){
		$(this).toggleClass("click");
	});

回答是不需要，我们只要把这个事件绑定在table元素上面就可以了，因为td元素发生点击事件之后，这个事件会"冒泡"到父元素table上面，从而被监听到。

因此，这个事件只需要在父元素绑定1次即可，而不需要在子元素上绑定100次，从而大大提高性能。这就叫事件的"委托处理"，也就是子元素"委托"父元素处理这个事件。

	$("table").on("click", "td", function(){
		$(this).toggleClass("click");
	});

更好的写法，则是把事件绑定在document对象上面。

	$(document).on("click", "td", function(){
		$(this).toggleClass("click");
	});

如果要取消事件的绑定，就使用off()方法。

	$(document).off("click", "td");

###8. 少改动DOM结构

1. 改动DOM结构开销很大，因此不要频繁使用.append()、.insertBefore()和.insetAfter()这样的方法。

	如果要插入多个元素，就先把它们合并，然后再一次性插入。根据测试，合并插入比不合并插入，快了将近10倍。

2. 如果你要对一个DOM元素进行大量处理，应该先用.detach()方法，把这个元素从DOM中取出来，处理完毕以后，再重新插回文档。根据测试，使用.detach()方法比不使用时，快了60%。

3. 如果你要在DOM元素上储存数据，不要写成下面这样：

		var elem = $('#elem');
		elem.data(key,value);

	而要写成

		var elem = $('#elem');
		$.data(elem[0],key,value);

	根据测试，后一种写法要比前一种写法，快了将近10倍。因为elem.data()方法是定义在jQuery函数的prototype对象上面的，而$.data()方法是定义jQuery函数上面的，调用的时候不从复杂的jQuery对象上调用，所以速度快得多。

4. 插入html代码的时候，浏览器原生的innterHTML()方法比jQuery对象的html()更快。

###9. 正确处理循环
循环总是一种比较耗时的操作，如果可以使用复杂的选择器直接选中元素，就不要使用循环，去一个个辨认元素。

javascript原生循环方法for和while，要比jQuery的.each()方法快，应该优先使用原生方法。

###10. 尽量少生成jQuery对象
每当你使用一次选择器（比如$('#id')），就会生成一个jQuery对象。jQuery对象是一个很庞大的对象，带有很多属性和方法，会占用不少资源。所以，尽量少生成jQuery对象。

举例来说，许多jQuery方法都有两个版本，一个是供jQuery对象使用的版本，另一个是供jQuery函数使用的版本。下面两个例子，都是取出一个元素的文本，使用的都是text()方法。

你既可以使用针对jQuery对象的版本：

	var $text = $("#text");
	var $ts = $text.text();

也可以使用针对jQuery函数的版本：

	var $text = $("#text");
	var $ts = $.text($text);

由于后一种针对jQuery函数的版本不通过jQuery对象操作，所以相对开销较小，速度比较快。

###11. 选择作用域链最短的方法
严格地说，这一条原则对所有Javascript编程都适用，而不仅仅针对jQuery。

我们知道，Javascript的变量采用链式作用域。读取变量的时候，先在当前作用域寻找该变量，如果找不到，就前往上一层的作用域寻找该变量。这样的设计，使得读取局部变量比读取全局变量快得多。

请看下面两段代码，第一段代码是读取全局变量：

	var a = 0;
	function x(){
		a += 1;
	}

第二段代码是读取局部变量：

	function y(){
		var a = 0;
		a += 1;
	}

第二段代码读取变量a的时候，不用前往上一层作用域，所以要比第一段代码快五六倍。

同理，在调用对象方法的时候，closure模式要比prototype模式更快。

prototype模式：

	var X = function(name){ this.name = name; }
	X.prototype.get_name = function() { return this.name; };

closure模式：

	var Y = function(name) {
		var y = { name: name };
		return { 'get_name': function() { return y.name; } };
	};

同样是get_name()方法，closure模式更快。

###12. 使用Pub/Sub模式管理事件
当发生某个事件后，如果要连续执行多个操作，最好不要写成下面这样：

	function doSomthing{
		doSomethingElse();
		doOneMoreThing();
	}

而要改用事件触发的形式：

	function doSomething{
		$.trigger("DO_SOMETHING_DONE");
	}
	$(document).on("DO_SOMETHING_DONE", function(){
		doSomethingElse(); 
	});

还可以考虑使用deferred对象。

	function doSomething(){
		var dfd = new $.Deferred();
		//Do something async, then...
		//dfd.resolve();
		return dfd.promise();
	}
	function doSomethingElse(){
		$.when(doSomething()).then(//The next thing);
	}
##CSS选择器
###一、基本选择器

![](./image/基本选择器.png =500x170)

实例：

	* { margin:0; padding:0; }
	p { font-size:2em; }
	.info { background:#ff0; }
	p.info { background:#ff0; }
	p.info.error { color:#900; font-weight:bold; }
	#info { background:#ff0; }
	p#info { background:#ff0; }
	
###二、多元素的组合选择器
![](./image/多元素的组合选择器.png =500x240)	

实例：

	div p { color:#f00; }
	#nav li { display:inline; }
	#nav a { font-weight:bold; }
	div > strong { color:#f00; }
	p + p { color:#f00; }
	
###三、CSS 2.1 属性选择器	
![](./image/CSS 2.1 属性选择器.png =500x250)	

实例：
	
	p[title] { color:#f00; }
	div[class=error] { color:#f00; }
	td[headers~=col1] { color:#f00; }
	p[lang|=en] { color:#f00; }
	blockquote[class=quote][cite] { color:#f00; }
###四、CSS 2.1中的伪类
![](./image/CSS 2.1中的伪类.png =500x270)	

实例：

	p:first-child { font-style:italic; }
	input[type=text]:focus { color:#000; background:#ffe; }
	input[type=text]:focus:hover { background:#fff; }
	q:lang(sv) { quotes: "\201D" "\201D" "\2019" "\2019"; }
	
###五、 CSS 2.1中的伪元素	
![](./image/CSS 2.1中的伪元素.png =500x170)	

实例：

	p:first-line { font-weight:bold; color;#600; }
	.preamble:first-letter { font-size:1.5em; font-weight:bold; }
	.cbb:before { content:""; display:block; height:17px; width:18px; 	background:url(top.png) no-repeat 0 0; margin:0 0 0 -18px; }
	a:link:after { content: " (" attr(href) ") "; }
###六、CSS 3的同级元素通用选择器
![](./image/CSS 3的同级元素通用选择器.png =500x75)	
实例：

	p ~ ul { background:#ff0; }
	
###七、CSS 3 属性选择器
![](./image/CSS 3 属性选择器.png =500x140)	

实例：

	div[id^="nav"] { background:#ff0; }

###八、CSS 3中与用户界面有关的伪类
![](./image/CSS 3中与用户界面有关的伪类.png =500x208)

实例：

	input[type="text"]:disabled { background:#ddd; }
	
###九、CSS 3中的结构性伪类	
![](./image/CSS 3中的结构性伪类.png =500x600)

实例：

	p:nth-child(3) { color:#f00; }
	p:nth-child(odd) { color:#f00; }
	p:nth-child(even) { color:#f00; }
	p:nth-child(3n+0) { color:#f00; }
	p:nth-child(3n) { color:#f00; }
	tr:nth-child(2n+11) { background:#ff0; }
	tr:nth-last-child(2) { background:#ff0; }
	p:last-child { background:#ff0; }
	p:only-child { background:#ff0; }
	p:empty { background:#ff0; }
	
###十、CSS 3的反选伪类
![](./image/CSS 3的反选伪类.png =500x70)

实例：

	:not(p) { border:1px solid #ccc; }
	
###十一、CSS 3中的 :target 伪类
![](./image/CSS 3中的 target 伪类.png =500x70)	
  
请参看HTML DOG上关于该选择器的[详细解释](http://htmldog.com/articles/suckerfish/target/)和[实例](http://htmldog.com/articles/suckerfish/target/example/)。

参考文档：   
jQuery设计思想    
http://www.ruanyifeng.com/blog/2011/07/jquery_fundamentals.html    
jQuery最佳实践：   
http://www.ruanyifeng.com/blog/2011/08/jquery_best_practices.html    
CSS选择器笔记   
http://www.ruanyifeng.com/blog/2009/03/css_selectors.html   
Javascript继承机制的设计思想    
http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html 
http://htmldog.com/articles/suckerfish/target/

<hr>
##HTML5权威指南笔记

###初探HTML
####元素
* 空元素 
	
		<code></code>
* 自闭和元素 

		<code/>
* 虚元素

		<hr>
		
####元素属性
只能在开始标签或单个标签上

* 全局属性,用来配置所有元素共有的行为，可以用在任何一个元素身上。

	* class属性
	* id属性
	* style属性
	* tabindex属性：HTML页面上的键盘焦点可以通过按Tab键在各元素之间切换。tabindex值为1的元素会第一个被选中，设置为-1的不会在用户按下Tab键后被选中。
	* title属性：提供元素的额外信息，浏览器通常用这些东西显示工具提示。
	* accesskey属性：可以设定一个或几个用来选择页面上的元素的快捷键。
		
			<form>
				用户名：<input type="text" name="name" acesskey="n"/>
				密码：<input type="password" name="password" acesskey="p"/>
				<input type="submit" value="登录" acesskey="s"/>
			</form>
			用来触发access机制的按键组合因平台而异，window系统是同时按下alt键和accesskey属性值对应的键。用户按alt+n将键盘焦点移到第一个input元素，在此输入用户名；alt+p输入密码；alt+s提交登录表单。
	* contenteditable属性：HTML5新增属性，让用户能够修改页面上的内容。
		
			<p contenteditable="true">可编辑</p>
			ontenteditable设置为true时用户可以编辑元素内容，设置为false时则禁止编辑。如未设置，那么元素从父元素处继承该属性值。

	* contentmenu属性：为元素设定快捷菜单，这个菜单会在受到触发的时候弹出来。（暂无浏览器支持）
	* dir属性：用来规定元素中文字的方向，有效值ltr和rtl
	* draggable属性：是HTML5支持拖放操作的方式之一，用来表示元素是否可被拖放。
	* dropzone属性：是HTML5支持拖放操作的方式之一，与draggable属性搭配使用。
	* hidden属性：布尔属性，表示相关元素当前无需关注，浏览器对它的处理方式是隐藏相关元素。
	* lang属性：用于说明元素内容使用的语言。值为有效的ISO语言代码。
	* spellcheck属性：有效值true和false,用来表明浏览器是否应该对元素的内容进行拼写检查，该属性只有用在用户可以编辑的元素上才有意义。
	
			<textarea spellcheck="true">this is some mispelled text</textarea>
		
* 专有属性 如：a标签的href属性
* 布尔属性，不需设定值，只添加到元素中即可 如disabled：

		<input disabled>
		它以本来存在而不是用户为其设定的值对元素进行配置
	
* 自定义属性，必须以data-开头

####HTML文档
#####外层结构
HTML文档的外层结构由两个元素确定：DOCTYPE和html

	<!DOCTYPE HTML>
	<html>
		<!-- elements go here -->
	</html>
DOCTYPE元素让浏览器明白其处理的是HTML文档。这是用`布尔属性HTML`表达的。
#####元数据
元数据部分可以用来向浏览器提供文档的一些信息，元数据包含在head元素内部。

	<!DOCTYPE HTML>
	<html>
		<head>
			<!-- metadata goes here -->
			<title>标题</title>
		</head>
	</html>

#####内容
文档内容，放到body元素中

	<!DOCTYPE HTML>
	<html>
		<head>
			<!-- metadata goes here -->
			<title>标题</title>
		</head>
		<body>
			<!-- content and elements go here -->
		</body>
	</html>
#####元素类型
HTML5规范将元素分为三大类：

* 元数据元素（metadata element）
* 流元素（flow element）
* 短语元素（phrasing element）

###初探CSS
元素内嵌样式

		style=""
		
文档内嵌样式

		<style type="text/css">
		</style>
外部样式表

		<link rel="stylesheet" type="text/css" href="styles.css"></link>
		
浏览器显示元素css属性值的次序

1. 元素内嵌样式（用元素的全局属性style定义的样式）
2. 文档内嵌样式（定义在style元素中的样式）
3. 外部样式（用link元素导入的样式）
4. 用户样式（用户定义的样式）
5. 浏览器样式（浏览器应用的默认样式）

继承

子元素会继承父元素的样式，并非所有CSS属性均可继承，与`元素外观`（文字、颜色、字体等）相关的样式会被继承；与元素在页面上的`布局相关`的样式不会继承。   
在样式中使用`inherit`这个特别设立的值可以强行实施继承，明确指示浏览器在该属性上使用父元素样式中的值。

	CSS代码：
	p {
		color: white;
		border: 1px solid black;
	}
	span {
		border: inherit;
	}
	HTML代码：
	<p> I like <span>apples</span> and oranges.</p>
	
css颜色函数	
![css颜色函数](./image/css颜色函数.png =600x150 "")

参考像素是距读者一臂之遥的像素密度为96dpi的设备上一个像素的视角   
1像素视为1英寸的1/96   
用www.selectorgadget.com生成选择器
用less改进css http://lesscss.org
css框架：www.blueprint.org
	
###初探JavaScript
判断对象是否具有某个属性可用`in`表达式
	
	var myObj = {
		name: "名字"
	}
	var hasName = "name" in myObj;
	var hasDate = "date" in myObj;
	console.log(hasName); //true
	console.log(hasDate); //false
	
`==`相等运算符会将操作数转换为同一类型一边判断是否相等。   
JavaScript基本类型的比较是`值`的比较，对象的比较是`引用`的比较。

	//对象的比较是`引用`
	var myObj1 = {
		name: "名字"
	}
	var myObj2 = {
		name: "名字"
	}
	var myObj3 = myObj2;
	
	var isObjEqual12 = myObj1 == myObj2;
	var isObjEqual23 = myObj2 == myObj3;
	console.log(isObjEqual12+" "+isObjEqual23);//false true
	
	var isObjIdentity12 = myObj1 === myObj2;
	var isObjIdentity23 = myObj2 === myObj3;
	console.log(isObjIdentity12+" "+isObjIdentity23);//false true
	
	//基本类型的比较是`值`
	var myData1 = 5;
	var myData2 = "5";
	var myData3 = myData2;
	
	var isDataEqual12 = myData1 == myData2;
	var isDataEqual23 = myData2 == myData3;
	console.log(isDataEqual12+"  "+isDataEqual23);//true true
	
	var isDataIdentity12 = myData1 === myData2;
	var isDataIdentity23 = myData2 === myData3;
	console.log(isDataIdentity12+" "+isDataIdentity23);//false true

显式类型转换：`字符串连接运算符（+）比加法运算符（也是+）优先级更高`。

	var data1 = 5 + 4;
	var data2 = "5" + 4;
	console.log(data1);//9
	console.log(data2);//54
	
将数值转换成字符串

	var data1 = (5).toString() + String(4);
	console.log(data1);//54
	var data2 = (5).toFixed(2);
	console.log(data2);//5.00 字符串
	
将字符串转换成数字

	var str1="5.1";
	var str2="5.1a";
	
	var data11=Number(str1);
	var data12=parseInt(str1);
	var data13=parseFloat(str1);
	document.writeln(data11+" "+data12+" "+data13);//5.1 5 5.1
	
	var data21=Number(str2);
	var data22=parseInt(str2);
	var data23=parseFloat(str2);
	document.writeln(data21+" "+data22+" "+data23);//NaN 5 5.1
	
数组   
创建数组的时候不需要声明数组中的元素的个数，数组会自动调整大小以便容纳所有元素；不必声明数组所含数据的类型，数组可以混合包含各种类型的数据   
常用的数组方法
![常用的数组方法](./image/javascript常用的数组方法.png =800x280 "")

`try...catch...finally`
	
	try{
		......
	} catch (e) {
		console.log("对错误条件的说明："+e.message+" 错误的名称，默认Error:"+e.name+" 错误代号："+e.number);
	} finally {
		//statements here are always executed
	}
	
###创建HTML文档
最基础的HTML5元素：文档元素（创建HTML文档）和元数据元素（说明其内容的元素）   

* DOCTYPE元素：
	
		<!DOCTYPE HTML>
	
	这个元素告诉浏览器两件事：第一，它处理的是HTML文档；第二，用来标记文档内容的HTML所属的版本。
* html元素
	习惯样式：html:focus {outline：none;}
* base元素，设置相对URL的解析基准，让HTML文档中的相对链接在此基础上进行解析。
	
		<!DOCTYPE HTML>
		<html>
			<head>
				<title>base元素</title>
				<base href="http://www.jizhun.com" target="_blank"/>
			</head>
			<body>
				<a href="/page.html">在新窗口打开www.jizhun.com/page.html</a>
			</body>
		</html>
		
* meta元素

		<!DOCTYPE HTML>
		<html>
			<head>
				<title>常用的meta元素</title>
				<meta name="author" content="作者名"/>
				<meta name="description" content="当前页面说明"/>
				<meta name="keywords" content="一批以逗号分开的字符串，用来描述页面内容"/>
				<!-- HTML5 声明HTML页面所用字符编码 -->
				<meta chartset="utf-8"/>
				<!-- HTML4 声明HTML页面所用字符编码 -->
				<!-- <meta http-equiv="content-type" content="text/html charset=UTF-8"/> -->
				<!-- 让浏览器每隔5秒就再次载入页面 -->
				<meta http-equiv="refresh" content="5"/>
				<!-- 让浏览器每隔5秒后载入www.apress.com -->
				<!-- <meta http-equiv="refresh" content="5;http://www.apress.com"/> -->
			</head>
			<body>
				<!-- 文档内容 -->
			</body>
		</html>
	
* style元素
		
		<!DOCTYPE HTML>
		<html>
			<head>
				<title>常用的meta元素</title>
				<!-- style的media属性的常用值：all|screen|print|tv等-->
				<!-- style的media属性的特性：使用AND|OR|NOT来组合设备和特性条件-->
				<style media="screen AND (max-width:500px)" type="text/css">
					//......
				</style>
				<style media="screen AND (min-width:500px)" type="text/css">
					//......
				</style>
			</head>
			<body>
				<!-- 文档内容 -->
			</body>
		</html>
* link元素

		<!DOCTYPE HTML>
		<html>
			<head>
				<title>常用的meta元素</title>
				<link rel="stylesheet" type="text/css" href="styles.css"/>
				<!-- prefetch 预先获取资源 好像只有火狐浏览器支持-->
				<link rel="prefetch" href="page.html"/>
			</head>
			<body>
				<!-- 文档内容 -->
			</body>
		</html>
* script元素   
		必须使用开始标签和结束标签，不能使用自闭和标签。    
		属性：type、src、defer、async、charset    
		默认情况下，浏览器一遇到script元素就会暂停处理HTML文档，转而载入脚本文件并执行其中的脚本。在脚本执行完毕之后浏览器才会继续解析HTML。    
		defer属性：浏览器遇到HTML5中带有defer属性的script元素时，会将脚本的加载和执行推迟到HTML文档中所有元素都得到解析之后。   
		async属性：使用了async属性后，浏览器将在继续解析HTML文档中其他元素（包括其他script元素）的同时异步加载和执行脚本。使用async属性的一个重要后果是页面中的脚本可能不能按定义它们的次序执行，因此如果脚本使用了其他脚本中定义的函数或值，则不宜使用async属性。
		
###标记文字
HTML5规范明确指出：使用元素应该完全从元素的语义出发。
		
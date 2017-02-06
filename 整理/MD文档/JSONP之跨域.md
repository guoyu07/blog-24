##JSONP(JSON with Padding,填充式JSON)   
JSONP的格式是把标准JSON文件稍加包装在一对圆括号中，圆括号又前置一个任意字符串。这个字符串即所谓的P(Padding,填充)，由请求数据的客户端来决定。而且由于有一对圆括号，因此返回的数据在客户端可能会导致一次函数调用，或者是为某个变量赋值，取决于客户端请求中发送的填充字符串。   
  
###jsonp原理：
使用\<script>标签从远程获取Javascript文件的思路，可以通过从其他服务器取得json文件，不过这需要对服务器上的json文件修改。jsonp提供的url（即动态生成的script标签的src），无论看上去是什么形式，最终生成返回的都是一段js代码。   
在js中，我们直接用XMLHttpRequest请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的js脚本文件却是可以的，jsonp正是利用这个特性来实现的。

  	<script>
  		function doSomething(){
  			//处理获取的json数据
  		}
  	</script>
	<script src='http://localhost:8080/ky?callback=doSomething'></script>	
或

	<script type="text/javascript">
    	function jsonpcallback(json) {
        	console.log(json);
    	}
    	var s = document.createElement('script')
    	s.src = 'http://localhost:8080/ky?callback=jsonpcallback';
    	document.body.appendChild(s);
	</script>
注：上面代码所在页面的访问地址为：http://localhost:63342/JSONP/index.html

通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的。
  

		
	
###JQuery对JSONP的封装
1. ajax方法：   
	**客户端**
	  
		$.ajax({
    		url: 'http://localhost:8080/ky',
    		dataType: 'jsonp',
    		jsonpCallback: 'callBack',
    		success: function (data){
      			console.log(data);
    		}
  		});
  	**服务器端**   
  		
  		callBack({
  			"name": "jsonp学习",
  			"desc": "服务器端返回数据格式"
		});
	说明：该方法中写死了callback函数名(即callBack)。
2. getJSON方法：
	
		$.getJSON('http://localhost:8080/ky?callback=?', function(data){  
  			console.log(data);  
		});	   
	说明：
	- 该方法url上必须带上callback=?
	- jquery会自动生成一个全局函数来替换callback=?中的问号，之后获取到数据后又会自动销毁，实际上就是起一个临时代理函数的作用。$.getJSON方法会自动判断是否跨域，不跨域的话，就调用普通的ajax方法；跨域的话，则会以异步加载js文件的形式来调用jsonp的回调函数。
	- 因为jQuery对该方法进行封装的时候并没有默认回调函数变量名为callback。对于jQuery中的jsonp来说，callback参数是自动添加的。默认情况下，jQuery生成的jsonp请求中callback参数是形如callback=jQuery200023559735575690866_1434954892929这种看似随机的名字，对应的就是success那个处理函数，所以一般不用特意处理。
3. get方法：

		$.get('http://localhost:8080/ky', function(data){  
  			console.log(data);
		}, 'jsonp');
	说明：该方法不需要指定callback函数名。getJSON方式实际上就是调用的get方法。
4. jQuery JSONP相关源码片段

   		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
		jQuery.each( [ "get", "post" ], function( i, method ) {
			jQuery[ method ] = function( url, data, callback, type ) {
				// shift arguments if data argument was omitted
				if ( jQuery.isFunction( data ) ) {
					type = type || callback;
					callback = data;
					data = undefined;
				}
				return jQuery.ajax({
					url: url,
					type: method,
					dataType: type,
					data: data,
					success: callback
				});
			};
		});
		
###跨域
`只要协议、域名、端口有任何一个不同，都被当作是不同的域`   
常用的跨域方法：

1. #####jsonp(如上所示)
- #####通过修改document.domain来跨子域  
	场景：  
	有一个页面，它的地址是http://www.example.com/a.html，在这个页面里面有一个iframe，它的src是http://example.com/b.html，很显然，这个页面与它里面的iframe框架是不同域的，所以我们是无法通过在页面中书写js代码来获取iframe中的东西的。  
	 
	页面http://www.example.com/a.html中的代码如下：
	
		<script>
			function onLoad(){
				var iframe=document.getElementById('iframe');
				//这里能获取到iframe里的window对象，但该对象的属性和方法几乎不可用。
				var win=iframe.contentWindow;
				//获取不到iframe里的document对象
				var doc=win.document;
				//获取不到window对象的name属性
				var name=win.name;
			}
		</script>
		<iframe id="iframe" src="http://example.com/b.html" onload="onLoad()"></iframe>
	解决方案：   
	- 只要把http://www.example.com/a.html和http://example.com/b.html这两个页面的document.domain都设成相同的域名就可以了。
	- 但要注意的是，document.domain的设置是有限制的，我们只能把document.domain设置成自身或更高一级的父域，且主域必须相同。
	- 例如：a.b.example.com 中某个文档的document.domain可以设成a.b.example.com、b.example.com 、example.com中的任意一个，但是不可以设成 c.a.b.example.com,因为这是当前域的子域，也不可以设成baidu.com,因为主域已经不相同了。
	
	页面http://www.example.com/a.html中的代码片段如下：
	
		<script>
			//⭐️设置成主域
			document.domain='example.com';
			function onLoad(){
				var iframe=document.getElementById('iframe');
				var win=iframe.contentWindow;
				var doc=win.document;
				var name=win.name;
			}
		</script>
		<iframe id="iframe" src="http://example.com/b.html" onload="onLoad()"></iframe>
	页面http://example.com/b.html中的代码片段如下：
	
		<script>
			//⭐️在iframe载入的这个页面也设置document.domain，使之与主页面的document.domain相同
			document.domain='example.com';
		</script>
	说明：  
	不过如果你想在http://www.example.com/a.html 页面中通过ajax直接请求http://example.com/b.html 页面，即使你设置了相同的document.domain也还是不行的，所以修改document.domain的方法只适用于不同子域的框架间的交互。如果你想通过ajax的方法去与不同子域的页面交互，除了使用jsonp的方法外，还可以用一个隐藏的iframe来做一个代理。原理就是让这个iframe载入一个与你想要通过ajax获取数据的目标页面处在相同的域的页面，所以这个iframe中的页面是可以正常使用ajax去获取你要的数据的，然后就是通过我们刚刚讲得修改document.domain的方法，让我们能通过js完全控制这个iframe，这样我们就可以让iframe去发送ajax请求，然后收到的数据我们也可以获得了。
	
- #####使用window.name来进行跨域
window对象有个name属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。
 
	例如：  
	页面a.html中的代码片段如下

		<script>
			//⭐️设置window.name的值
			window.name="我是页面a设置的值";
			//3秒后把一个新页面b.html载入到当前的window
			setTimeout(function(){
				window.location='b.html';
			},3000);
		</script>
	页面b.html中的代码片段如下
	
		<script>
			//⭐️读取window.name的值
			alert(window.name)
		</script>
		
	页面效果：  
		a.html页面载入后3秒，跳转到了b.html页面，弹出`我是页面a设置的值`。  
	说明：  
	- b.html页面上成功获取到了它的上一个页面a.html给window.name设置的值。
	- 如果在之后所有载入的页面都没对window.name进行修改的话，那么所有这些页面获取到的window.name的值都是a.html页面设置的那个值。
	- 当然，如果有需要，其中的任何一个页面都可以对window.name的值进行修改。
	- 注意，window.name的值只能是字符串的形式，这个字符串的大小最大能允许2M左右甚至更大的一个容量，具体取决于不同的浏览器，但一般是够用了。
	
	场景：  
	有一个www.example.com/a.html页面,需要通过a.html页面里的js来获取另一个位于不同域上的页面www.exampleother.com/b.html里的数据。  
	页面b.html的代码片段如下：
	
		<script>
			window.name=“我就是a.html想要的数据，所有可以转化成字符串来传递的数据都可以在这里使用，如果json数据”；
		</script>
	页面a.html的代码片段如下：
	
		<script>
			//iframe载入b.html页面后会执行的函数
			function getBData(){
				var iframe=document.getElementById("proxy");
				//这个时候a.html与iframe已经是出于同一源了，可以相互访问
				iframe.onload=function(){
					//获取iframe里的window.name,也就是b.html页面给它设置的数据
					var bData=iframe.contentWindow.name;
					alert(bData);
				}
				//这里的c.html为随便一个页面，只要与a.html同一源就行了，目的是让a.html能访问到iframe里的东西，设置成about:blank也行。
				iframe.src="c.html";
			}
		</script>
		<iframe id="proxy" src="www.exampleother.com/b.html" style="display:none" onload="getBData()"></iframe>
	原理：   
	- 在a.html页面中使用一个隐藏的iframe来充当一个中间人角色，由iframe去获取b.html的数据，然后a.html再去得到iframe获取到的数据。
	- 充当中间人的iframe想要获取到b.html的通过window.name设置的数据，只需要把这个iframe的src设为www.exampleother.com/b.html就行了。
	- 然后a.html想要得到iframe所获取到的数据，也就是想要得到iframe的window.name的值，还必须把这个iframe的src设成跟a.html页面同一个域才行，不然根据前面讲的同源策略，a.html是不能访问到iframe里的window.name属性的。这就是整个跨域过程。
	
- #####使用HTML5中新引进的window.postMessage方法来跨域传送数据
	- window.postMessage(message,targetOrigin)  方法是html5新引进的特性，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源。
	- 调用postMessage方法的window对象是指要发送消息的那一个window对象，该方法的第一个参数message为要发送的消息，类型只能为字符串；第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符*
	- 需要接收消息的window对象，可是通过监听自身的message事件来获取传过来的消息，消息内容储存在该事件对象的data属性中。 	  	
	页面a.html的代码片段如下：
	
		<script>
			function onLoad(){
				var iframe=document.getElementById("iframe");
				var win=iframe.contentWindow;//获取window对象
				//⭐️向不同域的www.example.com/b.html页面发送消息
				win.postMessage("我是来自a页面的消息");
			}
		</script>
		<iframe id="iframe" src="www.example.com/b.html" onload="onLoad()"></iframe>
	页面b.html的代码片段如下：
	
		<script>
			//⭐️注册message事件用来接收消息
			window.onmessage=function(e){
				e=e || event;//获取事件对象
				alert(e.data);//⭐️通过data属性得到传递的消息
			}
		</script>
	运行a页面后的效果：页面弹出`我是来自a页面的消息`
	
	

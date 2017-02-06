##Magic PNG&canvas
用 canvas 配合 PNG 可以做出什么好玩的东西呢？   

运用 canvas 来做动态 favicon 和用 PNG 来打包字符串（js) 然后前端通过 js 对这个图片解码。

###一、动态 favicon
有没有想过通过js来动态改变favicon？比如在favicon上显示未读邮件数。  
 
[这个chrome插件](https://chrome.google.com/extensions/detail/aalmkimdkgiaeddiiffmpmhjanihggde?hl=zh-cn)实现了在主流WEB应用的favicon中显示未读数。

那么是怎么实现的呢？

####在 favicon 上显示当前日期

DEMO

	(function () {
		window.onload =  function(){
			log('window.onload '+((new Date)-0)+'\n');
		}
		var canvas = document.createElement('canvas'),
			ctx,
			eventLog = document.getElementById('event-log');
			img = document.createElement('img'),
			link = document.createElement('link'),
			day = (new Date).getDate() + '';
			
			link.rel = "shortcut icon";
			link.type = "image/png";
			
		if (canvas.getContext) {
			canvas.height = canvas.width = 16; // set the size
			ctx = canvas.getContext('2d');
			img.onload = function () { // once the image has loaded
				ctx.drawImage(this, 0, 0);
				ctx.font = 'bold 10px "helvetica", sans-serif';
				ctx.fillStyle = '#F0EEDD';
				if (day.length == 1) day = '0' + day;
				ctx.fillText(day, 2, 12);
				link.href = canvas.toDataURL('image/png');
				document.getElementsByTagName('head')[0].appendChild(link);
				log('change the favicon '+((new Date)-0)+' \n');
			};
			img.src = './img/favicon.png';
		}
		function log(o){
			eventLog.value +=o;
		}
	})();
  
IE系全部不支持    
chrome, firefox, opera 支持    
WIN版safari:如果页面的 onload 事件发生的比更改favicon晚一会儿，则起效。    
DEMO for safari on windows

	<script class="pre">
		(function () {
			window.onload =  function(){
				log('window.onload '+((new Date)-0)+'\n');
			}
			var canvas = document.createElement('canvas'),
				ctx,
				eventLog = document.getElementById('event-log');
    			img = document.createElement('img'),
    			link = document.createElement('link'),
				day = (new Date).getDate() + '';
				
				link.rel = "shortcut icon";
				link.type = "image/png";
				
			if (canvas.getContext) {
				canvas.height = canvas.width = 16; // set the size
				ctx = canvas.getContext('2d');
				img.onload = function () { // once the image has loaded
					ctx.drawImage(this, 0, 0);
					ctx.font = 'bold 10px "helvetica", sans-serif';
					ctx.fillStyle = '#F0EEDD';
					if (day.length == 1) day = '0' + day;
					ctx.fillText(day, 2, 12);
					link.href = canvas.toDataURL('image/png');
					document.getElementsByTagName('head')[0].appendChild(link);
					log('change the favicon '+((new Date)-0)+' \n');
				};
				img.src = './img/favicon.png';
			}
			function log(o){
				eventLog.value +=o;
			}
		})();	
	</script>

via [remy sharp's b:log](https://remysharp.com/2010/08/24/dynamic-favicons)


####在 favicon 上显示任意字符
DEMO

	<script class="pre">
		var img = new Image();
		img.src="./img/favicon.png";
		window.addEventListener('DOMContentLoaded',function(){
			var favtext = document.getElementById('favtext'),
				text = document.getElementById('text');
			favtext.addEventListener('submit',function(e){
				changeIcon(text.value);
				e.preventDefault();
			},false);
		},false);
		
		function changeIcon(text){
			var canvas = document.createElement('canvas'),
    			ctx,
				link = document.createElement('link');
			link.rel = "shortcut icon";
			link.type = "image/png";
			if (canvas.getContext) {
				canvas.height = canvas.width = 16; // set the size
				ctx = canvas.getContext('2d');
				
				ctx.drawImage(img, 0, 0);
				ctx.font = 'bold 10px "helvetica", sans-serif';
				ctx.fillStyle = '#F0EEDD';
				ctx.fillText(text, 2, 12);
				link.href = canvas.toDataURL('image/png');
				document.getElementsByTagName('head')[0].appendChild(link);
			}
		}
	</script>
	
chrome, opera, firefox中可用

####在 favicon 上玩游戏
[DEFENDER](http://www.p01.org/DEFENDER_of_the_favicon/)

老外真是疯狂 :)    玩此游戏时，如果你的电脑和我的一样破，你会听到风扇的呼呼声

###二、用PNG图片来打包 js 文件
能不能把字符串信息写入PNG图片，然后前端获取图片后，对图片进行解码呢？

PNG图片特性   

* Lossless data compression(very important!)   
* 主流浏览器都兼容它   
* 主流编程语言图形库的支持   
* 常用[PNG8 和 PNG24](http://www.libpng.org/pub/png/pngfaq.html#png8-png24) 两种模式   
* Read More  [WIKI](https://en.wikipedia.org/wiki/Portable_Network_Graphics#Filter_optimization)    [PNG Home Site](http://www.libpng.org/pub/png/)  

从PNG图片里能获得到什么样的数据呢？

又轮到 canvas 发威了！

让我们看看[context.getImageData()](https://html.spec.whatwg.org/multipage/scripting.html#dom-context-2d-getimagedata) 这个函数能返回给我们什么吧

	<script class="pre">
		var o = new Image();
		o.onload = function() {
			var c = document.createElement("canvas");
			var t = c.getContext("2d");
			var w = o.width;
			var h = o.height;
			c.width = w;
			c.style.width = w;
			c.height = h;
			c.style.height = h;
			t.drawImage(o, 0, 0);
			var b = t.getImageData( 0, 0, w, h ).data;
			console.dir(b);
		}
		o.onerror = function(){
			callback('ERROR');
		}
		o.src = "./img/black_24.png";
	</script>

另外不要忘记 js 有个 [fromCharCode()](http://www.w3school.com.cn/jsref/jsref_fromCharCode.asp) 方法。   
使用方法 String.fromCharCode(num,num,num...) 。
根据unicode编码返回字符串   
字符串打包进PNG   
我们有办法获取到图片每个像素的 RGBA 值，而且每个值都是不大于256的数字。   
我们又有办法根据一个数字返回unicode中它对应的字符。   
现在你知道该怎么把字符串打包进PNG了吗？  
这个用PHP实现的较简单方法 
  
	header("Content-type: image/png");
	$path=$_GET['path'];
	if($path){
		encode_file($path);
	}
	function encode_file($path){
		$data = file_get_contents($path);
		$size = strlen($data);
		#
		# the simplest method is to store the bytes as they are in ascii.
		# this is the least space-efficient.
		#
		$bytes = array();
		for ($i=0; $i<strlen($data); $i++){
			$bytes[] = ord(substr($data, $i, 1)); 
			# @mdthod ord || int ord ( string $string ) 
			# Returns the ASCII value of the first character of string . 
		}
		encode_bytes($bytes);
	}
				
又到看 DEMO 的时间了。

	<script class="pre">
		//
		// General unpacking functions.
		//
		// png_to_string() is the wrapper - it takes a src image,
		// loads it and then calls the unpacker function with an
		// array of the pixels in the image (an ImageData object)
		// really. The unpacker function then turns this into a
		// string which gets passed to the callback.
		//
		function png_to_string(src, unpacker, decoder, callback){
			var o = new Image();
			o.onload = function() {
				var c = document.createElement("canvas");
				var t = c.getContext("2d");
				var w = o.width;
				var h = o.height;
				c.width = w;
				c.style.width = w;
				c.height = h;
				c.style.height = h;
				t.drawImage(o, 0, 0);
				var b = t.getImageData( 0, 0, w, h ).data;
				callback(decoder(unpacker(b)));
			}
			o.onerror = function(){
				callback('ERROR');
			}
			o.src = src+'&t='+(new Date().getTime());
			document.body.appendChild(o);
		}
		//
		// unpackers take image pixels and turn them into an array of bytes.
		// those bytes will get passed to a decoder to turn them into a string.
		//
		function unpack_rgb(b){
			var s = [];
			for (var i=0; i < b.length; i+=4){
				if (b[i+0] > 0) s.push(b[i+0]);
				if (b[i+1] > 0) s.push(b[i+1]);
				if (b[i+2] > 0) s.push(b[i+2]);
			}
			return s;
		}
		function decode_ascii(b){
			var s = "";
			for (var i=0; i<b.length; i++){
				if (b[i]) s += String.fromCharCode(b[i]);
			}
			return s;
		}
		png_to_string('./packstream.php?path=test.js',unpack_rgb,decode_ascii,function(s){
			console.log(s);
			eval(s)
		});
	</script>

这种方式显然不支持编码中文，因为中文在unicode中编码有两个字节长，但是肯定有实现方式，有兴趣的话，你来实现吧 :)

下面是我们的 fdev.js 按照此方式编码后的图。

	<img src="./packstream.php?path=http://style.china.alibaba.com/js/lib/fdev-v3/core/fdev-min.js" alt="fdev" />
			
这个方法有什么用处呢？   
因为浏览器加载外域的图片并没有限制，那我们能不能通过这个做跨域异步请求呢？   
是不是开始期待我来 show 一下用图片做跨域了？    
可是我要说：我无法做到   
读取图片数据也有浏览器安全策略限制，来看 DEMO

	<script class="pre">
		//
		// General unpacking functions.
		//
		// png_to_string() is the wrapper - it takes a src image,
		// loads it and then calls the unpacker function with an
		// array of the pixels in the image (an ImageData object)
		// really. The unpacker function then turns this into a
		// string which gets passed to the callback.
		//
		function png_to_string(src, unpacker, decoder, callback){
			var o = new Image();
			o.onload = function() {
				var c = document.createElement("canvas");
				var t = c.getContext("2d");
				var w = o.width;
				var h = o.height;
				c.width = w;
				c.style.width = w;
				c.height = h;
				c.style.height = h;
				t.drawImage(o, 0, 0);
				try{
					var b = t.getImageData( 0, 0, w, h ).data;
					callback(decoder(unpacker(b)));
				}catch(e){
					console.log('error1:'+e);
				}
				try{
					var uri = c.toDataURL('image/png');
				}catch(e){
					console.log('error2:'+e);
				}
			}
			o.onerror = function(){
				callback('ERROR');
			}
			o.src = src+'&t='+(new Date().getTime());
			document.body.appendChild(o);
		}
		//
		// unpackers take image pixels and turn them into an array of bytes.
		// those bytes will get passed to a decoder to turn them into a string.
		//
		function unpack_rgb(b){
			var s = [];
			for (var i=0; i < b.length; i+=4){
				if (b[i+0] > 0) s.push(b[i+0]);
				if (b[i+1] > 0) s.push(b[i+1]);
				if (b[i+2] > 0) s.push(b[i+2]);
			}
			return s;
		}
		function decode_ascii(b){
			var s = "";
			for (var i=0; i<b.length; i++){
				if (b[i]) s += String.fromCharCode(b[i]);
			}
			return s;
		}
		png_to_string('http://lab.allenm.me/packstream.php?path=test.js',unpack_rgb,decode_ascii,function(s){
			console.log(s);
			eval(s)
		});
		
	</script>

想了解更多把字符串打包进PNG图片的方法   
请关注：[PNGStore](https://github.com/iamcal/PNGStore)

参考文档：   
http://share.allenm.me/fd/#slide1






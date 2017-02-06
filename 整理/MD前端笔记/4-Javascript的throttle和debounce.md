#javascript: throttle和debounce
##throttle
throttle就是函数节流的意思。再说的通俗一点就是函数调用的频度控制器，是连续执行时间间隔控制。   
throttle形像的比喻是水龙头或机枪，你可以控制它的流量或频率。   
`throttle 的关注点是连续的执行间隔时间。`   
主要应用的场景比如：

* 鼠标移动，mousemove 事件
* DOM 元素动态定位，window对象的 resize 和 scroll 事件

函数接口

	/**
	* 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
	* @param delay  {number}    延迟时间，单位毫秒
	* @param action {function}  请求关联函数，实际应用需要调用的函数
	* @param tail?  {bool}      是否在尾部用定时器补齐调用
	* @return {function}	返回客户调用函数
	*/
	throttle(delay,action,tail?)

样例代码

	// ajaxQuery 将在停止输入 250 毫秒后执行
	$('#autocomplete').addEventListener('keyup',debounce(250,function() {
	    ajaxQuery(this.value,renderUI);
	},true))
	// 当窗口大小改变时，以 50 毫秒一次的频率为单位执行定位函数 position
	window.addEventListener('resize',throttle(50,position,true) );


##debounce
debounce是空闲时间必须大于或等于 一定值的时候，才会执行调用方法。    
形像的比喻是橡皮球。如果手指按住橡皮球不放，它就一直受力，不能反弹起来，直到松手。     
`debounce 的关注点是空闲的间隔时间。`   
debounce主要应用的场景比如：

* 文本输入keydown 事件，keyup 事件，例如做autocomplete

函数接口

	/**
	* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
	* @param idle   {number}    空闲时间，单位毫秒
	* @param action {function}  请求关联函数，实际应用需要调用的函数
	* @param tail?  {bool}      是否在尾部执行
	* @return {function}	返回客户调用函数
	*/
	debounce(idle,action,tail?)
	
样例代码

	// ajaxQuery 将在停止输入 250 毫秒后执行
	$('#autocomplete').addEventListener('keyup',debounce(250,function() {
	    ajaxQuery(this.value,renderUI);
	},true))
	
##throttle和debounce控制函数

    /*
    * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
    * @param fn {function}  需要调用的函数
    * @param delay  {number}    延迟时间，单位毫秒
    * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
    * @return {function}实际调用函数
    */
    var throttle = function (fn,delay, immediate, debounce) {
       var curr = +new Date(),//当前事件
           last_call = 0,
           last_exec = 0,
           timer = null,
           diff, //时间差
           context,//上下文
           args,
           exec = function () {
               last_exec = curr;
               fn.apply(context, args);
           };
       return function () {
           curr= +new Date();
           context = this,
           args = arguments,
           diff = curr - (debounce ? last_call : last_exec) - delay;
           clearTimeout(timer);
           if (debounce) {
               if (immediate) {
                   timer = setTimeout(exec, delay);
               } else if (diff >= 0) {
                   exec();
               }
           } else {
               if (diff >= 0) {
                   exec();
               } else if (immediate) {
                   timer = setTimeout(exec, -diff);
               }
           }
           last_call = curr;
       }
    };
     
    /*
    * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
    * @param fn {function}  要调用的函数
    * @param delay   {number}    空闲时间
    * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
    * @return {function}实际调用函数
    */
     
    var debounce = function (fn, delay, immediate) {
       return throttle(fn, delay, immediate, true);
    };

##jQuery throttle    
###Window resize

	$(function(){
		var counter_1 = 0,
			counter_2 = 0
			last_time_1 = +new Date(),
			last_time_2 = +new Date();
			
		// This function is not throttled, but instead bound directly to the event.
		function resize_1() {
			var now = +new Date(),
				html = 'resize handler executed: ' + counter_1++ + ' times'+ ' (' + ( now - last_time_1 ) + 'ms since previous execution)'+ '<br/>window dimensions: ' + $(window).width() + 'x' + $(window).height();
				
			last_time_1 = now;
			
			$('#text-resize-1').html( html );
		};
		
		// This function is throttled, and the new, throttled, function is bound to
		// the event. Note that in jQuery 1.4+ a reference to either the original or
		// throttled function can be passed to .unbind to unbind the function.
		function resize_2() {
			var now = +new Date(),
				html = 'throttled resize handler executed: ' + counter_2++ + ' times' + ' (' + ( now - last_time_2 ) + 'ms since previous execution)' + '<br/>window dimensions: ' + $(window).width() + 'x' + $(window).height();
				
			last_time_2 = now;
			
			$('#text-resize-2').html( html );
		};
		
		// Bind the not-at-all throttled handler to the resize event.
		$(window).resize( resize_1 );
		
		// Bind the throttled handler to the resize event.
		$(window).resize( $.throttle( 250, resize_2 ) ); // This is the line you want!
	});
	
###Window scroll

	$(function(){
		var counter_1 = 0,
			counter_2 = 0
			last_time_1 = +new Date(),
			last_time_2 = +new Date();
			
		// This function is not throttled, but instead bound directly to the event.
		function scroll_1() {
			var now = +new Date(),
				html = 'scroll handler executed: ' + counter_1++ + ' times' + ' (' + ( now - last_time_1 ) + 'ms since previous execution)' + '<br/>window scrollLeft: ' + $(window).scrollLeft() + ', scrollTop: ' +(window).scrollTop();
				
			last_time_1 = now;
			$('#text-scroll-1').html( html );
		};
		
		// This function is throttled, and the new, throttled, function is bound to
		// the event. Note that in jQuery 1.4+ a reference to either the original or
		// throttled function can be passed to .unbind to unbind the function.
		function scroll_2() {
			var now = +new Date(),
				html = 'throttled scroll handler executed: ' + counter_2++ + ' times' + ' (' + ( now - last_time_2 ) + 'ms since previous execution)' + '<br/>window scrollLeft: ' + $(window).scrollLeft() + ', scrollTop: ' + $(window).scrollTop();
				
			last_time_2 = now;
			$('#text-scroll-2').html( html );
		};
		
		// Bind the not-at-all throttled handler to the scroll event.
		$(window).scroll( scroll_1 );
		
		// Bind the throttled handler to the scroll event.
		$(window).scroll( $.throttle( 250, scroll_2 ) ); // This is the line you want!
	});

##jQuery debounce
###autocomplete

	$(function(){
		var default_text = $('#text-type').text(),
			text_counter_1 = 0,
			text_counter_2 = 0;
		// This function is not debounced, but instead bound directly to the event.
		function text_1() {
			var val = $(this).val(),
				html = 'Not-debounced AJAX request executed: ' + text_counter_1++ + ' times.' + ( val ? ' Text: ' + val : '' );
			
			$('#text-type-1').html( html );
		};
		
		// This function is debounced, and the new, debounced, function is bound to
		// the event. Note that in jQuery 1.4+ a reference to either the original or
		// debounced function can be passed to .unbind to unbind the function.
		function text_2() {
			var val = $(this).val(),
				html = 'Debounced AJAX request executed: ' + text_counter_2++ + ' times.' + ( val ? ' Text: ' + val : '' );
				
			$('#text-type-2').html( html );
		};
		
		// Bind the not-at-all debounced handler to the keyup event.
		$('input.text').keyup( text_1 );
		
		// Bind the debounced handler to the keyup event.
		$('input.text').keyup( $.debounce( 250, text_2 ) ); // This is the line you want!
		
		// Trigger the callbacks once to show some initial (zero) values.
		text_1();
		text_2();
	});


<br>
参考文档：   
http://benalman.com/code/projects/jquery-throttle-debounce/docs/files/jquery-ba-throttle-debounce-js.html   
http://www.css88.com/archives/4648   
http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/   
http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/   

<hr>



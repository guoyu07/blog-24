#React
##HTML模板

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>react html模板</title>
	    <!--react.js 是 React 的核心库-->
	    <script type="text/javascript" src="../react-15.3.1/build/react.js"></script>
	    <!--react-dom.js 是提供与 DOM 相关的功能-->
	    <script type="text/javascript" src="../react-15.3.1/build/react-dom.js"></script>
	    <!--Browser.js 的作用是将 JSX 语法转为 JavaScript 语法，
	    这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。
	        $ babel src --out-dir build
	    上面命令可以将 src 子目录的 js 文件进行语法转换，转码后的文件全部放在 build 子目录。-->
	    <script type="text/javascript" src="../build/browser.min.js"></script>
	</head>
	<body>
	<div id="demo1"></div>
	<!--<script> 标签的 type 属性为 text/babel 。
	这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。
	凡是使用 JSX 的地方，都要加上 type="text/babel" 。-->
	<script type="text/babel">
	    //code
	</script>
	</body>
	</html>

##ReactDOM.render()
ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。


    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('demo1')
    );

上面代码将一个 h1 标题，插入 example 节点.

##JSX 语法
HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写.

    var names = ['张三', '李四', '王五'];
    ReactDOM.render(
    <div>
    {
        names.map(function (name) {
            return <div> 你好, {name}! </div>;
        })
    }
    </div>
    ,document.getElementById("demo1"));
	
上面代码体现了 **JSX 的基本语法规则：遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{` 开头），就用 JavaScript 规则解析。**

JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员.

    var hs=[<h2>你好, 张三!</h2>,<h2>你好, 李四!</h2>];
    ReactDOM.render(<div>{hs}</div>,document.getElementById("demo1"));
    
##组件
React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。**React.createClass 方法就用于生成一个组件类**	
<br>
参考：

[React中文API](http://reactjs.cn/react/docs/getting-started.html)

[React 常用面试题目与分析](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551676&idx=2&sn=b5d36019c22f1d55eb9cb085313321b2&chksm=8025a07db752296b785af57fff026ddfa6161b3b974fe72ea413d5ab64e46afac991b052cdc3&mpshare=1&scene=23&srcid=0204bPDupBXgKEnYSVqQuLhu#rd)

[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

[React 技术栈系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)

[Flux 架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)

[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

[Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

[Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

[React Native填坑之旅](http://blog.csdn.net/future_challenger/article/category/6410836)
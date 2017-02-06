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

    var HelloMessage = React.createClass({
        render: function () {
            return <h2> 你好, {this.props.name}! </h2>;
        }
    });

    ReactDOM.render(<HelloMessage name = "张三" />, document.getElementById("demo1"));	
    
上面代码中，变量 `HelloMessage` 就是一个组件类。模板插入 `<HelloMessage /> `时，会自动生成 `HelloMessage` 的一个实例（**下文的"组件"都指组件类的实例**）。**所有组件类都必须有自己的 `render` 方法，用于输出组件。**

注意，`组件类的第一个字母必须大写，否则会报错`，比如HelloMessage不能写成helloMessage。另外，`组件类只能包含一个顶层标签，否则也会报错`。

###this.props
组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="张三"> ，就是 HelloMessage 组件加入一个 name 属性，值为 张三。组件的属性可以在组件类的 `this.props` 对象上获取，比如 name 属性就可以通过 this.props.name 读取。上面代码的运行结果如下。

**添加组件属性，有一个地方需要注意，就是 `class` 属性需要写成 `className` ，`for` 属性需要写成 `htmlFor` ，这是因为 class 和 for 是 JavaScript 的保留字。**

##this.props.children
**this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是`this.props.children属性。它表示组件的所有子节点`。**

	var NotesList = React.createClass({
	  render: function() {
	    return (
	      <ol>
	      {
	        React.Children.map(this.props.children, function (child) {
	          return <li>{child}</li>;
	        })
	      }
	      </ol>
	    );
	  }
	});
	
	ReactDOM.render(
	  <NotesList>
	    <span>hello</span>
	    <span>world</span>
	  </NotesList>,
	  document.body
	);

**这里需要注意， this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。**

![](../images/react_thisPropsChildren.png)

###React.Children.map
React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

##PropTypes
组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

组件类的**PropTypes属性，就是用来验证组件实例的属性是否符合要求**。


    var MyTitle = React.createClass({
      propTypes: {
        title: React.PropTypes.string.isRequired,
      },

      render: function() {
         return <h1> {this.props.title} </h1>;
       }
    });

上面的Mytitle组件有一个title属性。PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。

###getDefaultProps方法
**getDefaultProps 方法可以用来设置组件属性的默认值。**


    var MyTitle = React.createClass({
      getDefaultProps : function () {
        return {
          title : 'Hello World'
        };
      },

      render: function() {
         return <h1> {this.props.title} </h1>;
       }
    });

    ReactDOM.render(
      <MyTitle />,
      document.body
    );

上面代码会输出"Hello World"。
    
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
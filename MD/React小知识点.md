参考：

[React中文API](http://reactjs.cn/react/docs/getting-started.html)

[React 常用面试题目与分析](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551676&idx=2&sn=b5d36019c22f1d55eb9cb085313321b2&chksm=8025a07db752296b785af57fff026ddfa6161b3b974fe72ea413d5ab64e46afac991b052cdc3&mpshare=1&scene=23&srcid=0204bPDupBXgKEnYSVqQuLhu#rd)

[React Native填坑之旅](http://blog.csdn.net/future_challenger/article/category/6410836)

[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

[React 技术栈系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)

[Flux 架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)

[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

[Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

[Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

[深入浅出React（一）：React的设计哲学 - 简单之美](http://www.infoq.com/cn/articles/react-art-of-simplity/)

[深入浅出React（二）：React开发神器Webpack](http://www.infoq.com/cn/articles/react-and-webpack/)

[深入浅出React（三）：理解JSX和组件](http://www.infoq.com/cn/articles/react-jsx-and-component?utm_source=tuicool&utm_medium=referral)

[深入浅出React（四）：虚拟DOM Diff算法解析](http://www.infoq.com/cn/articles/react-dom-diff)

[深入浅出React（五）：使用Flux搭建React应用程序架构](http://www.infoq.com/cn/articles/react-flux)

[React组件生命周期小结](http://www.jianshu.com/p/4784216b8194)

[React项目新手指南](https://www.w3ctech.com/topic/1496)

[ECMAScript 6 in WebStorm: Transpiling](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/)

#React
##入门
###HTML模板

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

###ReactDOM.render()
ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。


    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('demo1')
    );

上面代码将一个 h1 标题，插入 example 节点.

###JSX 语法
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
    
###组件
React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。**React.createClass 方法就用于生成一个组件类**

    var HelloMessage = React.createClass({
        render: function () {
            return <h2> 你好, {this.props.name}! </h2>;
        }
    });

    ReactDOM.render(<HelloMessage name = "张三" />, document.getElementById("demo1"));	
    
上面代码中，变量 `HelloMessage` 就是一个组件类。模板插入 `<HelloMessage /> `时，会自动生成 `HelloMessage` 的一个实例（**下文的"组件"都指组件类的实例**）。**所有组件类都必须有自己的 `render` 方法，用于输出组件。**

注意，`组件类的第一个字母必须大写，否则会报错`，比如HelloMessage不能写成helloMessage。另外，`组件类只能包含一个顶层标签，否则也会报错`。

####this.props
组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="张三"> ，就是 HelloMessage 组件加入一个 name 属性，值为 张三。组件的属性可以在组件类的 `this.props` 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

**添加组件属性，有一个地方需要注意，就是 `class` 属性需要写成 `className` ，`for` 属性需要写成 `htmlFor` ，这是因为 class 和 for 是 JavaScript 的保留字。**


###this.props.children
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

####React.Children.map
React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

###PropTypes
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

####getDefaultProps方法
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
 
###获取真实的DOM节点
`ref` 属性获取组件真实 DOM 的节点。

    var MyComponent = React.createClass({
      handleClick: function() {
        this.refs.myTextInput.focus();
      },
      render: function() {
        return (
          <div>
            <input type="text" ref="myTextInput" />
            <input type="button" value="Focus the text input" onClick={this.handleClick} />
          </div>
        );
      }
    });

    ReactDOM.render(
      <MyComponent />,
      document.getElementById('example')
    );

上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 ref 属性，然后 `this.refs.[refName]` 就会返回这个真实的 DOM 节点。

需要注意的是，**由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。**上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会读取 this.refs.[refName] 属性。

###this.state
组件免不了要与用户互动，React 的一大创新，就是**将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI**。


    var LikeButton = React.createClass({
      getInitialState: function() {
        return {liked: false};
      },
      handleClick: function(event) {
        this.setState({liked: !this.state.liked});
      },
      render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
          <p onClick={this.handleClick}>
            You {text} this. Click to toggle.
          </p>
        );
      }
    });

    ReactDOM.render(
      <LikeButton />,
      document.getElementById('example')
    );

上面代码是一个 LikeButton 组件，它的 `getInitialState` 方法用于定义初始状态，也就是一个对象，这个对象可以通过 `this.state属性读取` 。当用户点击组件，导致状态变化，`this.setState方法就修改状态值`，**每次修改以后，自动调用 `this.render` 方法，再次渲染组件**。

> 由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，`this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。` 

> **每一个React组件都有自己的 state，其与 props 的区别在于 `state只存在组件的内部，props 在所有实例中共享。` **

>**this.props任何引用类型的值(如数组，对象),都会在所有实例中共享，而不是每个组件实例拥有单独的副本，所以不要在组件实例中去修改 props，把它当成只读的数据最好。 **


###getInitialState、getDefaultPops方法
getInitialState 和 getDefaultPops 的调用是有区别的，getDefaultPops 是对于`组件类`来说只调用一次，后续该类的应用都不会被调用，而 getInitialState 是对于每个`组件实例`来讲都会调用，并且只调一次。


###组件的生命周期
组件的生命周期分成三个状态：

- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM

React 为每个状态都提供了两种处理函数，`will 函数在进入状态之前调用`，`did 函数在进入状态之后调用`，三种状态共计五种处理函数。

- componentWillMount()
- componentDidMount()
- componentWillUpdate(object nextProps, object nextState)
- componentDidUpdate(object prevProps, object prevState)
- componentWillUnmount()

此外，React 还提供两种特殊状态的处理函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

###Ajax
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI。

    var UserGist = React.createClass({
      getInitialState: function() {
        return {
          username: '',
          lastGistUrl: ''
        };
      },

      componentDidMount: function() {
        $.get(this.props.source, function(result) {
          var lastGist = result[0];
          if (this.isMounted()) {
            this.setState({
              username: lastGist.owner.login,
              lastGistUrl: lastGist.html_url
            });
          }
        }.bind(this));
      },

      render: function() {
        return (
          <div>
            {this.state.username}'s last gist is
            <a href={this.state.lastGistUrl}>here</a>.
          </div>
        );
      }
    });

    ReactDOM.render(
      <UserGist source="https://api.github.com/users/octocat/gists" />,
      document.body
    );

上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库。


##详解
组件挂载之后，每次调用setState后都会调用shouldComponentUpdate判断是否需要重新渲染组件。默认返回true，需要重新render。在比较复杂的应用里，有一些数据的改变并不影响界面展示，可以在这里做判断，优化渲染效率。

###在react中，触发render的有4条路径。
**以下假设shouldComponentUpdate都是按照默认返回true的方式。**

- 首次渲染Initial Render
- 调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）
- 父组件发生更新（一般就是props发生改变，但是就算props没有改变或者父子组件之间没有数据交换也会触发render）
- 调用this.forceUpdate

![](../images/react_组件更新路径.png)


###生命周期
一个React组件的生命周期分为三个部分：

- 实例化
- 存在期
- 销毁时

![](../images/react_生命周期_方法执行顺序.png)

####实例化
当组件在`客户端被`实例化，`第一次`被创建时，以下方法依次被调用：

1. getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount (*注：该方法不会在服务端被渲染的过程中调用*)

#####getDefaultProps
**`对于组件类来说只调用一次，该组件类的所有后续应用`，getDefaultPops 将不会再被调用，其返回的对象可以用于设置默认的 props 值。**

	var Hello = React.creatClass({
	    getDefaultProps: function(){
	        console.log("Hello getDefaultProps");
	    },
	    render: function(){
	        return <div>Hello</div>;
	    }
	});
	
只定义Hello组件类，不进行任何实例化(挂载)，getDefaultProps被调用，且以后不再被调用。

getDefaultProps 设置 props 值：

	var Hello = React.creatClass({
	    getDefaultProps: function(){
	        return {
	            name: 'pomy',
	            git: 'dwqs'
	        }
	    },
	
	    render: function(){
	        return (
	            <div>Hello,{this.props.name},git username is {this.props.dwqs}</div>
	        )
	    }
	});

	ReactDOM.render(<Hello />, document.body);

也可以在挂载组件的时候设置 props：

	var data = [{title: 'Hello'}];
	<Hello data={data} />

或者调用 setProps （一般不需要调用）来设置其 props：

	var data = [{title: 'Hello'}];
	var Hello = React.render(<Demo />, document.body);
	Hello.setProps({data:data});
	
> 但只能在子组件或组件树上调用 setProps。别调用 this.setProps 或者 直接修改 this.props。将其当做只读数据。

#####getInitialState
对于`组件的每个实例`来说，这个方法的调用**有且只有一次**，用来初始化每个实例的 state，在这个方法里，可以访问组件的 props。每一个React组件都有自己的 state，其与 props 的区别在于 `state只存在组件的内部，props 在所有实例中共享`。

>getInitialState 和 getDefaultPops 的调用是有区别的，getDefaultPops 是对于`组件类`来说只调用一次，后续该类的应用都不会被调用，而 getInitialState 是对于每个`组件实例`来讲都会调用，并且只调一次。

`每次修改 state，都会重新渲染组件，实例化后通过 state 更新组件`，会依次调用下列方法：

1. shouldComponentUpdate(object nextProps, object nextState)
- conponentWillUpdate(object nextProps, object nextState)
- render
- conponentDidUpdate(object prevProps, object prevState)

但是**不要直接修改 this.state，要通过 this.setState 方法来修改**。

#####componentWillMount
>`在首次渲染执行前`立即调用且仅调用一次。`如果在这个方法内部调用 setState 并不会触发重新渲染，这也是在 render 方法调用之前修改 state 的最后一次机会。`

#####render
该方法会`创建一个虚拟DOM`，用来表示组件的输出。对于一个组件来讲，`render方法是唯一一个必需的方法`。render方法需要满足下面几点：

- 只能通过 this.props 和 this.state 访问数据（不能修改）
- 可以返回 null,false 或者任何React组件
- 只能出现一个顶级组件，不能返回一组元素
- 不能改变组件的状态
- 不能修改DOM的输出

**render方法返回的结果并不是真正的DOM元素，而是一个虚拟的表现，类似于一个DOM tree的结构的对象。**react之所以效率高，就是这个原因。

#####componentDidMount
该方法不会在服务端被渲染的过程中调用。`该方法被调用时，已经渲染出真实的 DOM`，可以再该方法中通过 `ReactDOM.findDOMNode(this)` 访问到真实的 DOM。

	var data = [..];
	var comp = React.createClass({
	    render: function(){
	        return <imput .. />
	    },
	    conponentDidMount: function(){
	        $(ReactDOM.findDOMNode(this)).autoComplete({
	            src: data
	        })
	    }
	})

由于组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。有时**需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性**：

	var Area = React.createClass({
	    render: function(){
	        ReactDOM.findDOMNode(this); //render调用时，组件未挂载，这里将报错
	        return <canvas ref='mainCanvas'>
	    },
	    componentDidMount: function(){
	        var canvas = ReactDOM.findDOMNode(this.refs.mainCanvas);
	        //这是有效的，可以访问到 Canvas 节点
	    }
	})

*需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。*

####存在期
**此时组件已经渲染好并且用户可以与它进行交互**，比如鼠标点击，手指点按，或者其它的一些事件，导致应用状态的改变，你将会看到下面的方法依次被调用

1. componentWillReceiveProps(object nextProps)
- shouldComponentUpdate(object nextProps, object nextState)
- componentWillUpdate(object nextProps, object nextState)
- render
- componentDidUpdate(object prevProps, object prevState)

#####componentWillReceiveProps(nextProps)
`组件的 props 属性可以通过父组件来更改，这时，componentWillReceiveProps 将来被调用。`可以在这个方法里更新 state,以触发 render 方法重新渲染组件。

    var Fruit = React.createClass({
        getDefaultProps: function () {
            return {
                name: "水果",
                number: 0
            };
        },
        componentWillReceiveProps: function (nextProps) {
            console.log(this.props.name+" Fruit componentWillReceiveProps(object nextProps)");
            console.log(nextProps)
        },
        render: function () {
            console.log(this.props.name+" Fruit render()");
            return <div>{this.props.name} 共 {this.props.number} 个 </div>;
        }
    });

    var Basket = React.createClass({
        getInitialState: function () {
            return {
                number:1
            };
        },
        handlerClick:function(){
            this.setState({
                number: this.state.number + 1
            });
        },
        render: function () {
            console.log("Basket render()");
            return (
                <div onClick={this.handlerClick}>
                    <Fruit name="苹果" number={this.state.number}/>
                </div>
            );
        }
    });

    ReactDOM.render(<Basket></Basket>, document.getElementById("demo"));
    
触发点击事件，控制台输出：

	Basket render()
	苹果 Fruit componentWillReceiveProps(object nextProps)
	Object {name: "苹果", number: 2}
	苹果 Fruit render()

#####shouldComponentUpdate(nextProps, nextState)
如果你确定组件的 props 或者 state 的改变不需要重新渲染，可以通过在这个方法里通过返回 false 来阻止组件的重新渲染，返回 `false 则不会执行 render 以及后面的 componentWillUpdate，componentDidUpdate 方法。

>通常不需要使用以避免出现bug。在出现应用的瓶颈时，可通过该方法进行适当的优化。在首次渲染期间或者调用了forceUpdate方法后，该方法不会被调用.

该方法是非必须的，并且大多数情况下没有在开发中使用。

	var Basket = React.createClass({
        getInitialState: function () {
            return {
                number: 1
            };
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            console.log("Basket shouldComponentUpdate");
            return true;//return false 则不更新组件
        },
        handlerClick: function () {
            this.setState({
                number: this.state.number + 1
            });
        },
        componentWillUpdate: function (nextProps, nextState) {
            console.log("Basket componentWillUpdate");
        },
        render: function () {
            console.log("Basket render");
            return <div onClick={this.handlerClick}>点击加1: {this.state.number}</div>;
        },
        componentDidUpdate: function (prevProps, prevState) {
            console.log("Basket componentDidUpdate");
        }
    });

    ReactDOM.render(<Basket></Basket>, document.getElementById("demo"));
    
触发点击事件，控制台输出：
 
	Basket shouldComponentUpdate
	Basket componentWillUpdate
	Basket render
	Basket componentDidUpdate

#####componentWillUpdate(nextProps, nextState)
这个方法和 componentWillMount 类似，在组件接收到了新的 props 或者 state 即将进行重新渲染前，componentWillUpdate(object nextProps, object nextState) 会被调用，`注意不要在此方面里再去更新 props 或者 state`。

#####componentDidUpdate(prevProps, prevState)
这个方法和 componentDidMount 类似，在组件重新被渲染之后，componentDidUpdate(object prevProps, object prevState) 会被调用。`可以在这里访问并修改 DOM。`

####销毁时
#####componentWillUnmount
每当React使用完一个组件，这个组件必须从 DOM 中卸载后被销毁，此时 componentWillUnmout 会被执行，完成所有的清理和销毁工作，`在 conponentDidMount 中添加的任务都需要再该方法中撤销`，如创建的定时器或事件监听器。

当再次装载组件时，以下方法会被依次调用：

1. getInitialState
- componentWillMount
- render
- componentDidMount

###React的原理
React为此引入了虚拟DOM（Virtual DOM）的机制：在浏览器端用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A变成B，然后又从B变成A，React会认为UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，而对实际DOM进行操作的仅仅是Diff部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。

###组件化的开发思路
>所谓组件，即封装起来的具有独立功能的UI部件。

React推荐以组件的方式去重新思考UI构成，将UI上每一个功能相对独立的模块定义成组件，然后将小的组件通过组合或者嵌套的方式构成大的组件，最终完成整体UI的构建。每个组件的UI和逻辑都定义在组件内部，和外部完全通过API来交互，通过组合的方式来实现复杂的功能。

React认为一个组件应该具有如下特征：

1. **可组合**（Composeable）：一个组件易于和其它组件一起使用，或者嵌套在另一个组件内部。如果一个组件内部创建了另一个组件，那么说父组件拥有（own）它创建的子组件，通过这个特性，一个复杂的UI可以拆分成多个简单的UI组件；
- **可重用**（Reusable）：每个组件都是具有独立功能的，它可以被使用在多个UI场景；
- **可维护**（Maintainable）：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护；
- **可测试**（Testable）：因为每个组件都是独立的，那么对于各个组件分别测试显然要比对于整个UI进行测试容易的多。

**简化的组件模型：所谓组件，其实就是状态机器**

组件并不是一个新的概念，它意味着某个独立功能或界面的封装，达到复用、或是业务逻辑分离的目的。而React却这样理解界面组件：

所谓组件，就是状态机器 (`对组件的管理就是对状态的管理,React组件很少需要暴露组件方法和外部交互`)

>**React将用户界面看做简单的状态机器。当组件处于某个状态时，那么就输出这个状态对应的界面。**通过这种方式，就很容易去保证界面的一致性。

>在React中，你简单的去更新某个组件的状态，然后输出基于新状态的整个界面。React负责以最高效的方式去比较两个界面并更新DOM树。

- 对组件的管理就是对状态的管理
- React组件很少需要暴露组件方法和外部交互
- 组件是React中构建用户界面的基本单位。它们和外界的交互除了状态（state）之外，还有就是属性（props）。

	- 事实上，状态更多的是一个组件内部去自己维护，
	- 而属性则由外部在初始化这个组件时传递进来（一般是组件需要管理的数据）。
	- React认为属性应该是只读的，一旦赋值过去后就不应该变化。

**每一次界面变化都是整体刷新**

关于虚拟DOM的原理简而言之就是，UI界面是一棵DOM树，对应的我们创建一个全局唯一的数据模型，每次数据模型有任何变化，都将整个数据模型应用到UI DOM树上，由React来负责去更新需要更新的界面部分。事实证明，这种方式不但简化了开发逻辑并且极大的提高了性能。

##单向数据流动：Flux
Flux框架用于管理数据流，Flux提倡的是`单向数据流动，即永远只有从模型到视图的数据流动。`
![](../images/Flux单向数据流动.jpg =600x)

Flux引入了Dispatcher和Action的概念：`Dispatcher是一个全局的分发器负责接收Action，而Store可以在Dispatcher上监听到Action并做出相应的操作。`简单的理解可以认为类似于全局的消息发布订阅模型。Action可以来自于用户的某个界面操作，比如点击提交按钮；也可以来自服务器端的某个数据更新。当数据模型发生变化时，就触发刷新整个界面。

###让数据模型也变简单：Immutability
Immutability含义是只读数据，React提倡使用只读数据来建立数据模型。`所有数据都是只读的，如果需要修改它，那么你只能产生一份包含新的修改的数据。`

只读的数据可以让代码更加的安全和易于维护，你不再需要担心数据在某个角落被某段神奇的代码所修改；也就不必再为了找到修改的地方而苦苦调试。而结合React，只读数据能够让React的组件仅仅通过比较对象引用是否相等来决定自身是否要重新Render。这在复杂的界面上可以极大的提高性能。

针对只读数据，Facebook开发了一整套框架[immutable.js](http://facebook.github.io/immutable-js/)，如果不希望一开始就引入这样一个较大的框架，React还提供了一个工具类插件，帮助管理和操作只读数据：[React.addons.update](https://facebook.github.io/react/docs/update.html)。

##JSX
JSX语法将XML语法直接加入到JavaScript代码中，让你能够高效的通过代码而不是模板来定义界面。之后JSX通过翻译器转换到纯JavaScript再由浏览器执行。在实际开发中，JSX在产品打包阶段都已经编译成纯JavaScript，JSX的语法不会带来任何性能影响。

	var person = <Person name={window.isLoggedIn ? window.name : ''} />;

###JSX的语法
JSX用大括号来加入JavaScript表达式，大括号中是JavaScript，而JSX又允许在JavaScript中使用XML，因此在大括号中仍然可以使用XML来声明组件，不断递归使用。

###在JSX中使用事件
	<button onClick={this.checkAndSubmit.bind(this)}>Submit</button>
	
`在JSX中你不需要关心什么时机去移除事件绑定，因为React会在对应的真实DOM节点移除时就自动解除了事件绑定。`

>React并不会真正的绑定事件到每一个具体的元素上，而是采用事件代理的模式：在根节点document上为每种事件添加唯一的Listener，然后通过事件的target找到真实的触发元素。这样从触发元素到顶层节点之间的所有节点如果有绑定这个事件，React都会触发对应的事件处理函数。这就是所谓的React模拟事件系统。

JSX语法只是JavaScript语法的一个语法映射.

###在JSX中使用样式
在JSX中使用样式和真实的样式也很类似，通过style属性来定义，但和真实DOM不同的是，`属性值不能是字符串而必须为对象`，例如：

	<div style={{color: '#ff0000', fontSize: '14px'}}>Hello World.</div>

这段JSX中的大括号是双的，有点奇怪，但实际上里面的大括号只是标准的JavaScript对象表达式，外面的大括号是JSX的语法。所以，样式你也可以先赋值给一个变量，然后传进去，代码会更易读：

	var style = {
	  color: '#ff0000',
	  fontSize: '14px'
	};
	
	var node = <div style={style}>HelloWorld.</div>;

**在JSX中可以使用所有的的样式，基本上属性名的转换规范就是将其写成驼峰写法**，例如“background-color”变为“backgroundColor”, “font-size”变为“fontSize”，这和标准的JavaScript操作DOM样式的API是一致的。

###组件的概念和生命周期
React组件`自身定义了一组props作为对外接口`，展示一个组件时只需要指定props作为XML节点的属性。组件很少需要对外公开方法，唯一的交互途径就是props。这使得使用组件就像使用函数一样简单，给定一个输入，组件给定一个界面输出。当给予的参数一定时，那么输出也是一定的。

虚拟DOM机制,让你可以每次props改变都能以整体刷新页面的思路去考虑界面展现逻辑。

如果整个项目完全采用React，那么界面上就只有一个组件根节点；如果局部使用React，那么每个局部使用的部分都有一个根节点。在Render时，根节点由React.render函数去触发：

	React.render(
	  <App />,
	  document.getElementById('react-root')
	);

而所有的子节点则都是通过父节点的render方法去构造的。每个组件都会有一个render方法，这个方法返回组件的实例，最终整个界面得到一个虚拟DOM树，再由React以最高效的方式展现在界面上。

>除了props之外，组件还有一个很重要的概念：state。组件规范中定义了setState方法，每次调用时都会更新组件的状态，触发render方法。需要注意，`render方法是被异步调用的，这可以保证同步的多个setState方法只会触发一次render，有利于提高性能。`和props不同，state是组件的内部状态，除了初始化时可能由props来决定，之后就完全由组件自身去维护。在组件的整个生命周期中，`React强烈不推荐去修改自身的props，因为这会破坏UI和Model的一致性，props只能够由使用者来决定。`

**shouldComponentUpdate**: **这是一个和性能非常相关的方法**，在每一次render方法之前被调用。它提供了一个机会让你决定是否要对组件进行实际的render。例如：

	shouldComponentUpdate(nextProps, nextState) {
	  return nextProps.id !== this.props.id;
	}

当此函数返回false时，组件就不会调用render方法从而避免了虚拟DOM的创建和内存中的Diff比较，从而有助于提高性能。当返回true时，则会进行正常的render的逻辑。

###使用Babel进行JSX编译
React官方博客发布了[一篇文章](https://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html)，声明其自身用于JSX语法解析的编译器JSTransform已经过期，不再维护，React JS和React Native已经全部采用第三方[Babel](http://babeljs.io/)的JSX编译器实现。原因是两者在功能上已经完全重复，而Babel作为专门的JavaScript语法编译工具，提供了更为强大的功能。

JSX是一种新的语法，浏览器并不能直接运行，因此需要这种翻译器。推荐使用Webpack进行React的开发，要将JSX的编译器从JSTransform切换到Babel非常简单.

首先通过npm安装Babel：

	npm install —save-dev babel-loader

只需稍微改变一下webpack.config.js的配置：

	module: {
	  loaders: [
	    { test: /\.jsx?$/, loaders: ['babel-loader']}
	  ]
	}

##虚拟DOM Diff算法解析求。
即给定任意两棵树，找到最少的转换步骤。但是[标准的的Diff算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)复杂度需要O(n^3)，这显然无法满足性能要求。

React结合Web界面的特点做出了两个简单的假设，使得Diff算法复杂度直接降低到`O(n)`

1. 两个相同组件产生类似的DOM结构，不同的组件产生不同的DOM结构；
- 对于同一层次的一组子节点，它们可以通过唯一的id进行区分。

>在实现自己的组件时，保持稳定的DOM结构会有助于性能的提升。

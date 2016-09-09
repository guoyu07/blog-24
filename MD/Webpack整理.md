参考:  
[http://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710548&idx=1&sn=b29e4d55d6dd4701d1be4c10efc8bcb4&scene=1&srcid=09013p3rQHqfo17Ysa7WKz78#rd](http://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710548&idx=1&sn=b29e4d55d6dd4701d1be4c10efc8bcb4&scene=1&srcid=09013p3rQHqfo17Ysa7WKz78#rd)  
[http://yaowenjie.github.io/front-end/using-webpack-dashboard](http://yaowenjie.github.io/front-end/using-webpack-dashboard)
[http://zhaoda.net/webpack-handbook](http://zhaoda.net/webpack-handbook)

##Webpack
>Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

###解决什么问题?
`文件依赖管理`

如何在一个大规模的代码库中，维护各种模块资源的分割和存放，维护它们之间的依赖关系，并且无缝的将它们整合到一起生成适合浏览器端请求加载的静态资源。

###webpack的工作方式
把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。

![](../images/Webpack的工作方式.jpg)

###Webpack 的特点
- 代码拆分   
	Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。
- Loader    
	Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。
- 智能解析   
	Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。
- 插件系统   
	Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。
- 快速运行   
	Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。

###安装webpack
首先要安装 `Node.js`， Node.js 自带了软件包管理器 npm，Webpack 需要 Node.js v0.6 以上支持。

Webpack可以使用npm安装，新建一个空的练习文件夹（此处命名为webpackSampleProgect），在终端中转到该文件夹后执行下述指令就可以完成安装。

	# 全局安装 
	npm install -g webpack
	
	# 检查是否成功安装webpack
	webpack -h

将 Webpack 安装到项目的依赖中，这样就可以使用项目本地版本的 Webpack。

	# 进入项目目录
	# 确定已经有 package.json，没有就通过 npm init 创建
	# 安装 webpack 依赖
	npm install webpack --save-dev
Webpack 目前有两个主版本，一个是在 master 主干的稳定版，一个是在 webpack-2 分支的测试版，测试版拥有一些实验性功能并且和稳定版不兼容，在正式项目中应该使用稳定版。

	# 查看 webpack 版本信息
	$ npm info webpack
	
	# 安装指定版本的 webpack
	$ npm install webpack@1.13.x --save-dev
	
如果需要使用 Webpack 开发工具，要单独安装：

	npm install webpack-dev-server --save-dev

###使用
首先创建一个静态页面 index.html 和一个 JS 入口文件 entry.js：   
index.html

	<!-- index.html -->
	<html>
	<head>
	  <meta charset="utf-8">
	</head>
	<body>
	  <script src="bundle.js"></script>
	</body>
	</html>

entry.js
	
	// entry.js
	document.write('It works.')

然后编译 entry.js 并打包到 bundle.js：

	webpack entry.js bundle.js
	
打包过程会显示日志：
	
	Hash: eab07d91c02f865c05c4
	Version: webpack 1.13.2
	Time: 54ms
	    Asset     Size  Chunks             Chunk Names
	bundle.js  1.42 kB       0  [emitted]  main
	   [0] ./entry.js 28 bytes {0} [built]
	   
接下来添加一个模块 module.js 并修改入口 entry.js：

module.js

	// module.js
	module.exports = 'It works from module.js.'
   
entry.js

	// entry.js
	document.write('It works.')
	document.write(require('./module.js')) // 添加模块

重新打包 webpack entry.js bundle.js 后刷新页面看到变化 It works.It works from module.js.

	Hash: d1795b1d974431ad989d
	Version: webpack 1.13.2
	Time: 73ms
	    Asset     Size  Chunks             Chunk Names
	bundle.js  1.56 kB       0  [emitted]  main
	   [0] ./entry.js 68 bytes {0} [built]
	   [1] ./module.js 31 bytes {0} [built]
	   
Webpack 会分析入口文件，解析包含依赖关系的各个文件。这些文件（模块）都打包到 bundle.js 。**Webpack 会给每个模块分配一个唯一的 id 并通过这个 id 索引和访问模块。**在页面启动时，会先执行 entry.js 中的代码，其它模块会在运行 require 的时候再执行。

###Loader
Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件。

####loader 特性

- Loader 可以通过管道方式链式调用，每个 loader 可以把资源转换成任意格式并传递给下一个 loader ，但是最后一个 loader 必须返回 JavaScript。
- Loader 可以同步或异步执行。
- Loader 运行在 node.js 环境中，所以可以做任何可能的事情。
- Loader 可以接受参数，以此来传递配置项给 loader。
- Loader 可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。
- Loader 可以通过 npm 发布和安装。
- 除了通过 package.json 的 main 指定，通常的模块也可以导出一个 loader 来使用。
- Loader 可以访问配置。
- 插件可以让 loader 拥有更多特性。
- Loader 可以分发出附加的任意文件。

Loader 本身也是运行在 node.js 环境中的 JavaScript 模块，它通常会返回一个函数。大多数情况下，我们通过 npm 来管理 loader，但是你也可以在项目中自己写 loader 模块。

按照惯例，而非必须，loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。

在引用 loader 的时候可以使用全名 json-loader，或者使用短名 json。这个命名规则和搜索优先级顺序在 webpack 的 resolveLoader.moduleTemplates api 中定义。

	Default: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]

Loader 可以在 require() 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定，还可以通过命令行的方式使用。

接上一节的例子，我们要在页面中引入一个 CSS 文件 style.css，首页将 style.css 也看成是一个模块，然后用 css-loader 来读取它，再用 style-loader 把它插入到页面中。

	/* style.css */
	body { background: yellow; }

修改 entry.js：

	require("!style!css!./style.css") // 载入 style.css
	document.write('It works.')
	document.write(require('./module.js'))

安装 loader：

	npm install css-loader style-loader

重新编译打包:

	webpack entry.js bundle.js
	
刷新页面，就可以看到黄色的页面背景了。

如果每次 require CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据模块类型（扩展名）来自动绑定需要的 loader。

将 entry.js 中的 require("!style!css!./style.css") 修改为 require("./style.css") ，然后执行：

	$ webpack entry.js bundle.js --module-bind 'css=style!css'

	# 有些环境下可能需要使用双引号
	$ webpack entry.js bundle.js --module-bind "css=style!css"

显然，这两种使用 loader 的方式，效果是一样的。

###配置文件webpack.config.js
Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 webpack.config.js 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 --config 选项来指定配置文件。

在根目录创建 package.json 来添加 webpack 需要的依赖：

	{
	  "name": "webpack-example",
	  "version": "1.0.0",
	  "description": "A simple webpack example.",
	  "main": "bundle.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "keywords": [
	    "webpack"
	  ],
	  "author": "veya",
	  "license": "MIT",
	  "devDependencies": {
	    "css-loader": "^0.25.0",
	    "style-loader": "^0.13.1",
	    "webpack": "^1.13.2"
	  }
	}
	
如果没有写入权限，请尝试如下代码更改权限

	chflags -R nouchg .
	sudo chmod  775 package.json
	
然后创建一个配置文件 webpack.config.js：

//引入webpack
	var webpack = require('webpack');
	
	module.exports = {
	    /**
	     * 入口：要进行处理的实例（js）
	     */
	    entry: './entry.js',
	    /**
	     * 出口：输出配置
	     * path: 输出到哪个目录
	     * filename: 实例最终输出的名字
	     */
	    output: {
	        path: __dirname,
	        filename: 'bundle.js'
	    },
	    module: {
	        /**
	         * 通过使用不同的loader，webpack通过调用外部的脚本或工具可以对各种各样的格式的文件进行处理
	         * Loaders需要单独安装并且需要在webpack.config.js下的modules关键字下进行配置
	         * 属性:
	         *  test: 一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
	         *  loader: loader的名称（必须）
	         *  include/exclude: 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
	         *  query: 为loaders提供额外的设置选项（可选）
	         *
	         * css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,
	         * style-loader将所有的计算后的样式加入页面中，
	         * 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
	         * 首先npm安装css, style的loader: npm install --save-dev style-loader css-loader
	         * style!css中的感叹号的作用在于使同一文件能够使用不同类型的loader
	         */
	        loaders: [
	            {test: /\.css$/, loader: 'style!css'}
	        ]
	    }
	}

同时简化 entry.js 中的 style.css 加载方式：

	require('./style.css')

最后命令行运行

	 webpack
	 
可以看到 webpack 通过配置文件执行的结果和上面通过命令行
	
	webpack entry.js bundle.js --module-bind 'css=style!css' 
	
执行的结果是一样的。

###插件
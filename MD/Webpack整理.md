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

###配置文件webpack.config.js
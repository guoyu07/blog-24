[Mac 键盘快捷键](https://support.apple.com/zh-cn/HT201236)https://support.apple.com/zh-cn/HT201236
###npm设置为淘宝npm镜像
(1)通过 config 配置指向国内镜像源

	npm config set registry https://registry.cnpmjs.org //配置指向源
	npm info express  //下载安装第三方包
(2)通过 npm 命令指定下载源

	npm --registry https://registry.cnpmjs.org info express
(3)在配置文件 ~/.npmrc 文件写入源地址

	vi ~/.npmrc   //打开配置文件
	registry =https://registry.npm.taobao.org   //写入配置文件
esc vi退出:wq!

推荐使用最后一种方法,一劳永逸,前面2钟方法都是临时改变包下载源.

如果你不像使用国内镜像站点,只需要将 写入 ~/.npmrc 的配置内容删除即可.

react-native命令行从npm官方源拖代码时会遇上麻烦。请先将npm仓库源替换为国内镜像： 

	npm config set registry https://registry.npm.taobao.org
	npm config set disturl https://npm.taobao.org/dist

###nodejs版本升级

1. 检查 Node的当前版本，使用命令

		$ node -v
2. 清除npm cache

		$ sudo npm cache clean -f 
3. (通过npm)安装n模块

		$ npm install -g n
4. 升级nodejs到最新版本（选择一个流行版本安装，如版本号0.8.11）

		$ n 0.8.11
	或
	
		$ n v0.8.11
	自动安装最新的稳定版本
	
		$ n stable
	安装最新的版本
	
		$ n latest
	删除某个版本（0.8.11是版本号）

		$ n rm 0.8.11
	查看所有node版本
	
		$ n ls
	查看更多命令
	
		$ n -h
5. 查看Node的版本，检查升级是否成功
	
		$ node -v

		
###npm常用命令

其实使用npm升级各种插件是很方便的，比如我想升级express框架，使用如下命令

	npm update express
如果你的express是全局安装，则

	npm update -g express
也可以使用安装命令来重装，在这里是等效于update：
	
	npm install -g express
显示版本，检查npm 是否正确安装

	npm -v
安装express模块

	npm install express
全局安装express模块
	
	npm install -g express
列出已安装模块
	
	npm list
显示模块详情（例：显示express的模块详情）
	
	npm show express
升级当前目录下的项目的所有模块

	npm update
升级当前目录下的项目的指定模块（例：升级express模块）

	npm update express
升级全局安装的express模块

	npm update -g express
删除指定的模块（例：删除express模块）

	npm uninstall express
	
###yeoman
官网：[http://yeoman.io](http://yeoman.io)
安装

	npm install -g yo
查看版本
	
	yo --version
	
[http://yeoman.io/generators/](http://yeoman.io/generators/)

![](image/yeoman-generators-react-webpack.png =600x)

点击[react-webpack](https://github.com/newtriks/generator-react-webpack)进入https://github.com/newtriks/generator-react-webpack

安装generator-react-webpack

	npm install -g generator-react-webpack

查看当前本机全局安装的以generator-开头的npm

	npm ls -g --depth=1 2>/dev/null | grep generator-
	
###react
[react中文官网：](http://reactjs.cn/)http://reactjs.cn/

- 在本机创建工作空间，如/opt/workspace/react/

- 在自己的github创建工程(注：引之前已经建了react-gallery，为了截图仓库名改成gallery-react，但后面的仍然用react-gallery)

	- 第1步
	![](image/github_new_repository1.png =600x)
	- 第2步
	![](image/github_new_repository2.png =600x)
	- 第3步
	![](image/github_new_repository3.png =600x)

- 命令行将github上的react-gallery下载到本地/opt/workspace/react/目录下

		cd /opt/workspace/react/
		git clone https://github.com/lunachi/react-gallery.git
- 利用react-webpack来生成项目
		
		cd react-gallery/
		npm install -g generator-react-webpack
		yo react-webpack react-gallery
		
![](image/react-webpack_to_react-gallery1.png =600x)

如果有npm包安装失败，就单独运行一下npm install 安装失败的包名

- react-webpack生成完后，运行项目

		// Start for development
		npm start # or
		npm run serve
		
		// Start the dev-server with the dist version
		npm run serve:dist //node server.js --env=dist
		
		// Just build the dist version and copy static files
		npm run dist
		
		// Run unit tests
		npm test
		
		// Lint all files in src (also automatically done AFTER tests are run)
		npm run lint
		
		// Clean up the dist directory
		npm run clean
		
		// Just copy the static assets
		npm run copy	

浏览器自动打开[http://localhost:8000/webpack-dev-server/](http://localhost:8000/webpack-dev-server/)

- 安装autoprefixer-loader样式前缀适配 [https://github.com/passy/autoprefixer-loader](https://github.com/passy/autoprefixer-loader)进入当前项目目录，执行下列命令(注：-save-dev把当前npm包的依赖加入到当前项目的package.json)

	npm install autoprefixer-loader --save-dev
	
- 1、将项目目录中/src/styles/中的.css扩展名改成.scss；2、将/src/component/中的引用的对应.css文件的扩展名也改成.scss；3、将webpack的配置文件中的loaders中的css、scss部分加入autoprefixer-loader，?{browsers:["last 2 version"]}表示最新浏览器的后两个版本，改为：
	
		{
        	test: /\.css$/,
        	loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}'
      	},
		{
        	test: /\.scss/,
        	loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}!sass-loader?outputStyle=expanded'
      	}
- 安装json-loader

		npm install json-loader --save-dev
		
- 将webpack的配置文件中的loaders中加入json-loader配置

		{
        	test: /\.json$/,
        	loader: 'json-loader'
      	}



VCD原则：view controller data
>只执行一次的函数，采用自执行方式

###webpack
[webpack官网:](http://webpack.github.io/)http://webpack.github.io/

	



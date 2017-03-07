###查看Mac OS X是什么样的Shell，使用命令
	echo $SHELL
	
如果输出的是：csh或者是tcsh，那么你用的就是C Shell。   
如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。

Mac OS X 10.2之前默认的是C Shell。   
Mac OS X 10.3之后默认的是Bourne Shell。

###Mac配置环境变量的地方
1. **/etc/profile （建议不修改这个文件 ）**全局（公有）配置，不管是哪个用户，登录时都会读取该文件。
2. **/etc/bashrc （一般在这个文件中添加系统级环境变量）** 全局（公有）配置，bash shell执行时，不管是何种方式，都会读取此文件。
3. **~/.bash_profile （一般在这个文件中添加用户级环境变量）** 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!

###安装nvm和node
nvm 可以管理不同版本的node与npm。

nvm git地址：[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

1. 用cURL安装 nvm v0.33.0：
	
		curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

- 添加nvm环境变量
	- 编辑~/.bash_profile文件
	
			vi ~/.bash_profile
			
	- i 在~/.bash_profile文件中输入：

			export NVM_DIR="/Users/a58/.nvm" #nvm安装目录，nvm安装成功后会显示安装路径
			[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" ##加载nvm
			export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node #设置nvm淘宝镜像
			source $NVM_DIR/nvm.sh
	- esc退出编辑 :wq!保存文件
	
- 卸载已安装到全局的 node/npm

	如果之前是在官网下载的node安装包，运行后会自动安装在全局目录，其中node命令在 /usr/local/bin/node，npm命令在全局node_modules目录中，具体路径为/usr/local/lib/node_modules/npm

	安装nvm之后最好先删除下已安装的 node 和全局 node 模块：

		npm ls -g --depth=0 #查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
		sudo rm -rf /usr/local/lib/node_modules #删除全局 node_modules 目录
		sudo rm /usr/local/bin/node #删除 node
		cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm #删除全局 node 模块注册的软链


3. nvm安装node

		nvm install node
		
 	安装完成后，切换到该版本
	
		nvm use node
		
###npm淘宝镜像
镜像使用方法（三种办法任意一种都能解决问题，建议使用第三种，将配置写死，下次用的时候配置还在）:

1.通过config命令

	npm config set registry https://registry.npm.taobao.org 
	npm info underscore （如果上面配置正确这个命令会有字符串response）

2.命令行指定

	npm --registry https://registry.npm.taobao.org info underscore 

3.编辑 ~/.npmrc 加入下面内容

	registry = https://registry.npm.taobao.org

搜索镜像: [https://npm.taobao.org](https://npm.taobao.org)

建立或使用镜像,参考: [https://github.com/cnpm/cnpmjs.org](https://github.com/cnpm/cnpmjs.org)

###[国内优秀npm镜像推荐及使用](http://riny.net/2014/cnpm/)
npm全称Node Package Manager，是node.js的模块依赖管理工具。由于npm的源在国外，所以国内用户使用起来各种不方便。下面整理出了一部分国内优秀的npm镜像资源，国内用户可以选择使用。   
国内优秀npm镜像   

淘宝npm镜像

    搜索地址：http://npm.taobao.org/
    registry地址：http://registry.npm.taobao.org/

cnpmjs镜像

    搜索地址：http://cnpmjs.org/
    registry地址：http://r.cnpmjs.org/

如何使用

有很多方法来配置npm的registry地址，下面根据不同情境列出几种比较常用的方法。以淘宝npm镜像举例：

1. 临时使用

		npm --registry https://registry.npm.taobao.org install express

2. 持久使用

		npm config set registry https://registry.npm.taobao.org

		// 配置后可通过下面方式来验证是否成功
		npm config get registry
		// 或
		npm info express

3. 通过cnpm使用

		npm install -g cnpm --registry=https://registry.npm.taobao.org
		
		// 使用
		cnpm install express

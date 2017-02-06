git安装指南地址：https://git-scm.com/

查看git版本，是否安装：

	git --version
	
新建一个文件夹，作为项目目录，进入该目录并创建git存储库

	git init
	
.gitignore文件，用于任何想让git默认忽略的文件或目录，支持通配符。

把所有已有的文件都加到git里

	git add -A
	
添加单个文件，如文件hello.js

	git add hello.js
	
注：`git add命令，她添加的是修改，而不是文件，所以，如果你修改过hello.js，然后输入git add hello.js，你真正所做的是把刚刚做过的修改添加了进来。git有一个暂存区，当你执行git add时，这些修改就被存放到该区域中，所以刚才添加的修改实际上还没提交，但它已经准备就绪了，要提交这次修改，用git commit: git commit -m "提交代码的注释"`

clone、checkout命令

把github上的web-development-with-node-and-express下载到本地

	git clone https://github.com/EthanRBrown/web-development-with-node-and-express.git
	
检出web-development-with-node-and-express中的ch04的标签

	cd web-development-with-node-and-express
	git checkout ch04
	git checkout -b experiment
	
注：`如果你到某一点时想要做试验,记得你检出的标签要将你置于一种 Git 称为 “分离的 HEAD”的状态中。尽管你可以随意编辑任何文件,但如果你不先 创建一个分支,提交任何修改都是不安全的。所以如果你确实想要基于一个 标签做一个试验性的分支,只需创建一个新分支后检出,只要一个命令就可 以做到:git checkout -b experiment(experiment 是分支的名字,你可以用你喜欢的任何名字)。然后,你就可以安全地在这个分支上随意编辑和提交了。`
require是一个用来引入模块的Node函数。Node默认会在目录node_modules中寻找这些模块。
如果想让一个东西在模块外可见，必须把它加到exports上。
	var hello=require("./lib/hello.js");
在模块名称前加了前缀./，这告诉node,它不应该到node_modules目录中查找这个模块，如果忽略了这个前缀就会导致失败。

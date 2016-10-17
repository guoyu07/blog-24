参考：   
[http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
#git
Git是分布式版本控制系统。   
分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。
##安装Git
通过homebrew安装Git，具体方法请参考homebrew的文档：[http://brew.sh/](http://brew.sh/)。

安装完成后，还需要最后一步设置，在命令行输入：

	git config --global user.name "Your Name"
	git config --global user.email "email@example.com"

因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

注意git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
##创建版本库
版本库又名仓库，英文名repository，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

- 首先，选择一个合适的地方，创建一个空目录：

		mkdir learngit
		cd learngit
		pwd

	pwd命令用于显示当前目录。


- 第二步，通过git init命令把这个目录变成Git可以管理的仓库：

		git init
		
	Initialized empty Git repository in /opt/learngit/.git/   
	当前目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。   
	如果你没有看到.git目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。

##把文件添加到版本库

- 初始化一个Git仓库，使用`git init`命令。
- 添加文件到Git仓库，分两步：
    - 第一步，使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
    - 第二步，使用命令`git commit -m '注释'`，完成。
- 要随时掌握工作区的状态，使用`git status`命令。
- 如果git status告诉你有文件被修改过，用`git diff`可以查看修改内容。

##版本回退
- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
    
	Git必须知道当前版本是哪个版本，在Git中，用**HEAD**表示当前版本，也就是最新的提交3628164...882e1e0（注意我的提交ID和你的肯定不一样），上一个版本就是**HEAD^**，上上一个版本就是**HEAD^^**，当然往上100个版本写100个^比较容易数不过来，所以写成**HEAD~100**。
	
- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。

	如果嫌输出信息太多，可以试试加上--pretty=oneline参数：
	
		git log --pretty=oneline
		
- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

##工作区和暂存区
工作区（Working Directory）

版本库（Repository）工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。   

Git的版本库里存了很多东西，其中最重要的就是称为stage的暂存区，还有Git自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

![](../images/git工作区和版本库.jpg)

我们把文件往Git版本库里添加的时候，是分两步执行的：

- 第一步是用`git add`把文件添加进去，实际上就是把文件修改`添加到暂存区`；
- 第二步是用`git commit`提交更改，实际上就是把`暂存区`的所有内容提交到`当前分支`。

因为创建Git版本库时，`Git自动创建了唯一一个master分支`，所以，现在，git commit就是往master分支上提交更改。

##管理修改







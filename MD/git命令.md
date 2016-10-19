参考：   
廖雪峰Git教程    
[http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)    
mac下gitLab、sourceTree的配合使用    
[http://www.jianshu.com/p/707de2a1046d](http://www.jianshu.com/p/707de2a1046d)    

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
Git跟踪并管理的是修改，而非文件。

git commit只负责**把暂存区的修改提交**。

用`git diff HEAD -- <file>`命令可以查看**工作区和版本库里面最新版本的区别**。

每次修改，如果不add到暂存区，那就不会加入到commit中。

##撤销修改
命令`git checkout -- <file>`意思就是，把\<file>文件在工作区的修改全部撤销，这里有两种情况：

- 一种是\<file>自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
- 一种是\<file>已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到**最近一次git commit或git add时的状态**。

`git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令。

Git同样告诉我们，用命令`git reset HEAD file`可以把暂存区的修改撤销掉（unstage），重新放回工作区。

`git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用`HEAD`时，表示最新的版本。

> **总结：**

- 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。
- 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD file`，就回到了场景1，第二步按场景1操作。
- 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，`git reset --hard commit_id`，不过前提是没有推送到远程库。

##删除文件
在Git中，删除也是一个修改操作，添加一个新文件test.txt到Git并且提交：

	vi test.txt
	:wq!
	git add test.txt
	git commit -m 'add test.txt'
	
用rm命令删了：

	rm test.txt
	
这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻告诉你哪些文件被删除了：

	git status
	On branch master
	Changes not staged for commit:
	  (use "git add/rm <file>..." to update what will be committed)
	  (use "git checkout -- <file>..." to discard changes in working directory)
	
		deleted:    test.txt
	
	no changes added to commit (use "git add" and/or "git commit -a")
	
现在你有两个选择，**一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit：**

	git rm test.txt
	git commit -m 'remove test.txt'

现在，文件就从版本库中被删除了。

另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地**把误删的文件恢复到最新版本：**

	git checkout -- test.txt

***git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。***

##远程仓库
本地Git仓库和GitHub仓库之间的传输是通过`SSH加密`的.

所以，需要一点设置：

- 第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

		ssh-keygen -t rsa -C "youremail@example.com"

	你需要把邮件地址换成你自己的邮件地址，然后一路回车。

	如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

- 第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：

	然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：
![](../images/git_Add_SSH_Key.png)
点“Add Key”，你就应该看到已经添加的Key：
![](../images/git_Add_SSH_Key_done.png)

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

##添加远程库
现在的情景是，你已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步。

- 首先，登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库：
![](../images/git_GitHub_添加仓库.png)
- 在Repository name填入learngit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：
![](../images/git_GitHub_添加仓库_name.png)
目前，在GitHub上的这个learngit仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

	现在，我们根据GitHub的提示，在本地的learngit仓库下运行命令：

		git remote add origin git@github.com:lunachi/learngit.git
	请千万注意，把上面的lunachi替换成你自己的GitHub账户名，否则，你在本地关联的就是我的远程库，关联没有问题，但是你以后推送是推不上去的，因为你的SSH Key公钥不在我的账户列表中。

	添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。

- 下一步，就可以把本地库的所有内容推送到远程库上：
	
		git push -u origin master
	把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。

	由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

	推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样.
	
	从现在起，只要本地作了提交，就可以通过命令：

		git push origin master

	把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！

问题：

Warning: Permanently added the RSA host key for IP address '192.30.253.112' to the list of known hosts.   
解决：host中加入192.30.253.112 github.com

Permission denied (publickey).
fatal: Could not read from remote repository.   
解决：把本地生成的id_rsa.pub添加到github中。

> **小结**

- 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；
- 关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；
- 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

##分支管理
###创建与合并分支
每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即`master`分支。`HEAD`严格来说不是指向提交，而是指向`master`，`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。

一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点：

![](../images/git_master分支.png)

每次提交，`master`分支都会向前移动一步，这样，随着你不断提交，`master`分支的线也越来越长:

![](../images/git_master分支_B.png)

![](../images/git_master分支_C.png)

![](../images/git_master分支_D.png)

当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：

![](../images/git_master_dev分支.png)

你看，Git创建一个分支很快，因为除了增加一个dev指针，改改HEAD的指向，工作区的文件都没有任何变化！

不过，从现在开始，对工作区的修改和提交就是针对dev分支了，比如新提交一次后，dev指针往前移动一步，而master指针不变：

![](../images/git_master_dev分支_修改.png)

假如我们在dev上的工作完成了，就可以把dev合并到master上。Git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并：

![](../images/git_master_dev分支_修改_合并到master分支.png)

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除dev分支。删除dev分支就是把dev指针给删掉，删掉后，我们就剩下了一条master分支：

![](../images/git_master_dev分支_修改_合并到master分支_删除dev分支.png)

####实战
首先，我们创建dev分支，然后切换到dev分支：

	git checkout -b dev

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

	git branch dev
	git checkout dev

然后，用`git branch`命令查看当前分支：

	git branch

`git branch`命令会列出所有分支，当前分支前面会标一个*号。

然后，我们就可以在dev分支上正常提交，比如对readme.txt做个修改，加上一行：

Creating a new branch is quick.

然后提交：

	git add readme.txt 
	git commit -m "branch test"

现在，dev分支的工作完成，我们就可以切换回master分支：

	git checkout master

切换回master分支后，再查看一个readme.txt文件，刚才添加的内容不见了！因为那个提交是在dev分支上，而master分支此刻的提交点并没有变.

现在，我们把dev分支的工作成果合并到master分支上：

	git merge dev

`git merge`命令用于合并指定分支到当前分支。合并后，再查看readme.txt的内容，就可以看到，和dev分支的最新提交是完全一样的。

注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。

合并完成后，就可以放心地删除dev分支了：

	git branch -d dev

删除后，查看branch，就只剩下master分支了：

	git branch

因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全。

>**总结**

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

###解决冲突
准备新的feature1分支，继续我们的新分支开发：

	$ git checkout -b feature1
	Switched to a new branch 'feature1'

修改readme.txt最后一行，改为：

	Creating a new branch is quick AND simple.

在feature1分支上提交：

	$ git add readme.txt 
	$ git commit -m "AND simple"
	[feature1 75a857c] AND simple
	 1 file changed, 1 insertion(+), 1 deletion(-)

切换到master分支：

	$ git checkout master
	Switched to branch 'master'
	Your branch is ahead of 'origin/master' by 1 commit.

Git还会自动提示我们当前master分支比远程的master分支要超前1个提交。

在master分支上把readme.txt文件的最后一行改为：

	Creating a new branch is quick & simple.

提交：

	$ git add readme.txt 
	$ git commit -m "& simple"
	[master 400b400] & simple
	 1 file changed, 1 insertion(+), 1 deletion(-)

现在，master分支和feature1分支各自都分别有新的提交，变成了这样：

![](../images/git_master_and_feature1.png)

这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：

	$ git merge feature1
	Auto-merging readme.txt
	CONFLICT (content): Merge conflict in readme.txt
	Automatic merge failed; fix conflicts and then commit the result.

果然冲突了！Git告诉我们，readme.txt文件存在冲突，必须手动解决冲突后再提交。git status也可以告诉我们冲突的文件：

	$ git status
	# On branch master
	# Your branch is ahead of 'origin/master' by 2 commits.
	#
	# Unmerged paths:
	#   (use "git add/rm <file>..." as appropriate to mark resolution)
	#
	#       both modified:      readme.txt
	#
	no changes added to commit (use "git add" and/or "git commit -a")

我们可以直接查看readme.txt的内容：

	Git is a distributed version control system.
	Git is free software distributed under the GPL.
	Git has a mutable index called stage.
	Git tracks changes of files.
	<<<<<<< HEAD
	Creating a new branch is quick & simple.
	=======
	Creating a new branch is quick AND simple.
	>>>>>>> dev1

Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存：

	Creating a new branch is quick and simple.

再提交：

	$ git add readme.txt 
	$ git commit -m "conflict fixed"
	[master 59bc1cb] conflict fixed

现在，master分支和feature1分支变成了下图所示：

![](../images/git_master_and_feature1_merge.png)

用带参数的git log也可以看到分支的合并情况：

	$ git log --graph --pretty=oneline --abbrev-commit
	*   59bc1cb conflict fixed
	|\
	| * 75a857c AND simple
	* | 400b400 & simple
	|/
	* fec145a branch test
	...

最后，删除feature1分支：

	$ git branch -d feature1
	Deleted branch feature1 (was 75a857c).

工作完成。

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。   
用`git log --graph`命令可以看到分支合并图。

###分支管理策略
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

下面我们实战一下`--no-ff`方式的git merge：

首先，仍然创建并切换dev分支：

	$ git checkout -b dev
	Switched to a new branch 'dev'

修改readme.txt文件，并提交一个新的commit：

	$ git add readme.txt 
	$ git commit -m "add merge"
	[dev 6224937] add merge
	 1 file changed, 1 insertion(+)

现在，我们切换回master：

	$ git checkout master
	Switched to branch 'master'

准备合并dev分支，请注意`--no-ff参数，表示禁用Fast forward`：

	$ git merge --no-ff -m "merge with no-ff" dev
	Merge made by the 'recursive' strategy.
	 readme.txt |    1 +
	 1 file changed, 1 insertion(+)

因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。

合并后，我们用git log看看分支历史：

	$ git log --graph --pretty=oneline --abbrev-commit
	*   7825a50 merge with no-ff
	|\
	| * 6224937 add merge
	|/
	*   59bc1cb conflict fixed
	...

可以看到，不使用Fast forward模式，merge后就像这样：

![](../images/git_分支管理_on-ff.png)

**在实际开发中，我们应该按照几个基本原则进行分支管理：**

首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

所以，团队合作的分支看起来就像这样：

![](../images/git_分支管理策略.png)

>合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

###Bug分支




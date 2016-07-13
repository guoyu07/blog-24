##第一个shell脚本
打开文本编辑器，新建一个文件test.sh，扩展名为sh（sh代表shell），扩展名并不影响脚本执行，见名知意就好：

实例

	#!/bin/bash
	echo "Hello World !"

**"#!"** 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种Shell。

**echo**命令用于向窗口输出文本。

##运行Shell脚本有两种方法
###1. 作为可执行程序
将上面的代码保存为test.sh，并cd到相应目录：

	chmod +x ./test.sh  #使脚本具有执行权限
	./test.sh  #执行脚本

注意，一定要写成./test.sh，而不是test.sh，运行其它二进制的程序也一样，直接写test.sh，linux系统会去PATH里寻找有没有叫test.sh的，而只有/bin, /sbin, /usr/bin，/usr/sbin等在PATH里，你的当前目录通常不在PATH里，所以写成test.sh是会找不到命令的，要用./test.sh告诉系统说，就在当前目录找。

###2. 作为解释器参数
这种运行方式是，直接运行解释器，cd到相应目录，其参数就是shell脚本的文件名，如：

	/bin/sh test.sh

这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。 

##Shell 变量
定义变量时，变量名不加美元符号（$），如：

	your_name="runoob.com"

注意，变量名和等号之间不能有空格。同时，变量名的命名须遵循如下规则：

- 首个字符必须为字母（a-z，A-Z）。
- 中间不能有空格，可以使用下划线（_）。
- 不能使用标点符号。
- 不能使用bash里的关键字（可用help命令查看保留关键字）。

###使用变量
使用一个定义过的变量，只要在变量名前面加美元符号即可，如：

	your_name="qinjx"
	echo $your_name
	echo ${your_name}

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，比如下面这种情况：

	for skill in Ada Coffe Action Java; do
	    echo "I am good at ${skill}Script"
	done

如果不给skill变量加花括号，写成echo "I am good at $skillScript"，解释器就会把$skillScript当成一个变量（其值为空），代码执行结果就不是我们期望的样子了。

推荐给所有变量加上花括号，这是个好的编程习惯。

已定义的变量，可以被重新定义，如：

	your_name="tom"
	echo $your_name
	your_name="alibaba"
	echo $your_name

这样写是合法的，但注意，第二次赋值的时候不能写$your_name="alibaba"，使用变量的时候才加美元符（$）。

####只读变量
使用 `readonly` 命令可以将变量定义为只读变量，只读变量的值不能被改变。

下面的例子尝试更改只读变量，结果报错：

	#!/bin/bash
	myUrl="http://www.w3cschool.cc"
	readonly myUrl
	myUrl="http://www.runoob.com"

运行脚本，结果如下：

	/bin/sh: NAME: This variable is read only.

####删除变量
使用 `unset` 命令可以删除变量。语法：

	unset variable_name

变量被删除后不能再次使用。unset 命令不能删除只读变量。

实例

	#!/bin/sh
	myUrl="http://www.runoob.com"
	unset myUrl
	echo $myUrl

以上实例执行将没有任何输出。

###变量类型
运行shell时，会同时存在三种变量：

1. 局部变量 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
- 环境变量 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
- shell变量 shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

###Shell 字符串
字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。
####单引号

	str='this is a string'

**单引号字符串的限制：**

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单引号（对单引号使用转义符后也不行）。

####双引号

	your_name='qinjx'
	str="Hello, I know your are \"$your_name\"! \n"

**双引号的优点：**

- 双引号里可以有变量
- 双引号里可以出现转义字符

####拼接字符串

	your_name="qinjx"
	greeting="hello, "$your_name" !"
	greeting_1="hello, ${your_name} !"
	echo $greeting $greeting_1

####获取字符串长度

	string="abcd"
	echo ${#string} #输出 4

####提取子字符串
以下实例从字符串第 2 个字符开始截取 4 个字符：

	string="runoob is a great site"
	echo ${string:1:4} # 输出 unoo

####查找子字符串
查找字符 "i 或 s" 的位置：

	string="runoob is a great company"
	echo `expr index "$string" is`  # 输出 8

*注意： 以上脚本中 "`" 是反引号，而不是单引号 "'"，不要看错了哦。*

##Shell 运算符
Shell 和其他编程语言一样，支持多种运算符，包括：

- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

例如，两个数相加(注意使用的是反引号 ` 而不是单引号 ')：

	#!/bin/bash
	
	val=`expr 2 + 2`
	echo "两数之和为 : $val"

执行脚本，输出结果如下所示：

	两数之和为 : 4

两点注意：

- **表达式和运算符之间要有空格**，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
- **完整的表达式要被 \` ` 包含**，注意这个字符不是常用的单引号，在 Esc 键下边。

###算术运算符
下表列出了常用的算术运算符，假定变量 a 为 10，变量 b 为 20：

<table>
    <tbody>
    <tr>
        <th> 运算符</th>
        <th> 说明</th>
        <th> 举例</th>
    </tr>
    <tr>
        <td> +</td>
        <td> 加法</td>
        <td> `expr $a + $b` 结果为&nbsp;30。</td>
    </tr>
    <tr>
        <td> -</td>
        <td> 减法</td>
        <td> `expr $a - $b` 结果为 10。</td>
    </tr>
    <tr>
        <td> *</td>
        <td> 乘法</td>
        <td> `expr $a \* $b` 结果为 &nbsp;200。</td>
    </tr>
    <tr>
        <td> /</td>
        <td> 除法</td>
        <td> `expr $b / $a` 结果为&nbsp;2。</td>
    </tr>
    <tr>
        <td> %</td>
        <td> 取余</td>
        <td> `expr $b % $a` 结果为&nbsp;0。</td>
    </tr>
    <tr>
        <td> =</td>
        <td> 赋值</td>
        <td> a=$b 将把变量 b 的值赋给 a。</td>
    </tr>
    <tr>
        <td> ==</td>
        <td> 相等。用于比较两个数字，相同则返回 true。</td>
        <td> [ $a == $b ] 返回&nbsp;false。</td>
    </tr>
    <tr>
        <td> !=</td>
        <td> 不相等。用于比较两个数字，不相同则返回 true。</td>
        <td> [ $a != $b ] 返回 true。</td>
    </tr>
    </tbody>
</table>

注意：

- **条件表达式要放在方括号之间，并且要有空格**，例如: [$a==$b] 是错误的，必须写成 [ $a == $b ]。
- 乘号(*)前边必须加反斜杠(\)才能实现乘法运算；




<br>
参考：   
[http://www.runoob.com/linux/linux-shell-variable.html](http://www.runoob.com/linux/linux-shell-variable.html)
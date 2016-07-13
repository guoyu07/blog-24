#!/bin/bash

#定义变量
myVar="shell 变量"
#使用变量
echo $myVar ${myVar}

#字符串 单引号
echo '单引号引用字符串 $myVar 单引号不允许转义'
#字符串 双引号
echo "双引号引用字符串 $myVar 双引号转义 \" "
#字符串 拼接
echo "字符串拼接 S="$myVar"=E"
#字符串 长度
echo ${#myVar}

#数组 定义
myArr=('高富' '白美' '张高' '李矮');
#数组 输出
echo ${myArr[@]}
#数组 输出单个元素
echo ${myArr[1]}
#数组 长度
echo ${#myArr[@]}
arrLength=${#myArr[*]}
echo $arrLength

#参数 传递
echo "shell 参数传递"
echo "执行的文件名: $0"
echo "第一个参数: $1"
echo "第二个参数: $2"

echo "传递到脚本的参数个数: $#"
echo "以一个单字符串显示所有向脚本传递的参数: $*"
echo "脚本运行的当前进程ID号: $$"
echo "后台运行的最后一个进程的ID号: $!"
echo "与\$*相同,但是使用时加引号,并在引号中返回每个参数: $@"
echo "显示shell使用的当前选项,与set命令功能相同: $-"
echo "显示最后命令的退出状态,0表示没有错误: $?"


echo "------\$*演示---------"
for i in "$*"; do
    echo $i
done

echo "------\$@演示---------"
for i in "$@"; do
    echo $i
done

echo "------运算符 expr---------"
a=20
b=10
echo "初始化 a=${a}, b=${b}"

r1=`expr $a + $b`
echo "a + b = $r1"
r2=`expr $a - $b`
echo "a - b = $r2"
r3=`expr $a \* $b`
echo "a * b = $r3"
r4=`expr $a / $b`
echo "a / b = $r4"
r5=`expr $a % $b`
echo "a % b ? $r5"
if [ $a == $b ]
then
 echo "a和b相等"
fi
if [ $a != $b ]
then
 echo "a和b不等"
fi

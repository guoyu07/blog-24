#nodejs整理
##基础

###module.exports 与 exports
- node模块允许从被引入文件中选择要暴露给程序的函数和变量。如果模块返回的`函数或变量不止一个`，通过设置`exports对象`的属性来指明它们。如果模块只返回`一个函数或变量`。则可以设定`module.exports属性`。

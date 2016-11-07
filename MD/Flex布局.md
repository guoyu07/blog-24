参考：

Flex 布局教程：语法篇:  
[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

> 布局的传统解决方案: 基于[盒状模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)，依赖 [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)属性 + [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)属性 + [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)属性。

##一、Flex布局是什么？
Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。

	.box{
	  display: flex;
	}
	
行内元素也可以使用Flex布局。

	.box{
	  display: inline-flex;
	}
	
Webkit内核的浏览器，必须加上`-webkit`前缀。

	.box{
	  display: -webkit-flex; /* Safari */
	  display: flex;
	}

**注意，设为Flex布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。**

##二、基本概念
采用Flex布局的元素，称为`Flex容器`（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为`Flex项目`（flex item），简称"项目"。

![](../images/flex_语法_概念.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。
项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

##三、容器的属性




##选择器
![](image/css3选择器种类.png =400x)
###基本选择器
![](image/css3基本选择器语法.png =600x)

####多类选择器
例：

	.item.important {
		background:red;
	}
只有同时具有“item”和“important”的元素，而只有其中任何一个类名都将无法匹配。

IE6不支持多类选择器，其将以末尾类名为准。
####群组选择器
群组选择器是讲具有相同样式的元素分组在一起，每个选择器之间用逗号（,）隔开，例如“selector1,selector2,......,selectorN”。

注：“selector1,selectorN”是群组选择器，表示选择匹配为selector1和selectorN的所有元素；“selector1 selectorN”是后代选择器，表示选择器selectorN所有元素为selector1的后代元素。

###层次选择器
层次选择器通过HTML的DOM元素间的层次关系获取元素，其主要的层次关系包括后代、父子、相邻兄弟和通用兄弟几种关系。

![](image/css3层次选择器语法.png =600x)

浏览器兼容情况：

![](image/css3层次选择器浏览器兼容.png =400x)

####后代选择器
后代选择器（E F）,E为祖先元素，F为后代元素，选择E元素的所有后代F元素，F元素不管是E元素的子元素、孙辈元素或者更深层次的关系，都将被选中。
####相邻兄弟选择器
相邻兄弟选择器（E+F）可以选择紧接在另一个元素后的元素。E和F是同辈元素，F元素在E元素后面。并且相邻。
####通用兄弟选择器
通用兄弟选择器（E~F）是`css3新增加的`,用于选择某元素后面的所有兄弟元素，需要在同一个父元素之中。E和F元素都是同辈元素，并且F元素在E元素之后，E~F将选中E元素后面的所有F元素。

###动态伪类选择器
伪类选择器：":link", ":visited", ":hover", ":active"

伪类选择器语法书写时和其他的css选择器写法有所区别，都以冒号（:）开头，例

	E:pseudo-class {property:value}
	
其中E为HTML中的元素；pseudo-class是css的伪类选择器名称；property是css的属性；value为css属性值。

动态伪类包含两种：

- 第一种是在链接中常看到的锚点伪类；
- 另一种为用户行为伪类。

![](image/css3动态伪类选择器语法.png =600x)

锚点伪类的设置必须遵守一个`“爱恨原则”LoVe/HAte`，也就是`“link-visited-hover-active”`。另外IE6、IE7(Q)、IE8(Q)中，a:hover、a:visited并没有按照规范描述的算法计算它们的针对性，而是根据链接的实际状态来决定使用哪个规则集里的声明。它们三个的针对性比a:link强。

###目标伪类选择器
目标伪类选择器":target"是众多使用的css3特性中的一个，用来匹配文档（页面）的URI中某个标识符的目标元素。在web页面中，一些URL拥有片段标识符，它由一个井号（#）后跟一个锚点或元素ID组合而成，可以链接到页面的某个特定元素。“:target”伪类选择器选取链接的目标元素，然后供定义样式。

语法：

	E:target 选择匹配E的所有元素，且匹配元素被相关URL指向
	
注：目标伪类选择器是动态选择器，只有存在URL指向该匹配元素时，样式效果才会生效。

![](image/目标伪类选择器应用场景.png =600x)

###语言伪类选择器
为文档指定语言，有两种方法可以表示

- 一种是使用HTML5,直接可以设置文档的语言。例如：

		<!DOCTYPE HTML>
		<html lang="en-US">
- 另一种是手工在文档中指定lang属性，并设置对应的语言值，例如

		<body lang="fr">

语法：

	E:lang(language)
	
表示选择匹配E的所有元素，且匹配元素指定了lang属性，而且其值为language.

###UI元素状态伪类选择器
UI元素的状态一般包括：启用、禁用、选中、未选中、获得焦点、失去焦点、锁定和待机等
在HTML元素中有可用和不可用状态。

![](image/css3UI元素状态伪类选择器语法.png =600x)

浏览器兼容

![](image/css3UI元素状态伪类选择器浏览器兼容.png =400x)

###结构伪类选择器
伪类可以将一段并不存在的HTML当作独立元素来定位，或是找到无法使用其他简单选择器就能定位到的切实存在的元素。因此CSS3给伪类选择器引入一种“结构伪类选择器”。这种选择器可以根据元素在文档树中的某些特性定位到它们。

![](image/css3结构伪类选择器使用语法1.png =600x)
![](image/css3结构伪类选择器使用语法2.png =600x)

![](image/css3结构伪类选择器.png =500x)

参数n可以是整数（1、2、3、4）、关键字（odd、even）,还可以是公式（2n+1,-n+5）,但参数n的起始值始终是1，而不是0，换句话说，当参数n的值为0时，选择器将选择不到任何匹配的元素。

**":nth-child"和":nth-of-type"的区别**

- ":nth-child"选择的是某父元素的子元素，这个子元素并没有指定确切的类型，同时满足两个条件时方能有效果，其一是子元素，其二此子元素刚好处在哪个位置
- ":nth-of-type"选择的是某父元素的子元素，而且这个子元素是指定类型。

“:nth-child”虽然常见，但却脆弱，随时被其他子元素给挤出选择的范围；而“:nth-of-type”不常见，但在选择某种类型的子元素时，更稳定，更可靠。

###否定伪类选择器
否定选择器“:not()”是CSS3的新选择器，主要用来定位不匹配该选择器的元素。
语法：

	E:not(F) 匹配所有除元素F外的E元素
	
“:not()”是一个非常有用的选择器，可以起到过滤内容的作用。

例：给表单中所有input定义样式，除了submit按钮之外，此时就可以使用否定选择器。
		
	input:not([type=submit]){......}
	
###伪元素
伪元素可用于定位文档中包含的文本，但无法在文档树中定位。
伪类一般反映无法在CSS中轻松或可靠地检测到的某个元素属性或状态；另一方面，伪元素表示DOM外部的某种文档结构。

**伪元素包括“::first-letter”，“::first-line”，“::before”，“::after”，“::selection”**

**为什么要使用两个冒号？**

对于IE6~8,仅支持单冒号表示法，而现代浏览器同时支持这两种表示法。另一个区别是，双冒号与单冒号在CSS3中主要用来区别伪类和伪元素。

“::before”和“::after”不是指存在于标记中的内容，而是可以插入额外内容的位置。

“::selection”是用来匹配突出显示的文本。伪元素::selection仅接受两个属性，一个是background，另一个是color。

###属性选择器
语法：
![](image/css3属性选择器语法1.png =600x)
![](image/css3属性选择器语法2.png =600x)

css3中常见的通配符：
![](image/css3常用通配符.png =600x)

属性选择器浏览器兼容性：
![](image/css3属性选择器浏览器兼容.png =600x)

##CSS3 边框
###边框简介
边框的基本属性

- border-width:设置元素边框的粗线
- border-color:设置元素边框的颜色
- border-style:设置元素边框的类型

三个元素合并在一起缩写语法：

	border: border-width border-style border-color
	
缩写后的每个属性之间使用空格隔开，而且他们之间没有先后顺序，可这里三个值中唯一需要的值是border-style.

border也遵守“TRBL”原则（Top/Right/Bottom/Left）,例如单独写边框类型

- border-top-style:/\*设置元素顶部边框类型*/
- border-right-style:/\*设置元素右边边框类型*/
- border-bottom-style:/\*设置元素底部边框类型*/
- border-left-style:/\*设置元素左边边框类型*/

同理，border-color和border-width也可以像上面一样使用。

	/*一个值时，表示四条边都solid类型*/
	border-style:solid;
	/*两个值时，第一个值表示元素上下边框类型，第二值表示左右边框类型*/
	border-style:solid dotted;
	/*三个值时，第一个值表示元素顶边的类型，第二个值表示左右边框类型，第三个值表示底部边框类型*/
	border-style:solid dotted dashed;
	/*四个值时，第一个值表示元素顶边类型，第二个值表示元素右边类型，第三个值表示元素底边的类型*/
	border-style:solid dotted dashed inset;
	
####边框的类型
![](image/css3border-style值列表.png =600x)

####border-color
css3的border-color属性语法：

	border-color:[<color>|transparent]{1,4}|inherit
	
换句话说，如果使用border-color这中缩写语法，将不会有任何效果，必须将这个border-color标准写法拆分成四个边框，使用多颜色才会有效果。

- border-top-colors:[\<color>|transparent]{1,4}|inherit
- border-right-colors:[\<color>|transparent]{1,4}|inherit
- border-bottom-colors:[\<color>|transparent]{1,4}|inherit
- border-left-colors:[\<color>|transparent]{1,4}|inherit

由于css3的border-color属性还没成为标准规范，为了让不同浏览器能渲染正常，有必要加上前缀。

注意：以上四个属性中color是复数colors

![](image/css3不同浏览器前缀.png =600x)

[http://leaverou.github.io/prefixfree/](http://leaverou.github.io/prefixfree/)

当border-color只设置一个颜色值时，效果和css1中的border-color效果一样，只有设置了n个颜色，并且边框宽度也为n像素，就可以使用css3的border-color属性设置n个颜色，每种颜色显示1像素的宽度，如果宽度值大于颜色数量的值，最后一种颜色用于显示剩下的宽度。

浏览器兼容：目前只有Firefox 3.0以及其以上的版本支持。

####border-image
语法

	border-image:none|<image>[<number>|<percentage>]{1,4}[/<border-width>{1,4}]?[stretch|repeat|round]{0,2}
	
none:默认值，表示边框无背景图片
<image>:设置背景图片，跟background-image一样，可以使用绝对或相对的url地址，来指定边框的背景图片。

#####border-image-source

	border-image-source:url(image url)
	
#####border-image-slice
	
	border-image-slice:[<number>|<percentage>]{}&&fill?
	
border-image-slice在实际应用中它通过border-image-source取到的边框背景图片切成九份，再想background-image一样重新布置。

repeat水平重复、round水平平铺、stretch水平拉伸
#####border-image-width

	boder-image-width:[<length>|<percentage>|<number>|auto]{1,4}
	
#####border-image-repeat

	border-image-repeat:[stretch|repeat|round]{1,2}
	
用来指定边框背景图片的排列方式，默认值为stretch，该属性不支持TRBL原则，只接受两个参数值，第一个值表示水平方向的排列方式，第二个值表示垂直方向的排列方式。

![](image/css3border-image九宫格切线.png =400x)
![](image/css3border-image-slice九宫格.png =260x)

####圆角边框属性
border-radius

语法：

	border-radius:none|<length>{1,4}[/<length>{1,4}]
	
border-radius是一种缩写方式，如果反斜杠符号“/”存在，“/”前面的值是设置元素圆角的水平方向半径，“/”后面的值是设置圆角的垂直方向的变径；如果没有“/”，则元素圆角的水平和垂直方向的半径值相等。另外四个值是按照top-left、top-right、bottom-right和bottom-left顺序来设置的，其主要会有一下四种情形出现。

1. border-radius:<length>{1}设置一个值，元素四个圆角效果一样。
2. border-radius:<length>{2}设置两个值，top-left和bottom-right取第一个值，top-right和bottom-left取第二个值。
3. border-radius:<length>{3}设置三个值，第一个值top-left，第二个值top-right和bottom-left，第三个值bottom-right。
4. border-radius:<length>{4}设置四个值，第一个值top-left，第二个值top-right，第三个值bottom-right，第四个值bottom-left。

<length>由浮点数字和单位标识符组成的长度值，不可以是负值。










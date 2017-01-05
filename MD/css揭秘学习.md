#####DRY
#####抽象泄露法则：所有重大的抽象机制在某种程度上都存在泄露的情况。

#####rgba hsla

#####盒子模型各个部分所处的位置(由上到下)：
- 边框border
- 内容content+内边距padding
- 背景图片background-image
- 背景颜色background-color
- 外边距margin

jQuery方法(width举例)：

- width()
 		
 		width
 		
- innerWidth()   注：相当于原生js的`clientWidth`

		width + padding*2
		
- outerWidth()  注：相当于原生js的`offsetWidth`
		
		width + padding*2 + border*2
		
- outerWidth(true)
	
		width + padding*2 + border*2 + margin*2
		
原始js(width举例)：

- style.width
	
		width //只有内联设置style="width:100px"才有效，css中设置取不到值
	
- clientWidth

		width + padding*2 //可见区域宽
	
- offsetWidth
 
		width + padding*2 + border*2
	
- scrollWidth

		width + padding*2 //正文全文宽
		
####半透明边框（background-clip属性应用）

	background-clip: padding-box;
	
示例：一个容器设置一层白色背景和一道半透明白色边框

	border: 10px solid hsla(0, 0%, 100%, .5);
    background: white;

背景说明：默认情况下, 背景会延伸到边框所在的区域下层，并没有让body的背景 从半透明白色边框处透上来,而是在半透明白色边框处透出了这个容器自己的纯白实色背景,这实际上得到的效果跟纯白实色的边框看起来完全一样。

实现方式：通过 background-clip 属性来调整上述默认行为所带来的不便。这个属性的初始值是border-box,意味着背景会被元素的border box(边框的外沿框)裁切掉。如果不希望背景侵入边框所在的范围,我们要做的就是把它的值设为padding-box,这样浏览器就会用内边距的外沿来把背景裁切掉。

需要代码：

	border: 10px solid hsla(0, 0%, 100%, .5);
    background: white;
    background-clip: padding-box;
    
####多重边框





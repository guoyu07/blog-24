##CSS视觉格式化模型(Visual Formatting Model)
	参考：http://openwares.net/internet/css_visual_formatting_model.html
	CSS视觉格式化模型用于计算如何布置和渲染各种元素,是HTML页面呈现的核心模型。
	块格式化上下文(BFC),行格式化上下文(IFC)和堆叠上下文(SC)都有不同的产生条件和时机.
### 块级元素,块级框,块框,块容器框,匿名块框和块格式化上下文
	块级(block-level)元素在页面上表现为一个块,单独占有一行,与块格式化上下文(Block Formatting Context)中的其他块按顺序垂直排列。浮动是一种特殊情况。当元素的CSS属性display为 block, list-item 或 table 时,它是块级(block-level)元素。
	每个块级元素生成一个主要的块级框(Block-level box)来包含其子框和生成的内容，同时任何定位方案都会与这个主要的框有关。某些块级元素还会在主要框之外产生额外的框：例如“list-item”元素。这些额外的框会相对于主要框来放置。
	除了table框和替换元素块级框,一个块级框可能也是一个块容器框(block container box)。块容器框只包含其他块级框,或者创建一个行内格式化上下文(inline formatting context)从而只包含行内框。
	同时是块容器框的块级框称为块框(block boxes)。并非所有的块容器框都是块级框：非替换的行内块和非替换的table cell也是块容器但不是块级框。
	有时需要添加补充性盒，这些盒称为匿名块框(anonymous box), 它们没有名字，不能被 CSS 选择符选中。不能被 CSS 选择符选中意味着不能用样式表添加样式。这意味着所有继承的 CSS 属性值为 inherit ，所有非继承的 CSS 属性值为 initial 。比如下面一段HTML会生成两个匿名块框,在div内部但在p外部的文本会被匿名块框包裹。
	<div>Some inline text <p>followed by a paragraph</p> followed by more inline text.</div>
	块格式化上下文BFC包含一组相关的块框,这些块框在同一个BFC内按预定规则进行排列。
###行内级元素,行内级框,行内框,行框,匿名行级框和行格式化上下文
	当元素的CSS属性display的计算值为 inline, inline-block 或 inline-table 时，称它为行内级(inline-level)元素。行内级元素与其他行内级元素共享行。行内级元素生成行内级框(inline-level box),同时参与生成行内格式化上下文(inline formatting context)的行内级框称为行内框(Inline boxes)，因此，行内框是行内级框的一种。那些不是行内框的行内级框(例如替换的行级元素、行内块元素、行内表格元素)被称为原子行内级框(atomic inline-level box),因为它们是以单一不透明框的形式来参与其行格式化上下文,原子行内级框在行内格式化上下文IFC里不能分成多行。
	匿名行内框(Anonymous inline boxes)类似于块盒，CSS引擎有时自动生成行内框。这些框也是匿名的，因为它们没有对应的选择器名字。它们继承所有可继承的属性，非继承的属性取 initial。 匿名行内框最常见的例子是块框直接包含文本，文本将包含在匿名行内框中。
	行框(Line boxes)由行内格式化上下文(inline formatting context)产生的框，用于表示一行。在包含块里面，行框从包含快一边排版到另一边。 当有浮动时, 行框从左浮动的最右边排版到右浮动的最左边。行框是行内框的容器,类似于块容器框是块框的容器。
	行内格式化上下文IFC包含一组相关的行内框,这些行内框在同一个IFC内按预定规则进行排列。
###堆叠上下文
	单纯的z-index并不能最终决定元素在Z轴上的排列顺序,还要关系到堆叠上下文(stacking context)。堆叠上下文的优先级要高于z-index。也就是z-index值很大也不一定能排列到Z轴的前面,还要先看所处的堆叠上下文。
	

##CSS替换元素(Replaced element)
###替换元素
	其内容不受CSS视觉格式化模型控制的元素,比如image,嵌入的文档(iframe之类)或者applet,叫做替换元素。比如,img元素的内容通常会被其src属性指定的图像替换掉。替换元素通常有其固有的尺寸:一个固有的宽度,一个固有的高度和一个固有的比率。比如一幅位图有固有用绝对单位指定的宽度和高度,从而也有固有的宽高比率。另一方面,其他文档也可能没有固有的尺寸,比如一个空白的html文档。
	CSS渲染模型不考虑替换元素内容的渲染。这些替换元素的展现独立于CSS。	object,video,textarea,input也是替换元素,audio和canvas在某些特定情形下为替换元素。使用CSS的content属性插入的对象是匿名替换元素。
###固有尺寸
	宽度和高度是有元素自身定义的,不受周围元素的影响。CSS没有定义如何去寻找替换元素的固有尺寸。在CSS 2.1中,只有替换元素可以有固有的尺寸。对于没有可靠的解析度信息的光栅图像,必须假定一个图像源像素为一个px单位。
	一些CSS属性比如vertical-align可能会用到替换元素的固有尺寸或基线。
###非替换元素
	替换元素之外的所有其他元素都是非替换元素,由CSS的视觉格式化模型负责非替换元素的渲染。
###混乱的术语
	看到有些文章中将这两种元素称作可替换元素和不可替换元素,这种叫法很明显是错误的。
	首先，从w3c标准的原始定义中替换元素使用了Replaced而不是Replaceable。
	其次,替换元素和非替换元素是已经被替换(CSS不负责其展示渲染,由其固有属性接管渲染)和不会被替换(由CSS负责展示渲染)，而不是可不可以被替换的概念。
	
###jsonp原理：
    首先在客户端注册一个callback, 然后把callback的名字传给服务器。
    服务器先生成 json 数据。 然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp. 最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。
    客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里.（动态执行回调函数）
    <script type="text/javascript">
    	function jsonpcallback(json) {
        	console.log(json);
    	}
    	var s = document.createElement('script');
    	s.src = 'http://post1.58.com/ky?callback=jsonpcallback';
    	document.body.appendChild(s);
	</script>
    
##z-index
	z-index顺序原则：
	如果没有涉及z-index和position属性的话，堆叠顺序就是元素在HTML中出现的顺序。
	加上position属性的话，就是所有定位了得元素在没有被定位的元素前面。（一个元素被定位的意思这里指的是它有一个position属性，但是不是static，而是relative,absolute等）
	加上z-index属性，首先z-index值越大，越靠前。但是z-index属性只作用在被定位了的元素上。所以如果你在一个没被定位的元素上使用z-index的话，是不会有效果的。还有就是z-index会创建一个堆叠的上下文（Stacking Contexts），我们可以理解为一个层。
###堆叠上下文
	同一个父元素下面的元素会受父元素的堆叠顺序影响，所以堆叠上下文是我们理解z-index和堆叠顺序的关键。
	每一个层都有唯一的根节点。当一个元素创建一个层，那么它的所有子元素都会受到父元素的堆叠顺序影响。意味着如果一个元素位于一个最低位置的层，那你z-index设置得再大，它也不会出现在其它层元素的上面。
	现在我们来说说什么情况下会产生新的层：
    	当一个元素位于HTML文档的最外层（<html>元素）
    	当一个元素被定位了并且拥有一个z-index值（不为auto）
    	当一个元素被设置了opacity，transforms, filters, css-regions, paged media等属性。（通常来讲，如果一个CSS属性需要做一些特效的话，它都会创建一个新的层。）
    同一层里面的堆叠顺序（从后到前）：
    	层的根元素
    	被定位了得元素并且z-index值为负，相同z-index的情况下，按照HTML元素的书写顺序排列，下面相同。
    	没有被定位的元素
    	被定位的元素，并且z-index值为auto
    	被定位了的元素并且z-index值为正。
	注意：z-index值为负的元素比较特殊，他们会先被绘制，意味着他们可以出现在其他元素的后面，甚至出现在它的父元素后面。但是必要条件是该元素必须与父元素处于同一层，并且父元素不是这个层的根元素。

##网页中的ICON
##CSS sprite
- 在国内被称为“css雪碧图”，也叫“css精灵”。它是把网页中一些零星背景图片整合到一张图片文件中，再利用CSS的背景图片定位到要显示的位置，因此也叫“图片拼合”技术。
- 好处：可以减少文件体积和服务器请求次数，加速内容显示，从而提高效率。没请求一次，就会和服务器连接一次，建立连接是需要额外时间的。
- 知识点：
	- background-image，
	- background-position
	- 左上角为坐标原点（0，0），x轴、y轴为负值进行偏移。
	- 控制一个层，可显示的区域范围大小，通过一个窗口，进行背景图的滑动。
- 实现方式：
	- PS手动拼接（费时费力）
	- 使用sprite工具自动生成
		推荐工具：CssGaga(windows环境)www.99css.com/archives/1524
- 特点：
	- 相对单个小图标，它节省文件体积和服务器请求次数
	- 一般情况下，你需要保持为PNG-24的文件格式
	- 可以设计出丰富多彩的颜色图标
- 难点：
	- 你需要预先确定每个小图标的大小
	- 注意小图标与小图标之间的距离
	- 细心和耐心
> sublime操作：ctrl+n新建，ctrl+s保存，输入！按tab键
输入：ul.sprite>li*11>s.s-icon+a{雪碧图}，按tab键生成结构（说明：最外层ul给ul一个class名称sprite,ul标签下是11个li标签，每个li下面就是小图标s标签，给s标签一个名为s-icon的class属性，s标签有个兄弟元素a标签，a标签里面是文本信息）
- 应用场景：
	- 静态图片，不随用户信息的变化而变化
	- 小图片，图片容量比较小
	- 加载量比较大
	-一些大图不建议拼成雪碧图

##font+HTML
- 为什么使用icon fonts
	- 灵活性：轻松地改变图标的颜色或其他css效果；
	- 可扩展：改变图标的大小，就行改变字体大小一样容易；
	- 矢量性：图标是矢量的，与像素无关，缩放图标不会影响清晰度；
	- 兼容性：字体图标支持所有现代浏览器；
	- 本地使用：通过添加定制字体到您的本地系统，你可以在各种不同设计和编辑应用程序中使用他们。
- IcoMoon
	- 官方网址：https://icomoon.io
	- 推荐理由：
		- 免费的图标，免费的应用程序（4000+免费字体图标）。
		- 构建只包含您需要的图标
		- 导入您的矢量图（SVG字体），而不会被上传到服务器。
		- 方便管理图标，除了生成字体，还可以生成SVG。
- 如果把你的图标转化为web字体：http://flowerboys.cn/font/
- 文件字体格式：
	- EOT:Embedded OpenType Fonts(EOT)它是微软开发的用于嵌入网页中的字体，IE专用字体。
	- WOFF:The Web Open Font Format(WOFF)Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，2009年被开发，如今被W3C组织推荐标准
	- TrueType Fonts(TTF)1980s，由Microsoft和Apple联合开发的一套字体标准，是Mac OS和WIN操作系统中最常见的一种字体。
	SVG Fonts(SVG)用于SVG字体渲染的一种格式，他是由W3C定制的开放标准的图形格式。
- @font-face

		详细介绍：http://www.w3.org/TR/css3-fonts/#descdef-src
		@font-face {
			font-family: family-name;
			src: [url[format(<string>#)]?font-face-name]#;
			font-weight: weight;
			font-style: style;
		}
		例：		
		css代码：
		@font-face {
			font-family: "imooc-icon";
			src: url("../fonts/icomoon.eot");/* IE9 兼容模式 */
			src: url("../fonts/icomoon.eot?#iefix") format("embedded-opentype"),
			 	url("../fonts/icomoon.woff") format("woff"),
			 	url("../fonts/icomoon.ttf") format("truetype"),
			 	url("../font/icomoon.svg") format("svg");
			font-weight: normal;
			font-style: normal;
		}
		.imooc-icon{
			font-family: "imooc-icon";
			font-style: normal;
			font-weight: normal;
			font-size: 64px;
			-webkit-font-smoothing: antialiased; /*webkit内核抗锯齿*/
			-moz-osx-font-smoothing: grayscale; /*火狐浏览器osx内核抗锯齿*/
		}
		html代码：&#x+ef05
		<i class="imooc-icon">&#xef05</i>	
	注：
	* 在../font/icomoon.eot后加?变为../font/icomoon.eot?是为了解决IE8以下无法加载字体文件的bug
	* 兼容模式即浏览器模式为IE9,文档模式为IE8或其他

##font+CSS
知识点:

	:before伪元素
		伪元素，创建一个虚假的元素，并插入到目标元素内容之前。
		语法：
			selector: pseudo-element{ 伪元素的语法
				property: value;
			}
			.class: pseudo-element{ 类与伪元素配合使用
				property: value;
			}
	content属性
		在css2.1中被引入，与:before及:after伪元素配合使用，来插入生成内容
		语法：
			content: normal|none|[string|uri|...]
		例：
		css代码：
		h1:before{
			content:"学习";
		}
		html代码：
		<h1>伪元素</h1>
		效果：
		学习伪元素

字体+css例子：

	css代码：
	@font-face {
		font-family: “imooc-icon”;
		src: url("../font/icomoon.eot");/* IE9 兼容模式 */
		src: url("../font/icomoon.eot?#iefix") format("embedded-opentype"),
			 url("../font/icomoon.woff") format("woff"),
			 url("../font/icomoon.ttf") format("truetype"),
			 url("../font/icomoon.svg") format("svg")
		font-weight: normal;
		font-style: normal;
	}
	.imooc-icon{
		font-family: "imooc-icon";
		font-style: normal;
		font-weight: normal;
		font-size: 64px;
		-webkit-font-smoothing: antialiased; //webkit内核抗锯齿
		-moz-osx-font-smoothing: grayscale; //火狐浏览器osx内核抗锯齿
	}
	.icon-music:before{
		content: "\ef05";
	}
	html代码：&#x+f048
	<i class="imooc-icon ">&#xef05</i>	

##border-radius

	
	
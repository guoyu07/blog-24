> 前端工程的3D问题：development、deployment、debugging

##前端性能
性能优化：

- 加载相关
	- 按需加载
	- 延迟加载
	- 预加载
	- 请求合并
- 缓存相关的浏览器
	- 缓存利用
	- 缓存更新
	- 缓存共享
	- 非覆盖式发布等方案
- 复杂的技术
	- BigRender
	- BigPipe
	- Quickling
	- PageCache
	
	
常见的性能优化：

- 压缩资源
- 合并资源
- 添加MD5戳(非覆盖式发布)
- 添加资源域名

##前端的统计和监控
前端的统计和监控一般分为两类：

- 业务统计（业务指标）
	- 用户行为
	- 点击
	- 路径追踪
	- 落地页
	- 滚屏高度  
业务统计的做法：约定页面上某种特殊标签元素，上报的信息写在元素属性中，捕获其上事件，自动上报，日志上报用 new Image().src=xxx.  
- 性能监控（技术指标）
	- T0时间
	- T1时间
	- 首屏时间
	- 可交互时间
	- 页面切换时间（单页应用）
	- 到达率/折损率（网络差）做法：在页面HTML代码中前后3个地方分别打点，判断用户在哪个位置离开
	- JS报错监控：window.onerror(JS报错的收集)
	- 另外还有一类日志，属于前端安全，主要是监控非本网站JS脚本注入。（XSS）

##浏览器结构
![](./image/浏览器架构.png)

- 用户界面：包括地址栏、前进/后退按钮、书签菜单等
- 浏览器引擎：在用户界面和呈现引擎之间传递指令
- 呈现引擎：负责显示请求的内容
	- 网络：用于网络调用，比如HTTP请求。其接口与平台无关，并为所有平台提供底层实现。
	- 用户界面后端：用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
	- JS解析器：用于解析和执行Javascript代码
- 数据存储：这是持久层，浏览器需要在硬盘上保存各种数据。

##从输入URL到页面加载完的过程中都发生了什么事情

- DNS Lookup 查找DNS
- Initial Connection 初始化连接
- Time to First Byte 首字节时间    
	- TTFB(Time to First Byte)-首字节时间，是指从客户端开始和服务端交互到服务端开始向客户端浏览器传输数据的时间（包括DNS、socket连接和请求响应时间），是能够反映服务端响应速度的重要指标。网页重定向越多，TTFB越高，所以要减少重定向。
	- 优化点：
		1. 减少DNS查询
		- 使用CDN
		- 提早Flush
		- 添加周期头
- Content Download 内容下载
- 3xx response
- 4xx+ response
- Start Render 开始渲染  
	- TTSR(Time to Start Render)-开始渲染时间，指某些非空元素开始在浏览器显示时的时间，这也是一项重要指标，即TTSR越短，用户越早浏览器中的内容，心理上的等待时间会越短。过多的CPU消耗会拖慢TTSR，所以网站中有大量图片和脚本往往会造成不良用户体验。
	- 优化点：
		1. 优化TTFB
		- 降低客户端CPU消耗，即页面加载初期不要有大脚本运行，把JS脚本放到页面下方
		- 使用效率较高的CSS选择器，避免使用CSS表达式
		- 避免使用CSS滤镜
- DOM Content Loaded
	- 当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
- On Load
	- 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了
- Document Complete 文档完成
	- TTDC(Time to Document Complete)-文档完成时间，指页面结束加载，可供用户进行操作的时间，等价于浏览器的onload事件触发点。TTDC是比较重要的性能优化对象，TTDC越低，页面加载速度越快，用户等待时间越短。
	- 优化点：
		1. 优化TTFB
		- 优化TTSR
		- 参考YSLOW优化最佳实践
		- 优化首屏时间，将不必要的页面加载放到onload事件之后

##页面渲染流程

![](./image/浏览器页面渲染流程.png)

- 呈现引擎将开始解析HTML文档，并将各标记逐个转化成“内容树”上的DOM节点。同时也会解析外部CSS文件以及样式元素中的样式数据。HTML中这些带有视觉指令的样式信息将用于创建另一个树结构：呈现树。
- 呈现树包含多个带有视觉属性（如颜色和尺寸）的矩形。这些矩形的排列顺序就是他们将在屏幕上显示的顺序。
- 呈现树构建完毕之后，进入“布局”处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。下一个阶段就是绘制，呈现引擎会遍历呈现树，由用户界面后端层将每个节点绘制出来。

attachment 英 ə'tætʃm(ə)nt  n. 附件；依恋；连接物；扣押财产

<br>
参考文档：    
http://www.alloyteam.com/2012/11/performance-writing-efficient-javascript/   
http://www.biaodianfu.com/html5-performance.html   
http://www.alloyteam.com/2015/09/explore-performance/   
http://ourjs.com/detail/54013f22cf8959e84300000c#rd?sukey=fc78a68049a14bb2c6cbc60344e756a3dd689595011387cfc423f83a1a62d3a4a661a6b1c2fd4a343a78bfbcc6060706   

前端优化：BigRender    
http://www.cnblogs.com/szuyuan/p/4199944.html    
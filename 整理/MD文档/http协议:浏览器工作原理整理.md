##浏览器缓存
首先浏览器会根据url查找本地缓存，看是否本地缓存中存在该url的内容，如果不存在，则向服务器请求该url的内容。响应头如果是POST模式递交数据，则返回的页面大部分不会被浏览器缓存，如果你发送内容通过URL和查询（通过GET模式），则返回的内容可以缓存下来供以后使用。

`浏览器缓存机制`

* 主要就是HTTP协议定义的缓存机制（如： Expires； Cache-control等）。
* 也有非HTTP协议定义的缓存机制，如使用HTML Meta标签，Web开发者可以在HTML页面的<head>节点中加入<meta>标签，代码如下：

		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		上述代码的作用是告诉浏览器当前页面不被缓存，每次访问都需要去服务器拉取。但只有部分浏览器可以支持，而且所有缓存代理服务器都不支持，因为代理不解析HTML内容本身。
		
###HTTP协议定义的缓存机制
####Expires
Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。不过Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1。
####Cache-control
Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过Cache-Control的选择更多，设置更细致，如果同时设置的话，其优先级高于Expires。

**`http协议头Cache-Control`**

1. public指示响应可被任何缓存区缓存。
2. private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。
3. no-cache指示请求或响应消息不能缓存
4. no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
5. max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。
6. min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应。
7. max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

**`Last-Modified/If-Modified-Since要配合Cache-Control使用`**

* Last-Modified：标示这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。
* If-Modified-Since：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，则再次向web服务器请求时带上头 If-Modified-Since，表示请求时间。web服务器收到请求后发现有头If-Modified-Since则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；若最后修改时间较旧，说明资源无新修改，则响应HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的cache。

**`Etag/If-None-Match也要配合Cache-Control使用`**

* Etag：web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器觉得）。Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。
* If-None-Match：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Etage声明，则再次向web服务器请求时带上头If-None-Match （Etag的值）。web服务器收到请求后发现有头If-None-Match 则与被请求资源的相应校验串进行比对，决定返回200或304。

**`既生Last-Modified何生Etag？`**

HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题

1. Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间
2. 如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
3. 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。

**`浏览器缓存行为还有用户的行为有关`**

![用户行为与浏览器缓存](./image/UserbehaviorAndBrowserCache.png =600x150 "")

>
优先级   
浏览器端行为：Pragma值校验>Cache-Control值校验>Expires值校验   
服务器行为：Etag校验>Last-Modified校验（其实二者都通过才能返回304的，没这么严格的顺序关系）

![浏览器缓存](./image/browserCache.png "")

##DNS
当浏览器向服务器发送请求，请求一个url对应的资源时，首先是检查是否本地有服务器host的ip，如果没有通过DNS查询来获取服务器的ip。
###DNS查询(dns lookup)过程
![DNS查询](./image/browser_dns_lookup.png "DNS查询")
![DNS查询过程](./image/dnslookup.png "DNS查询过程")
###DNS优化点
* 一是`减少DNS的请求次数`(Reduce DNS Lookups)
* 二是进行`DNS预先获取`

默认情况下浏览器会对页面中和当前域名（正在浏览网页的域名）不在同一个域的域名进行预获取，并且缓存结果，这就是隐式的DNS Prefetch。如果想对页面中没有出现的域进行预获取，那么就要使用显示的dns-prefetch了，也就是使用link标签：

	<link rel=”dns-prefetch” href=”http://www.baidu.com”/>

dns-prefetch应该尽量的放在网页的前面，推荐放在<meta charset=”/>后面。

可以通过下面的标签禁止隐式的DNS Prefetch

	<meta http-equiv=”x-dns-prefetch-control” content=”off”>
	
###相关概念
* ISP(Internet Service Provider)，即因特网服务提供商，能提供拨号上网服务、网上浏览、下载文件、收发电子邮件等服务，是网络最终用户进入Internet的入口和桥梁。它包括Internet接入服务和Internet内容提供服务。这里主要是Internet接入服务，即通过电话线把你的计算机或其他终端设备连入Internet。
* ICP(Internet Content Provider)，是互联网内容提供商，向广大用户综合提供互联网信息业务和增值业务的电信运营商。
在互联网应用服务产业链“设备供应商——基础网络运营商——内容收集者和生产者——业务提供者——用户”中，ISP/ICP处于内容收集者、生产者以及业务提供者的位置。
* CDN(Content Delivery Network)，即内容分发网络。其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。

##HTTP(超文本传输协议)
它是一种通用的，无状态(stateless)的协议，面向应用层的协议。   
Web浏览器、服务器和相关的Web应用程序都是通过HTTP相互通信的。HTTP是现代全球因特网中使用的公共语言。   
Web客户端和服务器   
Web 内容都是存储在 Web 服务器上的。Web 服务器所使用的是 HTTP 协议,因 此经常会被称为 HTTP 服务器。这些 HTTP 服务器存储了因特网中的数据,如果HTTP 客户端发出请求的话,它们会提供数据。客户端向服务器发送 HTTP 请求, 服务器会在 HTTP 响应中回送所请求的数据。HTTP 客户端和 HTTP 服务器共同构成了万维网的基本组件。   
因特网上有数千种不同的数据类型,HTTP 仔细地给每种要通过 Web 传输的对象都打上了名为 MIME 类型(MIME type)的数据格式标签。  
Web 服务器会为所有 HTTP 对象数据附加一个 MIME 类型。当 Web 浏览器从服务器中取回一个对象时,会去查看相关的 MIME 类型,看看它是否知道 应该如何处理这个对象。   
服务器资源名被称为统一资源标识符(Uniform Resource Identifier,URI)
URI 有两种形式,分别称为 URL 和 URN,现在,几乎所有的 URI 都是 URL
统一资源定位符(URL)是资源标识符最常见的形式。URL 描述了一台特定服务器上某资源的特定位置。URL说明了协议、服务器和本地资源
URI 的第二种形式就是统一资源名(URN)。URN 是作为特定内容的唯一名称使用 的,与目前的资源所在地无关。使用这些与位置无关的 URN,就可以将资源四处搬移,URN 仍然处于试验阶段,还未大范围使用，URL 是通过描述资源的位置来标识资 源的,而 URN(本章稍后会介绍)则是通过名字来识别资源的,与它们当前所处位 置无关。
一个 HTTP 事务由一条(从客户端发往服务器的)请求命令和一个(从服务器 发回客户端的)响应结果组成。这种通信是通过名为 HTTP 报文(HTTP message) 的格式化数据块进行的.
每条 HTTP 响应报文返回时都会携带一个状态码。状态码是一个三位数字的代码, 告知客户端请求是否成功,或者是否需要采取其他动作。
HTTP 报文是由一行一行的简单字符串组成的。HTTP 报文都是纯文本,不是二进 制代码,所以人们可以很方便地对其进行读写
从Web客户端发往Web服务器的HTTP报文称为请求报文(request message)。从 服务器发往客户端的报文称为响应报文(response message),此外没有其他类型的 HTTP 报文。
连接--TCP
HTTP 是个应用层协议。HTTP 无需操心网络通信的具体细节;它把联网的细节都交给了通用、可靠的因特网传输协议 TCP/IP。
在HTTP客户端向服务器发送报文之前,需要用网际协议(Internet Protocol,IP) 地址和端口号在客户端和服务器之间建立一条 TCP/IP 连接。
在TCP中，需要知道服务器的IP地址和与服务器上运行特定软件相关的TCP端口号。
基本的浏览器连接处理
步骤如下:(a) 浏览器从 URL 中解析出服务器的主机名;(b) 浏览器将服务器的主机名转换成服务器的 IP 地址; (c) 浏览器将端口号(如果有的话)从 URL 中解析出来; (d) 浏览器建立一条与 Web 服务器的 TCP 连接;(e) 浏览器向服务器发送一条 HTTP 请求报文;(f) 服务器向浏览器回送一条 HTTP 响应报文;(g) 关闭连接,浏览器显示文档。
HTTP 代理服务器,这是 Web 安全、应用集成以及性能优化的重要组成模块。代理位于客户端和服务器之间,接收所有客户端的 HTTP 请求,并 将这些请求转发给服务器(可能会对请求进行修改之后转发)。对用户来说,这些应 用程序就是一个代理,代表用户访问服务器。出于安全考虑,通常会将代理作为转发所有 Web 流量的可信任中间节点使用。代理 还可以对请求和响应进行过滤。
网关(gateway)是一种特殊的服务器,作为其他服务器的中间实体使用。通常用于 将 HTTP 流量转换成其他的协议。网关接受请求时就好像自己是资源的源端服务器 一样。客户端可能并不知道自己正在与一个网关进行通信。
URL的一般格式为(带方括号[]的为可选项)：

　　protocol :// hostname[:port] / path / [;parameters][?query]#fragment
　　URL由三部分组成：协议类型，主机名和路径及文件名

方法是用来告诉服务器做什么事情的,状态码则用来告诉客户端,发生了什么事情。
状态码是在每条响应报文的起始行中返回的
200 到 299 之间的状态码表示成功。 
300 到 399 之间的代码表示资源已经被移走了。
400 到 499 之间的代码表示客户端 的请求出错了。
500 到 599 之间的代码表示服务器出错了。

TCP连接
所有的 HTTP 通信都是由 TCP/IP 承载的,TCP/IP 是全球计算机及网络设备都在使用的一种常用的分组交换网络分层协议集。
客户端应用程序可以打开一 条 TCP/IP 连接,连接到可能运行在世界任何地方的服务器应用程序。一旦连接建 立起来了,在客户端和服务器的计算机之间交换的报文就永远不会丢失、受损或 失序。
HTTP 连接实际上就是 TCP 连接及其使用规则。
TCP 的数据是通过名为 IP 分组(或 IP 数据报)的小数据块来发送的。
HTTP就是“HTTP over TCP over IP”这个“协议栈”中的最顶层 了
其安全版本 HTTPS 就是在 HTTP 和 TCP 之间插入了一个(称为 TLS 或 SSL 的)密码加密层
IP 地址可以将你连接到正确的计算机, 而端口号则可以将你连接到正确的应用程序上去。
TCP 连接是通过 4 个值来识别的:< 源 IP 地址、源端口号、目的 IP 地址、目的端口号 >
HTTP 事务的时延有以下几种主要原因。(1) 客户端首先需要根据 URI 确定 Web 服务器的 IP 地址和端口号。如果最近没有对 URI 中的主机名进行访问,通过 DNS 解析系统将 URI 中的主机名转换成一个 IP 地址可能要花费数十秒的时间 3。(2) 接下来,客户端会向服务器发送一条 TCP 连接请求,并等待服务器回送一个请 求接受应答。每条新的 TCP 连接都会有连接建立时延。这个值通常最多只有一 两秒钟,但如果有数百个 HTTP 事务的话,这个值会快速地叠加上去。(3) 一旦连接建立起来了,客户端就会通过新建立的 TCP 管道来发送 HTTP 请求。 数据到达时,Web 服务器会从 TCP 连接中读取请求报文,并对请求进行处理。因特网传输请求报文,以及服务器处理请求报文都需要时间。(4) 然后,Web 服务器会回送 HTTP 响应,这也需要花费时间。
这些 TCP 网络时延的大小取决于硬件速度、网络和服务器的负载,请求和响应报文 的尺寸,以及客户端和服务器之间的距离。
TCP连接的握手时延建立一条新的 TCP 连接时,甚至是在发送任意数据之前,TCP 软件之间会交换一系 列的 IP 分组,对连接的有关参数进行沟通。如果连接只用来传送少量 数据,这些交换过程就会严重降低 HTTP 的性能。
TCP 连接握手需要经过以下几个步骤。(1) 请求新的 TCP 连接时,客户端要向服务器发送一个小的 TCP 分组(通常是 40 ~ 60 个字节)。这个分组中设置了一个特殊的 SYN 标记,说明这是一个连接请求。(参见图 4-8a)。(2) 如果服务器接受了连接,就会对一些连接参数进行计算,并向客户端回送一个 TCP 分组,这个分组中的 SYN 和 ACK 标记都被置位,说明连接请求已被接受(参见图 4-8b)。(3) 最后,客户端向服务器回送一条确认信息,通知它连接已成功建立(参见图 4-8c)。现代的 TCP 栈都允许客户端在这个确认分组中发送数据。
Web 服务器可以用文件的扩展名来说明 MIME 类型。Web 服务器会为每个资源 扫描一个包含了所有扩展名的 MIME 类型的文件,以确定其 MIME 类型。这种 基于扩展名的类型相关是最常见的
代理连接的是两个或多个使用相同协议的应用程序,而网关连接的则是 两个或多个使用不同协议的端点。网关扮演的是“协议转换器”的角色,即使客户 端和服务器使用的是不同的协议,客户端也可以通过它完成与服务器之间的事务 处理。
代理服务器可以看到并接触到所有流过的 HTTP 流量,所以代理可以监视 流量并对其进行修改,以实现很多有用的增值 Web 服务。
使用拦截代理时,浏览器无法检测出已停用服务器的 IP 地址
• 在第(1)步中,用户在浏览器的URI地址窗口中输入oreilly。• 在第(2a)步中,浏览器通过DNS查找主机oreilly,但DNS服务器失败了,并回送响应说明主机未知,如第 (2b) 步所示。• 在第(3a)步中,浏览器进行了自动扩展,将oreilly转换成www.oreilly.com。在第 (3b) 步中,浏览器通过 DNS 来查找主机 www.oreilly.com。这一次,如第 (3c)步所示,DNS 服务器成功了,将 IP 地址返回给了浏览器。• 在第(4a)步中,客户端已经成功解析了主机名,并有了一张IP地址列表。有些IP 地址可能已经停用了,所以,通常客户端会尝试着连接每个 IP 地址,直到成 功为止。但对拦截代理来说,第一次连接请求就会被代理服务器拦截成功,不会 连接到原始服务器上去。客户端认为它在与 Web 服务器进行成功的对话,但那 个 W eb 服务器可能甚至都不处于活跃状态。• 当代理最终准备好与真正的原始服务器进行交互时[第(5b)步],代理可能会发 现那个 IP 地址实际指向的是一个已停用的服务器。为了提供与浏览器相同级别 的容错机制,代理可以通过解析 Host 首部的主机名,也可以通过对 IP 地址的反向 DNS 查找来尝试其他 IP 地址。将浏览器配置为使用显式代理时,它们会依赖 代理的容错机制,所以对拦截和显式的代理实现来说,在 DNS 解析到已停用服 务器时,提供容错机制是很重要的。现在,在将 Web 请求从客户端传送到服务器的路径上,经过两个或多个代理是很 常见的(参见图 6-19)。比如,出于安全和节省费用的考虑,很多公司都会用缓存 代理服务器来访问因特网,而且很多大型 ISP 都会使用代理缓存来提高性能并实现 各种特性。现在,有相当比例的 Web 请求都是通过代理转发的。同时,出于性能原 因,把内容复制到遍布全球的替代物缓存库中的情形也越来越常见了。
服务器再验证
• 如果再验证显示内容发生了变化,缓存会获取一份新的文档副本,并将其存储在 旧文档的位置上,然后将文档发送给客户端。• 如果再验证显示内容没有发生变化,缓存只需要获取新的首部,包括一个新的过 期日期,并对缓存中的首部进行更新就行了
缓存并不一定要为每条请求验证文档的有效性——只有在文档 过期时它才需要与服务器进行再验证。这样不会提供陈旧的内容,还可以节省服务 器的流量,并拥有更好的用户响应时间。
用条件方法进行再验证
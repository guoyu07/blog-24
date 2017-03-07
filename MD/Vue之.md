参考：    
Vuex 2.0 源码分析：   
[http://gold.xitu.io/post/58352aaf880741006cfd65af?utm_source=gold_browser_extension](http://gold.xitu.io/post/58352aaf880741006cfd65af?utm_source=gold_browser_extension)

[Vuex 2.0 源码分析](http://www.infoq.com/cn/articles/source-code-vuex2?utm_campaign=rightbar_v2&utm_source=infoq&utm_medium=articles_link&utm_content=link_text)

[Vue 2.0: 渐进式前端解决方案](http://www.infoq.com/cn/presentations/vue-2-progressive-front-end-solution?utm_campaign=rightbar_v2&utm_source=infoq&utm_medium=presentations_link&utm_content=link_text)

[vuejs官网](http://cn.vuejs.org/v2/guide/)

##vue
**渐进式框架**    
尽可能简单的 API 实现**响应的数据绑定**和**组合的视图组件**。

##安装
	# 全局安装 vue-cli
	$ npm install --global vue-cli
	# 创建一个基于 webpack 模板的新项目
	$ vue init webpack vue-project
	# 安装依赖
	$ cd vue-project
	$ npm install
	$ npm run dev
	
##v-bind 绑定
`v-bind` 属性被称为指令。指令带有前缀 `v-`，以表示它们是 Vue.js 提供的特殊属性。它们会在渲染过的 DOM 上应用特殊的响应式行为。

	<span v-bind:title="message"></span>
	
这个指令的简单含义是说：将这个元素节点的 title 属性和 Vue 实例的 message 属性绑定到一起。

##v-if 条件
	<div id="app-3">
	  <p v-if="seen">Now you see me</p>
	</div>
	
	var app3 = new Vue({
	  el: '#app-3',
	  data: {
	    seen: true
	  }
	})
	
##v-for 循环

	<div id="app-4">
	  <ol>
	    <li v-for="todo in todos">
	      {{ todo.text }}
	    </li>
	  </ol>
	</div>
	
	var app4 = new Vue({
	  el: '#app-4',
	  data: {
	    todos: [
	      { text: 'Learn JavaScript' },
	      { text: 'Learn Vue' },
	      { text: 'Build something awesome' }
	    ]
	  }
	})
	
##v-on 
绑定一个监听事件用于调用我们 Vue 实例中定义的方法。

	<div id="app-5">
	  <p>{{ message }}</p>
	  <button v-on:click="reverseMessage">Reverse Message</button>
	</div>
	
	var app5 = new Vue({
	  el: '#app-5',
	  data: {
	    message: 'Hello Vue.js!'
	  },
	  methods: {
	    reverseMessage: function () {
	      this.message = this.message.split('').reverse().join('')
	    }
	  }
	})
	
##v-model
双向数据绑定

	<div id="app-6">
	  <p>{{ message }}</p>
	  <input v-model="message">
	</div>
	
	var app6 = new Vue({
	  el: '#app-6',
	  data: {
	    message: 'Hello Vue!'
	  }
	})


##Vue实例

实例属性和方法

实例生命周期
![](../images/vue/vue_lifecycle.png)

##指令

>指令（Directives）是带有 v- 前缀的特殊属性。指令属性的值预期是`单一 JavaScript 表达式（`除了 v-for）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上。

v-bind 指令被用来响应地更新 HTML 属性.
v-on 指令用于监听 DOM 事件.

###参数
一些指令能接受一个“参数”，在指令后以冒号指明。

	<a v-bind:href="url"></a>
	
###修饰符
修饰符（Modifiers）是以半角句号 . 指明的特殊后缀，用于指出一个指定应该以特殊方式绑定。

例如：.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

	<form v-on:submit.prevent="onSubmit"></form>

###过滤器
Vue.js 允许你自定义过滤器，被用作一些常见的文本格式化。`过滤器应该被添加在 mustache 插值的尾部，由“管道符”指示`：

	{{ message | capitalize }}
	
	<!-- in mustaches -->
	{{ message | capitalize }}
	<!-- in v-bind -->
	<div v-bind:id="rawId | formatId"></div>
	
过滤器设计目的就是用于文本转换。为了在其他指令中实现更复杂的数据变换，你应该使用计算属性。
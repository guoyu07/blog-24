#设计模式（Design pattern）
##外观模式（Facade）又叫门面模式
为子系统中的一组接口提供了一个一致的界面，此模块定义了一个`高层接口`，这个接口值得这一子系统更加容易使用。

外观模式不仅简化类中的接口，而且对接口与调用者也进行了解耦。它可以将一些`复杂操作封装起来`，并创建一个`简单的接口用于调用`。

外观模式可以让我们间接调用子系统，从而避免因直接访问子系统而产生不必要的错误。

外观模式的优缺点：

* 优势：**易于使用，而且本身也比较轻量级。**
* 缺点：**外观模式被开发者连续使用时会产生一定的性能问题，因为在每次调用时都要检测功能的可用性。**

**何时使用外观模式？**

* 首先，在设计初期，应该要有意识地将不同的两个层分离，比如经典的三层结构，在数据访问层和业务逻辑层、业务逻辑层和表示层之间建立外观Facade。
* 其次，在开发阶段，子系统往往因为不断的重构演化而变得越来越复杂，增加外观Facade可以提供一个简单的接口，减少他们之间的依赖。
* 第三，在维护一个遗留的大型系统时，可能这个系统已经很难维护了，这时候使用外观Facade也是非常合适的，为系统开发一个外观Facade类，为设计粗糙和高度复杂的遗留代码提供比较清晰的接口，让新系统和Facade对象交互，Facade与遗留代码交互所有的复杂工作。

**门面模式的作用：**

1. 简化类的接口
2. 消除类与使用它的客户代码之间的耦合。

javascript是一种事件驱动的语言。
web应用程序开发尽量提高工作效率。
对象检查或浏览器嗅探技术。

###用作便利方法的门面元素
门面模式给予开发人员的另一个好处表现在`对函数的组合上`。这些组合而得的函数又叫`便利函数（convenience function）`.

下面是一个纯粹形式化的例子：

	function a(x){
		//do stuff here...
	}
	
	function b(y){
		//do stuff here...
	}
	
	function ab(x, y){
		a(x);
		b(y);
	}

为什么不一开头就把所有功能都放到函数ab中去。答案是分别提供a、b和ab这几个函数可以`获得更多颗粒度控制和灵活性`。组合a和b可能会对应用程序照成破坏或者产生意想不到的结果。

一个用门面模式实现便利方法的理想案例：
	
	var DED = window.DED || {};
    DED.util = {
        stopPropagation: function (e) {
            if (e.stopPropagation) {
                //w3c interface
                e.stopPropagation();
            } else {
                //IE's interface
                e.cancelBubble = true;
            }
        },
        preventDefault: function (e) {
            if (e.preventDefault) {
                //w3c interface
                e.preventDefault();
            } else {
                //IE's interface
                e.returnValue = false;
            }
        },
        stopEvent: function (e) {
            DED.util.stopPropagation(e);
            DED.util.preventDefault(e);
        }
    };

事件工具
	
	var DED = window.DED || {};
    DED.util = DED.util || {};
    
    DED.util.Event = {
        getEvent: function (e) {
            return e || window.event;
        },
        getTarget: function (e) {
            return e.target() || e.srcElement;
        },
        stopPropagation: function (e) {
            if (e.stopPropagation) {
                //w3c interface
                e.stopPropagation();
            } else {
                //IE's interface
                e.cancelBubble = true;
            }
        },
        preventDefault: function (e) {
            if (e.preventDefault) {
                //w3c interface
                e.preventDefault();
            } else {
                //IE's interface
                e.returnValue = false;
            }
        },
        stopEvent: function (e) {
            DED.util.stopPropagation(e);
            DED.util.preventDefault(e);
        }
    };

门面模式的适用场合

- 判断是否应用门面模式的关键在于`辨认那些反复成组出现的代码`。
- 应对javascript内置函数在不同浏览器中的不同表现。

*当两个或更多的方法可能普遍的被一起调用时，创建另一个方法以包装重复的方法调用是非常有意义的。*

###总结
门面模式可用来创建便利函数，这些函数为执行各种复杂任务提供了一个简单的接口。他们使代码更容易维护和理解。他们可能弱化子系统和客户代码的耦合。便利方法有助于简化常见的重复性任务，以及把经常相伴出现的常用函数组合在一起。这个模式在DOM脚本编程这个需要面对各种不一致的浏览器接口的环境中很常用。

##中介者模式（Mediator）
用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

中介者是一个`行为设计模式`，通过提供一个统一的接口让系统的不同部分进行通信。

一般，如果系统有很多子模块需要直接沟通，都要创建一个`中央控制点`让其各模块通过该中央控制点进行交互。中介者模式可以让这些子模块不需要直接沟通，而达到进行解耦的目的。

在JavaScript里，中介者非常常见，相当于`观察者模式上的消息Bus`，只不过不像观察者那样通过调用pub/sub的形式来实现，而是通过`中介者统一来管理`.

在观察者的基础上来给出一个例子：

	var mediator = (function () {
        // 订阅一个事件，并且提供一个事件触发以后的回调函数
        var subscribe = function (channel, fn) {
            if (!mediator.channels[channel]) {
                mediator.channels[channel] = [];
            }
            mediator.channels[channel].push({context: this, callback: fn});
            return this;
        }
        // 广播事件
        var publish = function (channel) {
            if (!mediator.channels[channel]) {
                return false;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
                var subscription = mediator.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }
            return this;
        };

        return {
            channels: {},
            publish: publish,
            subscribe: subscribe,
            installTo: function (obj) {
                obj.subscribe = subscribe;
                obj.publish = publish;
            }
        };
    }());

    //调用代码，相对就简单了：
    (function (Mediator) {
        function initialize() {
            // 默认值
            mediator.name = "dudu";
            // 订阅一个事件nameChange
            // 回调函数显示修改前后的信息
            mediator.subscribe('nameChange', function (arg) {
                console.log(this.name);
                this.name = arg;
                console.log(this.name);
            });
        }

        function updateName() {
            // 广播触发事件，参数为新数据
            mediator.publish('nameChange', 'tom'); // dudu, tom
        }

        initialize(); // 初始化
        updateName(); // 调用
    })(mediator);

一个完整的例子：

	<div id="results"></div>
	<script>
	    function Player(name) {
	        this.points = 0;
	        this.name = name;
	    }
	    Player.prototype.play = function () {
	        this.points += 1;
	        mediator.played();
	    };
	    var scoreboard = {
	        // 显示内容的容器
	        element: document.getElementById('results'),
	        // 更新分数显示
	        update: function (score) {
	            var i, msg = '';
	            for (i in score) {
	                if (score.hasOwnProperty(i)) {
	                    msg += '<p><strong>' + i + '<\/strong>: ';
	                    msg += score[i];
	                    msg += '<\/p>';
	                }
	            }
	            this.element.innerHTML = msg;
	        }
	    };
	
	    var mediator = {
	        // 所有的player
	        players: {},
	        // 初始化
	        setup: function () {
	            var players = this.players;
	            players.home = new Player('Home');
	            players.guest = new Player('Guest');
	        },
	        // play以后，更新分数
	        played: function () {
	            var players = this.players,
	            score = {
	                Home: players.home.points,
	                Guest: players.guest.points
	            };
	            scoreboard.update(score);
	        },
	        // 处理用户按键交互
	        keypress: function (e) {
	            e = e || window.event; // IE
	            if (e.which === 49) { // 数字键 "1"
	                mediator.players.home.play();
	                return;
	            }
	            if (e.which === 48) { // 数字键 "0"
	                mediator.players.guest.play();
	                return;
	            }
	        }
	    };
	
	    // go!
	    mediator.setup();
	    window.onkeypress = mediator.keypress;
	
	    // 30秒以后结束
	    setTimeout(function () {
	        window.onkeypress = null;
	        console.log('Game over!');
	    }, 30000);
	</script>
###中介者和观察者的区别
- 观察者模式：没有封装约束的单个对象，相反，观察者Observer和具体类Subject是一起配合来维护约束的，沟通是通过多个观察者和多个具体类来交互的：每个具体类通常包含多个观察者，而有时候具体类里的一个观察者也是另一个观察者的具体类。
- 中介者模式：所做的不是简单的分发，却是扮演着维护这些约束的职责。

###中介者和外观模式的区别
中介者和外观模式他们都是对现有各模块进行抽象。

- 中介者所做的是在`模块之间进行通信，是多向的`.
- 外观模式只是为`某一个模块或系统定义简单的接口`而不添加额外的功能。系统中的其它模块和外观模式这个概念没有直接联系，可以认为`是单向性`。

###总结
中介者模式一般应用于一组对象已定义良好但是以复杂的方式进行通信的场合，一般情况下，中介者模式很容易在系统中使用，但也容易在系统里误用，当系统出现了多对多交互复杂的对象群时，先不要急于使用中介者模式，而是要思考一下是不是系统设计有问题。

另外，由于中介者模式把交互复杂性变成了中介者本身的复杂性，所以说中介者对象会比其它任何对象都复杂。

##观察者模式（Observer）又叫发布订阅模式（Publish/Subscribe）















参考文档：http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html
<hr>
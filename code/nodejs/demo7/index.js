/**
 * 自定义事件发射器
 */
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();

/*//或写成
var events = require('events');
var channel = new events.EventEmitter();*/


//用on方法给事件发射器添加监听器
channel.on('join', function () {
    console.log("自定义事件发射器");
});

//用emit函数发射这个事件
channel.emit('join');

function asyncFun(callback) {
    setTimeout(callback, 200);
}
var color = 'blue';
(function (color) {
    asyncFun(function () {
        console.log('The color is' + color);
    })
})(color);
color = 'green';
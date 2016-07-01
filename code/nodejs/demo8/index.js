//通过回调让异步程序按顺序执行
setTimeout(function () {
    console.log("This is the first task!");
    setTimeout(function () {
        console.log("This is the next task!");
        setTimeout(function () {
            console.log("This is the last task!");
        }, 100);
    }, 500);
}, 1000);

//借助nimble流程控制工具让异步程序按顺序执行
var nimble=require('nimble');
nimble.series([function(callback){
    setTimeout(function () {
        console.log("nimbe This is the first task!");
        callback();
    }, 1000);
},function(callback){
    setTimeout(function () {
        console.log("nimbe This is the next task!");
        callback();
    }, 500);
},function(callback){
    setTimeout(function () {
        console.log("nimbe This is the last task!");
        callback();
    }, 100);
}]);


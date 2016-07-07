#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

//引入核心模块repl
var repl = require('repl');
//创建一个REPL
var r = repl.start('> ');
//context即为REPL中的上下文环境
var c = r.context;

c._load = function () {
    //测试repl_module_test.js模块代码
    var replModuleTest = require("./repl_module_test");
    c.rma = replModuleTest.add;
};

// 在REPL中执行reload()可重新加载模块
c.reload = function () {
    var t = Date.now();
    // 清空当前项目根目录下所有文件的缓存
    var dir = path.resolve(__dirname) + path.sep;
    for (var i in require.cache) {
        if (i.indexOf(dir) === 0) {
            delete require.cache[i];
        }
    }
    // 重新执行初始化
    c._load();
    console.log('OK. (spent %sms)', Date.now() - t);
};

c._load();

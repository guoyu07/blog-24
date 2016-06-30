console.log("初始化:");
console.log("1 exports:");
console.log(exports);
console.log("1 module.exports");
console.log(module.exports);
console.log("1 exports===module.exports? "+(exports===module.exports)+"\n");

var varTest = "luna";
function sayHello() {
    console.log("say hello!");
}

exports.varTest = varTest;
console.log("使用exports导出变量varTest: exports.varTest = varTest");
console.log("2 exports:");
console.log(exports);
console.log("2 module.exports");
console.log(module.exports);
console.log("2 exports===module.exports? "+(exports===module.exports)+"\n");

module.exports = sayHello;
console.log("使用module.exports导出方法sayHello: module.exports = sayHello");
console.log("3 exports:");
console.log(exports);
console.log("3 module.exports");
console.log(module.exports);
console.log("3 exports===module.exports? "+(exports===module.exports)+"\n");
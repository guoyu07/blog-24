var nameVar = "nameVar 变量";
function sayHelloFun() {
    console.log("sayHelloFun 方法");
}

console.log("导出前:");
console.log("1 exports:");
console.log(exports);
console.log("1 module.exports");
console.log(module.exports);
console.log("1 exports===module.exports? " + (exports === module.exports) + "\n");

exports.nameVar = nameVar;
console.log("使用exports导出变量nameVar: exports.nameVar = nameVar;");
console.log("2 exports:");
console.log(exports);
console.log("2 module.exports");
console.log(module.exports);
console.log("2 exports===module.exports? " + (exports === module.exports) + "\n");

module.exports = sayHelloFun;
console.log("使用module.exports导出方法sayHelloFun: module.exports = sayHelloFun;");
console.log("3 exports:");
console.log(exports);
console.log("3 module.exports");
console.log(module.exports);
console.log("3 exports===module.exports? " + (exports === module.exports) + "\n");
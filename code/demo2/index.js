var module1 = require("./module1.js");
var module2 = require("./module2.js");
var module3 = require("./module3.js");
var module4 = require("./module4.js");

console.log("module1");
module1();

console.log("module2");
console.log(module2.name);
module2.sayHello();

console.log("module3");
console.log(module3.name);
module3.sayHello();

console.log("module4");
console.log(module4.name);
module4.sayHello();
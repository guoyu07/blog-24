var module1 = require("./module1.js");
console.log("require module1");
module1();

var module2 = require("./module2.js");
console.log("require module2");
console.log(module2.nameVar);
module2.sayHelloMethod();

var module3 = require("./module3.js");
console.log("require module3");
console.log(module3.nameVar);
module3.sayHelloMethod();

var module4 = require("./module4.js");
console.log("require module4");
console.log(module4.nameVar);
module4.sayHelloMethod();
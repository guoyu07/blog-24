##isPrototypeOf
是用来判断指定对象object1是否存在于另一个对象object2的原型链中，是则返回true，否则返回false。

`原型链可以用来在同一个对象类型的不同实例之间共享功能。`
  
如果 object2 的原型链中包含object1，那么 isPrototypeOf 方法返回 true。 

如果 object2 不是一个对象或者 object1 没有出现在 object2 中的原型链中，isPrototypeOf 方法将返回 false。  
 
格式： object1.isPrototypeOf(object2); 

##hasOwnProperty
判断一个对象是否有名称的属性或对象，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。 

如果该属性或者方法是该 对象自身定义的而不是器原型链中定义的 则返回true;否则返回false; 
 
判断proName的名称是不是object对象的一个属性或对象。
    
格式： object.hasOwnProperty(proName); 
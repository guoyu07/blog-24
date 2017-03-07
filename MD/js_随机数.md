参考：   
计算机程序的思维逻辑 (34) - 随机   
[http://gold.xitu.io/post/580f6a31c4c9710058a33221](http://gold.xitu.io/post/580f6a31c4c9710058a33221)

计算机程序的思维逻辑 (31) - 剖析Arrays     
[http://gold.xitu.io/post/58043a6da0bb9f00588bcab1](http://gold.xitu.io/post/58043a6da0bb9f00588bcab1)

计算机程序的思维逻辑 (38) - 剖析 ArrayList
[http://gold.xitu.io/post/581bdff18ac247004fe09b8e](http://gold.xitu.io/post/581bdff18ac247004fe09b8e)

计算机程序的思维逻辑 (39) - 剖析LinkedList   
[http://gold.xitu.io/post/58204cd2a0bb9f0058bd388f](http://gold.xitu.io/post/58204cd2a0bb9f0058bd388f)

计算机程序的思维逻辑 (40) - 剖析 HashMap   
[http://gold.xitu.io/post/58214b25a22b9d0067dd824a?utm_source=gold_browser_extension](http://gold.xitu.io/post/58214b25a22b9d0067dd824a?utm_source=gold_browser_extension)

##指定范围的随机数
技术点：

- `Math.random()` 这个函数可以生成 `[0,1)` 的一个随机数。
- `Math.round(x)` 把数四舍五入为最接近的整数。(先上)
- `Math.floor(x)` 对数进行下舍入。
- `Math.ceil(x)` 方法执行的是向上取整计算，它返回的是大于或等于函数参数，并且与之最接近的整数。

边界值：涉及范围的话，就有个边界值的问题。这样就包含四种情况：

1. min ≤ r ≤ max
	1. 算出 max-min的值，假设等于range
	- Math.random()*range
	- Math.random()*range+min
	- Math.round(Math.random()*range+min) 或者 Math.ceil(Math.random()*range+min)
	
- min ≤ r < max
	1. 算出 max-min的值，假设等于range
	- Math.random()*range
	- Math.random()*range+min
	- parseInt(Math.random()*range+min, 10)

- min < r ≤ max
	1. 算出 max-min的值，假设等于range
	- Math.random()*range
	- Math.random()*range+min
	- Math.floor(Math.random()*range+min) + 1

- min < r < max
	1. 算出 max-min-2的值，假设等于range
	- Math.random()*range
	- Math.random()*range+min+1
	- Math.round(Math.random()*range+min+1) 或者 Math.ceil(Math.random()*range+min+1)

### min ≤ r ≤ max

	  /**
	   * 最小值: Min
	   * 最大值: Max
	   * 范围: Max - Min
	   * 公式: Min + Math.random() * (Max - Min)
	   * 取整处理: Min + Math.round(Math.random() * (Max - Min))
	   */
		function RandomNumBoth(Min,Max){
		      var Range = Max - Min;
		      var Rand = Math.random();	      
		      var num = Min + Math.round(Rand * (Range)); //四舍五入
		      return num;
		}

### min ≤ r < max
	
	function RandomNum(Min, Max) {
	      var Range = Max - Min;
	      var Rand = Math.random();
	      var num = Min + Math.floor(Rand * Range); //舍去
	      return num;
	}

### min < r ≤ max
	
	function RandomNum(Min, Max) {
	      var Range = Max - Min;
	      var Rand = Math.random();
	      if(Math.round(Rand * Range)==0){       
	        return Min + 1;
	      }
	      var num = Min + Math.round(Rand * Range);
	      return num;
	}

### min < r < max 

	function RandomNum(Min, Max) {
	      var Range = Max - Min;
	      var Rand = Math.random();
	      if(Math.round(Rand * Range)==0){
	        return Min + 1;
	      }else if(Math.round(Rand * Max)==Max){
	        return Max - 1;
	      }else{
	        var num = Min + Math.round(Rand * Range) - 1;
	        return num;
	      }
	 }

##0到9的随机数
	  function random_0_9() {
	    return parseInt(Math.random() * 10, 10);
	  }
	  console.log("0到9的随机数:" + random_0_9());
	  
##a到z的随机字符

	  function random_a_z() {
	    var charCode_a = "a".charCodeAt();//97
	    var charCode_z = "z".charCodeAt();//122
	    var charCode = Math.round(charCode_a + Math.random() * (charCode_z - charCode_a));
	    return String.fromCharCode(charCode);
	  }
	  console.log("a到z的随机字符:" + random_a_z());
	  
技术点：

- `String.fromCharCode(Unicode)` 可接受一个指定的 Unicode 值，然后返回一个字符串。
- `stringObject.charCodeAt(index)` 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
	  
##A到Z的随机字符

	  function random_A_Z() {
	    var charCode_A = "A".charCodeAt();//65
	    var charCode_Z = "Z".charCodeAt();//90
	    var charCode = Math.round(charCode_A + Math.random() * (charCode_Z - charCode_A));
	    return String.fromCharCode(charCode);
	  }
	  console.log("A到Z的随机字符:" + random_A_Z());
	  
##指定的特殊字符随机

	  function random_special_chars(special_chars) {
	    if (!special_chars) {
	      var special_chars = "!@#$%^&*_=+-/";
	    }
	    //0<= index <special_chars.length
	    var index = Math.floor(Math.random() * special_chars.length);
	    return special_chars.charAt(index);
	  }
	  console.log("指定的特殊字符:" + random_special_chars());
  
##n位随机密码
###n位数字密码
注：几位就生成几个随机数

	  /**
	   * 位数: n
	   */
	  function randomNumber(n) {
	    var result=[];
	    for(var i=0;i<n;i++){
	      result.push(parseInt(Math.random()*10,10));
	    }
	    return result.join("");
	  }

##n位密码，字符可能有大写字母、小写字母、数字和特殊符号组成

	  var CustomRandom = {
	    rule: {
	      /*
	       * 0到9的随机数
	       */
	      random_0_9: function () {
	        return parseInt(Math.random() * 10, 10);
	      },
	      /*
	       * A到Z的随机数
	       */
	      random_A_Z: function () {
	        var charCode_A = "A".charCodeAt();//65
	        var charCode_Z = "Z".charCodeAt();//90
	        var charCode = Math.round(charCode_A + Math.random() * (charCode_Z - charCode_A));
	        return String.fromCharCode(charCode);
	      },
	      /*
	       * a到z的随机数
	       */
	      random_a_z: function () {
	        var charCode_a = "a".charCodeAt();//97
	        var charCode_z = "z".charCodeAt();//122
	        var charCode = Math.round(charCode_a + Math.random() * (charCode_z - charCode_a));
	        return String.fromCharCode(charCode);
	      },
	      /*
	       * 随机取指定的特殊字符集合中的一个字符
	       * @param special_chars 特殊字符集合字符串,不传则默认为[!@#$%^&*_=+-/]
	       */
	      random_special_chars: function (special_chars) {
	        if (!special_chars) {
	          var special_chars = "!@#$%^&*_=+-/";
	        }
	        //0<= index <special_chars.length
	        var index = Math.floor(Math.random() * special_chars.length);
	        return special_chars.charAt(index);
	      }
	    },
	    /*
	     * 共有多少种规则
	     */
	    getRuleTotal: function () {
	      return Object.keys(this.rule).length;//IE8以下不支持Object.keys()方法
	    },
	    /*
	     * 取随机字符
	     */
	    getRandomChar: function (type) {
	      if (type == undefined) {
	        var type = Math.floor(Math.random() * this.getRuleTotal());
	      }
	      switch (type) {
	        case 0:
	          return this.rule.random_0_9();
	        case 1:
	          return this.rule.random_a_z();
	        case 2:
	          return this.rule.random_A_Z();
	        default:
	          return this.rule.random_special_chars();
	      }
	    },
	    /*
	     * n 位随机字符串
	     */
	    getRandomString: function (n) {
	      var randomString = "";
	      for (var i = 0; i < n; i++) {
	        randomString += this.getRandomChar();
	      }
	      return randomString;
	    },
	    /*
	     * 至少要含一个大写字母、一个小写字母、一个特殊符号、一个数字的 n 位随机字符。
	     */
	    getRandomComplexString: function (n) {
	      //校验 n 暂时忽略 注:所有的输入都要校验
	      //创建了一个长度为n的数组,数组元素默认值为undefined。
	      var arr = new Array(n);
	      // type <= n,type最大值为4,因为是由: 数字、大写字母、小写字母、特殊符号集合组成的
	      var type = this.getRuleTotal();
	      if (n < type) {
	        type = n;
	      }
	      //每种type生成一个随机数随机放到数组中
	      for (var i = 0; i < type; i++) {
	        var arr_index = Math.floor(Math.random() * n);
	        //如果该下标下已经有数据再随机生成一个下标,直到没有数据为止
	        while (arr[arr_index] != undefined) {
	          arr_index = Math.floor(Math.random() * n);
	        }
	        arr[arr_index] = this.getRandomChar(i);
	      }
	      //生成剩余随机数放到数组中
	      for (var j = 0; j < n; j++) {
	        if (arr[j] == undefined) {
	          arr[j] = this.getRandomChar();
	        }
	      }
	      return arr.join("");
	    }
	  };
	
	  console.log("至少要含一个大写字母、一个小写字母、一个特殊符号、一个数字的8位密码:" + CustomRandom.getRandomComplexString(8));

	  

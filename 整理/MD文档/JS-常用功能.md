##全角转半角
>半角空格为`32`，全角空格为`12288`，相差`12256`   
其他字符半角(`33-126`)与全角(`65281-65374`)的对应关系是：均相差`65248` 

全角转半角
	<pre>
	function QtoB(str){
		var result="";
		var i=0;
		for(i<str.length;i++){
			if(str.charCodeAt(i)==12288){
				result+= String.fromCharCode(str.charCodeAt(i)-12256);
　　　　			continue;
			}
			if(str.charCodeAt(i)>65280 && str.charCodeAt(i)<65375){ 
				result+= String.fromCharCode(str.charCodeAt(i)-65248);
			}else {
				result+= String.fromCharCode(str.charCodeAt(i));
			}
		}
		return result;
	}
	</pre>
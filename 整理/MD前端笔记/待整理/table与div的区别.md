##table与div的区别
1. 速度和加载方式的区别    
	div 和 table 的差异不是速度，而是加载方式，速度只能是指网络速度，如果速度足够快，是没有差异的。     
	`div 的加载方式是即读即加载`，遇到 \<div> 没有遇到 \</div> 的时候一样加载 div 中的内容，读多少加载多少；`table 的加载方式是完成后加载`，遇到 \<table> 后，在读到 \</table> 之前，table 中的内容不加载，或者传输中断了(document.onload()事件)的时候加载，这是因为table牵涉到多行多列问题,所以只有当table所有内容加载完毕,IE才知道该怎么显示.
- 在网页应用中的差别    
	如果页面首尾加 table ，那么必须等整个页面读完了才加载.     
	如果页面首尾加 div ，无任何影响.
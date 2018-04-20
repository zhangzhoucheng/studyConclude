
new_element=document.createElement("script"); 
new_element.setAttribute("type","text/javascript"); 
new_element.setAttribute("src","js/a.js");// 在这里引入了a.js 
document.body.appendChild(new_element); 
b1=function(){
	
	alert(2);
	t1();
	
}

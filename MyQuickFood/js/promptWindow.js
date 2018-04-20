initPrams=function(){
	    var staX=0,staY=0;//鼠标的初始位置
	    var mouseSta=false;
	    var proNowX;//当前弹窗位置，定义在这里是优化，点击弹窗自动居中的bug
	    var proNowY;
	    var sTop=$(window).scrollTop();//滚轮位置
	    var winTop=$(window).height();//浏览器高度
		var winLeft=$(window).width();//浏览器宽度
		var nowTop=sTop+winTop*0.25//弹窗的初始位置纵坐标
		var nowLeft=winLeft*0.275;//弹窗的初始位置横坐标
		var mouX=0,mouY=0;//当前鼠标位置
		var befTop=winTop*0.25;
		//绑定函数
			$(window).on("scroll",function setMoveLock(e){
							//给大的窗口即在外部的滚轮加上事件,让弹窗一直保持屏幕中
								//alert(1);
								sTop=$(window).scrollTop();//获取滚动条高度
								befTop=befTop;//获取上次状态的距离window上边缘的高度
								nowTop=sTop+befTop;//获取上次状态的距离window上边缘的高度
								$(".prompt_pop").css("top",""+nowTop+"px");/* $(".prompt_pop").css("display","block"); */

						});//滚动条滚动，弹窗保持浏览器中部不移动
			
			$(".prompt_pop").on("mousedown",function mouseDow(e){
									console.log("t1");
								    $(".prompt_pop").css("cursor","Move");
									  e = e||window.event;//由于不是通过function(e)传参格式，所以要这样获取参数，表示是事件
									staX = e.pageX || e.clientY ;
									staY = e.pageY || e.clientY + document.body.scrollTop;
									console.log(staX+","+staY);
									mouseSta=true;
									//$(".prompt_pop").css({"top":""+proNowY+"px","left":""+proNowX+"px"});

								});
			
			$(".prompt_pop").on("mousemove",function mouseMov(){
									console.log("t2");
									if(mouseSta){
									sTop=$(window).scrollTop();//滚轮到顶部高度
									console.log("b:"+sTop);
									var  e = window.event;//由于不是通过function(e)传参格式，所以要这样获取参数，表示是事件
									mouX = e.pageX || e.clientY ;//当前鼠标位置
									mouY = e.pageY || e.clientY + document.body.scrollTop;
							        proNowX=nowLeft+mouX-staX;
								    proNowY=nowTop+mouY-staY;
									$(".prompt_pop").css({"top":""+proNowY+"px","left":""+proNowX+"px"});
									}
							    });//待优化
			
			$(".prompt_pop").on("mouseup",function mouseUp(){
									befTop=proNowY-sTop;
									nowLeft=proNowX;
									nowTop=proNowY;
									$(".prompt_pop").css("cursor","default");
									mouseSta=false;
								});
			
			$(".prompt_pop").on("mouseleave",function(e){mouseSta=false;})
			
			$(".prompt_pop").children().on("mousedown mouseup mousemove",function(e){ mouseSta=false;e.stopPropagation();e.cancelBubble=true;});//阻止事件冒泡，不触发父元素
			
}

function replyReply(){//点击回复后弹窗
	
			
			$(".black_overlay").css("display","block");
			$(".prompt_pop").css({"display":"block"});
			/*$("body").children().css({"opacity":"0.5"});//opacity子父元素透明度问题，可以用background的rgab（0，0，0，0.5）实现
			$(".prompt_pop").css("opacity","1");*/
			$(".prompt_pop").siblings().css("opacity","0.5");//当然这种方式实现才是技巧
			$(".prompt_pop").parents().siblings().css("opacity","0.5");
			sTop=$(window).scrollTop();//获取滚动条高度
			befTop=befTop;//获取上次状态的距离window上边缘的高度
			nowTop=sTop+befTop;//获取上次状态的距离window上边缘的高度
			$(".prompt_pop").css("top",""+nowTop+"px");/* $(".prompt_pop").css("display","block"); */

		}
function cancleRep(){//弹窗取消回复
			/*$("body").children().not(".prompt_pop").css({"opacity":"1"});*/
			$(".prompt_pop").siblings().css("opacity","1");//当然这种方式实现才是技巧
			$(".prompt_pop").parents().siblings().css("opacity","1");
			$(".black_overlay").css("display","none");
			$(".prompt_pop").css({"display":"none"});
		}
$(function(){
	$(".prompt_pop").before("<div class='black_overlay'></div>");
	$(".black_overlay").css({"display":"none","position":"absolute","top":"0%","left":"0%","width":"100%","height":"100%","z-index":"1001"});
	$(".prompt_pop").css({"display":"none","position":"absolute","top":"25%","left":"27.5%","width":"40%","height":"55%","padding":"20px","border":"1px solid #EEEEEE","border-top":"10px solid orange",
	"background-color":"white","z-index":"1002","overflow":"auto","color":"black","text-align":"center"});
	
	initPrams();
	$(".get-pop").on("click",replyReply);
	$(".cancle-pop").on("click",cancleRep);
	//禁止复制等
			document.oncontextmenu=new Function('event.returnValue=false;');
			document.onselectstart=new Function('event.returnValue=false;');
})


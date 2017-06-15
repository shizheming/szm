// JavaScript Document
$(function(){
	/*setInterval(function(){if(aaa==3){
					$("#tu").animate({left:"0px"},500);
					aaa=0;
				}else{
					$("#tu").animate({left:"-="+"512px"},500);
					aaa++;	
				};
				$(".fang div").eq(aaa).addClass("ccc").siblings().removeClass("ccc");},1000)*/
		var aaa=0;
			$("#next").click(function hoo(){
				if(aaa==3){
					$("#tu").animate({left:"0px"},500);
					aaa=0;
				}else{
					$("#tu").animate({left:"-="+"512px"},500);
					aaa++;	
				};
				$(".fang div").eq(aaa).addClass("ccc").siblings().removeClass("ccc");
			});
			$("#pre").click(function(){
				if(aaa==0){
					$("#tu").animate({left:"-="+"1536px"},500);
					aaa=3;
				}else{
					$("#tu").animate({left:"+="+"512px"},500)
					aaa--;	
				};
				$(".ppp").eq(aaa-1).addClass("ccc").siblings().removeClass("ccc");
			});
	
	
	/*function asd(){
				if(aaa==3){
					$("#tu").animate({left:"0px"},500);
					aaa=0;
				}else{
					$("#tu").animate({left:"-="+"512px"},500);
					aaa++;	
				};
				$(".fang div").eq(aaa).addClass("ccc").siblings().removeClass("ccc");
			}*/
	
	
	
	
	
	$(".fff").click(function(){
		$(".qqq .iii").addClass("uuu").removeClass("iii");//removeClass里面只能直接写class名不能后代的选择器,加class的话会有优先级的覆盖问题(在css里面用后代选择器命名一个元素给他属性，然后在这个指向的元素上面加addClass属性不会有效果，因为你用的后代级别高于直接给个元素addClass)
	});
	
	
	
	
	
	
	/*var o=[
		"images/ex09.jpg",
		"images/ex09.jpg",
		"images/ex09.jpg",
		"images/ex09.jpg"
	]
	$("#small img").each(function(index){
		$(this).mouseenter(function(){
			$("#big img").attr("src",o[index])
		})
	});*/
	$("#small img").mouseenter(function(){
		//$("#big img").attr({src:($(this).attr("src"))});
		$("#big img").attr("src",$(this).attr('src'));
	});
	
	
	
	
	
	
	
	var kl=[
		"img/1.jpg",
		"img/2.jpg",
		"img/4.jpg",
		"img/5.jpg",
	];
	$("#hhh2 img").each(function(index,it){
		$(this).mouseenter(function(){
			//var i=$(this).attr("alt");
			$("#hhh1 img").fadeTo(200,0,
				function(){$(this).attr("src",kl[index]).fadeTo(200,1)}
			)//.end().css({"border":"1px #ccc solid"})//end()是$()之后到这个之前的全都不算，而写在end（）后面的属性只针对最前面的$()
		});
	})
		
	
	
	
	
	
	
	
	
	
	
	$("#kuai").text($("#nav_1  li:first").attr("title"));
	$("#nav_1  li").click(function(){
		qwe=100;
		asd=$(this).prevAll().length;
		$("#kuai").animate({marginLeft:qwe*asd},500);
		$("#kuai").text($(this).attr("title"));
	});
	
	
	
	
	
	
	
	
	imgi=0;//注意变量声明在里面和外面的不同
	$("#next2").click(function(){//这个就是把图片全部放在一个div里，然后动这个div的距离，而不是动某一张图片
		if(imgi==2){
			$("#banner2 #tu2").animate({left:0});
			imgi=0;
		}else{
			$("#banner2 #tu2").animate({left:-128*(imgi+1)});
			imgi++;
			//document.title=imgi;
		};
	});
	
	
	

	
	
	
	
	$("#banner3_list a:not(:first)").hide();
	$("#banner3_info").text($("#banner3_list a:first img").attr("title"));
	$("#banner3 li").click(function(){
		i=$(this).index();
		$("#banner3_info").text($("#banner3_list a").eq(i).find("img").attr("title"));
		$("#banner3_list a").filter(":visible").fadeOut(500)//.parent().children().eq(i).fadeIn(500);
		setTimeout(function(){
			$("#banner3_list a").filter(":hidden").parent().children().eq(i).fadeIn(500)
		},1000)
		$(this).addClass("on").siblings().removeClass("on");
	});
	//setInterval(hoo,2000)asd为什么取得到，改个名字就不行了
	
	
	
	
	
	
	
	/*$("a").click(function(){
	$(this).hide("slow");
	return false;
	});
	点击超链接，超链接就会慢慢的消失。
	"return false"表示保留默认行为，因此页面不会跳转。
	这里有一个jQuery的技巧不得不提一下：jQuery的链式操作，什么是链式操作呢？ 我们来看看，本来应该写成这样子的：
	$(".stripe tr").mouseover(function(){
	$(this).addClass("over");})
	$(".stripe tr").mouseout(function(){
	$(this).removeClass("over"); })
	但是我们写成了：
	$(".stripe tr").mouseover(function(){
	$(this).addClass("over");}).mouseout(function(){
	$(this).removeClass("over");})
	因为鼠标移入移除都是发生在同一个对象上的，所以我们可以将发生在同一个对象上的动作连起来写，这样子如果有很多对象并且在他们身上发生了很多动作那么就会节省很多代码。
	
	alert($("#css").find("#rain").end().html());
	//输出： <div id="rain">测试</div>
	//    从上面可以看出，
	//   end()结束对 "#rain" 的引用而返回到 "#css "
	//   所以" html()" 是对于 "#css" 起作用的
	//   如果不加end() 则 "html()"是对 #rain 起作用
	//可以修改jQuery选定并且以end()结束的方法有：
	//add()
	//children()
	//eq()
	//filter()
	//find()
	//gt()
	//lt()
	//next()
	//not()
	//parent()
	//parents()
	//siblings()
	});
	
	单条滚动的新闻写法1
	function scroll_news(){
		$(function(){
		  $('#dvmq li').eq(0).fadeOut('slow',function(){ 
			// alert($(this).clone().html());
			//克隆:不用克隆的话，remove()就没了。
			$(this).clone().appendTo($(this).parent()).fadeIn('slow');
			$(this).remove();
			});
		 });
	}
	setInterval('scroll_news()',1000);
	 
	单条滚动的新闻写法2
	function AutoScroll(obj){
		$(obj).find("ul:first").animate({
			marginTop:"-25px"
		},1000,function(){
		$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
		});
	}
	$(document).ready(function(){
		setInterval('AutoScroll("#scrollDiv")',3000)
	});
	*/
	
	
	
	
	
	
	
	$(function(){
		$(window).scroll(function(){
		var top=$(window).scrollTop();
		if(top>500){
			$("#scrolltop").fadeIn();
		}else{
			$("#scrolltop").fadeOut();
		}
	});
	//点击返回头部效果
	$("#scrolltop").click(function(){
		$("html,body").animate({scrollTop:0},220);
		});
	});
	
	
	
	
	
	var cene=0;
	var lee=100;
	
		$("#yyyy").click(function(){
			if(cene<=3){
			$("#szm1").animate({left:cene*lee+"px"},"slow");
			cene++;
			};
		});
	$("#uuuu").click(function(){
		if(cene>=-3){
		$("#szm1").animate({left:cene*lee+"px"},"slow");
		cene--;
			};
	})
	

	
	
	
	
	
	
});
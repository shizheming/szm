// JavaScript Document
$(function(){
	$("#go").toggle(function(){
		$("#one").animate({ marginLeft:200},function(){
			$(this).animate({marginTop:200},function(){
				$(this).animate({marginLeft:400},function(){
					$(this).animate({marginTop:400},function(){
						$(this).animate({marginLeft:600},function(){
							$(this).animate({marginTop:600})
						})
					})
				})	
			})  
	  	});
	},function(){
		$("#one").animate({ marginLeft:400},function(){
			$(this).animate({marginTop:400},function(){
				$(this).animate({marginLeft:200},function(){
					$(this).animate({marginTop:200},function(){
						$(this).animate({marginLeft:0},function(){
							$(this).animate({marginTop:0})
						})
					})
				})	
			})  
	  	});
	})
	
	//var $this=$(this).find("img");
	$(".women").each(function(index,item){
		var $this=$(item).find("img");
		$(item).click(function(){
			//$this这个定义要放在click事件里面的吗，外面不行吗,那个例子是放在each里面的
			$(item).animate({width:$this.width(),height:$this.height()})	
			$this.animate({marginLeft:0,marginTop:0})
		});
		$("#s1").click(function(){
			$(item).animate({width:200,height:150})	
			$this.animate({marginLeft:"-150",marginTop:"-150"})
		});
	})
	
	
	
	
	var $app=$("<div id='qingchu'><img src='img/3.jpg' /></div>");
	$app.appendTo("body")//.css("display","none");
	var $app_img=$app.find("img")
	$app.hide();
	//alert($app_img.width())
	$("#mohu").click(function(){
		$(this).find("img").animate({width:400,height:268},function(){
			$app.addClass("jia1").fadeIn()
		})
		
	})
	
	
	
	
	//alert($("#po").offset().top)
	
	$("#po").click(function(e){
		var X=e.pageX;
		var Y=e.pageY;
		alert(X+","+Y)
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
})
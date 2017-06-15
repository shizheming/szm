// JavaScript Document
$(function(){
	
	
	/*$("li").each(function(i){
		alert(i+":"+$(this).text())
	});*/
	
	$(".search-input").bind({
		focus:function(){
			$(this).animate({width:"180px"},500);
		},focusout:function(){
			$(this).animate({width:"117px"},500)
		}
	});
	
	
	
	
	$.fn.center = function () {
        this.css("position","absolute");
        this.css("top", ( jQuery(window).height() - this.height() ) / 2+jQuery(window).scrollTop() + "px");
        this.css("left", ( jQuery(window).width() - this.width() ) / 2+jQuery(window).scrollLeft() + "px");
        return this;
      }
    $(".modal-profile").center();
	/*$(".modal-profile").css("position","absolute");
	$(".modal-profile").css("top", ( jQuery(window).height() - this.height() ) / 2+jQuery(window).scrollTop() + "px");
	$(".modal-profile").css("left", ( jQuery(window).width() - this.width() ) / 2+jQuery(window).scrollLeft() + "px");*/
    $('.modal-lightsout').css("height", jQuery(document).height());
    $('a[rel="modal-profile"]').click(function() {
        $('.modal-profile').fadeIn("slow");
        $('.modal-lightsout').fadeTo("slow", .9);
    });
    $('a.modal-close-profile, .modal-lightsout').click(function() {
        $('.modal-profile').fadeOut("slow");
        $('.modal-lightsout').fadeOut("slow");
    });	
	
	
	
	$("#over").hide();
	$("#hover").hide();
	$("#warp").hover(function(){
		$("#over").fadeTo(500, .7);
		$("#hover").show().css("left","-450px").animate({left:0},500);
	},function(){
		$("#over").fadeTo(500, 0);
		$("#hover").animate({left:450},500);
	});
	
	
	
	/*$("#next").click(function(){
		if(myclick==4){
			myclick=1;
			$("#girl_nei").animate({left:0},500);
		}else{
			$("#girl_nei").animate({left:myclick*myleft+"px"},500);
			//$("#girl_nei").animate({left:"+="+"-478px"},500);//left=left+478px
			myclick++;
		};
		document.title=myclick;
	});*/
	
	
	
	
	
	/*var myclick=0;
	var myleft=478;
	$('#girl_nei').css('width',$('#girl_nei .king').length*myleft);//不用css设置它的宽度，而是要计算出来的
	$("#next").click(function(){
		if(myclick==($('#girl_nei .king').length-1)){
			myclick=0;
			$("#girl_nei").animate({left:0},500);
		}else{
			myclick++;
			$("#girl_nei").animate({left:-myclick*myleft},500);
		};
		document.title=myclick;
	});
	
	 
	$("#pre").click(function(){
		//$("#girl_nei").animate({left:"-="+"-478px"},500)
		if(myclick==0){
			myclick=$('#girl_nei .king').length-1;
			$("#girl_nei").animate({left:-myleft*($('#girl_nei .king').length-1)},500);
		}else{
			myclick--;
			$("#girl_nei").animate({left:-myclick*myleft},500);
		};
		document.title=myclick;
	});*/
	
	var myclick=0;
	var myleft=478;
	var jiri=0;
	$('#girl_nei').css('width',$('#girl_nei .king').length*myleft);
	$("#next2").click(function(){
		$("#girl_nei").animate({marginLeft:-478},500,function(){
			$("#girl_nei").append($(".king").first());	
			$("#girl_nei").css("margin-left","0");
		});
		if(jiri==3){
			jiri=0;
			$("#number a").eq(jiri).removeClass("r2").addClass("r1").siblings().removeClass("r1");
		}else{
			$("#number a").eq(jiri+1).removeClass("r2").addClass("r1").siblings().removeClass("r1")
			jiri++;	
		};
	});
	
	$("#pre").click(function(){
		$("#girl_nei").css('margin-left',-478).prepend($(".king").last());
		$("#girl_nei").animate({marginLeft:0},500);
		if(jiri==0){
			jiri=3;
			$("#number a").eq(jiri).removeClass("r2").addClass("r1").siblings().removeClass("r1");
		}else{
			jiri--;
			$("#number a").eq(jiri).removeClass("r2").addClass("r1").siblings().removeClass("r1");
		}
	});
	
	
	/*var tt=setInterval(function(){
			$("#next2").trigger("click")
		},2000);
		$('#girl').mouseover(function(){
			clearInterval(tt)
		})
		$('#girl').mouseout(function(){
			tt = setInterval(function(){
				$("#next2").trigger("click")
			},2000);
		})*/
	

	
	
	
	
	
	$(".scroll").click(function(event){
		//event.preventDefault();//这个有什么用
		
		var full_url = this.href;
		
		//$(".scroll").each(function(index,item){
			//alert(index+item)
		//})
		//alert($(".scroll").attr("href"))//.attr取是取到第一个，设置是设置一个匹配的集合
		
		var parts = full_url.split("#");//aboutus,this.href.split("#")[1]
		var trgt = parts[1];
		
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;
		
		//goto that anchor by setting the body scroll top to anchor top
		$('html, body').animate({scrollTop:target_top}, 500);
	});
	
	$("#my01").hide()
	//$("#my01").fadeIn(2000,function(){$(this).fadeOut(2000)})//.fadeOut(2000)
	
	
	
	
	
	
	var mm1=0;
	var mm2=470;
	var arg=0;
	$("#girl_nei2").css("width",$("#girl_nei2 .king2").length*mm2)
	$("#k1").css({opacity:.1});
	$("#k1").click(function(){
		if(arg==0){}else{
			$("#girl_nei2").animate({left:"+=470px"});
			if(arg==4){
				$("#warp_small").animate({left:"0"});
				$("#empty").animate({left:"348px"});
			}else{
				$("#empty").animate({left:"-=116px"});
			};
			if(arg==1){
				$("#k1").animate({opacity:.1},300);
			}
			if(arg==$("#girl_nei2 img").length-1){
				$("#k2").animate({opacity:1},300)
			}
			arg--;
			$("#alt").animate({top:"505px"},function(){
				$("#alt").animate({top:"455px"});
				$("#warp_alt").text($("#girl_nei2 img").eq(arg).attr("alt"))
			})
		}
	});
	$("#k2").click(function(){
		if(arg==7){}else{
			$("#girl_nei2").animate({left:"-=470px"});
			if(arg==3){
				$("#warp_small").animate({left:"-465px"});
				$("#empty").animate({left:"-1px"})
			}else{
				$("#empty").animate({left:"+=116px"})
			};
			if(arg==$("#girl_nei2 img").length-2){
				$("#k2").animate({opacity:.1},300)
			}
			if(arg==0){
				$("#k1").animate({opacity:1},300)
			}
			arg++;
			$("#alt").animate({top:"505px"},function(){
				$("#alt").animate({top:"455px"});
				$("#warp_alt").text($("#girl_nei2 img").eq(arg).attr("alt"))
			})
		};
	});
	var em=116;
	$("#small_img img").each(function(index,item){
		$(item).click(function(){
			$("#empty").animate({left:em*(index)});
			$("#girl_nei2").animate({left:(index)*(-mm2)});
			arg=index;//arg重新赋值，这样就相等了
			$("#alt").animate({top:"505px"},function(){
				$("#alt").animate({top:"455px"});
				$("#warp_alt").text($("#girl_nei2 img").eq(index).attr("alt"))
			})
		})
	});
	$("#small_img2 img").each(function(index,item){
		$(item).click(function(){
			$("#empty").animate({left:em*(index)});
			$("#girl_nei2").animate({left:(index+4)*(-mm2)});
			arg=index+4;
			//alert(arg)
			$("#alt").animate({top:"505px"},function(){
				$("#alt").animate({top:"455px"});
				$("#warp_alt").text($("#girl_nei2 img").eq(index+4).attr("alt"))
			})
		})
	});
	
	
	
	
	
})
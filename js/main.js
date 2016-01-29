$(function(){
	var aImg = [
				'./images/kongchongbao.png', './images/kongchongbaoblur.png',
				'./images/ETC.png', './images/ETCblur.png',
				'images/xiangtongka.png', 'images/xiangtongkablur.png',
				'images/shengqianbao.png', 'images/shengqianbaoblur.png',				 
				'images/yunyingzhicheng.png', 'images/yunyingzhichengblur.png', 
				'images/lvtongche.png', 'images/lvtongcheblur.png' ],
		aText = [ '空充宝', 'ETC辅助终端', 'ETC卡网上营业厅(湘通卡)', '高速省钱宝', 'ETC运营支撑平台', '绿通车稽查系统'],
		iText = 0,
		len = aImg.length,
		lilen = len/2,
		arr = [],
		btn = true, //判断首页的transform是否结束
		btn2 = true,
		ul = $('.slidepic'), //首页UL
		li,
		str = '',
		popWindowbg = $('#popWindowbg'), //弹窗背景
		popWindow = $('.popWindows'); //弹窗
	
	
	for (var i = 0; i < len; i+=2) {
		str += '<li><a href="javascript:;"><img src="'+ aImg[i] +'"><img src="'+ aImg[i+1] +'"></a></li>';
	};
	ul.append( $(str) );
	li = ul.find('li');
	for(var i = 0; i < lilen; i++){
		arr.push(i);
	};
	
	/*首页布局初始化*/

	var iH=$(window).height();
	$('.showlist').hide();


	var liWidth = li.width(),
		ulWidth = ul.width(),
		centerPos = (ulWidth - liWidth)/2,
		leftPos = -ulWidth*.3,
		rightPos = ulWidth*.3;
	li.css({'left': centerPos, '-webkit-transform': 'scale(.8) translateX(0px) ', 'opacity': 0});
	li.eq(arr[0]).css({'-webkit-transform': 'scale(1.8) ', 'z-index': 10, 'opacity': 1});
	li.eq(arr[1]).css({'-webkit-transform': 'scale(1) translateX('+ rightPos +'px)', 'z-index': 1, 'opacity': 1}).find('img').eq(1).css({'opacity': 1});
	li.eq(arr[lilen - 1]).css({'-webkit-transform': 'scale(1) translateX('+ leftPos +'px)', 'z-index': 1, 'opacity': 1}).find('img').eq(1).css({'opacity': 1});

	$('.title').eq(0).html(aText[arr[0]]).siblings('.titile').css('opacity', 0);
	
	/*设置首页上拉ul下的li高度*/
	/*$('.showlist li').css('height',(iH/10)+'px');
	var showlih=$('.showlist li').eq(0).height();
	$('.showlist img').css({'height':showlih*0.85+'px','width':showlih*0.85+'px','marginTop':showlih*0.07+'px'});*/

	/*点击download下载*/
	$('.download').on('click', function(){
		window.open('APKdownload/'+ aText[nowPopWindow] +'.apk');
	});
	/*点击share分享*/
	$('.share').on('click', function(){
		alert('一起来玩华软集团的移动应用"'+aText[nowPopWindow]+'"吧！真的很方便,请点击' + window.location.href + 'APKdownload/'+ aText[nowPopWindow] +'.apk  下载');
	});


	/*首页右按钮*/
	$('.btnright').on('click', function(){
		moveRight($(this));
		
	});
	/*首页左按钮*/
	$('.btnleft').on('click', function(){
		moveLeft($(this));
	});

	/*首页左右滑动*/
    var x1,x2,y1,y2,xDelta = 0,yDelta = 0,transX = 0,transY = 0;
    var btn3=true;

   /* $('.showlist').on({
    	'touchstart':function(e){
    		btn3=false;
    	},
    	'touchmove':function(e){
    		if($('.showlist ul').position().top>=0){
    			btn3=true;
    		}
    	},
    	'touchend':function(e){
    		btn3=true;
    	}

	})*/

	$('#slidecontent').on({
		'touchstart':function(e){
						
			if(!e.touches.length) return;
	
			x1 = e.touches[0].pageX;
			y1 = e.touches[0].pageY;
			x2 = xDelta = transX = 0;
			y2 = yDelta = transY = 0;

		},
		'touchmove':function(e){
			if(!btn3) return;
			if(!e.touches.length) return;  
			//e.preventDefault();              
			x2 = e.touches[0].pageX;
			y2 = e.touches[0].pageY;
			transX = x2 - x1;
			transY = y2 - y1;
			xDelta = Math.abs(transX);
			yDelta = Math.abs(transY);
			//console.log($('.showlist').scrollTop())
			//e.preventDefault();	
			if(!JSON.parse($('.showlist').attr('isTop'))){
				e.preventDefault();	
			}			
			
		},
		'touchend':function(e){ // 可触发了 
	
			var direction = swipeDirection(xDelta, yDelta, transX, transY)
			
			//console.log('x1:' + x1 +'x2:' + x2 +'y1:' + y1 +'y2:' + y2 )
			if(direction == "Left"){
				moveLeft ($('.btnleft'));					
			}
			else if(direction == "Right"){
				moveRight($('.btnright')); 					
			}
			else if(direction == "Top" && !JSON.parse($('.showlist').attr('isTop'))){
				console.log(111)
				moveTop($('.slidepic'));
			}
			else if(direction == "Down" && $('.showlist').scrollTop() == 0 ){
				moveDown($('.slidepic'));
			}



		}

	});	



	$('.arrowTop').click(function(){
		moveTop($('.slidepic'));
	});
	$('.arrowBottom').click(function(){
		moveDown($('.slidepic'));
	});

	function moveLeft(_self){
		_self.find('span').addClass('spanshow');
		_self.siblings('a').find('span').removeClass('spanshow');

		if(!btn) return;
		btn = false;

		li.css({'-webkit-transition': 'all 800ms ease'}).find('img').eq(1).css({'-webkit-transition': 'all 800ms ease'});
		li.eq(arr[0]).css({'-webkit-transform': 'scale(1) translateX('+ leftPos +'px)', 'z-index': 1}).find('img').eq(1).css({'opacity': 1});
		li.eq(arr[1]).css({'-webkit-transform': 'scale(1.8) translateX(0px)', 'z-index': 10}).find('img').eq(1).css({'opacity': 0});;
		li.eq(arr[lilen - 1]).css({'-webkit-transform': 'scale(.8) translateX(0px)', 'z-index': 1, 'opacity': 0}).find('img').eq(1).css({'opacity': 1});;
		li.eq(arr[2]).css({'-webkit-transform': 'scale(1) translateX('+ rightPos +'px)', 'z-index': 1, 'opacity': 1}).find('img').eq(1).css({'opacity': 1});

		arr.push(arr.shift());
		iText = (iText+1)>1 ? 0 : 1;
		$('.title').eq(iText).html(aText[arr[0]]).addClass('titleshow').removeClass('titlehide').siblings('.title').addClass('titlehide').removeClass('titleshow');
		li.on('webkitTransitionEnd', function(){
			btn = true;
		});
	};
	function moveRight(_self){
		_self.find('span').addClass('spanshow');
		_self.siblings('a').find('span').removeClass('spanshow');
		if(!btn) return;
		btn = false;
		li.css({'-webkit-transition': 'all 800ms ease'}).find('img').eq(1).css({'-webkit-transition': 'all 800ms ease'});
		li.eq(arr[0]).css({'-webkit-transform': 'scale(1) translateX('+ rightPos +'px)', 'z-index': 1}).find('img').eq(1).css({'opacity': 1});
		li.eq(arr[1]).css({'-webkit-transform': 'scale(.8) translateX(0px)', 'z-index': 1, 'opacity': 0}).find('img').eq(1).css({'opacity': 1});
		li.eq(arr[lilen - 1]).css({'-webkit-transform': 'scale(1.8) translateX(0px)', 'z-index': 10}).find('img').eq(1).css({'opacity': 0});;
		li.eq(arr[lilen - 2]).css({'-webkit-transform': 'scale(1) translateX('+ leftPos +'px)', 'z-index': 1, 'opacity': 1}).find('img').eq(1).css({'opacity': 1});
		arr.unshift(arr.pop());
		iText = (iText+1)>1 ? 0 : 1;
		$('.title').eq(iText).html(aText[arr[0]]).addClass('titleshow').removeClass('titlehide').siblings('.title').addClass('titlehide').removeClass('titleshow');
		li.on('webkitTransitionEnd', function(){
			btn = true;
		})
	}

	function moveTop(_this){
		$('.showlist').show();
		_this.css({'-webkit-transform':'translateY(-250px)','-webkit-opacity':'0','-webkit-transition':'200ms ease'});
		$('.showlist').css({'-webkit-transform':'translateY(0)', '-webkit-opacity':'1','-webkit-transition':'500ms ease'}).attr({'isTop': true});	
		$('.btnleft').hide();
		$('.btnright').hide();
		$('.title').hide();
		$('.copy').hide();
		$('.logo').css({'-webkit-transform': 'translateX(-50%) scale(.6)', 'top': '2%'});
		$('.arrowTop').css({'-webkit-opacity':'0','-webkit-transition':'100ms ease','z-index':10});
		//$('.arrowBottom').css({'-webkit-opacity':'1','-webkit-transition':'700ms ease','z-index':11});
		setTimeout(function(){
			_this.hide();
		},500);
		_this.on('webkitTransitionEnd', function(){
			btn = true;
		});


	}

	function moveDown(_this){
		_this.show();
		_this.css({'-webkit-transform':'translateY(-150px)','-webkit-opacity':'1','-webkit-transition':'200ms ease'});
		$('.showlist').css({'-webkit-transform':'translateY(100%)', '-webkit-opacity':'0','-webkit-transition':'500ms ease'}).attr({'isTop': false});;
		$('.btnleft').show();
		$('.btnright').show();
		$('.title').show();
		$('.copy').show();
		$('.logo').css({'-webkit-transform': 'translateX(-50%) scale(1)', 'top': '6%'});
		$('.arrowTop').css({'-webkit-opacity':'1','-webkit-transition':'700ms ease','z-index':11});
		//$('.arrowBottom').css({'-webkit-opacity':'0','-webkit-transition':'100ms ease','z-index':10});
		setTimeout(function(){
			$('.showlist').hide();
		},500);		
		_this.on('webkitTransitionEnd', function(){
			btn = true;
		});
	}


	var wrapliLen,
		wrapliWidth
		;
	$('.wrap').each(function(index){
		wrapliLen = $(this).find('li').length;
		if(index > 4){
			wrapliWidth = parseInt($(".orient .wrap li").css('width')) + 10;
		}else{
			wrapliWidth = parseInt($(".wrap li").css('width')) + 10;
		};
		
		$(this).css({'width': wrapliLen*wrapliWidth}).attr({'attrliLen': wrapliLen, 'attrliWidth': wrapliWidth});
	});

	
	
	var nowPopWindow = 0, //判断当前弹窗
		popWindowbgBtn = true;  //判断背景弹窗状态
		
	/*点击出现弹窗*/
	ul.on('click', 'li', function(){
		nowPopWindow = $(this).index();
		popWindowbg.show();
		popWindow.eq(nowPopWindow).show().siblings('.popWindows').hide();
		picSlide(popWindow.eq(nowPopWindow).find('.wrap'), 0, 0);
	});

	$('.showlist ul').on('click','li',function(){
		nowPopWindow = $(this).index();
		popWindowbg.show();
		popWindow.eq(nowPopWindow).show().siblings('.popWindows').hide();
		picSlide(popWindow.eq(nowPopWindow).find('.wrap'), 0, 0);

	})
	/*隐藏弹窗*/
	popWindowbg.click(function(){
		if(!popWindowbgBtn) { 
			$('.bigImg').hide();
			popWindow.eq(nowPopWindow).show();
			picSlide(popWindow.eq(nowPopWindow).find('.wrap'));
			popWindowbgBtn = true;
		}else{
			popWindowHide();
		}	
	});

	$('.popimg').click(function(){
		popWindowHide();	
	});
	$('.back').click(function(){
		popWindowHide();	
	});

	$('#aboutus').click(function(){
		showUs();
	});
	$('.aboutusbg').click(function(){
		aboutusHide();
	});
	$('.back2').click(function(){
		aboutusHide();
	});
	/*点击看大图*/
	$('.wrap').on('click', 'li', function(){
		popWindowbgBtn = false;
		popWindow.eq(nowPopWindow).hide();
		$('.bigImg').show().find('ul').html($(this).parents('ul').html());
		$('.bigImgWrap img').css({ 'width': $(window).width()*0.85, 'height': 'auto'});
		$('.bigImgWrap').css({ 'width': $('.bigImgWrap li').length*$('.bigImgWrap li').width(), 'height': $('.bigImgWrap li').height()}).attr({'attrliLen': $('.bigImgWrap li').length, 'attrliWidth': $('.bigImgWrap li').width()});
		picSlide($('.bigImgWrap'), -$('.bigImgWrap').attr('attrliWidth')*$(this).index(), $(this).index());
	});
	/*点击大图消失*/
	$('.bigImg').on('click', function(){
		$(this).hide();
		popWindow.eq(nowPopWindow).show();
		picSlide(popWindow.eq(nowPopWindow).find('.wrap'));
	});

	function popWindowHide (){
		popWindowbg.hide();
		popWindow.hide();
		$('.bigImg').hide();
	}

	function showUs(){
		$('.aboutusbg').show();
		$('.aboutus').show();
	};

	function aboutusHide(){
		$('.aboutusbg').hide();
		$('.aboutus').hide();

	}

	function swipeDirection(xDelta, yDelta, transX, transY) {
        if (xDelta >= 30) {
            return (transX < 0 ? "Left" : "Right");
        }
        else if(yDelta>=30){
        	return (transY < 0 ? "Top" : "Down");
        }


    }
    function picSlide(obj, nowPosX, iPicNow){
    	_self = obj;
    	_self.css({'-webkit-transform': 'translateX('+ nowPosX +'px)'});
    	var x1,x2,y1,y2,xDelta,yDelta,transX,transY,
		iPicNow = iPicNow, 
		nowPosX = nowPosX,
		oldPos ,
    	transformBtn = true;//判断transform是否结束
    	obj.on({
			'touchstart':function(e){
				if(!e.touches.length) return;	
				x1 = e.touches[0].pageX;
				y1 = e.touches[0].pageY;
				x2 = xDelta = transX = 0;
				y2 = yDelta = transY = 0;	
			},
			'touchmove':function(e){
				if(!e.touches.length) return;              
				x2 = e.touches[0].pageX;
				y2 = e.touches[0].pageY;
				transX = x2 - x1;
				transY = y2 - y1;
				xDelta = Math.abs(transX);
				yDelta = Math.abs(transY);
				if(transformBtn && yDelta <= xDelta ){
					e.preventDefault();
					if(iPicNow < 1  ){
						if(transX >= 30) transX = 30;
					}else if(iPicNow > _self.attr('attrliLen') - 2){
						if(transX <= -30) transX = -30;
					};
					_self.css({'-webkit-transform': 'translateX('+ (nowPosX + transX) +'px)'});
					oldPos = nowPosX + transX;
				
				}
			},
			'touchend':function(e){ 				
				if(transformBtn){
					var direction = swipeDirection(xDelta, yDelta, transX, transY)
					//console.log('x1:' + x1 +'x2:' + x2 +'y1:' + y1 +'y2:' + y2 )
					//console.log(direction)
					if(direction == "Left" && iPicNow <= _self.attr('attrliLen') - 2){
						iPicNow++;
						nowPosX = -_self.attr('attrliWidth')*iPicNow;	
					}
					else if(direction == "Right" && iPicNow >= 1){
						iPicNow--;
						nowPosX = -_self.attr('attrliWidth')*iPicNow;
					};
					transformBtn = false;
					_self.css({'-webkit-transform': 'translateX('+ nowPosX +'px)', '-webkit-transition': '400ms'});
					_self.on('webkitTransitionEnd', function(){
						transformBtn = true;
					});
	 				/*_self.animate({'-webkit-transform': 'translateX('+ nowPosX +'px)'}, 400, 'ease-in-out',function(){
	 					transformBtn = true;	
	 				}); */
				};	
			}

		});	
    	
    };
	
	
	
		
	

});
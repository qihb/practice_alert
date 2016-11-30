define(['jquery'],function($){
	function funWindow(){
		this.cfg = {
			width : 500, //宽
			height : 300, //高
			title : '系统消息', //alert标题
			content : '', //alert内容
			handler4AlertBtn : null, //点击btn的回调函数
			handler4CloseBtn : null, //点击关闭的回调函数
			text4AlertBtn : '确定', //btn的文案
			hasCloseBtn : false, //是否有关闭按钮
			skinClassName : null, //ui
			hasMask : true //模态弹窗
		};
	};

	funWindow.prototype = {

		//alert 单按钮
		alert : function(cfg){
			//用户配置
			var CFG = $.extend(this.cfg,cfg);
			//主内容
			var boundingBox = $(
				'<div class="window_boundingBox">'+
					'<div class="window_header">'+CFG.title+'</div>'+
					'<div class="window_body">'+CFG.content+'</div>'+
					'<div class="window_footer"><input type="button" value="'+CFG.text4AlertBtn+'"/></div>'+
				'</div>'
				);
			boundingBox.appendTo('body');

			//模态弹窗
			var mask = null;
			if(CFG.hasMask){
				mask = $('<div class="window_mask"></div>');
				mask.appendTo('body');
			}

			//btn
			var btn = boundingBox.find('.window_footer input');
			btn.click(function(){
				CFG.handler4AlertBtn && CFG.handler4AlertBtn();
				boundingBox.remove();
				mask && mask.remove();
			});

			//alert的位置
			boundingBox.css({
				width : CFG.width + 'px',
				height : CFG.height + 'px',
				left : (CFG.x || (window.innerWidth - CFG.width)/2) + 'px',
				top : (CFG.y || (window.innerHeight - CFG.height)/2) + 'px'
			});

			//关闭
			if(CFG.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(){
					CFG.handler4CloseBtn && CFG.handler4CloseBtn();
					boundingBox.remove();
					mask && mask.remove();
				});
			};

			//ui
			if(CFG.skinClassName){
				boundingBox.addClass(CFG.skinClassName);
			}

		},
		confirm : function(){

		},
		prompt : function(){

		}
	};

	return {
		funWindow : funWindow
	}
})
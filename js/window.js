define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function funWindow(){
		this.cfg = {
			width : 500, //宽
			height : 300, //高
			title : '系统消息', //alert标题
			content : '', //alert内容
			handler4AlertBtn : null, //Alert点击确定的回调函数
			text4AlertBtn : '确定', //Alert btn的文案
			handler4ConfirmBtn : null, //Confirm 点击确定的回调函数
			handler4CancelBtn : null, //Confirm 点击取消的回调函数
			text4ConfirmBtn : '确定', //Confirm btn的文案
			text4CancelBtn : '取消', //Confirm btn的文案
			text4PromptBtn : '确定', //Prompt btn的文案
			isPromptInputPassword : false, //Prompt 设置是否是密码类型
			defaultValue4PromptInput : '', //Prompt input默认值
			maxLength4PromptInput : 10,  //Prompt 最多10个字符
			handler4PromptBtn : null,   //Prompt 回调
			handler4CloseBtn : null, //Alert 点击关闭的回调函数
			hasCloseBtn : false, //是否有关闭按钮
			skinClassName : null, //ui
			hasMask : true, //模态弹窗
			isDraggable : true,//拖动
			dragHandle : null//拖动把手
		};
		
	};

	funWindow.prototype = $.extend({},new widget.Widget(),{

		renderUI : function(){
			var footerContent = '';
			switch(this.cfg.winType){
				case 'alert':
				 	footerContent ='<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn"/>';
				 	break;
				case 'confirm':
					footerContent ='<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="window_confirmBtn"/><input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn"/>';
					break; 
				case 'prompt':
					this.cfg.content +='<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword ? "password" : "text")+'" value="'+this.cfg.defaultValue4PromptInput+'" maxlength="'+this.cfg.maxLength4PromptInput+'" class="window_promptInput"/></p>';
					footerContent ='<input type="button" value="'+this.cfg.text4PromptBtn+'" class="window_promptBtn" /><input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn"/>';
					break;	
			}


			//主内容
			this.boundingBox = $(
				'<div class="window_boundingBox">'+
					'<div class="window_body">'+this.cfg.content+'</div>'+
				'</div>'
			);

			if(this.cfg.winType != 'common'){
				this.boundingBox.append('<div class="window_header">'+this.cfg.title+'</div>');
				this.boundingBox.append('<div class="window_footer">'+footerContent+'</div>');
			}
			
			//模态弹窗
			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo('body');
			}

			//关闭
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			};

			this.boundingBox.appendTo(document.body);
			this._promptInput = this.boundingBox.find('.window_promptInput');
		},

		bindUI : function(){
			var that = this;

			//事件 触发和销毁 自定义事件
			this.boundingBox.delegate('.window_alertBtn','click',function(){
				that.fire('alert');
				that.destroy();
			}).delegate('.window_closeBtn','click',function(){
				that.fire('close');
				that.destroy();
			}).delegate('.window_confirmBtn','click',function(){
				that.fire('confirm');
				that.destroy();
			}).delegate('.window_cancelBtn','click',function(){
				that.fire('cancel');
				that.destroy();
			}).delegate('.window_promptBtn','click',function(){
				that.fire('prompt',that._promptInput.val());
				that.destroy();
			});

			//绑定自定义事件 close
			if(this.cfg.handler4CloseBtn){
				this.on('close',this.cfg.handler4CloseBtn);
			}

			//绑定自定义事件 alert
			if(this.cfg.handler4AlertBtn){
				this.on('alert',this.cfg.handler4AlertBtn);
			}

			//绑定自定义事件 confirm
			if(this.cfg.handler4ConfirmBtn){
				this.on('confirm',this.cfg.handler4ConfirmBtn);
			}

			//绑定自定义事件 cancel
			if(this.cfg.handler4CancelBtn){
				this.on('cancel',this.cfg.handler4CancelBtn);
			}

			//绑定自定义事件 prompt
			if(this.cfg.handler4PromptBtn){
				this.on('prompt',this.cfg.handler4PromptBtn);
			}
		},

		syncUI : function(){
			//alert的位置
			this.boundingBox.css({
				width : this.cfg.width + 'px',
				height : this.cfg.height + 'px',
				left : (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
				top : (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
			});

			//ui，自定义样式
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}

			//拖动
			if(this.cfg.isDraggable){
			 	//判断是否有拖动把手
			 	if(this.cfg.dragHandle){
			 		this.boundingBox.draggable({handle:this.cfg.dragHandle});
			 	}else{
			 		this.boundingBox.draggable();
			 	}
			 	
			 }
		},

		destructor: function(){
			this._mask && this._mask.remove();
		},

		//alert 单按钮
		alert : function(cfg){
			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;
		},
		confirm : function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;
		},
		prompt : function(cfg){
			$.extend(this.cfg,cfg,{winType:'prompt'});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common : function(cfg){
			$.extend(this.cfg,cfg,{winType:'common'});
			this.render();
			return this;
		}
	});
	

	return {
		funWindow : funWindow
	}
})
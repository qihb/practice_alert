define(['jquery'],function($){
	function Widget(){
		this.boundingBox = null;     //属性：最外层容器
	}

	Widget.prototype = {
		
		//自定义 事件绑定on
		on:function(type,handler){
		 	if(typeof this.handlers[type] == 'undefined'){
		 		this.handlers[type] = [];
		 	}
		 	this.handlers[type].push(handler);
		 	return this;
		},
		//自定义 事件触发fire
		fire:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for (var i = 0,len = handlers.length;i<len ;i++) {
					handlers[i](data);
				}
			}
		},

		renderUI:function(){},      //接口：添加dom节点
		bindUI:function(){},        //接口：监听事件
		syncUI:function(){},         //接口：初始化组件属性 
		destructor:function(){},    //接口：销毁前的处理函数

		//方法：渲染组件
		render:function(container){      
			this.renderUI();
			this.handlers={};
			this.bindUI();
			this.syncUI();
			$(container||document.body).append(this.boundingBox);
		},
		
		//方法：销毁组件
		destroy:function(){           
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	};

	return{
		Widget : Widget
	};
});